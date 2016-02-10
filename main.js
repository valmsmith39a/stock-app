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
      console.log('stocks Found is: ', $scope.stocksFound);
      debugger;
    }); 
  }; 

  $scope.getStockData = function(stockSelected, index) {
    $scope.stockSelected = stockSelected;
    Stock.getStockData($scope)
    .then(function(stockData) {
      Stock.addStock(stockData);  
    }); // FindStock.find()... 
 }; // $scope.getStockData... 
}); // /* app.controller()... */

app.controller('listStocksCtrl', function($scope, $state, Stock) {
  console.log('list stocks Ctrl');
  $scope.stocksTracked = Stock.getAllAddedStocks(); 
  console.log('all tracked stocks', $scope.stocksTracked);
  
  $scope.deleteStock = function(index) {
    var testArray = Stock.deleteTrackedStock();
    console.log('array is now after delete', testArray);
  }; 
});

app.service('Stock', function($http) {
  this.arrayOfStocks = [];
  this.findByCompany = function($scope) {
    /* No 'Access-Control-Allow-Origin' header error. Use jsonp to work around */
    return $http.jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${$scope.stocksFound.companyInput}&callback=JSON_CALLBACK`);    
  }; 
  this.getStockData = function($scope) {
    console.log('inside get stock data');
    return $http.jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${$scope.stockSelected.Symbol}&callback=JSON_CALLBACK`);    
  };
  this.addStock = function(stockObject) {
    console.log('inside add stock'); 
    this.arrayOfStocks.push(stockObject);
    console.log('array of stocks is now: ', this.arrayOfStocks);
    return this.arrayOfStocks; 
  }; 
  this.deleteTrackedStock = function(index){
    console.log('inside delete stock');
    console.log('array of stocks BEFORE delete is: ', this.arrayOfStocks);
    this.arrayOfStocks.splice(index, 1);
    console.log('array of stocks after delete is: ', this.arrayOfStocks);
    return this.arrayOfStocks; 
  }
  this.getAllAddedStocks = function() {
    console.log('inside get all added stocks');
    console.log('this is the array of stocks in get all added stocks', this.arrayOfStocks);
    return this.arrayOfStocks;
  };
});




