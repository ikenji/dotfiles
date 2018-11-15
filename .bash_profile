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
  conf=${@:-"$HOME/.ssh/config"}
  if [ ! -e $conf ]; then
    echo "'./"$conf"' is not found"
    return
  fi

  local host=$(grep 'Host ' $conf | awk '{print $2}' | peco)
  if [ -n "$host" ]; then
      echo "ssh -F $conf $host"
      ssh -F $conf $host
  fi
}
alias sshf='peco-sshconfig-ssh $@'
