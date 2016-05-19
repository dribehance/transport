// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("meInfoController", function($scope, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	userServices.query_userinfo().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.user = data.Result.UserInfo;
			$scope.user.new_email = $scope.user.email;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.ajaxForm = function() {
		if ($scope.user.password_1 != $scope.user.password_2) {
			errorServices.autoHide("兩次輸入的密碼不一致");
			return;
		}
		toastServices.show();
		userServices.modify_userinfo({
			nickname: $scope.user.nickname,
			password: $scope.user.password_1,
			email: $scope.user.new_email
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