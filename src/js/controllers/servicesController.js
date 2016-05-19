// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("servicesController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.services = {
		state: "charge"
	}
	$scope.change = function(state) {
		$scope.services.state = state;
	};
	// type:1 南洋商業銀行
	$scope.charge = {
		company: "Highway Technology Limited",
		type: "1",
		alipay: "",
		alipay_owner: "",
		rmb: "",
		hkd: ""
	}
	$scope.$watch("charge.rmb", function(n, o) {
		if (n == o) return;
		if (n == "" || n == undefined) return
		if (!parseFloat(n)) {
			errorServices.autoHide("請輸入數字")
			return;
		}
		$scope.charge.hkd = n * 1.2;
	})
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.charge({
			bank_type: "1",
			acount: $scope.charge.alipay,
			acount_name: $scope.charge.alipay_owner,
			need_from_money: $scope.charge.rmb,
			need_to_money: $scope.charge.hkd
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$scope.charge = {
					company: "Highway Technology Limited",
					type: "1",
					alipay: "",
					alipay_owner: "",
					rmb: "",
					hkd: ""
				}
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// askforpay
	// type:1 南洋商業銀行
	$scope.askforpay = {
		company: "Highway Technology Limited",
		type: "1",
		alipay: "",
		transcation_id: "",
		rmb: "",
		hkd: "0.00",
		fee: "0.00",
		total_hkd: "0.00"
	}
	$scope.$watch("askforpay.rmb", function(n, o) {
		if (n == o) return;
		if (n == "" || n == undefined) return
		if (!parseFloat(n)) {
			errorServices.autoHide("請輸入數字")
			return;
		}
		n = parseFloat(n);
		$scope.askforpay.hkd = new Number(n * 1.2).toFixed(2);
		$scope.askforpay.fee = new Number($scope.askforpay.hkd * 0.03).toFixed(2);
		$scope.askforpay.total_hkd = new Number($scope.askforpay.hkd * (1 + 0.03)).toFixed(2);
	})
	$scope.ajaxForm_1 = function() {
		toastServices.show();
		userServices.askforpay({
			pay_bank_type: "1",
			pay_name: $scope.askforpay.alipay,
			pay_num: $scope.askforpay.transcation_id,
			pay_money_RMB: $scope.askforpay.rmb,
			money_HKD: $scope.askforpay.hkd,
			total_money_HKD: $scope.askforpay.total_hkd
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$scope.askforpay = {
					company: "Highway Technology Limited",
					type: "1",
					alipay: "",
					transcation_id: "",
					rmb: "",
					hkd: "0.00",
					fee: "0.00",
					total_hkd: "0.00"
				}
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
})