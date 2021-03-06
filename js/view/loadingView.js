/*
 * fileName: loadingView
 * folder: js/view/
 * date: June 10, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('View', function(View, AircraftUpgrade, Backbone, Marionette, $, _) {
 	View.Loading = Marionette.ItemView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
 			return _.template(Template.getTemplate('loading'));
 		},
 		onShow: function() {
 			var opts = {
		        lines: 17, // The number of lines to draw
		        length: 17, // The length of each line
		        width: 6, // The line thickness
		        radius: 12, // The radius of the inner circle
		        corners: 1, // Corner roundness (0..1)
		        rotate: 25, // The rotation offset
		        direction: 1, // 1: clockwise, -1: counterclockwise
		        color: '#000', // #rgb or #rrggbb or array of colors
		        speed: 1.5, // Rounds per second
		        trail: 60, // Afterglow percentage
		        shadow: true, // Whether to render a shadow
		        hwaccel: true, // Whether to use hardware acceleration
		        className: 'spinner', // The CSS class to assign to the spinner
		        zIndex: 2e9, // The z-index (defaults to 2000000000)
		        top: '50%', // Top position relative to parent
		        left: '50%' // Left position relative to parent
		    };

		    var spinner = new Spinner().spin();

		    this.$el.find('#loading').html(spinner.el);
 		}
 	});
 });