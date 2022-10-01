import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from 'components/Phonebook/Phonebook.module.css'

export default function Phonebook() {

    const initial = [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]

    const [filter, setFilter] = useState('');
    const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem("contacts")) ?? initial);

    useEffect(() => {
        if (!contacts) {
            return
        }
        window.localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts]);


    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }


    const addContact = (data) => {
        if (isDuplicate(data)) {
            return alert(`${data.name} is already in contacts`);
        }
       
        setContacts((prev) => {
            const newContact = {
                id: nanoid(),
                ...data
            }
            return [...prev, newContact]
        })
    }

    const isDuplicate = (item) => {
        const result = contacts.find(({ name, number }) =>
            item.name === name && item.number === number
        )
        return result
    }

   
    const removeContact = (id) => {
        setContacts((prev) => {
            const newContacts = prev.filter((contact) => 
                contact.id !== id
            )
            return newContacts
        })
    }
    
    const getFilteredContacts = () => {

        if (!filter) {
            return contacts;
        }
        else {
            const normalizedFilter = filter.toLocaleLowerCase();
            const filteredContacts = contacts.filter(({ name }) => {
                const normalizedName = name.toLocaleLowerCase();
                const result = normalizedName.includes(normalizedFilter);
                return result;
            });
            return filteredContacts;
        }
    }

    const filteredContacts = getFilteredContacts(); 

    return (
        <>
            <div className={css.contactForm}>
                <h1 className={css.title}>Phonebook</h1>
                <ContactForm onSubmit={addContact} />
            </div>
            <div className={css.contactsWrapper}>
                <h2 className={css.title}>Contacts</h2>
                <Filter onChange={handleFilterChange} value={filter} />
                
                <ContactList items={filteredContacts} removeContact={removeContact} />
            </div>
        </>
    )  
}