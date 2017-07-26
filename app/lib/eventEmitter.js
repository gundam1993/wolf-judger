/**
 * EventEmitter
 */
const EventEmitter = require('eventemitter3')
const EE = new EventEmitter()

EE.delayEmitter =  (name, time, obj={}) => {
  setTimeout(() => {
      EE.emit(name, obj)
    }, time)
}

export default EE