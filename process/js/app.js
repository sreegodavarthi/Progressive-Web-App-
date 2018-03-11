var $ = jQuery = require("jQuery");
require("./bootstrap_custom.js");
var HandleBars = require("handlebars");


$(function () {
    var topoffset = 50;

    if("serviceWorker" in navigator){
        navigator.serviceWorker
        .register("./service-worker.js")
        .then(function(){
            console.log("Service Worker Application");
        })
    }

    $.getJSON("/data/pets.json", function(data){
        var slideshowTemplate = $("#slideshow-template").html();
        var slideshowScript = HandleBars.compile(slideshowTemplate);
        
        var adoptionTemplate = $("#adoption-template").html();
        var adoptionScript = HandleBars.compile(adoptionTemplate);

        var appointmentsTemplate = $("#appointments-template").html();
        var appointmentsScript = HandleBars.compile(appointmentsTemplate);

        $(".loader").fadeOut(1000);
        $("#slideshow-content").append(slideshowScript(data));
        $("#adoption-content").append(adoptionScript(data));
        $("#appointments-content").append(appointmentsScript(data));

        //replace img
        $("#slideshow .item img").each(function(){
            var imgSrc = $(this).attr("src");
            $(this).parent().css({"background-image": "url("+ imgSrc +")"});
            $(this).remove();
        });

        //activate carousel
        $(".carousel").carousel({
            pause:false
        });
    });

    $(".reload").on("click", function(){
        window.location.reload();
    });

    $(".navbar-fixed-top").on("activate.bs.scrollspy", function () {
        var hash = $(this).find("li.active a").attr("href");
        if (hash !== "#slideshow") {
            $("header nav").addClass("inbody");
        } else {
            $("header nav").removeClass("inbody");
        }
    });


    $(document).on("click", ".openpetmodal", function(){
        $(".modal-petname").html($(this).data("petname"));
        $(".modal-petbreed").html($(this).data("petbreed"));
        $(".modal-petowner").html($(this).data("petowner"));
        $(".modal-petinfo").html($(this).data("petinfo"));
        $(".modal-petimage").attr("src", "images/pets/" + $(this).data("petimage") + ".jpg");        
    });


    //Use smooth scrolling when clicking on navigation
    $('.navbar a').click(function () {
        if (location.pathname.replace(/^\//, '') ===
            this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - topoffset + 2
                }, 500);
                return false;
            } //target.length
        } //click function
    }); //smooth scrolling

    $("body").scrollspy({
        target: "header .navbar",
        offset: topoffset
    });

});