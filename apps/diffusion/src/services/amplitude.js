export default function logEvent (event, props = {}) {
  window && window.amplitude && amplitude.getInstance().logEvent(event, props);
}
