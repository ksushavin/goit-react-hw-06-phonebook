import React, { Component } from 'react'
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css'

export default class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    nameId = nanoid();
    phoneId = nanoid();

    handleChange = (e) => {
        const{name, value} = e.target
        this.setState({
            [name]: value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, number } = this.state;
        this.props.onSubmit({name, number});
        this.resetForm();
    }
    resetForm = () => {
         this.setState({
            name: '',
            number: ''
        })
    }

    render() {
        const{ state, nameId, phoneId, handleChange, handleSubmit } = this
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
                    value={state.name}
                    onChange={handleChange}
                />
                <label htmlFor={phoneId} className={css.label}>Number</label>
                <input
                    id={phoneId}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={state.number}
                    onChange={handleChange}
                />
                <button type='submit' className={css.button}>Add contact</button>
            </form>
        )
    }
}
