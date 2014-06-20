/*
 * fileName: productCertificationTypeFAA.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// product certification type faa
 	Model.ProductCertificationTypeFAA = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		urlRoot: '/productCertificationTypeFAAs',
 		defaults: {
 			faaId: 0,
 			stcNo: '',
 			//pdfOfSTC: '', // pdfOfSTC blob
 			certificationTypeId: 0, // (foreign key)
 			productId: 0, // (foreign key)
 			productCertificationType: new Model.ProductCertificationType(), // product certification type reference
 			product: new Model.Product(), // product reference
 		}
 	});

 	// collection of product certification type faas
 	Model.ProductCertificationTypeFAAs = Backbone.Collection.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		url: '/productCertificationTypeFAAs',
 		model: Model.ProductCertificationTypeFAA
 	});
 });