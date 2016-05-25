// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("searchController", function($scope, $location, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		var start = $("input[name='start'").val(),
			end = $("input[name='end'").val();
		if ($scope.input.flow_id) {
			$location.path("orders").search({
				start: start,
				end: end,
				flow_id: $scope.input.flow_id
			});
		}
		if (start == "" || end == "") {
			errorServices.autoHide("選擇時間")
			return;
		}
		$location.path("orders").search({
			start: start,
			end: end,
			flow_id: $scope.input.flow_id
		});
	}
})