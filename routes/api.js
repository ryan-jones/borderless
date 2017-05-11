var express = require('express');
var router = express.Router();

const Company = require('../models/company');

router.route('/')
	.get((req, res) => {
        let location = req.query.location;
				let type = req.query.position;
				let level =req.query.level;
				var description = req.query.description;




				var levels = ["JUNIOR", 'MID-LEVEL', 'SENIOR-LEVEL']
				var levelIndex = levels.indexOf(level)

				var allSelectedLevels = levels.filter((level, index)=>{
					return index >= levelIndex
				})
        location = location.split("").map((char, index)=> index == 0? char.toUpperCase() : char).join("")
	  Company.find({city: location, [type]: { $in: allSelectedLevels }}, (error, companies) => {
	  	if (error) {

				console.log('error: this is location', location, "this is type", type, "this is level", level);
	  		res.status(500).json({message: error});


	  	} else {
				console.log('this is location', location, "this is type", type, "this is level", level);
				console.log(companies);
	  		res.status(200).json(companies);

	  	}
	  });
	});

module.exports = router;
