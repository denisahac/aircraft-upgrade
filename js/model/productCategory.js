/*
 * fileName: productCategory.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// product category
 	Model.ProductCategory = Backbone.Model.extend({
 		initialize: function(options) { 
 			// TODO code goes here.
 		},
 		idAttribute: 'categoryId',
 		urlRoot: '/api/productCategories',
 		defaults: {
 			categoryName: '',
 			/***************************************/
 			// for documentation purposes only
 			/*
 			products: new Model.Products()
 			*/
 		},
 		validate: function(attrs, options) {
 			var errors = {};

 			if(!attrs.categoryName) {
 				errors.categoryName = 'Category name should not be blank';
 			}

 			if(!_.isEmpty(errors)) {
 				return errors;
 			}
 		}
 	});

 	// collection of product categories
 	Model.ProductCategories = Backbone.Collection.extend({
 		initialize: function(options) {
 			// TODO code goes here.
 			
 		},
 		url: '/api/productCategories',
 		model: Model.ProductCategory
 	});
 });