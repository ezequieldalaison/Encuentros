CREATE TABLE [dbo].[MovementStatuses] (
    [Id]   BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_MovementStatuses] PRIMARY KEY CLUSTERED ([Id] ASC)
);

