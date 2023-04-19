import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import sharedStyles from 'components/sharedStyles.module.css';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};
const LS_KEY = 'saved_contacts';

class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const savedcontacts = localStorage.getItem(LS_KEY);
    if (savedcontacts) {
      this.setState({ contacts: JSON.parse(savedcontacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contact !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  onChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleAddContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <div className={sharedStyles.section}>
          <h1 className={sharedStyles.title}>Phonebook</h1>
          <ContactForm
            onChange={this.onChangeInput}
            addContact={this.handleAddContact}
            contacts={contacts}
          ></ContactForm>
          <h2 className={sharedStyles.title}>Contacts</h2>
          <Filter
            filter={filter}
            handleInputChange={this.onChangeInput}
          ></Filter>
          <ContactList
            contacts={contacts}
            filter={filter}
            onDelete={this.deleteContact}
          ></ContactList>
        </div>
      </>
    );
  }
}

export default App;
