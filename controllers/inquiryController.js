angular.module("app")
    .controller("inquiryController", function($rootScope ,$scope, inquiryService, $window){
        // 처음 딱 index.html로 들어올 때만 라우터 변경되니까 
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getSabangList(1);
        });

        $scope.view = "sabanglist";
        $scope.getView = () => {
            switch($scope.view){
                case "sabanglist": return "views/inquiry_m/inquiry_m_sabanglist.html";
                case "inquirylist": return "views/inquiry_m/inquiry_m_inquirylist.html";
                case "inquiry": return "views/inquiry_m/inquiry_m_update.html"; 
            }
        };
       
        $scope.getSabangList = (pageNo) => {
            inquiryService.sabanglist(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.sabanglist = response.data.sabangs;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "sabanglist";
                });
        };

        // 정렬 조건 바꾸기 : 문의 많은 순 
        $scope.kindList=["총문의수", "미답변수", "기답변수"];
        $scope.kindVal = "총문의수";

        
        // 사방에 속한 문의 목록 가져오기 
        $scope.getInquiryList = (pageNo, sid) => {
            $scope.sid = sid;
            inquiryService.inquirylist(pageNo, sid)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.inquirylist = response.data.inquirylist;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "inquirylist";
                });
        };

        $scope.ansStatusList = ["전체답변", "대기중", "답변완료"];
        $scope.selectVal = "전체답변"; //초기화 

        $scope.getAnsStatusVal = (selectVal) => {
            /* 하나의 페이지 안에서 필터링을 하고 있다. 
            전체 리스트를 필터링해서 애초에 가져와야 한다  */
            return selectVal === "전체답변"? "" : selectVal;  
        };

        // 문의 내역 읽기 
        $scope.getInquiry = (inquiry_id) => {
            inquiryService.inquiry(inquiry_id)
                .then((response) => {
                    $scope.inquiry = response.data;
                    $scope.view = "inquiry";
                });
        };

        // 문의 답변 남기기 
        $scope.updateAnswer = () => {
            var inquiryJson = {
                "inquiry_id": $scope.inquiry.inquiry_id,
                "inquiry_anscontent": $scope.inquiry.inquiry_anscontent
            };

            inquiryService.answer(inquiryJson)
                .then((response) => { 
                    // 응답이 성공하면 inquiry_id를 응답으로 받아야 한다. 
                    // 수정되었습니다. 뷰에 넘겨주기 
                    $scope.getInquiry(response.data);
                    $window.alert("답변이 정상적으로 등록되었습니다");
                });
        };

        // 삭제 전 확인 - 정말 삭제하시겠습니까 
        $scope.checkDelete = (inquiry_id, sid) => {
            var result = $window.confirm("정말 삭제하시겠습니까?");
            if(result){
                $scope.deleteInquiry(inquiry_id, sid);
            }else{
                $scope.getInquiryList(1, sid); // 현재 페이저를 방송해놔야 하나... 
            }
        };
        // 문의 삭제하기 
        $scope.deleteInquiry = (inquiry_id, sid) => {
            inquiryService.delete(inquiry_id)
                .then(() => {
                    $scope.getInquiryList(1, sid);
                });
        };

    });