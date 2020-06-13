-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 08, 2020 at 06:13 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_gershunz`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cards`
--

CREATE TABLE `Cards` (
  `cardID` int(11) NOT NULL,
  `playerID` int(11) DEFAULT NULL,
  `teamID` int(11) DEFAULT NULL,
  `typeID` int(11) DEFAULT NULL,
  `cardYear` int(11) NOT NULL,
  `cardBrand` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Cards`
--

INSERT INTO `Cards` (`cardID`, `playerID`, `teamID`, `typeID`, `cardYear`, `cardBrand`) VALUES
(1, 1, 18, 1, 2020, 'Topps Series 1'),
(2, 2, 14, 2, 2020, 'BOWMAN Chrome'),
(3, 3, 19, 3, 2017, 'LEAF Flash'),
(4, 5, 3, 5, 2020, 'Topps Series 1'),
(5, 4, 18, 4, 2020, 'BOWMAN Chrome'),
(6, 1, 5, 6, 2011, 'Topps Series 1');

-- --------------------------------------------------------

--
-- Table structure for table `Players`
--

CREATE TABLE `Players` (
  `playerID` int(11) NOT NULL,
  `p_fName` varchar(255) NOT NULL,
  `p_lName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Players`
--

INSERT INTO `Players` (`playerID`, `p_fName`, `p_lName`) VALUES
(1, 'DJ', 'LeMahieu'),
(2, 'Gavin', 'Lux'),
(3, 'JD', 'Davis'),
(4, 'Jasson', 'Dominguez'),
(5, 'DJ', 'Stewart');

-- --------------------------------------------------------

--
-- Table structure for table `Teams`
--

CREATE TABLE `Teams` (
  `teamID` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `teamName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Teams`
--

INSERT INTO `Teams` (`teamID`, `location`, `teamName`) VALUES
(1, 'Arizona', 'Diamondbacks'),
(2, 'Atlanta', 'Braves'),
(3, 'Baltimore', 'Orioles'),
(4, 'Boston', 'Red Sox'),
(5, 'Chicago', 'Cubs'),
(6, 'Chicago', 'White Sox'),
(7, 'Cincinnati', 'Reds'),
(8, 'Cleveland', 'Indians'),
(9, 'Colorado', 'Rockies'),
(10, 'Detroit', 'Tigers'),
(11, 'Houston', 'Astros'),
(12, 'Kansas City', 'Royals'),
(13, 'Los Angeles', 'Angels'),
(14, 'Los Angeles', 'Dodgers'),
(15, 'Miami', 'Marlins'),
(16, 'Milwaukee', 'Brewers'),
(17, 'Minnesota', 'Twins'),
(18, 'New York', 'Yankees'),
(19, 'New York', 'Mets'),
(20, 'Oakland', 'Athletics'),
(21, 'Philadelphia', 'Phillies'),
(22, 'Pittsburgh', 'Pirates'),
(23, 'San Diego', 'Padres'),
(24, 'San Francisco', 'Giants'),
(25, 'Seattle', 'Mariners'),
(26, 'St. Louis', 'Cardinals'),
(27, 'Tampa Bay', 'Rays'),
(28, 'Texas', 'Rangers'),
(29, 'Toronto', 'Blue Jays'),
(30, 'Washington', 'Nationals');

-- --------------------------------------------------------

--
-- Table structure for table `Types`
--

CREATE TABLE `Types` (
  `typeID` int(11) NOT NULL,
  `grade` float DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Types`
--

INSERT INTO `Types` (`typeID`, `grade`, `description`) VALUES
(1, 9.5, 'Non auto base Rookie Card, surface/edge clean, soft top left corner'),
(2, 7, 'Chrome orange parallel 24/50 auto, surface scratched and not centered'),
(3, 8.5, 'draft card auto, slighly off-centered and soft bottom right corner'),
(4, 10, 'GEM MINT BOWMAN Chrome AUTO!'),
(5, 2, 'severely damaged base card'),
(6, 9.5, 'gold parallel rookie card in near perfect condition!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cards`
--
ALTER TABLE `Cards`
  ADD PRIMARY KEY (`cardID`),
  ADD KEY `playerID` (`playerID`),
  ADD KEY `teamID` (`teamID`),
  ADD KEY `typeID` (`typeID`);

--
-- Indexes for table `Players`
--
ALTER TABLE `Players`
  ADD PRIMARY KEY (`playerID`);

--
-- Indexes for table `Teams`
--
ALTER TABLE `Teams`
  ADD PRIMARY KEY (`teamID`);

--
-- Indexes for table `Types`
--
ALTER TABLE `Types`
  ADD PRIMARY KEY (`typeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cards`
--
ALTER TABLE `Cards`
  MODIFY `cardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Players`
--
ALTER TABLE `Players`
  MODIFY `playerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Teams`
--
ALTER TABLE `Teams`
  MODIFY `teamID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Types`
--
ALTER TABLE `Types`
  MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cards`
--
ALTER TABLE `Cards`
  ADD CONSTRAINT `Cards_ibfk_1` FOREIGN KEY (`playerID`) REFERENCES `Players` (`playerID`) ON DELETE SET NULL,
  ADD CONSTRAINT `Cards_ibfk_2` FOREIGN KEY (`teamID`) REFERENCES `Teams` (`teamID`) ON DELETE SET NULL,
  ADD CONSTRAINT `Cards_ibfk_3` FOREIGN KEY (`typeID`) REFERENCES `Types` (`typeID`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
