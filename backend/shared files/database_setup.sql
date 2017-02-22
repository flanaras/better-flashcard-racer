create database flashcardracer;
use flashcardracer;

CREATE USER 'java'@'localhost' IDENTIFIED BY 'lordofgeese1997';
GRANT SELECT, DELETE, INSERT ON flashcardracer.* TO 'java'@'localhost';

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `problem` varchar(10) NOT NULL,
  `solution` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id`, `problem`, `solution`) VALUES
(1, '1 + 2', '3'),
(2, '2 - 1', '1'),
(3, '4 / 2', '2'),
(4, '2 * 3', '6'),
(5, '4 + 6', '10'),
(6, '10 - 4', '6'),
(7, '3 / 1', '3'),
(8, '2 * 0', '0'),
(9, '0 + 5', '5'),
(10, '8 - 6', '2'),
(11, '1 + 1', '2'),
(12, '3 - 1', '2'),
(13, '9 / 3', '3'),
(14, '2 * 5', '10'),
(15, '5 - 3', '2');

-- --------------------------------------------------------

--
-- Table structure for table `decks`
--

CREATE TABLE `decks` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(40) DEFAULT NULL,
  `difficulty` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `private` tinyint(1) NOT NULL,
  `created` varchar(50) NOT NULL,
  `changed` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `decks`
--

INSERT INTO `decks` (`id`, `name`, `description`, `difficulty`, `created_by`, `private`, `created`, `changed`) VALUES
(1, 'easy all operator', 'test deck for frontend', 1, 1, 1, '2017-01-25T20:17:45.000Z', '2017-01-25T20:17:45.000Z'),
(2, 'easy all operator v2', 'test deck for frontend', 1, 1, 0, '2017-02-09T20:17:45.000Z', '2017-02-09T20:17:45.000Z');

-- --------------------------------------------------------

--
-- Table structure for table `deck_card_dep`
--

CREATE TABLE `deck_card_dep` (
  `deck_id` int(11) DEFAULT NULL,
  `card_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deck_card_dep`
--

INSERT INTO `deck_card_dep` (`deck_id`, `card_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(20) DEFAULT NULL,
  `password` VARCHAR(30),
  `authlevel` INTEGER
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--
-- Drop all users and add sample

DELETE FROM users;
INSERT INTO users (username, password, authlevel) VALUES
    ("foo", "lalala", 1),
    ("miaTeacher", "123456", 1),
    ("su", "123456", 2),
    ("admin", "123456", 2),
    ("philip", "123456", 0),
    ("john", "123456", 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `decks`
--
ALTER TABLE `decks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `deck_card_dep`
--
ALTER TABLE `deck_card_dep`
  ADD KEY `deck_id` (`deck_id`),
  ADD KEY `card_id` (`card_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `decks`
--
ALTER TABLE `decks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `decks`
--
ALTER TABLE `decks`
  ADD CONSTRAINT `decks_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `deck_card_dep`
--
ALTER TABLE `deck_card_dep`
  ADD CONSTRAINT `deck_card_dep_ibfk_1` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`id`),
  ADD CONSTRAINT `deck_card_dep_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`);
