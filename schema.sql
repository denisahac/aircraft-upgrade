-- project name: Aircraft Upgrade
-- file name: schema.sql
-- description: Data Definition Language(DDL) for Aircraft Upgrade, a relational database storage for the application.
-- version: 0.0.1
-- date: May 12, 2014
-- author: Nordanne Isahac <den.isahac@gmail.com>

#__________________________________________________
# Aircraft Upgrade

-- drop database dbAircraftUpgrade
drop database if exists dbAircraftUpgrade;

-- create database dbAircraftUpgrade
create database if not exists dbAircraftUpgrade;

-- use database dbAircraftUpgrade
use dbAircraftUpgrade;

# eo Aircraft Upgrade

#__________________________________________________
# User Roles
#Types: OWNER, PRODUCT_MANUFACTURER, ADMINISTRATOR

-- drop table tblUserRoles
drop table if exists tblUserRoles;

-- create table tblUserRoles
create table if not exists tblUserRoles(
	roleId integer primary key auto_increment,
	roleName varchar(20)
)engine=innodb;

-- insert datas on tblUserRoles
insert into tblUserRoles(roleName) values('OWNER');
insert into tblUserRoles(roleName) values('PRODUCT_MANUFACTURER');
insert into tblUserRoles(roleName) values('ADMINISTRATOR');

# eo User Roles

#__________________________________________________
# Users

-- drop table tblUsers
drop table if exists tblUsers;

-- create table tblUsers
create table if not exists tblUsers(
	userId integer primary key auto_increment,
	username varchar(100) unique,
	password varchar(32),
	email varchar(50) unique,
	roleId integer,
	foreign key (roleId) references tblUserRoles(roleId)
)engine=innodb;

# eo Users

#________________________________________________
# Owners

-- drop table tblOwners
drop table if exists tblOwners;

-- create table tblOwners
create table if not exists tblOwners(
	ownerId integer primary key auto_increment,
	userId integer,
	firstName varchar(20),
	mi varchar(1),
	lastName varchar(20),
	streetAddress1 varchar(100),
	streetAddress2 varchar(100),
	city varchar(50),
	state varchar(50),
	zipCode varchar(6),
	country varchar(50),
	totalHoursFlight timestamp,
	foreign key (userId) references tblUsers(userId) 
		on delete cascade
		on update cascade
)engine=innodb;

# eo Owners

#_______________________________________________
# Product Manufacturers

-- drop table tblProductManufacturers
drop table if exists tblProductManufacturers;

