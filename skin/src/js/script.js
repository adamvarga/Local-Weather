// Get actually geolocation and wheater data and append to dom

var getIP = 'http://ip-api.com/json/';
var weatherIP = "https://fcc-weather-api.glitch.me/api/current?lon=";
(function() {
    $.getJSON(getIP).done(function(location) {
        $(".weather-wrapper .local .city").text(" " + location.city);
        var getWeather = weatherIP + location.lon + "&lat=" + location.lat;
        $.getJSON(getWeather, {
            tagmode: "any",
            format: "json",
        })
                .done(function(data) {
                    var getDesc = data.weather[0].description;
                    var main = data.weather[0].main;
                    var sunriseDate = new Date(data.sys.sunrise * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
                    var sunsetDate = new Date(data.sys.sunset * 1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
                    var tempCelsius = Math.round(data.main.temp); 
                    IconGen(main);
                    switchFahrenheit(tempCelsius);
                    $(".description .desc").text(getDesc);
                    $(".description .temp-box #newTemp").text(tempCelsius);
                    $(".description .min-temp").text(Math.round(data.main.temp_min));
                    $(".description .max-temp").text(Math.round(data.main.temp_max));
                    $(".description .sunrise").text(sunriseDate);
                    $(".description .sunset").text(sunsetDate);
                });
    })
    
    // Set class to weather icon
    function IconGen(desc) {
        var desc = desc.toLowerCase()
        switch (desc) {
            case 'drizzle':
                addIcon(desc)
                break;
            case 'clouds':
                addIcon(desc)
                break;
            case 'rain':
                addIcon(desc)
                break;
            case 'snow':
                addIcon(desc)
                break;
            case 'clear':
                addIcon(desc)
                break;
            case 'thunderstom':
                addIcon(desc)
                break;
            case 'mist':
                addIcon(desc)
                break;
            default:
        }
    }
    
    function addIcon(desc) {
        $('div.' + desc).removeClass('hide');
    }
    
    // Set animation to icon
    setInterval(function() {
        $('.sunny-o').toggleClass('sunny-o-animation');
        setTimeout(function() {
            $('.sunny-o').toggleClass('sunny-o-animation');
        }, 1000)
    }, 3000);
    
    // Temperatur Switcher
    function switchFahrenheit(temp) {
        $('.switch-fahreinheit').click(function() {
            var temperature = $(this).children('#newTemp').text();
            if ($('#temp').hasClass('C')) {
                var cToFahr = (temperature * 9 / 5) + 32;
                $('#newTemp').html(cToFahr);
                $('#temp').attr('class', 'F');
                $('#temp').html(' F');
            } else {
                $('#newTemp').html(temp);
                $('#temp').attr("class", "C");
                $('#temp').html(' &deg;C'); 
            }
        });
    }
})();