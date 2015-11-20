<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';
//$_POST['request'] = '{"fields":[[["Ваше имя"],[""],["#personName"]],[["Мобильный телефон"],[""],["#phoneNumber"]],[["Электронная почта"],[""],["#mailAdress"]],[["Новое поле"],[""],["#inputFieldId0"]]],"selects":[[["Название"],["Название"]],[["Название"],["Название"]],[["Название"],["Название"]]],"textarea":"","token":"28","ip":"::1","utm":"current:::someValueHere ck_sbjs_current^#^#current_add:::someValueHere ck_sbjs_current_add^#^#first:::someValueHere ck_sbjs_first^#^#first_add:::someValueHere ck_sbjs_first_add^#^#session:::someValueHere ck_sbjs_session^#^#udata:::someValueHere ck_sbjs_udata^#^#promo:::someValueHere ck_sbjs_promo"}';

function write($msg) {
	$m = parseMessage($msg);
	$composite = structure('message_in');
	if ($composite->collation($m, 'id', 'last_update'))
		echo $composite->rowWrite($m);
}
function parseMessage($msg) {
	$mJson = json_decode($msg);
	$cut['person'] = requisition($mJson->fields, '#personName');
	$cut['phone'] = requisition($mJson->fields, '#phoneNumber');
	$cut['mail'] = requisition($mJson->fields, '#mailAdress');
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
		$f .= $c[$i][0][0] . ':';
		$f .= $c[$i][1][0] . ';';
	}
	return $f;
}
function requisition(&$arr, $mark) {
	for ($i = 0; $i < count($arr); $i++) {
		if ($mark === $arr[$i][2][0]) {
			$ok = $arr[$i][1][0];
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