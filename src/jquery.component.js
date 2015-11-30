var template = require('lodash/string/template');

(function($) {
  $.fn.events = function(o){
    for (var i in o) {
      var separator = i.split(' ');
      var result = [];

      if (separator.length > 1) {
        result = [separator.shift(), separator.join(' ')];
        this.find(result[1]).bind(i, o[i]);
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
