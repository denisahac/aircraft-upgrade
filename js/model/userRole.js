/* 
 * fileName: userRole.js
 * date: May 14, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */
AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
	// model
	// user role
	Model.UserRole = Backbone.Model.extend({
		initialize: function() {
			// TODO code goes here.
		},
		urlRoot: '/userRoles',
		defaults: {
			roleId: 0,
			roleName: '',
			users: new Model.Users(), // list of users
		}
	});

	// collection of user roles
	Model.UserRoles = Backbone.Collection.extend({
		initialize: function() {
			// TODO code goes here.
		},
		url: '/userRoles',
		model: Model.UserRole
	});
});	