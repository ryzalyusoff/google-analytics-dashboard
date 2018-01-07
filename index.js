gapi.analytics.ready(function() {

  /**
   * Authorize the user immediately if the user has already granted access.
   * If no access has been created, render an authorize button inside the
   * element with the ID "embed-api-auth-container".
   */
  gapi.analytics.auth.authorize({
    container: 'embed-api-auth-container',
    clientid: '443036188844-118udhs8cjjmffiav4o4ahrartqiqb52.apps.googleusercontent.com'
  });

  var dataCharts = [];

  /**
   * Create a new DataChart instance with the given query parameters
   * and Google chart options. It will be rendered inside an element
   * with the id "chart-container".
   */
  var dataChart1 = new gapi.analytics.googleCharts.DataChart({
    query: {
      metrics: 'ga:sessions',
      dimensions: 'ga:date'
    },
    chart: {
      container: 'chart-1-container',
      type: 'LINE',
      options: {
        width: '100%'
      }
    }
  });
  dataCharts.push(dataChart1);

  // GEO Map
  var dataChart2 = new gapi.analytics.googleCharts.DataChart({
    query: {
      metrics: 'ga:sessions',
      dimensions: 'ga:country',
      'max-results': 6,
      sort: '-ga:sessions'
    },
    chart: {
      container: 'chart-2-container',
      type: 'GEO'
    }
  });
  dataCharts.push(dataChart2);

  // Pie Chart
  var dataChart3 = new gapi.analytics.googleCharts.DataChart({
    query: {
      metrics: 'ga:sessions',
      dimensions: 'ga:country',
      'max-results': 6,
      sort: '-ga:sessions'
    },
    chart: {
      container: 'chart-3-container',
      type: 'PIE',
      options: {
        width: '100%',
        pieHole: 4/9
      }
    }
  });
  dataCharts.push(dataChart3);

  /**
   * Create a new DateRangeSelector instance to be rendered inside of an
   * element with the id "date-range-selector-1-container", set its date range
   * and then render it to the page.
  */
  var dateRange = {
    'start-date': '30daysAgo',
    'end-date': 'yesterday'
  };
  var dateRangeSelector = new gapi.analytics.ext.DateRangeSelector({
    container: 'date-range-selector-container'
  })
  .set(dateRange)
  .execute();

  /**
   * Create a ViewSelector for the first view to be rendered inside of an
   * element with the id "view-selector-container".
   */
  var viewSelector = new gapi.analytics.ViewSelector({
    container: 'view-selector-container'
  });

  // Render view selector to the page.
  viewSelector.set(dateRange).execute();

  /**
   * Update the first dataChart when the first view selecter is changed.
   */
  viewSelector.on('change', function(ids) {
    dataCharts.forEach(function(dataChart) {
      dataChart.set({query: {ids: ids}}).execute();
    });
  });

  /**
   * Register a handler to run whenever the user changes the date range from
   * the first datepicker. The handler will update the first dataChart
   * instance as well as change the dashboard subtitle to reflect the range.
   */
  dateRangeSelector.on('change', function(data) {
    dataCharts.forEach(function(dataChart) {
      dataChart.set({query: data}).execute();
    });

    // Update the "from" dates text.
    var datefield = document.getElementById('from-dates');
    datefield.textContent = data['start-date'] + '&mdash;' + data['end-date'];
  });

});
