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
    events.map((event, idx) => this.io.addEventListener(event, callbacks[idx]));
  }

  /**
   * @param  {Array} events: List of events that you want to unsubscribe
   */
  removeEventListeners(events) {
    events.map((event) => this.io.removeEventListener(event));
  }

  /**
   * Returns all the callbacks for a particular event
   * @param event The event that we're looking for the callbacks of
   * @return An array of callback Functions, or an empty array if we don't have any
   */
  listeners(event) {
    return this.io.listeners(event);
  }

  /**
   * An override of the base emit. If the event is one of:
   *     connect
   *     connect_error
   *     connect_timeout
   *     connecting
   *     disconnect
   *     error
   *     reconnect
   *     reconnect_attempt
   *     reconnect_failed
   *     reconnect_error
   *     reconnecting
   *     ping
   *     pong
   * then the event is emitted normally. Otherwise, if we're connected, the
   * event is sent. Otherwise, it's buffered.
   *
   * If the last argument is a function, then it will be called
   * as an 'ack' when the response is received. The parameter(s) of the
   * ack will be whatever data is returned from the event
   * @param event The event that we're emitting
   * @param args Optional arguments to send with the event
   * @return This Socket
   */
  emit(event, ...args) {
    return this.io.emit(event, ...args);
  }

  /**
   * Removes all event listeners on this object
   * @return This Emitter
   */
  removeAllListener() {
    return this.io.removeAllListeners();
  }

  /**
   * Manually disconnect connection
   * @return this socket
   */
  disconnect() {
    this.removeAllListener();
    return this.io.close();
  }

  /**
   * Manually open connection
   * @return this socket
   */
  connect() {
    return this.io.open();
  }
}

export default VueSocketIO;
