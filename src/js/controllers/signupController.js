// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("signupController", function($scope, $location, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		username: "",
		telephone: "",
		smscode: "",
		password: "",
		password_1: "",
		email: ""
	}
	$scope.countdown = {
		// count: "5",
		message: "獲取驗證碼",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode_1({
			telephone: $scope.input.telephone
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}

	$scope.ajaxForm = function() {
		if ($scope.input.password != $scope.input.password_1) {
			errorServices.autoHide("兩次輸入的密碼不一致");
			return;
		}
		toastServices.show();
		userServices.signup({
			telephone: $scope.input.telephone,
			tel_code: $scope.input.smscode,
			email: $scope.input.email,
			password: $scope.input.password,
			nickname: $scope.input.username
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$location.path("signin").replace();
				errorServices.autoHide(data.message)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})