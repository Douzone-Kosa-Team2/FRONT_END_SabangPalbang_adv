angular.module("app")
    .controller("authController", function($scope, authService, $window, $rootScope, $location) {
        
        $scope.login = (user) => {
            console.log("1");
            authService.login(user)
            .then((response) => {
                console.log("2");
                $rootScope.uid = response.data.uid;
                $rootScope.authToken = response.data.authToken;

                sessionStorage.setItem("uid",response.data.uid);
                sessionStorage.setItem("authToken",response.data.authToken);
                //console.log($rootScope.uid);
                //console.log($rootScope.authToken);
                $location.url("/sabang_m");
            })
            .catch ((response) => {
                console.log("3");
                $window.alert("로그인 실패:" + response.data.message);
            });
        };

    });