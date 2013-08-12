
var TaskView = Backbone.View.extend({
  tagName: 'li',
  initialize: function() {
    var source = $('#todo-template').html()
    this.template = Handlebars.compile(source)
  },
  events: {
    'click .title': 'clicked'
  },
  clicked: function() {
    var id = this.model.id
    router.navigate('app/details/' + id, {trigger: true})
    return false
  },
  render: function() {
    var data = this.model.toJSON()
    this.$el.html(this.template(data))
    return this
  }
})

var DetailView = Backbone.View.extend({
  render: function() {
    this.$el.html('<h2>Details</h2>')
    return this
  }
})

module.exports = {
  TaskView: TaskView,
  DetailView: DetailView
}
