<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';
//$_POST['form_token'] = '16';
//$_POST['send'] = '{"title":["callkeeperTitleForm","Отправить сообщение"],"notice":["callkeeperSecondMessage","Оставьте ваши контактные данные, и мы свяжемся с вами в ближайшее время"],"question":["youQuestion","Введите ваш вопрос"],"send":["youSend","Отправить"],"close":["youClose","Закрыть"],"push":["youPush","Оставить данные"],"tComplete":["titleForComplete","Сообщение"],"mComplete":["callMesBody","Вы успешно отправили свои контактные данные"],"fields":[["inputFieldId0","Новое поле"]],"selects":[["Название","Поле 1","Поле 2","Поле 3"]],"color":"cloud"}';
	
function write($form_token, $form_str) {
	$std = json_decode($form_str);
	$std = checkStd($std);
	$std->fields = json_encode($std->fields);
	$std->selects = json_encode($std->selects);
	//var_dump($std); exit;
	//echo 'Записана строка номер ' . 
	return wBase($form_token, $std);
}
function checkStd($std) {
	$package = ['title', 'notice', 'question', 'send', 'close',
		'push', 'tComplete', 'mComplete', 'fields', 'selects', 'color'];
	for ($i = 0; $i < count($package); $i++) {
		$std->$package[$i] = isset($std->$package[$i]) ? $std->$package[$i] : false;
	}
	return $std;
}
function wBase($form_token, $std) {
	$toBase = M_sql::Q();
	$nowTime = getHour()->format('Y-m-d H:i:s');
	$toBase->insert('form_widget')->set('form_token', 'title', 'notice', 'question', 'send', 'close',
		'push', 't_complete', 'm_complete', 'fields', 'selects', 'color', 'last_update');
	$toBase->bind($form_token, $std->title[1], $std->notice[1], $std->question[1], $std->send[1], 
		$std->close[1],	$std->push[1], $std->tComplete[1], $std->mComplete[1], 
		$std->fields, $std->selects, $std->color, $nowTime)->send();
	return $toBase->pdo->lastInsertId();
}
function read($from_token) {
	$fromBase = M_sql::Q();
	$fromBase->select('*')->from('form_widget')->where('form_token')->bind($from_token);
	$fromBase = $fromBase->send();
	//print_r($fromBase->fetchAll()[0]);
	return $fromBase->fetchAll()[0];
}
function root() {
	//var_dump(func_get_arg(0));
	//var_dump(func_get_arg(1)); exit;
	if (func_get_arg(0) !== false) {
		if (func_get_arg(1) !== false) {
			return write(func_get_arg(0), func_get_arg(1));
		} else {
			return read(func_get_arg(0));
		}
	}
}
function getParse() {
	$form_token = isset($_POST['form_token']) ? $_POST['form_token'] : false;
	$form_token = isset($_GET['form_token']) ? $_GET['form_token'] : $form_token;
	$form_str = isset($_POST['send']) ? $_POST['send'] : false;
	return [$form_token, $form_str];
}
function control() {
	$parse = getParse();
	echo json_encode(root($parse[0], $parse[1]));
}
control();
//echo date('d-m-Y H:i:s');
//var_dump($hour->format('d-m-Y H:i:s'));
//echo getHour()->format('d-m-Y H:i:s');