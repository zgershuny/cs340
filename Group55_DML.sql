-- CS 340 Project Queries

-- ---------------------------------------------------------------------------------------------------------
-- DISPLAY VIEWS
-- ---------------------------------------------------------------------------------------------------------

-- Players and Teams (sorted by players)
SELECT CONCAT(Players.p_fName, ' ', Players.p_lName) AS 'FullName', 
CONCAT(Teams.location,' ', Teams.teamName) AS 'TeamName'
FROM Cards
INNER JOIN Teams ON Cards.teamID=Teams.teamID
INNER JOIN Players ON Cards.playerID=Players.playerID 
ORDER BY `FullName` ASC

-- View CARDS and TEAMS (sorted by Teams)
SELECT CONCAT(Teams.location,' ', Teams.teamName) AS 'TeamName', 
CONCAT(Cards.cardYear, ' ', Cards.cardBrand) AS 'Card' 
FROM Cards 
INNER JOIN Teams ON Cards.teamID=Teams.teamID 
ORDER BY `TeamName` ASC

-- View CARDS AND PLAYERS (sorted by Players)
SELECT CONCAT(Players.p_fName,' ', Players.p_lName) AS 'FullName', 
CONCAT(Cards.cardYear, ' ', Cards.cardBrand) AS 'Card' 
FROM Cards 
LEFT JOIN Players ON Cards.playerID=Players.playerID 
ORDER BY `FullName` ASC

-- View CARDS, PLAYERS, and TEAMS
SELECT CONCAT(Cards.cardYear, ' ', Cards.cardBrand) AS 'Card', 
CONCAT(Players.p_fName,' ', Players.p_lName) AS 'FullName', 
CONCAT(Teams.location,' ', Teams.teamName) AS 'TeamName' 
FROM Cards 
LEFT JOIN Players ON Cards.playerID=Players.playerID 
LEFT JOIN Teams ON Cards.teamID=Teams.teamID 
ORDER BY `Card` ASC

-- View CARDS, PLAYERS, TEAMS, and Types (for Full View Page)
SELECT Cards.cardID, Cards.cardYear, Cards.cardBrand, 
Players.playerID, Players.p_fName, Players.p_lName,
Teams.teamID, Teams.location, Teams.teamName,
Types.typeID, Types.grade, Types.description 
FROM Cards 
LEFT JOIN Players ON Cards.playerID=Players.playerID 
LEFT JOIN Teams ON Cards.teamID=Teams.teamID
LEFT JOIN Types ON Cards.typeID=Types.typeID 
ORDER BY Cards.cardYear ASC


-- ---------------------------------------------------------------------------------------------------------
-- SELECT QUERIES to Display
-- ---------------------------------------------------------------------------------------------------------

-- Display Types for Types Page
SELECT Types.typeID, Types.grade, Types.description
FROM Types ORDER BY `grade` ASC

-- Display Teams for the Teams Page
SELECT Teams.teamID, Teams.location, Teams.teamName
FROM Teams
ORDER BY Teams.location ASC

-- Display Cards for Cards Page
SELECT Cards.cardID, Cards.cardYear, Cards.cardBrand
FROM Cards ORDER BY Cards.cardYear ASC

-- Display Players for Players Page
SELECT Players.playerID, Players.p_fName, Players.p_lName 
FROM Players 
WHERE Players.p_fName=:p_fName_input
ORDER BY Players.p_fName ASC

-- ---------------------------------------------------------------------------------------------------------
-- SELECT QUERIES to Find IDs
-- ---------------------------------------------------------------------------------------------------------

-- Find the typeID
SELECT * 
FROM Types
WHERE Type.typeID=:typeID_input

-- Find teamID
SELECT * 
FROM Teams
WHERE Teams.teamID=:teamID_input

-- Find playerID
SELECT * 
FROM Players
WHERE Players.playerID=:playerID_input

-- Find cardID
SELECT *
FROM Cards
WHERE Cards.cardID=:cardID_input

-- Find typeID associated to Card
SELECT typeID FROM Cards WHERE typeID=:typeID_input

-- ---------------------------------------------------------------------------------------------------------
-- SELECT QUERIES to Search
-- ---------------------------------------------------------------------------------------------------------

-- Find Types by grade
SELECT Types.typeID, Types.grade, Types.description
FROM Types
WHERE Types.grade=:grade_input
ORDER BY Types.grade ASC

-- Find Teams by Location Only
SELECT Teams.teamID, Teams.location, Teams.teamName 
FROM Teams 
WHERE Teams.location=:location_input
ORDER BY Teams.location ASC

-- Find Teams by Name only
SELECT Teams.teamID, Teams.location, Teams.teamName
FROM Teams
WHERE Teams.teamName=:teamName_input
ORDER BY Teams.location ASC

