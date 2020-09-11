SET IDENTITY_INSERT [dbo].[Concepts] ON

	MERGE [dbo].[Concepts] AS TARGET
	USING(VALUES
		(1,'Cuota Pilates', 1, 2, 0, 1),
		(2,'Materiales', 1, 1, 1, 1),
		(3,'Pago Profesor', 1, 1, 0, 1)
	) AS SOURCE([Id], [Name], [AreaId], [JournalSideId], [IsCommon], [IsActive])
	ON TARGET.[Id] = SOURCE.[Id]
	WHEN MATCHED THEN
		UPDATE SET 
			[Name] = Source.[Name],
			[AreaId] = Source.[AreaId],
			[JournalSideId] = Source.[JournalSideId],
			[IsCommon] = Source.[IsCommon],
			[IsActive] = Source.[IsActive]
	WHEN NOT MATCHED BY TARGET THEN
		INSERT([Id],[Name], [AreaId], [JournalSideId], [IsCommon], [IsActive])
		VALUES(Source.[Id], Source.[Name], Source.[AreaId], Source.[JournalSideId], Source.[IsCommon], Source.[IsActive])
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

SET IDENTITY_INSERT [dbo].[Concepts] OFF