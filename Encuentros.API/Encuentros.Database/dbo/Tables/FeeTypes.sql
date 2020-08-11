CREATE TABLE [dbo].[FeeTypes]
(
    [Id]   BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    [Amount] DECIMAL(9, 2) NOT NULL, 
    CONSTRAINT [PK_FeeTypes] PRIMARY KEY CLUSTERED ([Id] ASC)
);