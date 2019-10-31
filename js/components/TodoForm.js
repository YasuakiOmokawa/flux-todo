var React = require('react');
var TodoActions  = require('../actions/TodoActions');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var name = React.findDOMNode(this.refs.name);
    TodoActions.create(name.value.trim());
    name.value = '';
  },

  render: function() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="TODOを入力..." ref="name" />
        <button type="submit">作成</button>
      </form>
    );
  }
});