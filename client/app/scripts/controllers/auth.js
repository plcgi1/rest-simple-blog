(function(){
    'use strict';
    var AuthCtrl = function($scope, Auth, growl, $rootScope){
        var error = function(data){
            growl.error('Whats the fuck? May be you unknown sax?');
        };
        $scope.login = function() {
			var inputData = {
				email : $scope.email,
				password : $scope.password
			};
			Auth.login(
				inputData,
				function(data) {
					if ( data.status && data.status === 'error') {
						error();
						return;
					}
					Auth.saveLS(data);

					setTimeout(function(){
						$scope.user = Auth.user();
						location.assign('#!/');
					},500);
				},
				error
			);
		};

        $scope.getUserEmail = function(){
            var user = Auth.user();

            return user.email;
        }

        if ( location.hash.match(/logout/)) {
            Auth.logout({},function(){
                Auth.saveLS({user : {}});
                location.href = '#!/';
            });            
        }
    };
   
    angular.module('posts.controllers').controller('AuthCtrl',['$scope', 'Auth', 'growl', '$rootScope', AuthCtrl]);
})();
