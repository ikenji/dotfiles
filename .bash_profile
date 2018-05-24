if [ -f ~/.bashrc ] ; then
. ~/.bashrc
fi
function peco-select-history() {
  export LANG=C
  local CMD=`history | tail -r | sed -e 's/[ ]*[0-9]*[ ]*//' | peco --query "$READLINE_LINE"`
  if [ -n "$CMD" ] ; then
    history -s $CMD
    if type osascript > /dev/null 2>&1 ; then
      (osascript -e 'tell application "System Events" to keystroke (ASCII character 30)' &)
    fi
  else
    # Remove the last entry, "peco-history"
    history -d $((HISTCMD-1))
  fi
}
bind -x '"\C-r": peco-select-history'

function peco-sshconfig-ssh() {
    local host=$(grep 'Host ' ~/.ssh/config | awk '{print $2}' | peco)
    if [ -n "$host" ]; then
        echo "ssh -F ~/.ssh/config $host"
        ssh -F ~/.ssh/config $host
    fi
}
alias sshc='peco-sshconfig-ssh'
