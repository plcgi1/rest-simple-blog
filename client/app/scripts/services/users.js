(function() {
	'use strict';


	var Users = function ($resource, Auth) {
		var user = Auth.user();

		return {
			get: $resource('/api/users/:id?access_token=:token', { id: '@id', token: user.token }, {
				get: {
					method: 'GET',
					isArray: false
				}
			}).get,
			update: $resource('/api/users/:id/password?access_token=:token', { id: '@_id', token: user.token }, {
				update: {
					method: 'PUT',
					isArray: false
				}
			}).update
		};
	};
	Users.$inject = ['$resource', 'Auth'];

	angular
		.module("posts.services")
		.factory('Users', Users);
})();
