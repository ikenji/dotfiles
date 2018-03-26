export "EDITOR=vim"
# git settings
source ~/git-prompt.sh
source ~/git-completion.bash
# export PS1='\[\033[32m\]\u@\h\[\033[00m\]:\[\033[34m\]\w\[\033[31m\]$(__git_ps1)\[\033[00m\]\n$ '
export PS1='\[\033[32m\]\u\[\033[00m\]:\[\033[34m\]\w\[\033[31m\]$(__git_ps1)\[\033[00m\]\n$ '
# alias
alias ll='ls -la'
alias g='git'
export LESSCHARSET=utf-8

## Go 環境設定
if [ -x "`which go`" ]; then
    export GOPATH=$HOME/go
    export PATH=$PATH:$GOPATH/bin
fi
if [ -x `which vim` ];  then
   alias vi='vim'
   alias view='vim -R'
fi
