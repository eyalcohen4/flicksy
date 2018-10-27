/**
 * A really simple store for state managment:
 * We're holding a state object which can be tracked by a subscription,
 * Which called after every state change.
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

    this.state = {
      ...this.state,
      ...newState
    };

    Object.keys(this.subscriptions).map((name) => {
      this.subscriptions[name](this.state, prevState);
    });
  }
}

export default Store;
