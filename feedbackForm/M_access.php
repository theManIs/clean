<?php
//define('HOST', 'localhost');
//define('DB', 'test');
//define('USER', 'root');
//define('PASSWORD', 'start');

class M_access
{
	private static $inst = NULL;
	private function __construct() 
	{
		try	{
			$pdo = new PDO
			('mysql:host=' . HOST . ';dbname=' . DB . ';charset=utf8', USER, PASSWORD);
			$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$pdo->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_NATURAL);
			$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
			$this->pdo = $pdo; 
		} catch(PDOException $e) {
			exit($e->getMessage().'<br>'.$e->getTraceAsString());
		}
	}
	public static function getPDO()
	{
		if (self::$inst === NULL)
			self::$inst = new M_access();
		return self::$inst->pdo;
	}
}
?>