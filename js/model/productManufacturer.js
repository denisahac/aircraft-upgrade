/*
 * fileName: productManufacturer.js
 * date: May 14, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */
AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
	// model
	// product manufacturer
	Model.ProductManufacturer = Backbone.Model.extend({
		initialize: function () {
			// TODO code goes here.
		},
		idAttribute: 'manufacturerId',
		urlRoot: '/api/productManufacturers',
		defaults: {
			userId: '', // (foreign key)
			companyName: '',
			streetAddress1: '',
			streetAddress2: '',
			city: '',
			state: '',
			zipCode: '',
			country: '',
			websiteUrl: '',
			phoneNo: '(000) 000 0000',
			// for documentation purposes only
			/*
			user: new Model.User(), // user reference
			engines: new Model.Engines(), // list of engines
			propellers: new Model.Propellers(), // list of propellers
			products: new Model.Products(), // list of products
			*/
		},
		// validation
		validate: function(attrs, options) {
			var errors = {};
			if(!attrs.companyName) {
				errors.companyName = 'Can\'t be blank';
			}

			if(!attrs.streetAddress1) {
				errors.streetAddress1 = 'Can\'t be blank';
			}

			if(!attrs.city) {
				errors.city = 'Can\'t be blank';
			}

			if(!attrs.state) {
				errors.state = 'Can\'t be blank';
			}

			if(!attrs.zipCode) {
				errors.zipCode = 'Can\'t be blank';
			}

			if(!attrs.country) {
				errors.country = 'Can\'t be blank';
			}

			if(attrs.websiteUrl) {
				var URLexpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
				var regex = new RegExp(URLexpression);
				if(!attrs.websiteUrl.match(regex)) {
					errors.websiteUrl = 'Invalid URL';
				}
			}

			if(!_.isEmpty(errors)) {
				return errors;
			}
		}
	});

	// collection of product manufacturers
	Model.ProductManufacturers = Backbone.Collection.extend({
		initialize: function() {
			// TODO code goes here.
		},
		url: '/api/productManufacturers',
		model: Model.ProductManufacturer
	});
});