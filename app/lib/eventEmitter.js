/**
 * EventEmitter
 */
const EventEmitter = require('eventemitter3')
const EE = new EventEmitter()

EE.delayEmitter =  (name, time) => {
  setTimeout(() => {
      EE.emit(name)
    }, time)
}

export default EE