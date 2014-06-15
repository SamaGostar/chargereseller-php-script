<?php include 'config.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
	<meta name="description" content="<?php echo $config['description']; ?>" />
	<meta name="keywords" content="<?php echo $config['keywords']; ?>" />
	<link href="/css/favicon.ico" type="image/x-icon" rel="icon" />
	<link rel="stylesheet" type="text/css" href="/css/jquery.qtip.css" />
	<link rel="stylesheet" type="text/css" href="/css/ion.rangeSlider.css" />
	<link rel="stylesheet" type="text/css" href="/css/ion.rangeSlider.skinNice.css" />
	<link rel="stylesheet" type="text/css" href="/css/style.css" />
	<link rel="stylesheet" type="text/css" href="/css/help.css" />
	<title><?php echo $config['title']; ?></title>
</head>
<body>
	<div class="bgs">
		<div class="menu">
			<span class="support">پشتیبانی</span>
			<span class="help">راهنما</span>
		</div>
		<div class="container">
			<div class="top">
				<div id="logo" class="ChangeType"></div>
			</div>
			<div class="right">
				<div class="panel pink">
					<div class="panel-header">
						<div class="arrow left"></div>
						<p class="step number">1</p>
						<p class="step title">انتخاب اپراتور</p>
						<p class="step description">اپراتور سیم کارت خود را انتخاب نمایید.</p>
					</div>
					<div class="panel-body">
						<div class="operators">
							<div data-type="MTN" class="operator MTN"><i></i></div>
							<div data-type="MCI" class="operator MCI"><i></i></div>
							<div data-type="RTL" class="operator RTL"><i></i></div>
							<div data-type="TAL" class="operator TAL"><i></i></div>
						</div>
						<div id="desc"><h1></h1><p></p></div>
					</div>
				</div>
				<div id="money" class="panel green">
					<div class="panel-header">
						<div class="arrow left"></div>
						<p class="step number">3</p>
						<p class="step title">پرداخت وجه</p>
						<p class="step description">پس از انتخاب بانک صادرکننده کارت خود وجه را پرداخت نمایید.</p>
					</div>
					<div class="panel-body">
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
							<div class="submit">
								<input type="submit" value="پــرداخــت">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="center">
				<i class="timeline"></i>
				<i class="time-bullet pink"></i>
				<i class="time-bullet blue"></i>
				<i class="time-bullet green"></i>
			</div>
			<div class="left">
				<div id="info" class="panel blue">
					<div class="panel-header">
						<div class="arrow right"></div>
						<p class="step number">2</p>
						<p class="step title">ورود اطلاعات</p>
						<p class="step description">اطلاعات مربوط به خرید را وارد نمایید.</p>
					</div>
					<div class="panel-body">
						<form accept-charset="utf-8" method="post" id="chargeform" action="http://chargereseller.com/services/EasyCharge/">
							<fieldset>
								<div class="input text required account">
									<input id="dataAccountTemp" class="input-large" type="text" value="" maxlength="11" name="data[AccountTemp]">
								</div>
								<div id="AmountTemp" class="input required amount">
									<input type="text" id="dataAmountTemp" name="data[AmountTemp]" title="مبلغ به تومان" class="eng">
								</div>
								<div id="AmountTopUpMTNTemp" class="input required amount">
									<input type="text" id="dataAmountTopUpMTNTemp" name="data[AmountMTNTemp]" title="مبلغ به تومان" class="eng">
								</div>
								<div class="input text">
									<input id="EmailInput" class="input-large" type="email" maxlength="50" value="" title="آدرس ایمیل را به شکل صحیح بنویسید!" rel="tooltip" placeholder="you@domain.com" name="data[Email]">
								</div>
								<div class="Magiccharge">
									<label for="magiccharge">شارژ شگفت انگیز برایم ثبت شود : </label>
									<input type="checkbox" value="1" id="magiccharge" name="data[Magic]">
								</div>
								<input type="hidden" id="dataWebserviceId" name="data[WebserviceId]">
								<input type="hidden" id="dataRedirectUrl" value="<?php echo $root; ?>" name="data[RedirectUrl]">
								<input type="hidden" id="dataChargeKind" name="data[ChargeKind]">
								<input type="hidden" id="dataAccount" name="data[Account]">
								<input type="hidden" id="dataAmount" name="data[Amount]">
								<input type="hidden" id="dataType" name="data[Type]">
								<input type="hidden" id="dataIssuer" name="data[Issuer]">
								<input type="hidden" id="dataRedirectToPage" name="data[RedirectToPage]" value="true">
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="/js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="/js/jquery.qtip.min.js"></script>
	<script type="text/javascript" src="/js/ion.rangeSlider.min.js"></script>
	<script type="text/javascript" src="/js/charge.js"></script>
	<script type="text/javascript">
		var WebserviceID = <?php echo '"' . $config['webserviceID'] . '"'; ?>;
		var DefaultOperator = <?php echo '"' . $config['defaultOperator'] . '"'; ?>;
		var DefaultChargeKind = <?php echo '"' . $config['defaultChargeKind'] . '"'; ?>;
	</script>
</body>
</html>
