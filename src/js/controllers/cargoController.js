// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("cargoController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		number: "",
		company: "申通快遞",
		companys: ["申通快遞", "中通快遞", "順豐快遞"],
		tag: "",
		remarks: ""
	}
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.create_cargo({
			express_number: $scope.input.number,
			express_company: $scope.input.company,
			item_content: $scope.input.tag,
			remarks: $scope.remarks
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$scope.input.number = "";
				$scope.input.tag = "";
				$scope.input.remarks = "";
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})