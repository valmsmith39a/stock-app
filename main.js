'use strict';

var app = angular.module('stocks', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {url:'/', templateUrl:'./partials/home.html'})
  .state('addstocks', {url:'/addstocks', templateUrl:'./partials/addstocks.html', controller:'addStocksCtrl'})
  .state('liststocks', {url:'/liststocks', templateUrl:'./partials/liststocks.html', controller:'listStocksCtrl'})
  $urlRouterProvider.otherwise('/'); 
});

app.controller('addStocksCtrl', function($scope, $state) {
  console.log('in add stocksCtrl');
  $scope.findStock = function(){
    console.log('Find stock');
    console.log('$state', $state);
    console.log('new stock quote: ', $scope.newStock.quote);
    // Call service 
    $scope.stocks = [{quote:'aapl', name:'Apple', closingPrice:'782.23'}, {quote:'msft', name:'Microsoft', closingPrice:'72.90'}, {quote:'wmt', name:'Walmart', closingPrice:'43.23'}];
    // $state.go('home');
  };
});

app.controller('listStocksCtrl', function($scope, $state) {
  console.log('list stocks Ctrl');
  $scope.doAThing = function(){
    console.log('thing done');
    console.log('$state', $state);
    $state.go('home');
  };
});
/*
app.controller('testCtrl', function($scope, $http) {
  console.log('testCtrl');
  $http.jsonp('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL&callback=JSON_CALLBACK')   // if get error re to changing source error, we can use jsonp which wraps data in a function
  .then(function(res) {
    console.log('success', res);
  }, function(res){
    console.log('error:', res);
  });
 });
});
*/



