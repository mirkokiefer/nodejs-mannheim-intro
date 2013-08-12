
var initialTodos = [
  {title: 'Go to Node.js Meetup', isDone: true},
  {title: 'Learn to node', isDone: false},
  {title: 'Write a cool app', isDone: false}
]

var model = {}
model.Todo = Backbone.Model.extend({})

model.Todos = Backbone.Collection.extend({
  model: model.Todo
})

var allTodos = new model.Todos(initialTodos)

var views = {}

views.TodoItem = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.render)
    var source   = $("#todo-template").html()
    this.template = Handlebars.compile(source)
  },
  events: {
    'click .done': 'doneClicked',
    'click .title': 'edit',
    'click .save': 'save'
  },
  doneClicked: function() {
    var isDone = this.$('.done').is(":checked")
    this.model.set('isDone', isDone)
  },
  edit: function() {
    this.isEditing = true
    this.render()
  },
  save: function() {
    this.isEditing = false
    var newTitle = this.$('.input-title').val()
    this.model.set('title', newTitle)
  },
  render: function() {
    var data = this.model.toJSON()
    data.isEditing = this.isEditing
    this.$el.html(this.template(data))
    return this
  }
})

views.Todos = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "change", this.render)
    var source   = $("#todos-template").html()
    this.template = Handlebars.compile(source)
  },
  render: function() {
    this.$el.html(this.template())
    var childViews = this.collection.map(function(each) {
      return new views.TodoItem({model: each})
    })

    var el = this.$('.todo-list')
    el.empty()
    childViews.forEach(function(each) {
      el.append(each.render().el)
    })
    return this
  }
})

var todosView = new views.Todos({collection: allTodos})

$('#todos').html(todosView.render().el)
