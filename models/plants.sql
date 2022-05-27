USE [HydroPoc]

CREATE TABLE [dbo].[plants] (
    id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    configuration TEXT NOT NULL
);