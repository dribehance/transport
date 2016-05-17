// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("cargosMergeController", function($scope, $location, errorServices, toastServices, localStorageService, config) {
	$scope.transport = {
		way: "self",
		address_type: "business",
		preview: "hide"
	}
})