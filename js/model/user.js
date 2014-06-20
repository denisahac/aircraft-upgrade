/*
 * fileName: user.js
 * date: May 14, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */
AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
	// model
	// user
	Model.User = Backbone.Model.extend({
		initialize: function() {
			// TODO code goes here.
		},
		urlRoot: '/users',
		defaults: {
			username: '',
			password: '',
			email: '',
			roleId: 0, // (foreign key)
			userRole: new Model.UserRole(), // user role reference
			owner: new Model.Owner(), // owner reference returns null if user type is other than OWNER
			productManufacturer: new Model.ProductManufacturer(), // product manufacturer reference returns null if user type is other than PRODUCT_MANUFACTURER
		}
	});

	// collection of users
	Model.Users = Backbone.Collection.extend({
		initialize: function() {
			// TODO code goes here.
		},
		url: '/users',
		model: Model.User
	});
});