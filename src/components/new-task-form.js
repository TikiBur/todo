import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAddTask }) => {
  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const min = parseInt(minutes, 10) || 0;
    const sec = parseInt(seconds, 10) || 0;
    const totalSeconds = min * 60 + sec;
    
    if (description.trim()) {
      onAddTask(description, totalSeconds);
      setDescription('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Task"
        autofocus
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autofocus
        type="number"
        min="0"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autofocus
        type="number"
        min="0"
        max="59"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
      <button type="submit"></button>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;