const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  description:{
    type: String,
    enum : ['yes', 'maybe', 'no'],
  },
  coordinates: [Number, Number],  // index 0 is lat, index 1 is long
});
// placeSchema.index({ location: '2dsphere' });


const Company = mongoose.model("Company", companySchema);


module.exports = Company;
