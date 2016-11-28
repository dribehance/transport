// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("chargeController", function($scope, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {}
	$scope.bank_types = ["南洋商業銀行043-495-1-043129-7"];
	$scope.input.bank_type = $scope.bank_types[0];
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.charge_balance({
			// bank_type: $scope.input.bank_type,
			c_money: $scope.input.rmb
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$rootScope.back();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})