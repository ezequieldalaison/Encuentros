CREATE TABLE [dbo].[ReceiptNumbers]
(
	[Id] BIGINT NOT NULL PRIMARY KEY,
    [ReceiptTypeId] BIGINT NOT NULL, 
    [LastNumber] BIGINT NOT NULL, 
    CONSTRAINT [FK_ReceiptNumbers_ReceiptTypes_ReceiptTypeId] FOREIGN KEY (ReceiptTypeId) REFERENCES [dbo].ReceiptTypes ([Id])
)
