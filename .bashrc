export LC_ALL=ja_JP.UTF-8
export LANG=ja_JP.UTF-8
export PS1='\[\033[32m\]\u\[\033[00m\]:\[\033[34m\]\w\[\033[31m\]$(__git_ps1)\[\033[00m\]\n$ '
export LESSCHARSET=utf-8
export "EDITOR=vim"
# export PS1='\[\033[32m\]\u@\h\[\033[00m\]:\[\033[34m\]\w\[\033[31m\]$(__git_ps1)\[\033[00m\]\n$ '

# git settings
source ~/git-prompt.sh
source ~/git-completion.bash
# alias
alias ll='ls -la'
alias g='git'

## Go 環境設定
if [ -x "`which go`" ]; then
    export GOPATH=$HOME/go
    export PATH=$PATH:$GOPATH/bin
fi
if [ -x `which vim` ];  then
   alias vi='vim'
   alias view='vim -R'
fi
