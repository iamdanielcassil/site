'use strict';

import main from 'screens/main/main';
import foundations from 'foundations/';

// let actions;

// /**
//  * Called by actions.js to avoid circular dependencies.
//  */
// function init(actionsRef) {
// 	actions = actionsRef;
// }

const store = foundations.store;

/**
 * Components Actions module.
 * @module ComponentsActions
 */

/**
 * Register a component to listen to desired state changes. Returns a high order component that will automatically
 * be updated whenever the state changes. All needed state will be in "props" instead of the component's "state."
 * @param {Object} propsToStateKeyMap - The map of state keys to component props that the component should update on
 * @param {ReactComponent} Component - The react component to wrap
 * @return {ReactComponent} High order component
 * @memberof ComponentsActions
 */
export function mapStateToProps(propsToStateKeyMap, Component) {
	return store.subscribe(Component, propsToStateKeyMap);
}


