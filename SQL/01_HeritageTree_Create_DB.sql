USE [master]

IF db_id('HeritageTree') IS NULl
  CREATE DATABASE [HeritageTree]
GO

USE [HeritageTree]
GO

DROP TABLE IF EXISTS [UserProfile]
DROP TABLE IF EXISTS [UserType]
DROP TABLE IF EXISTS [Post]
DROP TABLE IF EXISTS [Ward]
DROP TABLE IF EXISTS [HeritageStatus]
DROP TABLE IF EXISTS [TreeSpeciesName]
DROP TABLE IF EXISTS [HealthStatus]
DROP TABLE IF EXISTS [Ownership]
DROP TABLE IF EXISTS [Comment]
DROP TABLE IF EXISTS [PostMaintenance]
DROP TABLE IF EXISTS [Maintenance]
GO

CREATE TABLE [UserProfile] (
 [Id] integer PRIMARY KEY IDENTITY,
  [UserName] nvarchar(50) NOT NULl,
  [FirstName] nvarchar(50) NOT NULl,
  [LastName] nvarchar(50) NOT NULl,
  [Email] nvarchar(50) NOT NULl,
  [CreateDateTime] datetime NOT NULl,
  [UserTypeId] integer NOT NULl
)
GO

CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(20) NOT NULl
)
GO

CREATE TABLE [Post] (
[Id] integer PRIMARY KEY IDENTITY,
  [Location] nvarchar(255),
  [WardId] integer,
  [CreateDateTime] datetime NOT NULl,
  [UserProfileId] integer NOT NULl,
  [TreeSpeciesNameId] int NOT NULl,
  [ImageLocation] nvarchar(255),
  [HeritageStatusId] integer,
  [HeritageDateTime] datetime,
  [HealthStatusId] integer NOT NULl,
  [OwnershipId] integer NOT NULl,
  [IsApproved] bit
)
GO

CREATE TABLE [Ward] (
 [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)
GO

CREATE TABLE [HeritageStatus] (
 [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)
GO

CREATE TABLE [TreeSpeciesName] (
 [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)
GO

CREATE TABLE [HealthStatus] (
   [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)
GO

CREATE TABLE [Ownership] (
   [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)
GO

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULl,
  [UserProfileId] integer NOT NULl,
  [Subject] nvarchar(255) NOT NULl,
  [Content] text NOT NULl,
  [CreateDateTime] datetime NOT NULl,
  [isDeleted] bit
)
GO

CREATE TABLE [PostMaintenance] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULl,
  [MaintenanceId] integer NOT NULl
)
GO

CREATE TABLE [Maintenance] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULl
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([WardId]) REFERENCES[Ward] ([Id])
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([HeritageStatusId]) REFERENCES [HeritageStatus] ([Id])
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([TreeSpeciesNameId]) REFERENCES [TreeSpeciesName] ([Id])
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([HealthStatusId]) REFERENCES [HealthStatus] ([Id])
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([OwnershipId]) REFERENCES [Ownership] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO

ALTER TABLE [PostMaintenance] ADD FOREIGN KEY ([MaintenanceId]) REFERENCES [Maintenance] ([Id])
GO

ALTER TABLE [PostMaintenance] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO