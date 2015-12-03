var template = require('lodash/string/template');
var _ = require('lodash');

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

  $.fn.bindData = function(callback) {
    var _this = this;
    $(_this).find('[data-bind-id]').each(function() {
      var pubSub = $({});
      var id = $(this).data('bind-id');
      var eventName = id + ':change';

      $(this).on('change input', function(e) {
        var $input = $(this);
        pubSub.trigger(eventName, [$input.val()]);
      });

      pubSub.on(eventName, function(evt, newVal) {
        $(_this).find('[data-bind = ' + id + ']').each(function() {
          var $bound = $(this);

          if(callback) return callback(newVal);

          if ( $bound.is("input, textarea, select") ) {
            $bound.val( newVal );
          } else {
            $bound.html( newVal );
          }
        });
      });
    });
    return this;
  };

  $.component = function(options) {
    return {
      template: options.template || '',
      events: options.events || {},
      model: options.model || {},
      render: function(data) {
        var _this = this;
        if (data) this.model = data;

        var elem = $(template(this.template)(this.model));

        return elem.events(this.events).bindData();
      }
    }
  };

}(jQuery));
