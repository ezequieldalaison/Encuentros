SET IDENTITY_INSERT [dbo].[MovementStatuses] ON

	MERGE [dbo].[MovementStatuses] AS TARGET
	USING(VALUES
		(1,'Pendiente'),
		(2,'Pagado')
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

SET IDENTITY_INSERT [dbo].[MovementStatuses] OFF