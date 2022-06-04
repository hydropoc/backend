USE [HydroPoc]

CREATE TABLE [dbo].[pumpactivity] (
    id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	status BIT NOT NULL,
	timestamp bigint NOT NULL
);