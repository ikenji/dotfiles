(function() {
  var $, CompositeDisposable, RailroadDiagramElement, Regex2RailRoadDiagram,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = require('atom-space-pen-views').$;

  Regex2RailRoadDiagram = require('./regex-to-railroad.coffee').Regex2RailRoadDiagram;

  CompositeDisposable = require('atom').CompositeDisposable;

  RailroadDiagramElement = (function(_super) {
    __extends(RailroadDiagramElement, _super);

    function RailroadDiagramElement() {
      return RailroadDiagramElement.__super__.constructor.apply(this, arguments);
    }

    RailroadDiagramElement.prototype.createdCallback = function() {};

    RailroadDiagramElement.prototype.initialize = function(model) {
      this.model = model;
      this.panel = atom.workspace.addBottomPanel({
        item: this,
        visible: false
      });
      this.currentRegex = null;
      this.subscriptions = null;
      return this;
    };

    RailroadDiagramElement.prototype.setModel = function(model) {
      this.model = model;
    };

    RailroadDiagramElement.prototype.removeChildren = function() {
      var child, _i, _len, _ref, _results;
      _ref = this.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.remove());
      }
      return _results;
    };

    RailroadDiagramElement.prototype.destroy = function() {
      var _ref;
      this.removeChildren();
      this.panel.remove();
      this.remove();
      return (_ref = this.subscriptions) != null ? _ref.dispose() : void 0;
    };

    RailroadDiagramElement.prototype.showDiagram = function(regex, options) {
      var e, _i, _len, _ref, _ref1;
      if (this.currentRegex === regex && !this.hidden) {
        return;
      }
      if ((_ref = this.subscriptions) != null) {
        _ref.dispose();
      }
      this.subscriptions = new CompositeDisposable;
      this.removeChildren();
      try {
        Regex2RailRoadDiagram(regex, this, options);
        _ref1 = $(this).find('g[title]');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          e = _ref1[_i];
          this.subscriptions.add(atom.tooltips.add(e, {
            title: $(e).attr('title')
          }));
        }
        this.currentRegex = regex;
      } catch (_error) {
        e = _error;
        this.showError(regex, e);
      }
      return this.panel.show();
    };

    RailroadDiagramElement.prototype.showError = function(regex, e) {
      var sp;
      console.log("caught error when trying to display regex " + regex, e.stack);
      if (e.offset) {
        sp = " ".repeat(e.offset);
        return this.innerHTML = "<div class=\"error-message\"><pre class=\"text-error\">" + regex + "\n" + sp + "^ " + e.message + "</pre></div>";
      } else {
        return this.innerHTML = "<div class=\"error-message\"><pre>" + regex + "</pre><p class=\"text-error\">" + e.message + "</p></div>";
      }
    };

    RailroadDiagramElement.prototype.assertHidden = function() {
      var _ref;
      if (!this.hidden) {
        this.panel.hide();
      }
      this.currentRegex = null;
      return (_ref = this.subscriptions) != null ? _ref.dispose() : void 0;
    };

    return RailroadDiagramElement;

  })(HTMLElement);

  module.exports = RailroadDiagramElement = document.registerElement('regex-railroad-diagram', {
    prototype: RailroadDiagramElement.prototype
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2ljaGloYXNoaV9rZW5qaS8uYXRvbS9wYWNrYWdlcy9yZWdleC1yYWlscm9hZC1kaWFncmFtL2xpYi9yYWlscm9hZC1kaWFncmFtLWVsZW1lbnQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxzQkFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUNDLHdCQUF5QixPQUFBLENBQVEsNEJBQVIsRUFBekIscUJBREQsQ0FBQTs7QUFBQSxFQUVDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFGRCxDQUFBOztBQUFBLEVBS007QUFDSiw2Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEscUNBQUEsZUFBQSxHQUFpQixTQUFBLEdBQUEsQ0FBakIsQ0FBQTs7QUFBQSxxQ0FFQSxVQUFBLEdBQVksU0FBRSxLQUFGLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxRQUFBLEtBQ1osQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEI7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsUUFBWSxPQUFBLEVBQVMsS0FBckI7T0FBOUIsQ0FBVCxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsWUFBRCxHQUFnQixJQURoQixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUZqQixDQUFBO2FBR0EsS0FKVTtJQUFBLENBRlosQ0FBQTs7QUFBQSxxQ0FRQSxRQUFBLEdBQVUsU0FBRSxLQUFGLEdBQUE7QUFBVSxNQUFULElBQUMsQ0FBQSxRQUFBLEtBQVEsQ0FBVjtJQUFBLENBUlYsQ0FBQTs7QUFBQSxxQ0FVQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNkLFVB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

//# sourceURL=/Users/ichihashi_kenji/.atom/packages/regex-railroad-diagram/lib/railroad-diagram-element.coffee
