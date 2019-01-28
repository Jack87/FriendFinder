console.log("JS loaded.");

$(document).ready(function() {

  // When the survey is submitted...
  $("input#submit").on("click", function(e) {
    e.preventDefault();
    // Build array of score
    // https://stackoverflow.com/a/5552480/3424316
    var scores = $(".sliderQuestion").map(function() {
        return this.value;
    }).get();

    // Fetch input values
    var newFriend = {
      "name": $("form#survey #name").val().trim(),
      "photo": $("form#survey #photo").val().trim(),
      "scores": scores
    };

    $.post("/api/new", newFriend)
      .done(function(data) {
        console.log(data);
        $("input#submit").hide();
        $(".modal-body").html("<h4>" + data.name + "</h4>");
        $(".modal-body").append("<img src='"+data.photo+"'>");
        $('#friendModal').modal();
      }); // $.post

  });

  $("#modalClose").on("click", function (e) {
    document.location.href="/survey";
  });

}); // document ready
