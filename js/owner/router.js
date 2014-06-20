/* 
 * fileName: router.js
 * folder: js/owner/
 * date: May 30, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

AircraftUpgrade.module('Owner.Routes', function(Routes, AircraftUpgrade, Backbone, Marionette, $, _) {
	Routes.Router = Marionette.AppRouter.extend({
		appRoutes: {
			
		}
	});

	var API = {
		
	};

	AircraftUpgrade.addInitializer(function() {
		new Routes.Router({
			controller: API
		});
	});
});