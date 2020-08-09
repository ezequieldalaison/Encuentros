CREATE TABLE [dbo].[Concepts]
(
    [Id]           BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (50)        NOT NULL,
    [AreaId]         BIGINT NOT NULL,
    [JournalSideId] BIGINT        NOT NULL,
    CONSTRAINT [PK_Concepts] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Concepts_Areas_AreaId] FOREIGN KEY (AreaId) REFERENCES [dbo].Areas ([Id]),
    CONSTRAINT [FK_Concepts_JournalSides_JournalSideId] FOREIGN KEY (JournalSideId) REFERENCES [dbo].JournalSides ([Id])
);