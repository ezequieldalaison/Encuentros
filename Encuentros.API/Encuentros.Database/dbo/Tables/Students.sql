CREATE TABLE [dbo].[Students] (
    [Id]          BIGINT         IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (50)  NOT NULL,
    [LastName]    NVARCHAR (50)  NOT NULL,
    [PhoneNumber] NVARCHAR (MAX) NULL,
    [Email]       NVARCHAR (50)  NULL,
    [IsActive]    BIT            NOT NULL,
    CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED ([Id] ASC)
);

