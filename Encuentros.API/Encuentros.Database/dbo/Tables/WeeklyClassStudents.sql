CREATE TABLE [dbo].[WeeklyClassStudents] (
    [WeeklyClassId] BIGINT NOT NULL,
    [StudentId]     BIGINT NOT NULL,
    [Id]            BIGINT IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [PK_WeeklyClassStudents] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_WeeklyClassStudents_Students_StudentId] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[Students] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_WeeklyClassStudents_WeeklyClasses_WeeklyClassId] FOREIGN KEY ([WeeklyClassId]) REFERENCES [dbo].[WeeklyClasses] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_WeeklyClassStudents_StudentId]
    ON [dbo].[WeeklyClassStudents]([StudentId] ASC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_WeeklyClassStudents_WeeklyClassId_StudentId]
    ON [dbo].[WeeklyClassStudents]([WeeklyClassId] ASC, [StudentId] ASC);

