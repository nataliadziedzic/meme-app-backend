require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});

app.use(express.json());

const memesRouter = require('./routes/memes');
app.use('/memes', memesRouter);

app.use(cors());
app.listen(5000, () => {
    console.log("Server is on");
});