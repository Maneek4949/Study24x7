(function (global) {
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
      };
      var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
          .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
      }

    var homeHtml = "snippet/collapse.html";
    $ajaxUtils.sendGetRequest("files/notes.json", 
      function(Years) {
        $ajaxUtils.sendGetRequest(homeHtml,function (responseText) {
          let finalHtml="";
          for(var j=0;j<Years.length;j++){
            finalHtml+=responseText;
            let Year=Years[j];
            let tr="target"+(j+1);
            let yr="Year"+(j+1);
            finalHtml=insertProperty(finalHtml,"target",tr);
            finalHtml=insertProperty(finalHtml,"Semester",yr);
            for(var i=0;i<Year.length;i++){
            var html=`<tr>
            <td>{{code}}</td>
            <td>{{name}}</td>
            <td><a href="{{link}}" target="_blank">Download</a></td>
            </tr>`;
            var code = Year[i].code;
            var sub = Year[i].sub;
            var down=Year[i].link;
            html=insertProperty(html, "code",code);
            html = insertProperty(html,"name",sub);
            html=insertProperty(html,"link",down);
            finalHtml += html;
            }finalHtml += `</table></div>
            </div>
            </div>
            `;
          }
          insertHtml("#accordion",finalHtml);},false);

        });
})(window);