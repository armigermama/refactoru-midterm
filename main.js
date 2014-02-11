// $(function(){

  // set up a global varibale to store the data array of object for charting. //////////////
  var resultArray = [];

  // jQuery selector for CSV file upload:
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
        // console.log("Parsing completed.");
        // console.log("results",results);
        // console.log(results.results.rows[0]["Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)"]);
        
        // selecting only keys listed in keyArray to reduce noise in resultArray./////////////////////
        var keyArray = ["Date", 
          "Lifetime: The total number of people who have liked your Page. (Unique Users)", 
          "Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)",
          "Daily: The number of times users saw your posts via stories published by their friends. (Total Count)"];
        for (var i=0; i<results.results.rows.length; i++) {
          var currentRow = results.results.rows[i];
          var obj = {};
          for (var key in currentRow) {
            if (keyArray[keyArray.indexOf(key)] === key) {
              obj[key] = currentRow[key];
            }
          }
          // console.log("obj",obj);
          resultArray.push(obj);
        }

        // Sort result by date ////////
        function compare (a,b) {
          if (a.Date < b.Date){
            return -1;
            }
          if (a.Date > b.Date){
            return 1;
            }
          return 0;
        }
        resultArray.sort(compare);
        console.log("resultArray",resultArray);
      // console.log("resultArray",resultArray);
      }

    });
  });
  
  
  
// });


// keys needed:
// Date
// Lifetime: The total number of people who have liked your Page. (Unique Users)
// Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)
// Daily: The number of times users saw your posts via stories published by their friends. (Total Count)
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Adelaide, SA, Australia: 30
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Albuquerque, NM: 33
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Atlanta, GA: 51
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Austin, TX: 87
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Baltimore, MD: 28
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Bangalore, Karnataka, India: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Bangkok, Thailand: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Boston, MA: 45
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Boulder, CO: 83
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Brisbane, QLD, Australia: 50
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Brooklyn, NY: 41
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Cairo, Al Qahirah, Egypt: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Calgary, AB, Canada: 29
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Chicago, IL: 108
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Colorado Springs, CO: 34
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Dallas, TX: 31
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Denver, CO: 119
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Dublin, Ireland: 36
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Edmonton, AB, Canada: 31
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Fort Lauderdale, FL: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Houston, TX: 40
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Indianapolis, IN: 31
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Istanbul, Turkey: 32
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Johannesburg, Gauteng, South Africa: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Kansas City, MO: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Kuala Lumpur, Wilayah Persekutuan, Malaysia: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Las Vegas, NV: 41
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - London, England, United Kingdom: 110
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Los Angeles, CA: 161
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Melbourne, VIC, Australia: 67
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Mexico City, Distrito Federal, Mexico: 33
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Miami, FL: 34
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Milwaukee, WI: 29
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Minneapolis, MN: 36
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Montreal, QC, Canada: 33
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Mumbai, Maharashtra, India: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - New Delhi, Delhi, India: 29
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - New York, NY: 140
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Oakland, CA: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Orlando, FL: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Perth, WA, Australia: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Philadelphia, PA: 57
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Phoenix, AZ: 52
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Pittsburgh, PA: 32
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Portland, OR: 70
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Sacramento, CA: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Salt Lake City, UT: 29
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - San Antonio, TX: ""
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - San Diego, CA: 75
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - San Francisco, CA: 86
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Seattle, WA: 64
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Singapore, Singapore: 34
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - St. Louis, MO: 28
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Sydney, NSW, Australia: 60
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Toronto, ON, Canada: 105
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Tucson, AZ: 27
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Vancouver, BC, Canada: 76
// Lifetime: Aggregated Facebook location data, sorted by city, about the people who like your Page. (Unique Users) - Washington, DC: 38
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - AE: 28
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - AR: ""
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - AT: 24
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - AU: 376
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - BD: 24
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - BE: 29
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - BG: 21
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - BR: 72
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - CA: 696
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - CH: 22
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - CL: 23
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - CO: ""
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - CR: 19
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - DE: 100
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - DK: 26
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - EG: 29
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - ES: 64
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - FI: 26
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - FR: 47
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - GB: 347
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - GR: 26
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - HK: ""
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - HR: 40
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - ID: 49
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - IE: 68
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - IL: 27
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - IN: 237
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - IR: ""
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - IT: 49
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - KE: 27
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - MX: 112
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - MY: 45
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - NG: 68
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - NL: 70
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - NO: 47
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - NP: ""
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - NZ: 35
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - PH: 75
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - PK: 17
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - PL: 18
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - PR: 22
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - PT: 56
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - RO: 26
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - SE: 33
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - SG: 34
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - SI: 22
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - TH: 34
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - TR: 50
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - US: 6344
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - VN: ""
// Lifetime: Aggregated Facebook location data, sorted by country, about the people who like your Page. (Unique Users) - ZA: 78