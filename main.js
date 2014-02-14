$(function(){

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
    "Daily: The number of times people have given negative feedback to your Page, by type. (Total Count) - unlike_page_clicks"
    ];

  // The constructor/Class for dashboard creation encapsulation 
  //  ,dateAry, lifetimeLikesAry, dailyUnlikeAry, dailyPeopleEngagedAry, dailyClicksTotalAry, dailyClicksLinkAry, dailyClicksOtherAry, dailyClicksPhotoAry, dailyClicksVideoAry, dailyNegativeAry, dailyPositiveCommentAry, dailyPositiveLikeAry, dailyPositiveLinkAry, dailyPositiveAnswerAry, dailyPositiveRsvpAry, dailyPositiveClaimAry, dailyReachAry, dailyImpressionAry
  var Dashboard = function(results){
    // create result arrays for all data needed in DOM elements
    // this.resultAry = filterObjKeyPairFunc(results.results.rows, keyArray);  
    this.resultAry = filterObjKeyPairFunc(results.results.rows, keyArray);                                                               
      // sort by Date ascendent
    this.check = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given negative feedback to your Page, by type. (Total Count) - unlike_page_clicks");
    // console.log('check',this.check);  
    this.resultAry.sort(compare);
    this.dateAry = mapObjKeyValFunc(this.resultAry, "Date");
    this.lifetimeLikesAry = mapObjKeyValFunc(this.resultAry, "Lifetime: The total number of people who have liked your Page. (Unique Users)");
    this.dailyUnlikeAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of Unlikes of your Page (Unique Users)");
    this.dailyPeopleEngagedAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)");
    this.dailyClicksTotalAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of clicks on any of your content. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count)");
    this.dailyClicksLinkAry =  mapObjKeyValFunc(this.resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - link clicks");
    this.dailyClicksOtherAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - other clicks");
    this.dailyClicksPhotoAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - photo view");
    this.dailyClicksVideoAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of clicks on any of your content, by type. Clicks generating stories are included in &quot;Other Clicks.&quot; Stories generated without clicks on page content (e.g., liking the page in Timeline) are not included. (Total Count) - video play");
    this.dailyNegativeAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given negative feedback to your Page. (Total Count)");
    // console.log('this.dailyNegativeAry',this.dailyNegativeAry);
    // console.log('this.dailyUnlikeAry',this.dailyUnlikeAry);
    this.dailyPositiveAnswerAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - answer");
    this.dailyPositiveClaimAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - claim");
    this.dailyPositiveCommentAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - comment");
    this.dailyPositiveLikeAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - like");
    this.dailyPositiveLinkAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - link");
    this.dailyPositiveRsvpAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of times people have given positive feedback to your Page, by type. (Total Count) - rsvp");
    this.dailyReachAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of people who visited your Page, or saw your Page or one of its posts in news feed or ticker. These can be people who have liked your Page and people who haven't. (Unique Users)");
    this.dailyImpressionAry = mapObjKeyValFunc(this.resultAry, "Daily: The number of impressions seen of any content associated with your Page. (Total Count)");
    // Impression per Reach:
    this.dailyImpressionPerReachAry = arynumDevidedByArynum(this.dailyImpressionAry, this.dailyReachAry);
    // most recent likes:
    this.lifetimeLikesRecent = this.lifetimeLikesAry[this.lifetimeLikesAry.length-1];
    // Total reach of the week:
    this.reachTotal = this.dailyReachAry.reduce(function(a,b){
        return a + b;
      });
    // Total impression of the week:
    this.impressionTotal = this.dailyImpressionAry.reduce(function(a,b){
        return a + b;
      });
    // Total unlike of the week:
    this.unlikeTotal = this.dailyUnlikeAry.reduce(function(a,b){
        return a + b;
      });
    // Total engaged people of the week:
    this.peopleEngagedTotal = this.dailyPeopleEngagedAry.reduce(function(a,b){
        return a + b;
      });
    // % of Audience Enagagement = dailyPeopleEngagedAry / dailyReachAry.
    this.pctAudienceEngageAry = arynumDevidedByArynum(this.dailyPeopleEngagedAry, this.dailyReachAry);
    // Below are the breakdown for total engagement & clicks:
        // Total engagement & clicks of the week:
        this.clicksTotal = this.dailyClicksTotalAry.reduce(function(a,b){
          return a + b;
        });
        // Total negative feedback counts of the week:
        this.negativeTotal = this.dailyNegativeAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in ANSWER of the week:
        this.positiveAnswerTotal = this.dailyPositiveAnswerAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in CLAIM of the week:
        this.positiveClaimTotal = this.dailyPositiveClaimAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in COMMENT of the week:
        this.positiveCommentTotal = this.dailyPositiveCommentAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in LIKE of the week:
        this.positiveLikeTotal = this.dailyPositiveLikeAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in LINK/SHARE of the week:
        this.positiveLinkTotal = this.dailyPositiveLinkAry.reduce(function(a,b){
          return a + b;
        });
        // Total positive feedback in RSVP of the week:
        this.positiveRsvpTotal = this.dailyPositiveRsvpAry.reduce(function(a,b){
          return a + b;
        });
      // Total count of engagements & clicks of the week:
      this.engagementClicksTotal = this.clicksTotal + this.negativeTotal + this.positiveAnswerTotal + this.positiveClaimTotal +
        this.positiveCommentTotal + this.positiveCommentTotal + this.positiveLikeTotal + this.positiveLinkTotal + this.positiveRsvpTotal;
    this.pctEngager = ((this.peopleEngagedTotal/this.reachTotal) * 100).toFixed(1);
    this.pctEngagement = ((this.engagementClicksTotal/this.impressionTotal) * 100).toFixed(1);
  };

