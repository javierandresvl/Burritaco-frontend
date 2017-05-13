app.service('getCommunesService', function($http){
        var urlBase = 'http://localhost:8080/Burritaco-backend/communes';
        this.getCommunes = function(){
            return $http.get(urlBase);
        };
});