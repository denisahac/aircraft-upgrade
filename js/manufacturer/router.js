/* 
 * fileName: router.js
 * folder: js/controller/manuracuter/
 * date: May 30, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

AircraftUpgrade.module('Manufacturer.Routes', function(Routes, AircraftUpgrade, Backbone, Marionette, $, _) {
	Routes.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'': 'mainApp',
			//'': 'listProducts',
			// products
			'product-view/:id': 'productView',
			'manufacturer-view': 'manufacturerView',
			'manufacturer-edit': 'manufacturerEdit',
			// product category routes
			'product-category-list': 'productCategoryList',
			'product-category-view/:id': 'productCategoryView',
			'product-category-new': 'productCategoryNew',
			'product-category-new/': 'productCategoryNew',
		}
	});

	var API = {
		// main app
		mainApp: function() {
			AircraftUpgrade.Manufacturer.Controller.Main.mainApp();
		},
		// list of products
		listProducts: function() {
			AircraftUpgrade.Manufacturer.Controller.Product.list();
		},
		// product view
		productView: function(id) {
			AircraftUpgrade.Manufacturer.Controller.Product.view(id);
		},
		// view product manufacturer info
		manufacturerView: function() {
			AircraftUpgrade.Manufacturer.Controller.ProductManufacturer.view();
		},
		// edit manufacturer information
		manufacturerEdit: function() {
			AircraftUpgrade.Manufacturer.Controller.ProductManufacturer.edit();
		},
		// product category routing method
		productCategoryList: function() {
			AircraftUpgrade.navigate('product-category-list');
			AircraftUpgrade.Manufacturer.Controller.ProductCategory.list();
		},
		productCategoryView: function(id) {
			AircraftUpgrade.navigate('product-category-view/' + id);
			AircraftUpgrade.Manufacturer.Controller.ProductCategory.view(id);
		},
		productCategoryNew: function() {
			AircraftUpgrade.navigate('product-category-new');
			AircraftUpgrade.Manufacturer.Controller.ProductCategory.new();
		}
	};

	AircraftUpgrade.addInitializer(function() {
		AircraftUpgrade.mainAppView = new AircraftUpgrade.View.Layout.Manufacturer.AppLayout();
		var ProductManufacturer = new AircraftUpgrade.Model.ProductManufacturer();

		ProductManufacturer.fetch({
			success: function(model) {
				AircraftUpgrade.productManufacturer = model;
			}
		});

		new Routes.Router({
			controller: API
		});
	});
});