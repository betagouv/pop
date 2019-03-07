"use strict";

// Le plus ce coeff est gros, moins on se rapproche des zones aillant le plus de notice
const COEFF = 2000;

module.exports = {
  data: getterSetter([], function(arrayOfArrays) {
    var n = arrayOfArrays[0].length;
    return arrayOfArrays
      .map(function(array) {
        return array.length == n;
      })
      .reduce(function(boolA, boolB) {
        return boolA & boolB;
      }, true);
  }),

  clusters: function() {
    var pointsAndCentroids = kmeans(this.data(), { k: this.k(), iterations: this.iterations() });
    var points = pointsAndCentroids.points;
    var centroids = pointsAndCentroids.centroids;

    return centroids.map(function(centroid) {
      return {
        centroid: centroid.location(),
        points: points
          .filter(function(point) {
            return point.label() == centroid.label();
          })
          .map(function(point) {
            return point;
          })
      };
    });
  },

  k: getterSetter(undefined, function(value) {
    return (value % 1 == 0) & (value > 0);
  }),

  iterations: getterSetter(Math.pow(10, 3), function(value) {
    return (value % 1 == 0) & (value > 0);
  })
};

function kmeans(data, config) {
  // default k
  var k = config.k || Math.round(Math.sqrt(data.length / 2));
  var iterations = config.iterations;

  // initialize point objects with data
  var points = data.map(function(vector) {
    return new Point(vector);
  });

  // intialize centroids randomly
  var centroids = [];
  for (var i = 0; i < k; i++) {
    centroids.push(new Centroid(points[i % points.length].location(), i));
  }

  // update labels and centroid locations until convergence
  for (var iter = 0; iter < iterations; iter++) {
    points.forEach(function(point) {
      point.updateLabel(centroids);
    });
    centroids.forEach(function(centroid) {
      centroid.updateLocation(points);
    });
  }
  // return points and centroids
  return {
    points: points,
    centroids: centroids
  };
}

// objects
function Point(location) {
  var self = this;
  this.meta = getterSetter(location);
  this.location = getterSetter(location.coordinates);
  this.label = getterSetter();
  this.updateLabel = function(centroids) {
    var distancesSquared = centroids.map(function(centroid) {
      return sumOfSquareDiffs(self.location(), centroid.location(), self.meta().count / 1000);
    });
    self.label(mindex(distancesSquared));
  };
}

function Centroid(initialLocation, label) {
  var self = this;
  this.location = getterSetter(initialLocation);
  this.label = getterSetter(label);
  this.updateLocation = function(points) {
    var pointsWithThisCentroid = points.filter(function(point) {
      return point.label() == self.label();
    });
    if (pointsWithThisCentroid.length > 0) self.location(averageLocation(pointsWithThisCentroid));
  };
}

// convenience functions
function getterSetter(initialValue, validator) {
  var thingToGetSet = initialValue;
  var isValid =
    validator ||
    function(val) {
      return true;
    };
  return function(newValue) {
    if (typeof newValue === "undefined") return thingToGetSet;
    if (isValid(newValue)) thingToGetSet = newValue;
  };
}

function sumOfSquareDiffs(oneVector, anotherVector, weight = 1) {
  var squareDiffs = oneVector.map(function(component, i) {
    return Math.pow(weight * (component - anotherVector[i]), 2);
  });
  return squareDiffs.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function mindex(array) {
  var min = array.reduce(function(a, b) {
    return Math.min(a, b);
  });
  return array.indexOf(min);
}

function averageLocation(points) {
  let total = 0;
  var vectorSum = points.reduce(
    (a, b) => {
      const coor = b.location();
      const weight = Math.max(b.meta().count / COEFF, 1);
      total += weight;
      return [a[0] + weight * coor[0], a[1] + weight * coor[1]];
    },
    [0, 0]
  );

  return vectorSum.map(function(val) {
    return val / total;
  });
}
