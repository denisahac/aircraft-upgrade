/*
 * fileName: product.js
 * folder: js/view/
 * date: May 30, 2014
 * author: Nordanne  Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('View', function(View, AircraftUpgrade, Backbone, Marionette, $, _) {
 	View.Product = Marionette.ItemView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
 			return _.template(Template.getTemplate('product/product'), data);
 		},
 		tagName: 'div',
 		className: 'col-sm-6 col-md-4'
 	});

 	View.Products = Marionette.CompositeView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
 			return _.template(Template.getTemplate('product/productComposite'));
 		},
 		itemView: View.Product,
 		itemViewContainer: 'div#products',
 		className: 'row'
 	});

 	View.NoProduct = Marionette.ItemView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
 			return _.template(Template.getTemplate('product/noProduct'));
 		}
 	});
 });