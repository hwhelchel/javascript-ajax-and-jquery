// App Object and Selector
var SaysApp = {}
targets = {
  colorEventSelector: 'a#get_color'
}

// Binder
SaysApp.Binder = function(targets, controller) {
  this.targets = targets
  this.controller = controller
}

SaysApp.Binder.prototype = {
  bind: function(){
    var controller = this.controller
    var sel = targets.colorEventSelector

    $(sel).click(function(e){
      e.preventDefault();
      controller.requestColor();
    })
  }
}

// Controller
SaysApp.Controller = function(config) {
  this.view = config.view
}

SaysApp.Controller.prototype = {
  requestColor: function(){
    var request = 'POST'
    var route = '/color'
    var error = 'error!'
    var controller = this
    var view = this.view
    $.ajax({
      type: request,
      url:  route,
      success: function(resp){
        controller.resp = JSON.parse(resp)
        view.update(controller);
      },
      error: function(resp){
        controller.resp = JSON.parse(resp)
        view.update(controller);
      }
    });
  }
}


// View
SaysApp.View = function(){
}

SaysApp.View.prototype = {
  update: function(dataSource) {
    if (dataSource.resp.cell) {
      this.updateCellColor(dataSource.resp);
    } else {
      this.showError(dataSource.resp);
    }
  },
  updateCellColor: function(resp) {
    $(this.cellSelector(resp.cell)).css(this.cssStyle(resp.color));
  },
  cellSelector: function(cell){
    return 'ul li:nth-child(' + cell + ')'
  },
  cssStyle: function(color) {
    return {'background-color': color}
  },
  showError: function(resp){
    console.log('Sorry did not work!');
    console.log(resp);
  }
}

// Refactor 1.0
// var $Wrapper = {

//   getColor: function(){
//     var wrapper = this
//     var sel = 'a#get_color'
//     $(sel).click(function(e){
//       e.preventDefault();
//       wrapper.requestColor();
//     });
//   },

//   requestColor: function(){
//     var request = 'POST'
//     var route = '/color'
//     var error = 'error!'
//     var wrapper = this
//     $.ajax({
//       type: request,
//       url:  route,
//       success: function(resp){
//         wrapper.updateCellColor(JSON.parse(resp));
//       },
//       error: function(){
//         console.log(error);
//       }
//     });
//   },

//   updateCellColor: function(resp) {
//     $(this.cellSelector(resp.cell)).css(this.cssStyle(resp.color));
//   },

//   cellSelector: function(cell){
//     return 'ul li:nth-child(' + cell + ')'
//   },

//   cssStyle: function(color) {
//     return {'background-color': color}
//   }
// }

$(function(){
  // $Wrapper.getColor();
  SaysApp.controller = new SaysApp.Controller({view: new SaysApp.View()})
  SaysApp.binder = new SaysApp.Binder(targets, SaysApp.controller)
  SaysApp.binder.bind();
});