#!/bin/sh
# $HOMEディレクトリのdotfileをこのディレクトリにコピーする

dotfiles=(.vimrc .bashrc .bash_profile .gvimrc .gitconfig .vim)

for file in ${dotfiles[@]}; do
        cp -r $HOME/$file ./$file 
    done
