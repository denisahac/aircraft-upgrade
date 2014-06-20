var App = new Marionette.Application();

App.addRegions({
	mainRegion: '#container'
});

App.SampleModel = Backbone.Model.extend({});

App.SampleItemView = Marionette.ItemView.extend({
	template: '#login-template',
	tagName: 'section'
});

App.on('initialize:after', function() {
	App.mainRegion.show(new App.SampleItemView({model: new App.SampleModel({name: 'Nordanne Isahac'})}));
});	

App.start();