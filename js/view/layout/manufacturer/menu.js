/*
 * fileName: menu.js
 * folder: js/view/layout/manufacturer/
 * date: June 4, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */
AircraftUpgrade.module('View.Layout.Manufacturer', function(Manufacturer, AircraftUpgrade, Backbone, Marionette, $, _) {
	// manufacturer dashboard menu
	Manufacturer.Menu = Marionette.ItemView.extend({
		initialize: function() {
			// TODO code goes here.
		},
		template: function(data) {
			return _.template(Template.getTemplate('manufacturer/menu'), data);
		},
		// events
		events: {
			'click a#category-list': 'categoryList'
		},
		categoryList: function(e) {
			this.setActive(e);

			e.preventDefault();
			AircraftUpgrade.Manufacturer.Controller.ProductCategory.list();
		},
		setActive: function(e) {
			this.removeActive();
			$(e).addClass('active');
		},
		removeActive: function() {
			this.$el.find('a.active').removeClass('active');
		},
		tagName: 'ul',
		className: 'nav nav-pills nav-stacked'
	});
});