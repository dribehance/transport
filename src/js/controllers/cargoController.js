// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("cargoController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		number: "",
		company: "申通快遞",
		companys: ["申通快遞", "EMS郵政", "順豐快遞", "圓通快遞", "中通快遞", "韻達快遞", "天天快遞", "百世匯通", "優速快遞", "德邦物流", "全峰快遞", "信豐物流", "國通快遞", "快捷速遞", "宅急送速遞", "聯昊通快遞", "其他"],
		tag: "",
		remarks: ""
	}
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.create_cargo({
			express_number: $scope.input.number,
			express_company: $scope.input.company,
			item_content: $scope.input.tag,
			remarks: $scope.input.remarks
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