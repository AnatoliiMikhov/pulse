$(document).ready(function () {

	// slider carousel
	const swiper = new Swiper('.swiper-container', {
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 2500,
		}
	});

	// tabs script
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleTabs(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__first').eq(i).toggleClass('catalog-item__first_active');
				$('.catalog-item__second').eq(i).toggleClass('catalog-item__second_active');
			})
		});
	}

	toggleTabs('.catalog-item__link');
	toggleTabs('.catalog-item__back');
	// tabs script end

	// Modal script
	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #modal-consultation').fadeIn('fast');
	});

	$('.modal__close').on('click', function () {
		$('.overlay, #modal-consultation, #modal-order, #modal-thanks').fadeOut();
	});

	$('.catalog-item__button').on('click', function () {
		$('.overlay, #modal-order').fadeIn();
	});

	$('.catalog-item__button').each(function (i) {
		$(this).on('click', function () {
			$('#modal-order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
		});
	});
	// modal script end

	// Validation
	function validateForm(form) {
		$(form).validate({
			rules: {
				user_name: {
					user_name: {
						required: true,
						user_name: true
					},
					phone: {
						required: true,
						phone: true
					},
					email: {
						required: true,
						email: true
					}
				}
			},
			messages: {
				user_name: "Введите ваше имя",
				phone: {
					required: "Введите номер телефона",
					phone: "Формат номера +380XXXXXXXXX"
				},
				email: {
					required: "Для контакта нужен email адрес",
					email: "Формат email: name@domain.com"
				}
			}
		});
	}

	validateForm('.consultation form');
	validateForm('#modal-consultation .feed-form');
	validateForm('#modal-order .feed-form');
	// Validation end

});
