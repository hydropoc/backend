USE [HydroPoc]

CREATE TABLE [dbo].[images] (
    id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    data text NOT NULL,
    timestamp bigint NOT NULL
);