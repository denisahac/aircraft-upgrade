/*
 * fileName: productManufacturer.js
 * folder: js/controller/manufacturer/
 * date: May 31, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Manufacturer.Controller', function(Controller, AircraftUpgrade, Backbone, Marionette, $, _) {
 	var productManufacturer = new AircraftUpgrade.Model.ProductManufacturer();

 	Controller.ProductManufacturer = {
 		edit: function() {
			AircraftUpgrade.navigate('manufacturer-edit');

 			var productManufacturerEditView;

 			productManufacturer.fetch({
 				success: function(model) {
 					productManufacturerEditView = new AircraftUpgrade.View.ProductManufacturerEdit({model: productManufacturer});
 					productManufacturerEditView.on('form:save', function(data) {
 						productManufacturer.set(data);
 						if(productManufacturer.isValid()) {
 							productManufacturer.save(data, {
 								success: function(model) {
 									productManufacturerEditView.triggerMethod('form:data:saved');
 								}
 							});
 						} else {
 							productManufacturerEditView.triggerMethod('form:data:invalid', productManufacturer.validationError);
 						}
 					})
 					AircraftUpgrade.mainRegion.show(AircraftUpgrade.mainAppView);
 					AircraftUpgrade.mainAppView.content.show(productManufacturerEditView);
	 			}
	 		});

 			
 		},
 		view: function() {
 			AircraftUpgrade.navigate('manufacturer-view');

 			var productManufacturerView;

 			productManufacturer.fetch({
 				success: function(model) {
 					productManufacturerView = new AircraftUpgrade.View.ProductManufacturerView({model: model});
 					AircraftUpgrade.mainRegion.show(AircraftUpgrade.mainAppView);
 					AircraftUpgrade.mainAppView.content.show(productManufacturerView);
 				}
 			});
 			
 		}
 	};
 });