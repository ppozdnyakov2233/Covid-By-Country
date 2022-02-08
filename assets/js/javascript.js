var confirmedCases = document.getElementById("cases");
var totalDeaths = document.getElementById("deaths");
var totalRecovered = document.getElementById("recovered");

var countryFound = false;
var countryIpName;

var firstVisit = true;

getApi();

let apiKey = '1be9a6884abd4c3ea143b59ca317c6b2';
$.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
 
  if(data['country'] == 'United States'){
    countryIpName = "United States of America";
  } else{
    countryIpName = data['country'];
  }
  console.log(countryIpName);
});

function getApi(){
    let alert = document.querySelector("#alert");
    countryFound = false;
    var inputField = document.getElementById("searchBar").value;

    var countryName = document.getElementById("country");

    country = inputField;
    
    var request = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
      };

      $.ajax(request).done(function (response) {
        
          for(let i = 0; i < response['Countries'].length; i++){
            if(firstVisit){
              if(response['Countries'][i]["Country"] == countryIpName){
                  countryName.innerText = countryIpName;
                  confirmedCases.innerText = "Total confirmed cases since 2020: " + response['Countries'][i]["TotalConfirmed"];
                  totalDeaths.innerText = "Total confirmed deaths since 2020: " + response['Countries'][i]["TotalDeaths"];
                  totalRecovered.innerText = "Total confirmed global cases since 2020: " + response['Global']['TotalConfirmed'];
                  console.log(response)
                  alert.innerText = "";
                  countryFound = true;
                }

              } else {

                if(response['Countries'][i]["Country"] == country){

                  countryName.innerText = inputField;
                  confirmedCases.innerText = "Total confirmed cases since 2020: " + response['Countries'][i]["TotalConfirmed"];
                  totalDeaths.innerText = "Total confirmed deaths since 2020: " + response['Countries'][i]["TotalDeaths"];
                  totalRecovered.innerText = "Total confirmed global cases since 2020: " + response['Global']['TotalConfirmed'];
                  console.log(response)
                  alert.innerText = "";
                  countryFound = true;

                }

              }

          }

          if(!countryFound){
            console.log("Please enter a real country name, thanks")
            alert.innerText = "Country not found in the database";
          }

          console.log(inputField)
      });
}


$("#btn").on("click", function(){
    console.log("clicked")
    firstVisit = false;
    getApi();
});