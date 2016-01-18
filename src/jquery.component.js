(function($) {
  $.component = function(options) {
    var opts = options || {};
    var mounted = false;
    var oldData;

    var obj = {
      $el: '',
      bindData: opts.bindData || null,
      children: opts.children || '',
      componentDidMount: opts.componentDidMount || null,
      componentDidUpdate: opts.componentDidUpdate || null,
      componentWillMount: opts.componentWillMount || null,
      componentWillUpdate: opts.componentWillUpdate || null,
      events: opts.events || {},
      model: {
        data: opts.model || {},
        get: function(attr) {
          return this.data[attr];
        },
        set: function(key, val) {
          var attrs;
          var modelData = Object.create({});

          if (key == null) return this;

          if (typeof key === 'object') {
            attrs = key;
          } else {
            (attrs = {})[key] = val;
          }

          for (var k in this.data) {
            Object.defineProperty(modelData, k, {
              value: this.data[k],
              writable: true,
              enumerable: true,
              configurable: true
            });
          }
          for (var attr in attrs) {
            Object.defineProperty(modelData, attr, {
              value: attrs[attr],
              writable: true,
              enumerable: true,
              configurable: true
            });
          }

          if (obj.$el) {
            obj.$el.replaceWith(obj.render(modelData));
          } else {
            this.data = modelData;
          }
        }
      },
      render: function(data) {
        oldData = this.model.data;
        if (data) this.model.data = data;

        if (!mounted && this.componentWillMount) {
          this.componentWillMount();
        }
        if (mounted && this.componentWillUpdate) {
          this.componentWillUpdate(oldData);
        }

        var $el = $(_.template(this.template)(this.model));
        $el.find('[data-children]').html(this.children);
        $el.events(this.events).bindData(this.bindData);

        this.$el = $el;

        if (!mounted && this.componentDidMount) {
          this.componentDidMount();
        }
        if (mounted && this.componentDidUpdate) {
          this.componentDidUpdate(oldData);
        }

        mounted = true;

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

        if (this.$el) {
          this.$el.replaceWith(this.render(model));
        } else {
          this.model.data = model;
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