-- create table tblProductManufacturers
create table if not exists tblProductManufacturers(
	manufacturerId integer primary key auto_increment,
	userId integer,
	companyName varchar(50),
	streetAddress1 varchar(100),
	streetAddress2 varchar(100),
	city varchar(50),
	state varchar(50),
	zipCode varchar(6),
	country varchar(50),
	websiteUrl varchar(100),
	phoneNo varchar(15),
	foreign key (userId) references tblUsers(userId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Product Manufacturers

#________________________________________________
# Engines

-- drop table tblEngines
drop table if exists tblEngines;

-- create table tblEngines
create table if not exists tblEngines(
	engineId integer primary key auto_increment,
	model varchar(10),
	manufacturerId integer,
	foreign key (manufacturerId) references tblProductManufacturers(manufacturerId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Engines

#________________________________________________
# Propellers

-- drop table tblPropellers
drop table if exists tblPropellers;

-- create table tblPropellers
create table if not exists tblPropellers(
	propellerId integer primary key auto_increment,
	model varchar(10),
	manufacturerId integer,
	picture tinyblob,
	foreign key (manufacturerId) references tblProductManufacturers(manufacturerId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Propellers

#________________________________________________
# Aircraft Categories
# Types: Certified, Experimental, Experimental Light Sport Aircraft (LSA)

-- drop table tblAircraftCategories
drop table if exists tblAircraftCategories;

-- create table tblAircraftCategories
create table if not exists tblAircraftCategories(
	categoryId integer primary key auto_increment,
	categoryName varchar(39)
)engine=innodb;

-- insert datas on tblAircraftCategories
insert into tblAircraftCategories(categoryName) values('Certified');
insert into tblAircraftCategories(categoryName) values('Experimental');
insert into tblAircraftCategories(categoryName) values('Experimental Ligh Sport Aircraft (LSA)');

# eo Propellers

#________________________________________________
# Aircrafts

-- drop table tblAircrafts
drop table if exists tblAircrafts;

-- create table tblAircrafts
create table if not exists tblAircrafts(
	aircraftId integer primary key auto_increment,
	categoryId integer,
	make varchar(50),
	model varchar(10),
	pdfOfTCDS blob,
	year integer,
	registrationNNo varchar(50),
	serialNo varchar(50),
	engineId integer,
	propellerId integer,
	totalAirframeHours timestamp,
	tcNo varchar(50),
	tsmo timestamp,
	exteriorPicture1 tinyblob,
	exteriorPicture2 tinyblob,
	exteriorPicture3 tinyblob,
	interiorPicture1 tinyblob,
	interiorPicture2 tinyblob,
	interiorPicture3 tinyblob,
	panelPicture1 tinyblob,
	panelPicture2 tinyblob,
	panelPicture3 tinyblob,
	cowlingPicture1 tinyblob,
	cowlingPicture2 tinyblob,
	foreign key (categoryId) references tblAircraftCategories(categoryId)
		on delete cascade
		on update cascade,
	foreign key (engineId) references tblEngines(engineId),
	foreign key (propellerId) references tblPropellers(propellerId)
)engine=innodb;

# eo Aircrafts

#________________________________________________
# Owner Aircraft
# Description: A link table for tblOwners and tblAircrafts to form a many-to-many relationship

-- drop table tblOwnerAircraft
drop table if exists tblOwnerAircraft;

-- create table tblOwnerAircraft
create table if not exists tblOwnerAircraft(
	id integer primary key auto_increment,
	ownerId integer,
	aircraftId integer,
	foreign key (ownerId) references tblOwners(ownerId)
		on delete cascade
		on update cascade,
	foreign key (aircraftId) references tblAircrafts(aircraftId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Owner Aircraft

#________________________________________________
# Product Categories

-- drop table tblProductCategories
drop table if exists tblProductCategories;

-- create table tblProductCategories
create table if not exists tblProductCategories(
	categoryId integer primary key auto_increment,
	categoryName varchar(50)
)engine=innodb;

-- insert datas on tblProductCategories
insert into tblProductCategories(categoryName) values('Engine Instruments');
insert into tblProductCategories(categoryName) values('Interior Modifications');
insert into tblProductCategories(categoryName) values('Engine Modifications');
insert into tblProductCategories(categoryName) values('Exterior Modifications');
	
# eo Product Categories

#________________________________________________
# Products

-- drop table tblProducts
drop table if exists tblProducts;

-- create table tblProducts
create table if not exists tblProducts(
	productId integer primary key auto_increment,
	categoryId integer,
	manufacturerId integer,
	name varchar(100),
	picture tinyblob,
	partNumber varchar(25),
	description1 varchar(100),
	description2 varchar(100),
	description3 varchar(100),
	srp decimal,
	foreign key (categoryId) references tblProductCategories(categoryId)
		on delete cascade
		on update cascade,
	foreign key (manufacturerId) references tblProductManufacturers(manufacturerId)
)engine=innodb;

# eo Products

#________________________________________________
# Product Aircraft
# Description: A link table for tblProducts and tblAircrafts to from a many-to-many relationship

-- drop table tblProductAircraft
drop table if exists tblProductAircraft;

-- create table tblProductAircraft;
create table if not exists tblProductAircraft(
	id integer primary key auto_increment,
	productId integer,
	aircraftId integer,
	foreign key (productId) references tblProducts(productId)
		on delete cascade
		on update cascade,
	foreign key (aircraftId) references tblAircrafts(aircraftId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Product Aircraft

#_______________________________________________
# Pilot License Types
# Types:
# 1. Student Pilot
# 2. Recreational Pilot
# 3. Private Pilot
# 4. Commercial Pilot
# 5. ATP

-- drop table tblPilotLicenseTypes
drop table if exists tblPilotLicenseTypes;

-- create table tblPilotLicenseTypes
create table if not exists tblPilotLicenseTypes(
	licenseTypeId integer primary key auto_increment,
	licenseType varchar(18)
)engine=innodb;

-- insert datas on tblPilotLicenseTypes
insert into tblPilotLicenseTypes(licenseType) values('Student Pilot');
insert into tblPilotLicenseTypes(licenseType) values('Recreational Pilot');
insert into tblPilotLicenseTypes(licenseType) values('Private Pilot');
insert into tblPilotLicenseTypes(licenseType) values('Commercial Pilot');
insert into tblPilotLicenseTypes(licenseType) values('ATP');

# eo Pilot License Types

#_______________________________________________
# Pilot License
# Description: A link table for tblPilotLicenseTypes and tblOwners for many-to-many relationship

-- drop table tblPilotLicense
drop table if exists tblPilotLicense;

-- create table tblPilotLicense
create table if not exists tblPilotLicense(
	id integer primary key auto_increment,
	licenseTypeId integer,
	ownerId integer,
	foreign key (licenseTypeId) references tblPilotLicenseTypes(licenseTypeId)
		on delete cascade
		on update cascade,
	foreign key (ownerId) references tblOwners(ownerId)
)engine=innodb;

# eo Pilot License

#_______________________________________________
# Pilot Rating Types
# Types: 
# 1. Single-Engine Land
# 2. Single-Engine Sea
# 3. Single-Engine IFR
# 4. Multi-Engine Land
# 5. Multi-Engine Sea
# 6. Multi-Engine IFR
# 7. Helicopter
# 8. Balloon
# 9. Glider
# 10. Gyrocopter
# 11. Tailwheel Endorsement
# 12. Complex Endorsement
# 13. High-Performance Endorsement
# 14. High-Altitude Endorsemen

-- drop table tblPilotRatingTypes
drop table if exists tblPilotRatingTypes;

-- create table tblPilotRatingTypes
create table if not exists tblPilotRatingTypes(
	ratingTypeId integer primary key auto_increment,
	ratingType varchar(28)
)engine=innodb;

-- insert datas on tblPilotRatingTypes
insert into tblPilotRatingTypes(ratingType) values('Single-Engine Land');
insert into tblPilotRatingTypes(ratingType) values('Single-Engine Sea');
insert into tblPilotRatingTypes(ratingType) values('Single-Engine IFR');
insert into tblPilotRatingTypes(ratingType) values('Multi-Engine Land');
insert into tblPilotRatingTypes(ratingType) values('Multi-Engine Sea');
insert into tblPilotRatingTypes(ratingType) values('Multi-Engine IFR');
insert into tblPilotRatingTypes(ratingType) values('Helicopter');
insert into tblPilotRatingTypes(ratingType) values('Balloon');
insert into tblPilotRatingTypes(ratingType) values('Glider');
insert into tblPilotRatingTypes(ratingType) values('Gyrocopter');
insert into tblPilotRatingTypes(ratingType) values('Tailwheel Endorsement');
insert into tblPilotRatingTypes(ratingType) values('Complex Endorsement');
insert into tblPilotRatingTypes(ratingType) values('High-Performance Endorsement');
insert into tblPilotRatingTypes(ratingType) values('High-Altitude Endorsement');

# eo Pilot Rating Types

#________________________________________________
# Pilot Rating
# Description: A link table for tblPilotRatingTypes and tblOwners for a many-to-many relationship

-- drop table tblPilotRating
drop table if exists tblPilotRating;

-- create table tblPilotRating
create table if not exists tblPilotRating(
	id integer primary key auto_increment,
	ratingTypeId integer,
	ownerId integer,
	foreign key (ratingTypeId) references tblPilotRatingTypes(ratingTypeId)
		on delete cascade
		on update cascade,
	foreign key (ownerId) references tblOwners(ownerId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Pilot Rating

#________________________________________________
# Product Certification Types
# Types:
# 1. FAA STC'd
	-- STC #
	-- PDF of STC
# 2. TSO'd
# 3. AML
	-- PDF of AML
# 4. PMA'd
# 5. EASA Approved

-- drop table tblProductCertificationTypes
drop table if exists tblProductCertificationTypes;

-- create table tblProductCertificationTypes
create table if not exists tblProductCertificationTypes(
	certificationTypeId integer primary key auto_increment,
	certificationType varchar(13)
)engine=innodb;

-- insert datas on tblProductCertificationTypes
insert into tblProductCertificationTypes(certificationType) values('FAA STC\'d');
insert into tblProductCertificationTypes(certificationType) values('TSO\'d');
insert into tblProductCertificationTypes(certificationType) values('AML');
insert into tblProductCertificationTypes(certificationType) values('PMA\'d');
insert into tblProductCertificationTypes(certificationType) values('EASA Approved');

# eo Product Certification Types

#_________________________________________________
# Product Certification Type FAA

-- drop table tblProductCertificationTypeFAA
drop table if exists tblProductCertificationTypeFAA;

-- create table tblProductCertificationTypeFAA
create table if not exists tblProductCertificationTypeFAA(
	faaId integer primary key auto_increment,
	stcNo varchar(20),
	pdfOfSTC blob,
	certificationTypeId integer,
	productId integer,
	foreign key (certificationTypeId) references tblProductCertificationTypes(certificationTypeId)
		on delete cascade
		on update cascade,
	foreign key (productId) references tblProducts(productId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Product Certification Type FAA

#________________________________________________
# Product Certification Type AML

-- drop table tblProductCertificationTypeAML
drop table if exists tblProductCertificationTypeAML;

-- create table tblProductCertificationTypeAML
create table if not exists tblProductCertificationTypeAML(
	amlId integer primary key auto_increment,
	pdfOfAML blob,
	certificationTypeId integer,
	productId integer,
	foreign key (certificationTypeId) references tblProductCertificationTypes(certificationTypeId)
		on delete cascade
		on update cascade,
	foreign key (productId) references tblProducts(productId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Product Certification Type AML

#________________________________________________
# Product Certification
# Description: A link table for tblProductCertificationTypes and tblProducts for a many-to-many relationship

-- drop table tblProductCertification
drop table if exists tblProductCertification;

-- create table tblProductCertification
create table if not exists tblProductCertification(
	id integer primary key auto_increment,
	certificationTypeId integer,
	productId integer,
	foreign key (certificationTypeId) references tblProductCertificationTypes(certificationTypeId)
		on delete cascade
		on update cascade,
	foreign key (productId) references tblProducts(productId)
		on delete cascade
		on update cascade
)engine=innodb;

# eo Product Certification