(function() {
  var Project;

  Project = require('../lib/project');

  describe("Project", function() {
    it("recieves default properties", function() {
      var project, properties;
      properties = {
        title: "Test",
        paths: ["/Users/"]
      };
      project = new Project(properties);
      return expect(project.props.icon).toBe('icon-chevron-right');
    });
    it("does not validate without proper properties", function() {
      var project, properties;
      properties = {
        title: "Test"
      };
      project = new Project(properties);
      return expect(project.isValid()).toBe(false);
    });
    it("automatically updates it's properties", function() {
      var project, props;
      props = {
        _id: 'test',
        title: "Test",
        paths: ["/Users/test"]
      };
      project = new Project(props);
      spyOn(project, 'updateProps').andCallThrough();
      spyOn(project.db, 'readFile').andCallFake(function(callback) {
        props = {
          test: {
            _id: 'test',
            title: "Test",
            paths: ["/Users/test"],
            icon: 'icon-test'
          }
        };
        return callback(props);
      });
      project.db.emitter.emit('db-updated');
      expect(project.updateProps).toHaveBeenCalled();
      return expect(project.props.icon).toBe('icon-test');
    });
    it("automatically updates it's properties even though key have changed", function() {
      var project, props;
      props = {
        _id: 'test',
        title: "Test",
        paths: ["/Users/test"]
      };
      project = new Project(props);
      spyOn(project, 'updateProps').andCallThrough();
      spyOn(project.db, 'readFile').andCallFake(function(callback) {
        props = {
          testtest: {
            _id: 'testtest',
            title: "Test",
            paths: ["/Users/test"],
            icon: 'icon-test'
          }
        };
        return callback(props);
      });
      expect(project.db.searchKey).toBe('_id');
      expect(project.db.searchValue).toBe('test');
      project.db.emitter.emit('db-updated');
      expect(project.updateProps).toHaveBeenCalled();
      expect(project.props._id).toBe('testtest');
      expect(project.props.icon).toBe('icon-test');
      expect(project.db.searchKey).toBe('_id');
      return expect(project.db.searchValue).toBe('testtest');
    });
    describe("::set/::unset", function() {
      var project;
      project = null;
      beforeEach(function() {
        project = new Project();
        spyOn(project.db, 'add').andCallFake(function(props, callback) {
          var id;
          id = props.title.replace(/\s+/g, '').toLowerCase();
          return typeof callback === "function" ? callback(id) : void 0;
        });
        return spyOn(project.db, 'update').andCallFake(function(props, callback) {
          return typeof callback === "function" ? callback() : void 0;
        });
      });
      return it("sets and unsets the value", function() {
        expect(project.props.title).toBe('');
        project.set('title', 'test');
        expect(project.props.title).toBe('test');
        project.unset('title');
        return expect(project.props.title).toBe('');
      });
    });
    return describe("::save", function() {
      var project;
      project = null;
      beforeEach(function() {
        project = new Project();
        spyOn(project.db, 'add').andCallFake(function(props, callback) {
          var id;
          id = props.title.replace(/\s+/g, '').toLowerCase();
          return typeof callback === "function" ? callback(id) : void 0;
        });
        return spyOn(project.db, 'update').andCallFake(function(props, callback) {
          return typeof callback === "function" ? callback() : void 0;
        });
      });
      it("does not save if not valid", function() {
        return expect(project.save()).toBe(false);
      });
      it("only saves settings that isn't default", function() {
        var props;
        props = {
          title: 'Test',
          paths: ['/Users/test']
        };
        project = new Project(props);
        return expect(project.getPropsToSave()).toEqual(props);
      });
      it("saves project if _id isn't set", function() {
        project.set('title', 'Test');
        project.set('paths', ["/Users/"]);
        expect(project.save()).toBe(true);
        expect(project.db.add).toHaveBeenCalled();
        return expect(project.props._id).toBe('test');
      });
      return it("updates project if _id is set", function() {
        project.set('title', 'Test');
        project.set('paths', ["/Users/"]);
        project.props._id = 'test';
        expect(project.save()).toBe(true);
        return expect(project.db.update).toHaveBeenCalled();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2ljaGloYXNoaV9rZW5qaS8uYXRvbS9wYWNrYWdlcy9wcm9qZWN0LW1hbmFnZXIvc3BlYy9wcm9qZWN0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLE9BQUE7O0FBQUEsRUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLGdCQUFSLENBQVYsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxTQUFULEVBQW9CLFNBQUEsR0FBQTtBQUNsQixJQUFBLEVBQUEsQ0FBRyw2QkFBSCxFQUFrQyxTQUFBLEdBQUE7QUFDaEMsVUFBQSxtQkFBQTtBQUFBLE1BQUEsVUFBQSxHQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sTUFBUDtBQUFBLFFBQ0EsS0FBQSxFQUFPLENBQUMsU0FBRCxDQURQO09BREYsQ0FBQTtBQUFBLE1BR0EsT0FBQSxHQUFjLElBQUEsT0FBQSxDQUFRLFVBQVIsQ0FIZCxDQUFBO2FBS0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBckIsQ0FBMEIsQ0FBQyxJQUEzQixDQUFnQyxvQkFBaEMsRUFOZ0M7SUFBQSxDQUFsQyxDQUFBLENBQUE7QUFBQSxJQVFBLEVBQUEsQ0FBRyw2Q0FBSCxFQUFrRCxTQUFBLEdBQUE7QUFDaEQsVUFBQSxtQkFBQTtBQUFBLE1BQUEsVUFBQSxHQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sTUFBUDtPQURGLENBQUE7QUFBQSxNQUVBLE9BQUEsR0FBYyxJQUFBLE9BQUEsQ0FBUSxVQUFSLENBRmQsQ0FBQTthQUdBLE1BQUEsQ0FBTyxPQUFPLENBQUMsT0FBUixDQUFBLENBQVAsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixLQUEvQixFQUpnRDtJQUFBLENBQWxELENBUkEsQ0FBQTtBQUFBLElBY0EsRUFBQSxDQUFHLHVDQUFILEVBQTRDLFNBQUEsR0FBQTtBQUMx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

//# sourceURL=/Users/ichihashi_kenji/.atom/packages/project-manager/spec/project-spec.coffee
