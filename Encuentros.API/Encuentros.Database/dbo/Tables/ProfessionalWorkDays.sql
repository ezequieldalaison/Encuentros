CREATE TABLE [dbo].[ProfessionalWorkDays]
(
    [Id] BIGINT IDENTITY (1, 1) NOT NULL,
    [Date] DATE NOT NULL, 
    [InstructorId] BIGINT NOT NULL, 
    [QuantityHours] INT NOT NULL,
    CONSTRAINT [FK_ProfessionalWorkDays_Professional_InstructorId] FOREIGN KEY ([InstructorId]) REFERENCES [dbo].Professionals ([Id]) 
)

GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_ProfessionalWorkDays_InstructorId_Date]
    ON [dbo].[ProfessionalWorkDays]([InstructorId] ASC, [Date] ASC);