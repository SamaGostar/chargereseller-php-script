<?php
$config = array(
	'title' => 'فروشگاه شارژ',
	'description' => 'شارژ آسان تلفن همراه',
	'keywords' => 'شارژ آسان تلفن همراه,شارژ موبایل, فروش شارژ,شارژ ایرانسل,شارژ همراه اول, رایتل,تالیا,کارت شارژ,شارژ مستقیم',
	'webserviceID' => 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
	'defaultOperator' => 'MTN',
	'defaultChargeKind' => 'PIN'
);

$slashPos = strrpos($_SERVER['SCRIPT_NAME'], '/');
$root = 'http://' . $_SERVER['SERVER_NAME'] . substr($_SERVER['SCRIPT_NAME'], 0, $slashPos);