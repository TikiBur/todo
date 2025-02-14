import React, { useState, useEffect } from 'react';

import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';
import './index.css';

const FILTERS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

const LOCAL_STORAGE_KEY = 'todoTasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description, timeSpent = 0) => {
    setTasks([...tasks, { 
      id: Date.now(), 
      description, 
      completed: false, 
      created: new Date(),
      timeSpent,
      isRunning: true 
    }]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, newDescription) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, description: newDescription } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const toggleTimer = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isRunning: !task.isRunning } : task
    ));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(tasks => tasks.map(task =>
        task.isRunning ? { ...task, timeSpent: task.timeSpent + 1 } : task
      ));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <TaskList 
          tasks={filteredTasks} 
          onToggle={toggleTaskCompletion} 
          onDelete={deleteTask} 
          onUpdate={updateTask} 
          onToggleTimer={toggleTimer}
        />
        <Footer 
          filter={filter} 
          setFilter={setFilter} 
          activeCount={activeTaskCount} 
          onClearCompleted={clearCompleted} 
        />
      </section>
    </section>
  );
};

export default App;