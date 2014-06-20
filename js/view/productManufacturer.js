/* 
 * fileName: productManufacturer.js
 * folder: js/view/
 * date: May 31, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('View', function(View, AircraftUpgrade, Backbone, Marionette, $, _) {

 	View.ProductManufacturerEdit = Marionette.ItemView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		// events
 		events: {
 			'click #save': 'save'
 		},
 		save: function(e) {
 			e.preventDefault();

 			var data = Backbone.Syphon.serialize(this);
 			
 			this.trigger('form:save', data);
 		},
 		template: '#product-manufacturer-edit-template',
 		tagName: 'div',

		onFormDataInvalid: function(errors) {			
			var self = this;
			var $view = this.$el;

			var clearFormErrors = function() {
				var $form = $view.find('form');

				$form.find('.help-block.error').each(function() {
					$(this).remove();
				});
				$form.find('.glyphicon').each(function() {
					$(this).remove();
				});

				$form.find('.form-group.has-error').each(function() {
					$(this).removeClass('has-error');
				});
			};

			var markErrors = function(value, key) {
				var $controlGroup = self.$el.find('#' + key).parent().parent();
				var $errorEl = $('<span>', {class: 'help-block error', text: value});
				var $errorIco = $('<span>', {class: 'glyphicon glyphicon-remove form-control-feedback'});
				$controlGroup.append($errorEl).addClass('has-error').addClass('has-feedback');
				$controlGroup.find('input').parent().append($errorIco);
			};

			clearFormErrors();
			_.each(errors, markErrors);
		},

		onFormDataSaved: function() {
			AircraftUpgrade.navigate('manufacturer-view');
			AircraftUpgrade.Manufacturer.Controller.ProductManufacturer.view();
		}
 	});

	// View Manufacturer
	View.ProductManufacturerView = Marionette.ItemView.extend({
		initialize: function() {
			// TODO code geos here.
		},
		template: '#product-manufacturer-view-template',
	});
 });