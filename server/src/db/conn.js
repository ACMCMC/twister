const mongoose = require('mongoose');
const connectionString = process.env.DB_URI;
mongoose.connect(connectionString);

module.exports = mongoose;