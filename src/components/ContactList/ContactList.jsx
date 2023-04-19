import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';
import css from './ContactList.module.css';

const ContactList = ({ filter, contacts, onDelete }) => {
  return (
    <>
      <ul className={css.list}>
        {contacts
          .filter(element =>
            element.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
            ></ContactListItem>
          ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
