import { useState } from 'react'
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css'

export default function ContactForm ({ onSubmit }) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameId = nanoid();
    const phoneId = nanoid();

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

     const handleNumberChange = (e) => {
        setNumber(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({name, number});
        resetForm();
    }

    const resetForm = () => {
        setName('');
        setNumber('')
    }
  

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <label htmlFor={nameId} className={css.label}>Name</label>
            <input
                id={nameId}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={handleNameChange}
            />
            <label htmlFor={phoneId} className={css.label}>Number</label>
            <input
                id={phoneId}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={handleNumberChange}
            />
            <button type='submit' className={css.button}>Add contact</button>
        </form>
    )

}
