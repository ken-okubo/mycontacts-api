const ContactsRepository = require("../repositories/ContactsRepository");
const isValidUUID = require("../utils/isValidUUID");

class ContactController {
  async index(req, res) {
    // Return a list of all contacts
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    // Return a single contact by ID
    const { id } = req.params;
    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid contact ID" });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  }

  async store(req, res) {
    // Create a new contact
    const { name, email, phone, category_id } = req.body;

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail) {
        return res.status(400).json({ error: "This email is already in use" });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.status(201).json(contact);
  }

  async update(req, res) {
    // Update an existing contact by ID
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid contact ID" });
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: "Contact not found" });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return res.status(400).json({ error: "This email is already in use" });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.json(contact);
  }

  async delete(req, res) {
    // Delete a contact by ID
    const { id } = req.params;
    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid contact ID" });
    }
    await ContactsRepository.delete(id);
    // 204: no content
    res.sendStatus(204);
  }
}

// Singleton: always export the same instance
module.exports = new ContactController();
