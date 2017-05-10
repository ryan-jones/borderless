const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  description:{
    type: String,
    enum : ['yes', 'maybe', 'no'],
  },
  position: {
    type: String,
    // enum : ['Junior Web Developer', 'Junior Mobile Developer', 'Junior UX/UI Developer', 'Mid-level Web Developer', 'Mid-level Mobile Developer', 'Mid-level UX/UI Developer', 'Senior Web Developer', 'Senior Mobile Developer', 'Senior UX/UI Developer']
  },
  city: String,
  coordinates: [Number, Number],  // index 0 is lat, index 1 is long
  icon: String,
  type: String,
  website: String,
  details: String,
});
// placeSchema.index({ location: '2dsphere' });


const Company = mongoose.model("Company", companySchema);


module.exports = Company;
