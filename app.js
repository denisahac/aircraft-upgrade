// vendor libs
var express = require('express');
var jade = require('jade');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// custom libs
var route = require('./route');
// collections
var Model = require('./models');

var app = express();

// passport local strategy
passport.use(new LocalStrategy(function(username, password, done) {
	new Model.User({username: username}).fetch({withRelated: ['userRole']}).then(function(data) {
		var user = data;
		if(user === null) {
			return done(null, false, {message: 'Invalid email or password'});
		} else {
			user = data.toJSON();
			if(user.password !== password) {
				return done(null, false, {message: 'Invalid email or password'});
			} else {
				return done(null, user);
			}
		}
	});
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch({withRelated: ['userRole']}).then(function(user) {
   		done(null, user);
   });

});
// set variables
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', { pretty: true, layout: false });

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/css', express.static(__dirname + '/css')); // expose css folder
app.use('/js', express.static(__dirname + '/js')); // expose js folder
app.use('/images', express.static(__dirname + '/images')); // expose images folder

/****************URLs*******************/
// authenticate

// GET
app.get('/', route.index);
app.get('/home', route.index);
app.get('/index', route.index);

// about us
// GET
app.get('/about', route.aboutUs);
app.get('/aboutus', route.aboutUs);

// contact us
// GET
app.get('/contact', route.contactUs);
app.get('/contactus', route.contactUs);


// signin
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

// logout
// GET
app.get('/signout', route.signOut);

// validate who's accessing the dashboard
app.all('/dashboard/:username*', route.dashboardValidate);
app.get('/dashboard/:username', route.dashboard);

/************************************************************************************************/
// API
app.get('/api/*', function(req, res, next) {next()});

// product manufacturers
// GET
app.get('/api/productManufacturers', route.productManufacturers);
// POST
app.post('/api/productManufacturers', route.productManufacturersPost);
// product manufacturer by id
// GET
app.get('/api/productManufacturers/:id', route.productManufacturerById);
// PUT
app.put('/api/productManufacturers/:id', route.productManufacturerSave);

// product categories
// GET
app.get('/api/productCategories', route.productCategories);
// product category by id
// GET
app.get('/api/productCategories/:id', route.productCategoryById);
// create new product category
// POST
app.post('/api/productCategories', route.productCategoryPost);
// save/update product category
// PUT
app.put('/api/productCategories/:id', route.productCategorySave);

// product certification types
app.get('/api/productCertificationTypes', route.productCertificationTypes);

// products
// GET
app.get('/api/products', route.products);
// product by id
// GET
app.get('/api/products/:id', route.productById);

app.get('/api/productsByManufacturer/:manufacturerId/:categoryId', route.productsByManufacturer);
/************************************************************************************************/

/********************************/
// 404 not found
app.use(route.notFound404);

var server = app.listen(app.get('port'), function(err) {
	if(err) throw err;

	var message = 'Server is running @ http://localhost:' + server.address().port;
	console.log(message);
});