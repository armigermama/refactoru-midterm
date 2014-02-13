// $(function(){


/////// Data definitions/////////////////////////////
////////////////////////////////////////////////

  // selecting only keys listed in keyArray to reduce noise in resultAry./////////////////////
  var keyArray = ["Date", 
    "Lifetime: The total number of people who have liked your Page. (Unique Users)", 
    "Daily: The number of Unlikes of your Page (Unique Users)",
    "Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)",
    "Daily: The number of clicks on any of your content. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count)",
    "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - link clicks",
    "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - other clicks",
    "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - photo view",
    "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - video play",
    "Daily: The number of times people have given negative feedback to your Page. (Total Count)",
    "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - answer",
    "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - claim",
    "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - comment",
    "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - like",
    "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - link",
    "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - rsvp",
    "Daily: The number of people who visited your Page, or saw your Page or one of its posts in news feed or ticker. These can be people who have liked your Page and people who haven't. (Unique Users)",
    "Daily: The number of impressions seen of any content associated with your Page. (Total Count)",
    ];


/////// Functions///////////////////////////////
////////////////////////////////////////////////

  // Function to map values from an array of object into an array.
  var mapObjKeyValFunc = function(arrayObj, oKey){
    var dataArray = [];
    for (var i=0;i<arrayObj.length;i++) {
      console.log(arrayObj[i][oKey]);
      dataArray.push(arrayObj[i][oKey]);
    }
    return dataArray;
  };

  // Function to filter out unwanted key value pairs in an array of objects, passing two parameters:
  //  1) an array of objects
  //  2) an arry of strings containing all the keys you would like to keep in target array of objects
  var filterObjKeyPairFunc = function(arrayObj, keyAry){
    var ary = [];
    for (var i=0; i<arrayObj.length; i++) {
      var currentRow = arrayObj[i];
      var obj = {};
      for (var key in currentRow) {
        if (keyAry[keyAry.indexOf(key)] === key) {
          obj[key] = currentRow[key];
          }
        }
      ary.push(obj);
    }
    return ary;
  };

