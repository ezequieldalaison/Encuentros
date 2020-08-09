SET IDENTITY_INSERT [dbo].[Days] ON

	MERGE [dbo].[Days] AS TARGET
	USING(VALUES
		(1,'Lunes'),
		(2,'Martes'),
		(3,'Miércoles'),
		(4,'Jueves'),
		(5,'Viernes')
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

SET IDENTITY_INSERT [dbo].[Days] OFF