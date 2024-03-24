const fs = require("fs").promises;
const path = require("path");

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log("All contacts: ".blue, JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contactList = JSON.parse(data);
      const contact = contactList.find((con) => con.id === contactId);
      console.log("Your contact is: ".blue, contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contactList = JSON.parse(data);
      const contactIndex = contactList.findIndex((con) => con.id === contactId);

      if (contactIndex === -1) {
        console.log("Contact with given ID does not exist.".red);
        return;
      }
      const updatedContacts = contactList.filter((con) => con.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
      console.log("Contact successfully removed.".blue);
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

      fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2)).then(
        () => {
          getContactById(newContact.id);
        }
      );
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
