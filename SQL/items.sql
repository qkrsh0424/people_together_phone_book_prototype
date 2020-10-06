-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 20-10-06 05:07
-- 서버 버전: 5.7.25
-- PHP 버전: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `peopletogether`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `items`
--

CREATE TABLE `items` (
  `id` bigint(40) NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_address` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_detail_address` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_contact` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info_url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_time` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `best_menu` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `talk_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `talk_people` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `manager_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `talk_desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `any_desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 테이블의 덤프 데이터 `items`
--

INSERT INTO `items` (`id`, `company_name`, `company_address`, `company_detail_address`, `company_contact`, `info_url`, `phone_number`, `service_time`, `best_menu`, `talk_time`, `talk_people`, `manager_name`, `talk_desc`, `any_desc`, `created_at`, `updated_at`, `deleted`) VALUES
(18, 'adsadsad', 'a', 'aㅇㄴㅁㅇㅁㄴ', 'a', 'a', 'adsadas', 'a', 'a', '2020-09-23 09:06:52', 'a', '', 'sadasd', '', '2020-09-23 09:06:52', '2020-10-05 09:11:16', 0),
(19, 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', '2020-09-23 09:06:57', 'b', 'b', '', '', '2020-09-23 09:06:57', '2020-09-23 09:06:57', 0),
(20, 'dasfasdsa', '', '', '', '', '', '', '', '2020-09-24 09:32:09', '', '', '', '', '2020-09-23 09:32:09', '2020-09-23 09:32:09', 0),
(21, 'dasfasd', 'adasd', '', '', '', '', '', '', '2020-09-23 09:32:43', '', '', '', '', '2020-09-23 09:32:43', '2020-10-05 09:23:59', 0),
(22, 'java', 'c', 'j', 'j', 'j', 'j', 'j', 'j', '2020-09-23 10:28:02', 'j', 'j', 'j', 'j', '2020-09-23 10:28:02', '2020-09-23 10:28:02', 0),
(23, 'b', 'b', 'nm', 'bnm', 'bnm', 'bnm', 'bnm', 'bnm', '2020-09-24 02:26:38', 'bn', 'mb', 'nmbnm', 'bnm', '2020-09-24 02:26:38', '2020-09-24 02:26:38', 0),
(24, 'java', 'java', 'java', 'java', 'java', 'java', 'java', 'java', '2020-09-24 02:28:53', 'java', 'java', 'java', 'java', '2020-09-24 02:28:53', '2020-09-24 02:28:53', 0),
(25, '하이', '하이', '하이', '하이', '하이', '', '', '', '2020-09-24 02:38:51', '', '', '', '', '2020-09-24 02:38:51', '2020-09-24 02:38:51', 0),
(26, '하이', '바이', '', '', '', '', '', '', '2020-09-24 02:39:49', '', '', '', '', '2020-09-24 02:39:49', '2020-09-24 02:39:49', 0),
(27, '하이', '하이', '하이', '하이', '하이', '하이', '하이', '하이', '2020-09-25 02:08:44', '하이', '하이', '하이', '하이', '2020-09-25 02:08:44', '2020-09-25 02:08:44', 0),
(28, '타오르는불', '울주군', '울주군', '010', 'ㅁㄴㅇㄹㅁㄴㅇㄹ', '010', '1년', '고기', '2020-09-25 02:15:42', '40대 , 여성 , 대표', '', '별다른 반론사항없이 네해주셨습니다', '', '2020-09-25 02:15:42', '2020-09-25 02:15:42', 0),
(29, '하이', '하이', '하이', '', '', '', '', '', '2020-10-05 05:52:25', '', '', '', '', '2020-10-05 05:52:25', '2020-10-05 05:52:25', 1),
(30, 'qkdl', 'dsafsada', '', 'fdsf', '', '', '', '', '2020-10-05 05:55:43', '', '', '', '', '2020-10-05 05:55:43', '2020-10-06 11:54:46', 0),
(31, 'asd', '', '', '', '', '', '', '', '2020-10-05 05:56:10', '', '', '', '', '2020-10-05 05:56:10', '2020-10-05 05:56:10', 0),
(32, 'fdgd', 'asdasd', '', '', '', '', '', '', '2020-10-05 05:56:39', '', '', '', '', '2020-10-05 05:56:39', '2020-10-05 09:24:07', 0),
(33, 'dsafsad', '', '', '', '', '', '', '', '2020-10-05 05:59:57', '', '', '', '', '2020-10-05 05:59:57', '2020-10-05 05:59:57', 0),
(34, 'hhhh', '', '', '', '', '', '', '', '2020-10-05 09:08:21', '', '', '', '', '2020-10-05 09:08:21', '2020-10-05 09:08:21', 0),
(35, 'sads', 'a', 'a', 'a', 'a', '', '', '', '2020-10-05 09:24:37', '', '', '', '', '2020-10-06 09:24:37', '2020-10-05 09:24:37', 1),
(36, 'fdsf', 'sfdsg', 'dsfsdgds', 'sad', '', '', '', '', '2020-10-06 11:15:25', '', '', '', '', '2020-10-06 11:15:25', '2020-10-06 11:16:04', 0),
(37, 'fdsa', 'fds', 'fdsa', '', 'fdsfds', '', '', '', '2020-10-06 11:55:05', 'fdsaf', '', '', '', '2020-10-06 11:55:05', '2020-10-06 11:55:05', 0),
(38, 'hello', '', '', '', '', '', '', '', '2020-10-06 12:05:58', '', '', '', '', '2020-10-06 12:05:58', '2020-10-06 12:05:58', 0);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
