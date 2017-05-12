var express = require('express');
var router = express.Router();

const Company = require('../models/company');





router.route('/')
	.get((req, res) => {
        let location = req.query.location;
				let type = req.query.position;
				let level =req.query.level;
				var description = req.query.description;

				var levels = ["JUNIOR-LEVEL", 'MID-LEVEL', 'SENIOR-LEVEL']
				var levelIndex = levels.indexOf(level)

				var allSelectedLevels = levels.filter((level, index)=>{
					return index >= levelIndex
				})
        location = location.split("").map((char, index)=> index == 0? char.toUpperCase() : char).join("")
				console.log(type);
				console.log(allSelectedLevels);
				console.log(location);
	  Company.find({city: location, [type]: { $in: allSelectedLevels }}, (error, companies) => {
	  	if (error) {

				console.log('error: this is location', location, "this is type", type, "this is level", level);
	  		res.status(500).json({message: error});


	  	} else {
				console.log('this is location', location, "this is type", type, "this is level", level, "companies", companies);
				console.log("return",companies);
	  		res.status(200).json(companies);
	  	}
	  });
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
