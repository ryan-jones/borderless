const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  nationality: String,

});
// placeSchema.index({ location: '2dsphere' });


const User = mongoose.model("User", userSchema);


module.exports = User;
