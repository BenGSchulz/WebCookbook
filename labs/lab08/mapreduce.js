mapCitiesLong = function() {
  emit({
    longitude: Math.floor(this.location.longitude)
  }, {
    count : 1
  });
};

reduceCitiesLong = function(key, values) {
  var total = 0;
  for(var i = 0; i < values.length; i++) {
    var data = values[i];
    if('total' in data) {
      total += data.total;
    } else {
      total += data.count;
    }
  }
  return { total : total };
};

results = db.runCommand({
  mapReduce: 'cities',
  map: mapCitiesLong,
  reduce: reduceCitiesLong,
  out: 'cities.report'
});



