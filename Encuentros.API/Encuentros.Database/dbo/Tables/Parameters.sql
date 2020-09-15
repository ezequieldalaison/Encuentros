CREATE TABLE [dbo].[Parameters]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1), 
    [Name] VARCHAR(50) NOT NULL, 
    [Value] VARCHAR(50) NOT NULL,
    [AreaId] BIGINT NOT NULL,
    CONSTRAINT [FK_Parameters_Areas_AreaId] FOREIGN KEY ([AreaId]) REFERENCES [dbo].[Areas] ([Id]), 
)
