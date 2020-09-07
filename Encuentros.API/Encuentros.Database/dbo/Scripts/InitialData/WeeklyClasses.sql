﻿SET IDENTITY_INSERT [dbo].[WeeklyClasses] ON

	MERGE [dbo].[WeeklyClasses] AS TARGET
	USING(VALUES
		(1, 1, '8:00', 1, 1),
		(2, 1, '9:00', 1, 1),
		(3, 1, '10:00', 1, 1),
		(4, 1, '11:00', 1, 1),
		(5, 1, '12:00', 1, 1),
		(6, 1, '13:00', 1, 1),
		(7, 1, '14:00', 1, 1),
		(8, 1, '15:00', 1, 1),
		(9, 1, '16:00', 1, 1),
		(10, 1, '17:00', 1, 1),
		(11, 1, '18:00', 1, 1),
		(12, 1, '19:00', 1, 1),
		(13, 1, '20:00', 1, 1),
		
		(14, 2, '8:00', 1, 1),
		(15, 2, '9:00', 1, 1),
		(16, 2, '10:00', 1, 1),
		(17, 2, '11:00', 1, 1),
		(18, 2, '12:00', 1, 1),
		(19, 2, '13:00', 1, 1),
		(20, 2, '14:00', 1, 1),
		(21, 2, '15:00', 1, 1),
		(22, 2, '16:00', 1, 1),
		(23, 2, '17:00', 1, 1),
		(24, 2, '18:00', 1, 1),
		(25, 2, '19:00', 1, 1),
		(26, 2, '20:00', 1, 1),
		
		(27, 3, '8:00', 1, 1),
		(28, 3, '9:00', 1, 1),
		(29, 3, '10:00', 1, 1),
		(30, 3, '11:00', 1, 1),
		(31, 3, '12:00', 1, 1),
		(32, 3, '13:00', 1, 1),
		(33, 3, '14:00', 1, 1),
		(34, 3, '15:00', 1, 1),
		(35, 3, '16:00', 1, 1),
		(36, 3, '17:00', 1, 1),
		(37, 3, '18:00', 1, 1),
		(38, 3, '19:00', 1, 1),
		(39, 3, '20:00', 1, 1),
		
		(40, 4, '8:00', 1, 1),
		(41, 4, '9:00', 1, 1),
		(42, 4, '10:00', 1, 1),
		(43, 4, '11:00', 1, 1),
		(44, 4, '12:00', 1, 1),
		(45, 4, '13:00', 1, 1),
		(46, 4, '14:00', 1, 1),
		(47, 4, '15:00', 1, 1),
		(48, 4, '16:00', 1, 1),
		(49, 4, '17:00', 1, 1),
		(50, 4, '18:00', 1, 1),
		(51, 4, '19:00', 1, 1),
		(52, 4, '20:00', 1, 1),
		
		(53, 5, '8:00', 1, 1),
		(54, 5, '9:00', 1, 1),
		(55, 5, '10:00', 1, 1),
		(56, 5, '11:00', 1, 1),
		(57, 5, '12:00', 1, 1),
		(58, 5, '13:00', 1, 1),
		(59, 5, '14:00', 1, 1),
		(61, 5, '15:00', 1, 1),
		(62, 5, '16:00', 1, 1),
		(63, 5, '17:00', 1, 1),
		(64, 5, '18:00', 1, 1),
		(65, 5, '19:00', 1, 1),
		(66, 5, '20:00', 1, 1)
	) AS SOURCE([Id], [DayId], [Hour], [ProfessionalId], [IsActive])
	ON TARGET.[Id] = SOURCE.[Id]
	WHEN MATCHED THEN
		UPDATE SET 
			[DayId] = Source.[DayId],
			[Hour] = Source.[Hour],
			[ProfessionalId] = Source.[ProfessionalId],
			[IsActive] = Source.[IsActive]
	WHEN NOT MATCHED BY TARGET THEN
		INSERT([Id], [DayId], [Hour], [ProfessionalId], [IsActive])
		VALUES(Source.[Id], Source.[DayId], Source.[Hour], Source.[ProfessionalId], Source.[IsActive])
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

SET IDENTITY_INSERT [dbo].[WeeklyClasses] OFF