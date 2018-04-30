/*Mainly this file is responsible for the interaction between our html page and data.
  Console logs present in this file will be shown on the browser.*/

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    //Used whenever we are done with a particular operation
    //REFRESH FUNCTION
    var refresh = function(){
	    	$http.get('/orders').then(function(response){
	        console.log('hello'+response.data);    
	        $scope.orders = response.data;
    		$scope.order = null;﻿
    	});﻿	
    }
    var p1alert=function () {
    	alert('Your order is placed !');
    }
    var p2alert=function () {
    	alert('Please fill all the fields..');
    }
     var ralert=function () {
    	alert('Your order is cancelled !');
    }
    var ualert=function () {
    	alert('Updated Sucessfully !');
    }
    refresh();
    //PLACE FUNCTION(PLACING ORDER)
    $scope.place = function(){
    		console.log($scope.order);
    	  if($scope.order.name!=null&&$scope.order.email!=null&&$scope.order.number!=null)
    	  {
    	  	$http.post('/orders',$scope.order).then(function (response){
	    		 console.log(response);
	    		 p1alert();
	    		 refresh();
	    	});		
    	  }	  	    
    	};
    //CANCEL FUNCTION(CANCEL ORDER)
    $scope.cancel = function(id){
    	console.log(id);
    	$http.delete('/orders/'+id).then(function (response){
    		 ralert();
    		 refresh();
    	});	
    };
    //EDIT FUNCTION(EDIT ORDER)
    $scope.edit=function(id){
		  console.log(id);
		  $http.get('/orders/'+id).then(function(response){
          //puts the data in those input boxes for further updation
		  $scope.order=response.data;
		});
 	};
    //UPDATE FUNCTION(UPDATE THE DETAILS)
    $scope.update = function(){
    	console.log($scope.order._id);
    	$http.put('/orders/' + $scope.order._id,$scope.order).then(function (response){
    		 ualert();
    		 refresh();
    	});	
    };
    $scope.deselect =function(){
    	$scope.order=null;
    }
}]);
