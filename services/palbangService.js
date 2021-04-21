angular.module("app")
    .factory("palbangService", function($http){ 
      
        const BASE_URL = "http://localhost:8080/palbang_m";
        
        return {
            list: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});
                return promise;
            },
            read: function(palbang_id) {
                const promise = $http.get(BASE_URL + "/" + palbang_id);
                return promise;
            },
            battachUrl: function(palbang_id) {
                return BASE_URL + "/battach/" + palbang_id;
            },
            delete: function(palbang_id) {
                const promise = $http.delete(BASE_URL + "/" + palbang_id);
                return promise;
            }
        }
    });