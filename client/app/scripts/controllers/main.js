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
    $scope.excluirCarro = excluirCarro
    $scope.listCars = []
    $scope.showExcluir = false


    getListCars()

    function getListCars() {
      apiService.getListCars().then(function (response) {
        if (response.status == 200 && response.data.body.length > 0)
          $scope.listCars = angular.copy(response.data.body)
        //$scope.$apply($scope.listCars)
      })
    }

    function seleciona(car) {
      car['ano'] = Number(car.ano)
      $scope.carroSelecionado = angular.copy(car)
      getListPersons(car.idPerson)
      //getPersonById(car.idPerson)
      $scope.showFormCarro = true
      $scope.showExcluir = true
    }

    function getPersonById(id) {

      pipedriveService.getPersonById(id, $scope.token).then(function (response) {
        if (response.status == 200) {
          $scope.persons.push(angular.copy(response.data.data))
          //$scope.person = response.data.data
        }
      }, function (error) {
        console.log(error)
      })

    }

    function criarCarro() {
      $scope.showExcluir = false
      $scope.showFormCarro = true
      $scope.carroSelecionado = {}
      getListPersons()
    }

    function getListPersons(idPerson) {

      pipedriveService.getAllPersons($scope.token).then(function (response) {
        if (response.status == 200) {
          $scope.persons = angular.copy(response.data.data)
          if (undefined != idPerson) {
            angular.forEach($scope.persons, function (value, key) {
              if (value.id == idPerson) {
                $scope.person = $scope.persons[key]
                return false
              }
            })
          }
          getListCars()
        }
      }, function (error) {
        console.log('error ')
        console.log(error.data.error)
        /*
        swal(
          'Oops...',
          error.data.error,
          'error'
        )*/
      })
    }

    function salvarCarro(carro) {
      $scope.errorMessage = ""
      $scope.errorForm = false
      if (carroIsValid(carro)) {
        console.log('carro valido ' + $scope.person.id)
        carro['idPerson'] = $scope.person.id
        console.log(carro)
        if (undefined == carro.id) {
          apiService.create(carro).then(function (response) {
            console.log(response)
            if (response.status == 201) {
              swal({
                title: 'Bom Trabalho!',
                text: "Carro criado com sucesso!",
                type: 'success',

              }).then(function () {
                window.location.reload()
              })

            }
          }, function (error) {
            console.log(error)
          })
        } else {
          apiService.update(carro).then(function (response) {
            if (response.status == 200) {
              swal({
                title: 'Bom Trabalho!',
                text: "Carro atualizado com sucesso!",
                type: 'success',

              }).then(function () {
                window.location.reload()
              })

            }
            console.log(response)
          }, function (error) {
            console.log(error)

          })

        }


      } else {
        $scope.errorForm = true
      }
    }

    function excluirCarro(carro) {
      apiService.delete(carro).then(function (response) {
        console.log(response)
        if (response.status == 200) {
          swal({
            title: 'Bom Trabalho!',
            text: response.data.body,
            type: 'success',

          }).then(function () {
            window.location.reload()
          })
        }

      }, function (erro) {
        console.log(erro)
        swal(
          'Oops...',
          error.data.body,
          'error'
        )
      })
    }

    function carroIsValid(carro) {
      if (undefined == $scope.person) {
        $scope.errorMessage += "Selecionar um Responsável "
        return false
      }
      if (!validaAnoCarro(carro.ano)) {
        $scope.errorMessage += "Apenas carros com menos de 30 anos são aceitos "
        return false
      }
      if (!validaCorCarro(carro.cor)) {
        $scope.errorMessage += " Cor obrigatoriamente deve ser branco, preto ou verde "
        return false
      }

      return true
    }

    function validaAnoCarro(ano) {
      var today = new Date()
      var year = today.getFullYear()
      var dateCarIsValid = year - ano <= 30 ? true : false
      return dateCarIsValid
    }

    function validaCorCarro(cor) {
      var corIsValid = cor.search(/branco/i) >= 0 || cor.search(/verde/i) >= 0 || cor.search(/preto/i) >= 0 ? true : false
      return corIsValid
    }
  });
