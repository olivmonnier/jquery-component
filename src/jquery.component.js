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

          if (callback) newVal = callback(newVal);

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
    if(!options) options = {};

    return {
      $el: '',
      bindData: options.bindData || null,
      children: options.children || '',
      events: options.events || {},
      model: options.model || {},
      template: options.template || '',
      setBindData: function(callback) {
        this.bindData = callback;
        return this;
      },
      setChildren: function(children) {
        this.children = children;

        if (this.$el) {
          this.$el.find('[data-children]').html(this.children);
        }
        return this;
      },
      setEvents: function(events) {
        this.events = events;
        // Doesn't work
        if (this.$el) {
          this.$el = this.$el.events(this.events).bindData(this.bindData);
        }
        return this;
      },
      setModel: function(model) {
        this.model = model;
        return this;
      },
      setTemplate: function(newTemplate) {
        this.template = newTemplate;

        if (this.$el) {
          this.$el = this.$el.replaceWith(
            $(template(this.template)(this.model))
              .events(this.events).bindData(this.bindData)
          )
        }
        return this;
      },
      render: function(data) {
        var _this = this;
        if (data) this.model = data;

        this.$el = $(template(this.template)(this.model));
        this.$el.find('[data-children]').html(this.children);

        return this.$el.events(this.events).bindData(this.bindData);
      }
    }
  };
}(jQuery));
