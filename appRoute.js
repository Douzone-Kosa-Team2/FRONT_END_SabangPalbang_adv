angular.module("app") 
.config(function($locationProvider, $routeProvider) {
   
    $routeProvider
    // 왼쪽은 라우트 경로, templateUrl은 물리적인 경로
    .when("/", {templateUrl: "views/palbang_m/palbang_m_index.html"})
    .when("/palbang_m", {templateUrl:"views/palbang_m/palbang_m_index.html", controller:"palbangController"})
   
   
    .otherwise({redirectTo: "/"});
});  