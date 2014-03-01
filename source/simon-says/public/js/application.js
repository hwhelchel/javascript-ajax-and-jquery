var $Wrapper = {

  getColor: function(){
    $('a#get_color').click(function(e){
      e.preventDefault();

      $.ajax({
        type: 'POST',
        url:  '/color',
        success: function(resp){
          console.log(resp)
        },
        error: function(){
          console.log('error!')
        }
      });
    });
  }
}

$(function(){

  $Wrapper.getColor();
});