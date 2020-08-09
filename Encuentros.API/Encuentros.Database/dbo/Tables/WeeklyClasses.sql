CREATE TABLE [dbo].[WeeklyClasses] (
    [Id]           BIGINT        IDENTITY (1, 1) NOT NULL,
    [DayId]        BIGINT        NOT NULL,
    [Hour]         NVARCHAR (10) NOT NULL,
    [InstructorId] BIGINT        NULL,
    CONSTRAINT [PK_WeeklyClasses] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_WeeklyClasses_Days_DayId] FOREIGN KEY ([DayId]) REFERENCES [dbo].[Days] ([Id]),
    CONSTRAINT [FK_WeeklyClasses_Instructors_InstructorId] FOREIGN KEY ([InstructorId]) REFERENCES [dbo].[Instructors] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_WeeklyClasses_InstructorId]
    ON [dbo].[WeeklyClasses]([InstructorId] ASC);

