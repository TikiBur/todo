import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAddTask }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
