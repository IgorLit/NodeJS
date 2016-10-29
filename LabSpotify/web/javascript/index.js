var SearchType={
    Search:1,
    MultiSearch:2
};
$(function(){
    var tableObj;
    var infoHTML;
    var span;
    try {
        $("#go").on('click', function () {
            var types = $("#type").val();
            if(types.length==1)
           postRequest("/search", getParamObject(), onSearchSuccess)
            else if($("#mode").val()=="and"){
                postRequest("/multisearch", getParamObject(), onSearchSuccess)
            }
            else if($("#mode").val()=="or"){
                postRequest("/firstorlast", getParamObject(), onSearchSuccess)
            }
        });
    }
    catch (e){
            printErrot(e);
    }
    function postRequest(path,paramObject, callback) {
        $.post("http://localhost:8888"+path,
            paramObject
            ,
            callback
        );
    }
    function getParamObject() {
          return {
              searchString: $("#searchString").val(),
              type: JSON.stringify($("#type").val()),
              limit: $("#limit").val()
          };
    }
    //TODO write client side for multiple search.
    function printErrot(err) {
        if(span!=null){
            $("span").remove();
        }
        span = document.createElement("span");
        span.setAttribute("class","error");
        span.innerHTML ="Error. Incorrect query parameters; "+ err;
        document.body.appendChild(span);
    }
    function onSearchSuccess(data)
    {
        if(tableObj!=null){   //Удаляет таблицу,если она уже создана
            $("table").remove();
        }
        tableObj = document.createElement('table');
        tableObj.setAttribute('class','table');
        tableObj.style.width = '100%';
        try {
            fillTable(JSON.parse(data));
        }
        catch (e){
            printErrot(e);
        }
        tableObj.innerHTML = infoHTML;
        document.body.appendChild(tableObj);
    }
    function onMultiSearchSuccess(data) {
        if(tableObj!=null){   //Удаляет таблицу,если она уже создана
            $("table").remove();
        }
        tableObj = document.createElement('table');
        tableObj.setAttribute('class','table');
        tableObj.style.width = '100%';
            try {
                fillTable(JSON.parse(data));
            }
        catch (e){
            printErrot(e);
        }
        tableObj.innerHTML = infoHTML;
        document.body.appendChild(tableObj);
    }
    function fillTable(articles) {
        console.log("Time:"+ articles[0][2]+" cache:"+articles[0][0]);
        //TODO adapt fillTable for multiple search.
        infoHTML = '';
        if(span!=null){
            $("span").remove();
        }
        var items=null;
        var artists =null;
        for(var j =0;j<articles.length;j++)
        {
            console.log(articles[j][1]);
            if (articles[j][1] == "artist") {
                items = articles[j][0].artists.items;
            }
            else if (articles[j][1] == "album") {
                items = articles[j][0].albums.items;
            }
            else if (articles[j][1] == "track") {
                items = articles[j][0].tracks.items;
            }
            if (items.length == 0 || items.length == null)
                infoHTML += '<span class="error">Your search did not match. Check the request parameters.</span>';
           insertInTable(items);


        }
    }
    function insertInTable(items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].images) {
                infoHTML += '<tr></tr><td width="100px">' +
                    '<img width="100px" height="100px" src="' + items[i].images[0].url + '"/></td>'
            }
            infoHTML += '<td>' + items[i].name + '</td>';
            if (items[i].genres)
                infoHTML += '<td>' + items[i].genres + '</td>';
            infoHTML += '</tr>';
        }
    }
});