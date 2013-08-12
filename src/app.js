
var start = function() {
  var model = require('./model')
  var views = require('./views')

  var MyRouter = Backbone.Router.extend({
    routes: {
      'app/details/:id': 'details'
    },
    details: function(id) {
      var newDetailView = new views.DetailView().render()
      $('#details').html(newDetailView.$el)
    }
  })

  var initialize = function() {
    var initialTasks = [
      {id: 1, title: 'Go to Node.js Meetup'},
      {id: 2, title: 'Code some Backbone'}
    ]

    var allTasks = new model.Tasks(initialTasks)

    var router = new MyRouter()
    Backbone.history.start({pushState: true, silent: false})

    var singleTaskView = new views.TaskView({model: allTasks.at(0)})

    singleTaskView.render()

    $('#todos').html(singleTaskView.$el)
  }

  initialize()
}

$(start)

