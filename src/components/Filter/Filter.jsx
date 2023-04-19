import React from 'react';
import PropTypes from 'prop-types';
import sharedStyles from 'components/sharedStyles.module.css';

const Filter = ({ filter, handleInputChange }) => {
  return (
    <label className={sharedStyles.label}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleInputChange}
        className={sharedStyles.input}
      ></input>
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Filter;
