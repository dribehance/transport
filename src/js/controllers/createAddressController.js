// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("createAddressController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		username: "",
		telephone: "",
		provinces: ["香港"],
		citys: ["全彎區"],
		districts: ["金融街"],
		province: "香港",
		city: "全彎區",
		district: "金融街",
		address: ""
	}
})