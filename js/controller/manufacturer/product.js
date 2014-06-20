/*
 * fileName: controller.js
 * folder: js/controller/manufacturer/
 * date: May 30, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Manufacturer.Controller', function(Controller, AircraftUpgrade, Backbone, Marionette, $, _) {
 	var products = new AircraftUpgrade.Model.Products();

 	Controller.Product = {
 		list: function() {
 			AircraftUpgrade.navigate('/');

 			var productsView;
 			products.fetch({
 				success: function(models) {
 					if(_.size(products) > 0) {
 						productsView = new AircraftUpgrade.View.Products({collection: models});
 					} else {
 						productsView = new AircraftUpgrade.View.NoProduct();
 					}

 					AircraftUpgrade.mainRegion.show(AircraftUpgrade.mainAppView);
 					AircraftUpgrade.mainAppView.content.show(productsView);
 				}
 			});
 		},
 		view: function(id) {
 			AircraftUpgrade.navigate('product-view/' + id);

 			// set the loading view
 			AircraftUpgrade.mainRegion.show(AircraftUpgrade.mainAppView);
 			AircraftUpgrade.mainAppView.content.show(new AircraftUpgrade.View.Loading());
 			
 			var productView;
 			var product = new AircraftUpgrade.Model.Product({productId: id});

 			product.fetch({
 				success: function(model) {
 					productView = new AircraftUpgrade.View.Product({
 						template: function(data) {
 							return _.template(Template.getTemplate('product/productView'), data);
 						},
 						model: model
 					});

 					
 					AircraftUpgrade.mainAppView.content.show(productView);
 			
 				}
 			});
 		}
 	};
 });