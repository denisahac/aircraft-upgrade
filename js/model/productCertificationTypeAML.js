/*
 * fileName: productCertificationTypeAML.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// product certification type aml
 	Model.ProductCertificationTypeAML = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		urlRoot: '/productCertificationTypeAMLs',
 		defaults: {
 			amlId: 0,
 			// pdfOfAML: '', // pdfOfAML blob
 			certificationTypeId: 0, // (foreign key)
 			productId: 0, // (foreign key)
 			productCertificationType: new Model.ProductCertificationType(), // product certification type reference
 			product: new Model.Product(), // product reference
 		}
 	});

 	// collection of product certification type amls
 	Model.ProductCertificationTypeAMLs = Backbone.Collection.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		url: '/productCertificationTypeAMLs',
 		model: Model.ProductCertificationTypeAML
 	});
 });