-- Find Teams by Location and Name
SELECT Teams.teamID, Teams.location, Teams.teamName 
FROM Teams
WHERE Teams.location=:location_input AND Teams.teamName=teamName_input
ORDER BY Teams.location ASC

-- Find Players by First Name
SELECT Players.playerID, Players.p_fName, Players.p_lName 
FROM Players
WHERE Players.p_fName=:p_fName_input
ORDER BY Players.p_fName ASC

-- Find Players by Last Name
SELECT Players.p_fName, Players.p_lName 
FROM Players
WHERE Players.p_lName=:p_lName_input
ORDER BY Players.p_fName ASC

-- Find Players by First and Last Name
SELECT Players.p_fName, Players.p_lName
FROM Players
WHERE Players.p_fName=:p_fName_input AND Players.p_lName=:p_fName_input
ORDER BY Players.p_lName ASC

-- Find Cards by Year
SELECT Cards.cardYear, Cards.cardBrand
FROM Cards 
WHERE Cards.cardYear=:cardYear_input
ORDER BY Cards.cardBrand ASC

-- Find Cards by Brand
SELECT Cards.cardYear, Cards.cardBrand
FROM Cards
WHERE Cards.cardBrand=:cardBrand_input
ORDER BY Cards.cardYear ASC

-- Find Cards by Year and Brand
SELECT Cards.cardYear, Cards.cardBrand 
FROM Cards 
WHERE Cards.cardYear=:cardYear_input AND Cards.cardBrand=:cardBrand_input
ORDER BY Cards.cardYear ASC

-- ---------------------------------------------------------------------------------------------------------
-- INSERT QUERIES
-- ---------------------------------------------------------------------------------------------------------

-- Add a New Card
INSERT INTO Cards(cardYear, cardBrand)
VALUES(:cardYear_input, :cardBrand_input)

-- Add a New Player
INSERT INTO Players(p_fName, p_lName) 
VALUES(:p_fName_input, :p_lName_input)

-- Add a New Team
INSERT INTO Teams(location, teamName) 
VALUES(:location_input, :teamName_input)

-- Add a Type
INSERT INTO Types(grade, description) 
VALUES(:grade_input, :description_input)

-- ---------------------------------------------------------------------------------------------------------
-- UPDATE QUERIES
-- ---------------------------------------------------------------------------------------------------------

-- Update Type's Grade and Description
-- 1a) If grade and description entered
UPDATE Types SET Types.grade=:grade_input, Types.description=:description_input
WHERE Types.typeID=:typeID_input

-- 1b) If only grade entered
UPDATE Types SET Types.grade=:grade_input, Types.description=NULL
WHERE Types.typeID=:typeID_input

-- Update Card's teamID
UPDATE Cards 
SET Cards.teamID=:teamID_input
WHERE Cards.cardID=:cardID_input

-- Update Card's playerID
UPDATE Cards
SET Cards.playerID=:playerID_input
WHERE Cards.cardID=:cardID_input

-- Update Team
UPDATE Teams 
SET Teams.location=:location_input, Teams.teamName=:teamName_input
WHERE Teams.teamID=:teamID_input

-- Update Card
UPDATE Cards
SET Cards.cardYear=:cardYear_input, Cards.cardBrand=:cardBrand_input
WHERE Cards.cardID=:cardID_input

-- ---------------------------------------------------------------------------------------------------------
-- DELETE QUERIES
-- ---------------------------------------------------------------------------------------------------------

-- Delete Types
DELETE FROM Types WHERE Types.typeID=:typeID_input

-- Delete Teams
DELETE FROM Teams WHERE Teams.teamID=:teamID_input

-- Delete Players
DELETE FROM Players WHERE Players.playerID=:playerID_input

-- Delete Cards 
DELETE FROM Cards WHERE Cards.cardID=:cardID_input 

-- Delete Cards and Types
DELETE FROM Cards, Types 
USING Cards 
INNER JOIN Types 
WHERE Cards.cardID=:cardID_input AND Types.typeID=:typeID_input


-- ---------------------------------------------------------------------------------------------------------
-- OTHER - Search Cards for Dropdown
-- ---------------------------------------------------------------------------------------------------------

SELECT CONCAT(Cards.cardYear, ' ', Cards.cardBrand) AS 'cardInfo'
FROM Cards
ORDER BY `cardInfo` DESC

-- Prepopulated Drop-Down list for Types
SELECT DISTINCT Types.grade
FROM Types
ORDER BY `grade` ASC

-- Prepopulated Drop-Down for Teams
SELECT Teams.teamID, CONCAT(Teams.location, ' ', Teams.teamName) AS 't_name' 
FROM Teams 
ORDER BY `t_name` ASC

-- Prepopulated Drop-Down for Players
SELECT Players.playerID, CONCAT(Players.p_fName, ' ', Players.p_lName) AS 'p_name'
FROM Players 
ORDER BY `p_name` ASC