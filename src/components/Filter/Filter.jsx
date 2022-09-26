import React from 'react';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import css from 'components/Filter/Filter.module.css'

export default function Filter({ onChange, value }) {
  const filterId = nanoid();
  
  return (
    <div className={css.filter}>
      <label
        className={css.label}
        htmlFor={filterId}
        >Find contacts by name
      </label>
      <input
        id={filterId}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}
