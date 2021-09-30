const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  star: Number,
});

module.exports = mongoose.model('Author', authorSchema);
