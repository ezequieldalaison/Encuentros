MERGE [dbo].[ReceiptTypes] AS TARGET
USING(VALUES
	(1,'Recibo de Cuota de Pilates')
) AS SOURCE([Id], [Name])
ON TARGET.[Id] = SOURCE.[Id]
WHEN MATCHED THEN
	UPDATE SET 
		[Name] = Source.[Name]
WHEN NOT MATCHED BY TARGET THEN
	INSERT([Id],[Name])
	VALUES(Source.[Id], Source.[Name]
)
WHEN NOT MATCHED BY SOURCE THEN DELETE;