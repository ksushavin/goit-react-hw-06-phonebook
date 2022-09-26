import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from 'components/Phonebook/Phonebook.module.css'

export default class Phonebook extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: "",
    }
    
    componentDidMount() {
      const contacts = localStorage.getItem("contacts");
      const parsedContacts = JSON.parse(contacts);

      if (parsedContacts) {
            this.setState({
                contacts: parsedContacts
            })
        }
    };
  
    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState) {
            localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }

    handleChange = (e) => {
        const{name, value} = e.target
        this.setState({
            [name]: value,
        })
    }
    isDuplicate = (item) => {
        const { contacts } = this.state;
        const result = contacts.find(({ name, number }) => 
            item.name===name && item.number === number
        )
        return result
    }

    addContact = (data) => {
        if (this.isDuplicate(data)) {
            return alert(`${data.name} is already in contacts`)
        }
        const newContact = {
            id: nanoid(),
            ...data
        }
        this.setState((prevState) => {
            return {
                contacts: [...prevState.contacts, newContact]
            }
        })
    }
    removeContact = (id) => {
        this.setState((prevState) => {
            const newContacts = prevState.contacts.filter(contact => 
                contact.id !== id
            )
            return {
                contacts: newContacts
            }
        })
    }

    getFilteredContacts = () => {
        const { contacts, filter } = this.state;
        
        if (!filter) {
            return contacts;
        } else {
            const normalizedFilter = filter.toLocaleLowerCase();
            const filteredContacts = contacts.filter(({ name }) => {
                const normalizedName = name.toLocaleLowerCase();
                const result = normalizedName.includes(normalizedFilter);
                return result
            })
            return filteredContacts;
        }
    }

    render() {
        const { getFilteredContacts, state, handleChange, addContact, removeContact } = this;
        const contacts = getFilteredContacts();
             console.log("render")   

        return (
            <>
                <div className={css.contactForm}>
                    <h1 className={css.title}>Phonebook</h1>
                    <ContactForm onSubmit={addContact} />
                </div>
                <div className={css.contactsWrapper}>
                    <h2 className={css.title}>Contacts</h2>
                    <Filter onChange={handleChange} value={state.filter}/>
                    
                    <ContactList items={contacts} removeContact={removeContact} />
                </div>
            </>
        )
    }
}