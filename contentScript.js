
const init = function () {
    const injectElement = document.createElement('div');
    injectElement.className = "get_api_btn";
    injectElement.innerHTML = '<div class="btn-container"><div class="vertical-center"><form id="myform"><button  id="myCheck">Get</button></form></div></div>';
    document.body.appendChild(injectElement);
}
init();
myCheck.addEventListener("click", async () => {
    document.querySelector('#myform').addEventListener('submit', e => {
        e.preventDefault();
        var start = 0;
        var count = 100;
          setInterval(function () {

        var query_string = window.location.href.replace("https://www.linkedin.com/sales/search/company?", "");
        if (!query_string) {
            console.log("query not found");
            return false;
        }
        query_string = decodeURIComponent(query_string);
        var query_data = query_string.split('&sessionId')[0];
        var urlParams = new URLSearchParams(query_string);
        var session_id = urlParams.get('sessionId');

        var cokkiesData = new Map(document.cookie.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)));
        var JSESSIONID_data = cokkiesData.get('JSESSIONID');
        JSESSIONID_data = JSESSIONID_data.replace(/['"]+/g, '');
        var myHeaders = new Headers();
        myHeaders.append("csrf-token", JSESSIONID_data);
        myHeaders.append("x-restli-protocol-version", "2.0.0");
        var cookie_data = new Map(document.cookie.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)));
        myHeaders.append("cookie", cookie_data);

        const corsHeaders = {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'Post',
            'Access-Control-Allow-Headers':'Accept',
        }
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
         //for (var start = 0; start > -1; start += 100) {
            fetch("https://www.linkedin.com/sales-api/salesApiAccountSearch?q=searchQuery&" + query_data + "&start=" + start + "&count=" + count + "&trackingParam=(sessionId:" + session_id + ")&decorationId=com.linkedin.sales.deco.desktop.searchv2.AccountSearchResult-2", requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        var my_data = JSON.stringify( data );
                        var formData = new FormData();
                        formData.append('data', my_data);
                        var requestSubmit = {
                            method: 'POST',
                            redirect: 'follow',
                            body: formData, 
                            
                        };
                       
                        if(data.status === 400){
                            throw new Error('something went wrong');
                            exit(0);
                        }
                        fetch('http://localhost/linkedin_api_data/submit.php', requestSubmit)
                            .then((response) => {
                                response => response.json()
                            })
                            .catch((error) => {
                                console.log('error', error)
                                
                            });
                    }else{
                        return false;
                    }
                }).catch((error) => {
                    console.log('error', error)
                    
                });
        start += 100;
          }, 10000);
            //}
    });
});