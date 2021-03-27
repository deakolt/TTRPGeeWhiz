import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Chart from './Chart'
import Header from './Header'
import Home from './Home'

const App = () => {
	return (
		<Router>
			<Header />
			<div className="container">
				<Switch>
					<Route path="/chart">
						<Chart />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App
