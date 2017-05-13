app.service('getDataCongestionCommuneService', function($http){
        var urlBase = 'http://localhost:8080/Burritaco-backend/congestions/';
        this.getData = function(id){
            urlBase = urlBase+id;
            return $http.get(urlBase);
        };
});
