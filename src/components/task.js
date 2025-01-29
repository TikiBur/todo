import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <label>
          <span className="description">{task.description}</span>
          <span className="created">created {formatDistanceToNow(task.created, { addSuffix: true })}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={() => onDelete(task.id)}></button>
      </div>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Task.defaultProps = {
  task: {
    description: 'New Task',
    completed: false,
    created: new Date(),
  },
};

export default Task;
