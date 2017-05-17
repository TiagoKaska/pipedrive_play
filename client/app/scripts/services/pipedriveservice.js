'use strict';

/**
 * @ngdoc service
 * @name clientApp.pipedriveService
 * @description
 * # pipedriveService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('pipedriveService', function ($http) {
    var pipedriveApi = 'https://api.pipedrive.com/v1/'

    var _getAllPersons = function (token) {
      console.log('_getPerson ' + token)
      return $http.get(pipedriveApi + 'persons?start=0&api_token=' + token)
        .then(function ( response ) {
           return response
         });
    };

    //https://api.pipedrive.com/v1/persons/1/flow?start=0&api_token=
    var _getPersonById = function (id, token) {
      console.log('getById ' + token) 
      return $http.get(pipedriveApi + 'persons/'+ id +'/?start=0&api_token=' + token)
        .then(function ( response ) {
           return response
         });
    }


    return {
      getAllPersons : _getAllPersons,
      getPersonById : _getPersonById,
    }

  });
