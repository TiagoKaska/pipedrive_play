'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http, pipedriveService, apiService) {
  
    $scope.persons = []
    $scope.showFormCarro = false
    $scope.errorMessage = ""
    $scope.errorForm = false
    $scope.salvarCarro = salvarCarro
    $scope.criarCarro = criarCarro
    $scope.seleciona = seleciona
    $scope.listCars = []

    getListCars()

    function getListCars() {
      apiService.getListCars().then( function ( response ) {
        if(response.status == 200 && response.data.body.length > 0)
          $scope.listCars = angular.copy(response.data.body)
      })
    }

    function seleciona(car){
      console.log('carro selecionado ')
      console.log(car)
      car['ano'] = Number(car.ano)
      $scope.carroSelecionado = angular.copy(car)
      $scope.showFormCarro = true
    }

    function criarCarro() {
      $scope.showFormCarro = true
      $scope.carroSelecionado = {}
      pipedriveService.getAllPersons($scope.token).then(function (response) {
        if (response.status == 200) {
          $scope.persons = angular.copy(response.data.data)
          getListCars()
        }
      }, function (error) {
        console.log('error ')
        console.log(error.data.error)
      })
    }
    function salvarCarro(carro) {
      $scope.errorMessage=""
      $scope.errorForm=false
      if(carroIsValid(carro)){
        console.log('carro valido ' +  $scope.person.id)
        carro['idPerson'] = $scope.person.id
        console.log(carro)
        apiService.create(carro).then(function(response){
          console.log(response)
        }, function(error){
          console.log(error)
        })

      } else {
        $scope.errorForm = true
      }
      
      
    }

    function carroIsValid(carro){
      if(undefined == $scope.person) {
        $scope.errorMessage +="Selecionar um Responsável "
        return false
      }
      if(!validaAnoCarro(carro.ano)) {
        $scope.errorMessage +="Apenas carros com menos de 30 anos são aceitos "
        return false
      }
      if(!validaCorCarro(carro.cor)){
        $scope.errorMessage +=" Cor obrigatoriamente deve ser branco, preto ou verde "
        return false 
      }
      
      return true
    }

    function validaAnoCarro(ano){
      var today = new Date()
      var year = today.getFullYear()
      var dateCarIsValid = year - ano <=30 ? true : false
      return dateCarIsValid
    }

    function validaCorCarro(cor){
      var corIsValid = cor.search(/branco/i) >= 0 || cor.search(/verde/i) >=0 || cor.search(/preto/i) >=0  ? true : false
      return corIsValid
    }
});
