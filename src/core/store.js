/**
 * A really simple Flux based store - we're holding a state object which can be tracked by a subscription.
 * The subscriptions are a key-value object which hold a name:function, which will be called on each state change.
 */
class Store {
  constructor() {
    this.state = null;
    this.initialized = false;
    this.subscriptions = {};
  }

  createStore(state) {
    this.initialized = true;
    this.state = state;
  }

  subscribe(subscription, name) {
    if (this.subscriptions[name]) {
      return;
    }

    this.subscriptions[name] = subscription;
  }

  setState(newState) {
    if (!this.initialized) {
      console.log('[Store.setState] Store not initialized');
      return;
    }

    const prevState = this.state;
    // console.log('[Store.setState] prevState', prevState);
    this.state = {
      ...this.state,
      ...newState
    };
    // console.log('[Store.setState] state', this.state);

    Object.keys(this.subscriptions).map((name) => {
      this.subscriptions[name](this.state, prevState);
    });
  }
}

export default Store;
