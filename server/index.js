const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = express.Router();
const https = require('https');

const app = express();
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const uploads = require('./routes/api/uploads')
const lesson = require('./routes/api/lesson')

app.use('/api/uploads', uploads)
app.use('/api/lesson', lesson)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendfile(__dirname + 'index.html'));

}
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));