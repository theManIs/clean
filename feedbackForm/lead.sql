-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 01 2015 г., 18:54
-- Версия сервера: 5.6.25
-- Версия PHP: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lead`
--

-- --------------------------------------------------------

--
-- Структура таблицы `message_in`
--

CREATE TABLE IF NOT EXISTS `message_in` (
  `id` int(11) NOT NULL,
  `token` int(11) NOT NULL,
  `name` text,
  `mail` text,
  `message` text,
  `service` text,
  `department` text
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `message_in`
--

INSERT INTO `message_in` (`id`, `token`, `name`, `mail`, `message`, `service`, `department`) VALUES
(1, 17415, 'name', 'mail', 'mes', 'center', 'dep'),
(2, 17415, 'name', 'mail', 'mes', 'center', 'dep'),
(3, 17415, 'name', 'mail', 'mes', 'center', 'dep'),
(4, 17415, 'name', 'mail', 'mes', 'center', 'dep'),
(5, 17415, 'name', 'mail', 'mes', 'center', 'dep'),
(6, 1144525, 'q', 'a', 'z', 'Диллерский центр 1', 'Я не знаю какой отдел'),
(7, 17415, 'name', 'mail', 'mes', 'center', 'dep'),
(8, 17415, 'name', 'mail', 'mes', 'center', 'dep');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `message_in`
--
ALTER TABLE `message_in`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `message_in`
--
ALTER TABLE `message_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
