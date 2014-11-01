jQuery(document).ready(function ($) {
	var DefaultChargeKind = 'TopUp';
	var DefaultOperator = 'MTN';
	var products = null;
	var paymentGateways = null;
	var paymentGatewayStatus = {'Bill' : false, 'GiftCard' : false, 'Antivirus' : false};
	var DefaultOperatorPhone = '';
	var Kinds = ["TopUp", "PIN", "WiMax", "Bill", "GiftCard", "TrafficCard", "Antivirus"];
	var KindTitle = ["شارژ مستقیم", "کارت شارژ", "شارژ وایمکس ایرانسل", "پرداخت قبض", "گیفت کارت", "طرح ترافیک", "آنتی ویروس"];
	var KindDescription = 
	[
		'در این سامانه شارژ بصورت تاپ آپ عرضه می گردد و پس ازطی مراحل خرید، سیم کارت شما بصورت خودکار شارژ شده و نیازی به ثبت پین یا رمز شارژ نمی باشد.'
		, 'در این نوع پس از طی مراحــل خرید پین و سریال در اختیار شما قرار می گیرد که با وارد کردن پین، گوشی شما شارژ می گردد.'
		, 'در این سرویس خطوط وایمکس ایرانسل شارژ می شود.'
		, 'پرداخت کلیه قبوض خدماتی از جمله آب، برق، گاز، تلفن ثابت، تلفن همراه و عوارض شهرداری'
		, 'با خرید گیفت کارت می توانید از سرویس هایی همچون خرید نرم افزار، بازی، موسیقی، فیلم، کتاب و ... استفاده نمایید.'
		, 'خرید مجوز عبور از طرح ترافیک، مخصوص شهر تهران'
		, 'فروش آنتی ویروس'
	];
	
	function startup() {
		if (DefaultOperator == 'MTN') {
			DefaultOperatorPhone = '093';
			if ($('input#magiccharge').is(':checked')) {
				DefaultOperator = 'MTN!';
			}
		} else if (DefaultOperator == 'MCI') {
			DefaultOperatorPhone = '091';
		} else if (DefaultOperator == 'RTL') {
			DefaultOperatorPhone = '0921';
		} else if (DefaultOperator == 'TAL') {
			DefaultOperatorPhone = '0932';
		}
		
		if (DefaultChargeKind == 'WiMax') {
			DefaultOperatorPhone = '094';
		}
		
		$('div#desc h1').text(KindTitle[Kinds.indexOf(DefaultChargeKind)]);
		$('div#desc p').text(KindDescription[Kinds.indexOf(DefaultChargeKind)]);
		
		$('form#chargeform').attr('class', DefaultOperator.replace('!', ''));
		$('div.container').attr('class', 'container ' + DefaultChargeKind);
		$('div.operators').attr('class', 'operators ' + DefaultChargeKind);
		$('input#dataAccountTemp').val(DefaultOperatorPhone);
		$('input#dataChargeKind').val(DefaultChargeKind);
		$('div.input.text.account div.form-control.account span:last-child i').text(DefaultOperatorPhone);
		$('input#dataType').val(DefaultOperator);
		$('input#dataWebserviceId').val(WebserviceID);
		$('div.operator').removeClass('active');
		$('div.operator.'+ DefaultOperator).addClass('active');
		
		if (jQuery.inArray(DefaultChargeKind, ['Bill', 'GiftCard', 'Antivirus']) > -1) {
			if (paymentGatewayStatus[DefaultChargeKind] == true) {
				$('div.container.' + DefaultChargeKind + ' div.payment-gateways').show();
				$('div.container.' + DefaultChargeKind + ' div.submit').show();
			} else {
				$('div.container.' + DefaultChargeKind + ' div.payment-gateways').hide();
				$('div.container.' + DefaultChargeKind + ' div.submit').hide();
			}
		} else {
			$('div.container.' + DefaultChargeKind + ' div.payment-gateways').show();
			$('div.container.' + DefaultChargeKind + ' div.submit').show();
		}
		
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
	
	$('div.payment-gateways ul li').click(function() {
		$('div.payment-gateways p i').text($(this).data('tooltip'));
		$('input#dataIssuer').val($(this).attr('id'));
		$('div.payment-gateways ul li').removeClass('active');
		$(this).addClass('active');
	});
	
	$('div.operator[data-type]').click(function() {
		DefaultOperator = $(this).attr('data-type');
		startup();
	});
	
	$('form#chargeform input, form#chargeformselect').keypress(function(event) {
		if (DefaultChargeKind == 'Bill') {
			if(event.keyCode == 13) {
				event.preventDefault();
				return false;
			}
		}
	});
	
	$('input[type="submit"]').click(function(e) {
		
		e.preventDefault();
		var action = '';
		if (DefaultChargeKind == 'TopUp') {
			action = 'Topup';
		} else if (DefaultChargeKind == 'WiMax') {
			action = 'Topup';
		} else if (DefaultChargeKind == 'Bill') {
			action = 'Bill';
		} else {
			action = 'BuyProduct';
		}
		
		checkForm();
		if (sendForm) {
			$('.cover').fadeIn();
			$('.connecting p').text('دریافت اطلاعات ...');
			$('.connecting').attr('style', 'top:' + ($(window).height() - $('div.connecting').height()) / 2 + 'px; right:' + ($(window).width() - $('div.connecting').width()) / 2 + 'px; display:block!important;');
			$.ajax({
				type: 'POST',
				url: 'http://chargereseller.com/services/EasyCharge/' + action,
				data: $('form#chargeform').serialize(),
				async: false,
				contentType: "application/json",
				dataType: 'jsonp',
				crossDomain: true,
				success: function(data) {
					$('.connecting p').text('انتقال به بانک ...');
					doProccess(data);
				},
				error: function(e) {
					$('.cover').fadeOut();
					$('.connecting').fadeOut();
					dialogue("در حال حاضر امکان برقرار ارتباط با سرور وجود ندارد. (خطا: " + e.status + ")<br>لطفاً بعداً مراجعه نمایید.", "خطا");
					// console.log(e);
				}
			});
		}
		return false;
	});
	
	function doProccess(data) {
		if (data.data.Status == 100) {
			if (data.data.IsDirect != true) {
				$.ajax({
					type: 'GET',
					url: data.data.PaymentGatewayUrl,
					contentType: "application/json",
					dataType: 'jsonp',
					success: function(data) {
						$("#payment-process").html('');
						$("#payment-process").append('<form action="' + data.Params.address + '" method="POST">');
						$.each(data.Params.params, function(key, value) {
							$("#payment-process form").append('<input type="text" name="' + key + '" value="' + value + '"/>');
						});
						$("#payment-process form").append('<input type="submit" value="submit"/>');
						$("#payment-process form").submit();
					},
					error: function(e) {
						$('.cover').fadeOut();
						$('.connecting').fadeOut();
						dialogue("در حال حاضر امکان برقرار ارتباط با بانک وجود ندارد. (خطا: " + e.status + ")<br>لطفاً بعداً مراجعه نمایید.", "خطا");
						// console.log(e);
					}
				});
			} else {
				window.location.replace(data.data.PaymentGatewayUrl);
			}
		} else {
			switch(data.data.Status) {
				case -11:
					dialogue("خطای شماره 11: اطلاعات ارسال شده ناقص است.", "خطا");
					break;
				case -22:
					dialogue("خطای شماره 22: اطلاعات احراز هویت صحیح نمی باشد.", "خطا");
					break;
				case -44:
					dialogue("خطای شماره 44: درحال حاضر این محصول موجود نیست.", "خطا");
					break;
				case -55:
					dialogue("خطای شماره 55: روش پرداخت انتخاب شده موجود نیست.", "خطا");
					break;
				case -66:
					dialogue("خطای شماره 66: امکان شارژ مستقیم ایرانسل فعلاً میسر نمی باشد.", "خطا");
					break;
				case -67:
					dialogue("خطای شماره 67: امکان شارژ مستقیم همراه اول فعلاً میسر نمی باشد.", "خطا");
					break;
				case -97:
					dialogue("خطای شماره 97: مشکل در ارتباط با بانک رخ داده است.", "خطا");
					break;
				case -98:
					dialogue("خطای شماره 98: خطا در ویرایش تراکنش اولیه رخ داده است.", "خطا");
					break;
				case -99:
					dialogue("خطای شماره 99: خطا در ثبت تراکنش اولیه رخ داده است.", "خطا");
					break;
				default:
					dialogue("خطای شماره " + data.data.Status, "خطا");
			} 
			$('.cover').fadeOut();
			$('.connecting').fadeOut();
		}
	}
	
	var sendForm = false;
	function checkForm () {
		var emptyCheck = true;
		var cellphoneCheck = true;
		var emailCheck = true;
		var billCheck = true;
		var amountCheck = true;
		var cellphone = $('input#dataCellphone').val();
		var email = $('input#dataEmail').val();
		var divType = DefaultChargeKind;
		if (jQuery.inArray(DefaultChargeKind, ['PIN', 'TopUp', 'WiMax']) > -1) {
			divType = 'charge';
		}
		
		if (DefaultChargeKind == 'TopUp') {
			if (cellphone.length == 11 && !isNaN(cellphone)) {
				if (DefaultOperator == 'MTN' || DefaultOperator == 'MTN!') {
					if (jQuery.inArray(cellphone.substring(0, 3), ['093', '090']) == -1) {
						cellphoneCheck = false;
					}
				} else if (DefaultOperator == 'MCI') {
					if (cellphone.substring(0, 3) != '091') {
						cellphoneCheck = false;
					}
				}
			} else {
				cellphoneCheck = false;
			}
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (email.length > 0 && !filter.test(email)) {
				emailCheck = false;
			}
		} else if (DefaultChargeKind == 'PIN') {
			if ((cellphone.length == 0 || jQuery.inArray(cellphone, ['093', '090', '091', '0921', '0932']) != -1) && email.length == 0) {
				emptyCheck = false;
				dialogue('جهت استفاده از خدمات پشتیبانی، ایمیل یا شماره موبایل خود را وارد نمایید.', 'تذکر');
			} else {
				var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (email.length > 0 && !filter.test(email)) {
					emailCheck = false;
				}
				
				if (emailCheck && jQuery.inArray(cellphone, ['093', '090', '091', '0921', '0932']) == -1) {
					if (cellphone.length == 11 && !isNaN(cellphone)) {
						if (jQuery.inArray(cellphone.substr(0, 3), ['090', '091', '092', '093']) == -1) {
							cellphoneCheck = false;
						} else {
							cellphoneCheck = true;
						}
					} else {
						cellphoneCheck = false;
					}
				}
			}
		} else if (DefaultChargeKind == 'WiMax') {
			if (cellphone.length == 11 && !isNaN(cellphone)) {
				if (DefaultOperator == 'MTN') {
					if (jQuery.inArray(cellphone.substr(0, 4), ['0940', '0941']) == -1) {
						cellphoneCheck = false;
					}
				}
			} else {
				cellphoneCheck = false;
			}
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (email.length > 0 && !filter.test(email)) {
				emailCheck = false;
			}
		} else if (DefaultChargeKind == 'Bill') {
			var billId =$('input#BillId').val();
			var paymentId =$('input#PaymentId').val();
			if (isNaN(billId) || isNaN(paymentId)) {
				emptyCheck = false;
				dialogue('شناسه قبض و شناسه پرداخت فقط باید عدد باشند.', 'تذکر');
			} else {
				if (!checkBillElement(billId)) {
					billCheck = false;
				} else {
					if (!checkBillElement(paymentId.substr(0, paymentId.length - 1))) {
						billCheck = false;
					} else {
						billCheck = true;
					}
				}
				if ((cellphone.length == 0 || jQuery.inArray(cellphone, ['090', '091', '0921', '093', '0932']) != -1) && email.length == 0) {
					emptyCheck = false;
					dialogue('جهت استفاده از خدمات پشتیبانی، ایمیل یا شماره موبایل خود را وارد نمایید.', 'تذکر');
				} else {				
					var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if (email.length > 0 && !filter.test(email)) {
						emailCheck = false;
					}
					
					if (!emailCheck && jQuery.inArray(cellphone, ['090', '091', '0921', '093', '0932']) == -1) {
						if (cellphone.length == 11 && !isNaN(cellphone)) {
							if (jQuery.inArray(cellphone.substr(0, 3), ['090', '091', '0921', '093', '0932']) == -1) {
								cellphoneCheck = false;
							} else {
								cellphoneCheck = true;
							}
						} else {
							cellphoneCheck = false;
						}
					}
				}
			}
		} else {
			if ((cellphone.length == 0 || jQuery.inArray(cellphone, ['090', '091', '0921', '093', '0932']) != -1) && email.length == 0) {
				emptyCheck = false;
				dialogue('جهت استفاده از خدمات پشتیبانی، ایمیل یا شماره موبایل خود را وارد نمایید.', 'تذکر');
			} else {				
				var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (email.length > 0 && !filter.test(email)) {
					emailCheck = false;
				}
				
				if (!emailCheck && jQuery.inArray(cellphone, ['090', '091', '0921', '093', '0932']) == -1) {
					if (cellphone.length == 11 && !isNaN(cellphone)) {
						if (jQuery.inArray(cellphone.substr(0, 3), ['090', '091', '0921', '093', '0932']) == -1) {
							cellphoneCheck = false;
						} else {
							cellphoneCheck = true;
						}
					} else {
						cellphoneCheck = false;
					}
				}
			}
		}
		
		if (cellphoneCheck == false) {
			if ($('div#content div.' + divType + ' div.input.text.account div.message').length <= 0) {
				$('div#content div.' + divType + ' div.input.text.account').prepend('<div class="message error-message">شماره وارد شده صحیح نمی باشد.</div>');
			}
		} else {
			$('div.content div.' + divType + ' div.input.text.account div.message').remove();
		}
		
		if (emailCheck == false) {
		
			if ($('div#content div.' + divType + ' div.input.text.email div.message').length <= 0) {
				$('div#content div.' + divType + ' div.input.text.email').prepend('<div class="message error-message">این ایمیل صحیح نمی باشد.</div>');
			}
		} else {
			$('div#content div.' + divType + ' div.input.text.email div.message').remove();
		}
		
		if (DefaultChargeKind == 'PIN' || DefaultChargeKind == 'TopUp') {
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
		}
		
		if (emptyCheck && cellphoneCheck && emailCheck && amountCheck) {
			sendForm = true;
		} else {
			sendForm = false;
		}
	}
	
	setInterval((function() {
		if (DefaultChargeKind == 'TrafficCard' || DefaultChargeKind == 'GiftCard' || DefaultChargeKind == 'Antivirus') {
			$('input#dataCount').val($('.container.' + DefaultChargeKind + ' .' + DefaultChargeKind + ' input#count').val());
		}
		if (DefaultChargeKind == 'PIN') {
			$('input#dataCount').val($('.container.PIN div#content div.charge input#count').val());
			$('input#dataCount').val($('.container.PIN div#content div.charge input#count').val());
		}
		setAmount();
		
		if (DefaultChargeKind == 'TopUp') {
			if (DefaultOperator == 'MTN') {
				$('input#dataAmount').val($('input#dataAmountTopUpMTNTemp').val());
			} else {
				$('input#dataAmount').val($('input#dataAmountTemp').val());
			}
		} else if (DefaultChargeKind == 'PIN') {
			$('input#dataAmount').val($('input#dataAmountTemp').val());
			$('.container.PIN div#content div.charge .amount-value').text($('input#dataCount').val() * $('input#dataAmount').val());
		} else if (DefaultChargeKind == 'WiMax') {
			$('input#dataAmount').val($('input#dataAmountTopUpMTNTemp').val());
		}
		
		var divType = DefaultChargeKind;
		if (jQuery.inArray(DefaultChargeKind, ['PIN', 'TopUp', 'WiMax']) > -1) {
			divType = 'charge';
		}
		$('input#dataEmail').val($('div#content div.' + divType + ' input[type=email]').val());
		$('input#dataCellphone').val($('div#content div.' + divType + ' input.cellphone').val());
	}), 500);
	
	if ($("#dataAmountTemp").length){
		$("#dataAmountTemp").ionRangeSlider({
			values: [1000, 2000, 5000, 10000, 20000],
			type: 'single',
			postfix: " تومان",
			prettify: false,
			from: 0,
			onLoad: function(obj) {
				$('#dataAmountTemp').val(1000);
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
	
	if ($("input#count").length){
		$("input#count").ionRangeSlider({
			min: 1,
			max: 5,
			type: 'single',
			postfix: " عدد",
			prettify: false,
			step: 1,
			from: 0,
			onChange: function(obj) {
				$('#dataCount').val(obj.fromNumber);
				setAmount();
			},
		});
	}
	
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
	   content: '<p>پشتیبانی تلفنی: 88019574-021</p><p>پشتیبانی یاهو: <a title="yahoo Status" target="_blank" href="ymsgr:sendim?chargereseller24"><img border="0" src="http://opi.yahoo.com/online?u=chargereseller24&m=g&t=1"></a></p><p>پشتیبانی گوگل: chargereseller24</p>',
		style:
		{
			classes: 'qtip-green qtip-rounded qtip-shadow',
			width: '200px'
		},
		position:
		{
			my: 'top center',  // Position my top left...
			at: 'bottom center', // at the bottom right of...
		},
		hide: 'unfocus'
	});
	
	$('div.payment-gateways ul li').qtip({
		content: {attr: 'data-tooltip'},
		style:
		{
			classes: 'qtip-dark qtip-rounded qtip-shadow bank-qtip',
		},
		position:
		{
			my: 'bottom center',  // Position my top left...
			at: 'top center', // at the bottom right of...
		}
	});
	
	$('#logo').tinycircleslider({ 
		dotsSnap : true
		, radius   : 70
		, dotsHide : false
		, interval : false
	});
	
	$('.dot').qtip({
		content: {attr: 'data-tooltip'},
		style:
		{
			classes: 'qtip-dark qtip-rounded qtip-shadow bank-qtip',
		},
		position:
		{
			my: 'bottom center',  // Position my top left...
			at: 'top center', // at the bottom right of...
		}
	});
	
	var touchEvents     = "ontouchstart" in document.documentElement;
	var eventType = touchEvents ? "touchstart" : "mousedown";
	
	$('.dot').on(eventType, function(){
		$('div.notify').hide();
		
		DefaultChargeKind = $(this).data('type');

		DefaultOperator = 'MTN';
		$('input#magiccharge').removeAttr('checked');
		startup();
		
		if (DefaultChargeKind == 'TrafficCard') {
			setProducts('TrafficCard', '');
		}
	});
	
	$('input#CheckBill').click(function() {
		var billIdCheck = true;
		var paymentIdCheck = true;
		var billCheck = true;
		var emptyCheck = true;
		var emailCheck = true;
		var cellphoneCheck = true;
		var billId =$('input#BillId').val();
		var paymentId =$('input#PaymentId').val();
		var email =$('input#dataEmail').val();
		var cellphone =$('input#dataCellphone').val();
		if (isNaN(billId) || isNaN(paymentId)) {
			emptyCheck = false;
			dialogue('شناسه قبض و شناسه پرداخت فقط باید عدد باشند.', 'تذکر');
		} else {
			if (!checkBillElement(billId.replace(/^[0]+/g,""))) {
				billIdCheck = false;
			}
			if (!checkBillElement(paymentId.substr(0, paymentId.length -1).replace(/^[0]+/g,""))) {
				paymentIdCheck = false;
			}
			if (!checkBillElement(billId.replace(/^[0]+/g,"") + paymentId.replace(/^[0]+/g,""))) {
				billCheck = false;
			}
		}
		
		if (cellphone.length == 0 && email.length == 0) {
			emptyCheck = false;
			dialogue('جهت استفاده از خدمات پشتیبانی، ایمیل یا شماره موبایل خود را وارد نمایید.', 'تذکر');
		} else {				
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (email.length > 0 && !filter.test(email)) {
				emailCheck = false;
			}
			
			if (!emailCheck) {
				if (cellphone.length == 11 && !isNaN(cellphone)) {
					if (jQuery.inArray(cellphone.substr(0, 3), ['090', '091', '092', '093']) == -1) {
						cellphoneCheck = false;
					} else {
						cellphoneCheck = true;
					}
				} else {
					cellphoneCheck = false;
				}
			}
		}
		
		if (emptyCheck && billIdCheck && paymentIdCheck && cellphoneCheck && emailCheck) {
			if (!billCheck) {
				dialogue('شناسه قبض با شناسه پرداخت همخوانی ندارد.', 'تذکر');
				return;
			}
			var billTypesPersian = ["آب", "بــرق", "گـــاز", "تلفن ثابت", "تلفن همراه", "عوارض شهرداری"];
			var billTypesEnglish = ["water", "electricity", "gas", "telephone", "cellphone", "mayoralty"];
			var billLength = billId.length;
			var paymentLength = paymentId.length;
			var billType = billId.substr((billLength - 2), 1) - 1;
			var billAmount = paymentId.substr(0, (paymentLength - 5)) * 1000; // Rial
			$('table#bill-info span#type').removeClass().addClass('bill').addClass(billTypesEnglish[billType]);
			$('table#bill-info span#type-title').text(billTypesPersian[billType]);
			$('table#bill-info span#amount').text(billAmount);
			$('table#bill-info span#bill-id').text(billId);
			$('table#bill-info span#payment-id').text(paymentId);
			$('table#bill-info span#email').text(email);
			$('table#bill-info span#cellphone').text(cellphone);
			$('div.container.Bill div.check').slideUp();
			$('div.container.Bill div.verify').slideDown();
			$('div.container.Bill div.payment-gateways').fadeIn();
			$('div.container.Bill div.submit').fadeIn();
			
			paymentGatewayStatus[DefaultChargeKind] = true;
		}
		
		if (billIdCheck == false) {
			if ($('div.input.text.billId div.message').length <= 0) {
				$('div.input.text.billId').prepend('<div class="message error-message">شناسه قبض معتبر نیست.</div>');
			}
		} else {
			$('div.input.text.billId div.message').remove();
		}
		
		if (paymentIdCheck == false) {
			if ($('div.input.text.paymentId div.message').length <= 0) {
				$('div.input.text.paymentId').prepend('<div class="message error-message">شناسه پرداخت معتبر نیست.</div>');
			}
		} else {
			$('div.input.text.paymentId div.message').remove();
		}
		
		if (emailCheck == false) {
			if ($('div.input.text.email div.message').length <= 0) {
				$('div.input.text.email').prepend('<div class="message error-message">این ایمیل صحیح نمی باشد.</div>');
			}
		} else {
			$('div.input.text.email div.message').remove();
		}
		
		if (cellphoneCheck == false) {
			if ($('div.input.text.account div.message').length <= 0) {
				$('div.input.text.account').prepend('<div class="message error-message">شماره وارد شده صحیح نمی باشد.</div>');
			}
		} else {
			$('div.input.text.account div.message').remove();
		}
	});
	
	function checkBillElement(element) {
		var checkSum = element.substr(element.length - 1, 1);
		element =  element.substr(0, element.length - 1);
		element = element.split("");
		coefficient = 2;
		billLength = element.length;
		sum = 0;
		for (i = (billLength - 1); i >= 0; i--) {
			sum += coefficient * element[i];
			coefficient++;
			if (coefficient == 8) {
				coefficient = 2;
			}
		}
		
		calculatedCheckSum = sum % 11;
		if (calculatedCheckSum == 1 || calculatedCheckSum == 0) {
			calculatedCheckSum = 0;
		} else {
			calculatedCheckSum = 11 - calculatedCheckSum;
		}
		
		if (calculatedCheckSum == checkSum) {
			return true;
		}
		return false;
	}
	
	var GiftCardKinds = ["GooglePlay", "Microsoft", "iTunes", "Amazon", "XBox", "PlayStation", "PlayStationPlus"];
	var GiftCardKindTitle = ["Google Play", "Microsoft", "iTunes", "Amazon", "XBox", "PlayStation", "PlayStation Plus"];
	var GiftCardKindDescription = 
	[
		"خرید نرم افزار، بازی و ..."
		, "خرید نرم افزار، بازی و ..."
		, "خرید موسیقی"
		, "خرید کتاب، فیلم، موسیقی و نرم افزار"
		, "خرید بازی، فیلم، موسیقی و نمایش های تلوزیونی"
		, "بازی آنلاین"
		, "بازی آنلاین"
	];
	
	var AntivirusKinds = ["Eset", "BitDefender", "iTunes", "Amazon"];
	var AntivirusKindTitle = ["Eset", "BitDefender", "iTunes", "Amazon"];
	var AntivirusKindDescription = 
	[
		"آنتی ویروس قدرتمند Eset",
		"آنتی ویروس قدرتمند BitDefender",
		"آنتی ویروس قدرتمند Kaspersky",
		"آنتی ویروس قدرتمند Norton"
	];
	
	$('div.operator.GiftCard').click(function() {
		$('div.GiftCard div.giftcard-types > select').attr('id', 'GiftCard' + $(this).data('type') + 'Types');
		setProducts('GiftCard', $(this).data('type'));
		$('div#content div.GiftCard div.info div#operator').removeClass().addClass('operator GiftCard ' + $(this).data('type'));
		$('div#content div.GiftCard div.info div.title').text("گیفت کارت " + GiftCardKindTitle[GiftCardKinds.indexOf($(this).data('type'))]);
		$('div#content div.GiftCard div.info div.description').text(GiftCardKindDescription[GiftCardKinds.indexOf($(this).data('type'))]);
		$('div.container.GiftCard div.GiftCard div.operators').slideUp(500);
		$('div.container.GiftCard div.buy').slideDown(1500);
		$('div.container.GiftCard div.payment-gateways').fadeIn();
		$('div.container.GiftCard div.submit').fadeIn();
		
		paymentGatewayStatus[DefaultChargeKind] = true;
	});
	
	$('div.GiftCard div.giftcard-types select').change(function() {
		$('.container.GiftCard .GiftCard input#UnitAmount').val($(this).find(':selected').data('price'));
	});
	
	$('div.back-button').click(function() {
		$('div.container.' + DefaultChargeKind + ' div.buy').hide();
		$('div.container.' + DefaultChargeKind + ' div.' + DefaultChargeKind + ' div.operators').show(500);
		$('div.container.' + DefaultChargeKind + ' div.payment-gateways').fadeOut();
		$('div.container.' + DefaultChargeKind + ' div.submit').fadeOut();
		paymentGatewayStatus[DefaultChargeKind] = false;
	});
	
	$('div.operator.Antivirus').click(function() {
		$('div.Antivirus div.antivirus-types > select').attr('id', 'Antivirus' + $(this).data('type') + 'Types');
		setProducts('Antivirus', $(this).data('type'));
		$('div#content div.Antivirus div.info div#operator').removeClass().addClass('operator Antivirus ' + $(this).data('type'));
		$('div#content div.Antivirus div.info div.title').text("آنتی ویروس " + AntivirusKindTitle[AntivirusKinds.indexOf($(this).data('type'))]);
		$('div#content div.Antivirus div.info div.description').text(GiftCardKindDescription[GiftCardKinds.indexOf($(this).data('type'))]);
		$('div.container.Antivirus div.Antivirus div.operators').slideUp(500);
		$('div.container.Antivirus div.buy').slideDown(1500);
		$('div.container.Antivirus div.payment-gateways').fadeIn();
		$('div.container.Antivirus div.submit').fadeIn();
		
		paymentGatewayStatus[DefaultChargeKind] = true;
	});
	
	$('div.Antivirus div.antivirus-types select').change(function() {
		$('.container.Antivirus .Antivirus input#UnitAmount').val($(this).find(':selected').data('price'));
	});
	
	$('div.TrafficCard select#TrafficCardTypes').change(function() {
		$('.container.TrafficCard .TrafficCard input#UnitAmount').val($(this).find(':selected').data('price'));
	});
	
	$( "input.cellphone" ).blur(function() {
		if ($(this).val().length == 11) {
			$( "input.cellphone" ).each(function( index ) {
				$(this).val($( "input#dataCellphone" ).val());
			});
		}
	});
	
	$( "input[type=email]" ).blur(function() {
		$( "input[type=email]" ).each(function( index ) {
			$(this).val($( "input#dataEmail" ).val());
		});
	});
	
	function setAmount() {
		$('.container.' + DefaultChargeKind + ' .' + DefaultChargeKind + ' .amount-value').text($('input#dataCount').val() * $('.container.' + DefaultChargeKind + ' .' + DefaultChargeKind + ' input#UnitAmount').val());
		$('input#dataAmount').val($('input#dataCount').val() * $('.container.' + DefaultChargeKind + ' .' + DefaultChargeKind + ' input#UnitAmount').val());
	}
	
	function setProducts(group, subGroup) {
		if (subGroup != '') {
			var jsonData = products[group][subGroup];
		} else {
			var jsonData = products[group];
		}
		$('select#' + group + subGroup + 'Types').find('option').remove();
		$.each(jsonData, function(key, val) {
			$('select#' + group + subGroup + 'Types').append(
				$('<option data-price="' + val.Product.price + '"></option>').val(val.Product.plan_name).html(val.Product.name)
			);
		});
		$('.container.' + group + ' .' + group + ' input#UnitAmount').val(jsonData[0].Product.price);
	}
	
	$.ajax({
		type: 'GET',
		url: "http://chargereseller.com/services/EasyCharge/ProductsInfo",
		data: "{}",
		async: false,
		contentType: "application/json",
		dataType: 'jsonp',
		crossDomain: true,
		success: function(data) {
			products = data.InitializeData.Products;
			paymentGateways = data.InitializeData.PaymentGateways;
			initailize();
		},
		error: function(e) {
			dialogue("در حال حاضر امکان برقرار ارتباط با سرور وجود ندارد. (خطا: " + e.status + ")<br>لطفاً بعداً مراجعه نمایید.", "خطا");
			// console.log(e);
		}
	});
	
	function initailize() {
		$.each(products, function(key, val) {
			if (jQuery.isEmptyObject(val)) {
				$('#content fieldset > .' + key).html('<p class="service-caution">در حال حاضر در این دسته محصولی برای فروش وجود ندارد.</p>');
			}
		});
		
		$.each(paymentGateways, function(index, value) {
			$('div#content div.payment-gateways ul li#' + value).attr('style', 'display:inline-block;');
		});
		
		$('div#content div.payment-gateways ul').attr('style', 'width:' + paymentGateways.length * 55 + 'px;');
		
		$.each(products.GiftCard, function(key, val) {
			if (val == '' || val == null) {
				$('.operator.GiftCard.' + key).hide();
			}
		});	
		
		$.each(products.Antivirus, function(key, val) {
			if (val == '' || val == null) {
				$('.operator.Antivirus.' + key).hide();
			}
		});
		
		$('.container').slideDown(300);
		
		$('div.notify').attr('style', 'left:' + ($('#logo').offset().left - 25) + 'px;' + 'top:' + (($('.container').height() - 100) / 2) + 'px');
		$('div.notify').fadeIn(1000).delay(8000).fadeOut(1000);
	}
});