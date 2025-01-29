import React from 'react';

import PropTypes from 'prop-types';

const Footer = ({ filter, setFilter, activeCount, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <ul className="filters">
        {['All', 'Active', 'Completed'].map(f => (
          <li key={f}>
            <button className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)}>
              {f}
            </button>
          </li>
        ))}
      </ul>
      <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
    </footer>
  );
};

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
