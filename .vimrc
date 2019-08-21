" ----- dein init -----
let s:dein_dir = expand('~/.cache/dein')
let s:dein_repo_dir = s:dein_dir . '/repos/github.com/Shougo/dein.vim'
if &runtimepath !~# '/dein.vim'
  if !isdirectory(s:dein_repo_dir)
    execute '!git clone https://github.com/Shougo/dein.vim' s:dein_repo_dir
  endif
  execute 'set runtimepath^=' . fnamemodify(s:dein_repo_dir, ':p')
endif
"------ /dein init ------

" ----- plugin -----
if dein#load_state(s:dein_dir)
  call dein#begin(s:dein_dir)

  let g:rc_dir    = expand('~/.vim/rc')
  let s:toml      = g:rc_dir . '/dein.toml'
  let s:lazy_toml = g:rc_dir . '/dein_lazy.toml'

  call dein#load_toml(s:toml,      {'lazy': 0})
  call dein#load_toml(s:lazy_toml, {'lazy': 1})

  call dein#end()
  call dein#save_state()
endif

if dein#check_install()
  call dein#install()
endif
" ----- /plugin -----

" ----- config -----
filetype plugin indent on
syntax enable
" colorscheme jellybeans "dark2
" set guifont=Cica:h12

set enc=utf-8
set fencs=utf-8,sjis,euc-jp
set backspace=indent,eol,start
set autoread       " 外部でファイルに変更がされた場合は読みなおす
set clipboard=unnamed,autoselect "クリックボード
set nobackup       " ファイル保存時にバックアップファイルを作らない
set noswapfile     " ファイル編集中にスワップファイルを作らない
set title          " 編集中のファイル名を表示する
set nowrap         " 折り返さない
set vb t_vb=       " ピープをならさない
set novisualbell
set number         " 行番号を表示する
" set cursorline     " カーソル行の背景色を変える
set laststatus=2   " ステータス行を常に表示
set cmdheight=2    " メッセージ表示欄を2行確保
set showmatch      " 対応する括弧を強調表示

set hlsearch   " 検索文字列をハイライトする
set nowrapscan
set incsearch  " インクリメンタルサーチを行う
set ignorecase " 大文字と小文字を区別しない
set smartcase  " 大文字と小文字が混在した言葉で検索を行った場合に限り、大文字と小文字を区別する
set wrapscan   " 最後尾まで検索を終えたら次の検索で先頭に移る
set gdefault   " 置換の時 g オプションをデフォルトで有効にする

set expandtab     " タブ入力を複数の空白入力に置き換える
set tabstop=2     " 画面上でタブ文字が占める幅
set shiftwidth=2  " 自動インデントでずれる幅
set softtabstop=2 " 連続した空白に対してタブキーやバックスペースキーでカーソルが動く幅
set autoindent    " 改行時に前の行のインデントを継続する
set smartindent   " 改行時に入力された行の末尾に合わせて次の行のインデントを増減する

set autoread   "外部でファイルに変更がされた場合は読みなおす
set noundofile "undofileを作らない
set nobackup   " ファイル保存時にバックアップファイルを作らない
set display=lastline
set pumheight=10
set matchtime=1
set imdisable
set whichwrap=b,s,h,l,<,>,[,]
set matchpairs& matchpairs+=<:>
set completeopt=menu,preview


" ctrl + g でファイルのパスをクリップボードへコピー
nnoremap <C-g> :<C-u>echo "[copied]" . expand('%') \| let @+=expand('%')<CR>
nnoremap <C-j> :GoDef

" jjでエスケープ
inoremap <silent> jj <ESC>
inoremap <silent> っｊ <ESC>

" Ctrl + [, Esc で :terminal の insert を抜ける
tnoremap <C-[> <C-w><S-n>
:command T :terminal

" ----- indent -----
" ファイルタイプ別のプラグイン/インデントを有効にする
filetype plugin indent on
if has("autocmd")
  "sw=softtabstop, sts=shiftwidth, ts=tabstop, et=expandtabの略
  autocmd FileType html        setlocal sw=2 sts=2 ts=2 et
  autocmd FileType erb         setlocal sw=2 sts=2 ts=2 et
  autocmd FileType ruby        setlocal sw=2 sts=2 ts=2 et
  autocmd FileType php         setlocal sw=2 sts=2 ts=2 et
  autocmd FileType slim        setlocal sw=2 sts=2 ts=2 et
  autocmd FileType js          setlocal sw=2 sts=2 ts=2 et
  autocmd FileType vue         setlocal sw=2 sts=2 ts=2 et
  autocmd FileType javascript  setlocal sw=2 sts=2 ts=2 et
  autocmd FileType coffee      setlocal sw=2 sts=2 ts=2 et
  autocmd FileType css         setlocal sw=2 sts=2 ts=2 et
  autocmd FileType scss        setlocal sw=2 sts=2 ts=2 et
  autocmd FileType sh          setlocal sw=2 sts=2 ts=2 et
  autocmd FileType go          setlocal sw=4 ts=4 sts=4 noet
  autocmd FileType go :highlight goErr cterm=bold gui=BOLD ctermfg=197 guifg=#CC4635
  autocmd FileType go :match goErr /\<err\>/
endif
" ----- /indent -----
