<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';
$_POST['form_token'] = '25';
$_POST['send'] = '{"title":["callkeeperTitleForm","Отправить сообщение"],"notice":["callkeeperSecondMessage","Оставьте ваши контактные данные, и мы свяжемся с вами в ближайшее время"],"question":["youQuestion","Введите ваш вопрос"],"send":["youSend","Отправить"],"close":["youClose","Закрыть"],"push":["youPush","Оставить данные"],"tComplete":["titleForComplete","Сообщение"],"mComplete":["callMesBody","Вы успешно отправили свои контактные данные"],"fields":[["inputFieldId0","Новое поле"]],"selects":[["Название","Поле 1","Поле 2","Поле 3"]],"color":"cloud"}';
	
function write($form_token, $form_str) {
	$std = unpacked($form_str, $form_token);
	$structure = structure('form_widget');
	if ($structure->what('a', $structure->attempt('form_token', $form_token)))
		return uBase($std, $structure);
	else
		return wBase($form_token, $std);
}
function unpacked($form_str, $form_token) {
	$std = json_decode($form_str);
	$std = checkStd($std);
	$std->fields = json_encode($std->fields);
	$std->selects = json_encode($std->selects);
	$std->form_token = $form_token;
	return $std;
}
function checkStd($std) {
	$package = ['title', 'notice', 'question', 'send', 'close',
		'push', 'tComplete', 'mComplete', 'fields', 'selects', 'color'];
	for ($i = 0; $i < count($package); $i++) {
		$std->$package[$i] = isset($std->$package[$i]) ? $std->$package[$i] : false;
	}
	return $std;
}
function uBase($std, $structure) {
	$cut = prepareToSend($std);
	if ($structure->collation($cut, 'id', 'form_on', 'last_update'))
		return $structure->condition('form_token')->condVal($cut['form_token'])->rowUpdate($cut);
}
function prepareToSend($std) {
	$cut['title'] = $std->title[1];
	$cut['notice'] = $std->notice[1];
	$cut['question'] = $std->question[1];
	$cut['send'] = $std->send[1];
	$cut['close'] = $std->close[1];
	$cut['push'] = $std->push[1];
	$cut['t_complete'] = $std->tComplete[1];
	$cut['m_complete'] = $std->mComplete[1];
	$cut['fields'] = $std->fields;
	$cut['selects'] = $std->selects;
	$cut['color'] = $std->color;
	$cut['form_token'] = $std->form_token;
	return $cut;
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
	return $fromBase->fetchAll()[0];
}
function structure($tName) {
	return DBClass::get($tName);
}
function root() {
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