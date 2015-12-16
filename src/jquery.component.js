(function($) {
  $.component = function(options) {
    var oldData;
    var opts = options || {};

    var obj = {
      $el: '',
      bindData: opts.bindData || null,
      children: opts.children || '',
      componentWillMount: opts.componentWillMount || null,
      componentWillUpdate: opts.componentWillUpdate || null,
      events: opts.events || {},
      model: {
        data: opts.model || {},
        get: function(attr) {
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

          for (var attr in attrs) {
            this.data[attr] = attrs[attr];
          }

          if (obj.$el) {
            obj.$el.replaceWith(obj.render());
          }
        }
      },
      render: function(data) {
        oldData = this.model.data;
        if (data) this.model.data = data;

        var $el = $(_.template(this.template)(this.model));
        $el.find('[data-children]').html(this.children);
        $el.events(this.events).bindData(this.bindData);

        if (!this.$el && this.componentWillMount) {
          this.componentWillMount();
        }
        if (this.$el && this.componentWillUpdate) {
          this.componentWillUpdate(oldData);
        }

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
      template: opts.template || ''
    };
    return obj;
  };
}(jQuery));
