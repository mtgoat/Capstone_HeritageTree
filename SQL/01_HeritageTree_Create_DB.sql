USE [master]

IF db_id('Testdb3') IS NULl
  CREATE DATABASE [Testdb3]
GO

USE [Testdb3]
GO

DROP TABLE IF EXISTS [PostMaintenance]
DROP TABLE IF EXISTS [Maintenance]
DROP TABLE IF EXISTS [Comment]
DROP TABLE IF EXISTS [Post]
DROP TABLE IF EXISTS [Ward]
DROP TABLE IF EXISTS [HeritageStatus]
DROP TABLE IF EXISTS [TreeCommonName]
DROP TABLE IF EXISTS [HealthStatus]
DROP TABLE IF EXISTS [Ownership]
DROP TABLE IF EXISTS [UserProfile]
DROP TABLE IF EXISTS [UserType]
GO


CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(20) NOT NULL
)

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [UserTypeId] integer NOT NULL,

  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
 )

CREATE TABLE [Ownership] (
   [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)

CREATE TABLE [HealthStatus] (
   [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)

CREATE TABLE [TreeCommonName] (
 [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)

CREATE TABLE [HeritageStatus] (
 [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)

CREATE TABLE [Ward] (
 [Id] integer PRIMARY KEY IDENTITY,
 [Name] nvarchar(50) NOT NULl
)

CREATE TABLE [Post] (
[Id] integer PRIMARY KEY IDENTITY,
  [StreetAddress] nvarchar(255) NOT NULl,
  [City]nvarchar(50) NOT NULl,
  [State]nvarchar(50) NOT NULl,
  [Zip]integer NOT NULl,
  [Longitude] integer,
  [Latitude] integer,
  [WardId] integer,
  [CreateDateTime] datetime NOT NULl,
  [UserProfileId] integer NOT NULl,
  [TreeCommonNameId] int NOT NULl,
  [ImageLocation] nvarchar(255),
  [HeritageStatusId] integer,
  [HeritageDateTime] datetime,
  [HealthStatusId] integer NOT NULl,
  [OwnershipId] integer NOT NULl,
  [IsApproved] bit

  CONSTRAINT [FK_Post_Ward] FOREIGN KEY ([WardId]) REFERENCES [Ward] ([Id]),
  CONSTRAINT [FK_Post_TreeCommonName] FOREIGN KEY ([TreeCommonNameId]) REFERENCES [TreeCommonName] ([Id]),
  CONSTRAINT [FK_Post_HeritageStatus] FOREIGN KEY ([HeritageStatusId]) REFERENCES [HeritageStatus] ([Id]),
  CONSTRAINT [FK_Post_HealthStatus] FOREIGN KEY ([HealthStatusId]) REFERENCES [HealthStatus] ([Id]),
  CONSTRAINT [FK_Post_Ownership] FOREIGN KEY ([OwnershipId]) REFERENCES [Ownership] ([Id])
)

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Subject] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [isDeleted] bit

  CONSTRAINT [FK_Comment_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
  CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Maintenance] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULl
)

CREATE TABLE [PostMaintenance] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULl,
  [MaintenanceId] integer NOT NULl

  CONSTRAINT [FK_PostMaintenance_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
  CONSTRAINT [FK_PostMaintenance_Maintenance] FOREIGN KEY ([MaintenanceId]) REFERENCES [Maintenance] ([Id])
)
GO