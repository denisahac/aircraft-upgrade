/* 
 * fileName: productCategories.js
 * folder: js/controller/manufacturer/
 * date: Jun 2, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Manufacturer.Controller', function(Controller, AircraftUpgrade, Backbone, Marionette, $, _) {

 	Controller.ProductCategory = {
 		list: function() {	
 			// put the url to backbone history
 			AircraftUpgrade.navigate('product-category-list');

 			var productCategories = new AircraftUpgrade.Model.ProductCategories();

 			var productCategoryListView;

 			productCategories.fetch({
 				success: function(models) {

 					productCategoryListView = new AircraftUpgrade.View.ProductCategories({collection: models});
 					AircraftUpgrade.mainRegion.show(AircraftUpgrade.mainAppView);
 					AircraftUpgrade.mainAppView.content.show(productCategoryListView);
 				}
 			});
 		},
 		view: function(id) {
 			var productCategory = new AircraftUpgrade.Model.ProductCategory({categoryId: id});
 			productCategory.fetch({
 				success: function(model) {
 					var productCategoryView = new AircraftUpgrade.View.ProductCategory({model: model, template: function(data) {
								    return _.template(Template.getTemplate('category/categoryView'), data);
								}});
 					AircraftUpgrade.mainRegion.show(AircraftUpgrade.mainAppView);
 					AircraftUpgrade.mainAppView.content.show(productCategoryView);
 				}
 			});		
 		},
 		new: function() {
 			var productCategoryNewView = new AircraftUpgrade.View.ProductCategoryNew();

 			productCategoryNewView.on('form:save', function(data){
 				var productCategory = new AircraftUpgrade.Model.ProductCategory(data);

 				if(productCategory.isValid()) {
 					productCategory.save({}, {
 						success: function(model) {
 							productCategoryNewView.triggerMethod('form:data:saved');
 						}
 					});
  				} else {
 					productCategoryNewView.triggerMethod('form:data:invalid', productCategory.validationError);
 				}
 			});

 			AircraftUpgrade.mainRegion.show(productCategoryNewView);
 		}
 	};
 });