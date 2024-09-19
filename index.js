const exp = require('express');
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



app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor en línea');
});