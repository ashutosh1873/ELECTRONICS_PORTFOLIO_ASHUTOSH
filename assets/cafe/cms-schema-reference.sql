-- CMS schema reference reconstructed from the supplied MySQL DESCRIBE screenshots.
-- This is NOT an original mysqldump. Confirm engine, charset, collation and constraints before use.
CREATE DATABASE IF NOT EXISTS cms;
USE cms;

CREATE TABLE `user` (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(300) NULL,
  email VARCHAR(300) NULL,
  mobileNumber VARCHAR(10) NULL,
  address VARCHAR(500) NULL,
  password VARCHAR(100) NULL,
  sQuestion VARCHAR(200) NULL,
  sAnswer VARCHAR(200) NULL,
  status VARCHAR(20) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_user_email (email)
);

CREATE TABLE category (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NULL,
  category VARCHAR(200) NULL,
  price VARCHAR(200) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE bill (
  id INT NOT NULL,
  name VARCHAR(200) NULL,
  mobileNumber VARCHAR(10) NULL,
  email VARCHAR(200) NULL,
  date VARCHAR(50) NULL,
  total VARCHAR(200) NULL,
  createdby VARCHAR(200) NULL,
  paidby VARCHAR(50) NULL,
  address VARCHAR(1000) NULL,
  PRIMARY KEY (id)
);
