// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("ordersController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.preview_id = "";
	$scope.preview = function(id) {
		$scope.preview_id = id;
	}
	$scope.hide = function(id) {
		$scope.preview_id = "";
	}
})