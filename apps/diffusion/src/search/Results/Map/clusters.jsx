
// Source: https://github.com/NathanEpstein/clusters/blob/master/clusters.js

// The more this coeff is big, the closer we get to the areas with the most notice
const COEFF = 2000;

module.exports = {
	data: getterSetter([], (arrayOfArrays) => {
		var n = arrayOfArrays[0].length;
		return arrayOfArrays
			.map((array) => array.length == n)
			.reduce((boolA, boolB) => boolA & boolB, true);
	}),

	clusters: function () {
		var pointsAndCentroids = kmeans(this.data(), {
			k: this.k(),
			iterations: this.iterations(),
		});
		var points = pointsAndCentroids.points;
		var centroids = pointsAndCentroids.centroids;

		return centroids.map((centroid) => ({
				centroid: centroid.location(),
				points: points
					.filter((point) => point.label() == centroid.label())
					.map((point) => point),
			}));
	},

	k: getterSetter(undefined, (value) => (value % 1 == 0) & (value > 0)),

	iterations: getterSetter(Math.pow(10, 3), (value) => (value % 1 == 0) & (value > 0)),
};

function kmeans(data, config) {
	// default k
	var k = config.k || Math.round(Math.sqrt(data.length / 2));
	var iterations = config.iterations;

	// initialize point objects with data
	var points = data.map((vector) => new Point(vector));

	// intialize centroids randomly
	var centroids = [];
	for (var i = 0; i < k; i++) {
		centroids.push(new Centroid(points[i % points.length].location(), i));
	}

	// update labels and centroid locations until convergence
	for (var iter = 0; iter < iterations; iter++) {
		points.forEach((point) => {
			point.updateLabel(centroids);
		});
		centroids.forEach((centroid) => {
			centroid.updateLocation(points);
		});
	}
	// return points and centroids
	return {
		points: points,
		centroids: centroids,
	};
}

// objects
function Point(location) {
	this.meta = getterSetter(location);
	this.location = getterSetter(location.coordinates);
	this.label = getterSetter();
	this.updateLabel = (centroids) => {
		var distancesSquared = centroids.map((centroid) => sumOfSquareDiffs(
				this.location(),
				centroid.location(),
				this.meta().count / 1000,
			));
		this.label(mindex(distancesSquared));
	};
}

function Centroid(initialLocation, label) {
	this.location = getterSetter(initialLocation);
	this.label = getterSetter(label);
	this.updateLocation = (points) => {
		var pointsWithThisCentroid = points.filter((point) => point.label() == this.label());
		if (pointsWithThisCentroid.length > 0)
			this.location(averageLocation(pointsWithThisCentroid));
	};
}

// convenience functions
function getterSetter(initialValue, validator) {
	var thingToGetSet = initialValue;
	var isValid =
		validator ||
		((val) => true);
	return (newValue) => {
		if (typeof newValue === "undefined") return thingToGetSet;
		if (isValid(newValue)) thingToGetSet = newValue;
	};
}

function sumOfSquareDiffs(oneVector, anotherVector, weight = 1) {
	var squareDiffs = oneVector.map((component, i) => Math.pow(weight * (component - anotherVector[i]), 2));
	return squareDiffs.reduce((a, b) => a + b, 0);
}

function mindex(array) {
	var min = array.reduce((a, b) => Math.min(a, b));
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
		[0, 0],
	);

	return vectorSum.map((val) => val / total);
}
