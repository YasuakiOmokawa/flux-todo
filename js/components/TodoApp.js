var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');
var TodoForm = require('./TodoForm');
var TodoList = require('./TodoList');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      todos: TodoStore.getAll()
    };
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
    TodoActions.setup();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ todos: TodoStore.getAll() });
  },

  render: function() {
    return (
      <div className="todoApp">
        <h1>TODO Application</h1>
        <TodoForm />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
});