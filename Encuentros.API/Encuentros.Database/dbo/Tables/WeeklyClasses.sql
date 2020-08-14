CREATE TABLE [dbo].[WeeklyClasses] (
    [Id]           BIGINT        IDENTITY (1, 1) NOT NULL,
    [DayId]        BIGINT        NOT NULL,
    [Hour]         NVARCHAR (10) NOT NULL,
    [InstructorId] BIGINT        NOT NULL,
    CONSTRAINT [PK_WeeklyClasses] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_WeeklyClasses_Days_DayId] FOREIGN KEY ([DayId]) REFERENCES [dbo].[Days] ([Id]),
    CONSTRAINT [FK_WeeklyClasses_Professional_InstructorId] FOREIGN KEY ([InstructorId]) REFERENCES [dbo].Professionals ([Id]) 
);
GO
