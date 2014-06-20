/*
 * fileName: productCertificationType.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// product certification type
 	Model.ProductCertificationType = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		idAttribute: 'certificationTypeId'
 		urlRoot: '/api/productCertificationTypes',
 		defaults: {
 			certificationType: '',
 			// for documentation purposes only
 			/*
 			productCertificationTypeFAAs: new Model.ProductCertificationTypeFAAs(), // list of product certification type faas
 			productCertificationTypeAMLs: new Model.ProductCertificationTypeAMLs(), // list of product certification type amls
 			products: new Model.Products(), // list of products
 			*/
 		}
 	});

 	// collection of product certification types
 	Model.ProductCertificationTypes = Backbone.Collection.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		url: '/api/productCertificationTypes',
 		model: Model.ProductCertificationType
 	});
 })