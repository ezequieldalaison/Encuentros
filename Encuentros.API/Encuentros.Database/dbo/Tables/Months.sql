CREATE TABLE [dbo].[Months] (
    [Id]   BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Months] PRIMARY KEY CLUSTERED ([Id] ASC)
);

