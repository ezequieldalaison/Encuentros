SET IDENTITY_INSERT [dbo].[Parameters] ON;

	MERGE [dbo].[Parameters] AS TARGET
	USING(VALUES
		(1,'Cantidad de Camas de Pilates', 4),
		(2,'Precio Hora Profesor', 250)
	) AS SOURCE([Id], [Name], [Value])
	ON TARGET.[Id] = SOURCE.[Id]
	WHEN MATCHED THEN
		UPDATE SET 
			[Name] = Source.[Name], 
			[Value] = Source.[Value]
	WHEN NOT MATCHED BY TARGET THEN
		INSERT([Id], [Name], [Value])
		VALUES(Source.[Id], Source.[Name], Source.[Value])
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

SET IDENTITY_INSERT [dbo].[Parameters] OFF;