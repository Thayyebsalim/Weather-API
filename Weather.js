$(document).ready(function() {
  var weathDat = [{
      condition: "Clear",
      name: "clear",
      image: "https://image.flaticon.com/icons/png/512/52/52017.png",
      quote: "It's alright outside.",
      bg: "https://cdn.cloudpix.co/images/sunny/wallpaper-description-sunny-landscape-wallpaper-82bfba0bd406c621d4e63ce476f7bd69-large-741009.jpg"
    },
    {
      condition: "Rain",
      name: "rainy",
      image: "http://icon-icons.com/icons2/935/PNG/512/rain-weather-cloud-outline-symbol-with-raindrops-lines_icon-icons.com_73181.png",
      quote: "I suggest that you take an umbrella unless you are a pluviophile like me.",
      bg: "http://cdn.wallpapersafari.com/97/51/f6eBy2.jpg"
    },
    {
      condition: "Haze",
      name: "hazy",
      image: "https://cdn0.iconfinder.com/data/icons/wthr/32/692980-day-fog-512.png",
      quote: "Careful! Low visibilty",
      bg: "http://cdn.wallpapersafari.com/91/59/yUpxF8.jpg"
    },
    {
      condition: "Thunderstorm",
      name: "stormy",
      image: "http://cdn.wallpapersafari.com/28/65/s4dDYP.jpg",
      quote: "Stay safe lightening is not good for health, unless you wanna be a Kebab",
      bg: "http://www.wallpaperup.com/uploads/wallpapers/2014/12/21/560770/big_thumb_7fc29c6aae34472f33f5d317cb2d0b92.jpg"
    },
    {
      condition: "Clouds",
      name: "cloudy",
      image: "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Clouds-icon.png",
      quote: "Everything's alright outside just get up and take a walk",
      bg: "http://cdn.wallpapersafari.com/28/51/ohjZsI.jpg"
    },
    {
      condition: "Smoke",
      name: "Misty",
      image: "https://cdn1.iconfinder.com/data/icons/weather-thinline-icons-set/139/Foggy-RoundedBlack_weather-512.png",
      quote: "Please be careful because of low visibilty",
      bg: "http://cdn.wallpapersafari.com/91/59/yUpxF8.jpg"
    },
    {
      condition: "Mist",
      name: "misty",
      image: "https://cdn1.iconfinder.com/data/icons/weather-thinline-icons-set/139/Foggy-RoundedBlack_weather-512.png",
      quote: "Please be careful because of low visibilty",
      bg: "http://cdn.wallpapersafari.com/91/59/yUpxF8.jpg"
    },
    {
      condition: "Snow",
      name: "snowy",
      image: "http://icons.iconarchive.com/icons/icons8/windows-8/512/Weather-Snow-icon.png",
      quote: "Dress properly unless you are hypothermia proof :D",
      bg: "http://phandroid.s3.amazonaws.com/wp-content/uploads/2015/12/winter-snow-wallpaper-4.jpg"
    }
  ];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat, lon, url;

      lat = position.coords.latitude;
      lon = position.coords.longitude;
      url =
        "https://fcc-weather-api.glitch.me/api/current?lon=" +
        lon +
        "&lat=" +
        lat;

      $.getJSON(url, function(weather) {
        var place = weather.name,
          temp = Math.floor(weather.main.temp),
          cond = weather.weather[0].main;

        $(".greet").append(place);

        $(".temp").html("Current temperature is " + temp + "\u00b0" + "C");
        $(".temp").data("unit", "c");

        $("button").on("click", function() {
          if ($(".temp").data("unit") === "c") {
            $(".temp").data("unit", "f");
            $("button").text("I use Celsius");
            $(".temp").html(
              "Current temperature is " + Math.floor(temp * (9 / 5) + 32) + "\u00b0" + "F"
            );
          } else {
            $("button").text("Change unit to F");
            $(".temp").data("unit", "c");
            $(".temp").html("Current temperature is " + temp + "\u00b0" + "C");
          }
        });
        for (var i = 0; i < weathDat.length; i++) {
          if (weathDat[i].condition === cond) {
            $(".icon").attr("src", weathDat[i].image);

            $(".weather").html(
              "Expect " + weathDat[i].name + " conditions today"
            );
            $(".comment").text(weathDat[i].quote);

            if (temp >= 34) {
              $(".comment").append("<br> Stay hydrated & use shades");
            }

            if (temp < 20) {
              $(".comment").append("<br> Stay warm and protected.");
            }

            $("body").css("background-image", "url(" + weathDat[i].bg + ")");
          } //if ends
        } //for loop ends
      }); //getJSON ends
    }); //Nav fn ends
  } else {
    $("body").html("Something went wrong!  Let me dial NASA. Try again Later");
  }
}); //document ready ends
