let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
let port = 3000;
app.listen(port, () => {
  console.log(`AirFlow Task Management System is running on port ${port}`);
});
let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

/*
Endpoint 1. Add a Task to the Task List

Objective: Add a new task to the task list using the provided details.

Endpoint: /tasks/add

Query Parameters:

taskId: The ID of the task (integer).

text: The description of the task (string).

priority: The priority of the task (integer).

Your Task: Create a function that will add a new task to the task list using the details provided in the query parameters.

Example Call:

http://localhost:3000/tasks/add?taskId=4&text=Review%20code&priority=1

Expected Output:

{
	tasks: [
	  { 'taskId': 1, 'text': 'Fix bug #101', 'priority': 2 },
	  { 'taskId': 2, 'text': 'Implement feature #202', 'priority': 1 },
	  { 'taskId': 3, 'text': 'Write documentation', 'priority': 3 },
	  { 'taskId': 4, 'text': 'Review code', 'priority': 1 }
	]
}
*/
// Function to add a task to the task list
function addTask(taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
}
// Endpoint 1: Add a task to the task list
app.get("/tasks/add", (req, res) => {
  console.log("API Call: /tasks/add");
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  if (!taskId || !text || !priority) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log(" task arr: ", tasks);
  addTask(taskId, text, priority);
  console.log("after adding task , task arr ", tasks);
  res.json({ tasks });
});

/*
Endpoint 2. Read All Tasks in the Task List

Objective: Return the current list of tasks.

Endpoint: /tasks

Your Task: Create a function that will return the current state of the task list.

Example Call:

http://localhost:3000/tasks

Expected Output:

{
	tasks: [
	  { 'taskId': 1, 'text': 'Fix bug #101', 'priority': 2 },
	  { 'taskId': 2, 'text': 'Implement feature #202', 'priority': 1 },
	  { 'taskId': 3, 'text': 'Write documentation', 'priority': 3 }
	]
}
*/
// Function to get all tasks from the task list
function getAllTasks() {
  return tasks;
}
// Endpoint 2: Read all tasks in the task list
app.get("/tasks", (req, res) => {
  console.log("API Call: /tasks");
  res.json({ tasks: getAllTasks() });
});

/*
Endpoint 3. Sort Tasks by Priority

Objective: Sort tasks by their priority in ascending order.

Endpoint: /tasks/sort-by-priority

Your Task: Create a function that will sort the tasks by their priority in ascending order.

Example Call:

http://localhost:3000/tasks/sort-by-priority

Expected Output:

{
	tasks: [
	  { 'taskId': 2, 'text': 'Implement feature #202', 'priority': 1 },
	  { 'taskId': 1, 'text': 'Fix bug #101', 'priority': 2 },
	  { 'taskId': 3, 'text': 'Write documentation', 'priority': 3 }
	]
}
*/
// Function to sort tasks by priority in ascending order
function sortTasksByPriorityAsc() {
  tasks.sort((a, b) => a.priority - b.priority);
}
// Endpoint 3: Sort tasks by priority in ascending order
app.get("/tasks/sort-by-priority", (req, res) => {
  console.log("API Call: /tasks/sort-by-priority");
  console.log(" before sorting ", tasks);
  sortTasksByPriorityAsc();
  console.log("After sorting ", tasks);
  res.json({ tasks: getAllTasks() }); // use already def fucn
});

/*
Endpoint 4. Edit Task Priority

Objective: Edit the priority of an existing task based on the task ID.

Endpoint: /tasks/edit-priority

Query Parameters:

taskId: The ID of the task (integer).

priority: The new priority of the task (integer).

Your Task: Create a function that will update the priority of a task based on the task ID.

Example Call:

http://localhost:3000/tasks/edit-priority?taskId=1&priority=1

Expected Output:

{
	tasks:[
	  { 'taskId': 1, 'text': 'Fix bug #101', 'priority': 1 },
	  { 'taskId': 2, 'text': 'Implement feature #202', 'priority': 1 },
	  { 'taskId': 3, 'text': 'Write documentation', 'priority': 3 },
	]
}
*/
// Function to edit task priority
function editTaskPriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      return true; // Successfully updated
    }
  }
  console.log("Task not found.");
  return false; // Task not found
}
// Endpoint 4: Edit task priority
app.get("/tasks/edit-priority", (req, res) => {
  console.log("API Call: /tasks/edit-priority");
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  if (!taskId || !priority) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log("before edit ", tasks);
  let isUpdated = editTaskPriority(taskId, priority);

  if (isUpdated) {
    console.log("after edit ", tasks);
    res.json({ tasks: getAllTasks() });
  } else {
    return res.status(404).json({ error: "Task not found" });
  }
});

