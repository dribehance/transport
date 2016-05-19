// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("toastServices", function() {
	return {
		show: function() {
			$(".toast").show();
		},
		hide: function() {
			$(".toast").hide();
		}
	}
});