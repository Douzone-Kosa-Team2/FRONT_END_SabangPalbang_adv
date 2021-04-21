angular.module("app") 
.config(function($locationProvider, $routeProvider) {
   
    $routeProvider
    // 왼쪽은 라우트 경로, templateUrl은 물리적인 경로
    .when("/", {templateUrl: "views/exam01_home.html"})
   
    //.when("/exam22_filter", {templateUrl: "views/exam22_filter.html", controller:"exam22Controller"})
   
    
   
    .otherwise({redirectTo: "/"});
});  