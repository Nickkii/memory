let BoxOpened = "";
let ImgOpened = "";
let ImgFound = 0;

let Source = "#boxcard";

let ImgSource = [
    "https://img.icons8.com/doodle/96/000000/butterfly.png",
    "https://img.icons8.com/doodle/96/000000/bull.png",
    "https://img.icons8.com/doodle/96/000000/ladybird--v2.png",
    "https://img.icons8.com/doodle/96/000000/star--v1.png",
    "https://img.icons8.com/doodle/96/000000/fortune-teller.png"
];

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function ShuffleImages() {
    var ImgAll = $(Source).children();
    var ImgThis = $(Source + " div:first-child");
    var ImgArr = new Array();

    for (var i = 0; i < ImgAll.length; i++) {
        ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
        ImgThis = ImgThis.next();
    }

    ImgThis = $(Source + " div:first-child");

    for (var z = 0; z < ImgAll.length; z++) {
        var RandomNumber = RandomFunction(0, ImgArr.length - 1);

        $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
    }
}

function ResetGame() {
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    $("#success").remove();
    boxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    return false;
}

function OpenCard() {
    var id = $(this).attr("id");

    if ($("#" + id + " img").is(":hidden")) {
        $(Source + " div").unbind("click", OpenCard);

        $("#" + id + " img").slideDown('fast');

        if (ImgOpened == "") {
            boxOpened = id;
            ImgOpened = $("#" + id + " img").attr("src");
            setTimeout(function() {
                $(Source + " div").bind("click", OpenCard)
            }, 300);
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (ImgOpened != CurrentOpened) {
                setTimeout(function() {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + boxOpened + " img").slideUp('fast');
                    boxOpened = "";
                    ImgOpened = "";
                }, 400);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + boxOpened + " img").parent().css("visibility", "hidden");
                ImgFound++;
                boxOpened = "";
                ImgOpened = "";
            }
            setTimeout(function() {
                $(Source + " div").bind("click", OpenCard)
            }, 400);
        }
    }
}

$(function() {

    for (var y = 1; y < 3; y++) {
        $.each(ImgSource, function(i, val) {
            $(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
        });
    }
    $(Source + " div").click(OpenCard);
    ShuffleImages();
});