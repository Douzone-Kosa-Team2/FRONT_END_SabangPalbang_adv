angular.module("app")
    .factory("orderService", function($http){ 
      
        const BASE_URL = "http://localhost:8080/order_m";
        
        return {
            list: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});
                return promise;
            },
            read: function(order_id) {
                const promise = $http.get(BASE_URL + "/" + order_id);
                return promise;
            },
            update: function(formData) {
                const promise = $http.put(BASE_URL, formData);
                return promise;
            },
            delete: function(order_id) {
                const promise = $http.delete(BASE_URL + "/" + order_id);
                return promise;
            }
        }
    });