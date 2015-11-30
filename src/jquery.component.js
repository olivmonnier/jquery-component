var template = require('lodash/string/template');

(function($) {
  $.fn.events = function(o){
    for (var i in o) {
      var eventTag = i.split(" ");

      if (eventTag.length > 1) {
        var select = this;
        for(var n = 1; n < eventTag.length; n++) {
          select = select.find(eventTag[n])
          if (n === eventTag.length-1) {
            select.bind(i, o[i]);
          }
        }
      } else {
        this.bind(i, o[i]);
      }

    }
    return this;
  };

  $.component = function(options){
    return {
      template: options.template || '',
      events: options.events || {},
      render: function(data) {
        return $(template(this.template)(data)).events(this.events);
      }
    }
  };
}(jQuery));
