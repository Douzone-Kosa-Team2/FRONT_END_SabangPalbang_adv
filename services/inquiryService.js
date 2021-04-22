angular.module("app")
    .factory("inquiryService", function($http){ 
      
        const BASE_URL = "http://localhost:8080/inquiry_m";
        
        return {
            list: function(pageNo=1, sid) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo, sid:sid}});
                return promise;
            }
            // read: function(palbang_id) {
            //     const promise = $http.get(BASE_URL + "/" + inquiry_id);
            //     return promise;
            // },
            // battachUrl: function(palbang_id) {
            //     return BASE_URL + "/battach/" + inquiry_id;
            // },
            // delete: function(palbang_id) {
            //     const promise = $http.delete(BASE_URL + "/" + inquiry_id);
            //     return promise;
            // }
        }
    });