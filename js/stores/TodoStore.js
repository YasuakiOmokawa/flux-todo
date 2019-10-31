var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var _todos = [];

function setup(todos) {
  _todos = todos;
}

function create(name) {
  var todo = {
    id: (Date.now() + Math.floor(Math.random() * 999999)).toString(36),
    name: name,
    created_at: (new Date()).toLocaleString()
  };
  _todos = _todos.concat([todo]);
}

function destroy(id) {
  var newTodos = _todos.filter(function(todo) {return todo.id == id ? false : true});
  _todos = newTodos;
}

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case TodoConstants.TODO_SETUP:
      setup(action.todos);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_CREATE:
      var name = action.name.trim();
      if (name !== '') {
        create(name);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    default:
      // noop
  }
});

module.exports = TodoStore;
