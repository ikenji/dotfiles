set fencs=iso-2022-jp,cp932,sjis,euc-jp,utf-8

"Display
colorscheme jellybeans "dark2

" ----config----
syntax on   "シンタックスカラーリングを設定する
set t_Co=256
set guifont="San Francisco Mono"
set textwidth=0 " 自動改行しない
set cursorline "行ハイライト
set number    "行番号を表示する
set title    "編集中のファイル名を表示する
set showcmd    "入力中のコマンドを表示する
set ruler    "座標を表示する
set showmatch   "閉じ括弧の入力時に対応する括弧を表示する
set matchtime=3 "showmatchの表示時間
set laststatus=2    "ステータスラインを常に表示する
set imdisable 

"タブ、空白、改行の可視化
set list
set listchars=tab:>.,trail:_,eol:↲,extends:>,precedes:<,nbsp:%

"全角スペースをハイライト表示
function! ZenkakuSpace()
    highlight ZenkakuSpace cterm=reverse ctermfg=DarkMagenta gui=reverse guifg=DarkMagenta
endfunction
   
if has('syntax')
    augroup ZenkakuSpace
        autocmd!
        autocmd ColorScheme       * call ZenkakuSpace()
        autocmd VimEnter,WinEnter * match ZenkakuSpace /　/
    augroup END
    call ZenkakuSpace()
endif
