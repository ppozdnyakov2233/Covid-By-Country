var country = "United States of America"
var confirmedCases = document.getElementById("cases");
var totalDeaths = document.getElementById("deaths");
var totalRecovered = document.getElementById("recovered");

var countryFound = false;


function getApi(){

    var inputField = document.getElementById("searchBar").value;

    var countryName = document.getElementById("country");

    country = inputField;

    countryName.innerText = inputField;
    
    var request = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
      };

      $.ajax(request).done(function (response) {

          for(let i = 0; i < response['Countries'].length; i++){

            if(response['Countries'][i]["Country"] == country){

                console.log("Total Confrimed Cases: " + response['Countries'][i]["TotalConfirmed"])
                console.log("Total Deaths: " + response['Countries'][i]["TotalDeaths"])
                console.log("Total Recovered: " + response['Countries'][i]["TotalRecovered"])


                confirmedCases.innerText = "Total confirmed cases in " + country + ": " + response['Countries'][i]["TotalConfirmed"];
                totalDeaths.innerText = "Total confirmed deaths in " + country + ": " + response['Countries'][i]["TotalDeaths"];
                totalRecovered.innerText = "Total confirmed recovered in " + country + ": " + response['Countries'][i]["TotalRecovered"];

                countryFound = true;
                

            } 

          }

          if(!countryFound){
            console.log("Please enter a real country name, thanks")
          }

          console.log(inputField)
      });
}


$("#btn").on("click", function(){
    console.log("clicked")
    getApi();
});