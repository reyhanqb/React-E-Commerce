-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2023 at 08:35 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce-db-test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `username`, `password`) VALUES
(1, 'admin1', 'myadmin');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `details` varchar(100) NOT NULL,
  `total` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `zipcode` varchar(5) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `payment_token` varchar(40) NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_finished` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `details`, `total`, `email`, `address`, `city`, `province`, `zipcode`, `name`, `payment_token`, `date_created`, `date_finished`) VALUES
(1, 'test', 0, 'default@mail.com', 'a', '', '', '', 'a', '', '2023-07-26 00:20:30', '0000-00-00 00:00:00'),
(3, '2(2), 3(2)', 70000, 'default@mail.com', 'jl', '', '', '', 'mytest', 'abcdefgh', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, '3(1)', 10000, 'default@mail.com', 'adas', 'adsads', 'adsads', '12321', 'adasd', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, '3(1)', 10000, 'default@mail.com', 'adas', 'adsads', 'adsads', '12321', 'adasd', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, '2(2)', 50000, 'default@mail.com', '123123', '123123', '123123', '12313', 'rehan', '', '2023-07-23 19:44:48', '2023-07-27 20:35:53'),
(11, '2(2)', 50000, 'default@mail.com', '123123', '123123', '123123', '12313', 'rehan', '', '2023-07-23 19:44:48', NULL),
(15, '2(2)', 50000, 'default@mail.com', '123123', '123123', '123123', '12313', 'rehan', '', '2023-07-23 19:44:48', NULL),
(20, '2(2)', 50000, 'default@mail.com', '123123', '123123', '123123', '12313', 'rehan', '', '2023-07-23 19:44:48', NULL),
(23, '2(2)', 50000, 'default@mail.com', '123123', '12312312123', '123123', '12312', '123123', '', '2023-07-23 22:33:26', NULL),
(26, '2(2)', 50000, 'default@mail.com', '123123', '12312312123', '123123', '12312', '123123', 'a83b0949-a337-4e23-9aeb-8359456f9bea', '2023-07-23 22:33:26', NULL),
(27, '2(2)', 50000, 'default@mail.com', 'foo', 'bar', 'foo', '123', 'foo', '', '2023-07-24 20:05:54', NULL),
(28, '2(2)', 50000, 'default@mail.com', 'foo', 'bar', 'foo', '123', 'foo', '21e723cc-55c6-459b-a5de-4cc6404caa8a', '2023-07-24 20:05:54', NULL),
(31, '3(1)', 10000, 'default@mail.com', '132132', 'p', 'c', '12312', '123123', '8b148bbd-8196-4c4d-8402-680677a913f5', '2023-07-25 21:50:44', NULL),
(32, '3(1)', 10000, 'default@mail.com', '132132', 'p', 'c', '12312', '123123', '43656ce0-7a25-4ce6-b18d-6b945f2c8815', '2023-07-25 21:50:44', NULL),
(33, '2(2)', 50000, 'default@mail.com', 'jl x', 'jakarta', 'dki jakarta', '12374', 'test', '180ee984-7a80-4786-8347-4b673abce4e7', '2023-08-10 21:36:17', NULL),
(34, '3(2)', 20000, 'newemail@mail.com', 'jl p', 'jakarta', 'jakarta', '12345', '1234567', '', '2023-08-24 19:49:36', NULL),
(35, '3(2)', 20000, 'default@mail.com', 'asd', 'ads', 'ads', 'ads', 'test', '5d7d7765-4077-4d2a-9e52-4a1259ab0b0d', '2023-08-25 15:17:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_proof` varchar(255) NOT NULL,
  `payment_token` varchar(40) NOT NULL,
  `account_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `payment_method`, `payment_proof`, `payment_token`, `account_number`) VALUES
(1, 'OVO', 'payment_proof-1690044711969.jpeg', 'a83b0949-a337-4e23-9aeb-8359456f9bea', '123123132'),
(2, 'OVO', 'payment_proof-1690111572156.png', '', '909090090'),
(6, 'OVO', 'payment_proof-1690204301708.jpeg', '21e723cc-55c6-459b-a5de-4cc6404caa8a', '123132123'),
(7, 'Transfer Bank', 'payment_proof-1692870405612.png', '180ee984-7a80-4786-8347-4b673abce4e7', '12312313');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `PASSWORD`) VALUES
(1, 'default@mail.com', 'test', 'test'),
(2, 'newemail@mail.com', '1234567', '1234567'),
(3, 'newmail@mail.com', 'newuser1', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `address_2` (`address`),
  ADD KEY `payment_token` (`payment_token`),
  ADD KEY `orders_ibfk_1` (`email`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `token_payment_1` (`payment_token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `token_payment_1` FOREIGN KEY (`payment_token`) REFERENCES `orders` (`payment_token`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
