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
	
	public function what()
	{
		for($i = 1, $c = func_num_args(); $i < $c; $i++) {
			$v = func_get_arg($i);
			if (!empty($v)) {
				if (func_get_arg(0) === 's' && is_string($v) && trim($v) != false) {
					return true;
				} elseif (func_get_arg(0) === 'a' && is_array($v) && count($v) !== 0) {
					return true;
				}
			}
		}
		return false;
	}
	
	public static function show($subject) {
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
	}
	
}

?>