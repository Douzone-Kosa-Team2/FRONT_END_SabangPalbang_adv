angular.module("app")
    .controller("profitController", function($scope, profitService, $window, $rootScope, $location) {
        $scope.$on("$routeChangeSuccess", () => {
            $scope.showBestSabang();
            $scope.getmonthbuy(); 
        });

        //채정 - 멤버



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

        $scope.getmonthbuy = () => {
            console.log("월별판매량들어옴");
            profitService.monthbuy()
            .then((response) => {
                $scope.monthbuy2 = response.data.monthbuy2;
            });
        };

        //민상 - 주문
    });