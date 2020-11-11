CREATE TABLE [dbo].[Movements]
(
    [Id]           BIGINT        IDENTITY (1, 1) NOT NULL,
    Date        DATE        NULL,
    Amount         DECIMAL(9, 2) NOT NULL,
    [Comments] NVARCHAR(200)        NOT NULL,
    [ConceptId] BIGINT NOT NULL, 
    [MovementStatusId] BIGINT NOT NULL, 
    [ReceiptNumber] VARCHAR(50) NULL, 
    CONSTRAINT [PK_Movements] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Movements_Concepts_ConceptId] FOREIGN KEY (ConceptId) REFERENCES [dbo].Concepts ([Id]),
    CONSTRAINT [FK_Movements_MovementStatuses_MovementStatusId] FOREIGN KEY (MovementStatusId) REFERENCES [dbo].MovementStatuses ([Id])
);