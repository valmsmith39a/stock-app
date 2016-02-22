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
