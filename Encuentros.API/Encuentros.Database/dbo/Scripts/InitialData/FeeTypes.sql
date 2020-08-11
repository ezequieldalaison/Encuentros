SET IDENTITY_INSERT [dbo].[FeeTypes] ON

	MERGE [dbo].[FeeTypes] AS TARGET
	USING(VALUES
		(1, '1 vez por semana', 100),
		(2, '2 veces por semana', 200),
		(3, '3 veces por semana', 300),
		(4, 'Clase individual', 50)
	) AS SOURCE([Id], [Name], [Amount])
	ON TARGET.[Id] = SOURCE.[Id]
	WHEN MATCHED THEN
		UPDATE SET 
			[Name] = Source.[Name],
			[Amount] = Source.[Amount]
	WHEN NOT MATCHED BY TARGET THEN
		INSERT([Id],[Name],[Amount])
		VALUES(Source.[Id], Source.[Name], Source.[Amount])
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

SET IDENTITY_INSERT [dbo].[FeeTypes] OFF