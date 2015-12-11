(function($) {
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

          obj.$el.replaceWith(obj.render());
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
          this.$el.replaceWith(this.render());
        }
        return this;
      },
      setModel: function(model) {
        this.model.data = model;

        if (this.$el) {
          this.$el.replaceWith(this.render());
        }
        return this;
      },
      setTemplate: function(newTemplate) {
        this.template = newTemplate;

        if (this.$el) {
          this.$el.replaceWith(this.render());
        }
        return this;
      },
      template: options.template || '',
    }
    return obj;
  };
}(jQuery));
