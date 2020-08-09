SET IDENTITY_INSERT [dbo].[Months] ON

	MERGE [dbo].[Months] AS TARGET
	USING(VALUES
		(1,'Enero'),
		(2,'Febrero'),
		(3,'Marzo'),
		(4,'Abril'),
		(5,'Mayo'),
		(6,'Junio'),
		(7,'Julio'),
		(8,'Agosto'),
		(9,'Septiembre'),
		(10,'Octubre'),
		(11,'Noviembre'),
		(12,'Diciembre')
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

SET IDENTITY_INSERT [dbo].[Months] OFF