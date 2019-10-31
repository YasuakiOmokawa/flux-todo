var React       = require('react');
var TodoActions = require('../actions/TodoActions');

module.exports = React.createClass({
  handleDestroy: function(e) {
    e.preventDefault();

    TodoActions.destroy(this.props.id);
  },

  render: function() {
    return (
      <div className="todo">
        <span className="name">{this.props.children}</span>
        <span className="date">{this.props.created_at}</span>
        <button onClick={this.handleDestroy}>削除</button>
      </div>
    );
  }
});