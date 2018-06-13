import $ from '$'

class Emmiter {
  constructor () {
    this.emmiter = $({})
  }

  on (event, callback) {
    this.emmiter.on(event, callback)
  }
  off (event) {
    this.emmiter.off(event)
  }
  emit (event, params) {
    this.emmiter.trigger(event, params)
  }
}

export default new Emmiter()