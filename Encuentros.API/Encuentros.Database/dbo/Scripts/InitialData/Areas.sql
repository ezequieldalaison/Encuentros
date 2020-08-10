SET IDENTITY_INSERT [dbo].[Areas] ON

	MERGE [dbo].[Areas] AS TARGET
	USING(VALUES
		(1,'Pilates'),
		(2,'Consultorio'),
		(3,'Transporte Especial'),
		(4,'Terapias'),
		(5,'Psicopedagogía')
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

SET IDENTITY_INSERT [dbo].[Areas] OFF