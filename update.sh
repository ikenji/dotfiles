#!/bin/sh
# $HOMEディレクトリのdotfileをこのディレクトリにコピーする

dotfiles=(.vimrc .bashrc .bash_profile .gvimrc .atom)

for file in ${dotfiles[@]}; do
        cp -r $HOME/$file ./$file 
    done
