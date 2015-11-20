formWidget.utmMarks = function() {
	var ck_c,ck_c_1,ck_c_2,ck_c_3,ck_c_4,ck_c_5,ck_c_6,ck_c_7;
	ck_c_1=encodeURIComponent('current:::'+R.rCookie('ck_sbjs_current'));
	ck_c_2=encodeURIComponent('^#^#current_add:::'+R.rCookie('ck_sbjs_current_add'));
	ck_c_3=encodeURIComponent('^#^#first:::'+R.rCookie('ck_sbjs_first'));
	ck_c_4=encodeURIComponent('^#^#first_add:::'+R.rCookie('ck_sbjs_first_add'));
	ck_c_5=encodeURIComponent('^#^#session:::'+R.rCookie('ck_sbjs_session'));
	ck_c_6=encodeURIComponent('^#^#udata:::'+R.rCookie('ck_sbjs_udata'));
	ck_c_7=encodeURIComponent('^#^#promo:::'+R.rCookie('ck_sbjs_promo'));
	ck_c = ck_c_1+ck_c_2+ck_c_3+ck_c_4+ck_c_5+ck_c_6+ck_c_7;
	return ck_c;
}