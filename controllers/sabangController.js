angular.module("app")
    .controller("sabangController", function($rootScope ,$scope, sabangService){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });

        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/sabang_m/sabang_m_list.html";
                case "read": return "views/sabang_m/sabang_m_read.html"; 
            }
        };
        $scope.getList = (pageNo) => {
            sabangService.list(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.sabang = response.data.sabang;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "list";
                });
        };

        $scope.read = (sabang_id) =>{
            sabangService.read(sabang_id)
                .then((response) => {
                    $scope.sabang = response.data.sabang;
                    $scope.productlist = response.data.productlist;
                    $scope.view = "read";
                });
        };

        $scope.battachUrl = (sabang_id) => {
            return sabangService.battachUrl(sabang_id);
          };

        $scope.cancel = () => {
            $scope.getList($scope.pager.pageNo);
            $scope.view = "list";
        };

        $scope.deleteSabang = (sabang_id) => {
            sabangService.delete(sabang_id)
            .then((response) => {
                $scope.getList(1);
                $scope.view = "list";
            });
        };
        
        $scope.kindList=["구매수", "조회수", "높은 가격순", "낮은 가격순"];
        $scope.kindVal = "구매수";
    });