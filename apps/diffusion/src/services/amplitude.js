export default function logEvent (event, props = {}) {
  window && window.amplitude && window.amplitude.getInstance().logEvent(event, props);
}
