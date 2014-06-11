jQuery(document).ready(function ($) {
	var DefaultOperatorPhone = '';
	var ChargeKindText = '';
	
	function startup() {
		if (DefaultOperator == 'MTN') {
			DefaultOperatorPhone = '093';
			if ($('input#magiccharge').is(':checked')) {
				DefaultOperator = 'MTN!';
			}
		} else if (DefaultOperator == 'MCI') {
			DefaultOperatorPhone = '091';
		} else if (DefaultOperator == 'RTL') {
			DefaultOperatorPhone = '092';
		} else if (DefaultOperator == 'TAL') {
			DefaultOperatorPhone = '0932';
		}
		
		if (DefaultChargeKind == 'TopUp') {
			ChargeKindTitle = 'به صورت مستقیم';
			ChargeKindText = 'در این سامانه شارژ بصورت تاپ آپ عرضه می گردد و پس ازطی مراحل خرید، سیم کارت شما بصورت خودکار شارژ شده و نیازی به ثبت پین یا رمز شارژ نمی باشد.';
		} else if (DefaultChargeKind == 'PIN') {
			ChargeKindTitle = 'از طریق کارت شارژ';
			ChargeKindText = 'در این نوع پس از طی مراحــل خرید پین و سریال در اختیار شما قرار می گیرد که با وارد کردن پین، گوشی شما شارژ می گردد.';
		}
		$('div#desc h1').text(ChargeKindTitle);
		$('div#desc p').text(ChargeKindText);
		
		$('form#chargeform').attr('class', DefaultOperator.replace('!', ''));
		$('div.container').attr('class', 'container ' + DefaultChargeKind);
		$('div.operators').attr('class', 'operators ' + DefaultChargeKind);
		$('input#dataAccountTemp').val(DefaultOperatorPhone);
		$('input#dataChargeKind').val(DefaultChargeKind);
		$('label#ChargeKindText').text(ChargeKindText);
		$('div.input.text.account div.form-control.account span:last-child i').text(DefaultOperatorPhone);
		$('input#dataType').val(DefaultOperator);
		$('input#dataWebserviceId').val(WebserviceID);
		$('div.operator').removeClass('active');
		$('div.operator.'+ DefaultOperator).addClass('active');
		$('form#chargeform').slideDown(200);
	}
	startup();
	
	$('input#magiccharge').change(function() {
		if ($('input#dataType').val() == 'MTN' || $('input#dataType').val() == 'MTN!') {
			if ($(this).is(':checked')) {
				$('input#dataType').val('MTN!');
			} else {
				$('input#dataType').val('MTN');
			}
		}
	});
	
	$('div.ChangeType').click(function() {
		var kind = $('input#dataChargeKind').val();
		if (kind == 'PIN') {
			DefaultChargeKind = 'TopUp';
		} else {
			DefaultChargeKind = 'PIN';
		}
		DefaultOperator = 'MTN';
		$('input#magiccharge').removeAttr('checked');
		startup();
	});
	
	$('div.banks ul li').click(function() {
		$('div.banks p i').text($(this).find('i').text());
		$('input#dataIssuer').val($(this).attr('id'));
		$('div.banks ul li').removeClass('active');
		$(this).addClass('active');
	});
	
	$('div.operator[data-type]').click(function() {
		DefaultOperator = $(this).attr('data-type');
		startup();
	});
	
	$('input[type="submit"]').click(function(e) {
		var action = '';
		if (DefaultChargeKind == 'PIN') {
			action = 'PinRequest';
		} else {
			action = 'Topup';
		}
		$('form#chargeform').attr('action', 'http://chargereseller.com/services/EasyCharge/' + action);
		checkForm();
		if (sendForm) {
			$('form#chargeform').submit();
		}
		e.preventDefault();
		return false;
	});
	
	var sendForm = false;
	function checkForm () {
		if ($('input#dataChargeKind').val() == 'TopUp' && $('input#dataAccount').val().length != 11) {
			if ($('div.input.text.account div.message').length <= 0) {
				$('div.input.text.account').prepend('<div class="message error-message">شماره وارد شده صحیح نمی باشد.</div>');
			}
			accountCheck = false;
		} else {
			$('div.input.text.account div.message').remove();
			accountCheck = true;
		}
		
		if ($('input#dataAmount').val() < 500 || $('input#dataAmount').val() > 50000) {
			if ($('div.input.text.amount div.message').length <= 0) {
				$('div.input.text.amount').prepend('<div class="message error-message">مبلغ وارد شده میبایست بزرگتر از 500 و کوچک تر از 50،000 تومان باشد.</div>');
				$('div.input.select.amount').prepend('<div class="message error-message">مبلغ وارد شده میبایست بزرگتر از 500 و کوچک تر از 50،000 تومان باشد.</div>');
			}
			amountCheck = false;
		} else {
			$('div.input.text.amount div.message').remove();
			amountCheck = true;
		}
		
		if ($('div.banks ul li.active').length == 0) {
			if ($('div.banks div.message').length <= 0) {
				$('div.banks').prepend('<div class="message error-message">بانک صادر کننده کارت خود را انتخاب کنید</div>');
			}
			bankCheck = false;
		} else {
			$('div.banks div.message').remove();
			bankCheck = true;
		}
		
		if (accountCheck && amountCheck && bankCheck) {
			sendForm = true;
		}
	}
	setInterval((function() {
		// $('input#dataAccountTemp').val($('input#dataAccountTemp').val().replace(/\D/g, ''));
		$('input#dataAccount').val($('input#dataAccountTemp').val());
		if (DefaultOperator == 'MTN' && DefaultChargeKind == 'TopUp') {
			aditionalFind = 'input#dataAmountTopUpMTNTemp';
		} else {
			aditionalFind = 'input#dataAmountTemp';
		}
		$('input#dataAmount').val($(aditionalFind).val());
	}), 500);
	
	if ($("#dataAmountTemp").length){
		$("#dataAmountTemp").ionRangeSlider({
			values: [1000, 2000, 5000, 10000, 20000],
			type: 'single',
			postfix: " تومان",
			prettify: false,
			from: 1,
			onLoad: function(obj) {
				$('#dataAmountTemp').val(2000);
			},
			onChange: function(obj) {
				$('#dataAmountTemp').val(obj.fromValue);
			},
		});
	}
	
	if ($("#dataAmountTopUpMTNTemp").length){
		$("#dataAmountTopUpMTNTemp").ionRangeSlider({
			min: 500,
			max: 50000,
			type: 'single',
			postfix: " تومان",
			prettify: false,
			step: 500,
			from: 500,
		});
	}
		
	$('.help').qtip({
		content: {
			text: 'درحال بارگزاری ...',
			ajax: {
				url	: "http://chargereseller.com/pages/help",
				dataType: 'html'
			},
			title: {
				text: 'راهنما',
				button: true
			}
		},
		position: {
			my: 'center', // ...at the center of the viewport
			at: 'center',
			target: $(window)
		},
		show: {
			event: 'click', // Show it on click...
			solo: true, // ...and hide all other tooltips...
			modal: {
				effect: function(state) {
					$(this).fadeTo(1000, state ? 0.6 : 0, function() {
						if(!state) { $(this).hide(); }
					});
				}
			}
		},
		hide: false,
		style: 'qtip-bootstrap qtip-shadow ui-tooltip-rounded helpModalClass'
	});

	// By suppling no content attribute, the library uses each elements title attribute by default
	$('.support').qtip({
	   content: 'در صورت نیاز به پشتیبانی می توانید با شماره تلفن 88019574-021 تماس حاصل نمایید.',
		style:
		{
			classes: 'qtip-green qtip-rounded qtip-shadow',
			width: '250px'
		},
		position:
		{
			my: 'top center',  // Position my top left...
			at: 'bottom center', // at the bottom right of...
		}
	});
});