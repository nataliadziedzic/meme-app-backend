if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});

app.use(express.json());

const imagesRouter = require('./routes/images');
app.use('/images', imagesRouter);

const memesRouter = require('./routes/memes');
app.use('/memes', memesRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is on");
});