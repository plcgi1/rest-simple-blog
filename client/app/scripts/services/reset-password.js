(function() {
	'use strict';


	var ResetPassword = function ($resource) {
		return {
			reset: $resource('/api/reset-password', {}, {
				reset: {
					method: 'POST',
					isArray: false
				}
			}).reset,
			confirm: $resource('/api/reset-password?access_token=:token', { token: '@token' }, {
				confirm: {
					method: 'GET',
					isArray: false
				}
			}).confirm
		};
	};
	ResetPassword.$inject = ['$resource'];

	angular
		.module("posts.services")
		.factory('ResetPassword', ResetPassword);
})();
