/* 
 * fileName: models.js
 * description: A javascript objects representing the datbase tables
 * date: May 16, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 // custom libs
 var DB = require('./db').DB;

 // models

 // user role
 var UserRole = DB.Model.extend({
 	tableName: 'tblUserRoles',
 	idAttribute: 'roleId',
 	users: function() {
 		return this.hasMany(User, 'roleId')
 	}
 });

 // user
 var User = DB.Model.extend({
 	tableName: 'tblUsers',
 	idAttribute: 'userId',
 	userRole: function() {
 		return this.belongsTo(UserRole, 'roleId')
 	},
 	// owner reference returns null
 	// if the current user is another type of user other than owner_type(e.g. PRODUCT_MANUFACTURER, ADMINISTRATOR)
 	owner: function() {
 		return this.hasOne(Owner, 'userId');
 	},

 	// prouct manfucaturer reference returns null
 	// if the current user is another type of user other than product_manufacturer_type(e.g. OWNER, ADMINISTRATOR)
 	productManufacturer: function() {
 		return this.hasOne(ProductManufacturer, 'userId');
 	}
 });

// owner
var Owner = DB.Model.extend({
	tableName: 'tblOwners',
	idAttribute: 'ownerId',
	// user reference
	user: function() {
		return this.belongsTo(User, 'userId');
	},
	// list of aircrafts
	aircrafts: function() {
		return this.belongsToMany(Aircraft).through(OwnerAircraft, 'ownerId', 'aircraftId');
	},
	// list of pilot license types
	pilotLicenseTypes: function() {
		return this.belongsToMany(PilotLicenseType).through(PilotLicense, 'ownerId', 'licenseTypeId');
	},
	// list of pilot rating types
	pilotRatingTypes: function() {
		return this.belongsToMany(PilotRatingType).through(PilotRating, 'ownerId', 'ratingTypeId');
	}
});

// product manufacturer
var ProductManufacturer = DB.Model.extend({
	tableName: 'tblProductManufacturers',
	idAttribute: 'manufacturerId',
	// user reference
	user: function() {
		return this.belongsTo(User, 'userId');
	},
	// engines references
	engines: function() {
		return this.hasMany(Engine, 'manufacturerId');
	},
	// propellers references
	propellers: function() {
		return this.hasMany(Propeller, 'manufacturerId');
	},
	// list of products
	products: function() {
		return this.hasMany(Product, 'manufacturerId');
	}
});

// engine
var Engine = DB.Model.extend({
	tableName: 'tblEngines',
	idAttribute: 'engineId',
	// product manufacturer reference
	productManufacturer: function() {
		return this.belongsTo(ProductManufacturer, 'manufacturerId');
	},
	// list of aircrafts
	aircrafts: function() {
		return this.hasMany(Aircraft, 'engineId');
	}
});

// propeller
var Propeller = DB.Model.extend({
	tableName: 'tblPropellers',
	idAttribute: 'propellerId',
	// product manufacturer reference
	productManufacturer: function() {
		return this.belongsTo(ProductManufacturer, 'manufacturerId');
	},
	// list of aircrafts
	aircrafts: function() {
		return this.hasMany(Aircraft, 'propellerId');
	}
});

// aircraft category
var AircraftCategory = DB.Model.extend({
	tableName: 'tblAircraftCategories',
	idAttribute: 'categoryId',
	// aircrafts references
	aircrafts: function() {
		return this.hasMany(Aircraft, 'categoryId');
	}
});

// aircraft
var Aircraft = DB.Model.extend({
	tableName: 'tblAircrafts',
	idAttribute: 'aircraftId',
	// aircraft category reference
	aircraftCategory: function() {
		return this.belongsTo(AircraftCategories, 'categoryId');
	},
	// engine reference
	engine: function() {
		return this.belongsTo(Engine, 'engineId');
	},
	// propeller reference
	propeller: function() {
		return this.belongsTo(Propeller, 'propellerId');
	},
	// list of owners
	owners: function() {
		return this.belongsToMany(Owner).through(OwnerAircraft, 'aircraftId', 'ownerId');
	},
	// list of products(e.g. installed products)
	products: function() {
		return this.belongsToMany(Product).through(ProductAircraft, 'aircraftId', 'productId');
	}
});

// owner aircraft(LINK TABLE)
var OwnerAircraft = DB.Model.extend({
	tableName: 'tblOwnerAircraft',
	idAttribute: 'id',
	// owner reference
	owner: function() {
		return this.belongsTo(Owner, 'ownerId');
	},
	// aircraft reference
	aircraft: function() {
		return this.belongsTo(Aircraft, 'aircraftId');
	}
});

// product category
var ProductCategory = DB.Model.extend({
	tableName: 'tblProductCategories',
	idAttribute: 'categoryId',
	// list of products
	products: function() {
		return this.hasMany(Product, 'categoryId');
	}
});

// product
var Product = DB.Model.extend({
	tableName: 'tblProducts',
	idAttribute: 'productId',
	// product category reference
	productCategory: function() {
		return this.belongsTo(ProductCategory, 'categoryId');
	},
	// product manufacturer reference
	productManufacturer: function() {
		return this.belongsTo(ProductManufacturer, 'manufacturerId');
	},
	// list of aircrafts
	aircrafts: function() {
		return this.belongsToMany(Aircraft).through(ProductAircraft, 'productId', 'aircraftId');
	},
	// product certification type FAA reference
	// returns null if the product is not FAA type
	productCertificationTypeFAA: function() {
		return this.hasOne(ProductCertificationTypeFAA, 'productId');
	},
	// product certification type AML reference
	// returns null if the product is not AML type
	productCertificationTypeAML: function() {
		return this.hasOne(ProductCertificationTypeAML, 'productId');
	},
	// list of product certification types
	productCertificationTypes: function() {
		return this.belongsToMany(ProductCertificationType).through(ProductCertification, 'productId', 'certificationTypeId');
	}
});

// product aircraft(LINK TABLE)
var ProductAircraft = DB.Model.extend({
	tableName: 'tblProductAircraft',
	idAttribute: 'id',
	// product reference
	product: function() {
		return this.belongsTo(Product, 'productId');
	},
	// aircraft reference
	aircraft: function() {
		return this.belongsTo(Aircraft, 'aircraftId');
	}
});

// pilot license type
var PilotLicenseType = DB.Model.extend({
	tableName: 'tblPilotLicenseTypes',
	idAttribute: 'licenseTypeId',
	// list of owners(e.g. pilots)
	owners: function() {
		return this.belongsToMany(Owner).through(PilotLicense, 'licenseTypeId', 'ownerId');
	}
});

// pilot license(LINK TABLE)
var PilotLicense = DB.Model.extend({
	tableName: 'tblPilotLicense',
	idAttribute: 'id',
	// pilot license type reference
	pilotLicenseType: function() {
		return this.belongsTo(PilotLicenseType, 'licenseTypeId');
	},
	// owner referene(e.g the pilot itself)
	owner: function() {
		return this.belongsTo(Owner, 'ownerId');
	}
});

// pilot rating type
var PilotRatingType = DB.Model.extend({
	tableName: 'tblPilotRatingTypes',
	idAttribute: 'ratingTypeId',
	// list of owners(e.g. pilots)
	owners: function() {
		return this.belongsToMany(Owner).through(PilotRating, 'ratingTypeId', 'ownerId');
	}
});

// pilot rating(LINK TABLE)
var PilotRating = DB.Model.extend({
	tableName: 'tblPilotRating',
	idAttribute: 'id',
	// pilot rating type reference
	pilotRatingType: function() {
		return this.belongsTo(PilotRatingType, 'ratingTypeId');
	},
	// owner reference(e.g. the pilot itself)
	owner: function() {
		return this.belongsTo(Owner, 'ownerId');
	}
});

// product certification type
var ProductCertificationType = DB.Model.extend({
	tableName: 'tblProductCertificationTypes',
	idAttribute: 'certificationTypeId',
	// product certification type FAAs references
	productCertificationTypeFAAs: function() {
		return this.hasMany(ProductCertificationTypeFAA, 'certificationTypeId');
	},
	// product certification type AMLs references
	productCertificationTypeAMLs: function() {
		return this.hasMany(ProductCertificationTypeAML, 'certificationTypeId');
	},
	// list of products
	products: function() {
		return this.belongsToMany(Product).through(ProductCertification, 'certificationTypeId', 'productId');
	}
});

// product certification type FAA
var ProductCertificationTypeFAA = DB.Model.extend({
	tableName: 'tblProductCertificationTypeFAA',
	idAttribute: 'faaId',
	// product certification type reference(e.g. the general category type of itself)
	productCertificationType: function() {
		return this.belongsTo(ProductCertificationType, 'certificationTypeId');
	},
	// product reference
	product: function() {
		return this.belongsTo(Product, 'productId');
	}
});

// product certification type AML
var ProductCertificationTypeAML = DB.Model.extend({
	tableName: 'tblProductCertificationTypeAML',
	idAttribute: 'amlId',
	// product certification type reference(e.g. the general category type of itself)
	productCertificationType: function() {
		return this.belongsTo(ProductCertificationType, 'certificationTypeId');
	},
	// product reference
	product: function() {
		return this.belongsTo(Product, 'productId');
	}
});

// product certification(LINK TABLE)
var ProductCertification = DB.Model.extend({
	tableName: 'tblProductCertification',
	idAttribute: 'id',
	// product certification type reference
	productCertificationType: function() {
		return this.belongsTo(ProductCertificationType, 'certificationTypeId');
	},
	// product reference
	product: function() {
		return this.belongsTo(Product, 'productId');
	}
});

// exports
module.exports = {
	UserRole: UserRole,
	User: User,
	Owner: Owner,
	ProductManufacturer: ProductManufacturer,
	Engine: Engine,
	Propeller: Propeller,
	AircraftCategory: AircraftCategory,
	Aircraft: Aircraft,
	OwnerAircraft: OwnerAircraft, // link table
	ProductCategory: ProductCategory,
	Product: Product,
	ProductAircraft: ProductAircraft, // link table
	PilotLicenseType: PilotLicenseType,
	PilotLicense: PilotLicense, // link table
	PilotRatingType: PilotRatingType,
	PilotRating: PilotRating, // link table
	ProductCertificationType: ProductCertificationType,
	ProductCertificationTypeFAA: ProductCertificationTypeFAA,
	ProductCertificationTypeAML: ProductCertificationTypeAML,
	ProductCertification: ProductCertification, // link table
};