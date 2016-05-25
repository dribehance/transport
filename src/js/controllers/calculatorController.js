// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("calculatorController", function($scope, transportServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		way: "self",
		long: "",
		wide: "",
		height: "",
		weight: ""
	};
	// query fee 汇率
	toastServices.show();
	transportServices.query_calculator_constant().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.rate = data.rateModel;
			$scope.fee = data.feeModel;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.$watch("input.long", function(n, o) {
		if (n === o || n === undefined || n == "") {
			return;
		}
		$scope.input.cubic = (parseFloat($scope.input.long) * parseFloat($scope.input.wide) * parseFloat($scope.input.height) / 6000).toFixed(2);
		if ($scope.input.cubic == "NaN") {
			$scope.input.cubic = 0;
		}
	});
	$scope.$watch("input.wide", function(n, o) {
		if (n === o || n === undefined || n == "") {
			return;
		}
		$scope.input.cubic = (parseFloat($scope.input.long) * parseFloat($scope.input.wide) * parseFloat($scope.input.height) / 6000).toFixed(2);
		if ($scope.input.cubic == "NaN") {
			$scope.input.cubic = 0;
		}
	})
	$scope.$watch("input.height", function(n, o) {
		if (n === o || n === undefined || n == "") {
			return;
		}
		$scope.input.cubic = (parseFloat($scope.input.long) * parseFloat($scope.input.wide) * parseFloat($scope.input.height) / 6000).toFixed(2);
		if ($scope.input.cubic == "NaN") {
			$scope.input.cubic = 0;
		}
	})
	$scope.$watch("input.weight", function(n, o) {
		if (n === o || n === undefined || n == "") {
			return;
		}
		$scope.calculate();
	})
	$scope.$watch("input.way", function(n, o) {
		if (n === o || n === undefined || n == "") {
			return;
		}
		$scope.calculate();
	})
	$scope.calculate = function() {
		if ($scope.input.way == "self") {
			$scope.calculate_by_self($scope.input.weight);
			return
		}
		if ($scope.input.way == "business") {
			$scope.calculate_by_business($scope.input.weight);
			return
		}
		if ($scope.input.way == "house") {
			$scope.calculate_by_house($scope.input.weight);
			return
		}
	}
	$scope.calculate_by_self = function(n) {
		if (n < $scope.fee.lastget_kg) {
			$scope.input.rmb = $scope.fee.lastget_RMB;
		} else {
			$scope.input.rmb = $scope.fee.firstget + (Math.ceil(n) - 1) * $scope.fee.lastget;
		}
	}
	$scope.calculate_by_business = function(n) {
		if (n < $scope.fee.lastsend_kg) {
			$scope.input.rmb = $scope.fee.lastsend_RMB;
		} else {
			$scope.input.rmb = $scope.fee.firstsend + (Math.ceil(n) - 1) * $scope.fee.lastsend;
		}
	}
	$scope.calculate_by_house = function(n) {
		if (n < $scope.fee.lastsend_kg) {
			$scope.input.rmb = $scope.fee.lastsend_RMB;
		} else {
			$scope.input.rmb = $scope.fee.firstsend + (Math.ceil(n) - 1) * $scope.fee.lastsend + $scope.fee.additionalFee;
		}
	}
})