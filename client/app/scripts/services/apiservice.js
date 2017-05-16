'use strict';

/**
 * @ngdoc service
 * @name clientApp.apiService
 * @description
 * # apiService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('apiService', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With']
    var url = 'http://localhost:9000/api/'

    var _create = function (carro) {
      
      return $http.post(url + 'v1/carro', carro, {headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }})
        .then(function ( response ) {
           return response
         });
    };

    var _getListCars = function(){
      return $http.get(url + 'v1/carro/list')
        .then( function( response ) {
          return response
        });
    };

    return {
      create : _create,
      getListCars : _getListCars
    }

  });
