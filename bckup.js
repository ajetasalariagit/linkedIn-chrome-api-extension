
const init = function () {
    const injectElement = document.createElement('div');
    injectElement.className = "get_api_btn";
    injectElement.innerHTML = '<div class="btn-container"><div class="vertical-center"><button  id="myCheck">Get</button></div></div>';
    document.body.appendChild(injectElement);
}
init();

myCheck.addEventListener("click", async () => {
    var start = 0;
    var count = 100;
    setInterval(function () {
        var cokkiesData = new Map(document.cookie.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)));
        var JSESSIONID_data = cokkiesData.get('JSESSIONID');
        JSESSIONID_data = JSESSIONID_data.replace(/['"]+/g, '');
        var myHeaders = new Headers();
        myHeaders.append("csrf-token", JSESSIONID_data);
        myHeaders.append("x-restli-protocol-version", "2.0.0");
        var cookie_data = new Map(document.cookie.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)));
        myHeaders.append("cookie", cookie_data);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://www.linkedin.com/sales-api/salesApiAccountSearch?q=searchQuery&query=(spellCorrectionEnabled:true,filters:List((type:REGION,values:List((id:102713980,text:India,selectionType:INCLUDED)))),keywords:private%20limited)&start=" + start + "&count=" + count + "&trackingParam=(sessionId:a4O53S9BTym%2Bb39GoyH6Dw%3D%3D)&decorationId=com.linkedin.sales.deco.desktop.searchv2.AccountSearchResult-2", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
   
        start += 100;
        //clearInterval(interval);
    }, 5000);
});

