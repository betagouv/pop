export default function ruleQuery(key, operator, value) {
  if (operator === "<>") {
    // { value: "<>", text: "exist" },
    return {
      bool: {
        // Must exists ...
        must: { exists: { field: key } },
        // ... and must be not empty.
        must_not: { term: { [`${key}.keyword`]: "" } }
      }
    };
  } else if (operator === "><") {
    // { value: "><", text: "n'existe pas" }
    return {
      bool: {
        // Should be ...
        should: [
          // ... empty string ...
          { term: { [`${key}.keyword`]: "" } },
          // ... or not exists.
          { bool: { must_not: { exists: { field: key } } } }
        ]
      }
    };
  } else if (operator === "==" && value) {
    // { value: "==", text: "égal à" },
    return { term: { [`${key}.keyword`]: value } };
  } else if (operator === "!=" && value) {
    // { value: "!=", text: "différent de" },
    return {
      must_not: { term: { [`${key}.keyword`]: value } }
    };
  } else if (operator === ">=" && value) {
    // { value: ">=", text: "supérieur ou égal à" },
    return { range: { [`${key}.keyword`]: { gte: value } } };
  } else if (operator === "<=" && value) {
    // { value: "<=", text: "inférieur ou égal à" },
    return { range: { [`${key}.keyword`]: { lte: value } } };
  } else if (operator === "<" && value) {
    // { value: "<", text: "strictement inférieur à" },
    return { range: { [`${key}.keyword`]: { lt: value } } };
  } else if (operator === ">" && value) {
    // { value: ">", text: "strictement supérieur à" },
    return { range: { [`${key}.keyword`]: { gt: value } } };
  } else if (operator === "^" && value) {
    // { value: "^", text: "commence par" }
    return { wildcard: { [`${key}.keyword`]: `${value}*` } };
  } else if (operator === "*" && value) {
    // { value: "*", text: "contient" }
    return {
      wildcard: { [`${key}.keyword`]: `*${value}*` }
    };
  } else {
    return null;
  }
}
