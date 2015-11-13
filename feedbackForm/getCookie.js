function get_cookie(name) {
 var nameEQ = encode_data(name) + '=',
 ca = document.cookie.split(';');

 for (var i = 0; i < ca.length; i++) {
 var c = ca[i];
 while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
 if (c.indexOf(nameEQ) === 0) { return decode_data(c.substring(nameEQ.length, c.length)); }
 }
 return null;
