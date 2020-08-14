﻿/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

:r .\InitialData\Areas.sql
:r .\InitialData\Days.sql
:r .\InitialData\Months.sql
:r .\InitialData\JournalSides.sql
:r .\InitialData\FeeTypes.sql
:r .\InitialData\MovementStatuses.sql
:r .\InitialData\Professionals.sql

:r .\InitialData\Concepts.sql
:r .\InitialData\WeeklyClasses.sql