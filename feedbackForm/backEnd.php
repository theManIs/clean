<?php
header('Access-Control-Allow-Origin: *');
include 'config.php';
//$_POST['request'] = '{"fields":[[["Ваше имя"],["Козьма"],["#personName"]],[["Мобильный телефон"],["0 000 000 00 00"],["#phoneNumber"]],[["Электронная почта"],["собака@почта.рус"],["#mailAdress"]],[["Новое поле"],["Никогда мне не звоните"],["#inputFieldId0"]]],"selects":[[["Название"],["Поле 1"]],[["Название"],["Поле 2"]],[["Название"],["Поле 3"]]],"textarea":"Угх!","token":26}';
//$_POST['form_token'] = '345345';


function write($msg) {
	$m = parseMessage($msg);
	//var_dump($m);
	$composite = structure('message_in');
	//$composite->showCols();
	//var_dump($composite->collation($m, 'id', 'last_update'));
	if ($composite->collation($m, 'id', 'last_update')) {
		//$composite->rowWrite($m);
		echo 'Успех! Вы записали строку номер: ' . $composite->rowWrite($m);		
		//var_dump($composite); 
		//print_r($tkn . '<br>Сообщение: ');
		//print_r(json_decode($msg));
		//return $script->pdo->lastInsertId();
	} else
		echo 'Ошибка года, Ваш массив фуфло!';
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
	$cut['utm'] = '';
	$cut['ip'] = '';
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
	$massive['tkn'] = isset($_POST['form_token']) ? $_POST['form_token'] : false;
	return $massive;
}
entry();