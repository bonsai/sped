const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// In-memory database (replace with a real database in production)
const db = {
  projects: [
    { id: '1', name: 'Sample Project', description: 'A sample project', createdAt: new Date().toISOString() }
  ]
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(db.projects);
});

app.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newProject = {
    id: uuidv4(),
    name,
    description: description || '',
    createdAt: new Date().toISOString()
  };
  
  db.projects.push(newProject);
  res.status(201).json(newProject);
});

app.get('/api/projects/:id', (req, res) => {
  const project = db.projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

module.exports = app;
