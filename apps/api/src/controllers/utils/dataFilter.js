function cleanArrayValue(notice){
    for (const [key, value] of Object.entries(notice)) {
        if(Array.isArray(value)){
        notice[key] = value.filter( el => el !== "");
        }
    }
}

module.exports = {
    cleanArrayValue
}