SET IDENTITY_INSERT [dbo].[FeeTypes] ON

	MERGE [dbo].[FeeTypes] AS TARGET
	USING(VALUES
		(1,'1 vez por semana'),
		(2,'2 veces por semana'),
		(3,'3 veces por semana'),
		(4,'Clase individual')
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

SET IDENTITY_INSERT [dbo].[FeeTypes] OFF