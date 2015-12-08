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

    var obj = {
      $el: '',
      bindData: options.bindData || null,
      children: options.children || '',
      events: options.events || {},
      model: {
        data: options.model || {},
        get: function (attr) {
          return this.data[attr];
        },
        set: function(key, val) {
          if (key == null) return this;

          var attrs;
          if (typeof key === 'object') {
            attrs = key;
          } else {
            (attrs = {})[key] = val;
          }

          for(var attr in attrs) {
            this.data[attr] = attrs[attr];
          }

          var oldEl = obj.$el;
          oldEl.replaceWith(obj.render());
        }
      },
      render: function(data) {
        if (data) this.model.data = data;

        var $el = $(template(this.template)(this.model));
        $el.find('[data-children]').html(this.children);
        $el.events(this.events).bindData(this.bindData);
        this.$el = $el;

        return $el;
      },
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

        if (this.$el) {
          var oldEl = this.$el;
          oldEl.replaceWith(this.render());
        }
        return this;
      },
      setModel: function(model) {
        this.model = model;

        if (this.$el) {
          var oldEl = this.$el;
          oldEl.replaceWith(this.render());
        }
        return this;
      },
      setTemplate: function(newTemplate) {
        this.template = newTemplate;

        if (this.$el) {
          var oldEl = this.$el;
          oldEl.replaceWith(this.render());
        }
        return this;
      },
      template: options.template || '',
    }
    return obj;
  };
}(jQuery));
