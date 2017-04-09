(function() {
	'use strict';


	var Register = function ($resource) {
		return {
			register: $resource('/api/register', {}, {
				register: {
					method: 'POST',
					isArray: false
				}
			}).register,
			confirm: $resource('/api/register/:hash', { hash: '@hash' }, {
				confirm: {
					method: 'GET',
					isArray: false
				}
			}).confirm
		};
	};
	Register.$inject = ['$resource'];

	angular
		.module("posts.services")
		.factory('Register', Register);
})();
