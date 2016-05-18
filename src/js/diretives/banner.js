// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").directive('banner', function() {
	return {
		restrict: 'E',
		transclude: true,
		template: "<div class='carousel-holder owl-carousel theme' ng-transclude></div>",
		link: function(scope, element, attrs) {
			var options = {
				autoPlay: 5000,
				items: 1,
				// pagination: true
			}
			options = angular.extend({}, options, scope.$eval($(element).attr('data-options')));
			var rate = parseFloat(scope.$eval($(element).attr('data-rate')));
			var style = {
				display: "block",
				width: $(element).parent().width() || $(window).width(),
				height: ($(element).parent().width() || $(window).width()) / rate
			}
			$(element).css(style);
			scope.$on('repeat_done', function() {
				// carousel init
				$(element).find(".carousel-holder").owlCarousel(options);
			});
		}
	};
});