const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App' });
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.post('/display-input', (req, res) => {
    const input = req.body.hello;
    res.render('input', { input });
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/input', (req, res) => {
    res.render('input');
});
