import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Section from './Section';

import React, { Component } from 'react';
import Container from './Container';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Notification from './Notification';

export class App extends Component {
  static defaultProps = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  state = {
    contacts: this.props.contacts,
    filter: this.props.filter,
  };

  submitFormHandler = ({ name, number }) => {
    const idContact = uuidv4();

    const contact = {
      name: name,
      number: number,
      id: idContact,
    };

    const { contacts } = this.state;
    const findCopyContact = contacts
      .map(contact => contact.name.toLowerCase())
      .includes(name.toLowerCase());

    if (findCopyContact) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  filterChange = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const { submitFormHandler, filterChange, deleteContact } = this;
    const visibleContact = this.getVisibleContact();

    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={submitFormHandler} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={filterChange}></Filter>
          {contacts.length > 0 ? (
            <ContactList
              contacts={visibleContact}
              onDeleteContact={deleteContact}
            ></ContactList>
          ) : (
            <Notification message="No contacts"></Notification>
          )}
        </Section>
      </Container>
    );
  }
}

export default App;
