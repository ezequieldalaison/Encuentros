SET IDENTITY_INSERT [dbo].[JournalSides] ON

	MERGE [dbo].[JournalSides] AS TARGET
	USING(VALUES
		(1,'Débito'),
		(2,'Crédito')
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

SET IDENTITY_INSERT [dbo].[JournalSides] OFF