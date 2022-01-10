function RestApi(){

}

RestApi.prototype.constructor = RestApi;

RestApi.prototype.int = function(){

};

RestApi.prototype.sendRequest = function(type, url, request, dataType, successFunction = null, errorFunction = null){
    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(request),
        dataType: dataType,
        success: function(data, textStatus, jqXHR){
            var records = data.res;
            if(successFunction){
                successFunction(records, textStatus, jqXHR);
            }            
        },
        error: function(){
            if(errorFunction){
                errorFunction();
            }else{
                console.log("error without callback");
            }           
        }
    });
}