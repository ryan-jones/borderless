var express = require('express');
const Company = require('../models/company');
const User     = require("../models/user");
const passport = require("../helpers/passport");
const bcryptSalt = 10;

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

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { "message": req.flash("error") });
});

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "" || password === "") {
  	req.flash('error', 'Indicate username and password' );
    res.render("auth/signup", { "message": req.flash("error") });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The username already exists' );
      res.render("auth/signup", { message: req.flash("error") });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The username already exists' );
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/secret');
        });
      }
    });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/logout", (req, res) => {
  req.logout();
  delete res.locals.currentUser;
  delete req.session.passport;
  // delete currentUser and passport properties 
  // becasuse when we calling req.logout() is leaving an empty object inside both properties.
  res.redirect('/');
  
  
});


router.get('/test', (req, res, next) =>{
  res.render('test');
});
module.exports = router;
