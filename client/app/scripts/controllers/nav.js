(function(){
    'use strict';
   
    var NavCtrl = function($scope,$rootScope, Auth){
        var user = Auth.user();

        if (user.id)
            user = user.id;

        $scope.data = [
			{ path : '#!/posts', title : 'Posts', show : true },
            { path : '#!/posts/manager', title : '', show : (Auth.isAuth()), cb : function(){return Auth.isAuth()} }
        ];
        
        var updateData = function(){
			$scope.data.forEach(function (row) {
				if (typeof row.cb === 'function' ) {
					row.show = row.cb();
				}
            });
        };
                
        $rootScope.$on('$routeChangeStart',function(){            
            updateData();
        });

        $rootScope.$on('$routeChangeSuccess',function(){
            $scope.hideMe = false;
            if( location.hash === '#!/' ) {
                $scope.hideMe = true;    
            }
            
            updateData();
        });

        $scope.isAuth = Auth.isAuth;
        $scope.user = Auth.user();

        updateData();
    };
        
    angular.module('posts.controllers').controller('NavCtrl',NavCtrl,['$scope', '$rootScope', 'Auth']);
})();
