var express = require('express');
const Company = require('../models/company');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Company.find({},{_id: 0} ,(err, companies)=>{  //if _id: 0, the data excludes all _id values, if _id: 1, then it exclusively returns only _ids
    if (err){
      res.render('index');
    } else {
      console.log(companies);
      res.render('index', {companies});
    }
  })
});

router.get('/test', (req, res, next) =>{
  res.render('test');
});
module.exports = router;
