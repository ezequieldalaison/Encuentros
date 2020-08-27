CREATE TABLE [dbo].[IndividualClassStudents]
(
    [Id]            BIGINT IDENTITY (1, 1) NOT NULL,
    [Date]          DATE NOT NULL,
    [WeeklyClassId] BIGINT NOT NULL,
    [StudentId]     BIGINT NOT NULL,
    CONSTRAINT [FK_IndividualClassStudents_Students_StudentId] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[Students] ([Id]),
    CONSTRAINT [FK_IndividualClassStudents_WeeklyClasses_WeeklyClassId] FOREIGN KEY ([WeeklyClassId]) REFERENCES [dbo].[WeeklyClasses] ([Id]), 
    CONSTRAINT [PK_IndividualClassStudents] PRIMARY KEY ([Id])
);
