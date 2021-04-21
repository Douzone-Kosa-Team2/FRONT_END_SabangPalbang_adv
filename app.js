angular.module("app", ["ngRoute"])
.config(function($logProvider) { 
    console.log("config test");
})
.run(function($rootScope, $http){ 
    console.log("app - run callback");
   

})

.controller("mainController", function($rootScope, $scope, $location, $route){
       
    $scope.reloadable = (path) => {
        if($location.url().includes(path)){ 
            $route.reload();   
        }
    };
});