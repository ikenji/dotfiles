#!/bin/sh
# $HOMEディレクトリのdotfileをコピーする

dotfiles=(.vimrc .bashrc .bash_profile .inputrc .gvimrc .gitconfig .vim .config .inputrc)

for file in ${dotfiles[@]}; do
  cp -rf $HOME/$file ./ 
done

brew list > brewlist.txt
echo "\n[cask]" >> brewlist.txt
brew cask list >> brewlist.txt
