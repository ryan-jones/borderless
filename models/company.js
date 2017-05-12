const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  type: String,
  city: String,
  description:{
    type: String,
    enum : ['YES', 'NO'],
  },
  webdeveloper: {
    type: String,
    enum : ['JUNIOR-LEVEL', 'MID-LEVEL', 'SENIOR-LEVEL', 'NONE'],
  },
  mobiledeveloper: {
    type: String,
    enum : ['JUNIOR-LEVEL', 'MID-LEVEL', 'SENIOR-LEVEL', 'NONE'],
  },
  uxdeveloper: {
    type: String,
    enum : ['JUNIOR-LEVEL', 'MID-LEVEL', 'SENIOR-LEVEL', 'NONE'],
  },
  coordinates: [Number, Number],  // index 0 is lat, index 1 is long
  icon: String,
  website: String,
  details: String,
  userid: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Company = mongoose.model("Company", companySchema);


module.exports = Company;