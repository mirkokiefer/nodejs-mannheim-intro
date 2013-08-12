
var Task = Backbone.Model.extend()

var Tasks = Backbone.Collection.extend({
  model: Task
})

module.exports = {
  Task: Task,
  Tasks: Tasks
}
