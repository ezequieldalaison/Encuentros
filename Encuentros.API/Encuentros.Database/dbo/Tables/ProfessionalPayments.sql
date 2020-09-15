CREATE TABLE [dbo].[ProfessionalPayments]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1), 
    [ProfessionalId] BIGINT NOT NULL,
    [MonthId] BIGINT NOT NULL,
    [QuantityHours] INT NOT NULL, 
    [ValueHour] DECIMAL(9, 2) NOT NULL, 
    [MovementId] BIGINT NOT NULL, 
    CONSTRAINT [FK_ProfessionalPayments_Professional_ProfessionalId] FOREIGN KEY ([ProfessionalId]) REFERENCES [dbo].Professionals ([Id]),
    CONSTRAINT [FK_ProfessionalPayments_Months_MonthId] FOREIGN KEY ([MonthId]) REFERENCES [dbo].Months ([Id]),
    CONSTRAINT [FK_ProfessionalPayments_Movements_MovementId] FOREIGN KEY ([MovementId]) REFERENCES [dbo].Movements ([Id]), 
    CONSTRAINT [UK_ProfessionalPayments_ProfessionalId_MonthId] UNIQUE (ProfessionalId, MonthId)
)
