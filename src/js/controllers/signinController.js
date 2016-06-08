// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("signinController", function($scope, $rootScope, $location, userServices, errorServices, toastServices, localStorageService, config) {
	if ($rootScope.is_signin()) {
		$location.path("index").replace();
	}
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
})