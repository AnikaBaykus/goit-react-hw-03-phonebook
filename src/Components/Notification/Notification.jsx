import PropTypes from 'prop-types';
import s from './Notification.module.css';

function Notification(props) {
  const { message } = props;

  return <h3 className={s.message}>{message}</h3>;
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
