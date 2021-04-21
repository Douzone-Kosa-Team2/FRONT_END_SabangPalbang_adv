angular.module("app")
    .controller("palbangController", function($rootScope ,$scope, palbangService){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });


        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/palbang_m/palbang_m_list.html";
                case "read": return "views/palbang_m/palbang_m_read.html";
                
            }
        };

       

        $scope.getList = (pageNo) => {
            palbangService.list(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.palbang = response.data.palbang;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "list";
                });
        };

        $scope.read = (palbang_id) =>{
            palbangService.read(palbang_id)
                .then((response) => {
                    $scope.palbang = response.data;
                    $scope.view = "read";
                });
        };

        $scope.battachUrl = (palbang_id) => {
            return palbangService.battachUrl(palbang_id);
          };
      

       

        $scope.cancel = () => {
            $scope.getList($scope.pager.pageNo);
            $scope.view = "list";
        };

        $scope.deleteBoard = (palbang_id) => {
            palbangService.delete(palbang_id)
            .then((response) => {
                $scope.getList(1);
                $scope.view = "list";
            });
        };
    });