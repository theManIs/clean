<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';
//$_POST['request'] = '{"fields":[["Ваше имя","sfg","personName",""],["Мобильный телефон","sfg","phoneNumber",""],["Электронная почта","sfg","mailAdress",""],["Новое поле","sfg","inputFieldId0",""]],"selects":[["Название","Поле 2",""],["Название","Поле 1",""],["Название","Поле 2",""]],"textarea":[["sfggs","youQuestion",""]],"token":"29","ip":"::1","utm":"current%3A%3A%3Afalse%5E%23%5E%23current_add%3A%3A%3Afalse%5E%23%5E%23first%3A%3A%3Afalse%5E%23%5E%23first_add%3A%3A%3Afalse%5E%23%5E%23session%3A%3A%3Afalse%5E%23%5E%23udata%3A%3A%3Afalse%5E%23%5E%23promo%3A%3A%3Afalse"}';

function write($msg) {
	$m = parseMessage($msg);
	$composite = structure('message_in');
	if ($composite->collation($m, 'id', 'last_update'))
		echo $composite->rowWrite($m);
}
function parseMessage($msg) {
	$mJson = json_decode($msg);
	$cut['person'] = requisition($mJson->fields, 'personName');
	$cut['phone'] = requisition($mJson->fields, 'phoneNumber');
	$cut['mail'] = requisition($mJson->fields, 'mailAdress');
	$cut['selects'] = keyVal($mJson->selects);
	$cut['fields'] = keyVal($mJson->fields);
	$cut['textarea'] = $mJson->textarea;
	$cut['token'] = $mJson->token;
	$cut['utm'] = $mJson->utm;
	$cut['ip'] = $mJson->ip;
	return $cut;
}
function keyVal($components) {
	for ($i = 0, $f = '', $c = $components; $i < count($c); $i++) {
		if ('empty' === $c[$i])
			continue;
		$f .= $c[$i][0] . ':';
		$f .= $c[$i][1] . ';';
	}
	return $f;
}
function requisition(&$arr, $mark) {
	for ($i = 0; $i < count($arr); $i++) {
		if ($mark === $arr[$i][2]) {
			$ok = $arr[$i][1];
			$arr[$i] = 'empty';
			return $ok;
		}
	}
}
function entry() {
	$suite = gtVars();
	if (!empty($suite['msg']))
		write($suite['msg']);
}
function structure($tName) {
	return DBClass::get($tName);
}
function gtVars() {
	$massive['msg'] = isset($_POST['request']) ?  $_POST['request'] : false;
	return $massive;
}
entry();