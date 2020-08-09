CREATE TABLE [dbo].[Professionals] (
    [Id]             BIGINT         IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (50)  NOT NULL,
    [LastName]       NVARCHAR (50)  NOT NULL,
    [DocumentNumber] NVARCHAR (10)  NOT NULL,
    [Email]          NVARCHAR (50)  NULL,
    [PhoneNumber]    NVARCHAR (MAX) NULL,
    [Percentage]     INT            NOT NULL,
    [IsActive]       BIT            NOT NULL,
    CONSTRAINT [PK_Professionals] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Professionals_DocumentNumber]
    ON [dbo].[Professionals]([DocumentNumber] ASC);

