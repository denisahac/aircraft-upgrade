/*
 * fileName: productCategory.js
 * folder: js/view/
 * date: June 2, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('View', function(View, AircraftUpgrade, Backbone, Marionette, $, _) {
 	View.ProductCategory = Marionette.ItemView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
		    return _.template(Template.getTemplate('category/category'), data);
		},
		tagName: 'li'
 	});

 	// new category view
 	View.ProductCategoryNew = Marionette.ItemView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
		    return _.template(Template.getTemplate('category/categoryNew'));
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
		onFormDataInvalid: function(errors) {			
			var self = this;
			var $view = this.$el;

			var clearFormErrors = function() {
				var $form = $view.find('form');

				$form.find('input').attr('title', '');

				$form.find('.glyphicon').each(function() {
					$(this).remove();
				});

				$form.find('.form-group.has-error').each(function() {
					$(this).removeClass('has-error');
				});
			};

			var markErrors = function(value, key) {
				var $formGroup = self.$el.find('#' + key).parent();
				var $errorEl = $formGroup.find('input').attr('title', value);
				var $errorIco = $('<span>', {class: 'glyphicon glyphicon-remove form-control-feedback'});
				$formGroup.append($errorEl).addClass('has-error has-feedback');
				$formGroup.append($errorIco);
			};

			clearFormErrors();
			_.each(errors, markErrors);
		},

		onFormDataSaved: function() {
			AircraftUpgrade.navigate('product-category-list');
			AircraftUpgrade.Manufacturer.Controller.ProductCategory.list();
		}
 	});

 	View.ProductCategories = Marionette.CompositeView.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		template: function(data) {
 			return _.template(Template.getTemplate('category/categoryComposite'));
 		},
 		itemView: View.ProductCategory,
 		itemViewContainer: 'ul#category-body'
 	});
 });