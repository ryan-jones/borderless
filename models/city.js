const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  coordinates: [Number, Number],  // index 0 is lat, index 1 is long
});
// placeSchema.index({ location: '2dsphere' });


const City= mongoose.model("Cty", citySchema);


module.exports = City;
