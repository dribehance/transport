// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("contactController", function($scope, transportServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	transportServices.query_contact({}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.contact = data.contactInfo;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})