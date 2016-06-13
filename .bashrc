alias ll='ls -la'
alias g='git'
source /.git-completion.bash
source /.git-prompt.sh

PS1='\[\033[01;32m\]\u\[\033[00m\]:\[\033[01;34m\]\w\[\033[35m\]`__git_ps1`\[\033[00m\] \n$ '
