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
            sattachUrl: function(sabang_id) {
                return BASE_URL + "/sattach/" + sabang_id;
            },
            pattachUrl: function(product_id) {
                return BASE_URL + "/pattach/" + product_id;
            },
            createSabang: function(formData){
                const promise = $http.post(BASE_URL, formData, {headers:{"Content-Type":undefined}});
                return promise;
            },
            updateSabang: function(formData){
                const promise = $http.put(BASE_URL, formData, {headers:{"Content-Type":undefined}});
                return promise;
            },
            deleteSabang: function(sabang_id) {
                const promise = $http.delete(BASE_URL + "/" + sabang_id);
                return promise;
            },
            createProduct: function(formData) {
                const promise = $http.post(BASE_URL + "/detail", formData, {headers:{"Content-Type":undefined}});
                return promise;                                            
            },
            updateProduct: function(formData) {
                const promise = $http.put(BASE_URL + "/detail", formData, {headers:{"Content-Type":undefined}});
                return promise;
            },
            deleteProduct: function(product_id) {
                const promise = $http.delete(BASE_URL + "/detail/" + product_id);
                return promise;
            }

        }
    });