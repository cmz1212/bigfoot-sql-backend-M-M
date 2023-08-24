const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, categoryModel) {
    super(model);
    this.categoryModel = categoryModel;
  }

  // Retrieve specific sighting
  async getOneSighting(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add a new sighting
  async postOneSighting(req, res) {
    try {
      // Get the input data from the request body
      const { date, location, notes, selectedCategoryIds } = req.body;

      // Create a new sighting record using Sequelize's create method
      const newSighting = await this.model.create({
        date: new Date(date),
        location,
        notes,
        created_at: new Date(),
        updated_at: new Date(),
      });
       // Retrieve selected categories
       const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });
      // Associated new sighting with selected categories
      await newSighting.setCategories(selectedCategories);
      // Respond with new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;