USE [HeritageTree];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Public'), (3, 'Arbor');
set identity_insert [UserType] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, UserName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (1, 'TreeBoard', 'Maple', 'Oak', 'tree@heritage.old', '2022-04-03', 1);
insert into UserProfile (Id, UserName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (1, 'TreeBoard2', 'Locust', 'Walnut', 'tree2@heritage.old', '2022-04-03', 1);
insert into UserProfile (Id, UserName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (2, 'Jane', 'Jane', 'Beech', 'hi@here.now', '2022-04-03', 2);
insert into UserProfile (Id, UserName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (2, 'Joe', 'Joe', 'Hemlock', 'howdy@here.now', '2022-04-03', 2);
insert into UserProfile (Id, UserName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (3, 'Arb', 'Chip', 'Cutter', 'arbor@tree.care', '2022-04-03', 3);
insert into UserProfile (Id, UserName, FirstName, LastName, Email, CreateDateTime, UserTypeId) values (3, 'Aspen', 'Aspen ', 'Redbud', 'arbor2@tree.care', '2022-04-03', 3);
set identity_insert [UserProfile] off


set identity_insert [Post] on
insert into Post (Id, [Location], WardId, CreateDateTime,UserProfileId, TreeSpeciesNameId, ImageLocation, HeritageStatusId, HeritageDateTime, HealthStatusId, OwnershipId, IsApproved) values (1, 'morph front-end markets', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 'http://lorempixel.com/920/360/', '2019-08-01', '2019-12-04', 1, 3, 6);


set identity_insert [Ward] on
insert into [Ward] ([Id], [Name])
values (1, 'First Ward'), (2, 'Second Ward'), (3, 'Third Ward'), (4, 'Fourth Ward'), (5, 'Fifth Ward'), (6, 'Other'), (7, 'I do not know');
set identity_insert [Ward] off

set identity_insert [HeritageStatus] on
insert into [HeritageStatus] ([Id], [Name])
values (1, 'Heritage'), (2, 'Not Heritage'), (3, 'For further review');
set identity_insert [HeritageStatus] off

set identity_insert [TreeSpeciesName] on
insert into [TreeSpeciesName] ([Id], [Name])
values (1, 'Acer saccharum'), (2, 'Acer rubrum'), (3, 'Amelanchier arborea'), (4, 'Betula alleghaniensis'), (5, 'Carya'), (6, 'Cedrus'),
 (7, 'Cercis canadensis'), (8, 'Cornus florida'), (9, 'Fagus grandifolia'), (10, 'Fraxinus americana'), (11, 'Juglans nigra'), (12, 'Liquidambar styraciflua'), (13, 'Liriodendron tulipifera'), (14, 'Magnolia acuminata'),
 (15, 'Oxydendrum arboreum'), (16, 'Pinus rigida'), (17,'Platanus occidentalis'), (18, 'Populus'), (19, 'Populus tremuloides'), (20,
 'Prunus serotina'),(21,'Quercus velutina'), (22, 'Robinia pseudoacacia'), (23, 'Tilia americana' ), (24, 'Tsuga heterophylla'), (25, 'Ulmus americana');
set identity_insert [TreeSpeciesName] off

set identity_insert [HealthStatus] on
insert into [HealthStatus] ([Id], [Name])
values (1, 'Healthy'), (2, 'Fair'), (3, 'Poor'), (4, 'I do not know');
set identity_insert [HealthStatus] off


set identity_insert [Ownership] on
insert into [Ownership] ([Id], [Name])
values (1, 'Public'), (2, 'Private'), (3, 'Other'), (4, 'I do not know');
set identity_insert [Ownership] off

set identity_insert [Comment] on
insert into [Comment] ([Id], PostId, UserProfileId, [Subject], [Content], CreateDateTime, isDeleted)
values (1, 1, 2, 'Age of the tree', 'This tree has been here for a long time.','2022-04-03', 1);
set identity_insert [Comment] off

set identity_insert [Maintenance] on
insert into [Maintenance] ([Id], [Name])
values (1, 'Trimming'), (2, 'Partial removal'), (3, 'Full removal'), (4, 'Chemical treatment');
set identity_insert [Maintenance] off

set identity_insert [PostMaintenance] on
insert into [PostMaintenance] ([Id], PostId, MaintenanceId)
values (1, 1, 1), (2, 1, 4);
set identity_insert [PostMaintenance] off