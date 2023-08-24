const cors = require('cors')
const express = require('express')
require('dotenv').config()

// importing Routers
const CategoriesRouter = require('./routers/categoriesRouter')
const SightingsRouter = require('./routers/sightingsRouter')

// importing Controllers
const CategoriesController = require('./controllers/categoriesController')
const SightingsController = require('./controllers/sightingsController')

// importing DB
const db = require('./db/models/index')
const {Category, sighting } = db

// initializing Controllers -> note the lowercase for the first word
const categoriesController = new CategoriesController(Category)
const sightingsController = new SightingsController(sighting, Category)

// inittializing Routers
const categoriesRouter = new CategoriesRouter(categoriesController).routes()
const sightingsRouter = new SightingsRouter(sightingsController).routes()


const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// USING the routers
app.use('/categories', categoriesRouter)
app.use('/sightings', sightingsRouter)

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
