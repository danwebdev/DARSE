'use strict';

// var MainView = require('./views/main');
var Me = require( './models/me' );
var Router = require( './router' );
var React = require( 'react' );
var TodoList = require('./views/reactroot');
var Todos = require( './models/todos' );


window.app = {
  init: function () {
    // Model representing state for
    // user using the app. Calling it
    // 'me' is a bit of convention but
    // it's basically 'app state'.
    this.todos = new Todos();

   	React.render(
    	<TodoList collection={this.todos}/>,
    	document.getElementById( 'app' )
  	);
    
    // Create and fire up the router
    // this.router = new Router();
    // this.router.history.start();


  }
};

window.app.init();
