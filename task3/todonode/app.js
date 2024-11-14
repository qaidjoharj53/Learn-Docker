const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const tasks = []; // In-memory array to store tasks

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

// Add new task
app.post('/add', (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title };
  tasks.push(newTask);  // Store task in memory
  res.redirect('/');  // Redirect to home to show updated tasks
});

// Delete a task
app.post('/delete/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1); // Remove task from the array
  }
  res.redirect('/');  // Redirect to home to show updated tasks
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
