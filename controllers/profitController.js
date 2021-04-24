angular.module("app")
    .controller("profitController", function($scope, profitService, $window, $rootScope, $location) {
        $scope.$on("$routeChangeSuccess", () => {
            $scope.showBestMember();
            $scope.showBestSabang();
            $scope.getmonthbuy(); 
        });

        //채정 - 멤버
        $scope.showBestMember = () => {
            console.log("showBestMember - controller ");
            profitService.showBestMember()
            .then((response) => {
                console.log("success");
                $scope.totalMemberNum = response.data.totalMemberNum;
                $scope.recentJoinNum = response.data.recentJoinNum;
                $scope.buyMemberNum = response.data.buyMemberNum;
                $scope.vipMembers = response.data.vipMembers; //list
                $scope.influencers = response.data.influencers; //list 
            });
        };

        //종현 - 사방
        $scope.showBestSabang = () => {
            console.log("come in");
            profitService.showBestSabang()
            .then((response) => {
                console.log("success");
                $scope.sabang = response.data.BestSabang;
                $scope.product = response.data.BestProduct;
            });
        };
        $scope.sattachUrl = (sabang_id) => {
            return profitService.sattachUrl(sabang_id);
        };

        $scope.pattachUrl = (product_id) => {
            return profitService.pattachUrl(product_id);
        };
        
        //민상 - 주문

        $scope.getmonthbuy = () => {
            console.log("월별판매량들어옴");
            profitService.monthbuy()
            .then((response) => {
                $scope.month3 = response.data.month3;
                $scope.month2 = response.data.month2;
                $scope.month1 = response.data.month1;
                $scope.sumtotalprice = response.data.sumtotalprice;
                $scope.totalprice3 = response.data.totalprice3;
                $scope.totalprice2 = response.data.totalprice2;
                $scope.totalprice1 = response.data.totalprice1;
                $scope.totalCount = response.data.totalCount;
                $scope.threeTotalCount = response.data.threeTotalCount;
                $scope.cardpaycount = response.data.cardpaycount;
                $scope.depositpaycount = response.data.depositpaycount;
                $scope.phonepaycount = response.data.phonepaycount;



            });
        };

    });