// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("transportServices", function($http, config) {
	return {
		query_contact: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/Home/contactInfo",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_banner: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/Home/bannerList",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_tutorial: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/Home/teach",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_fee: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/Home/money",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_news: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/Home/newsList",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_news_by_id: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/Home/newsDetail",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		}
	}
});