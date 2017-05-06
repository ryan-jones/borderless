const mongoose = require('mongoose');
const Company = require('../models/company');

mongoose.connect("mongodb://localhost:27017/borderless");

let companies = [
 {name: 'Travel Perk',
  description: 'yes',
  city: 'Barcelona',
  coordinates: [2.154306, 41.396874],
 },
 {name: 'Skyscanner',
  description: 'yes',
  city: 'Barcelona',
  coordinates: [2.169416, 41.386005],
 },
 {name: 'Frame 25',
  description: 'yes',
  city: 'Madrid',
  coordinates: [-3.673085, 40.417115],
 }
]// Iteration #1

Company.create(companies, (err, docs)=> {
 if(err) { throw err}
 docs.forEach((company) => {
   console.log(company.name);
})

mongoose.connection.close();

});