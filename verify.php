<?php include 'config.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
	<meta name="description" content="<?php echo $config['description']; ?>" />
	<meta name="keywords" content="<?php echo $config['keywords']; ?>" />
	<link href="css/favicon.ico" type="image/x-icon" rel="icon" />
	<link rel="stylesheet" type="text/css" href="css/jquery.qtip.css" />
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
			<?php
				$result = base64_decode(urldecode($_GET['data']));
				$result = json_decode($result, true);
				if ($result['Status'] == 100) {
					$type = '';
					if ($result['Type'] == 'MCI') {
						$type = 'همراه اول';
					} elseif ($result['Type'] == 'MTN') {
						$type = 'ایرانسل';
					} elseif ($result['Type'] == 'RTL') {
						$type = 'رایتل';
					} elseif ($result['Type'] == 'TAL') {
						$type = 'تالیا';
					}
					
					if (array_key_exists('Serial', $result)) {
						$registerPinCode = '';
						if (in_array($result['Type'], array('MCI', 'TAL'))) {
							$registerPinCode = '#رمزشارژ#*140*';
						} elseif (in_array($result['Type'], array('MTN', 'RTL'))) {
							$registerPinCode = '#رمزشارژ*141*';
						}
			?>
						<div id="left">
							<div class="success pin"></div>
							<div id="description"><p>اکنون با وارد کردن کد شارژ از طریق صفحه کلید گوشی، تلفن همراه خود را شارژ نمایید.</p></div>
						</div>
						<div id="content" style="margin: 50px auto!important;">
							<p>از خرید شما متشکریم.</p>
							<table>
								<tbody>
									<tr>
										<td>تاریخ</td>
										<td><?php echo $result['Date']; ?></td>
									</tr>
									<tr>
										<td>مبلغ کارت شارژ</td>
										<td><?php echo $result['Amount'] . ' تومان'; ?></td>
									</tr>
									<tr>
										<td>اپراتور کارت شارژ</td>
										<td><?php echo $type; ?></td>
									</tr>
									<tr>
										<td>رمز شارژ</td>
										<td><?php echo $result['Pin']; ?></td>
									</tr>
									<tr>
										<td>کد ورود شارژ</td>
										<td><?php echo $registerPinCode; ?></td>
									</tr>
									<tr>
										<td>سریال کارت شارژ</td>
										<td><?php echo $result['Serial']; ?></td>
									</tr>
									<tr>
										<td>کد پیگیری</td>
										<td><?php echo $result['RefId']; ?></td>
									</tr>
									<tr>
										<td>کد ثبت</td>
										<td><?php echo $result['TranId']; ?></td>
									</tr>
								</tbody>
							</table>
							<a class="mainpage" href="<?php echo $root; ?>">صفحه اصلی فروشگاه</a>
						</div>
			<?php
					} else {
			?>
						<div id="left">
							<div class="success topup"></div>
							<div id="description"><p>به زودی خط شما به صورت اتوماتیک شارژ می شود.</p></div>
						</div>
						<div id="content" style="margin: 50px auto!important;">
							<p>از خرید شما متشکریم.</p>
							<table>
								<tbody>
									<tr>
										<td>تاریخ</td>
										<td><?php echo $result['Date']; ?></td>
									</tr>
									<tr>
										<td>مبلغ شارژ</td>
										<td><?php echo $result['Amount'] . ' تومان'; ?></td>
									</tr>
									<tr>
										<td>اپراتور شارژ</td>
										<td><?php echo $type; ?></td>
									</tr>
									<tr>
										<td>شماره تلفن همراه</td>
										<td><?php echo $result['Cell']; ?></td>
									</tr>
									<tr>
										<td>کد پیگیری</td>
										<td><?php echo $result['RefId']; ?></td>
									</tr>
									<tr>
										<td>کد ثبت</td>
										<td><?php echo $result['TranId']; ?></td>
									</tr>
								</tbody>
							</table>
							<a class="mainpage" href="<?php echo $root; ?>">صفحه اصلی فروشگاه</a>
						</div>
			<?php	
					}
				} else {
			?>
					<div class="failed">
						<div class="logo"></div>
						<div class="explanation">
							<h1>تراکنش ناموفق بود.</h1>
							<?php
								if ($result['Status'] == -11) {
									echo '<h2>خطا در اطلاعات دریافتی</h2>';
								} elseif ($result['Status'] == -22) {
									echo '<h2>درگاه بانکی نامعتبر</h2>';
								} elseif ($result['Status'] == -33) {
									echo '<h2>لغو درخواست توسط مشتری</h2>';
								} elseif ($result['Status'] == -44) {
									echo '<h2>شماره درخواست نامعتبر</h2>';
								} elseif ($result['Status'] == -55) {
									echo '<h2>تراکنش تائید نشد</h2>';
								}
							?>
							<p>چنانچه وجه از حساب شما کسر شده است، طی 72 ساعت کاری آینده از طرف بانک وجه به حساب شما باز می گردد.</p>
						</div>
						<a class="mainpage" href="<?php echo $root; ?>">صفحه اصلی فروشگاه</a>
						<div class="clear"></div>
					</div>	
			<?php
				}
			?>
			<div class="clear"></div>
		</div>
	</div>
	<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.qtip.min.js"></script>
	<script type="text/javascript" src="js/charge.js"></script>
	<script type="text/javascript">
		var WebserviceID = <?php echo '"' . $config['webserviceID'] . '"'; ?>;
		var DefaultOperator = <?php echo '"' . $config['defaultOperator'] . '"'; ?>;
		var DefaultChargeKind = <?php echo '"' . $config['defaultChargeKind'] . '"'; ?>;
	</script>
</body>
</html>