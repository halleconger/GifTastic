$(document).ready(function () {
    console.log("is this working");

    //CREATE AN ARRAY
    var topics = [
        "ice cream",
        "donuts",
        "cheeseburger",
        "salad",
        "chocolate",
        "coffee",
        "taco",
        "pasta",
        "candy",
        "fruit",
    ]

    var API_KEY = "u9LxMBpzQKk3zDQymrpT5cbGas4W95Cs";
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info btn-keyword");
        button.text(topics[i]);
        $("#buttons").append(button);
    }

    function createImage(response, i) {
        var img = $("<img>");
        img.addClass("gif-image")
        img.attr("src", response.data[i].images.downsized.url);
        img.attr("data-animated", response.data[i].images.downsized.url);
        img.attr("data-still", response.data[i].images.downsized_still.url);
        img.attr("data-state", "animated");

        var gifCard = $("<div class='gif-card'>")
        var pRating = $("<p>")

        gifCard.append(img);
        pRating.append("Rating: " + response.data[i].rating)
        gifCard.append(pRating);

        return gifCard;
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var keyword = $("#gif-keyword").val();
        console.log(keyword);

        $("#gif-keyword").val("");

        var button = $("<button>");
        button.addClass("btn btn-info btn-keyword");
        button.text(keyword);
        $("#buttons").append(button);
    });

    $(document).on("click", ".gif-image", function () {
        console.log("delegate image")

        $(this);
        console.log(this);

        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "animated") {
            $(this).attr("data-state", "still")
            $(this).attr("src", $(this).attr("data-still"))
        } else {
            $(this).attr("data-state", "animated")
            $(this).attr("src", $(this).attr("data-animated"))
        }
    });

    $(document).on("click", ".btn-keyword", function () {
        console.log("delegate click")

        $("#gifs").empty();
        $.ajax({
            method: "GET",
            url: requestUrl + $(this).text()
        }).then(function (response) {
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                var img = createImage(response, i);
                console.log(i, response.data[i].rating)
                $("#gifs").append(img);
            }
        });
    })
});
