CREATE TABLE [dbo].[ProfessionalAreas]
(
    [Id]   BIGINT        IDENTITY (1, 1) NOT NULL,
    [ProfessionalId] BIGINT NOT NULL, 
    [AreaId] BIGINT NOT NULL,
    CONSTRAINT [FK_ProfessionalAreas_Professionals_ProfessionalId] FOREIGN KEY ([ProfessionalId]) REFERENCES [dbo].[Professionals] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ProfessionalAreas_Areas_AreaId] FOREIGN KEY ([AreaId]) REFERENCES [dbo].[Areas] ([Id]) ON DELETE CASCADE, 
    CONSTRAINT [PK_ProfessionalAreas] PRIMARY KEY ([Id])
);

GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_ProfessionalAreas_ProfessionalId_AreaId]
    ON [dbo].[ProfessionalAreas]([ProfessionalId] ASC, [AreaId] ASC);