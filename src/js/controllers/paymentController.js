// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("paymentController", function($scope, $routeParams, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		order_id: ""
	}
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.bind_to_taobao({
			order_no: $scope.input.order_id,
			cargo_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$rootScope.back();
				}, 1000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	toastServices.show();
	userServices.query_transfer({}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.banks = data.Banks;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})