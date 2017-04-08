(function() {
	'use strict';

    var Auth = function ($resource,$rootScope,$storage) {
        
        return {
			login: $resource('/auth/local', {}, {
				login: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}).login,
			saveLS: function(data){
				var table = $storage('user');

				table.setItem('user',data);
			},
			isAuth: function(){
				var table = $storage('user');
				var user = table.getItem('user');
				var res = (user && user.email && Object.keys(user).length > 1);

				return res;
			},
			user: function(){
				var table = $storage('user');
				var res = table.getItem('user');

				if (!res) {
					return {};
				}

				return res;
			},
        	serverIsAuth: $resource('/api/users/me', {}, {
                serverIsAuth: {
                    method: 'GET',
                    isArray: false,
                    cache: false
                }
            }).serverIsAuth,

            logout: $resource('/auth/local', {}, {
                logout: {
                    method: 'DELETE',
                    isArray: false,
                    cache: false
                }
            }).logout,
			register: $resource('/api/users', {}, {
				register: {
					method: 'POST',
					isArray: false,
					cache: false
				}
			}).register
        };        
    };
    Auth.$inject = ['$resource','$rootScope','$storage'];
    
    angular
        .module("posts.services")
        .factory('Auth', Auth);
})();