/*
Endpoint 5. Edit/Update Task Text

Objective: Edit the text of an existing task based on the task ID.

Endpoint: /tasks/edit-text

Query Parameters:

taskId: The ID of the task (integer).

text: The new text of the task (string).

Your Task: Create a function that will update the text of a task based on the task ID.

Example Call:

http://localhost:3000/tasks/edit-text?taskId=3&text=Update%20documentation

Expected Output:

{
	tasks: [
	  { 'taskId': 1, 'text': 'Fix bug #101', 'priority': 2 },
	  { 'taskId': 2, 'text': 'Implement feature #202', 'priority': 1 },
	  { 'taskId': 3, 'text': 'Update documentation', 'priority': 3 }
	]
}


*/
// Function to edit task text
function editTaskText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      return true; // Successfully updated
    }
  }
  console.log("Task not found.");
  return false; // Task not found
}
// Endpoint 5: Edit task text
app.get("/tasks/edit-text", (req, res) => {
  console.log("API Call: /tasks/edit-text");
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  if (!taskId || !text) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log("before edit ", tasks);
  let isUpdated = editTaskText(taskId, text);

  if (isUpdated) {
    console.log("after edit ", tasks);
    res.json({ tasks: getAllTasks() });
  } else {
    return res.status(404).json({ error: "Task not found" });
  }
});
/*
Endpoint 6. Delete a Task from the Task List

Objective: Delete a task from the task list based on the task ID.

Endpoint: /tasks/delete

Query Parameters:

taskId: The ID of the task to be deleted (integer).

Note: You’ll have to update the original array with the results of .filter() method. For example tasks = task.filter(...)

Your Task: Create a function that will remove a task from the task list based on the task ID.

Example Call:

http://localhost:3000/tasks/delete?taskId=2

Expected Output:

{
	tasks: [
	  { 'taskId': 1, 'text': 'Fix bug #101', 'priority': 2 },
	  { 'taskId': 3, 'text': 'Write documentation', 'priority': 3 }
	]
}
*/

// Function to delete a task from the task list
function deleteTask(taskId) {
  let initialLength = tasks.length;
  tasks = tasks.filter((task) => task.taskId !== taskId);
  return tasks.length !== initialLength; // Return true if a task was deleted
}

// Endpoint 6: Delete a task from the task list
app.get("/tasks/delete", (req, res) => {
  console.log("API Call: /tasks/delete");
  let taskId = parseInt(req.query.taskId);

  if (!taskId) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log("before delete ", tasks);
  let success = deleteTask(taskId);
  if (!success) {
    return res.status(404).json({ error: "Task not found" });
  }

  console.log("after delete ", tasks);
  res.json({ tasks: getAllTasks() });
});

/*
Endpoint 7. Filter Tasks by Priority

Objective: Return tasks that match a specified priority.

Endpoint: /tasks/filter-by-priority

Query Parameters:

priority: The priority to filter tasks by (integer).

Your Task: Create a function that will return tasks that match a specified priority.

Example Call:

http://localhost:3000/tasks/filter-by-priority?priority=1

Expected Output:

{
	tasks: [
          { taskId: 2, text: 'Implement feature #202', priority: 1 },
	]
}
*/

// Function to filter tasks by priority
function filterTasksByPriority(priority) {
  let filteredTasks = tasks.filter((task) => task.priority === priority);
  return filteredTasks;
}

// Endpoint 7: Filter tasks by priority
app.get("/tasks/filter-by-priority", (req, res) => {
  console.log("API Call: /tasks/filter-by-priority");
  let priority = parseInt(req.query.priority);

  if (!priority) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  console.log("before filter ", tasks);
  let filteredTasks = filterTasksByPriority(priority);
  console.log("after filter ", filteredTasks);
  res.json({ tasks: filteredTasks });
});
