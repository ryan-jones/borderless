var express = require('express');
var router = express.Router();

const Company = require('../models/company');

router.route('/')
	.get((req, res) => {
        let location = req.query.location;
        console.log('thisis location', location);
        location = location.split("").map((char, index)=> index == 0? char.toUpperCase() : char).join("")
	  Company.find({city: location}, (error, companies) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
              console.log(companies)
	  		res.status(200).json(companies);
	  	}
	  })
	});

router.route('/company/:company_id')
	.get((req, res) => {
        let companyId = req.query.companyId;
        console.log('thisis company', companyId);
	  	Company.findOne({ _id: companyId}, (error, company) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
              console.log(company)
	  		res.status(200).json(company);
	  	}
	  })
	});


module.exports = router;