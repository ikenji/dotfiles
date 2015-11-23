(function() {
  var TermView, capitalize, path;

  path = require('path');

  TermView = require('./lib/TermView');

  capitalize = function(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  module.exports = {
    termViews: [],
    focusedTerminal: false,
    config: {
      autoRunCommand: {
        type: 'string',
        "default": ''
      },
      titleTemplate: {
        type: 'string',
        "default": "Terminal ({{ bashName }})"
      },
      fontFamily: {
        type: 'string',
        "default": ''
      },
      fontSize: {
        type: 'string',
        "default": ''
      },
      colors: {
        type: 'object',
        properties: {
          normalBlack: {
            type: 'color',
            "default": '#2e3436'
          },
          normalRed: {
            type: 'color',
            "default": '#cc0000'
          },
          normalGreen: {
            type: 'color',
            "default": '#4e9a06'
          },
          normalYellow: {
            type: 'color',
            "default": '#c4a000'
          },
          normalBlue: {
            type: 'color',
            "default": '#3465a4'
          },
          normalPurple: {
            type: 'color',
            "default": '#75507b'
          },
          normalCyan: {
            type: 'color',
            "default": '#06989a'
          },
          normalWhite: {
            type: 'color',
            "default": '#d3d7cf'
          },
          brightBlack: {
            type: 'color',
            "default": '#555753'
          },
          brightRed: {
            type: 'color',
            "default": '#ef2929'
          },
          brightGreen: {
            type: 'color',
            "default": '#8ae234'
          },
          brightYellow: {
            type: 'color',
            "default": '#fce94f'
          },
          brightBlue: {
            type: 'color',
            "default": '#729fcf'
          },
          brightPurple: {
            type: 'color',
            "default": '#ad7fa8'
          },
          brightCyan: {
            type: 'color',
            "default": '#34e2e2'
          },
          brightWhite: {
            type: 'color',
            "default": '#eeeeec'
          },
          background: {
            type: 'color',
            "default": '#000000'
          },
          foreground: {
            type: 'color',
            "default": '#f0f0f0'
          }
        }
      },
      scrollback: {
        type: 'integer',
        "default": 1000
      },
      cursorBlink: {
        type: 'boolean',
        "default": true
      },
      shellOverride: {
        type: 'string',
        "default": ''
      },
      shellArguments: {
        type: 'string',
        "default": (function(_arg) {
          var HOME, SHELL;
          SHELL = _arg.SHELL, HOME = _arg.HOME;
          switch (path.basename(SHELL.toLowerCase())) {
            case 'bash':
              return "--init-file " + (path.join(HOME, '.bash_profile'));
            case 'zsh':
              return "";
            default:
              return '';
          }
        })(process.env)
      },
      openPanesInSameSplit: {
        type: 'boolean',
        "default": false
      }
    },
    activate: function(state) {
      this.state = state;
      ['up', 'right', 'down', 'left'].forEach((function(_this) {
        return function(direction) {
          return atom.commands.add("atom-workspace", "term2:open-split-" + direction, _this.splitTerm.bind(_this, direction));
        };
      })(this));
      atom.commands.add("atom-workspace", "term2:open", this.newTerm.bind(this));
      atom.commands.add("atom-workspace", "term2:pipe-path", this.pipeTerm.bind(this, 'path'));
      return atom.commands.add("atom-workspace", "term2:pipe-selection", this.pipeTerm.bind(this, 'selection'));
    },
    getColors: function() {
      var background, brightBlack, brightBlue, brightCyan, brightGreen, brightPurple, brightRed, brightWhite, brightYellow, foreground, normalBlack, normalBlue, normalCyan, normalGreen, normalPurple, normalRed, normalWhite, normalYellow, _ref;
      _ref = (atom.config.getAll('term2.colors'))[0].value, normalBlack = _ref.normalBlack, normalRed = _ref.normalRed, normalGreen = _ref.normalGreen, normalYellow = _ref.normalYellow, normalBlue = _ref.normalBlue, normalPurple = _ref.normalPurple, normalCyan = _ref.normalCyan, normalWhite = _ref.normalWhite, brightBlack = _ref.brightBlack, brightRed = _ref.brightRed, brightGreen = _ref.brightGreen, brightYellow = _ref.brightYellow, brightBlue = _ref.brightBlue, brightPurple = _ref.brightPurple, brightCyan = _ref.brightCyan, brightWhite = _ref.brightWhite, background = _ref.background, foreground = _ref.foreground;
      return [normalBlack, normalRed, normalGreen, normalYellow, normalBlue, normalPurple, normalCyan, normalWhite, brightBlack, brightRed, brightGreen, brightYellow, brightBlue, brightPurple, brightCyan, brightWhite, background, foreground];
    },
    createTermView: function() {
      var opts, termView, _base;
      opts = {
        runCommand: atom.config.get('term2.autoRunCommand'),
        shellOverride: atom.config.get('term2.shellOverride'),
        shellArguments: atom.config.get('term2.shellArguments'),
        titleTemplate: atom.config.get('term2.titleTemplate'),
        cursorBlink: atom.config.get('term2.cursorBlink'),
        fontFamily: atom.config.get('term2.fontFamily'),
        fontSize: atom.config.get('term2.fontSize'),
        colors: this.getColors()
      };
      termView = new TermView(opts);
      termView.on('remove', this.handleRemoveTerm.bind(this));
      if (typeof (_base = this.termViews).push === "function") {
        _base.push(termView);
      }
      return termView;
    },
    splitTerm: function(direction) {
      var activePane, item, openPanesInSameSplit, pane, splitter, termView;
      openPanesInSameSplit = atom.config.get('term2.openPanesInSameSplit');
      termView = this.createTermView();
      termView.on("click", (function(_this) {
        return function() {
          termView.term.element.focus();
          termView.term.focus();
          return _this.focusedTerminal = termView;
        };
      })(this));
      direction = capitalize(direction);
      splitter = (function(_this) {
        return function() {
          var pane;
          pane = activePane["split" + direction]({
            items: [termView]
          });
          activePane.termSplits[direction] = pane;
          return _this.focusedTerminal = [pane, pane.items[0]];
        };
      })(this);
      activePane = atom.workspace.getActivePane();
      activePane.termSplits || (activePane.termSplits = {});
      if (openPanesInSameSplit) {
        if (activePane.termSplits[direction] && activePane.termSplits[direction].items.length > 0) {
          pane = activePane.termSplits[direction];
          item = pane.addItem(termView);
          pane.activateItem(item);
          return this.focusedTerminal = [pane, item];
        } else {
          return splitter();
        }
      } else {
        return splitter();
      }
    },
    newTerm: function() {
      var item, pane, termView;
      termView = this.createTermView();
      pane = atom.workspace.getActivePane();
      item = pane.addItem(termView);
      return pane.activateItem(item);
    },
    pipeTerm: function(action) {
      var editor, item, pane, stream, _ref;
      editor = this.getActiveEditor();
      stream = (function() {
        switch (action) {
          case 'path':
            return editor.getBuffer().file.path;
          case 'selection':
            return editor.getSelectedText();
        }
      })();
      if (stream && this.focusedTerminal) {
        if (Array.isArray(this.focusedTerminal)) {
          _ref = this.focusedTerminal, pane = _ref[0], item = _ref[1];
          pane.activateItem(item);
        } else {
          item = this.focusedTerminal;
        }
        item.pty.write(stream.trim());
        return item.term.focus();
      }
    },
    handleRemoveTerm: function(termView) {
      return this.termViews.splice(this.termViews.indexOf(termView), 1);
    },
    deactivate: function() {
      return this.termViews.forEach(function(view) {
        return view.deactivate();
      });
    },
    serialize: function() {
      var termViewsState;
      termViewsState = this.termViews.map(function(view) {
        return view.serialize();
      });
      return {
        termViews: termViewsState
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2ljaGloYXNoaV9rZW5qaS8uYXRvbS9wYWNrYWdlcy90ZXJtMi9pbmRleC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEJBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxnQkFBUixDQURYLENBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsU0FBQyxHQUFELEdBQUE7V0FBUSxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsV0FBUCxDQUFBLENBQUEsR0FBdUIsR0FBSSxTQUFJLENBQUMsV0FBVCxDQUFBLEVBQS9CO0VBQUEsQ0FIYixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FFSTtBQUFBLElBQUEsU0FBQSxFQUFXLEVBQVg7QUFBQSxJQUNBLGVBQUEsRUFBaUIsS0FEakI7QUFBQSxJQUdBLE1BQUEsRUFDRTtBQUFBLE1BQUEsY0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEVBRFQ7T0FERjtBQUFBLE1BR0EsYUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLDJCQURUO09BSkY7QUFBQSxNQU1BLFVBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxFQURUO09BUEY7QUFBQSxNQVNBLFFBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxFQURUO09BVkY7QUFBQSxNQVlBLE1BQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFVBQUEsRUFDRTtBQUFBLFVBQUEsV0FBQSxFQUNF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

//# sourceURL=/Users/ichihashi_kenji/.atom/packages/term2/index.coffee
