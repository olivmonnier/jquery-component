var template = require('lodash/string/template');

(function($) {
  $.fn.events = function(o){
    for (var i in o) {
      var eventTag = i.split(" ");

      if (eventTag.length > 1) {
        this.find(eventTag[1]).bind(i, o[i]);
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
