angular.module("app")
    .factory("authService", function($http){
        //변수 선언
        const BASE_URL = "http://localhost:8080/auth";
        //서비스 객체 리턴
        return {
            login: function(user) {
                //const promise = $http.post(BASE_URL + "/login" , null, {params:{uid:user.uid, upassword:user.upassword}}); 
                
                //json으로 본문에 들어감
                const promise = $http.post(BASE_URL + "/login" , user); 
                return promise;
            }
        }
    });