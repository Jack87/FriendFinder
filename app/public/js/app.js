console.log("JS loaded.");

$(document).ready(function() {

  // When the survey is submitted...
  $("input#submit").on("click", function(e) {
    e.preventDefault();
    // console.log("test submit");
    // Build array of score
    if ($("#name").val().trim() == "" || $("#photo").val().trim() == "" ) {
      alert("Please fill in both your name and image URL!");
      return
    }

    var scores = $(".rangeSlider").map(function() {
        return this.value;
    }).get();

    // Fetch input values
    var newFriend = {
      "name": $("#name").val().trim(),
      "photo": $("#photo").val().trim(),
      "scores": scores
    };

    $.post("/api/new", newFriend)
      .done(function(data) {
        console.log(data);
        // $("input#submit").hide();
        $(".modal-body").html("<h4>" + data.name + "</h4>");
        $(".modal-body").append("<img class='imgFriend' src='"+data.photo+"' width='465'>");
        $(".modal-body").append("<hr><h6>" + data.traits + "</h6>");
        $('#friendModal').modal();
      }); // $.post

  });

  $("#modalClose").on("click", function (e) {
    document.location.href="/survey";
  });

}); // document ready
