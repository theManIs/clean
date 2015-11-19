function getIP () 
{
 $check = array(
   'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_FORWARDED_FOR',
   'HTTP_FORWARDED', 'HTTP_VIA', 'HTTP_X_COMING_FROM', 'HTTP_COMING_FROM',
   'HTTP_CLIENT_IP'
   );

 foreach ( $check as $c ) {
  if ( ip_valid ( $_SERVER [ $c ] ) ) {
   return ip_first ( $_SERVER [ $c ] );
  }
 }

 return $_SERVER['REMOTE_ADDR'];
}

function ip_first ( $ips ) 
{
  if ( ( $pos = strpos ( $ips, ',' ) ) != false ) {
   return substr ( $ips, 0, $pos );
  } 
  else {
   return $ips;
  }
}