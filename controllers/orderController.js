angular.module("app")
    .controller("orderController", function($rootScope ,$scope, orderService){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });

        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/order_m/order_m_list.html";
                case "read": return "views/order_m/order_m_read.html"; 
                case "update": return "views/order_m/order_m_update.html"; 
            }
        };
        $scope.getList = (pageNo) => {
            orderService.list(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.orders = response.data.orders;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "list";
                });
        };

        $scope.read = (order_id) =>{
            orderService.read(order_id)
                .then((response) => {
                    $scope.order = response.data.order;
                    $scope.orderlist = response.data.orderlist;
                    $scope.product = response.data.product;
                    $scope.sabang = response.data.sabang;
                    $scope.Memail = response.data.Memail;
                    $scope.view = "read";
                });
        };

        $scope.updateOrderForm = () =>{
            $scope.view = "update";
        };

        $scope.updateOrder = (order) => {
            console.log("업진입");
                console.log("업진입2");
                var formData = new FormData();
                formData.append("order_id", order.order_id);
                formData.append("order_roadaddress", order.order_roadaddress);
                formData.append("order_detailaddress", order.order_detailaddress);
                formData.append("order_state", order.order_state);
                formData.append("order_phone", order.order_phone);
                orderService.update(formData)
                .then((response) => {
                    $scope.read(order.order_id);
                    $scope.view = "read";
                })
            
        };
        
        $scope.deleteOrder = (order_id) => {
            orderService.delete(order_id)
            .then((response) => {
                $scope.getList(1);
                $scope.view = "list";
            });
        };

        $scope.cancel = () => {
            $scope.getList($scope.pager.pageNo);
            $scope.view = "list";
        };
        
        
    });