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

  // function to take two arrays of numbers WITH EQUAL LENGTH
  // devide each number from 1st ary by 2nd ary,
  // return a new array of number of equal length.
  var arynumDevidedByArynum = function(arynum1, arynum2){
    var arynum = [];
    for (var i=0; i<arynum1.length; i++){
      arynum.push( Math.round((arynum1[i]/arynum2[i]) * 10) / 10 )
    }
    return arynum;
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

      // Impression per Reach:
      var dailyImpressionPerReachAry = arynumDevidedByArynum(dailyImpressionAry, dailyReachAry);

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

      // % of Audience Enagagement = dailyPeopleEngagedAry / dailyReachAry.
      var pctAudienceEngageAry = arynumDevidedByArynum(dailyPeopleEngagedAry, dailyReachAry);

      // Making negative feedback into negative values for charting:
      var dailyNegativeMinusAry = map(dailyNegativeAry, function(num){
        return 0 - num;
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
              text: 'People for Reach & Count for Impression'
              }
            }, {  //--- Secondary yAxis
            title: {
              text: '# of Impression per Reach'
            },
            opposite: true
          }],
          plotOptions: {
            scatter: {
              dataLabels: {
                enabled: true,
                color: '#000',
                align: 'left',
                borderRadius: 5,
                backgroundColor: 'rgba(252, 255, 197, 0.7)',
                borderWidth: 1,
                borderColor: '#AAA',
                y: -6
              },
              marker: {
                radius: 7
              }
            }
          },
          series: [{
            type: 'column',
            yAxis: 0,
            name: 'Impression',
            data: dailyImpressionAry
          }, {
            type: 'line',
            yAxis: 0,
            name: 'Reach',
            data: dailyReachAry,
            color: '#e67e22'
          }, {
            type: 'scatter',
            yAxis: 1,
            name: 'Impression per Reach',
            data: dailyImpressionPerReachAry,
            color: '#000'
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
          yAxis: {
            endOnTick: false
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
            pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage: 1f}%)<br/>'
          }
        });
      });

      $(function () {
        $('#feedback-by-column-chart').highcharts({
          title: {
            text: 'Feedbackss by types'
          },
          xAxis: {
            categories: dateAry
          },
          yAxis: [{ //--- Primary yAxis
            title: {
              text: 'Count of Positive Feedbacks'
                }
              }, {  //--- Secondary yAxis
            title: {
              text: 'Count of Negative Feedbacks'
            },
            opposite: true
          }],
          series: [{
            type: 'column',
            name: 'Likes',
            yAxis: 0,
            data: dailyPositiveLikeAry 
          }, {
            type: 'column',
            name: 'Comments',
            yAxis: 0,
            data: dailyPositiveCommentAry 
          }, {
            type: 'column',
            name: 'Shares',
            yAxis: 0,
            data: dailyPositiveLinkAry 
          }, {
            type: 'line',
            name: 'Negative',
            yAxis: 1,
            data: dailyNegativeAry,
            color: '#F00'
          }],
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage: 1f}%)<br/>'
          }
        });
      });

      
      } /* end bracket for parse complete function*/
    });


  }); /* $('#data-input') closer*/
  
  
  
  
  
  

  
// });
