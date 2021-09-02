const express   = require('express')
const mustacheExpress = require('mustache-express')
const path = require('path')


// Server Properties
const PORT = 3000

const app = express()
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'html/static')))
app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());

require('./views/routes')(app)  // Frontend Routes
require('./api/routes')(app)    // Backend Routes

app.listen(PORT, () => {
  console.log(`Web App listening at http://localhost:${PORT}`)
})