CREATE TABLE [dbo].[Fees]
(
    [Id]           BIGINT        IDENTITY (1, 1) NOT NULL,
    [StudentId]        BIGINT        NOT NULL,
    [FeeTypeId]         BIGINT NOT NULL,
    [MonthId] BIGINT        NOT NULL,
    [MovementId] BIGINT NOT NULL, 
    CONSTRAINT [PK_Fees] PRIMARY KEY ([Id]), 
    CONSTRAINT [FK_Fees_Students_StudentId] FOREIGN KEY ([StudentId]) REFERENCES [dbo].Students ([Id]),
    CONSTRAINT [FK_Fees_FeeTypes_FeeTypeId] FOREIGN KEY ([FeeTypeId]) REFERENCES [dbo].FeeTypes ([Id]),
    CONSTRAINT [FK_Fees_Months_MonthId] FOREIGN KEY ([MonthId]) REFERENCES [dbo].Months ([Id]),
    CONSTRAINT [FK_Fees_Movements_MovementId] FOREIGN KEY ([MovementId]) REFERENCES [dbo].Movements ([Id])
);