const { v4 } = require('uuid');

const db = require('../../database');

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
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts');

    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [
      email,
    ]);

    return row;
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `INSERT INTO contacts(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, category_id]
    );

    return row;
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const contactIndex = contacts.findIndex((contact) => contact.id === id);

      contacts[contactIndex] = {
        ...contacts[contactIndex],
        name,
        email,
        phone,
        category_id,
      };

      resolve(contacts[contactIndex]);
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
