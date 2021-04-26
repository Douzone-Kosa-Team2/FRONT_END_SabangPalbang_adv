angular.module("app")
    .factory("memberService", function($http){ 
      
        const BASE_URL = "http://localhost:8080/member_m";
        
        return {
            listMember: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});
                return promise;
            },
            readMember: function(member_email) {
                const promise = $http.get(BASE_URL + "/" + member_email);
                return promise;
            },
            searchMember: function(target) {
                const promise = $http.get(BASE_URL + "/search/" + target);
                return promise;
            },
            updateMember: function(formData){
                const promise = $http.put(BASE_URL, formData, {headers:{"Content-Type":undefined}});
                return promise;
            },
            deleteMember: function(member_email) {
                const promise = $http.delete(BASE_URL + "/" + member_email);
                return promise;
            }
            
        }
    });