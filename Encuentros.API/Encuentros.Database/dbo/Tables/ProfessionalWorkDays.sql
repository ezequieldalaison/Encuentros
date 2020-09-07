CREATE TABLE [dbo].[ProfessionalWorkDays]
(
    [Id] BIGINT IDENTITY (1, 1) NOT NULL,
    [Date] DATE NOT NULL, 
    [ProfessionalId] BIGINT NOT NULL, 
    [QuantityHours] INT NOT NULL,
    CONSTRAINT [FK_ProfessionalWorkDays_Professional_ProfessionalId] FOREIGN KEY ([ProfessionalId]) REFERENCES [dbo].Professionals ([Id]) 
)

GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_ProfessionalWorkDays_ProfessionalId_Date]
    ON [dbo].[ProfessionalWorkDays]([ProfessionalId] ASC, [Date] ASC);