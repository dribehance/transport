// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("indexController", function($scope, transportServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	transportServices.query_banner({}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.banners = data.IndexBanners;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})