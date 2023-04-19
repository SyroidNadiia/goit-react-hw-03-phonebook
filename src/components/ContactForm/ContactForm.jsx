import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import sharedStyles from 'components/sharedStyles.module.css';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    addContact: PropTypes.func.isRequired,
  };
  
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (
      this.props.contacts.find(
        contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
      )
    ) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.props.addContact(newContact);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={sharedStyles.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={sharedStyles.input}
          />
        </label>

        <label className={sharedStyles.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={sharedStyles.input}
          />
        </label>

        <button className={sharedStyles.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
