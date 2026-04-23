const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    res.json(categories);
  }

  async show(req, res) {
    // Return a single category by ID
    const { id } = req.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  }

  async store(req, res) {
    // Create a new category
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: "This name is already in use" });
    }

    const category = await CategoriesRepository.create({
      name,
    });

    res.status(201).json(category);
  }

  async update(req, res) {
    // Update an existing category by ID
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const categoryByName = await CategoriesRepository.findByName(name);
    if (categoryByName && categoryByName.id !== id) {
      return res.status(400).json({ error: "This name is already in use" });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    res.json(category);
  }

  async delete(req, res) {
    // Delete a category by ID
    const { id } = req.params;

    await CategoriesRepository.delete(id);
    // 204: no content
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
