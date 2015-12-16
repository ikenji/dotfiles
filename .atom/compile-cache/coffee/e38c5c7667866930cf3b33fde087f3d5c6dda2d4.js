(function() {
  var DB, os;

  DB = require('../lib/db');

  os = require('os');

  describe("DB", function() {
    var data, db;
    db = null;
    data = null;
    beforeEach(function() {
      db = new DB();
      data = {
        testproject1: {
          title: "Test project 1",
          group: "Test",
          paths: ["/Users/project-1"]
        },
        testproject2: {
          _id: 'testproject2',
          title: "Test project 2",
          paths: ["/Users/project-2"]
        }
      };
      spyOn(db, 'readFile').andCallFake(function(callback) {
        return callback(data);
      });
      return spyOn(db, 'writeFile').andCallFake(function(projects, callback) {
        data = projects;
        return callback();
      });
    });
    describe("::Find", function() {
      it("finds all projects when given no query", function() {
        return db.find(function(projects) {
          return expect(projects.length).toBe(2);
        });
      });
      it("finds project from path", function() {
        db.setSearchQuery('paths', ['/Users/project-2']);
        expect(db.searchKey).toBe('paths');
        expect(db.searchValue).toEqual(['/Users/project-2']);
        return db.find(function(project) {
          return expect(project.title).toBe('Test project 2');
        });
      });
      it("finds project from title", function() {
        db.setSearchQuery('title', 'Test project 1');
        return db.find(function(project) {
          return expect(project.title).toBe('Test project 1');
        });
      });
      it("finds project from id", function() {
        db.setSearchQuery('_id', 'testproject2');
        return db.find(function(project) {
          return expect(project.title).toBe('Test project 2');
        });
      });
      return it("finds nothing if query is wrong", function() {
        db.setSearchQuery('_id', 'noproject');
        return db.find(function(project) {
          return expect(project).toBe(false);
        });
      });
    });
    it("can add a project", function() {
      var newProject;
      newProject = {
        title: "New Project",
        paths: ["/Users/new-project"]
      };
      return db.add(newProject, function(id) {
        expect(id).toBe('newproject');
        return db.find(function(projects) {
          return expect(projects.length).toBe(3);
        });
      });
    });
    it("can remove a project", function() {
      return db["delete"]("testproject1", function() {
        return db.find(function(projects) {
          return expect(projects.length).toBe(1);
        });
      });
    });
    return describe("Environment specific settings", function() {
      it("loads a generic file if not set", function() {
        var filedir;
        atom.config.set('project-manager.environmentSpecificProjects', false);
        filedir = atom.getConfigDirPath();
        return expect(db.file()).toBe("" + filedir + "/projects.cson");
      });
      return it("loads a environment specific file is set to true", function() {
        var filedir, hostname;
        atom.config.set('project-manager.environmentSpecificProjects', true);
        hostname = os.hostname().split('.').shift().toLowerCase();
        filedir = atom.getConfigDirPath();
        return expect(db.file()).toBe("" + filedir + "/projects." + hostname + ".cson");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2ljaGloYXNoaV9rZW5qaS8uYXRvbS9wYWNrYWdlcy9wcm9qZWN0LW1hbmFnZXIvc3BlYy9kYi1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxNQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxXQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFHQSxRQUFBLENBQVMsSUFBVCxFQUFlLFNBQUEsR0FBQTtBQUNiLFFBQUEsUUFBQTtBQUFBLElBQUEsRUFBQSxHQUFLLElBQUwsQ0FBQTtBQUFBLElBQ0EsSUFBQSxHQUFPLElBRFAsQ0FBQTtBQUFBLElBR0EsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsRUFBQSxHQUFTLElBQUEsRUFBQSxDQUFBLENBQVQsQ0FBQTtBQUFBLE1BRUEsSUFBQSxHQUNFO0FBQUEsUUFBQSxZQUFBLEVBQ0U7QUFBQSxVQUFBLEtBQUEsRUFBTyxnQkFBUDtBQUFBLFVBQ0EsS0FBQSxFQUFPLE1BRFA7QUFBQSxVQUVBLEtBQUEsRUFBTyxDQUNMLGtCQURLLENBRlA7U0FERjtBQUFBLFFBTUEsWUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssY0FBTDtBQUFBLFVBQ0EsS0FBQSxFQUFPLGdCQURQO0FBQUEsVUFFQSxLQUFBLEVBQU8sQ0FDTCxrQkFESyxDQUZQO1NBUEY7T0FIRixDQUFBO0FBQUEsTUFnQkEsS0FBQSxDQUFNLEVBQU4sRUFBVSxVQUFWLENBQXFCLENBQUMsV0FBdEIsQ0FBa0MsU0FBQyxRQUFELEdBQUE7ZUFDaEMsUUFBQSxDQUFTLElBQVQsRUFEZ0M7TUFBQSxDQUFsQyxDQWhCQSxDQUFBO2FBa0JBLEtBQUEsQ0FBTSxFQUFOLEVBQVUsV0FBVixDQUFzQixD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

//# sourceURL=/Users/ichihashi_kenji/.atom/packages/project-manager/spec/db-spec.coffee