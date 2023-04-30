const fs = require('fs').promises;
const path = require("path");
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname,"db","contacts.json")


async  function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    console.table(parseContacts)
    return parseContacts
}

async function getContactById(contactId) {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    const contactById = parseContacts.find(el=> el.id === contactId);
    console.log(contactById);
    return contactById;
}

async function removeContact(contactId) {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    const listAfterRemove = parseContacts.filter(el=> el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(listAfterRemove,null,2))
    console.table(listAfterRemove)
}

async function addContact(name, email, phone) {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    const newContact = parseContacts.push({
        name,
        email,
        phone,
        id: nanoid()
    })
    await fs.writeFile(contactsPath, JSON.stringify(parseContacts,null,2))
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}