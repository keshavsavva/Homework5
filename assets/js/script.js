$(document).ready(function() {

    var myDay = JSON.parse(localStorage.getItem('myDay'));
    if(myDay===null){
        var myDay = ["", "", "", "", "", "", "", "", ""];
        localStorage.setItem("myDay", JSON.stringify(myDay));
    }
    // initialize local storage
    
   
    
    var now = moment();
    $(".date").text(now.format("lll"));
    // use moment.js to find current time and display on the top of the screen
    
    var first2 =now.format("H");
    console.log(first2);
    // define the current time in terms of the hour to compare to the planner
    var times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
    var military = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
    // create array of times to display in the planner and another array of times in terms of the hour to compare to the current time

    // for loop below is for dynamically creating planner elements
    for(var i= 0; i < times.length; i++) {
        var newRow = $("<div>").addClass("row r" + i);
        $(".planner").append(newRow);
        // create and append row for bootstrap responsivity
        var newCol1 = $("<div>").addClass("col-md-2 white");
        var newCol2 = $("<div>").addClass("col-md-8");
        var newCol3 = $("<div>").addClass("col-md-2");
        // create 3 columns within the row to add bootstrap responsivity
        var timeField = $("<p>").text(times[i]).addClass("times");
        //  create element to insert time into left column
        var saveBtn = $("<button>").attr("id", "saveButton").addClass("btn").data("btnNumber",  i).text("Save");
        // creates button to save text in input fields
        var inputField = $("<textarea>").addClass("txt" + i);
        // creates input field which has its color dynamically changed by if statements below
        if(first2 === military[i]) {
            inputField.addClass("currentTime");
        }
        //makes current time blue
        if(parseInt(first2) > parseInt(military[i])) {
            inputField.addClass("pastTime");
        }
        //makes past times red
        if(parseInt(first2) < parseInt(military[i])) {
            inputField.addClass("futureTime");
        }
        //makes future times green
        newRow.append(newCol1, newCol2, newCol3);
        newCol3.append(saveBtn);
        newCol2.append(inputField);
        newCol1.append(timeField);
    }

    for(var i = 0; i < myDay.length; i++) {
        var storeText = myDay[i];
        console.log(storeText);
        $(".txt" + i).val(storeText);
    }
    
    $("button").on("click", function(event) {
        event.preventDefault();
        var buttonNum = $(this).data("btnNumber");
        var textValue = $("textarea.txt" + buttonNum).val();
        myDay[buttonNum] = textValue;
        localStorage.setItem("myDay", JSON.stringify(myDay));
    })

    

})