USE [HydroPoc]

CREATE TABLE [dbo].[sensordata] (
    id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	temperature_water float NOT NULL,
	temperature_air float NOT NULL,
	humidity float NOT NULL,
	co2_level int NOT NULL,
	ph_value float NOT NULL,
	ec_value float NOT NULL,
	swimmer_1 int NOT NULL,
	swimmer_2 int NOT NULL,
	swimmer_3 int NOT NULL
);