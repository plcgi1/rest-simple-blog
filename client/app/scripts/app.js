(function() {
'use strict';
var app = angular.module('posts', [
	'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngCookies',
    'posts.controllers',
    'posts.services',
    'posts.directives',
    'angular-growl',
	'localStorageModule',
	'ngLocationUpdate'
]);
angular.module('posts.controllers', ['posts.directives']);
angular.module('posts.services', []);
angular.module('posts.directives', []);

function config($routeProvider,$sceDelegateProvider,growlProvider,$animateProvider, $locationProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider
        .when('/login', {
			templateUrl: 'views/login.html',
			controller: 'AuthCtrl'
		})
        .when('/logout', {
			templateUrl: 'views/login.html',
			controller: 'AuthCtrl'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegisterCtrl'
		})
		.when('/register/confirm/:hash', {
			templateUrl: 'views/confirm-registration.html',
			controller: 'RegisterCtrl'
		})
		.when('/reset-password', {
			templateUrl: 'views/reset-password.html',
			controller: 'AuthCtrl'
		})
		.when('/', {
			templateUrl: 'views/posts.html',
			controller: 'PostsCtrl'
		})
		.when('/posts/:_id', {
			templateUrl: 'views/post.html',
			controller: 'PostCtrl'
		})
		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'UserCtrl'
		})
		.otherwise({
			redirectTo: function(){
				if ( /(login|register)/.test(location.href) ) {
					return;
				}
				return '/';
			}
		});

	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.  Notice the difference between * and **.
		'http://*.com/**'
	]);
    
    var myDefaults = {
      /* default time to live for each notification */
      ttl: 1234,
      /* default type of notification */
      type: 'danger'
    };

    $animateProvider.classNameFilter(/animate-/);
}
config.$inject = ['$routeProvider','$sceDelegateProvider','growlProvider', '$animateProvider', '$locationProvider'];

angular
    .module('posts')
    .config(config)
    .config(['growlProvider', function (growlProvider) {
        growlProvider.globalTimeToLive(5000);
    }])
    .controller('CheckAuthCtrl',['$scope', 'Auth', function($scope, Auth){
		var user = Auth.user();

        Auth.serverIsAuth(
             { access_token: user.token },
             function (args) {
				 console.info('authed');
             },
             function (args) {
                 Auth.saveLS({});
             }
        );
    }]);
})();
