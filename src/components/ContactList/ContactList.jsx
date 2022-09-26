import React from 'react'
import PropTypes from "prop-types";
import css from "components/ContactList/ContactList.module.css"

export default function ContactList({ items, removeContact }) {
    const contacts = items.map(({ name, number, id }) => {
        return (
            <li key={id} className={css.item}>
                <span className={css.marker}></span>
                <p className={css.text}>{`${name}: ${number}`}</p>
                <button
                    className={css.button}
                    type='button'
                    onClick={() => { removeContact(id) }}
                    >Delete
                </button>
            </li>
        )
    })
    return (
        <ul className={css.contactList}>{contacts}</ul>
  )
}

ContactList.propTypes = {
    removeContact: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.exact({
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
    })).isRequired
}


