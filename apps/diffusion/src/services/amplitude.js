const amplitudeService = {};
amplitudeService.init = function() {
  if (process.env.NODE_ENV === "production" && amplitude) {
    amplitude.getInstance().init("6e94a0dbfe3dec83eb4adab5088fc084");
  }
};

amplitudeService.logEvent = function(eventName, properties = {}) {
  console.log("TRACK", eventName, properties);
  console.log("TRACKED", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production" && amplitude) {
    console.log("OK");
    amplitude.getInstance().logEvent(eventName, properties);
  }
};

export default amplitudeService;
