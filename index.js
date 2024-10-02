const exp = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const router = require('./backend/routers/routers')
const app = exp();

app.use(logger('dev'))
app.set('view engine', 'ejs');
app.use(exp.urlencoded({ extended: true })); 
app.use(exp.json()); 
app.set('views', path.join(__dirname, 'frontend', 'views'));
app.use(exp.static(path.join(__dirname, 'frontend', 'static')));
app.use("/v1", router);

// parse application/json
app.use(bodyParser.json())

// Ruta principal
app.get('/', (req, res) => {
    res.render('home/home'); 
});

//Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).render("404/404");
  });

//Puerto de eschuca servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor esta en el puerto http://localhost:${PORT}`);
});
