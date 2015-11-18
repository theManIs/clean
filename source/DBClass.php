<?php
class DBClass {
	private $itself;
	private $cols;
	private $table;
	
	private function __construct($tName) {		
		self::flood($tName);
	}
	private function ask($tName) {
		$structure = M_sql::Q();
		$structure->select('*')->from($tName)->limit(1);
		return $structure->send()->fetchAll();
	}
	private function flood($tName) {
		$this->table = $tName;
		$cols = self::ask($tName);
		$keys = array();
		foreach ($cols[0] as $k => $v) {
			$keys []= $k;
			$this->$k = '';
		}		
		$this->cols = $keys;
	}
	public static function get($tName) {
		$itself = new DBClass($tName);
		$itself->itself = $itself;
		return $itself;
	}
	public function rowWrite($row) {
		$row = self::rowFill($row);		
		$cortage = M_sql::Q();
		$command = '$cortage' . self::constructor($row);
		eval($command);
		return $cortage->pdo->lastInsertId();
	}
	private function rowFill($row) {
		foreach ($row as $key => $val) {
			$this->$key = !empty($this->$key) ? $this->$key : $val;
		}
		return self::lUpdate($row);
	}
	private function constructor($row) {		
		$sql_1 = '->insert($this->table)->set(' . self::csHelper($row, 'key');
		$sql_2 = ')->bind(' . self::csHelper($row, 'ths');
		$sql_3 = ')->send();';
		return $sql_1 . $sql_2 . $sql_3;
	}
	private function csHelper($row, $meta, $line = '') {
		foreach ($row as $key =>$val) {
			if ('ths' === $meta) 
				$line .= '$this->' . $key . ', ';
			else
				$line .= '\'' . $$meta . '\', ';
		}
		return substr($line, 0, strlen($line)-2);
	}
	private function lUpdate($row) {
		if (key_exists('last_update', $row))
			$this->last_update = getHour()->format('Y-m-d H:i:s');
		else {
			if (in_array('last_update', $this->cols, true)) {
				$row['last_update'] = '';
				$this->last_update = getHour()->format('Y-m-d H:i:s');
			}
		}		
		return $row;
	}
	public function showCols() {
		for ($i = 0; $i < count($this->cols); $i++) {
			echo $this->cols[$i] . '<br>';
		}
	}
	public function collation($row) {
		if (is_array($row)) {
			for ($i = 0; $i < count($this->cols); $i++) {
				$skip = false;
				for ($ii = 1; $ii < func_num_args(); $ii++) 
					if (func_get_arg($ii) === $this->cols[$i])
						$skip = true;
				if ($skip) continue;
				if (!key_exists($this->cols[$i], $row))
					return false;
			}
			foreach ($row as $key => $val) {
				if (!in_array($key, $this->cols))
					return false;
			}
			return true;
		} else
			return false;
	}
}