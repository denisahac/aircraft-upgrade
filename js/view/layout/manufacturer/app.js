/*
 * fileName: app.js
 * folder: js/layout/manufacturer/
 * date: June 4, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('View.Layout.Manufacturer', function(Manufacturer, AircraftUpgrade, Backbone, Marionette, $, _) {

 	// manufacturer main layout
 	Manufacturer.AppLayout = Marionette.Layout.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
 			return _.template(Template.getTemplate('layout/manufacturer/app'), data);
 		},
 		regions: {
 			menu: '#menu',
 			content: '#content'
 		},
 		onMenuShow: function() {
			var appMenu = new AircraftUpgrade.View.Layout.Manufacturer.Menu();
			AircraftUpgrade.mainAppView.menu.show(appMenu);
 		},
 		onShow: function() {
 			this.onMenuShow();
 		}
 	});
 });