/*
 * fileName: collections.js
 * date: May 16, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

// custom libs
var DB = require('./db').DB;
var Model = require('./models');

/******** collection *********/

// collection of user roles
var UserRoles = DB.Collection.extend({
	model: Model.UserRole
});

// collection of users
var Users = DB.Collection.extend({
	model: Model.User
});

// collection of owners
var Owners = DB.Collection.extend({
	model: Model.Owner
});

// collection of product manufacturers
var ProductManufacturers = DB.Collection.extend({
	model: Model.ProductManufacturer
});

// collection of engines
var Engines = DB.Collection.extend({
	model: Model.Engine
});

// collection of propellers
var Propellers = DB.Collection.extend({
	model: Model.Propeller
});

// collection of aircraft categories
var AircraftCategories = DB.Collection.extend({
	model: Model.AircraftCategory
});

// collection of aircrafts
var Aircrafts = DB.Collection.extend({
	model: Model.Aircraft
});

// collection of product categories
var ProductCategories = DB.Collection.extend({
	model: Model.ProductCategory
});

// collection of products
var Products = DB.Collection.extend({
	model: Model.Product
});

// collection of pilot license types
var PilotLicenseTypes = DB.Collection.extend({
	model: Model.PilotLicenseType
});

// collection of pilot rating types
var PilotRatingTypes = DB.Collection.extend({
	model: Model.PilotRatingType
});

// collection of product certification types
var ProductCertificationTypes = DB.Collection.extend({
	model: Model.ProductCertificationType
});

// collection of product certification type FAAs
var ProductCertificationTypeFAAs = DB.Collection.extend({
	model: Model.ProductCertificationTypeFAA
});

// collection of product certification type AMLs
var ProductCertificationTypeAMLs = DB.Collection.extend({
	model: Model.ProductCertificationTypeAML
});

// exports
module.exports = {
	UserRoles: UserRoles,
	Users: Users,
	Owners: Owners,
	ProductManufacturers: ProductManufacturers,
	Engines: Engines,
	Propellers: Propellers,
	AircraftCategories: AircraftCategories,
	Aircrafts: Aircrafts,
	ProductCategories: ProductCategories,
	Products: Products,
	PilotLicenseTypes: PilotLicenseTypes,
	PilotRatingTypes: PilotRatingTypes,
	ProductCertificationTypes: ProductCertificationTypes,
	ProductCertificationTypeFAAs: ProductCertificationTypeFAAs,
	ProductCertificationTypeAMLs: ProductCertificationTypeAMLs,
};
