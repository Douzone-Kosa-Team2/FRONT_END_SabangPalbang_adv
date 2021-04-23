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
                    $scope.dateUpList = response.data.dateUpList;
                    $scope.dateDownList = response.data.dateDownList;
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
                var formData = new FormData();
                formData.append("order_id", order.order_id);
                formData.append("order_zipcode", $("#zipcode").val());
                formData.append("order_roadaddress", $("#roadaddress").val());
                formData.append("order_detailaddress", $("#detailaddress").val());
                formData.append("order_state", order.order_state);
                formData.append("order_phone", order.order_phone);
                orderService.update(formData)
                .then((response) => {
                    $scope.read(order.order_id);
                    $scope.view = "read";
                })
            
        };

        $scope.getState = () => {
            switch($scope.order_state){
                case "결제대기중":
                    $scope.order_state = "결제대기중";
                case "결제완료":
                    $scope.order_state = "결제완료";
                case "배송준비중":
                    $scope.order_state = "배송준비중";
                case "배송중":
                    $scope.order_state = "배송중";
                case "배송완료":
                    $scope.order_state = "배송완료";
            }
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
        
        $scope.kindList=["주문번호", "배송상태", "날짜"];
        $scope.kindVal = "주문번호";
        

        $scope.order_state = "배송준비중";
        $scope.order_states = ["결제대기중","결제완료","배송준비중", "배송중", "배송완료"];
       
            
        $scope.date_state = "오래된 순"
        $scope.date_states = ["최신 순", "오래된 순"];
    });