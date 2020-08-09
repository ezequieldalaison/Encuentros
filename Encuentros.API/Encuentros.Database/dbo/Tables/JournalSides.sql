CREATE TABLE [dbo].[JournalSides] (
    [Id]   BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_JournalSides] PRIMARY KEY CLUSTERED ([Id] ASC)
);

