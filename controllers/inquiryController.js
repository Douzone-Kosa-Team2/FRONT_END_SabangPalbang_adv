angular.module("app")
    .controller("inquiryController", function($rootScope ,$scope, sabangService, inquiryService){
        // 사방 리스트가 먼저 뜨고 => 그 사방을 클릭했을 때 문의 내역이 좌르륵 나옴 
        // 사방 리스트에서 컬럼을 가격 뺴고 문의 내역개수 이런식으로 ... 

        // 처음 딱 index.html로 들어올 때만 라우터 변경되니까 
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getSabangList(1);
        });

        $scope.view = "sabanglist";
        $scope.getView = () => {
            console.log("getView() 들어옴 ");
            switch($scope.view){
                case "sabanglist": return "views/inquiry_m/inquiry_m_sabanglist.html";
                case "inquirylist": return "views/inquiry_m/inquiry_m_inquirylist.html";
                
                //case "read": return "views/inquiry_m/inquiry_m_read.html"; 
            }
        };
       
        $scope.getSabangList = (pageNo) => {
            console.log("getSabangList() 들어옴 ");
            sabangService.list(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.sabang = response.data.sabang;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "sabangList";
                });
        };

        // 사방에 속한 문의 목록 가져오기 
        // $scope.getInquiryList = (pageNo) => {
        //     inquiryService.list(pageNo, sid)
        //         .then((response) => {
        //             $scope.pager = response.data.pager;
        //             $scope.sabang = response.data.sabang;
        //             $scope.pageRange = [];
        //             for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
        //                 $scope.pageRange.push(i)
        //             }
        //             $scope.view = "inquiryList";
        //         });
        // };




    });