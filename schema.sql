CREATE TABLE Customer (
  ID serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  jwttoken VARCHAR(255) NOT NULL
);

CREATE TABLE Device (
  ID serial PRIMARY KEY,
  ownerid INTEGER REFERENCES Customer(id),
  devicename VARCHAR(255) NOT NULL,
  devicetype VARCHAR(255) NOT NULL
);


CREATE TABLE Log (
  ID serial PRIMARY KEY,
  deviceid INTEGER REFERENCES Device(id),
  recordtime TIMESTAMP NOT NULL,
  info JSON NOT NULL
);
