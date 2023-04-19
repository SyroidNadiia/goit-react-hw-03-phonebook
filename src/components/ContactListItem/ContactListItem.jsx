import React from 'react';
import PropTypes from 'prop-types';
import sharedStyles from 'components/sharedStyles.module.css';
import css from './ContactListItem.module.css';

const ContactListItem = ({ contact, onDelete }) => {
  return (
    <li key={contact.id} className={css.item}>
      {contact.name}
      <button
        className={`${sharedStyles.button} ${css.buttonWithMargin}`}
        onClick={() => {
          onDelete(contact.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
