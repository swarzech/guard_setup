(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['test_module'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      console.log("test");
      $o.push("<testdiv>\n  this is a test div\n</testdiv>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(context);
  };

}).call(this);
