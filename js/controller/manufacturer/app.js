/* 
 * fileName: app.js
 * folder: controller/manufacturer/
 * date: June 4, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Manufacturer.Controller', function(Controller, AircraftUpgrade, Backbone, Marionette, $, _) {
 	var products = new AircraftUpgrade.Model.Products();
 	Controller.Main = {
 		mainApp: function() {
 			AircraftUpgrade.Manufacturer.Controller.Product.list();
 		}
 	};
 });