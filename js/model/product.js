/*
 * fileName: product.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// product
 	Model.Product = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		idAttribute: 'productId',
 		urlRoot: '/api/products',
 		defaults: {
 			/*
 			productId: 0,
 			categoryId: 0, // (foreign key)
 			manufacturerId: 0, // (foreign key)
 			*/
 			name: '',
 			//picture: '', // picture tinyblob
 			partNumber: 0,
 			description1: '',
 			description2: '',
 			description3: '',
 			srp: 0.00,
 			/*************************************/
 			// for documentation puposes only
 			/*
 			productCategory: new Model.ProductCategory(), // product category reference
 			productManufacturer: new Model.ProductManufacturer(), // product manufacturer reference
 			aircrafts: new Model.Aircrafts(), // list of aircrafts
 			productCertificationTypeFAA: new Model.ProductCertificationTypeFAA(), // product certification type faa reference, returns null if the product is not faa type
 			productCertificationTypeAML: new Model.ProductCertificationTypeAML(), // product certification type faa reference, returns null if the product is not aml type
 			productCertificationTypes: new Model.ProductCertificationTypes()
 			*/
 		}
 	});

 	// collection of products
 	Model.Products = Backbone.Collection.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		url: '/api/products',
 		model: Model.Product
 	});
 });