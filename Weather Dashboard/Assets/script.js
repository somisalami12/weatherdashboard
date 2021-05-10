var search = $(".searchButton");
var city = $(".savedcity")
var array = []
//GETS API DATA ON CLICK
search.click(function () { 
    var userInput = $(".userInput").val();
    var current = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&Appid=" + "e7c457a8d2e4fab752b170f7f2aba0a3" + "&units=imperial";
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&Appid=" + "e7c457a8d2e4fab752b170f7f2aba0a3" + "&units=imperial";
    if (userInput === "") {
        alert("")
    }
    // CURRENT WEATHER DATA
    else {
        fetch(current)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var city = $(".list-group").addClass("list-group-item");
                city.append("<button class='savedcity'>" + data.name + "</button > ");
                array.push(data.name)
                console.log(array);
                var local = localStorage.setItem("searchHistory", array);
                var currentCard = $(".currentCard").append("<div>").addClass("card-body");
                currentCard.empty();
                var cityName = currentCard.append("<p>");
                currentCard.append(cityName);
                var time = new Date(data.dt * 1000);
                cityName.append(data.name + " " + time.toLocaleDateString("en-US"));
                cityName.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">`);
                var currentcityData = cityName.append("<p>");
                cityName.append(currentcityData);
                currentcityData.append("<p>" + "The Current Temperature: " + data.main.temp + " °F" + "</p>"+"<p>" + "The Current Humidity: " + data.main.humidity + " %" + "</p>"+"<p>" + "The Current Wind Speed: " + data.wind.speed + " mph" + "</p>");
                //FETCHING UV DATA
                var uvlink = `https://api.openweathermap.org/data/2.5/uvi?appid=e7c457a8d2e4fab752b170f7f2aba0a3&lat=${data.coord.lat}&lon=${data.coord.lon}`;
                fetch(uvlink)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        var uvIndex = currentcityData.append("<p5>" + "UV Index: " + data.value + "</p5>").addClass("card-text")
                    });
            })
            //5 day weather data
        fetch(fiveDay)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)             
                var midDay = [5, 13, 21, 29, 37];
                var fiveDayForecast = $(".fiveDayCard").addClass("card-body");
                var fiveDayContainer = $(".fiveDay").addClass("card-text");
                fiveDayContainer.empty();                
                midDay.forEach(function (i) {
                    var FiveDayTime = new Date(data.list[i].dt * 1000);
                    FiveDayTime = FiveDayTime.toLocaleDateString("en-US");
                    fiveDayContainer.append("<div class=blockColor>" + "<p>" + FiveDayTime + "</p>" + `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + data.list[i].main.temp +"F" + "</p>" + "<p>" + "Humidity: " + data.list[i].main.humidity + "%" + "</p>" + "</div>");
                })
            })
    }
})

   




