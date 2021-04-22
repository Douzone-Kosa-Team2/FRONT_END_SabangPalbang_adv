angular.module("app")
    .factory("inquiryService", function($http){ 
      
        const BASE_URL = "http://localhost:8080/inquiry_m";
        
        return {
            sabanglist: function(pageNo=1) {
                return $http.get(BASE_URL, {params:{pageNo:pageNo}});
            },
            inquirylist: function(pageNo=1, sid) {
                return $http.get(BASE_URL+"/"+sid, {params:{pageNo:pageNo}});
            },
            inquiry: function(inquiry_id){
                console.log("http://localhost:8080/inquiry_m/inquiry/1");
                return $http.get(BASE_URL+"/inquiry/"+inquiry_id);
            },
            answer: function(inquiryJson){
                return $http.put(BASE_URL, inquiryJson);
            }
           
        }
    });