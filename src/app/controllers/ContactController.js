const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // List all registered contacts
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    return response.json(contacts);
  }

  async show(request, response) {
    // Show a single contact
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    // Create a new contact
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactAlreadyExists = await ContactsRepository.findByEmail(email);

    if (contactAlreadyExists) {
      return response
        .status(400)
        .json({ error: 'This email is already being used' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    return response.json(contact);
  }

  async update(request, response) {
    // Update a contact

    const { id } = request.params;

    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This email is already being used' });
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    return response.json(updatedContact);
  }

  async delete(request, response) {
    // Delete a contact
    const { id } = request.params;

    await ContactsRepository.delete(id);

    // No content(204) - The server successfully processed the request and is not returning any content
    return response.sendStatus(204);
  }
}

// Export instance of ContactController like a singleton
module.exports = new ContactController();
