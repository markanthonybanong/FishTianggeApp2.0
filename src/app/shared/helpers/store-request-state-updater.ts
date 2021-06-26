import { StoreRequestStateUpdater } from '../types';

export function getStoreRequestStateUpdater(
    store: any,
  ): StoreRequestStateUpdater {
    return (requestName, requestState) => {
        store.setState({
            ...store.state,
            requests: {
                ...store.state.requests,
                [requestName]: requestState,
            },
        });
    };
  }