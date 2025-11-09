interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: Array<any>): boolean;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.
export default class EventEmitter implements IEventEmitter {
  events: Map<string, Array<Function>>;

  constructor() {
   this.events = new Map();
  }

  on(eventName: string, listener: Function): IEventEmitter {
    if (this.events.has(eventName)) {
      const listeners: Array<Function> = this.events.get(eventName)!;
      listeners.push(listener);
    } else {
      const listeners: Array<Function> = [];
      listeners.push(listener);
      this.events.set(eventName, listeners);
    }

    return this;
  }

  off(eventName: string, listener: Function): IEventEmitter {
    if (this.events.has(eventName)) {
      const listeners: Array<Function> = this.events.get(eventName)!;
      listeners.splice(listeners.indexOf(listener), 1);

      if (listeners.length === 0) {
        this.events.delete(eventName);
      }
    }

    return this;
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    if (this.events.has(eventName)) {
      const listeners: Array<Function> = this.events.get(eventName)!;

      for (const listener of listeners) {
        listener.apply(null, args);
      }

      return true;
    }

    return false;
  }
}