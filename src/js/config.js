angular.module("Transport").constant("config", {
	url: "http://",
	imageUrl: "http://",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {},
	interceptor: [
		"about",
		"account",
		"address",
		"askforpay_records",
		"calculator",
		"cargo",
		"cargos",
		"cargos_merge",
		"charge_records",
		"contact",
		"cost",
		"create_address",
		"forget",
		"index",
		"info",
		"infos",
		"me_info",
		"order",
		"orders",
		"privacy",
		"question",
		"services",
		"signin",
		"signup"
	]
});