<?php
	include 'config.php'; 
	function check_file_existence($url) {
		$url=getimagesize($url);
		if (!is_array($url)) {
			return false;
		} else {
			 return true;
		}
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="description" content="اپلیکیشن شارژ و پرداخت قبوض نسخه اندروید" />
		<meta name="keywords" content="اپلیکیشن,اندروید,نرم افزار موبایل,شارژ,پرداخت قبوض,اپلیکیشن شارژ و پرداخت قبوض,اپلیکیشن اندروید شارژ,اپلیکیشن اندروید پرداخت قبوض" />
		<link href="css/favicon.ico" type="image/x-icon" rel="icon" />
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/jquery.qtip.css" />
		<title><?php echo $config['title'] . ' - دانلود اپلیکیشن شارژ و پرداخت قبوض'; ?></title>
	</head>
<body>
	<div class="bgs application">
		<div class="menu">
			<span class="support"><a href="/">صفحه اصلی</a></span>
		</div>
		<div class="container">
			<div id="left">
				<div id="logo-container">
					<div id="logo">
						<img class="application" src="/img/Mobile-Charge-Application-Logo.png" alt="اپلیکیشن اندروید خرید شارژ و پرداخت قبض">
						<span><?php echo substr($config['title'], 0, 20); ?></span>
						<?php if (check_file_existence('http://chargereseller.com/img/mobile_app_logo/' . $config['webserviceID'] . '.png')) { echo '<img class="application-logo" src="http://chargereseller.com/img/mobile_app_logo/' . $config['webserviceID'] . '.png">';} ?>
					</div>
				</div>
			</div>
			<div id="content">
				<ul>
					<p>با دانلود نرم افزار موبایل ویژه گوشی های با سیستم عامل اندروید شما می توانید فرایند خرید انواع شارژ و پرداخت قبوض مختلف خود را به سرعت و با امنیت بالا انجام دهید.</p>
					<br>
					<b>برخی امکانات و قابلیت های این اپلیکیشن:</b>
					<li>خرید آسان کارت شارژ های ایرانسل، همراه اول، تالیا و رایتل</li>
					<li>وارد کردن رمز شارژ فقط با یک کلیک</li>
					<li>امکان شارژ اتوماتیک (تاپ آپ)</li>
					<li>پرداخت قبوض آب، برق، گاز، تلفن ثابت، تلفن همراه، عوارض شهرداری</li>
					<li>مجهز به سیستم بارکدخوان جهت ورود اطلاعات سریع قبض</li>
					<li>ذخیره اطلاعات شارژهای خریداری شده و قبض های پرداخت شده</li>
					<li>دریافت اطلاعات تماس، یکبار برای همیشه</li>
					<li>پرداخت وجه از طریق درگاه های بانکی مختلف</li>
					<li>امکان موجودی گیری از سیم کارت با یک کلیک</li>
				</ul>
				<div class="application-deactive">اپلیکیشن موبایل برای این فروشگاه فعال نشده است.</div>
				<div class="submit">
					<input type="submit" value="دانلـــود اپلیکیشن">
				</div>
				<div class="qr">
					<div class="description">
						<p>نصب اپلیکیشن با کد QR</p>
						برای نصب این برنامه، می‌توانید کد مقابل را با برنامه <a href="http://cafebazaar.ir/app/com.google.zxing.client.android/?l=fa" target="blank">Barcode Scanner</a> و به وسیله‌ی دوربین موبایل خود اسکن کنید.
					</div>
					<div class="qrcode"></div>
					<div class="clear"></div>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
	<div id="payment-process"></div>
	<div class="cover"></div>
	<div class="connecting"><p></p></div>
	<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.qtip.min.js"></script>
	<script type="text/javascript" src="js/jquery.qrcode-0.11.0.min.js"></script>
	<script type="text/javascript">
		var downloadURL = "";
		function dialogue(content, title) {
			$('<div />').qtip({
				content: {
					text: content,
					title: {
						text: title,
						button: true
					}
				},
				position: {
					my: 'center', at: 'center',
					target: $(window)
				},
				show: {
					ready: true,
					modal: {
						on: true,
						blur: true
					}
				},
				hide: true,
				style: 'qtip-bootstrap qtip-shadow ui-tooltip-rounded helpModalClass',
				events: {
					render: function(event, api) {
						$('button', api.elements.content).click(function(e) {
							api.hide(e);
						});
					},
					hide: function(event, api) { api.destroy(); }
				}
			});
		}
		jQuery(document).ready(function ($) {
			$.ajax({
				type: 'POST',
				url: 'http://chargereseller.com/webservices/downloadApplication/android',
				data: {"webserviceID":<?php echo '"' . $config['webserviceID'] . '"'; ?>},
				async: false,
				contentType: "application/json",
				dataType: 'jsonp',
				crossDomain: true,
				success: function(data) {
					if (data.result.Status == "Success") {
						downloadURL = data.result.DownloadURL;
						$('div.qrcode').qrcode({
							"size": 90,
							"color": "#3a3",
							"text": downloadURL
						});
					} else {
						$('.application-deactive').show();
						$('.submit, .qr').hide();
					}
					$('.cover').fadeOut();
					$('.connecting').fadeOut();
				},
				error: function(e) {
					dialogue("در حال حاضر امکان برقرار ارتباط با بانک وجود ندارد. <br>لطفاً بعداً مراجعه نمایید.", "خطا");
					// console.log(e);
				}
			});
		});
		$('div.submit input').click(function(e) {
			window.location.assign(downloadURL);
		});
	</script>
</body>
</html>