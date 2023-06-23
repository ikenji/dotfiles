# Git
# @ref: https://zenn.dev/kyome/articles/ff5641b5453e6b

source ~/.zsh/git-prompt.sh
fpath=(~/.zsh $fpath)
zstyle ':completion:*:*:git:*' script ~/.zsh/git-completion.bash
zstyle ':completion:*:default' menu select=2
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'
autoload -Uz compinit && compinit -u
GIT_PS1_SHOWDIRTYSTATE=true
setopt PROMPT_SUBST
PS1='%F{green}ichi: %F{cyan}%~%f %F{red}$(__git_ps1 "(%s)")%f
\$ '

# ruby
eval "$(rbenv init - zsh)"

# gcloud
# source '/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/completion.zsh.inc'
# source '/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/path.zsh.inc'

# alias
alias mv='mv -i'
alias rm='rm -i'
alias cp='cp -i'
alias ll='ls -lahG'

eval "$(jump shell)"

function select-history() {
  BUFFER=$(history -n -r 1 | fzf --no-sort +m --query "$LBUFFER" --prompt="History > ")
  CURSOR=$#BUFFER
}

zle -N select-history
bindkey '^r' select-history

function sshf () {
  local selected_host=$(grep "Host " ./ssh_config | grep -v '*' | cut -b 6- | fzf)

  if [ -n "$selected_host" ]; then
    echo "ssh -F ./ssh_config ${selected_host}"
    ssh -F ./ssh_config $selected_host
  fi
}
