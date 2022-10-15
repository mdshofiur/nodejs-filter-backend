const express = require('express');
const dotenv = require("dotenv");
const dbConnect = require('./dbConnect');
const moviesRoute = require('./routes/movies.route');
const cors = require("cors");

const app = express();
dotenv.config();
// app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { 
    res.status(200).json({
        message: 'It works!'
})
});

dbConnect();


app.use('/api/v1/movie', moviesRoute);


const port = process.env.PORT || 3000;

app.listen(port, () => [
  console.log(`Server is running on port ${process.env.PORT}`),
]);