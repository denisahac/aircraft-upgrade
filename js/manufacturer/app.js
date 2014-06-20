/*
 * fileName: app.js
 * folder: js/manufacturer/
 * date: May 30, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

var AircraftUpgrade = new Marionette.Application();

AircraftUpgrade.addRegions({
	mainRegion: '#main-region'
});

AircraftUpgrade.navigate = function(route, options) {
	options || (options = {});
	Backbone.history.navigate(route, options)
};

AircraftUpgrade.getCurrentRoute = function() {
	return Backbone.history.fragment;
}

AircraftUpgrade.on('initialize:after', function() {
	if(Backbone.history) {
		Backbone.history.start();
	}
});