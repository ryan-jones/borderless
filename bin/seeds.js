const mongoose = require('mongoose');
const Company = require('../models/company');

mongoose.connect("mongodb://localhost:27017/borderless");

let companies = [
 {name: 'Travel Perk',
  description: 'yes',
  city: 'Barcelona',
  coordinates: [2.154306, 41.396874],
  icon: '',
  type: 'travel',
  website: 'http://travelperk.com/'
 },
 {name: 'Skyscanner',
  description: 'yes',
  city: 'Barcelona',
  coordinates: [2.169416, 41.386005],
  icon: '',
  type: 'travel',
  website: 'https://www.skyscanner.net/'
 },
 {name: 'Frame 25',
  description: 'yes',
  city: 'Madrid',
  coordinates: [-3.673085, 40.417115],
  icon: '',
  type: 'recruitment',
  website: 'https://www.frame-25.com/'
 }
]// Iteration #1

Company.create(companies, (err, docs)=> {
 if(err) { throw err}
 docs.forEach((company) => {
   console.log(company.name);
})

mongoose.connection.close();

});
