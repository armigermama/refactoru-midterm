// $(function(){


/////// Data definitions/////////////////////////////

  // set up a global varibale to store the data array of object for charting. //////////////
  var resultArray = [];
  var dateArray4Chart = [];
  var lifetimeTotalLikeArray4Chart = [];


  // selecting only keys listed in keyArray to reduce noise in resultArray./////////////////////
  var keyArray = ["Date", 
    "Lifetime: The total number of people who have liked your Page. (Unique Users)", 
    "Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)",
    "Daily: The number of times users saw your posts via stories published by their friends. (Total Count)"];

  var options = {
        
  //Boolean - If we show the scale above the chart data     
  // scaleOverlay : false,
  
  // //Boolean - If we want to override with a hard coded scale
  // scaleOverride : false,
  
  // //** Required if scaleOverride is true **
  // //Number - The number of steps in a hard coded scale
  // scaleSteps : null,
  // //Number - The value jump in the hard coded scale
  // scaleStepWidth : null,
  // //Number - The scale starting value
  // scaleStartValue : null,

  // //String - Colour of the scale line 
  // scaleLineColor : "rgba(0,0,0,.1)",
  
  // //Number - Pixel width of the scale line  
  // scaleLineWidth : 1,

  //Boolean - Whether to show labels on the scale 
  // scaleShowLabels : true,
  
  // //Interpolated JS string - can access value
  // scaleLabel : "<%=value%>",
  
  // //String - Scale label font declaration for the scale label
  // scaleFontFamily : "'Arial'",
  
  //Number - Scale label font size in pixels  
  scaleFontSize : 8,
  
  // //String - Scale label font weight style  
  // scaleFontStyle : "normal",
  
  // //String - Scale label font colour  
  // scaleFontColor : "#666",  
  
  // ///Boolean - Whether grid lines are shown across the chart
  // scaleShowGridLines : true,
  
  // //String - Colour of the grid lines
  // scaleGridLineColor : "rgba(0,0,0,.05)",
  
  // //Number - Width of the grid lines
  // scaleGridLineWidth : 1, 
  
  // //Boolean - Whether the line is curved between points
  // bezierCurve : true,
  
  // //Boolean - Whether to show a dot for each point
  // pointDot : true,
  
  // //Number - Radius of each point dot in pixels
  // pointDotRadius : 3,
  
  // //Number - Pixel width of point dot stroke
  // pointDotStrokeWidth : 1,
  
  // //Boolean - Whether to show a stroke for datasets
  // datasetStroke : true,
  
  // //Number - Pixel width of dataset stroke
  // datasetStrokeWidth : 2,
  
  // //Boolean - Whether to fill the dataset with a colour
  // datasetFill : true,
  
  // //Boolean - Whether to animate the chart
  // animation : true,

  // //Number - Number of animation steps
  // animationSteps : 60,
  
  // //String - Animation easing effect
  // animationEasing : "easeOutQuart",

  // //Function - Fires when the animation is complete
  // onAnimationComplete : null
  
}

/////// Functions///////////////////////////////

  var arrayFunc = function(arrayObj, oKey){
    var dataArray = [];
    for (var i=0;i<arrayObj.length;i++) {
      console.log(arrayObj[i][oKey]);
      dataArray.push(arrayObj[i][oKey]);
    }
    return dataArray;
  };

  // jQuery selector for CSV file upload, returning a array of object sorte by date acensently//////////////////
  $('#btn').on('click', function(e){
    
    e.preventDefault();

    // Using Papa Parse to parse CSV file into array of objects, using default config. ////////////
    $('#data-input').parse({
      config: {
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        preview: 0,
        step: undefined
      },

      // further process of the raw data to save into the global variable resultArray. See notes below for more detail. ////////
      complete: function(results){                                                                     
        
        for (var i=0; i<results.results.rows.length; i++) {
          var currentRow = results.results.rows[i];
          var obj = {};
          for (var key in currentRow) {
            if (keyArray[keyArray.indexOf(key)] === key) {
              obj[key] = currentRow[key];
            }
          }
          resultArray.push(obj);
        }
      function compare (a,b) {
        if (a.Date < b.Date){
          return -1;
          }
        if (a.Date > b.Date){
          return 1;
          }
        return 0;
      };
      resultArray.sort(compare);

      // console.log(resultArray);
      dateArray4Chart = arrayFunc(resultArray, "Date");
      lifetimeTotalLikeArray4Chart = arrayFunc(resultArray, "Lifetime: The total number of people who have liked your Page. (Unique Users)");

      var ctx = document.getElementById("myChart").getContext("2d");
      var ctx = $("#myChart").get(0).getContext("2d");
      var myNewChart = new Chart(ctx);


      var data = {
        labels : dateArray4Chart,
        datasets : [
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : lifetimeTotalLikeArray4Chart
          },
        ]
      }

      new Chart(ctx).Line(data, options);  
      }
    });

    // Sort result by date ////////


  }); /* $('#data-input') closer*/
  
  
  
  
  
  

  
// });
