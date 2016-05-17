// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").directive('dribehanceHeader', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: "templates/header.html",
		scope: {
			title: "="
		},
		link: function(scope, element, attrs) {
			// function body
			scope.back = function() {
				$rootScope.back();
			}
		}
	};
});