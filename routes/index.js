var express = require('express');
const Company = require('../models/company');
var router = express.Router();



//get home page
router.get('/', (req, res, next) => {
    res.render('index');
  })


/* GET explore page. */
router.route('/explore')
  .get((req, res, next) => {
    console.log(req.query);
    let city = req.query.city;
    Company.find({},{_id: 0} ,(err, companies)=>{  //if _id: 0, the data excludes all _id values, if _id: 1, then it exclusively returns only _ids
      if (err){
        res.render('explore');
      } else {
        console.log('city1', city);
        res.render('explore', {companies , city});
         //passes to script on explore.ejs page
        console.log('companies', companies);
      }

    })

  })

  .post((req, res, next) => { //places the companies onto the map and for use on right-side bar
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
  			res.redirect('/explore');
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
