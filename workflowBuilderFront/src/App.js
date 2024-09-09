import React from 'react';
import WorkflowBuilder from './components/WorkflowBuilder';
import UploadCSV from './components/UploadCSV';

function App() {
  return (
    <div>
      <h1>Workflow Builder</h1>
      <WorkflowBuilder />
      <UploadCSV />
    </div>
  );
}

export default App;
