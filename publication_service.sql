-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2023 at 03:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `publication_service`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `institution` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`author_id`, `name`, `institution`, `department`, `email`, `address`, `homepage`) VALUES
(21, 'Pavan', 'GPREC', 'CSE', 'pavan@gmail.com', '22/221, Adoni, AP', 'https://archive.org/details/cu31924013586486/mode/2up?ref=ol&view=theater'),
(22, 'Priyanka', 'UNT', 'AI', 'priyanka@gmail.com', '32-344, Texas, USA', 'https://archive.org/details/cu31924013586486/mode/2up?ref=ol&view=theater'),
(23, 'Arun', 'Milton', 'Medico', 'arun@gmail.com', '23/908, Hyderabad, TS', 'https://archive.org/details/cu31924013586486/mode/2up?ref=ol&view=theater'),
(24, 'Naveen', 'KSRM', 'Mech', 'naveen@gmail.com', '12/31-12, Kurnool, AP', 'https://archive.org/details/feastofstfriendc00bennuoft/page/n7/mode/2up?ref=ol&view=theater'),
(25, 'Surya', 'GPREC', 'Mech', 'surya@gmail.com', '12/211-32', 'https://archive.org/details/ministerschargeo0000howe?ref=ol&view=theater'),
(26, 'Om Prakash', 'UNT', 'computer science', 'omprakash@gmail.com', 'denton, TX, USA', 'https://archive.org/details/playspleasantunp02shawrich/mode/2up?ref=ol&view=theater'),
(27, 'Ashok kumar', 'RVR', 'CSE', 'Ashok.kumar@gmail.com', 'Hyderabad , TS , India', 'https://archive.org/details/playspleasantunp02shawrich/mode/2up?ref=ol&view=theater');

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `publication_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `publication_location` varchar(255) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`publication_id`, `title`, `year`, `publication_location`, `pages`) VALUES
(21, 'The Voter', 2023, 'India', 320),
(22, 'The Laughter', 2022, 'USA', 341),
(23, 'The Great Success', 2001, 'India', 201),
(24, 'The HardWorker', 2010, 'India', 170),
(25, 'The Smart Worker', 2001, 'India', 210),
(29, 'Humble Person', 2000, 'India', 202),
(30, 'The Hunter', 2023, 'India', 250),
(31, 'Into The Heaven', 2020, 'Hyderabad', 200);

-- --------------------------------------------------------

--
-- Table structure for table `publication_authors`
--

CREATE TABLE `publication_authors` (
  `id` int(11) NOT NULL,
  `publication_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publication_authors`
--

INSERT INTO `publication_authors` (`id`, `publication_id`, `author_id`) VALUES
(1, 21, 21),
(2, 22, 22),
(3, 23, 23),
(4, 24, 24),
(5, 25, 25),
(6, 29, 21),
(7, 30, 26),
(8, 31, 27);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`author_id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`publication_id`);

--
-- Indexes for table `publication_authors`
--
ALTER TABLE `publication_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publication_id` (`publication_id`),
  ADD KEY `author_id` (`author_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `publication_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `publication_authors`
--
ALTER TABLE `publication_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `publication_authors`
--
ALTER TABLE `publication_authors`
  ADD CONSTRAINT `publication_authors_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`),
  ADD CONSTRAINT `publication_authors_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
