import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import s from './Filter.module.css';

function Filter({ value, onChange }) {
  const inputID = uuidv4();

  return (
    <div>
      <label className={s.label} htmlFor={inputID}>
        Find contacts by name{' '}
        <input
          className={s.input}
          id={inputID}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter name..."
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
