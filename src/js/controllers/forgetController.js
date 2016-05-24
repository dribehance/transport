// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("forgetController", function($scope, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		telephone: "",
		smscode: "",
	}
	$scope.countdown = {
		// count: "5",
		message: "獲取驗證碼",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode_2({
			telephone: $scope.input.telephone
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message)
			} else {
				$scope.countdown.reset = true;
				errorServices.autoHide(data.message);
			}
		})
	}

	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.forget({
			telephone: $scope.input.telephone,
			tel_code: $scope.input.smscode
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
})