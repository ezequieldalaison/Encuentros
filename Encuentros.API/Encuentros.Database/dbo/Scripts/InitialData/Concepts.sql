SET IDENTITY_INSERT [dbo].[Concepts] ON

	MERGE [dbo].[Concepts] AS TARGET
	USING(VALUES
		(1,'Cuota Pilates', 1, 2)
	) AS SOURCE([Id], [Name], [AreaId], [JournalSideId])
	ON TARGET.[Id] = SOURCE.[Id]
	WHEN MATCHED THEN
		UPDATE SET 
			[Name] = Source.[Name],
			[AreaId] = Source.[AreaId],
			[JournalSideId] = Source.[JournalSideId]
	WHEN NOT MATCHED BY TARGET THEN
		INSERT([Id],[Name], [AreaId], [JournalSideId])
		VALUES(Source.[Id], Source.[Name], Source.[AreaId], Source.[JournalSideId])
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

SET IDENTITY_INSERT [dbo].[Concepts] OFF