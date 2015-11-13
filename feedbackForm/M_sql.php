<?php 
class M_sql extends M_base
{
	public $pdo;
	public $params = array();
	public $sign = array();
	public $marker = null;
	
	public function __construct($pdo)
	{
		try	{
			$this->pdo = $pdo;
		} catch(PDOException $e) {
			exit($e->getMessage().' '.$e->getTraceAsString());
		}
	}
	
	private function taskBase($sql)
	{
		try {
			$ask = $this->pdo->prepare($sql);
			if (parent::what('a', $this->params)) {
				for ($i = 0, $c = count($this->params); $i < $c; $i++) {
					$ask->bindValue(($i + 1), $this->params[$i]);
				}
			}
			$ask->execute();
		} catch(PDOException $e) {
			exit($e->getMessage().' '.$e->getTraceAsString());
		}
		return $ask;
	}
	
	public function from($from)
	{
		$this->from = ' FROM ' . $from;
		return $this->marker;
	}
	
	public function select($select)
	{
		$this->select = 'SELECT ' . $select;
		return $this->marker;
	}
	
	public function where()
	{
		$this->where = ' WHERE ';
		for($i = 0, $c = func_num_args(); $i < $c; $i++) {
			$this->sign[$i] = !empty($this->sign[$i]) ? $this->sign[$i] : '=';
			$this->where .= func_get_arg($i) . ' ' . $this->sign[$i] . ' ?';
			if (($i + 1) < $c) $this->where .= ' AND ';
		}
		return $this->marker;
	}
	
	public function bind()
	{
		for($i = 0, $c = func_num_args(); $i < $c; $i++) {
			$this->params[] = func_get_arg($i);
		}
		return $this->marker;
	}
	
	public function sign()
	{
		for($i = 0, $c = func_num_args(); $i < $c; $i++) {
			$this->sign = func_get_args();
		}
		if (isset($this->where)) {
			$i = 0;
			$pos = -1;
			while (isset($this->sign[$i])) {
				$pos = strpos($this->where, '=', ($pos + 1));
				$this->where = substr_replace($this->where, $this->sign[$i], $pos, 1);
				$i++;
			}
		}
		return $this->marker;
	}
	
	public function update($update) {
		$this->update = 'UPDATE ' . $update;
		return $this->marker;
	}
	
	public function set() {
		$this->set = ' SET ';
		for($i = 0, $c = func_num_args(); $i < $c; $i++) {
			$this->set .= func_get_arg($i) . ' = ?';
			if (($i + 1) < $c) $this->set .= ', ';
		}
		return $this->marker;
	}
	
	public static function getSelf($pdo)
	{
		$itSelf = new M_sql($pdo);
		$itSelf->marker = $itSelf;
		return $itSelf->marker;
	}
	
	public function insert($insert) {
		$this->insert = 'INSERT ' . $insert;
		return $this->marker;
	}
	
	public function delete($delete)
	{
		$this->delete = 'DELETE FROM ' . $delete;
		return $this->marker;
	}
	
	public function limit($limit)
	{
		$this->limit = ' LIMIT ' . $limit;
		return $this->marker;
	}
	
	public function order($order)
	{
		$this->order = ' ORDER BY ' . $order;
		return $this->marker;
	}
	
	public static function Q()
	{
		return M_sql::getSelf(M_access::getPDO());
	}
	
	public function send()
	{
		$sql = '';
		$sql .= isset($this->update) ? $this->update : '';
		$sql .= isset($this->insert) ? $this->insert : '';
		$sql .= isset($this->delete) ? $this->delete : '';
		$sql .= isset($this->select) ? $this->select : '';
		$sql .= isset($this->set) ? $this->set : '';
		$sql .= isset($this->from) ? $this->from : '';
		$sql .= isset($this->where) ? $this->where : '';
		$sql .= isset($this->order) ? $this->order : '';
		$sql .= isset($this->limit) ? $this->limit : '';
		$sql .= ';';
		return self::taskBase($sql);
	}
}

?>