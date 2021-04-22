angular.module("app") 
.config(function($locationProvider, $routeProvider) {
   
    $routeProvider
    // 왼쪽은 라우트 경로, templateUrl은 물리적인 경로
    .when("/", {templateUrl: "views/palbang_m/palbang_m_index.html"})
    .when("/sabang_m", {templateUrl:"views/sabang_m/sabang_m_index.html", controller:"sabangController"})
    .when("/palbang_m", {templateUrl:"views/palbang_m/palbang_m_index.html", controller:"palbangController"})
    .when("/inquiry_m", {templateUrl:"views/inquiry_m/inquiry_m_index.html", controller:"inquiryController"})
   
   
    .otherwise({redirectTo: "/"});
});  