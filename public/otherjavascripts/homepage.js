// $(document).onload(function () {
//     $("#return_date").show();
// });


$(document).ready(function() {      //JQuery to drag and drop flights from one list to another.
    $('#chooseflights').sortable({  //Used JQuery UI Widget (Sortable List)
        connectWith: '#fav_flights' //Linked 2 sortable lists to manage user's preference of flights
    });
    $('#fav_flights').sortable({
        connectWith: '#chooseflights'
    });
    $('#oneway-btn').style({
        color: '#FFFFFF',
        background: '#42b9f4'
    });
    // $('#datepicker').datepicker();
    // $('#datePicker').datepicker({
    //     inline: true,
    //     iconsLibrary: 'fontawesome'
    // });
    //
    // $('#datePicker1').datepicker({
    //     inline: true,
    //     iconsLibrary: 'fontawesome'
    // });
    // $('input[name="dater').daterangepicker();
    //
    //
    // $('#datePicker').datepicker({
    //     uiLibrary: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
    //     iconsLibrary: 'fontawesome'
    // });
    //
    // $('#datePicker1').datepicker({
    //     uiLibrary: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
    //     iconsLibrary: 'fontawesome'
    // });
    reverse_func();
    show_function();
    hide_function();
    resize();
    moveRight();
});

function resize() {                 //Resizeable JQuery feature applied to Welcome Message
    $("#welcome").resizable();
}

function moveRight(){               //Animates the flight GIF from left to right in a continuous loop on top of the page
    $("#flightgif").css({left:0});
    $("#flightgif").animate({left: "+=1440"},10800,'linear',function () {
        moveRight();
    });
}

function show_function() {
    $("#return_date").show();          //Shows the return date picker for round-trip
}

function hide_function() {
    $("#return_date").hide();           //Hides return date picker for one-way
}


//Reverse source and destination values
function reverse_func() {
    var temp = document.getElementById("source").value;
    document.getElementById("source").value = document.getElementById("destination").value;
    document.getElementById("destination").value = temp;
}