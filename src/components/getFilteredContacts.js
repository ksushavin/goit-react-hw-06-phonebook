export const getFilteredContacts = (state) => {
    const { filter, contacts } = state;
    
    if (!filter) {
        return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    
    const filteredContacts = contacts.filter(({ name }) => {
        const normalizedName = name.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter);
        return result;
    });
    return filteredContacts;
    }