var express = require('express');
const Company = require('../models/company');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    Company.find({},{_id: 0} ,(err, companies)=>{  //if _id: 0, the data excludes all _id values, if _id: 1, then it exclusively returns only _ids
      if (err){
        res.render('index');
      } else {
        console.log(companies);
        res.render('index', {companies});
      }
    })
  })

  .post((req, res, next) => {
    let location = [req.body.longitude, req.body.latitude];

	const newCompany = {
      name:           req.body.name,
      description:    req.body.description,
      city:           req.body.city,
	    coordinates:    location,
    };

  	const company = new Company(newCompany);

  	company.save((error) => {
  		if (error) {
  			next(error);
  		} else {
  			res.redirect('/');
  		}
  	})
  });

router.route('/new')
  .get((req, res, next) => {
        res.render('companies/new');
      }
    );



router.get('/test', (req, res, next) =>{
  res.render('test');
});
module.exports = router;
