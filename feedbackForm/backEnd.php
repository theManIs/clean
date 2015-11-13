<?php
include 'config.php';
//$_POST['request'] =  '"{"fields":[[["Новое поле"],[""]],[["Новое поле"],[""]],[["Новое поле"],[""]]],"selects":[[["Название"],["Название"]],[["adfa"],["adfa"]]],"textarea":"","token":"345345","write":"true"}";';
//$_POST['form_token'] = '345345';
$form_message = isset($_POST['request']) ?  $_POST['request'] : false;
$form_token = isset($_POST['form_token']) ? $_POST['form_token'] : false;

function writeUnit() {
	echo 'Вы успешно записали строку номер ' . write(func_get_arg(0), func_get_arg(1));
}
function write() {
	$script = M_sql::Q();
	$script->insert('message_in')->set('token', 'message');
	$script->bind(func_get_arg(1), func_get_arg(0))->send();
	return $script->pdo->lastInsertId();
}
if ($form_message !== false && $form_token !== false) {
	writeUnit($form_message, $form_token);
}