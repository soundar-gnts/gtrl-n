//login screen
//states start
app.controller("LoginScreen",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
    alert("hi");
   $("#header").hide();
   $("#sidebar").hide();
   $("#sidebar-bg").hide();
});
//states start
app.controller("StateList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
	//App.init();
        $scope.search={};
        init=0;
	$scope.LoadState=function(cond){
            console.log(cond);
            if((cond == "")||(cond == null))
             blockUI.start();
         condtion="";
            if(($scope.search.statename !="")&&($scope.search.statename !=null))
            {
                condtion +="&statename="+$scope.search.statename;
            }
             if(($scope.search.status !="")&&($scope.search.status !=null))
            {
                condtion +="&status="+$scope.search.status;
            }
		$http.post(RESOURCES.DOMAIN+'getstatelist?isfulllist='+condtion).success(function(res){
			//var data=res.data;
			$scope.StateList=res.data;
			
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.StateList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.StateList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                if((cond == "")||(cond == null))
                 blockUI.stop(); 
	};
	// add state
	$scope.state={};
	$scope.AddState=function(){
		//var statename=$scope.
		
		//console.log($scope.state);
		var stateId_string="";
		if($scope.state.state_id != "")
			{
			stateId_string="&stateid="+$scope.state.state_id;
			console.log($scope.state);
			}
		var dataString="?statename="+$scope.state.statename+"&status="+$scope.state.status+"&lastupdatedby=Soundar"+stateId_string;
		
		$http.post(RESOURCES.DOMAIN+'saveorupdatestate'+dataString).success(function(res){
			//console.log(res);
			$scope.LoadState();	
			if(res.status)
			{
				$('#modal-AddState').modal('hide');
				$("#AddStateForm")[0].reset();
				toastr.success(res.message,'Success',{closeButton:true,positionClass:'toastr-top-center'});
				
				}
			else
				{
				toastr.error(res.message,'Failed');
				}
		});
	};
	$scope.EditStateProcess=function(statelist){
		console.log(statelist);
		$scope.state.statename=statelist.state_name;
		$scope.state.state_id=statelist.state_id;
		$('#state_status > option').each(function(){
			 if($(this).text()==statelist.status) $(this).parent('select').val($(this).val())
			 });
		/*$("#state_id").val(statelist.state_id);
		$("#state_name").val(statelist.state_name);
		$('#state_status > option').each(function(){
			 if($(this).text()==statelist.state_name) $(this).parent('select').val($(this).val())
			 })*/
	};
	$scope.LoadState();
        init=1;
});
//end states

//start cities
app.controller("citiesList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,CommonMasters,RESOURCES){
//$scope.ActiveStateList={};
   // console.log(RESOURCES);
   $scope.selectedState="";
   $scope.selectedcityname="";
   $scope.selectedstatus="";
            $scope.LoadActiveStates=function(RESOURCES){
                 CommonMasters.getallActiveStates().success(function(res){ 
            $scope.AllActiveStateList = res.data;
            });
            };    
	$scope.LoadCities=function(){
            condtion="";
            if($scope.selectedState !="")
            {
                condtion +="&stateid="+$scope.selectedState;
            }
             if($scope.selectedcityname !="")
            {
                condtion +="&cityname="+$scope.selectedcityname;
            }
            if($scope.selectedstatus !="")
            {
                condtion +="&status="+$scope.selectedstatus;
            }
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getcitylist?isfulllist='+condtion).success(function(res){
			//var data=res.data;
			$scope.CityList=res.data;
			//console.log($scope.CityList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.CityList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.CityList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	// add state
	$scope.city={};
	$scope.AddCity=function(){
		//var statename=$scope.
		
		//console.log($scope.city);
		var cityId_string="";
		if(($scope.city.cityid != "") && ($scope.city.cityid != null) )
			{
			cityId_string="&cityid="+$scope.city.cityid;
			
			}
                        
		var dataString="?cityname="+$scope.city.cityname+"&stateid="+$scope.city.stateid+"&status="+$scope.city.status+"&lastupdatedby=Soundar"+cityId_string;
		console.log(dataString);
		$http.post(RESOURCES.DOMAIN+'saveorupdatecity'+dataString).success(function(res){
			//console.log(res);
			$scope.LoadCities();	
			if(res.status)
			{
				$('#modal-Addcity').modal('hide');
				$("#AddCityForm")[0].reset();
				toastr.success(res.message,'Success',{closeButton:true,positionClass:'toastr-top-center'});
				
				}
			else
				{
				toastr.error(res.message,'Failed');
				}
		});
	};
        $scope.state={};
	$scope.EditStateProcess=function(statelist){
		console.log(statelist);
		$scope.state.statename=statelist.state_name;
		$scope.state.state_id=statelist.state_id;
		$('#state_status > option').each(function(){
			 if($(this).text()==statelist.status) $(this).parent('select').val($(this).val())
			 });
		/*$("#state_id").val(statelist.state_id);
		$("#state_name").val(statelist.state_name);
		$('#state_status > option').each(function(){
			 if($(this).text()==statelist.state_name) $(this).parent('select').val($(this).val())
			 })*/
	};
        
        $scope.LoadActiveStates();
        $scope.LoadCities();
});
// end cities
//start company
app.controller("companyList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
$scope.CompanyList={};
  $scope.form={}; 
  $scope.form.companyname="";  
  $scope.LoadActiveStates=function(){
                 $http.post(RESOURCES.DOMAIN+'getstatelist?status=Active').success(function(res){
			//var data=res.data;
			$scope.AllActiveStateList=res.data;
                       // console.log($scope.ActiveStateList);
		});
            }; 
  $scope.LoadActiveCities=function(stateid){
      condtion="";          
      if((stateid != "")&&((stateid != null)))
                {
                   condtion="&stateid="+stateid; 
                }
                 $http.post(RESOURCES.DOMAIN+'getcitylist?status=Active'+condtion).success(function(res){
			//var data=res.data;
			$scope.AllActiveCityList=res.data;
                       
		});
            }; 
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getcompanydetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.CompanyList=res.data;
                        //console.log($scope.form.companyname);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.CompanyList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.CompanyList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
        $scope.EditCompanyProcess=function(company_id){
            $scope.form={};
             blockUI.start(); 
             $http.post(RESOURCES.DOMAIN+'getcompanydetails?companyid='+company_id+"&isfulllist=").success(function(res){
             //$scope.CompanyList=res.data;
             console.log(res.data[0]);
                        $scope.form.companyid=res.data[0].company_id;
                        $scope.form.companyname=res.data[0].company_name;
                        $scope.form.stateid=res.data[0].state_id;
                        $scope.form.cityid=res.data[0].city_id;
                        $scope.form.pincode=res.data[0].pincode;
                        $scope.form.landline=res.data[0].landline_no;
                        $scope.form.mobile=res.data[0].mobile_no;
                        $scope.form.fax_no=res.data[0].fax_no;
                        $scope.form.contact_person=res.data[0].contact_person;
                        $scope.form.contactno=res.data[0].contact_no;
                        $scope.form.email_id=res.data[0].email_id;
                        $scope.form.address=res.data[0].address;
                        $scope.form.remarks=res.data[0].remarks;
                        $scope.form.status=res.data[0].status;
                        $scope.LoadActiveCities($scope.form.stateid);
             });
              blockUI.stop();
         };
          $scope.UpdateorSaveCompany=function(){
              var companyId_string="";
		if(($scope.form.companyid != "") && ($scope.form.companyid != null) )
			{
			companyId_string="&companyid="+$scope.form.companyid;
			
			}
              dataString="?companyname="+$scope.form.companyname+"&address="+$scope.form.address+"&pincode="+$scope.form.pincode
              +"&landlineno="+$scope.form.landline+"&mobileno="+$scope.form.mobile+"&faxno="+$scope.form.fax_no+"&emailid="+$scope.form.email_id
      +"&contactperson="+$scope.form.contact_person+"&contactno="+$scope.form.contactno+"&remarks="+$scope.form.remarks
      +"&status="+$scope.form.status+"&stateid="+$scope.form.stateid+"&cityid="+$scope.form.cityid+"&updateddate="+$filter('date')(new Date(), 'yyyy-MM-dd')
      +"&updatedby=soundar"+companyId_string;
              $http.post(RESOURCES.DOMAIN+'savecompanydetails'+dataString).success(function(res){
              $scope.LoadActiveCities();
         $scope.LoadActiveStates();
	$scope.InitLoad();	
			if(res.status)
			{
				$('#modal-edit_company').modal('hide');
				$("#UpdateorSaveCompanyForm")[0].reset();
				toastr.success(res.message,'Success',{closeButton:true,positionClass:'toastr-top-center'});
				
				}
			else
				{
				toastr.error(res.message,'Failed');
				}
              });
          };
         $scope.LoadActiveCities();
         $scope.LoadActiveStates();
	$scope.InitLoad();
});
//end company 
//start manufacturer
app.controller("ManufacturerList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,CommonMasters,RESOURCES){
//$scope.ActiveStateList={};	
$scope.AllActiveStateList={};
$scope.AllActiveCityList={};
$scope.AllActiveManufacturer={};
$scope.AllActiveCompany={};
$scope.search={};

   $scope.LoadActiveStates=function(){
                 CommonMasters.getallActiveStates().success(function(res){ 
            $scope.AllActiveStateList = res.data;
            });
            };
  $scope.LoadActiveCities=function(stateid){
       CommonMasters.getallActiveCities().success(function(res){ 
            $scope.AllActiveCityList = res.data;
            });

            }; 
  $scope.LoadActiveManufactIdName=function(){
                 CommonMasters.getallActiveManufactIdName().success(function(res){ 
            $scope.AllActiveManufacturer = res.data;
             });
            };
         $scope.LoadActiveCompanyIdName=function(){
                 CommonMasters.getallActiveCompany().success(function(res){ 
            $scope.AllActiveCompany = res.data;
            console.log($scope.AllActiveCompany);
            });
            };           
	 $scope.InitLoad=function(cond){
               if((cond == "")||(cond == null))
             blockUI.start(); 
             condtion="";
            if(($scope.search.manufactCode !="")&&($scope.search.manufactCode !=null))
            {
                condtion +="&manufgcode="+$scope.search.manufactCode;
            }
             if(($scope.search.manufactName !="")&&($scope.search.manufactName !=null))
            {
                condtion +="&manufgname="+$scope.search.manufactName;
            }
            if(($scope.search.manufactStatus !="")&&($scope.search.manufactStatus !=null))
            {
                condtion +="&status="+$scope.search.manufactStatus;
            }
           
		$http.post(RESOURCES.DOMAIN+'getmanufactdetails?isfulllist='+condtion).success(function(res){
			//var data=res.data;
			$scope.ManufacturerList=res.data;
			//console.log($scope.CityList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.ManufacturerList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.ManufacturerList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 // if((cond == "")||(cond == null))
                    blockUI.stop(); 
	};
         $scope.EditManufacturProcess=function(manufgid){
            $scope.form={};
             blockUI.start(); 
             $http.post(RESOURCES.DOMAIN+'getmanufactdetails?manufgid='+manufgid+"&isfulllist=").success(function(res){
             //$scope.CompanyList=res.data;
             console.log(res.data[0]);
                        $scope.form.officetype=res.data[0].office_type;
                        $scope.form.manufgid=res.data[0].manufg_id;
                        $scope.form.manufgcode=res.data[0].manufg_code;
                        $scope.form.manufgname=res.data[0].manufg_name;
                        $scope.form.stateid=res.data[0].state_id;
                        $scope.form.cityid=res.data[0].city_id;
                        $scope.form.address=res.data[0].address;
                        $scope.form.pincode=res.data[0].pincode;
                        $scope.form.landlineno=res.data[0].landline_no;
                        $scope.form.mobileno=res.data[0].mobile_no;
                        $scope.form.faxno=res.data[0].fax_no;
                        $scope.form.emailid=res.data[0].email_id;
                        $scope.form.contactperson=res.data[0].contact_person;
                        $scope.form.contactno=res.data[0].contact_no;
                        $scope.form.remarks=res.data[0].remarks;
                        $scope.form.status=res.data[0].status;
                        $scope.form.parentid=res.data[0].parent_id;
                        $scope.form.companyid=res.data[0].company_id;
                         
                        //$scope.LoadActiveCities($scope.form.stateid);
             });
              blockUI.stop();
         };
         
         // save/update manufacturer
           $scope.UpdateorSaveManufacturer=function(){
              var manufId_string="";
		if(($scope.form.manufgid != "") && ($scope.form.manufgid != null) )
			{
			manufId_string="&manufgid="+$scope.form.manufgid;
			
			}
              dataString="?officetype="+$scope.form.officetype+"&manufgcode="+$scope.form.manufgcode+"&manufgname="+$scope.form.manufgname
              +"&address="+$scope.form.address+"&pincode="+$scope.form.pincode+"&landlineno="+$scope.form.landlineno+"&mobileno="+$scope.form.mobileno
      +"&faxno="+$scope.form.faxno+"&emailid="+$scope.form.emailid+"&contactperson="+$scope.form.contactperson
      +"&contactno="+$scope.form.contactno+"&remarks="+$scope.form.remarks+"&status="+$scope.form.status+"&stateid="+$scope.form.stateid
      +"&cityid="+$scope.form.cityid+"&parentid="+$scope.form.parentid+"&companyid="+$scope.form.companyid+"&updateddate="+$filter('date')(new Date(), 'yyyy-MM-dd')
      +"&updatedby=soundar"+manufId_string;
      console.log(dataString);
              $http.post(RESOURCES.DOMAIN+'savemanufacdetails'+dataString).success(function(res){
         		if(res.status)
			{
				$('#modal-addEdit-Manufacturer').modal('hide');
				$("#manufacturerAddUpdate")[0].reset();
				toastr.success(res.message,'Success',{closeButton:true,positionClass:'toastr-top-center'});
				
				}
			else
				{
				toastr.error(res.message,'Failed');
				}
        $scope.LoadActiveCompanyIdName();
         $scope.LoadActiveManufactIdName();
         $scope.LoadActiveCities("");
         $scope.LoadActiveStates();
	 $scope.InitLoad();
              });
          };
        
        
         $scope.LoadActiveCompanyIdName();
         $scope.LoadActiveManufactIdName();
         $scope.LoadActiveCities("");
         $scope.LoadActiveStates();
	 $scope.InitLoad();
});
// end manufacturer

//start Store
app.controller("StoreList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   $scope.search={};
           
	$scope.InitLoad=function(cond){
            if((cond == "")||(cond == null))
             blockUI.start(); 
              condtion="";
            if(($scope.search.storecode !="")&&($scope.search.storecode !=null))
            {
                condtion +="&storecode="+$scope.search.storecode;
            }
             if(($scope.search.storename !="")&&($scope.search.storename !=null))
            {
                condtion +="&storename="+$scope.search.storename;
            }
            if(($scope.search.status !="")&&($scope.search.status !=null))
            {
                condtion +="&status="+$scope.search.status;
            }
		$http.post(RESOURCES.DOMAIN+'getstorelist?isfulllist='+condtion).success(function(res){
			//var data=res.data;
			$scope.StoreList=res.data;
			//console.log($scope.CityList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.StoreList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.StoreList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end Store

//start Storeregion
app.controller("StoreRegionList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getstoreregionlist?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.StoreRegionList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.StoreRegionList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.StoreRegionList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end Storeregion


//start supplier
app.controller("SupplierList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getsupplierdetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.SupplierList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.SupplierList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.SupplierList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end supplier

//start supplierType
app.controller("SupplierTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getsuppliertypedetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.SupplierTypeList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.SupplierTypeList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.SupplierTypeList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end supplierType

//start supplierType
app.controller("SupplierAccountTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getsupplieraccounttypedetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.SupplierAccountTypeList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.SupplierAccountTypeList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.SupplierAccountTypeList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end supplierType

//start customer
app.controller("CustomerList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getcustomerdetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.CustomerList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.CustomerList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.CustomerList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end customer

//start customerType
app.controller("CustomerTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getcustomertypedetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.CustomerTypeList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.CustomerTypeList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.CustomerTypeList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end customerType

//start customer Age Group
app.controller("customerAgeGroupList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getcustagegroupdetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.CustomerAgeGroupList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.CustomerAgeGroupList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.CustomerAgeGroupList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
	$scope.InitLoad();
});
// end customer Age Group

//start Bank
app.controller("BankList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getbankdetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.BankList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.BankList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.BankList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
       
	$scope.InitLoad();
});
// end bank

//start Bank Branch
app.controller("BankBranchList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getbankbranchdetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.BankBranchList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.BankBranchList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.BankBranchList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
        //load active banks
       $scope.LoadActiveBanks=function(){
                 $http.post(RESOURCES.DOMAIN+'getbankdetails?status=Active').success(function(res){
			//var data=res.data;
			$scope.ActiveBankList=res.data;
                       });
            };  
         $scope.LoadActiveBanks();
	$scope.InitLoad();
});
// end bank Branch
 
 //start Card Type
app.controller("CardTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getcardtypelist?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.CardTypeList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.CardTypeList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.CardTypeList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
        
	$scope.InitLoad();
});
// end Card Type

 //start Card Type
app.controller("PaymentTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
		$http.post(RESOURCES.DOMAIN+'getcardtypelist?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.CardTypeList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.CardTypeList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.CardTypeList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
       
	$scope.InitLoad();
});
// end Card Type

//start Account Type
app.controller("AccountTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
//		$http.post("http://localhost:2000/getcardtypelist?isfulllist=").success(function(res){
//			//var data=res.data;
//			$scope.CardTypeList=res.data;
//			//console.log($scope.StoreRegionList);
//				// pagination controls
//				$scope.currentPage = 1;
//				$scope.totalItems = $scope.CardTypeList.length;
//				$scope.entryLimit = 10; // items per page
//				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
//				// $watch search to update pagination
//				$scope.$watch('search', function (newVal, oldVal) {
//				$scope.filtered = filterFilter($scope.CardTypeList, newVal);
//				$scope.totalItems = $scope.filtered.length;
//				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
//				$scope.currentPage = 1;
//				}, true);
//				
//		});
                 blockUI.stop(); 
	};
       
	$scope.InitLoad();
});
// end account Type

//start Transaction Type
app.controller("TransactionTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
                $http.post(RESOURCES.DOMAIN+'gettxnstypedetails?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.TransactionTypeList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.TransactionTypeList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.TransactionTypeList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
       
	$scope.InitLoad();
});
// end Transaction Type

//start Voucher
app.controller("VoucherList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
                $http.post(RESOURCES.DOMAIN+'getvoucherlist?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.VoucherList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.VoucherList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.VoucherList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
        $scope.LoadActiveVoucherType=function(){
                 $http.post(RESOURCES.DOMAIN+'getvouchertypelist?status=Active').success(function(res){
			//var data=res.data;
			$scope.AllActiveVoucherType=res.data;
                        console.log($scope.AllActiveVoucherType);
		});
            }; 
        $scope.LoadActiveVoucherType();    
	$scope.InitLoad();
});
// end Voucher

//start Voucher Type
app.controller("VoucherTypeList",function($filter,$scope,$http,$rootScope,filterFilter,toastr,blockUI,RESOURCES){
//$scope.ActiveStateList={};	
   
           
	$scope.InitLoad=function(){
             blockUI.start(); 
                $http.post(RESOURCES.DOMAIN+'getvouchertypelist?isfulllist=').success(function(res){
			//var data=res.data;
			$scope.VoucherTypeList=res.data;
			//console.log($scope.StoreRegionList);
				// pagination controls
				$scope.currentPage = 1;
				$scope.totalItems = $scope.VoucherTypeList.length;
				$scope.entryLimit = 10; // items per page
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				// $watch search to update pagination
				$scope.$watch('search', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.VoucherTypeList, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
				}, true);
				
		});
                 blockUI.stop(); 
	};
        
            
	$scope.InitLoad();
});
// end Voucher Type

app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});

