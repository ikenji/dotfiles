#!/bin/sh
# $HOMEディレクトリのdotfileをコピーする

dotfiles=(.vimrc .bashrc .bash_profile .gvimrc .gitconfig .vim)

for file in ${dotfiles[@]}; do
  cp -rf $HOME/$file ./ 
done
