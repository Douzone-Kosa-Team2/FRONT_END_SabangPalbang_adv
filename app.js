angular.module("app", ["ngRoute"])
    .config(function ($logProvider) {
        console.log("config test");
    })
    .run(function ($rootScope, $http) {
        console.log("app - run callback");
        //세션 저장소에 있는 uid, authToken을 읽기
        $rootScope.uid = sessionStorage.getItem("uid");
        $rootScope.authToken = sessionStorage.getItem("authToken");

        //$rootScope.authToken의 값의 변화를 감시
        $rootScope.$watch("authToken", (newValue) => {
            if (newValue) {
                $http.defaults.headers.common.authToken = newValue;

            } else {
                delete $http.defaults.headers.common.authToken;
            }

        });
    })

    .controller("mainController", function ($rootScope, $scope, $location, $route) {

        $scope.logout = () => {
            console.log("logout");
            $rootScope.uid = "";
            $rootScope.authToken = "";
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("authToken");
            $location.url("/");
        };

        //이전 URL과 동일한 URL 일 경우 리프레쉬 함
        $scope.reloadable = (path) => {
            if ($location.url().includes(path)) { //현재 보고 있는 화면이 갱신됨.
                $route.reload();
            }
        };
    });