import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ task, onToggle, onDelete, onUpdate, onToggleTimer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [remainingTime, setRemainingTime] = useState(task.remainingTime || 300); 
  const [isRunning, setIsRunning] = useState(task.isRunning || false);

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime <= 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  useEffect(() => {
    if (task.remainingTime !== undefined && !isNaN(task.remainingTime)) {
      setRemainingTime(task.remainingTime);
    }
    setIsRunning(task.isRunning || false); 
  }, [task]);

  const formatTime = (seconds) => {
    if (seconds < 0) return '00:00'; 
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedDescription !== task.description) {
      onUpdate(task.id, editedDescription);
    }
  };

  const handleChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning); 
    onToggleTimer(task.id); 
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label>
          {isEditing ? (
            <input
              type="text"
              value={editedDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <>
              <span className="title">{task.description}</span>
              <span className="description">
                <button className={`icon ${isRunning ? 'icon-pause' : 'icon-play'}`} onClick={toggleTimer}></button>
                {formatTime(remainingTime)} 
              </span>
              <span className="description">created {formatDistanceToNow(task.created, { addSuffix: true })}</span>
            </>
          )}
        </label>
        <button className="icon icon-edit" onClick={handleEditClick}></button>
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
    remainingTime: PropTypes.number, 
    isRunning: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleTimer: PropTypes.func.isRequired,
};

export default Task;