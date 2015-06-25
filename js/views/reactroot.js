var React = require( 'react' )
var AmpersandReactViewMixin = require( 'ampersand-react-view-mixin' );

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var TodoItem = React.createClass( {
  getInitialState: function () {
    return ({
      'editing': false,
      'editText': ''
    });
  },
  handleDoubleClick: function () {
    this.setState( {
      editing: true,
      editText: this.props.item.title
    } );
  },
  handleBlur: function () {
    this.handleSubmit();
  },
  handleChange: function ( e ) {
    this.setState( {
      editText: e.target.value
    } );
  },
  handleKeyDown: function ( e ) {
    if ( e.which === ENTER_KEY ) {
      this.handleSubmit();
    } else if ( e.which === ESCAPE_KEY ) {
      this.setState( {
        editing: false
      } );
    };
  },
  handleSubmit: function () {

    var val = this.state.editText.trim();
    if ( val ) {
      this.props.item.set( {
        title: val
      } );
      this.setState( {
        editing: false
      } );
    } else {
      this.props.onDestroy();
    }
  },
  handleDestroy: function () {
    this.props.onDestroy();
  },
  componentDidUpdate: function () {
    if ( this.state.editing ) {
      var input = React.findDOMNode( this.refs.inputField );
      input.focus();
      input.setSelectionRange( input.value.length, input.value.length );

    }

  },
  render: function () {
    var input = this.state.editing ?
      <input onKeyDown={this.handleKeyDown} defaultValue={this.state.editText} onChange={this.handleChange} ref="inputField" onBlur={this.handleBlur} className="edit">
      </input> : undefined;
    return (
    < li className={ "todoItem"+(this.state.editing? " editing": "")}>
      <div className="view">
        <input className="toggle" type="checkbox"></input>
        <label onDoubleClick={this.handleDoubleClick}>{this.props.item.title}</label>
        <button onClick={this.handleDestroy} className="destroy"></button>
      </div>
      {input}
      < /li>
    );
  }
} );

var TodosHeader = React.createClass( {
  handleKeyDown: function ( e ) {
    if ( e.which !== ENTER_KEY ) {
      return;
    };
    var val = this.refs.newField.getDOMNode().value.trim();
    if ( val === '' ) {
      return;
    };this.props.onNewItem( val );
    this.refs.newField.getDOMNode().value = '';
  },
  render: function () {
    return (
    <header id="header">
      <h1>Daniel</h1>
      <input onKeyDown={this.handleKeyDown} ref="newField" id="new-todo" placeholder="What to do?" autofocus />
    </header>
    );
  }
} );

var TodoList = React.createClass( {
  getInitialState: function(){
    return {_collection:this.props.collection};
  },
  componentWillMount: function(){
    this.props.collection.on("add remove change", this.handleCollectionEvent);

  },
  handleCollectionEvent: function(){
    this.setState(this.props.collection);
  },

  onNewItem: function ( val ) {
    console.log( 'onnewitem' );
    this.props.collection.add( {
      'title': val
    }, {
      at: 0
    } );
  },
  destroy: function ( item ) {
    console.log( 'ondestroy' );
    this.props.collection.remove( item );
  },
  componentDidUpdate: function () {
    console.log( '>>> Component Updated' );
  },
  render: function () {
    var self = this;
    var items = this.props.collection.map( function ( item ) {
      return (
      <TodoItem item={item} onDestroy={self.destroy.bind(self, item)} />
      );
    } );
    return (
    <section id="todoapp">
      <TodosHeader onNewItem={this.onNewItem}/>
      <section id="main">
        <ul id="todo-list">
          {items}
        </ul>
      </section>
      <footer id="footer"></footer>
    </section>

    );
  }
} );




module.exports = TodoList;
