
var app =angular.module('gretail',['ui.bootstrap','ngRoute','toastr','blockUI','angular.chosen']);
//app.constant('URL','http://localhost:2000/');
//console.log(URL);
app.value("domain", "http://localhost:2000/");
var cmsAppFirstRun = function ($templateCache, $templateRequest, $rootScope) {
    $templateRequest('pages/topbar.html').then(function (response) {
    	console.log(response);
        $templateCache.put('top.bar', response);
        $rootScope.templatesDone = true;
    });
    $templateRequest('pages/sidebar.html').then(function (response) {
        $templateCache.put('side.bar', response);
        $rootScope.templatesSidebarDone = true;
    });
};
//app constants start 
    app.constant('RESOURCES', (function() {
  // Define your variable
  var resource = 'http://localhost:2000/';
  // Use the variable in your constants
  return {
    DOMAIN: resource,
    M_BASE_URL     :  'pages/',
    M_LOCATION_URL :  'pages/location/',
    M_STORE_URL    :  'pages/store/',
    M_SUPPLIER_URL :  'pages/supplier/',
    M_CUSTOMER_URL :  'pages/customer/',
    M_ACCOUNTS_URL :  'pages/accounts/',
    M_PRODUCTS_URL :  'pages/products/',
    M_USERS_URL    :  'pages/users/'
  }
})());
// app constant end 

//app.run(cmsAppFirstRun);
// configure our routes
app.config(function($routeProvider,RESOURCES) {
    $routeProvider

        // route for the home page
        //.when('/', {
        //    templateUrl : 'pages/home.html'
        //})
        
        // route for the about page
        .when('/', {
            templateUrl : RESOURCES.M_BASE_URL+'login.html',
            controller  : 'LoginScreen'
        })
        .when('/login', {
            templateUrl : RESOURCES.M_BASE_URL+'login.html',
            controller  : 'LoginScreen'
        })
        .when('/dashboard', {
            templateUrl : RESOURCES.M_BASE_URL+'dashboard.html',
            controller  : 'Dashboard'
        })
        
        // route for the about page
        .when('/states', {
            templateUrl : RESOURCES.M_LOCATION_URL+'states.html',
            controller  : 'StateList'
        })

        // route for the contact page
        .when('/cities', {
            templateUrl : RESOURCES.M_LOCATION_URL+'cities.html',
            controller  : 'citiesList'
        })
        .when('/company', {
            templateUrl : RESOURCES.M_LOCATION_URL+'company.html',
            controller  : 'companyList'
        })
        .when('/manufacturer', {
            templateUrl : RESOURCES.M_LOCATION_URL+'manufacturer.html',
            controller  : 'ManufacturerList'
        })
        .when('/store', {
            templateUrl : RESOURCES.M_STORE_URL+'store.html',
            controller  : 'StoreList'
        })
        .when('/storeRegion', {
            templateUrl : RESOURCES.M_STORE_URL+'storeRegion.html',
            controller  : 'StoreRegionList'
        })
        .when('/supplier', {
            templateUrl : RESOURCES.M_SUPPLIER_URL+'supplier.html',
            controller  : 'SupplierList'
        })
        .when('/supplierType', {
            templateUrl : RESOURCES.M_SUPPLIER_URL+'supplierType.html',
            controller  : 'SupplierTypeList'
        })
        .when('/supplierAccountType', {
            templateUrl : RESOURCES.M_SUPPLIER_URL+'supplierAccountType.html',
            controller  : 'SupplierAccountTypeList'
        })
        .when('/customer', {
            templateUrl : RESOURCES.M_CUSTOMER_URL+'customer.html',
            controller  : 'CustomerList'
        })
        .when('/customerType', {
            templateUrl : RESOURCES.M_CUSTOMER_URL+'customerType.html',
            controller  : 'CustomerTypeList'
        })
        .when('/customerAgeGroup', {
            templateUrl : RESOURCES.M_CUSTOMER_URL+'customerAgeGroup.html',
            controller  : 'customerAgeGroupList'
        })
         .when('/bank', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'bank.html',
            controller  : 'BankList'
        })
        .when('/bankBranch', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'bankBranch.html',
            controller  : 'BankBranchList'
        })
        .when('/cardType', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'cardType.html',
            controller  : 'CardTypeList'
        })
        .when('/paymentType', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'paymentType.html',
            controller  : 'PaymentTypeList'
        })
        .when('/accountType', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'accountType.html',
            controller  : 'AccountTypeList'
        })
        .when('/transactionType', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'transactionType.html',
            controller  : 'TransactionTypeList'
        })
        .when('/voucher', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'voucher.html',
            controller  : 'VoucherList'
        })
        .when('/voucherType', {
            templateUrl : RESOURCES.M_ACCOUNTS_URL+'voucherType.html',
            controller  : 'VoucherTypeList'
        })
        .when('/products', {
            templateUrl : RESOURCES.M_PRODUCTS_URL+'products.html',
            controller  : 'ProductList'
        })
        .when('/tax', {
            templateUrl : RESOURCES.M_PRODUCTS_URL+'tax.html',
            controller  : 'TaxList'
        })
        .when('/brand', {
            templateUrl : RESOURCES.M_PRODUCTS_URL+'brand.html',
            controller  : 'BrandList'
        })
        .when('/serialNumGenerate', {
            templateUrl : RESOURCES.M_PRODUCTS_URL+'serialNumGenerate.html',
            controller  : 'serialNumGenerateList'
        })
        .when('/uom', {
            templateUrl : RESOURCES.M_PRODUCTS_URL+'UOM.html',
            controller  : 'UOMList'
        })
        .when('/Users', {
            templateUrl : RESOURCES.M_USERS_URL+'users.html',
            controller  : 'UsersList'
        })
        .when('/UserGroup', {
            templateUrl : RESOURCES.M_USERS_URL+'userGroup.html',
            controller  : 'UserGroupList'
        })
        .when('/UserAccessTree', {
            templateUrl : RESOURCES.M_USERS_URL+'userAccessTree.html',
            controller  : 'UserAccessTreeList'
        })
        .when('/Employee', {
            templateUrl : RESOURCES.M_USERS_URL+'employee.html',
            controller  : 'EmployeeList'
        })
        .when('/ScreenTree', {
            templateUrl : RESOURCES.M_USERS_URL+'screenTree.html',
            controller  : 'ScreenTreeList'
        });
        
});

//app.run(function (authentication, $rootScope, $location) {
//    $rootScope.$on('$routeChangeStart', function (evt) {
//        if (!authentication.isAuthenticated) {
//            $location.url("/login");
//        }
//        evt.preventDefault();
//    });
//})
