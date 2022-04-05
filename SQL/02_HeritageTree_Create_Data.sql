USE [HeritageTree];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Public'), (3, 'Arbor');
set identity_insert [UserType] off

set identity_insert [Maintenance] on
insert into [Maintenance] ([Id], [Name])
values (1, 'Trimming'), (2, 'Partial removal'), (3, 'Full removal'), (4, 'Chemical treatment');
set identity_insert [Maintenance] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (1, 'TreeBoard', 'Maple', 'Oak', 'tree@heritage.old', '2022-04-03', 1);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (2, 'TreeBoard2', 'Locust', 'Walnut', 'tree2@heritage.old', '2022-04-03', 1);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (3, 'Jane', 'Jane', 'Beech', 'hi@here.now', '2022-04-03', 2);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (4, 'Joe', 'Joe', 'Hemlock', 'howdy@here.now', '2022-04-03', 2);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (5, 'Arb', 'Chip', 'Cutter', 'arbor@tree.care', '2022-04-03', 3);
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (6, 'Aspen', 'Aspen ', 'Redbud', 'arbor2@tree.care', '2022-04-03', 3);
set identity_insert [UserProfile] off

set identity_insert [Ward] on
insert into [Ward] ([Id], [Name])
values (1, 'First Ward'), (2, 'Second Ward'), (3, 'Third Ward'), (4, 'Fourth Ward'), (5, 'Fifth Ward'), (6, 'Other'), (7, 'I do not know');
set identity_insert [Ward] off

set identity_insert [HeritageStatus] on
insert into [HeritageStatus] ([Id], [Name])
values (1, 'Heritage'), (2, 'Not Heritage'), (3, 'For further review');
set identity_insert [HeritageStatus] off

set identity_insert [TreeCommonName] on
insert into [TreeCommonName] ([Id], [Name],[IsActive])
values (1, 'American Beech', 1), (2,'American Elm', 1), (3, 'Aspen Trees', 1), (4, 'Basswood', 1), (5, 'Black Cherry', 1), (6, 'Black Oak', 1), (7,'Black Locust', 1), (8,'Black Walnut', 1), (9, 'Cedar Trees', 1),(10, 'Cottonwood', 1), (11, 'Cucumber Tree', 1), (12, 'Downy Serviceberry', 1), (13,'Eastern Redbud', 1), (14,'Flowering Dogwood', 1), (15, 'Hickory', 1), (16, 'Pitch pine', 1), (17,'Red Maple', 1), (18, 'Sourwood', 1), (19,'Sugar Maple', 1),(20,'Sycamore', 1),(21,'Sweetgum', 1),(22, 'Tulip Poplar', 1),(23,'Western Hemlock', 1),(24, 'White Ash', 1), (25,'Yellow Birch', 1);
set identity_insert [TreeCommonName] off

set identity_insert [HealthStatus] on
insert into [HealthStatus] ([Id], [Name])
values (1, 'Healthy'), (2, 'Fair'), (3, 'Poor'), (4, 'I do not know');
set identity_insert [HealthStatus] off

set identity_insert [Ownership] on
insert into [Ownership] ([Id], [Name])
values (1, 'Public'), (2, 'Private'), (3, 'Other'), (4, 'I do not know');
set identity_insert [Ownership] off

set identity_insert [Post] on
insert into Post (Id, StreetAddress, City, [State], Zip, [Location], WardId, CreateDateTime, UserProfileId, TreeCommonNameId, ImageLocation, HeritageStatusId, HeritageDateTime, HealthStatusId, OwnershipId, IsApproved) values (1, '401 Davis Ave', 'Elkins', 'WV', '26241',geography::Point(38.928385269844995, -79.84524114958445, 4326), 4, '2022-04-03', 1, 20,'https://www.google.com/maps/@38.9273879,-79.8461303,3a,75y,90t/data=!3m7!1e2!3m5!1sAF1QipOLfn8nSZPlG8AP-HsfgDLnrzud-ex6MI3KVzE!2e10!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOLfn8nSZPlG8AP-HsfgDLnrzud-ex6MI3KVzE%3Dw150-h150-k-no-p!7i1920!8i1080', 1, '2022-04-03', 1, 1, 1);
set identity_insert [Post] off

set identity_insert [Comment] on
insert into [Comment] ([Id], PostId, UserProfileId, [Subject], [Content], CreateDateTime, isDeleted)
values (1, 1, 2, 'Age of the tree', 'This tree has been here for a long time.','2022-04-03', 0);
set identity_insert [Comment] off

set identity_insert [PostMaintenance] on
insert into [PostMaintenance] ([Id], PostId, MaintenanceId)
values (1, 1, 1), (2, 1, 4);
set identity_insert [PostMaintenance] off