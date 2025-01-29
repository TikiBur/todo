import React, { useState } from 'react';

import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';
import './index.css';

const FILTERS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);

  const addTask = (description) => {
    setTasks([...tasks, { id: Date.now(), description, completed: false, created: new Date() }]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === FILTERS.ACTIVE) return !task.completed;
    if (filter === FILTERS.COMPLETED) return task.completed;
    return true;
  });

  const activeTaskCount = tasks.filter(task => !task.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList tasks={filteredTasks} onToggle={toggleTaskCompletion} onDelete={deleteTask} />
        <Footer filter={filter} setFilter={setFilter} activeCount={activeTaskCount} onClearCompleted={clearCompleted} />
      </section>
    </section>
  );
};

export default App;
