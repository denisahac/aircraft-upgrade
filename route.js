// vendor libs
var passport = require('passport');
var _ = require('underscore');

// custom libs
// models
var Model = require('./models');
// collections
var Collection = require('./collections');

// get current user
var getCurrentUser = function(req) {
	var user = req.user;

	if(user !== undefined) {
		user = user.toJSON();
	}

	return user;
};

// validate authenticity
var isAuthenticated = function(req, res) {
	return req.isAuthenticated();		
};

// check if the current user is admin
var isAdmin = function(req, res) {
	var user = req.user;

	if(user !== undefined) {
		user = user.toJSON();
	}

	return isAuthenticated(req, res) && user && user.userRole.roleName === 'ADMINISTRATOR';
};

// check if the current user is owner/pilot
var isOwner = function(req, res) {
	var user = req.user;

	if(user !== undefined) {
		user = user.toJSON();
	}
	return isAuthenticated(req, res) && user && user.userRole.roleName === 'OWNER';
};

// check if the current user is product manufacturer
var isManufacturer = function(req, res) {
	isAuthenticated(req, res);
	var user = req.user;

	if(user !== undefined) {
		user = user.toJSON();
	}
	return isAuthenticated(req, res) && user && user.userRole.roleName === 'PRODUCT_MANUFACTURER';
};

// home/index page
var index = function(req, res) {
	var user = req.user;

	if(user !== undefined) {
		user = user.toJSON();
	}
	res.render('index', {title: 'Home | Aircraft Upgrade', user: user});
};

// about us page
var aboutUs = function(req, res) {
	res.render('about', {title: 'About | Aircarft Upgrade'});
};

// contact us page
var contactUs = function(req, res) {
	res.render('contact', {title: 'Contact | Aircraft Upgrade'});
};

// 404 not found page
var notFound404 = function(req, res, next) {
	res.status(404);
	res.render('404', {title: '404 Not Found | Aircraft Upgrade'});
};

// sign in page
var signIn = function(req, res, next) {
	if(req.isAuthenticated()) res.redirect('/');
	res.render('signin', {title: 'Sign In | Aircraft Upgrade'});
};

// sign in page
// POST
var signInPost = function(req, res, next) {
	passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/signin'}, function(err, user, info) {
		if(err) {
			return res.render('signin', {title: 'Sign In | Aircraft Upgrade', 'errorType': 'error', 'hasError': true, 'errorMessage': err.message});		
		} 

		if(!user) {
			return res.render('signin', {title: 'Sign In | Aircraft Upgrade', 'errorType': 'failure', 'hasError': true, 'errorMessage': info.message});
		}
		return req.logIn(user, function(err) {
			if(err) {
				return res.render('signin', {title: 'Sign In | Aircraft Upgrade', 'errorType': 'error', 'hasError': true, 'errorMessage': err.message});
			} else {
				return res.redirect('/dashboard/' + user.username);
			}
		});
	})(req, res, next);
}
// sign up page
var signUp = function(req, res) {
	if(req.isAuthenticated()) res.redirect('/');

	res.render('signup', {title: 'Sign Up | Aircraft Upgrade'});
};
// POST
// sign up page
var signUpPost = function(req, res, next) {
	var user = req.body;

	var errors = new Array();
	var hasError = false;
	var usernamePromise = null;

	usernamePromise = new Model.User({username: user.email}).fetch();

	return usernamePromise.then(function(model) {
			if(model) {
				errors.push('Email already exists');
				hasError = true;

				return renderAfterSignup(res, hasError, errors, user.email);
			} else {
				var signUpUser = new Model.User({
												email: user.email,
												password: user.password,
												roleId: parseInt(user.user_type),
												username: user.email});

				signUpUser.save().then(function(model) {
					var user = model.toJSON();
					req.body.username = user.email;
					req.body.password = user.password;

					// sign in the newly registered user after successful signup :D
					signInPost(req, res, next);
				});

	
			}
			
		});
};

// validate what view to render
var renderAfterSignup = function(res, hasError, errors, email) {
	if(hasError) {
		return res.render('signup', {title: 'Sign Up | Aircraft Upgrade', 'errorType': 'error', 
				'hasError': hasError, 'errors': errors, 'email': email});
	} else {
		return res.send('success');
	}
};

// sign out page
var signOut = function(req, res, next) {
	if(!isAuthenticated(req, res, next)) {
		notFound404(req, res, next);
	}

	req.logout();
	res.redirect('/signin');
};

// validate dashboard page
var dashboardValidate = function(req, res, next) {
	var username = req.params.username;
	var user = req.user;

	if(user !== undefined) {
		user = user.toJSON();
	}

	if(!username || username === undefined) notFound404(req, res, next);

	if(isAuthenticated(req, res)) {
		if(user.username === username) {
			next();
		} else {
			notFound404(req, res, next);
		}
	} else {
		signIn(req, res, next);
	} 
};

