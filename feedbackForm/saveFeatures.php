<?php
include 'config.php';
//$_POST['form_token'] = '101010';
//$_POST['form_str'] = '[["color","coral"],["title","Отправить сообщение"],["notice","Оставьте ваши контактные данные, и мы свяжемся с вами в ближайшее время"],["question","Введите ваш вопрос"],["send","Отправить"],["close","Закрыть"],["push","Оставить данные"],["tComplete","Сообщение"],["complete","Вы успешно отправили свои контактные данные"],["field0","Новое поле"],["select0",[["option0","Название"],["option1","Поле 1"],["option2","Поле 2"],["option3","Поле 3"]]]]';
$form_token = isset($_POST['form_token']) ? $_POST['form_token'] : false;
$form_token = isset($_GET['form_token']) ? $_GET['form_token'] : $form_token;
$form_str = isset($_POST['form_str']) ? $_POST['form_str'] : false;

function write($form_token, $form_str) {
	$toBase = M_sql::Q();
	$toBase->insert('form_widget')->set('form_token', 'form_str')->bind($form_token, $form_str)->send();
	return $toBase->pdo->lastInsertId();
}
function read($from_token) {
	$fromBase = M_sql::Q();
	$fromBase->select('form_str')->from('form_widget')->where('form_token')->bind($from_token);
	$fromBase = $fromBase->send();
	return $fromBase->fetchAll()[0]['form_str'];
}
function readUnit($form_token) {
	echo 'Вы успешно получили из базы данных ';
	var_dump(read($form_token));
}
function writeUnit($form_token, $form_str) {
	echo 'Вы успешно записали строку номер ' . write($form_token, $form_str);
}
if ($form_token !== false) {
	if ($form_str !== false) {
		writeUnit($form_token, $form_str);
	} else {
		print_r(read($form_token));
	}
}