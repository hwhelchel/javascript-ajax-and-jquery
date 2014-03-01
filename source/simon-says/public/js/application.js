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
    $.ajax({
      type: request,
      url:  route,
      success: function(resp){
        console.log(resp)
      },
      error: function(){
        console.log(error)
      }
    });
  }
}

$(function(){

  $Wrapper.getColor();
});