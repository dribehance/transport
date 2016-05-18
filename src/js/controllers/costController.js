// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("costController", function($scope, transportServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	transportServices.query_fee({}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.fee = data.money;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})