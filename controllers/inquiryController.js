angular.module("app")
    .controller("inquiryController", function($rootScope ,$scope, inquiryService){
        // 사방 리스트가 먼저 뜨고 => 그 사방을 클릭했을 때 문의 내역이 좌르륵 나옴 
        // 사방 리스트에서 컬럼을 가격 뺴고 문의 내역개수 이런식으로 ... 

        // 처음 딱 index.html로 들어올 때만 라우터 변경되니까 
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getSabangList(1);
        });

        $scope.view = "sabanglist";
        $scope.getView = () => {
            switch($scope.view){
                case "sabanglist": return "views/inquiry_m/inquiry_m_sabanglist.html";
                case "inquirylist": return "views/inquiry_m/inquiry_m_inquirylist.html";
                case "inquiry": return "views/inquiry_m/inquiry_m_read.html"; 
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
        $scope.kindList=["문의수", "구매수", "높은 가격순", "낮은 가격순"];
        $scope.kindVal = "문의수";
        
        // 사방에 속한 문의 목록 가져오기 
        $scope.getInquiryList = (pageNo, sid) => {
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
        $scope.ansStatusVal = "전체답변";
        $scope.getAnsStatusVal = () => {
            console.log("지금 선택한 것 : " + $scope.ansStatusVal);
            return $scope.ansStatusVal === "전체답변"? "" : $scope.ansStatusVal;
        };

        // 문의 내역 읽기 
        $scope.getInquiry = (inquiry_id) => {
            console.log("서비스 보내기전 - 문의 내역 읽는 곳 ");
            inquiryService.inquiry(inquiry_id)
                .then((response) => {
                    console.log("서비스에서 응답 성공하면 여기");
                    console.log(response.data.inquiry);

                    $scope.inquiry = response.data.inquiry;
                    $scope.view = "inquiry";
                });
        };

        // 문의 답변 남기기 
        $scope.updateAnswer = (inquriy_anscontent, inquiriy_id) => {
            console.log("문의 사방 아이디 : " + $scope.inquiry.sid+ "답변 : " + $scope.inquiry.anscontent);
            var inquiryJson = {
                "inquiry_id": inquriy_anscontent,
                "inquriy_anscontent": inquiriy_id 
            };

            inquiryService.answer(inquiryJson)
                .then((response) => { 
                    // 응답이 성공하면 inquiry_id를 응답으로 받아야 한다. 
                    $scope.getInquiry(response.data.inquiry_id);
                    $scope.view = "inquiry";
                });
        };


    });