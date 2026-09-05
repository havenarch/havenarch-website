/*
	Paradigm Shift by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');

	// Scrolly.
		$('.scrolly')
			.scrolly({
				offset: 100
			});

	// Polyfill: Object fit.
		if (!browser.canUse('object-fit')) {

			$('.image[data-position]').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', $this.data('position'))
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

			$('.gallery > a').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', 'center')
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

		}

	// Gallery.
		$('.gallery').each(function() {

			var $gallery = $(this),
				$modal,
				$modalImg,
				$links;

			function imageLinks() {
				return $gallery.children('a').filter(function() {
					return ($(this).attr('href') || '').match(/\.(jpe?g|gif|png|webp|mp4)$/i);
				});
			}

			function showAt(index) {
				$links = imageLinks();

				if ($links.length < 1)
					return;

				index = ((index % $links.length) + $links.length) % $links.length;
				$modal[0]._index = index;

				$modal.removeClass('loaded');
				$modalImg.attr('src', $links.eq(index).attr('href'));
				$modal.addClass('visible');
				$modal.toggleClass('has-nav', $links.length > 1);
				$modal.focus();

				if ($modalImg[0].complete)
					$modal.addClass('loaded');
			}

			function hide() {
				if ($modal[0]._locked || !$modal.hasClass('visible'))
					return;

				$modal[0]._locked = true;
				$modal.removeClass('loaded');

				setTimeout(function() {
					$modal.removeClass('visible has-nav');

					setTimeout(function() {
						$modalImg.attr('src', '');
						$modal[0]._locked = false;
						$body.focus();
					}, 475);
				}, 125);
			}

			function step(delta) {
				$links = imageLinks();

				if (!$modal.hasClass('visible') || $links.length < 2)
					return;

				showAt(($modal[0]._index || 0) + delta);
			}

			$gallery.prepend(
				'<div class="modal" tabIndex="-1">' +
					'<button type="button" class="gallery-nav prev" aria-label="Previous image"></button>' +
					'<div class="inner"><img src="" alt="" /></div>' +
					'<button type="button" class="gallery-nav next" aria-label="Next image"></button>' +
				'</div>'
			);

			$modal = $gallery.children('.modal');
			$modalImg = $modal.find('.inner img');
			$modal[0]._index = 0;

			$gallery.on('click', 'a', function(event) {
				var $a = $(this),
					href = $a.attr('href');

				if (!href || !href.match(/\.(jpe?g|gif|png|webp|mp4)$/i))
					return;

				event.preventDefault();
				event.stopPropagation();

				$links = imageLinks();
				showAt($links.index($a));
			});

			$modal.on('click', function(event) {
				if ($(event.target).closest('.gallery-nav, .inner').length)
					return;

				event.stopPropagation();
				hide();
			});

			$modal.on('click', '.gallery-nav.prev', function(event) {
				event.preventDefault();
				event.stopPropagation();
				step(-1);
			});

			$modal.on('click', '.gallery-nav.next', function(event) {
				event.preventDefault();
				event.stopPropagation();
				step(1);
			});

			$window.on('keydown', function(event) {
				if (!$modal.hasClass('visible'))
					return;

				if (event.key === 'Escape' || event.keyCode === 27) {
					event.preventDefault();
					hide();
				}
				else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
					event.preventDefault();
					step(-1);
				}
				else if (event.key === 'ArrowRight' || event.keyCode === 39) {
					event.preventDefault();
					step(1);
				}
			});

			$modal.on('mouseup mousedown mousemove', function(event) {
				event.stopPropagation();
			});

			$modal.on('touchstart', function(event) {
				var touch = event.originalEvent.changedTouches[0];
				$modal[0]._swipeX = touch ? touch.screenX : null;
			});

			$modal.on('touchend', function(event) {
				var startX = $modal[0]._swipeX,
					touch = event.originalEvent.changedTouches[0];

				if (startX == null || !touch)
					return;

				var dx = touch.screenX - startX;

				if (Math.abs(dx) > 50)
					step(dx > 0 ? -1 : 1);

				$modal[0]._swipeX = null;
			});

			$modalImg.on('load', function() {
				setTimeout(function() {
					if ($modal.hasClass('visible'))
						$modal.addClass('loaded');
				}, 175);
			});

		});

})(jQuery);