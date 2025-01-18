class ContactController {
  index(request, response) {
    // List all registered contacts

    response.send('List of contacts');
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
