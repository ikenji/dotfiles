(function() {
  var ParseRegex, Regex2RailRoadDiagram, RegexRailroadDiagram, WorkspaceView, _ref;

  WorkspaceView = require('atom').WorkspaceView;

  RegexRailroadDiagram = require('../lib/regex-railroad-diagram');

  _ref = require('../lib/regex-to-railroad'), ParseRegex = _ref.ParseRegex, Regex2RailRoadDiagram = _ref.Regex2RailRoadDiagram;

  describe("RegexRailroadDiagram", function() {
    var activationPromise;
    activationPromise = null;
    beforeEach(function() {
      var workspaceElement;
      workspaceElement = atom.views.getView(atom.workspace);
      activationPromise = atom.packages.activatePackage('regex-railroad-diagram');
      waitsForPromise(function() {
        return activationPromise;
      });
      return runs(function() {
        debugger;
      });
    });
    describe("regex-to-railroad diagram converter", function() {
      it("parses a regex with alternatives", function() {
        var r;
        r = ParseRegex(/a|b|c/);
        return expect(r.toString()).toEqual({
          type: 'alternate',
          offset: 0,
          text: 'a|b|c',
          left: {
            type: 'match',
            offset: 0,
            text: 'a',
            body: [
              {
                type: 'literal',
                offset: 0,
                text: 'a',
                body: 'a',
                escaped: false
              }
            ]
          },
          right: {
            type: 'alternate',
            offset: 2,
            text: 'b|c',
            left: {
              type: 'match',
              offset: 2,
              text: 'b',
              body: [
                {
                  type: 'literal',
                  offset: 2,
                  text: 'b',
                  body: 'b',
                  escaped: false
                }
              ]
            },
            right: {
              type: 'match',
              offset: 4,
              text: 'c',
              body: [
                {
                  type: 'literal',
                  offset: 4,
                  text: 'c',
                  body: 'c',
                  escaped: false
                }
              ]
            }
          }
        }.toString());
      });
      return it("parses a regex", function() {
        var r;
        r = Regex2RailRoadDiagram(/foo*/, null);
        return expect(r).toBe("foo");
      });
    });
    return describe("when the regex-railroad-diagram:toggle event is triggered", function() {
      return it("attaches and then detaches the view", function() {
        expect(atom.workspaceView.find('.regex-railroad-diagram')).not.toExist();
        atom.workspaceView.trigger('regex-railroad-diagram:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          expect(atom.workspaceView.find('.regex-railroad-diagram')).toExist();
          atom.workspaceView.trigger('regex-railroad-diagram:toggle');
          return expect(atom.workspaceView.find('.regex-railroad-diagram')).not.toExist();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2ljaGloYXNoaV9rZW5qaS8uYXRvbS9wYWNrYWdlcy9yZWdleC1yYWlscm9hZC1kaWFncmFtL3NwZWMvcmVnZXgtcmFpbHJvYWQtZGlhZ3JhbS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw0RUFBQTs7QUFBQSxFQUFDLGdCQUFpQixPQUFBLENBQVEsTUFBUixFQUFqQixhQUFELENBQUE7O0FBQUEsRUFDQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsK0JBQVIsQ0FEdkIsQ0FBQTs7QUFBQSxFQUdBLE9BQXNDLE9BQUEsQ0FBUSwwQkFBUixDQUF0QyxFQUFDLGtCQUFBLFVBQUQsRUFBYSw2QkFBQSxxQkFIYixDQUFBOztBQUFBLEVBV0EsUUFBQSxDQUFTLHNCQUFULEVBQWlDLFNBQUEsR0FBQTtBQUMvQixRQUFBLGlCQUFBO0FBQUEsSUFBQSxpQkFBQSxHQUFvQixJQUFwQixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxnQkFBQTtBQUFBLE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO0FBQUEsTUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsd0JBQTlCLENBRHBCLENBQUE7QUFBQSxNQUdBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2Qsa0JBRGM7TUFBQSxDQUFoQixDQUhBLENBQUE7YUFLQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsaUJBREc7TUFBQSxDQUFMLEVBTlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBV0EsUUFBQSxDQUFTLHFDQUFULEVBQWdELFNBQUEsR0FBQTtBQUU5QyxNQUFBLEVBQUEsQ0FBRyxrQ0FBSCxF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

//# sourceURL=/Users/ichihashi_kenji/.atom/packages/regex-railroad-diagram/spec/regex-railroad-diagram-spec.coffee
