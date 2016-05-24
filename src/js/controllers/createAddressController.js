// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("createAddressController", function($scope, $rootScope, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		username: "",
		telephone: "",
		provinces: ["香港"],
		citys: ["新界", "九龍", "香港島"],
		districts: {
			"新界": ["葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"],
			"九龍": ["油尖旺區", "深水涉區", "九龍城區", "黃大仙區", "觀塘區"],
			"香港島": ["灣仔區", "中西區", "東區", "南區"]
		},
		address: ""
	}
	$scope.input.province = $scope.input.provinces[0];
	$scope.input.city = $scope.input.citys[0];
	$scope.$watch("input.city", function(n, o) {
		$scope.input.districts_filter = $scope.input.districts[n];
		$scope.input.district = $scope.input.districts_filter[0];
	})
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.create_address({
			link_name: $scope.input.username,
			link_telephone: $scope.input.telephone,
			SelProvince: $scope.input.province,
			SelCity: $scope.input.city,
			SelArea: $scope.input.district,
			address: $scope.input.address
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