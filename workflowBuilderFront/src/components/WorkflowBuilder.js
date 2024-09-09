import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';

const WorkflowBuilder = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [workflowName, setWorkflowName] = useState("");

  const saveWorkflow = () => {
    if (!workflowName) {
      alert('Please enter a workflow name');
      return;
    }
    
    const workflowData = {
      name: workflowName,
      nodes,
      edges,
    };

    axios.post('http://localhost:5000/workflows', workflowData)
      .then(response => {
        alert('Workflow saved successfully!');
      })
      .catch(error => {
        console.error('Error saving workflow:', error);
      });
  };

  return (
    <div style={{ height: '200px' }}>
      <input
        type="text"
        placeholder="Enter Workflow Name"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
      />
      <button onClick={saveWorkflow}>Save Workflow</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowBuilder;
