// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("signinController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		telephone: "",
		password: ""
	}
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.signin({
			telephone: $scope.input.telephone,
			password: $scope.input.password
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				localStorageService.set("token", data.token);
				$rootScope.back();
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$rootScope.is_signin = function() {
		return localStorageService.get("token") ? true : false;
	}
	$rootScope.logout = function() {
		localStorageService.remove("token");
	}
})