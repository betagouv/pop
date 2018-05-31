const utils = require('../import/utils');

// const TEST = '0087720 ; 0359560'
const TEST = '1655248 ; 8197121'
console.log(utils.extractCoordinates(TEST, 'lambert0', 'lambert0'), 'lambert0');
console.log(utils.extractCoordinates(TEST, 'lambert1', 'lambert1'), 'lambert1');
console.log(utils.extractCoordinates(TEST, 'lambert2', 'lambert2'), 'lambert2');
console.log(utils.extractCoordinates(TEST, 'lambert3', 'lambert3'), 'lambert3');
console.log(utils.extractCoordinates(TEST, 'lambert4', 'lambert4'), 'lambert4');
console.log(utils.extractCoordinates(TEST, 'lambert93', 'lambert93'), 'lambert93');
console.log(utils.extractCoordinates(TEST, 'mtu', 'utm'), 'utm');

console.log('should be 14.620918, -61.054456')
//

// EA95000002 has no zone (1655248 ; 8197121)
// EA95000003 has no zone (1661518 ; 8203876)1318339 ; 7173759