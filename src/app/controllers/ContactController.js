const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // List all registered contacts

    const contacts = await ContactsRepository.findAll();

    return response.json(contacts);
  }

  show() {
    // Show a single contact
  }

  store() {
    // Create a new contact
  }

  update() {
    // Update a contact
  }

  delete() {
    // Delete a contact
  }
}

// Export instance of ContactController like a singleton
module.exports = new ContactController();
