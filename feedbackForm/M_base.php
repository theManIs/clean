<?php
class M_base
{
	public function getVars($box)
	{ 
		foreach($box as $k => $v) { 
			$v = htmlentities($v, ENT_QUOTES | ENT_DISALLOWED, 'UTF-8');
			$this->$k = $v;
		}
	}	
	public function initialize()
	{ 
		for ($i = 0, $c = func_num_args(); $i < $c; $i++) {
			$arg = func_get_arg($i);
			if(!isset($this->$arg)) $this->$arg = null;
		}
	}
	private function recurs($v) {
		foreach ($v as $key => $val) {
			if (is_array($val)) {
				if (empty($val))
					return false;
				else
				 return recurs($val);
			}
			if (is_string($val) && trim($val) !== '')
				return true;
			if (is_numeric($val) !== false)
				return true;
			else
				return false;
		}
	}
	public function what()
	{
		for($i = 1, $c = func_num_args(); $i < $c; $i++) {
			$v = func_get_arg($i);
			if (!empty($v)) {
				if (func_get_arg(0) === 's' && is_string($v) && trim($v) != false)
					return true;
				elseif (func_get_arg(0) === 'a' && is_array($v) && count($v) !== 0)
					return self::recurs($v);
				elseif (func_get_arg(0) === 'n' && is_numeric($v))
					return true;
				elseif (func_get_arg(0) === 'f' && is_float($v))
					return true;
				elseif (func_get_arg(0) === 'i' && is_integer($v))
					return true;
			}
		}
		return false;
	}
	private function agenShow($subject) {
		foreach ($subject as $k => $v) {
			if (is_array($v)) {
				echo "$k: <br>";
				self::agenShow($v);
			} elseif (is_object($v)) {
				echo var_dump($v);
			} else
				printf("%s => %s <br>", $k, $v);
		}	
	}
	public function show($subject) {
		if (is_array($subject) || is_object($subject)) {
			self::agenShow($subject);
		}
		if (is_string($subject) || is_numeric($subject)) 
			echo $subject;
		if (is_bool($subject))
			var_dump($subject);
		echo '<br>';
	}
	public function iterControl($iter, $arg) {
		static $status = 0;
		if ($status === $iter) {
			self::show($arg); exit;
		}
		$status++;
	}
}
function B() {
	return new M_base();
}
function V($v) {
	var_dump($v);
}