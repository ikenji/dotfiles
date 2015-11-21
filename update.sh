#!/bin/sh
# $HOMEディレクトリのdotfileをこのディレクトリにコピーする

dotfiles=(.vimrc .bashrc .bash_profile .gvimrc)

for file in ${dotfiles[@]}; do
        cp  $HOME/$file ./$file 
    done
