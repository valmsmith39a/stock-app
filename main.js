'use strict';

var app = angular.module('stocks', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {url:'/', templateUrl:'./partials/home.html'})
  .state('addstocks', {url:'/addstocks', templateUrl:'./partials/addstocks.html', controller:'addStocksCtrl'})
  .state('liststocks', {url:'/liststocks', templateUrl:'./partials/liststocks.html', controller:'listStocksCtrl'})
  $urlRouterProvider.otherwise('/'); 
});

app.controller('addStocksCtrl', function($scope, $state, Stock) {
  $scope.findStock = function() {
    Stock.findByCompany($scope)
    .then(function(stocksFound) {
      $scope.stocksFound = stocksFound.data;
    }); 
  }; 

  $scope.getStockData = function(stockSelected, index) {
    $scope.stockSelected = stockSelected;
    Stock.getStockData($scope)
    .then(function(stockData) {
      Stock.addStock(stockData);  
    }); 
  }; 
}); 

app.controller('listStocksCtrl', function($scope, $state, Stock) {
  $scope.stocksTracked = Stock.getAllAddedStocks(); 
  $scope.deleteStock = function(index) {
    Stock.deleteTrackedStock();
  }; 
});

app.service('Stock', function($http) {
  this.arrayOfStocks = [];

  this.findByCompany = function($scope) {
    /* No 'Access-Control-Allow-Origin' header error. Use jsonp to work around */
    return $http.jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${$scope.stocksFound.companyInput}&callback=JSON_CALLBACK`);    
  };

  this.getStockData = function($scope) {
    return $http.jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${$scope.stockSelected.Symbol}&callback=JSON_CALLBACK`);    
  };

  this.addStock = function(stockObject) {
    var repeatStock = this.arrayOfStocks.find(function(item, index){
      if(item.data.Symbol === stockObject.data.Symbol){
        return item; 
      }
    });
    if(!repeatStock) this.arrayOfStocks.push(stockObject);    
    return this.arrayOfStocks; 
  }; 

  this.deleteTrackedStock = function(index){   
    this.arrayOfStocks.splice(index, 1);
    return this.arrayOfStocks; 
  };

  this.getAllAddedStocks = function() {
    return this.arrayOfStocks;
  };
});




