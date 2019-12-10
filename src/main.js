import VueSocketIO from './socketio-client'

export default {
  /**
   * @param  {Vue} Vue
   * @param  {Object} options { url: Connection url, option: SocketIO options }
   */
  install(Vue, options) {
    const {
      url,
      option
    } = options
    if (!url || url === "") throw new Error('Please provide a connection url')
    Vue.prototype.$socket = new VueSocketIO(url, option)
  }
}