// dashboard page
var dashboard = function(req, res) {
	var user = req.user;

	if(user !== undefined) {
		user = user.toJSON();
	}

	// options
	if(isAuthenticated(req, res)) {
		var options = {title: 'Welcome ' + user.username + ' | Aircraft Upgrade', user: user};
	}

	if(isAdmin(req, res)) res.render('admin/dashboard', options);
	else if(isManufacturer(req, res)) res.render('manufacturer/dashboard', options);
	else if(isOwner(req, res)) res.render('owner/dashboard', options);
	else {
		res.redirect('/signin');
	}
};

/*********************************************************************************************/
// API routes
// products
// GET
var products = function(req, res) {
	Collection.Products.forge().fetch().then(function(models) {
		res.send(models);
	});
};
module.exports.products = products;
// product by id
var productById = function(req, res) {
	var productId = req.params.id;
	Model.Product.forge({productId: productId}).fetch().then(function(model) {
		if(model) {
			res.send(model);
		} else {
			res.send(404, {error: 'Model not found!'});
		}
	});
};
module.exports.productById = productById;
// product manufacturers
// GET
var productManufacturers = function(req, res) {
	var user = getCurrentUser(req);
	var userId = user.userId;
	
	Model.User.forge({userId: userId}).productManufacturer().fetch().then(function(model) {
		var productManufacturer = {};

		if(model)  {
			productManufacturer = model;
		}

		res.send(productManufacturer);
	});
};
module.exports.productManufacturers = productManufacturers;
// POST
var productManufacturersPost = function(req, res) {
	var user = getCurrentUser(req);
	var userId = user.userId;
	var data = req.body;

	data.userId = userId;
	
	Model.ProductManufacturer.forge(data).save().then(function(model) {
		if(model) {
			res.send(model);
		} else {
			res.send(404);
		}
	});
};
module.exports.productManufacturersPost = productManufacturersPost;
// product manufacturer by id
// GEt
var productManufacturerById = function(req, res) {
	var manufacturerId = req.params.id;

	Model.ProductManufacturer.forge({manufacturerId: manufacturerId}).fetch().then(function(model) {
		res.send(model);
	});
};
module.exports.productManufacturerById = productManufacturerById;
// save product manufacturer
// PUT
var productManufacturerSave = function(req, res) {
	var manufacturerId = req.params.id;
	
	var data = req.body;
	Model.ProductManufacturer.forge({manufacturerId: manufacturerId}).save(data).then(function(model) {
		res.send(model);
	});	

};
module.exports.productManufacturerSave = productManufacturerSave;

// product categories
var productCategories = function(req, res) {
	/*var manufacturerId = req.params.manufacturerId;

	var productCategories = new Collections.ProductCategories();
	var products  = new Collections.Products();

	if(manufacturerId) {
		products.set(manufacturerId: manufacturerId);
	}

	productCategories.fetch().then(function(models) {
		return models.mapThen(function(model) {
			return model.products().fetch().then(function(products) {
				model.set({'products': products});
				return model;
			}).then(function(products) {
				return products;
			});
		});
	}).then(function(models) {
		res.send(models);
	});
	*/


	Collection.ProductCategories.forge().fetch().then(function(models) {
		res.send(models);
	});
};
module.exports.productCategories = productCategories;
// product category by id
// GET
var productCategoryById = function(req, res) {
	var categoryId = req.params.id;
	Model.ProductCategory.forge({categoryId: categoryId}).fetch().then(function(model) {
		console.log(model.toJSON());
		res.send(model)
	});
};
module.exports.productCategoryById = productCategoryById;
// create new product category
var productCategoryPost = function(req, res) {
	var data = req.body;
	Model.ProductCategory.forge(data).save().then(function(model) {
		if(model) {
			res.send(model)
		} else {
			res.send(400);
		}
	});
};
module.exports.productCategoryPost = productCategoryPost;
// save/update product category
var productCategorySave = function(req, res) {
	var categoryId = req.params.id;
	var data = req.body;

	data.categoryId = categoryId;
	// save data
	Model.ProductCategory.forge({categoryId: categoryId}).fetch().then(function(model) {
		if(model) {
			model.save(data).then(function(model) {
				if(model) {
					res.send(model);
				} else {
					res.send(400);
				}
			});
		} else {
			res.send(404);
		}
	});
};
module.exports.productCategorySave = productCategorySave;

// product certification types
var productCertificationTypes = function(req, res) {
	Collection.ProductCertificationTypes.forge().fetch().then(function(models) {
		res.send(models);
	});
};
module.exports.productCertificationTypes = productCertificationTypes;

// products
// products by manufacturer
var productsByManufacturer = function(req, res) {

};
module.exports.productsByManufacturer = productsByManufacturer;
/*********************************************************************************************/

// export methods
/**************************************/
// index
module.exports.index = index;

// about us
module.exports.aboutUs = aboutUs;

// contact us
module.exports.contactUs = contactUs;

// 404 not found
module.exports.notFound404 = notFound404;

// sigin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;

// sign out
module.exports.signOut = signOut;

// dashboard validate
module.exports.dashboardValidate = dashboardValidate;

// dashboard
module.exports.dashboard = dashboard;