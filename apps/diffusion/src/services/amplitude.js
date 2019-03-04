const amplitudeService = {};
amplitudeService.init = function() {
  if (process.env.NODE_ENV === "production" && window.amplitude) {
    window.amplitude.getInstance().init("6e94a0dbfe3dec83eb4adab5088fc084");
  }
};

amplitudeService.logEvent = function(eventName, properties = {}) {
  console.log("TRACK", eventName, properties);
  console.log("TRACKED", process.env.NODE_ENV, window.amplitude);
  if (process.env.NODE_ENV === "production" && window.amplitude) {
    console.log("OK");
    window.amplitude.getInstance().logEvent(eventName, properties);
  }
};

export default amplitudeService;
