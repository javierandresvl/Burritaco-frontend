app.controller('GraphiccompareCtrl', function($scope, getCommunesService){
    $scope.labels = [];
    $scope.data = [];

    function getDataGraphiccompare(){
        getCommunesService.getCommunes()
        .success(function(data){
            console.log(data[1]["communeName"]);
            for (i = 0; i < 55; i++) {
                $scope.labels.push(data[i]["communeName"])
            }
        })
        .error(function(error){
            $scope.status = 'Error al consultar por comunas';
        });

        getCommunesService.getAllCongestions()
        .success(function(data){
            for (i = 1; i < 55; i++){
                if(i==2){
                    i++;
                }
                $scope.data.push(data[i])
            }
        })
        .error(function(error){
        $scope.status = 'Error al obtener los datos';
        });
    }

    getDataGraphiccompare();
});