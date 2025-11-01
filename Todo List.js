//My solution
import {useState} from 'react';

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = () => {
    setTasks([...tasks, text]);
    setText("");
  }

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add your task" />
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <ul>
      {
        tasks.map((task, i) => (
          <li key={i}>
            <span>{task}</span>
            <button onClick={() => handleDelete(i)}>Delete</button>
        </li>
        ))
      }
      </ul>
    </div>
  );
}

//Official solution
import { useState } from 'react';

// Encapsulate the ID generation so that it can only
// be read and is protected from external modification.
const newID = (() => {
  let id = 0;
  return () => id++;
})();

const INITIAL_TASKS = [
  { id: newID(), label: 'Walk the dog' },
  { id: newID(), label: 'Water the plants' },
  { id: newID(), label: 'Wash the dishes' },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState('');

  return (
    <div>
      <h1>Todo List</h1>
      {/* Use a form instead. */}
      <form
        onSubmit={(event) => {
          // Listen to onSubmit events so that it works for both "Enter" key and
          // click of the submit <button>.
          event.preventDefault();
          // Trim the field and don't add to the list if it's empty.
          if (newTask.trim() === '') {
            return;
          }

          // Trim the value before adding it to the tasks.
          setTasks([
            ...tasks,
            { id: newID(), label: newTask.trim() },
          ]);
          // Clear the <input> field after successful submission.
          setNewTask('');
        }}>
        <input
          aria-label="Add new task"
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={(event) =>
            setNewTask(event.target.value)
          }
        />
        <div>
          <button>Submit</button>
        </div>
      </form>
      {/* Display an empty message when there are no tasks */}
      {tasks.length === 0 ? (
        <div>No tasks added</div>
      ) : (
        <ul>
          {tasks.map(({ id, label }) => (
            <li key={id}>
              <span>{label}</span>
              <button
                onClick={() => {
                  // Add confirmation before destructive actions.
                  if (
                    window.confirm(
                      'Are you sure you want to delete the task?',
                    )
                  ) {
                    setTasks(
                      tasks.filter(
                        (task) => task.id !== id,
                      ),
                    );
                  }
                }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
