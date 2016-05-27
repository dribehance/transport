// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("indexController", function($scope, $rootScope, userServices, transportServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	transportServices.query_banner({}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.banners = data.IndexBanners;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	toastServices.show();
	if (localStorageService.get("token")) {
		userServices.query_userinfo().then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$rootScope.user = data.Result.UserInfo;
				$rootScope.user.new_email = $rootScope.user.email;
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})