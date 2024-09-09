const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const csvtojson = require('csvtojson');
const axios = require('axios');
//const fs = require('fs');
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const workflows = [];
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads/tmp'));  // Store in a temp folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });
// Endpoint to upload CSV and convert to JSON
app.post('/convert-csv-to-json', upload.single('file'), (req, res) => {
    const csvFilePath = req.file.path;  // Path to the uploaded CSV file
  
    // Convert CSV to JSON
    csvtojson()
      .fromFile(csvFilePath)
      .then(jsonData => {
        console.log(jsonData);  // Logs the JSON output on the backend for verification
        
        // Send JSON response to the client
        res.json({
          message: "CSV file successfully converted to JSON",
          jsonData
        });
  
        // Clean up the uploaded CSV file after processing
        fs.unlink(csvFilePath, (err) => {
          if (err) console.error('Failed to delete temporary file:', err);
        });
      })
      .catch(error => {
        console.error('Error converting CSV to JSON:', error);
        res.status(500).json({ error: 'Failed to convert CSV to JSON' });
      });
  });

// app.post('/upload-csv', upload.single('file'), (req, res) => {
//     const filePath = req.file.path;
  
//     // Process the CSV file (e.g., read, convert, etc.)
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) return res.status(500).send('File processing error');
  
//       // After processing, delete the temporary file
//       fs.remove(filePath, (err) => {
//         if (err) return res.status(500).send('Failed to delete file');
//         res.send('File processed and deleted');
//       });
//     });
//   });

// Route to save a workflow
app.post('/workflows', (req, res) => {
  const workflow = {
    id: uuidv4(),
    name: req.body.name,
    nodes: req.body.nodes,
    edges: req.body.edges,
  };

  workflows.push(workflow);
  res.json(workflow);
});

// Route to get all workflows
app.get('/workflows', (req, res) => {
  res.json(workflows);
});

// Route to execute a workflow
app.post('/execute-workflow', upload.single('file'), async (req, res) => {
  const workflowId = req.body.workflowId;
  const workflow = workflows.find((w) => w.id === workflowId);

  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }

  const filePath = req.file.path;

  // Convert CSV to JSON
  let data = await csvtojson().fromFile(filePath);

  // Execute each node step by step
  for (const node of workflow.nodes) {
    if (node.data.label === 'Filter Data') {
      // Convert all column values to lowercase
      data = data.map(row => {
        Object.keys(row).forEach(key => {
          row[key] = row[key].toLowerCase();
        });
        return row;
      });
    }

    if (node.data.label === 'Wait') {
      // Introduce a 60-second delay
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }

    if (node.data.label === 'Convert Format') {
      // Convert data from CSV to JSON (already in JSON format at this point)
    }

    if (node.data.label === 'Send POST Request') {
      // Send JSON data to a mock POST URL
      await axios.post('https://requestcatcher.com/test', data)
        .then((response) => {
          console.log('POST Request sent:', response.data);
        })
        .catch((error) => {
          console.error('Error sending POST request:', error);
        });
    }
  }

  // Clean up the uploaded file
  fs.unlinkSync(filePath);

  res.json({ success: true, data });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
