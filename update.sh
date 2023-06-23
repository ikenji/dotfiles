#!/bin/sh
# $HOMEディレクトリのdotfileをコピーする

dotfiles=(.vimrc .zshrc .gvimrc .gitconfig)

for file in ${dotfiles[@]}; do
  cp -rf $HOME/$file ./
done

brew leaves > brewlist.txt
echo "\n[cask]" >> brewlist.txt
