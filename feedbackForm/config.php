<?php


//Настройки сервера
ini_set('error_reporting', E_ALL);
ini_set('display_errors','1');
setlocale(LC_ALL, "ru_RU.UTF-8");
mb_internal_encoding("UTF-8");
mb_http_output('UTF-8');

//Возвращает объект Date в любой части кода
function getHour() {
	return new DateTime('now + 2 hour');
}

//Динамическое подключение классов
function __autoload($name) 
{
	include_once($name.'.php');
}

//Константы
if ('localhost' === $_SERVER['HTTP_HOST']) {
	define('HOST', 'localhost');
	define('DB', 'lead');
	define('USER', 'root');
	define('PASSWORD', '');
} elseif ('mysql.hostinger.ru' === $_SERVER['HTTP_HOST']) {
	define('HOST', 'mysql.hostinger.ru');
	define('DB', 'u421461657_bank');
	define('USER', 'u421461657_pie');
	define('PASSWORD', 'OKfS8OI31n');
}

//Модуль тестирования
/*print_r(date_default_timezone_get().' '.ini_get('error_log').' '.
ini_get('error_reporting').' '.ini_get('default_charset').' '.
mb_http_output().' '.setlocale(LC_ALL, NULL).' '.ini_get('display_errors')
.' '.date('H:i:s O I', time()+3600)); exit;*/
?>