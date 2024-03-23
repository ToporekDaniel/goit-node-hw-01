const fs = require("fs").promises;
const path = require("path");
// const { nanoid } = require("nanoid");

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: udokumentuj każdą funkcję
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contactList = JSON.parse(data);
      const contact = contactList.find((con) => con.id === contactId);
      console.log("your contact is:", contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contactList = JSON.parse(data);
      const updatedContacts = contactList.filter((con) => con.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contactList = JSON.parse(data);

      const newContact = {
        id: newId(),
        name,
        email,
        phone,
      };

      contactList.push(newContact);

      fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
