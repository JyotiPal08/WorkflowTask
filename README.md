# WorkflowTask
# CSV to JSON Converter Web Application

## Overview
This project is a web application that allows users to upload a CSV file and convert it to JSON format. The frontend is built using React.js, and the backend is developed with Node.js and Express.js. The CSV to JSON conversion is handled by the `csvtojson` library, and users can view the converted JSON data on the frontend after uploading the CSV file.

## Features
- Upload a CSV file from the user interface.
- Convert the uploaded CSV file to JSON format on the server.
- Display the converted JSON output on the frontend.
- Automatically delete the uploaded CSV file after processing.

## Tech Stack
### Frontend:
- **React.js**: For building the user interface and handling file uploads.
- **Axios**: For making API requests to the backend.

### Backend:
- **Node.js**: For handling API requests.
- **Express.js**: Web framework to create REST API endpoints.
- **Multer**: Middleware for handling file uploads.
- **csvtojson**: Library used to convert CSV data to JSON.
- **fs**: Node.js module used to handle file system operations (upload and delete files).

## Installation

### 1. Clone the Repository

git clone https://github.com/JyotiPal08/WorkflowTask.git
cd WorkflowTask
### 2. Backend Setup
Navigate to the backend directory and install dependencies:

cd workflow-builder-back
npm install

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:

cd workflow-builder-front
npm install

## Running the Application
### 1. Start the Backend Server
Inside the backend directory, start the Node.js server:

node server.js or npm start
By default, the backend server will run at http://localhost:5000.

### 2. Start the Frontend React App
Inside the frontend directory, start the React development server:

npm start
By default, the frontend will run at http://localhost:3000.

## Usage
### 1. Open the Web Application
Navigate to http://localhost:3000 in your browser. You will see a simple interface where you can upload a CSV file.

### 2. Upload a CSV File
Click the "Choose File" button to select a CSV file from your local system.
Click the "Upload and Convert" button to send the file to the server for processing.
### 3. View JSON Output
Once the CSV file is successfully uploaded and converted, the resulting JSON data will be displayed on the screen in a structured format.

## Project Structure
### Backend (workflow-builder-back directory)
server.js: Main entry point for the Node.js application. Handles file upload, CSV to JSON conversion, and file cleanup.
package.json: Contains project dependencies like express, multer, and csvtojson.
### Frontend (workflow-builder-front directory)
src/components/UploadCSV.js: Main component for handling file upload and displaying the converted JSON.
src/App.js: Root component of the React application.
package.json: Contains project dependencies like react and axios.
