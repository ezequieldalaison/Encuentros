CREATE TABLE [dbo].[Instructors] (
    [Id]       BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name]     NVARCHAR (50) NOT NULL,
    [LastName] NVARCHAR (50) NOT NULL,
    [IsActive] BIT           NOT NULL,
    CONSTRAINT [PK_Instructors] PRIMARY KEY CLUSTERED ([Id] ASC)
);

