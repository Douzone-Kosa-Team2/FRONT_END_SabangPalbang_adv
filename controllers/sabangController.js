angular.module("app")
    .controller("sabangController", function($rootScope ,$scope, sabangService){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });

        $scope.sabang_state = "판매중";
        $scope.sabang_states = ["판매준비중","판매중","판매중지"];
        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/sabang_m/sabang_m_list.html";
                case "create": return "views/sabang_m/sabang_m_create.html";
                case "read": return "views/sabang_m/sabang_m_read.html"; 
                case "update": return "views/sabang_m/sabang_m_update.html";

                case "createProduct": return "views/sabang_m/sabang_m_detail_create.html";
                case "updateProduct": return "views/sabang_m/sabang_m_detail_update.html";
            }
        };

        $scope.getState = () => {
            switch($scope.sabang_state){
                case "판매준비중":
                    $scope.sabang_state = "판매준비중";
                case "판매중":
                    $scope.sabang_state = "판매중";
                case "판매중지":
                    $scope.sabang_state = "판매중지";
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
        $scope.createSabangForm = () => {
            $scope.sabang = null;
            $scope.view = "create";
        };
        $scope.createSabang = (sabang) => {
            var sattach = $("#sattach")[0].files[0];
            if(sabang && sabang.sabang_name && sabang.sabang_price && sattach){
                var formData = new FormData();

                formData.append("sabang_name", sabang.sabang_name);
                formData.append("sabang_price", sabang.sabang_price);
                if(sabang.sabang_saleprice){
                    formData.append("sabang_saleprice", sabang.sabang_saleprice);

                } else {
                    formData.append("sabang_saleprice", null);
                }
                formData.append("sabang_buycount", 0);
                formData.append("sabang_viewcount", 0);
                formData.append("sabang_state", "판매준비중");

                // 파일 첨부 
                formData.append("sattach", sattach);
                
                sabangService.createSabang(formData)
                    .then((response) => {
                        $scope.getList(1);
                        $scope.view = "list";
                    });
            }
        };
        $scope.updateSabangForm = () => {
            $scope.view = "update";
        };
        $scope.updateSabang = (sabang) => {
            var sattach = $("#sattach")[0].files[0];
            if(sabang.sabang_name && sabang.sabang_price && sattach){
                var formData = new FormData();
                formData.append("sabang_id", sabang.sabang_id);
                formData.append("sabang_name", sabang.sabang_name);
                formData.append("sabang_price", sabang.sabang_price);
                if(sabang.sabang_saleprice){
                    formData.append("sabang_saleprice", sabang.sabang_saleprice);

                } else {
                    formData.append("sabang_saleprice", null);
                }
                formData.append("sabang_buycount", sabang.sabang_buycount);
                formData.append("sabang_viewcount", sabang.sabang_viewcount);
                formData.append("sabang_state", $scope.sabang_state);

                // 파일 첨부 
                formData.append("sattach", sattach);

                sabangService.updateSabang(formData)
                    .then((response) => {
                        $scope.getList(1);
                        $scope.view = "list";
                    });
            }
        };
        $scope.sattachUrl = (sabang_id) => {
            return sabangService.sattachUrl(sabang_id);
        };

        $scope.cancel = () => {
            $scope.getList($scope.pager.pageNo);
            $scope.view = "list";
        };
        $scope.cancelUpdate = (sabang_id) => {
            sabangService.read(sabang_id)
                .then((response) => {
                    $scope.sabang = response.data.sabang;
                    $scope.productlist = response.data.productlist;
                    $scope.view = "read";
                });
        };

        $scope.deleteSabang = (sabang_id) => {
            sabangService.deleteSabang(sabang_id)
            .then((response) => {
                $scope.getList(1);
                $scope.view = "list";
            });
        };
        
        $scope.kindList=["구매수", "조회수", "높은 가격순", "낮은 가격순"];
        $scope.kindVal = "구매수";


        // 상품 추가
        $scope.createProductForm = () => {
            $scope.product = null;
            $scope.view = "createProduct";
        };

        $scope.createProduct = (product) => {
            var pattach = $("#pattach")[0].files[0];
            if(product && product.product_name && product.product_price && pattach){
                var formData = new FormData();

                formData.append("product_name", product.product_name);
                formData.append("sabang_id", product.sabang_id);
                formData.append("product_price", product.product_price);
                formData.append("product_buycount", 0);
                formData.append("product_explain1", product.product_explain1);
                formData.append("product_explain2", product.product_explain2);

                // 파일 첨부 
                formData.append("pattach", pattach);
                
                sabangService.createProduct(formData)
                    .then((response) => {
                        $scope.getList(1);
                        $scope.view = "list";
                    });
            }
        };

        // 상품 갱신
        $scope.updateProductForm = (product) => {
            $scope.product = product;
            $scope.view = "updateProduct";
        };

        $scope.updateProduct = (product) => {
            var pattach = $("#pattach")[0].files[0];
            if(product && product.product_name && product.product_price && pattach){
                var formData = new FormData();
                formData.append("product_id", product.product_id);
                formData.append("product_name", product.product_name);
                formData.append("product_price", product.product_price);
                formData.append("product_explain1", product.product_explain1);
                formData.append("product_explain2", product.product_explain2);

                // 파일 첨부 
                formData.append("pattach", pattach);
                
                sabangService.updateProduct(formData)
                    .then((response) => {
                        $scope.getList(1);
                        $scope.view = "list";
                    });
            }
        };
        // 상품 삭제
        $scope.deleteProduct = (product_id) => {
            sabangService.deleteProduct(product_id)
            .then((response) => {
                $scope.getList(1);
                $scope.view = "list";
            });
        };
    });