" ----- dein.vim -----
if &compatible
  set nocompatible
endif
" Add the dein installation directory into runtimepath
set runtimepath+=~/.cache/dein/repos/github.com/Shougo/dein.vim

if dein#load_state('~/.cache/dein')
  call dein#begin('~/.cache/dein')

  call dein#add('~/.cache/dein/repos/github.com/Shougo/dein.vim')
  call dein#add('Shougo/deoplete.nvim')

  call dein#add('nanotech/jellybeans.vim')
  call dein#add('itchyny/lightline')

  call dein#add('scrooloose/nerdtree')
  call dein#add('jistr/vim-nerdtree-tabs')
  call dein#add('ctrlpvim/ctrlp.vim')
  call dein#add('easymotion/vim-easymotion')
  call dein#add('vim-scripts/Align')
  call dein#add('vim-scripts/SQLUtilities')

  call dein#add('scrooloose/syntastic')

  call dein#add('posva/vim-vue')
  call dein#add('sekel/vim-vue-syntastic')
  call dein#add('kchmck/vim-coffee-script')
  call dein#add('slim-template/vim-slim')
  call dein#add( 'fatih/vim-go')
  call dein#add( 'Townk/vim-autoclose')

  if !has('nvim')
    call dein#add('roxma/nvim-yarp')
    call dein#add('roxma/vim-hug-neovim-rpc')
  endif

  call dein#end()
  call dein#save_state()
endif
" ----- /dein.vim -----

" ----- plugin config -----
" Nerdtree
nnoremap <silent><C-n> :NERDTreeTabsToggle<CR>
let NERDTreeShowHidden=1
" EasyMotion
let g:EasyMotion_leader_key='<Space>'
" fatih/vim-go
let g:go_highlight_functions=1
let g:go_highlight_methods=1
let g:go_highlight_structs=1
let g:go_highlight_operators=1
let g:go_highlight_fields=1
let g:go_highlight_build_constraints=1
" scrooloose/syntastic
let g:syntastic_enable_signs=1
let g:syntastic_auto_loc_list=1
let g:syntastic_mode_map={ 'mode': 'passive',
                        \ 'active_filetypes': ['php', 'ruby', 'javascript', 'json', 'go'],
                        \ 'passive_filetypes': []
                        \}
let g:syntastic_ruby_checkers=['rubocop']
let g:syntastic_javascript_checkers=['jshint']
let g:syntastic_php_checkers=['php']
let g:syntastic_go_checkers=['go', 'golint', 'gotype', 'govet']
let g:syntastic_quite_warnings=0
let g:syntastic_quiet_messages={"level":"warnings"}
" vue
let g:syntastic_vue_checkers = ['eslint']
let local_eslint = finddir('node_modules', '.;') . '/.bin/eslint'
if matchstr(local_eslint, "^\/\\w") == ''
    let local_eslint = getcwd() . "/" . local_eslint
endif
if executable(local_eslint)
    let g:syntastic_vue_eslint_exec = local_eslint
endif
" ctrlp
let g:ctrlp_max_height = 15
" SQL Format
:command SQLF :SQLUFormatter
" ----- /plugin config -----


" ----- vimconfig -----
filetype plugin indent on
syntax enable
" --- encode ----\
set enc=utf-8
set fencs=utf-8,euc-jp,sjis
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

set whichwrap=b,s,h,l,<,>,[,]
set matchpairs& matchpairs+=<:>

" jjでエスケープ
inoremap <silent> jj <ESC>
inoremap <silent> っｊ <ESC>

nnoremap + <C-a>
nnoremap - <C-x>

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
  autocmd FileType go :highlight goErr cterm=bold gui=BOLD ctermfg=197 guifg=#CC4635
  autocmd FileType go :match goErr /\<err\>/
endif
" ----- /indent -----
