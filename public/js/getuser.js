// Generated by CoffeeScript 1.7.1
var _user;

_user = {};

window.onload = function() {
  return $.ajax({
    url: '/api/user',
    type: 'GET',
    dataType: 'json',
    success: function(msg) {
      if ((msg.recode != null) && msg.recode === 200) {

      } else {
        _user = msg;
        if (typeof userback !== "undefined" && userback !== null) {
          return userback();
        }
      }
    }
  });
};
function reset(o) {
   console.log(parent.window);
   if (parent.window.resetFrame != null) {
    parent.window.resetFrame($(o).height());
   }
}