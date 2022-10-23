
import { useSelector, useDispatch } from "react-redux";
import { addContact, removeContact } from 'redux/contact-slice';
import { getFilter } from 'redux/selectors';
import { getFilteredContacts } from 'components/getFilteredContacts';
import { setFilter } from 'redux/filter-slice';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from 'components/Phonebook/Phonebook.module.css'

export default function Phonebook() {
    const contacts = useSelector(getFilteredContacts);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    const onAddContact = (data) => {
        if (isDuplicate(data)) {
            return alert(`${data.name} is already in contacts`);
        }
        const action = addContact(data);
        dispatch(action);
    }

    const onRemoveContact = (id) => {
        const action = removeContact(id);
        dispatch(action);
    }

    const handleFilterChange = (e) => {
        const { value } = e.target;
        dispatch(setFilter(value));
    }

    const isDuplicate = (data) => {
        const result = contacts.find(({ name, number }) =>
            data.name === name && data.number === number
        )
        return result
    }

    return (
        <>
            <div className={css.contactForm}>
                <h1 className={css.title}>Phonebook</h1>
                <ContactForm onSubmit={onAddContact} />
            </div>
            <div className={css.contactsWrapper}>
                <h2 className={css.title}>Contacts</h2>
                <Filter onChange={handleFilterChange} value={filter} />
                
                <ContactList items={contacts} removeContact={onRemoveContact} />
            </div>
        </>
    )  
}