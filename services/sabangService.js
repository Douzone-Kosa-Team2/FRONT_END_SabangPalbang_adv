angular.module("app")
    .factory("sabangService", function($http){ 
      
        const BASE_URL = "http://localhost:8080/sabang_m";
        
        return {
            list: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});
                return promise;
            },
            read: function(sabang_id) {
                const promise = $http.get(BASE_URL + "/" + sabang_id);
                return promise;
            },
            battachUrl: function(sabang_id) {
                return BASE_URL + "/battach/" + sabang_id;
            },
            delete: function(sabang_id) {
                const promise = $http.delete(BASE_URL + "/" + sabang_id);
                return promise;
            }
        }
    });