#!/bin/sh
# $HOMEディレクトリのdotfileをコピーする

dotfiles=(.vimrc .bashrc .bash_profile .inputrc .gvimrc .gitconfig .config .inputrc .vim)

for file in ${dotfiles[@]}; do
  cp -rf $HOME/$file ./ 
done

brew leaves > brewlist.txt
echo "\n[cask]" >> brewlist.txt
brew cask list >> brewlist.txt
