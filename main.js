'use strict';

var app = angular.module('stocks', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {url:'/', templateUrl:'./partials/home.html'})
  .state('addstocks', {url:'/addstocks', templateUrl:'./partials/addstocks.html', controller:'addStocksCtrl'})
  .state('liststocks', {url:'/liststocks', templateUrl:'./partials/liststocks.html', controller:'listStocksCtrl'})
  $urlRouterProvider.otherwise('/'); 
});

app.controller('addStocksCtrl', function($scope, $state, FindStock) {
  console.log('in add stocksCtrl');
  $scope.findStock = function(){
    console.log('Find stock');
    console.log('$state', $state);
    FindStock.find($scope);

    
  };
})

/*
app.controller('listStocksCtrl', function($scope, $state) {
  console.log('list stocks Ctrl');
  $scope.doAThing = function(){
    console.log('thing done');
    console.log('$state', $state);
    $state.go('home');
  };
});
*/

app.service('FindStock', function() {
  this.find = function($scope) {
    console.log('inside FindStock this.find()');
  
    debugger;
    console.log('stock quote is: ', ($scope.newStock.quote));

  } 
  /*
  $localStorage.$default({
    potions:[]
  });
  this.list = potions;
  this.list = [
    {name:'growth', color:'green', cost:20.00},
    {name:'speed', color:'red', cost:30.00},
    {name:'happy', color:'blue', cost:40.00},
    {name:'energy', color:'yellow', cost:60.00, fruit:'strawberries'}
  ];
  this.add = function(potion) {
    this.list.push(potion);
  }
  this.remove = function(potion) {
    var index = this.list.indexOf(potion);
    this.list.splice(index, 1);
  }
  */
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