/////// Event handlers ///////////////////////////////
//////////////////////////////////////////////////////

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

      // further process of the raw data to save into the global variable resultAry. See notes below for more detail. ////////
      complete: function(results){     

      // create result arrays for all data needed in DOM elements
      var resultAry = filterObjKeyPairFunc(results.results.rows, keyArray);                                                               

      function compare (a,b) {
        if (a.Date < b.Date){
          return -1;
          }
        if (a.Date > b.Date){
          return 1;
          }
        return 0;
      };
      resultAry.sort(compare);

      // creat arrays4 charts
      var dateAry = mapObjKeyValFunc(resultAry, "Date");

      var lifetimeLikesAry = mapObjKeyValFunc(resultAry, "Lifetime: The total number of people who have liked your Page. (Unique Users)");
      var dailyUnlikeAry = mapObjKeyValFunc(resultAry, "Daily: The number of Unlikes of your Page (Unique Users)");
      
      var dailyPeopleEngagedAry = mapObjKeyValFunc(resultAry, "Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)");
      var dailyClicksTotalAry = mapObjKeyValFunc(resultAry, "Daily: The number of clicks on any of your content. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count)");
      
      var dailyClicksLinkAry =  mapObjKeyValFunc(resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - link clicks");
      var dailyClicksOtherAry = mapObjKeyValFunc(resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - other clicks");
      var dailyClicksPhotoAry = mapObjKeyValFunc(resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - photo view");
      var dailyClicksVideoAry = mapObjKeyValFunc(resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - video play");

      var dailyNegativeAry = mapObjKeyValFunc(resultAry, "Daily: The number of times people have given negative feedback to your Page. (Total Count)");
      var dailyPositiveAnswerAry = mapObjKeyValFunc(resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - answer");
      var dailyPositiveClaimAry = mapObjKeyValFunc(resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - claim");
      var dailyPositiveCommentAry = mapObjKeyValFunc(resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - comment");
      var dailyPositiveLikeAry = mapObjKeyValFunc(resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - like");
      var dailyPositiveLinkAry = mapObjKeyValFunc(resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - link");
      var dailyPositiveRsvpAry = mapObjKeyValFunc(resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - rsvp");

      var dailyReachAry = mapObjKeyValFunc(resultAry, "Daily: The number of people who visited your Page, or saw your Page or one of its posts in news feed or ticker. These can be people who have liked your Page and people who haven't. (Unique Users)");
      var dailyImpressionAry = mapObjKeyValFunc(resultAry, "Daily: The number of impressions seen of any content associated with your Page. (Total Count)");

      // create array interactions for values to display in charts or DOM elements

      // most recent likes:
      var lifetimeLikesRecent = lifetimeLikesAry[lifetimeLikesAry.length];

      // Total unlike of the week:
      var unlikeTotal = dailyUnlikeAry.reduce(function(a,b){
        return a + b;
      });

      // Total engaged people of the week:
      var peopleEngagedTotal = dailyPeopleEngagedAry.reduce(function(a,b){
        return a + b;
      });

      // Below are the breakdown for total engagement & clicks:
        // Total engagement & clicks of the week:
        var clicksTotal = dailyClicksTotalAry.reduce(function(a,b){
          return a + b;
        });
        // Total negative feedback counts of the week:
        var negativeTotal = dailyNegativeAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in ANSWER of the week:
        var positiveAnswerTotal = dailyPositiveAnswerAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in CLAIM of the week:
        var positiveClaimTotal = dailyPositiveClaimAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in COMMENT of the week:
        var positiveCommentTotal = dailyPositiveCommentAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in LIKE of the week:
        var positiveLikeTotal = dailyPositiveLikeAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in LINK/SHARE of the week:
        var positiveLinkTotal = dailyPositiveLinkAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in RSVP of the week:
        var positiveRsvpTotal = dailyPositiveRsvpAry.reduce(function(a,b){
          return a + b;
        });
      // Total count of engagements & clicks of the week:
      var engagementClicksTotal = clicksTotal + negativeTotal + positiveAnswerTotal + positiveClaimTotal +
        positiveCommentTotal + positiveCommentTotal + positiveLikeTotal + positiveLinkTotal + positiveRsvpTotal;
      

      $(function () { 
        $('#reach-impression-time-line-chart').highcharts({
          title: {
            text: 'Reach Impression'
          },
          xAxis: {
            categories: dateAry
          },
          yAxis: [{ //--- Primary yAxis
            title: {
              text: 'Peopel (Reach)'
                }
              }, {  //--- Secondary yAxis
              title: {
                      text: 'Count (Impression)'
                    },
                    opposite: true
              }],
              series: [{
                  type: 'column',
                  yAxis: 0,
                  name: 'Impression',
                  data: dailyImpressionAry
              }, {
                  type: 'line',
                  yAxis: 1,
                  name: 'Reach',
                  data: dailyReachAry
              }]
          });
      });

      $(function () {
        $('#clicks-by-stack-chart').highcharts({
          title: {
            text: 'Clicks by types'
          },
          chart: {
              type: 'column'
          },
          xAxis: {
              categories: dateAry
          },
          
          plotOptions: {
              series: {
                  stacking: 'normal'
              }
          },
          series: [{
              name: 'Video clicks',
              data: dailyClicksVideoAry
          }, {
              name: 'Photo clicks',
              data: dailyClicksPhotoAry
          }, {
              name: 'Share clicks',
              data: dailyClicksLinkAry
          }, {
              name: 'Other clicks',
              data: dailyClicksOtherAry
          }],
          tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage}%)<br/>'
          }
        });
      });

      $(function () {
        $('#feedback-by-line-chart').highcharts({
          title: {
            text: 'Clicks by types'
          },
          chart: {
              type: 'line'
          },
          xAxis: {
              categories: dateAry
          },
          series: [{
              name: 'Likes',
              data: dailyPositiveLikeAry 
          }, {
              name: 'Comments',
              data: dailyPositiveCommentAry 
          }, {
              name: 'Shares',
              data: dailyPositiveLinkAry 
          }, {
              name: 'Answers',
              data: dailyPositiveAnswerAry 
          }, {
              name: 'Claims',
              data: dailyPositiveClaimAry 
          }],
          tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage}%)<br/>'
          }
        });
      });

      //  Create line chart for Reach/Impression over per day
      // get the context of our canvas with jQuery,  and call the getContext("2d") method on that.
      // var ctx1 = $("#reach-impression-time-line-chart").get(0).getContext("2d");

      // var reachImpressionLineData = {
      //   labels : dateAry,
      //   datasets : [
      //     {
      //       fillColor : "rgba(220,220,220,0.5)",
      //       strokeColor : "rgba(220,220,220,1)",
      //       pointColor : "rgba(220,220,220,1)",
      //       pointStrokeColor : "#fff",
      //       data : dailyImpressionAry
      //     },
      //     {
      //       fillColor : "rgba(151,187,205,0.5)",
      //       strokeColor : "rgba(151,187,205,1)",
      //       pointColor : "rgba(151,187,205,1)",
      //       pointStrokeColor : "#fff",
      //       data : dailyReachAry
      //     }
      //   ]
      // }

      // new Chart(ctx1).Line(reachImpressionLineData, reachImpressionLineOptions); 

      // // Create bar chart for total reach imrpession over the week
      // var ctx2 = $("#reach-impression-total-bar-chart").get(0).getContext("2d");

      // var reachImpressionBarData = {
      //   labels : ["Reach","Impression"],
      //   datasets : [
      //     {
      //       fillColor : "rgba(220,220,220,0.5)",
      //       strokeColor : "rgba(220,220,220,1)",
      //       data : [10]
      //     },
      //     {
      //       fillColor : "rgba(151,187,205,0.5)",
      //       strokeColor : "rgba(151,187,205,1)",
      //       data : [5]
      //     }
      //   ]
      // };

      // new Chart(ctx2).Bar(reachImpressionBarData);

      } /* end bracket for parse complete function*/
    });

    // Sort result by date ////////


  }); /* $('#data-input') closer*/
  
  
  
  
  
  

  
// });
