(function($) {
  $.fn.bindData = function(callback) {
    var _this = this;
    $(_this).find('[data-bind-id]').each(function() {
      var pubSub = $({});
      var id = $(this).data('bind-id');
      var eventName = id + ':change';

      $(this).on('change input', function() {
        var $input = $(this);
        pubSub.trigger(eventName, [$input.val()]);
      });

      pubSub.on(eventName, function(evt, val) {
        $(_this).find('[data-bind = ' + id + ']').each(function() {
          var $bound = $(this);

          if (callback) var newVal = callback(val);

          if ($bound.is('input, textarea, select')) {
            $bound.val(newVal);
          } else {
            $bound.html(newVal);
          }
        });
      });
    });
    return this;
  };
}(jQuery));
