angular.module("Transport").constant("config", {
	url: "http://120.76.41.192:8055",
	imageUrl: "http://120.76.41.192:8055/files/image?name=",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {
		invoke: "h5"
	},
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
		"payment",
		"question",
		"services",
		"signin",
		"signup",
		"search",
		"teaching",
		"tiaokuan",
		"remarks",
		"transport_scope",
		"tiaoyue"
	]
});