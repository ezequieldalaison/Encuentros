SET IDENTITY_INSERT [dbo].[WeeklyClasses] ON

	MERGE [dbo].[WeeklyClasses] AS TARGET
	USING(VALUES
		(1, 1, '8:00', 1),
		(2, 1, '9:00', 1),
		(3, 1, '10:00', 1),
		(4, 2, '8:00', 2),
		(5, 2, '9:00', 2),
		(6, 2, '10:00', 2)
	) AS SOURCE([Id], [DayId], [Hour], [InstructorId])
	ON TARGET.[Id] = SOURCE.[Id]
	WHEN MATCHED THEN
		UPDATE SET 
			[DayId] = Source.[DayId],
			[Hour] = Source.[Hour],
			[InstructorId] = Source.[InstructorId]
	WHEN NOT MATCHED BY TARGET THEN
		INSERT([Id], [DayId], [Hour], [InstructorId])
		VALUES(Source.[Id], Source.[DayId], Source.[Hour], Source.[InstructorId])
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

SET IDENTITY_INSERT [dbo].[WeeklyClasses] OFF