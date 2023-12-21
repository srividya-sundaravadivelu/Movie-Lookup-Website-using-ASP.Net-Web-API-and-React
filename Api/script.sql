IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Movies] (
    [ID] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NULL,
    [Year] int NOT NULL,
    [Cast] nvarchar(max) NULL,
    [Genres] nvarchar(max) NULL,
    [Href] nvarchar(max) NULL,
    [Extract] nvarchar(max) NULL,
    [Thumbnail] nvarchar(max) NULL,
    [ThumbnailWidth] int NOT NULL,
    [ThumbnailHeight] int NOT NULL,
    CONSTRAINT [PK_Movies] PRIMARY KEY ([ID])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20231208203818_InitialCreate', N'7.0.14');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20231208204428_MovieDataInsert', N'7.0.14');
GO

COMMIT;
GO

