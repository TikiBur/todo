import React from 'react';
import PropTypes from 'prop-types';

import Task from './task';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasks: [],
};

export default TaskList;
