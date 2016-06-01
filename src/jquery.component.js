(function($) {
  $.component = function(options) {
    var opts = options || {};
    var mounted = false;
    var oldData;

    var Component = function() {
      var self = this;
      this.$el = '';
      this.children = opts.children || '';
      this.events = opts.events || {};
      this.model = {
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

          if (self.$el) {
            self.$el.replaceWith(self.render(modelData));
          } else {
            this.data = modelData;
          }
        }
      };
      this.optionsTemplate = opts.optionsTemplate || {};
      this.template = opts.template || '';
    };

    Component.prototype.bindData = opts.bindData || null;

    Component.prototype.componentDidMount = opts.componentDidMount || null;

    Component.prototype.componentDidUpdate = opts.componentDidUpdate || null;

    Component.prototype.componentWillMount = opts.componentWillMount || null;

    Component.prototype.componentWillUpdate = opts.componentWillUpdate || null;

    Component.prototype.render = function(data, optionsTemplate) {
      oldData = this.model.data;
      if (data) this.model.data = data;
      if (optionsTemplate) this.optionsTemplate = optionsTemplate;

      if (!mounted && this.componentWillMount) {
        this.componentWillMount();
      }
      if (mounted && this.componentWillUpdate) {
        this.componentWillUpdate(oldData);
      }

      if (!mounted || data) {
        var $el = $(_.template(this.template, this.optionsTemplate)(this.model));

        if (this.children instanceof Object) {
          for (var child in this.children) {
            $el.find('[data-child="' + child + '"]').html(this.children[child]);
          }
        } else {
          if (!Array.isArray(this.children)) this.children = [this.children];

          this.children.forEach(function(child) {
            $el.find('[data-children]').append(child);
          });
        }
        $el.events(this.events).bindData(this.bindData);
        this.$el = $el;
      }

      if (!mounted && this.componentDidMount) {
        this.componentDidMount();
      }
      if (mounted && this.componentDidUpdate) {
        this.componentDidUpdate(oldData);
      }

      mounted = true;

      return this.$el;
    };

    Component.prototype.setBindData = function(callback) {
      this.bindData = callback;

      return this;
    };

    Component.prototype.setChildren = function(children) {
      this.children = children;

      if (this.$el) {
        if (!Array.isArray(this.children)) this.children = [this.children];

        this.$el.find('[data-children]').empty();

        this.children.forEach(function(child) {
          this.$el.find('[data-children]').append(child);
        });
      }

      return this;
    };

    Component.prototype.setEvents = function(events) {
      this.events = events;

      if (this.$el) {
        this.$el.replaceWith(this.render());
      }

      return this;
    };

    Component.prototype.setModel = function(model) {

      if (this.$el) {
        this.$el.replaceWith(this.render(model));
      } else {
        this.model.data = model;
      }

      return this;
    };

    Component.prototype.setTemplate = function(newTemplate) {
      this.template = newTemplate;

      if (this.$el) {
        this.$el.replaceWith(this.render());
      }

      return this;
    };

    return new Component();
  };
}(jQuery));
