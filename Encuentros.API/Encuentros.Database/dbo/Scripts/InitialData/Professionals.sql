SET IDENTITY_INSERT [dbo].[Professionals] ON

	MERGE [dbo].[Professionals] AS TARGET
	USING(VALUES
		(1, 'Danilo', 'Mengarelli', '35678000', 'dani@gmail.com', '3413444555', null, 1),
		(2, 'Matias', 'Sanchez', '35444000', 'matias@gmail.com', '341121234', null, 1)
	) AS SOURCE([Id], [Name], [LastName], [DocumentNumber], [Email], [PhoneNumber], [Percentage], [IsActive])
	ON TARGET.[Id] = SOURCE.[Id]
	WHEN MATCHED THEN
		UPDATE SET 
			[Name] = Source.[Name],
			[LastName] = Source.[LastName],
			[DocumentNumber] = Source.[DocumentNumber],
			[Email] = Source.[Email],
			[PhoneNumber] = Source.[PhoneNumber],
			[Percentage] = Source.[Percentage],
			[IsActive] = Source.[IsActive]
	WHEN NOT MATCHED BY TARGET THEN
		INSERT([Id], [Name], [LastName], [DocumentNumber], [Email], [PhoneNumber], [Percentage], [IsActive])
		VALUES(Source.[Id], Source.[Name], Source.[LastName], Source.[DocumentNumber], Source.[Email], Source.[PhoneNumber], Source.[Percentage], Source.[IsActive]);

SET IDENTITY_INSERT [dbo].[Professionals] OFF