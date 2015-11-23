(function() {
  var pty;

  pty = require('pty.js');

  module.exports = function(ptyCwd, sh, args) {
    var callback, cols, path, ptyProcess, rows, shell;
    callback = this.async();
    if (sh) {
      shell = sh;
    } else {
      if (process.platform === 'win32') {
        path = require('path');
        shell = path.resolve(process.env.SystemRoot, 'WindowsPowerShell', 'v1.0', 'powershell.exe');
      } else {
        shell = process.env.SHELL;
      }
    }
    cols = 80;
    rows = 30;
    ptyProcess = pty.fork(shell, args, {
      name: 'xterm-256color',
      cols: cols,
      rows: rows,
      cwd: ptyCwd,
      env: process.env
    });
    ptyProcess.on('data', function(data) {
      return emit('term2:data', data);
    });
    ptyProcess.on('exit', function() {
      emit('term2:exit');
      return callback();
    });
    return process.on('message', function(_arg) {
      var cols, event, rows, text, _ref;
      _ref = _arg != null ? _arg : {}, event = _ref.event, cols = _ref.cols, rows = _ref.rows, text = _ref.text;
      switch (event) {
        case 'resize':
          return ptyProcess.resize(cols, rows);
        case 'input':
          return ptyProcess.write(text);
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2ljaGloYXNoaV9rZW5qaS8uYXRvbS9wYWNrYWdlcy90ZXJtMi9saWIvcHR5LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUVBO0FBQUEsTUFBQSxHQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsTUFBRCxFQUFTLEVBQVQsRUFBYSxJQUFiLEdBQUE7QUFDZixRQUFBLDZDQUFBO0FBQUEsSUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFYLENBQUE7QUFDQSxJQUFBLElBQUcsRUFBSDtBQUNJLE1BQUEsS0FBQSxHQUFRLEVBQVIsQ0FESjtLQUFBLE1BQUE7QUFHSSxNQUFBLElBQUcsT0FBTyxDQUFDLFFBQVIsS0FBb0IsT0FBdkI7QUFDRSxRQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7QUFBQSxRQUNBLEtBQUEsR0FBUSxJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBekIsRUFBcUMsbUJBQXJDLEVBQTBELE1BQTFELEVBQWtFLGdCQUFsRSxDQURSLENBREY7T0FBQSxNQUFBO0FBSUUsUUFBQSxLQUFBLEdBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFwQixDQUpGO09BSEo7S0FEQTtBQUFBLElBVUEsSUFBQSxHQUFPLEVBVlAsQ0FBQTtBQUFBLElBV0EsSUFBQSxHQUFPLEVBWFAsQ0FBQTtBQUFBLElBYUEsVUFBQSxHQUFhLEdBQUcsQ0FBQyxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUNYO0FBQUEsTUFBQSxJQUFBLEVBQU0sZ0JBQU47QUFBQSxNQUNBLElBQUEsRUFBTSxJQUROO0FBQUEsTUFFQSxJQUFBLEVBQU0sSUFGTjtBQUFBLE1BR0EsR0FBQSxFQUFLLE1BSEw7QUFBQSxNQUlBLEdBQUEsRUFBSyxPQUFPLENBQUMsR0FKYjtLQURXLENBYmIsQ0FBQTtBQUFBLElBb0JBLFVBQVUsQ0FBQyxFQUFYLENBQWMsTUFBZCxFQUFzQixTQUFDLElBQUQsR0FBQTthQUFVLElBQUEsQ0FBSyxZQUFMLEVBQW1CLElBQW5CLEVBQVY7SUFBQSxDQUF0QixDQXBCQSxDQUFBO0FBQUEsSUFxQkEsVUFBVSxDQUFDLEVBQVgsQ0FBYyxNQUFkLEVBQXNCLFNBQUEsR0FBQTtBQUNwQixNQUFBLElBQUEsQ0FBSyxZQUFMLENBQUEsQ0FBQTthQUNBLFFBQUEsQ0FBQSxFQUZvQjtJQUFBLENBQXRCLENBckJBLENBQUE7V0F5QkEsT0FBTyxDQUFDLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLFNBQUMsSUFBRCxHQUFBO0FBQ3BCLFVBQUEsNkJBQUE7QUFBQSw0QkFEcUIsT0FBMEIsSUFBekIsYUFBQSxPQUFPLFlBQUEsTUFBTSxZQUFBLE1BQU0sWUFBQSxJQUN6QyxDQUFBO0FBQUEsY0FBTyxLQUFQO0FBQUEsYUFDTyxRQURQO2lCQUNxQixVQUFVLENBQUMsTUFBWCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQURyQjtBQUFBLGFBRU8sT0FGUDtpQkFFb0IsVUFBVSxDQUFDLEtBQVgsQ0FBaUIsSUFBakIsRUFGcEI7QUFBQSxPQURvQjtJQUFBLENBQXRCLEVBMUJlO0VBQUEsQ0FGakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/ichihashi_kenji/.atom/packages/term2/lib/pty.coffee
