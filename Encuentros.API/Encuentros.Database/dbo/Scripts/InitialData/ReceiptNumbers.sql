MERGE [dbo].[ReceiptNumbers] AS TARGET
USING(VALUES
	(1, 1, 0)
) AS SOURCE([Id], [ReceiptTypeId], [LastNumber])
ON TARGET.[Id] = SOURCE.[Id]
WHEN MATCHED THEN
	UPDATE SET 
		[ReceiptTypeId] = Source.[ReceiptTypeId],
		[LastNumber] = Source.[LastNumber]
WHEN NOT MATCHED BY TARGET THEN
	INSERT([Id], [ReceiptTypeId], [LastNumber])
	VALUES(Source.[Id], Source.[ReceiptTypeId], Source.[LastNumber])
WHEN NOT MATCHED BY SOURCE THEN DELETE;