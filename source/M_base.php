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
	public function show($subject) {
		function agenShow($subject) {
			foreach ($subject as $k => $v) {
			if (is_array($v) || is_object($v)) {
					echo "$k: <br>";
					agenShow($v);
				} else
					printf("%s => %s <br>", $k, $v);
			}		
		};
		if (is_array($subject) || is_object($subject)) {
			agenShow($subject);
		}
		if (is_string($subject) || is_numeric($subject)) 
			echo $subject;
	}	
}

?>