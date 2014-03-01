var $Wrapper = {

  getColor: function(){
    var wrapper = this
    var sel = 'a#get_color'
    $(sel).click(function(e){
      e.preventDefault();
      wrapper.requestColor();
    });
  },

  requestColor: function(){
    var request = 'POST'
    var route = '/color'
    var error = 'error!'
    var wrapper = this
    $.ajax({
      type: request,
      url:  route,
      success: function(resp){
        wrapper.updateCellColor(JSON.parse(resp));
      },
      error: function(){
        console.log(error);
      }
    });
  },

  updateCellColor: function(resp) {
    console.log(this.cssStyle(resp.color));
    $(this.cellSelector(resp.cell)).css(this.cssStyle(resp.color));
  },

  cellSelector: function(cell){
    return 'ul li:nth-child(' + cell + ')'
  },

  cssStyle: function(color) {
    return {'background-color': color}
  }
}

$(function(){
  $Wrapper.getColor();
});