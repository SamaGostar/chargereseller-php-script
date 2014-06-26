<?php include 'config.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
	<meta name="description" content="<?php echo $config['description']; ?>" />
	<meta name="keywords" content="<?php echo $config['keywords']; ?>" />
	<link type="image/x-icon" rel="icon" href="css/favicon.ico"/>
	<link rel="stylesheet" type="text/css" href="css/jquery.qtip.css" />
	<link rel="stylesheet" type="text/css" href="css/ion.rangeSlider.css" />
	<link rel="stylesheet" type="text/css" href="css/ion.rangeSlider.skinNice.css" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<link rel="stylesheet" type="text/css" href="css/help.css" />
	<title><?php echo $config['title']; ?></title>
</head>
<body>
	<div class="bgs">
		<div class="menu">
			<span class="support">پشتیبانی</span>
			<span class="help">راهنما</span>
		</div>
		<div class="container">
			<div class="operators">
				<div data-type="MTN" class="operator MTN"><i></i></div>
				<div data-type="MCI" class="operator MCI"><i></i></div>
				<div data-type="RTL" class="operator RTL"><i></i></div>
				<div data-type="TAL" class="operator TAL"><i></i></div>
			</div>
			<div id="left">
				<div id="logo" class="ChangeType"></div>
				<div id="desc"><h1></h1><p></p></div>
			</div>
			<div id="content">
				<form accept-charset="utf-8" method="post" id="chargeform" action="http://www.chargereseller.com/services/EasyCharge/">
					<fieldset>
						<div class="input text required account">
							<input id="dataAccountTemp" class="input-large" type="text" value="" maxlength="11" name="data[AccountTemp]">
						</div>
						<div id="AmountTemp" class="input text required amount">
							<input type="text" id="dataAmountTemp" name="data[AmountTemp]" title="مبلغ به تومان" class="eng">
						</div>
						<div id="AmountTopUpMTNTemp" class="input text required amount">
							<input type="text" id="dataAmountTopUpMTNTemp" name="data[AmountMTNTemp]" title="مبلغ به تومان" class="eng">
						</div>
						<div class="input text">
							<input id="EmailInput" class="input-large" type="email" maxlength="50" value="" title="آدرس ایمیل را به شکل صحیح بنویسید!" rel="tooltip" placeholder="you@domain.com" name="data[Email]">
						</div>
						<div class="Magiccharge">
							<label for="magiccharge">شارژ شگفت انگیز برایم ثبت شود : </label>
							<input type="checkbox" value="1" id="magiccharge" name="data[Magic]">
						</div>
						<div class="banks">
							<p>بانک صادر کننده کارت شما :<i></i></p>
							<ul>
								<li id="Saman" class="bank-Saman"><i>سامان</i></li>
								<li id="EnBank" class="bank-EnBank"><i>اقتصاد نوین</i></li>
								<li id="Mellat" class="bank-Mellat"><i>ملت</i></li>
								<li id="AgriBank" class="bank-AgriBank"><i>کشاورزی</i></li>
								<li id="Sina" class="bank-Sina"><i>سینا</i></li>
								<li id="Parsian" class="bank-Parsian"><i>پارسيان</i></li>
								<li id="SanatMadan" class="bank-SanatMadan"><i>صنعت و معدن</i></li>
								<li id="Pasargad" class="bank-Pasargad"><i>پاسارگاد</i></li>
								<li id="Melli" class="bank-Melli"><i>ملی</i></li>
								<li id="Saderat" class="bank-Saderat"><i>صادرات</i></li>
								<li id="PostBank" class="bank-PostBank"><i>پست بانک</i></li>
								<li id="Tejarat" class="bank-Tejarat"><i>تجارت</i></li>
								<li id="ToseTavon" class="bank-ToseTavon"><i>توسعه و تعاون</i></li>
								<li id="Ansar" class="bank-Ansar"><i>انصار</i></li>
								<li id="Refah" class="bank-Refah"><i>رفاه</i></li>
								<li id="Sepah" class="bank-Sepah"><i>سپه</i></li>
								<li id="Sarmayeh" class="bank-Sarmayeh"><i>سرمایه</i></li>
								<li id="Ayandeh" class="bank-Ayandeh"><i>آینده</i></li>
								<li id="KarAfarin" class="bank-KarAfarin"><i>کار آفرین</i></li>
								<li id="Maskan" class="bank-Maskan"><i>مسکن</i></li>
								<li id="Mehr" class="bank-Mehr"><i>مهر</i></li>
								<li id="Dey" class="bank-Dey"><i>دی</i></li>
								<li id="CityBank" class="bank-CityBank"><i>شهر</i></li>
								<li id="Zarinpal" class="bank-Zarinpal"><i>زرین پال</i></li>
							</ul>
						</div>
						<input type="hidden" id="dataWebserviceId" name="data[WebserviceId]">
						<input type="hidden" id="dataRedirectUrl" name="data[RedirectUrl]" value="<?php echo $root; ?>">
						<input type="hidden" id="dataChargeKind" name="data[ChargeKind]">
						<input type="hidden" id="dataAccount" name="data[Account]">
						<input type="hidden" id="dataAmount" name="data[Amount]">
						<input type="hidden" id="dataType" name="data[Type]">
						<input type="hidden" id="dataIssuer" name="data[Issuer]">
						<input type="hidden" id="dataRedirectToPage" name="data[RedirectToPage]" value="true">
					</fieldset>
					<div class="submit">
						<input type="submit" value="پــرداخــت">
					</div>
				</form>
			</div>
			<div class="clear"></div>
		</div>
	</div>
	<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.qtip.min.js"></script>
	<script type="text/javascript" src="js/ion.rangeSlider.min.js"></script>
	<script type="text/javascript" src="js/charge.js"></script>
	<script type="text/javascript">
		var WebserviceID = <?php echo '"' . $config['webserviceID'] . '"'; ?>;
		var DefaultOperator = <?php echo '"' . $config['defaultOperator'] . '"'; ?>;
		var DefaultChargeKind = <?php echo '"' . $config['defaultChargeKind'] . '"'; ?>;
	</script>
</body>
</html>