/////// Functions///////////////////////////////
////////////////////////////////////////////////

  // Function to map values from an array of object into an array.
  var mapObjKeyValFunc = function(arrayObj, oKey){
    var dataArray = [];
    for (var i=0;i<arrayObj.length;i++) {
      // console.log(arrayObj[i][oKey]);
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

  // Function to take two arrays of numbers WITH EQUAL LENGTH
  // devide each number from 1st ary by 2nd ary,
  // return a new array of number of equal length.
  var arynumDevidedByArynum = function(arynum1, arynum2){
    var arynum = [];
    for (var i=0; i<arynum1.length; i++){
      arynum.push( Math.round((arynum1[i]/arynum2[i]) * 10) / 10 )
    }
    return arynum;
  };

  // var SumAnAryFunc = function(ary){
  //   ary.reduce(function(a,b){
  //       return a + b;
  //     });
  // };

  //Function to sort by Date, for resultAry
  function compare (a,b) {
        if (a.Date < b.Date){
          return -1;
          }
        if (a.Date > b.Date){
          return 1;
          }
        return 0;
  };

  function mkFormatter(num){
    if (num > 999999){
      return (num/1000000).toFixed(1) + 'M';
    } else if (num > 999){
      return (num/1000).toFixed(1) + 'K';
    }
    return num;
  }

  var instantiateFunc = function(cls,aryObj){
    return new cls(aryObj);
  };

  // Function for the click handler on clicking the ACTION button
  Dashboard.prototype.chartFunc = function(e){
    // Chart 1: reach impression
    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'museo-slab'
            }
        }
    });
    
    $('#reach-impression-time-line-chart').highcharts({
      title: {
        text: 'Reach Impression'
      },
      xAxis: {
        categories: this.dateAry,
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
            radius: 5
          }
        }
      }, 
      series: [{
        type: 'column',
        yAxis: 0,
        name: 'Impression',
        data: this.dailyImpressionAry
      }, {
        type: 'line',
        yAxis: 0,
        name: 'Reach',
        data: this.dailyReachAry,
        color: '#e67e22'
      }, {
        type: 'scatter',
        yAxis: 1,
        name: 'Impression per Reach',
        data: this.dailyImpressionPerReachAry,
        color: '#000'
      }]
    });
    // Chart 2: clicks by types
    $('#clicks-by-stack-chart').highcharts({
      title: {
        text: 'Clicks by types'
      },
      xAxis: {
        categories: this.dateAry
      },
      yAxis: [{ //--- Primary yAxis
        title: {
          text: '# of Other/Share Clicks'
          }
        }, {  //--- Secondary yAxis
        title: {
          text: '# of Video/Photo Clicks'
        },
        opposite: true
      }],
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        type: 'column',
        yAxis: 0,
        stack: 'Other/Share',
        name: 'Other clicks',
        data: this.dailyClicksOtherAry
      }, {
        type: 'column',
        yAxis: 0,
        stack: 'Other/Share',
        name: 'Share clicks',
        data: this.dailyClicksLinkAry
      }, {
        type: 'column',
        yAxis: 1,
        stack: 'Photo/Video',
        name: 'Photo clicks',
        data: this.dailyClicksPhotoAry
      }, {
        type: 'column',
        yAxis: 1,
        stack: 'Photo/Video',
        name: 'Video clicks',
        data: this.dailyClicksVideoAry
      }],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b> <br/>',
      }
    });
    // Chart 3: feedbacks by type
    $('#feedback-by-column-chart').highcharts({
      title: {
        text: 'Feedbackss by types'
      },
      xAxis: {
        categories: this.dateAry
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
        data: this.dailyPositiveLikeAry 
      }, {
        type: 'column',
        name: 'Comments',
        yAxis: 0,
        data: this.dailyPositiveCommentAry 
      }, {
        type: 'column',
        name: 'Shares',
        yAxis: 0,
        data: this.dailyPositiveLinkAry 
      }, {
        type: 'line',
        name: 'Negative',
        yAxis: 1,
        data: this.dailyNegativeAry,
        color: '#F00'
      }],
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
      }
    });
  // Datapoints
  $('#datapoint-likes').text(mkFormatter(this.lifetimeLikesRecent));
  $('#datapoint-unlikes').text(mkFormatter(this.unlikeTotal));
  $('#datapoint-engage-user').text(mkFormatter(this.peopleEngagedTotal));
  $('#datapoint-engage-count').text(mkFormatter(this.engagementClicksTotal));
  $('#datapoint-reach').text(mkFormatter(this.reachTotal));
  $('#datapoint-impression').text(mkFormatter(this.impressionTotal));
  $('.data-duration').text(this.dateAry.length);
  $('#pct-engager').html(this.pctEngager + '%<br> reach<br>engaged')
  $('#pct-engagement').html(this.pctEngagement + '%<br> impression<br>engaged')

  // console.log(this.unlikeTotal);  
  };

  /////// Event handlers ///////////////////////////////
  //////////////////////////////////////////////////////

  $('#data-btn').on('click',function(e){
    e.preventDefault();
    $('.site-wrapper').addClass('hide');
    $('.dashboard-container').removeClass('hide');
    // Using Papa Parse to parse CSV file into array of objects, using default config. ////////////
    $('#data-input').parse({
      config: {
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        preview: 0,
        step: undefined
      },
      complete: function(results){  
        var myDashboard = new Dashboard(results);
        myDashboard.chartFunc();
      }
    });
  });

});
