var express = require('express');
const bcrypt   = require("bcrypt");
const Company = require('../models/company');
const User     = require("../models/user");
const passport = require("../helpers/passport");
const bcryptSalt = 10;
var auth    = require('../helpers/auth');

var router = express.Router();




//get home page
router.get('/', (req, res, next) => {
    res.render('index');
  })


/* GET explore page. */
router.route('/explore')
  .get((req, res, next) => {
    Company.find({},{_id: 0} ,(err, companies)=>{  //if _id: 0, the data excludes all _id values, if _id: 1, then it exclusively returns only _ids
      if (err){
        res.render('explore');
      } else {
        let city = req.query.city;
        res.render('explore', {companies , city});
        console.log('companies', companies);
         //passes to script on explore.ejs page
      }

    })

  })

  .post((req, res, next) => { //places the companies onto the map and for use on right-side bar
    let location = [Number(req.body.longitude), Number(req.body.latitude)];

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





/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { "message": req.flash("error") });
});

router.post("/signup", (req, res, next) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var nationality = req.body.nationality;
  var role = req.body.usertype;

  if (username === "" || password === "") {
  	req.flash('error', 'Indicate username and password' );
    res.render("auth/signup", { "message": req.flash("error") });
    return;
  }

  User.findOne({ username }, "name", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The username already exists' );
      res.render("auth/signup", { message: req.flash("error") });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      name,
      username,
      password: hashPass,
      nationality,
      role
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The username already exists' );
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/login');
        });
      }
    });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/users/index/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get('/users/index/', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  if(req.user.role === "USER") {
      res.render('users/index', { user: JSON.stringify(req.user) });
  } else if (eq.user.role === "COMPANY") {
      res.render('companies/index', { user: JSON.stringify(req.user) });
  } else {
      res.render('admin/index', { user: JSON.stringify(req.user) });
    }
});

router.get('/new', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('COMPANY'), (req, res, next) => {
  res.render('companies/new', { user: JSON.stringify(req.user) });
});

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
