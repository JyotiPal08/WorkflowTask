import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [jsonOutput, setJsonOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/workflows')
      .then(response => {
        setWorkflows(response.data);
      })
      .catch(error => {
        console.error('Error fetching workflows:', error);
      });
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setJsonOutput(null);// Reset JSON output when new file is selected
    setErrorMessage(null);  
  };
  const handleUpload = () => {
    if (!file) {
      setErrorMessage("Please upload a CSV file first.");
      return;
    }

    if (!selectedWorkflow) {
      setErrorMessage("Please select a workflow.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workflowId', selectedWorkflow);

    axios.post('http://localhost:5000/execute-workflow', formData)
      .then(response => {
        setJsonOutput(response.data.data); // Display JSON output after successful execution
        setErrorMessage(null); 
       // alert('Workflow executed successfully!');
      })
      .catch(error => {
        console.error('Error executing workflow:', error);
        setErrorMessage('Error executing workflow. Please try again.');
      });
  //   if (selectedWorkflow === '3') {
  // axios.post('http://localhost:5000/convert-csv-to-json', formData)
  // .then((response) => {
  //   setJsonOutput(response.data.jsonData);  // Set JSON data from the response
  //   setErrorMessage(null);  // Clear any previous errors
  // })
  // .catch((error) => {
  //   console.error('Error uploading file:', error);
  //   setErrorMessage('Error uploading or converting the file. Please try again.');
  // });
  // }
};


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Upload CSV & Trigger Workflow</h2>
      <input type="file" onChange={handleFileChange} />
      <select onChange={(e) => setSelectedWorkflow(e.target.value)}>
        <option value="">Select a workflow</option>
        {workflows.map((workflow) => (
          <option key={workflow.id} value={workflow.id}>
            {workflow.name}
          </option>
        ))}
      </select>
      <br /><br />
      <button onClick={handleUpload}>Upload</button>

      {errorMessage && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <p>{errorMessage}</p>
        </div>
      )}

      {jsonOutput && (
        <div style={{ marginTop: '20px' }}>
          <h3>Converted JSON:</h3>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        </div>
      )}    </div>
  );
};

export default UploadCSV;

