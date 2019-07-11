const diff = require("deep-diff").diff;

export function compare(importedObject, existed) {
  // Make the imported object flat

  let imported = importedObject.makeItFlat();
  delete imported["POP_IMPORT"];

  // I had to do this because sometimes, on IE 11, some fields are not compared well.
  // The origin of the issue could be somewhere else but I couldnt find it
  let importedObj = JSON.parse(JSON.stringify(imported));
  let existedObj = JSON.parse(JSON.stringify(existed));

  let d = diff(importedObj, existedObj);

  /*
  Differences are reported as one or more change records. Change records have the following structure:
  kind - indicates the kind of change; will be one of the following:
  N - indicates a newly added property/element
  D - indicates a property/element was deleted
  E - indicates a property/element was edited
  A - indicates a change occurred within an array
  path - the property path (from the left-hand-side root)
  lhs - the value on the left-hand-side of the comparison (undefined if kind === 'N')
  rhs - the value on the right-hand-side of the comparison (undefined if kind === 'D')
  index - when kind === 'A', indicates the array index where the change occurred
  item - when kind === 'A', contains a nested change record indicating the change that occurred at the array index
*/

  d = d.filter(e => {
    // Remove if the actual notice has more info that the new one.
    // I.e: the current file does not contains all the modified values.
    if (e.kind === "N" && e.hasOwnProperty("rhs")) {
      return false;
    }
    return true;
  });

  const differences = d.map(e => e.path[0]);
  return differences;
}
