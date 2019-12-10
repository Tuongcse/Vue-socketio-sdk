import io from "socket.io-client";

class VueSocketIO {
  constructor(url = "", options = null) {
    if (!!VueSocketIO.instance) {
      return VueSocketIO.instance;
    }
    VueSocketIO.instance = this;
    if (url === "") throw new Error("Please provide a socket url");
    this.io = io(url, options);
    return this;
  }

  /**
   * @param  {Array} events: Events that you want to subscribe
   * @param  {Array} callbacks: Callbacks that mapped with events
   */
  addEventListeners(events, callbacks) {
    events.map((event, idx) => this.io.addEventListener(event, callbacks[idx]))
  }

  /**
   * @param  {Array} events: List of events that you want to unsubscribe
   */
  removeEventListeners(events) {
    events.map(event => this.io.removeEventListener(event));
  }

  /**
   * Returns all the callbacks for a particular event
   * @param event The event that we're looking for the callbacks of
   * @return An array of callback Functions, or an empty array if we don't have any
   */
  listeners(event) {
    return this.io.listeners(event)
  }

  /**
   * Removes all event listeners on this object
   * @return This Emitter
   */
  removeAllListener() {
    return this.io.removeAllListeners()
  }

  /**
   * Manually disconnect connection
   * @return this socket
   */
  disconnect() {
    this.removeAllListener()
    return this.io.close()
  }

  /**
   * Manually open connection
   * @return this socket
   */
  connect() {
    return this.io.open()
  }
}

export default VueSocketIO