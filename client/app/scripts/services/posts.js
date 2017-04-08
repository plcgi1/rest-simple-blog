(function() {
	'use strict';


    var Posts = function ($resource, Auth) {
		var user = Auth.user();
		console.info('user.token' ,user.token);
		return {
            list: $resource('/api/posts', {}, {
                list: {
                    method: 'GET',
                    isArray: true
                }
            }).list,
			get: $resource('/api/posts/:id', { id: '@id' }, {
				get: {
					method: 'GET',
					isArray: false
				}
			}).get,
			add: $resource('/api/posts?access_token=:token', { token: user.token }, {
				add: {
					method: 'POST',
					isArray: false
				}
			}).add,
			update: $resource('/api/posts/:id?access_token=:token', { id: '@_id', token: user.token }, {
				update: {
					method: 'PUT',
					isArray: false
				}
			}).update,
			remove: $resource('/api/posts/:_id?access_token=:token', { _id: '@_id', token: user.token }, {
				remove: {
					method: 'DELETE',
					isArray: false
				}
			}).remove
        };        
    };
	Posts.$inject = ['$resource', 'Auth'];

    angular
        .module("posts.services")
        .factory('Posts', Posts);
})();
