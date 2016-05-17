// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("servicesController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.services = {
		state: "charge"
	}
	$scope.change = function(state) {
		$scope.services.state = state;
	}
})