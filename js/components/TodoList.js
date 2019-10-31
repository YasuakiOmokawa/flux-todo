var React = require('react');
var Todo  = require('./Todo');

module.exports = React.createClass({
  render: function() {
    var todos = this.props.todos.map(function(todo) {
      return <Todo key={todo.id} id={todo.id} created_at={todo.created_at}>{todo.name}</Todo>;
    });
    return (
      <div className="todoList">
        {todos}
      </div>
    );
  }
});