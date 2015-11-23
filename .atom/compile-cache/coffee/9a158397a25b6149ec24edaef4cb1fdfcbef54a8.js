(function() {
  var Choice, Comment, Diagram, Group, NonTerminal, OneOrMore, Optional, Sequence, Skip, Terminal, ZeroOrMore, doSpace, makeLiteral, parse, parseRegex, quantifiedComment, rx2rr, _ref;

  parse = require("regexp");

  _ref = require('./railroad-diagrams'), Diagram = _ref.Diagram, Sequence = _ref.Sequence, Choice = _ref.Choice, Optional = _ref.Optional, OneOrMore = _ref.OneOrMore, ZeroOrMore = _ref.ZeroOrMore, Terminal = _ref.Terminal, NonTerminal = _ref.NonTerminal, Comment = _ref.Comment, Skip = _ref.Skip, Group = _ref.Group;

  doSpace = function() {
    return NonTerminal("SP", {
      title: "Space character",
      "class": "literal whitespace"
    });
  };

  makeLiteral = function(text) {
    var part, parts, sequence, _i, _len;
    if (text === " ") {
      return doSpace();
    } else {
      parts = text.split(/(^ +| {2,}| +$)/);
      sequence = [];
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        if (!part.length) {
          continue;
        }
        if (/^ +$/.test(part)) {
          if (part.length === 1) {
            sequence.push(doSpace());
          } else {
            sequence.push(OneOrMore(doSpace(), Comment("" + part.length + "x", {
              title: "repeat " + part.length + " times"
            })));
          }
        } else {
          sequence.push(Terminal(part, {
            "class": "literal"
          }));
        }
      }
      if (sequence.length === 1) {
        return sequence[0];
      } else {
        return new Sequence(sequence);
      }
    }
  };

  rx2rr = function(node, options) {
    var alternatives, body, char, charset, doEndOfString, doStartOfString, extra, greedy, i, isSingleString, list, literal, max, min, n, opts, plural, sequence, x, _i, _j, _len, _len1, _ref1, _ref2;
    opts = options.options;
    isSingleString = function() {
      return opts.match(/s/);
    };
    doStartOfString = function() {
      var title;
      if (opts.match(/m/)) {
        title = "Beginning of line";
      } else {
        title = "Beginning of string";
      }
      return NonTerminal("START", {
        title: title,
        "class": 'zero-width-assertion'
      });
    };
    doEndOfString = function() {
      var title;
      if (opts.match(/m/)) {
        title = "End of line";
      } else {
        title = "End of string";
      }
      return NonTerminal("END", {
        title: title,
        "class": 'zero-width-assertion'
      });
    };
    switch (node.type) {
      case "match":
        literal = '';
        sequence = [];
        _ref1 = node.body;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          n = _ref1[_i];
          if (n.type === "literal" && n.escaped) {
            if (n.body === "A") {
              sequence.push(doStartOfString());
            } else if (n.body === "Z") {
              sequence.push(doEndOfString());
            } else {
              literal += n.body;
            }
          } else if (n.type === "literal") {
            literal += n.body;
          } else {
            if (literal) {
              sequence.push(makeLiteral(literal));
              literal = '';
            }
            sequence.push(rx2rr(n, options));
          }
        }
        if (literal) {
          sequence.push(makeLiteral(literal));
        }
        if (sequence.length === 1) {
          return sequence[0];
        } else {
          return new Sequence(sequence);
        }
        break;
      case "alternate":
        alternatives = [];
        while (node.type === "alternate") {
          alternatives.push(rx2rr(node.left, options));
          node = node.right;
        }
        alternatives.push(rx2rr(node, options));
        return new Choice(Math.floor(alternatives.length / 2) - 1, alternatives);
      case "quantified":
        _ref2 = node.quantifier, min = _ref2.min, max = _ref2.max, greedy = _ref2.greedy;
        body = rx2rr(node.body, options);
        if (!(min <= max)) {
          throw new Error("Minimum quantifier (" + min + ") must be lower than ", +("maximum quantifier (" + max + ")"));
        }
        plural = function(x) {
          if (x !== 1) {
            return "s";
          } else {
            return "";
          }
        };
        switch (min) {
          case 0:
            if (max === 1) {
              return Optional(body);
            } else {
              if (max === 0) {
                return ZeroOrMore(body, quantifiedComment("0x", greedy, {
                  title: "exact 0 times repitition does not make sense"
                }));
              } else if (max !== Infinity) {
                return ZeroOrMore(body, quantifiedComment("0-" + max + "x", greedy, {
                  title: ("repeat 0 to " + max + " time") + plural(max)
                }));
              } else {
                return ZeroOrMore(body, quantifiedComment("*", greedy, {
                  title: "repeat zero or more times"
                }));
              }
            }
            break;
          case 1:
            if (max === 1) {
              return OneOrMore(body, Comment("1", {
                title: "once"
              }));
            } else if (max !== Infinity) {
              return OneOrMore(body, quantifiedComment("1-" + max + "x", greedy, {
                title: "repeat 1 to " + max + " times"
              }));
            } else {
              return OneOrMore(body, quantifiedComment("+", greedy, {
                title: "repeat at least one time"
              }));
            }
            break;
          default:
            if (max === min) {
              return OneOrMore(body, Comment("" + max + "x", {
                title: "repeat " + max + " times"
              }));
            } else if (max !== Infinity) {
              return OneOrMore(body, quantifiedComment("" + min + "-" + max + "x", greedy, {
                title: "repeat " + min + " to " + max + " times"
              }));
            } else {
              return OneOrMore(body, quantifiedComment(">= " + min + "x", greedy, {
                title: ("repeat at least " + min + " time") + plural(min)
              }));
            }
        }
        break;
      case "capture-group":
        return Group(rx2rr(node.body, options), Comment("capture " + node.index, {
          "class": "caption"
        }), {
          minWidth: 55,
          attrs: {
            "class": 'capture-group group'
          }
        });
      case "non-capture-group":
        return rx2rr(node.body, options);
      case "positive-lookahead":
        return Group(rx2rr(node.body, options), Comment("=> ?", {
          title: "Positive lookahead",
          "class": "caption"
        }), {
          attrs: {
            "class": "lookahead positive zero-width-assertion group"
          }
        });
      case "negative-lookahead":
        return Group(rx2rr(node.body, options), Comment("!> ?", {
          title: "Negative lookahead",
          "class": "caption"
        }), {
          attrs: {
            "class": "lookahead negative zero-width-assertion group"
          }
        });
      case "positive-lookbehind":
        return Group(rx2rr(node.body, options), Comment("<= ?", {
          title: "Positive lookbehind",
          "class": "caption"
        }), {
          attrs: {
            "class": "lookbehind positive zero-width-assertion group"
          }
        });
      case "negative-lookbehind":
        return Group(rx2rr(node.body, options), Comment("<! ?", {
          title: "Negative lookbehind",
          "class": "caption"
        }), {
          attrs: {
            "class": "lookbehind negative zero-width-assertion group"
          }
        });
      case "back-reference":
        return NonTerminal("" + node.code, {
          title: "Match capture " + node.code + " (Back Reference)",
          "class": 'back-reference'
        });
      case "literal":
        if (node.escaped) {
          if (node.body === "A") {
            return doStartOfString();
          } else if (node.body === "Z") {
            return doEndOfString();
          } else {
            return Terminal(node.body, {
              "class": "literal"
            });
          }
        } else {
          return makeLiteral(node.body);
        }
        break;
      case "start":
        return doStartOfString();
      case "end":
        return doEndOfString();
      case "word":
        return NonTerminal("WORD", {
          title: "Word character A-Z, 0-9, _",
          "class": 'character-class'
        });
      case "non-word":
        return NonTerminal("NON-WORD", {
          title: "Non-word character, all except A-Z, 0-9, _",
          "class": 'character-class invert'
        });
      case "line-feed":
        return NonTerminal("LF", {
          title: "Line feed '\\n'",
          "class": 'literal whitespace'
        });
      case "carriage-return":
        return NonTerminal("CR", {
          title: "Carriage Return '\\r'",
          "class": 'literal whitespace'
        });
      case "vertical-tab":
        return NonTerminal("VTAB", {
          title: "Vertical tab '\\v'",
          "class": 'literal whitespace'
        });
      case "tab":
        return NonTerminal("TAB", {
          title: "Tab stop '\\t'",
          "class": 'literal whitespace'
        });
      case "form-feed":
        return NonTerminal("FF", {
          title: "Form feed",
          "class": 'literal whitespace'
        });
      case "back-space":
        return NonTerminal("BS", {
          title: "Backspace",
          "class": 'literal'
        });
      case "digit":
        return NonTerminal("0-9", {
          "class": 'character-class'
        });
      case "null-character":
        return NonTerminal("NULL", {
          title: "Null character '\\0'",
          "class": 'literal'
        });
      case "non-digit":
        return NonTerminal("not 0-9", {
          title: "All except digits",
          "class": 'character-class invert'
        });
      case "white-space":
        return NonTerminal("WS", {
          title: "Whitespace: space, tabstop, linefeed, carriage-return, etc.",
          "class": 'character-class whitespace'
        });
      case "non-white-space":
        return NonTerminal("NON-WS", {
          title: "Not whitespace: all except space, tabstop, line-feed, carriage-return, etc.",
          "class": 'character-class invert'
        });
      case "range":
        return NonTerminal(node.text, {
          "class": "character-class"
        });
      case "charset":
        charset = (function() {
          var _j, _len1, _ref3, _results;
          _ref3 = node.body;
          _results = [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            x = _ref3[_j];
            _results.push(x.text);
          }
          return _results;
        })();
        if (charset.length === 1) {
          char = charset[0];
          if (char === " ") {
            if (node.invert) {
              return doSpace();
            }
          }
          if (node.invert) {
            return NonTerminal("not " + char, {
              title: "Match all except " + char,
              "class": 'character-class invert'
            });
          } else {
            if (char === "SP") {
              return doSpace();
            } else {
              return Terminal(char, {
                "class": "literal"
              });
            }
          }
        } else {
          list = charset.slice(0, -1).join(", ");
          for (i = _j = 0, _len1 = list.length; _j < _len1; i = ++_j) {
            x = list[i];
            if (x === " ") {
              list[i] = "SP";
            }
          }
          if (node.invert) {
            return NonTerminal("not " + list + " and " + charset.slice(-1), {
              "class": 'character-class invert'
            });
          } else {
            return NonTerminal("" + list + " or " + charset.slice(-1), {
              "class": 'character-class'
            });
          }
        }
        break;
      case "hex":
      case "octal":
      case "unicode":
        return Terminal(node.text, {
          "class": 'literal charachter-code'
        });
      case "any-character":
        extra = !isSingleString() ? " except newline" : "";
        return NonTerminal("ANY", {
          title: "Any character" + extra,
          "class": 'character-class'
        });
      case "word-boundary":
        return NonTerminal("WB", {
          title: "Word-boundary",
          "class": 'zero-width-assertion'
        });
      case "non-word-boundary":
        return NonTerminal("NON-WB", {
          title: "Non-word-boundary (match if in a word)",
          "class": 'zero-width-assertion invert'
        });
      default:
        return NonTerminal(node.type);
    }
  };

  quantifiedComment = function(comment, greedy, attrs) {
    if (comment && greedy) {
      attrs.title += ', longest possible match';
      attrs["class"] = 'quantified greedy';
      return Comment(comment + ' (greedy)', attrs);
    } else if (greedy) {
      attrs.title = 'longest possible match';
      attrs["class"] = 'quantified greedy';
      return Comment('greedy', attrs);
    } else if (comment) {
      attrs.title += ', shortest possible match';
      attrs["class"] = 'quantified lazy';
      return Comment(comment + ' (lazy)', attrs);
    } else {
      attrs.title = 'shortest possible match';
      attrs["class"] = 'quantified lazy';
      return Comment('lazy', attrs);
    }
  };

  parseRegex = function(regex) {
    if (regex instanceof RegExp) {
      regex = regex.source;
    }
    return parse(regex);
  };

  module.exports = {
    Regex2RailRoadDiagram: function(regex, parent, opts) {
      return Diagram(rx2rr(parseRegex(regex), opts)).addTo(parent);
    },
    ParseRegex: parseRegex
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2ljaGloYXNoaV9rZW5qaS8uYXRvbS9wYWNrYWdlcy9yZWdleC1yYWlscm9hZC1kaWFncmFtL2xpYi9yZWdleC10by1yYWlscm9hZC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0xBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLFFBQVIsQ0FBUixDQUFBOztBQUFBLEVBRUEsT0FDdUMsT0FBQSxDQUFRLHFCQUFSLENBRHZDLEVBQUMsZUFBQSxPQUFELEVBQVUsZ0JBQUEsUUFBVixFQUFvQixjQUFBLE1BQXBCLEVBQTRCLGdCQUFBLFFBQTVCLEVBQXNDLGlCQUFBLFNBQXRDLEVBQWlELGtCQUFBLFVBQWpELEVBQTZELGdCQUFBLFFBQTdELEVBQ0MsbUJBQUEsV0FERCxFQUNjLGVBQUEsT0FEZCxFQUN1QixZQUFBLElBRHZCLEVBQzZCLGFBQUEsS0FIN0IsQ0FBQTs7QUFBQSxFQUtBLE9BQUEsR0FBVSxTQUFBLEdBQUE7V0FBRyxXQUFBLENBQVksSUFBWixFQUFrQjtBQUFBLE1BQUEsS0FBQSxFQUFPLGlCQUFQO0FBQUEsTUFBMEIsT0FBQSxFQUFPLG9CQUFqQztLQUFsQixFQUFIO0VBQUEsQ0FMVixDQUFBOztBQUFBLEVBUUEsV0FBQSxHQUFjLFNBQUMsSUFBRCxHQUFBO0FBRVosUUFBQSwrQkFBQTtBQUFBLElBQUEsSUFBRyxJQUFBLEtBQVEsR0FBWDthQUNFLE9BQUEsQ0FBQSxFQURGO0tBQUEsTUFBQTtBQUdFLE1BQUEsS0FBQSxHQUFRLElBQUksQ0FBQyxLQUFMLENBQVcsaUJBQVgsQ0FBUixDQUFBO0FBQUEsTUFDQSxRQUFBLEdBQVcsRUFEWCxDQUFBO0FBRUEsV0FBQSw0Q0FBQTt5QkFBQTtBQUNFLFFBQUEsSUFBQSxDQUFBLElBQW9CLENBQUMsTUFBckI7QUFBQSxtQkFBQTtT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

//# sourceURL=/Users/ichihashi_kenji/.atom/packages/regex-railroad-diagram/lib/regex-to-railroad.coffee
