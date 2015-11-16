
//common service/factory
app.factory("CommonMasters", ['$http',function($http){  
 /*This is an example of how you can process and return the required result*/
 domain='http://localhost:2000/';
    var obj = {};
    //state factory
    obj.getallActiveStates = function(){
        console.log(domain);
        return $http.post(domain+'getstatelist?status=Active');
    }
    //city factory
    obj.getallActiveCities = function(stateid){
              condtion="";          
      if((stateid != "")&&((stateid != null)))
                {
                   condtion="&stateid="+stateid; 
                }
                AllActiveCityList={};
               return  $http.post(domain+'getcitylist?status=Active'+condtion);
               
    }
    //manufacturer factory
    obj.getallActiveManufactIdName = function(){
        return $http.post(domain+'getmanufactdetails?status=Active');
    }
    //company factory
    obj.getallActiveCompany = function(){
        return $http.post(domain+'getcompanydetails?status=Active&isfulllist=');
    }
    obj.getallActiveOfficeType = function(){
        return $http.post(domain+'getcompanydetails?status=Active&isfulllist=');
    }
 return obj;
}]);

//utils
app.factory('Utils', function() {
  var service = {
     isUndefinedOrNull: function(obj) {
         return angular.isDefined(obj) || obj===null;
     }
    
  }
  
  return service;
});