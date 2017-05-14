app.service('getCommunesService', function($http){
        var urlBase = 'http://107.170.14.114:8080/Burritaco-backend/';
        this.getCommunes = function(){
            url = urlBase + 'communes';
            return $http.get(url);
        };

        this.getCongestionData = function(id){
            url = urlBase+'congestions/'+id;
            return $http.get(url);
        };
});