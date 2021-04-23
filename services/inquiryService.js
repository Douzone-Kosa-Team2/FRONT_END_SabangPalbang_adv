angular.module("app")
    .factory("inquiryService", function($http){ 
      
        const BASE_URL = "http://localhost:8080/inquiry_m";
        
        return {
            sabanglist: function(pageNo=1) {
                return $http.get(BASE_URL, {params:{pageNo:pageNo}});
            },
            inquirylist: function(pageNo=1, sid, ansstate) {
                console.log("service에서 셋 중 하나 머나오니 : " + ansstate);
                return $http.get(BASE_URL+"/"+sid, {params:{pageNo:pageNo, ansstate:ansstate}});
            },
            inquiry: function(inquiry_id){
                return $http.get(BASE_URL+"/inquiry/"+inquiry_id);
            },
            answer: function(inquiryJson){
                return $http.put(BASE_URL, inquiryJson);
            },
            delete: function(inquiry_id){
                return $http.delete(BASE_URL+"/"+inquiry_id);
            }
        }
    });