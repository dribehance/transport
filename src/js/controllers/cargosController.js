// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("cargosController", function($scope, $location, errorServices, toastServices, localStorageService, config) {
	$scope.merge = function() {
		$location.path("/cargos_merge");
	}
})