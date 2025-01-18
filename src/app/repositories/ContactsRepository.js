const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Guilherme',
    email: 'guilherme@email.com',
    phone: '123456789',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Fulano',
    email: 'fulano@email.com',
    phone: '987654321',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      const contact = contacts.find((contact) => contact.id === id);

      resolve(contact);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      const contact = contacts.find((contact) => contact.email === email);

      resolve(contact);
    });
  }

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const contact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(contact);

      resolve(contact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);

      resolve();
    });
  }
}

module.exports = new ContactsRepository();
