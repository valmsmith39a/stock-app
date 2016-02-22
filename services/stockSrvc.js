/*
  Stock service finds list of companies by name/quote, retrieves stock data. Service also adds, deletes and gets all stocks. 
*/

var app = angular.module('stocks');

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
    var repeatStock = this.arrayOfStocks.find(function(item, index) {
      if(item.data.Symbol === stockObject.data.Symbol){
        return item; 
      }
    });
    if(!repeatStock) this.arrayOfStocks.push(stockObject);    
    return this.arrayOfStocks; 
  }; 

  this.deleteTrackedStock = function(index) {   
    this.arrayOfStocks.splice(index, 1);
    return this.arrayOfStocks; 
  };

  this.getAllAddedStocks = function() {
    return this.arrayOfStocks;
  };
});