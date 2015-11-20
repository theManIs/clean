<?php
class DBClass extends M_base {
	private $itself;
	private $cols;
	private $table;
	private $word = 'empty';
	
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
	private function ifEmpty($row) {
		foreach ($row as $key => &$val) {
			if (!B()->what('s', $val)) {
				$this->itself->$key = $this->word;
			}
		}
		return $row;
	}
	private function inputData($row) {
		$row = self::rowFill($row);
		$row = self::ifEmpty($row);
		return '$cortage = M_sql::Q(); $command = $cortage' . self::constructor($row);
	}
	public function rowWrite($row) {	
		eval(self::inputData($row));
		return $cortage->pdo->lastInsertId();
	}
	public function rowUpdate($row) {
		eval(self::inputData($row));
		return $command->rowCount();
	}
	private function conUpdate($row) {
		$sql_1 = '->update($this->table)->set(' . self::csHelper($row, 'key');
		$sql_2 = ')->where($this->condition)->bind(' . self::csHelper($row, 'ths');
		$sql_3 = ', $this->condVal)->send();';
		return $sql_1 . $sql_2 . $sql_3;
	}
	public function condition($cond) {
		$this->condition = $cond;
		return $this->itself;
	}
	public function condVal($cond) {
		$this->condVal = $cond;
		return $this->itself;
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
				$this->last_update = getHour()->format('Y-m-d H:i:s');
				$row['last_update'] = $this->last_update;
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
	public function attempt($column, $value) {
		$attempt = M_sql::Q();
		$attempt->select('*')->from($this->table)->where($column)->bind($value);
		$retPar = $attempt->send()->fetchAll();
		if (isset($retPar[0]))
			return $retPar[0];
		else
			return false;
	}
}