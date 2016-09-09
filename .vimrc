" Nome: Skip initialization for vim-tiny or vim-small.
if 0 | endif

if has('vim_starting')
  if &compatible
    set nocompatible               " Be iMproved
  endif

  " Required:
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif

" Required:
call neobundle#begin(expand('~/.vim/bundle/'))

" Let NeoBundle manage NeoBundle
" Required:
NeoBundleFetch 'Shougo/neobundle.vim'
NeoBundle 'plasticboy/vim-markdown'
NeoBundle 'kannokanno/previm'
NeoBundle 'tyru/open-browser.vim'
NeoBundle 'scrooloose/nerdtree'
NeoBundle 'itchyny/lightline.vim'
NeoBundle 'scrooloose/syntastic'
NeoBundle 'mattn/emmet-vim'
NeoBundle 'Townk/vim-autoclose'
NeoBundle 'thinca/vim-quickrun'
NeoBundle 'grep.vim'
NeoBundle "ctrlpvim/ctrlp.vim"
" indentの深さに色を付ける
" NeoBundle 'nathanaelkane/vim-indent-guides'
" syntax + 自動compile
NeoBundle 'kchmck/vim-coffee-script'

call neobundle#end()

" Required:
filetype plugin indent on

" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck
" NeoBundle 'scrooloose/syntastic'
let g:syntastic_enable_signs=1
let g:syntastic_auto_loc_list=1
let g:syntastic_mode_map={ 'mode': 'passive',
                        \ 'active_filetypes': ['php', 'ruby', 'javascript', 'json'],
                        \ 'passive_filetypes': []
                        \}
let g:syntastic_ruby_checkers=['rubocop']
let g:syntastic_javascript_checkers=['jshint']
let g:syntastic_php_checkers=['php']
let g:syntastic_quite_warnings=0
let g:syntastic_quiet_messages= {"level":"warnings"}

" NeoBundle 'scrooloose/nerdtree'
let NERDTreeShowHidden=1

" vimにcoffeeファイルタイプを認識させる
au BufRead,BufNewFile,BufReadPre *.coffee   set filetype=coffee
" インデントを設定
autocmd FileType coffee     setlocal sw=2 sts=2 ts=2 et

" vim-indent-guides
" let g:indent_guides_auto_colors=0
" autocmd VimEnter,Colorscheme * :hi IndentGuidesOdd   ctermbg=110
" autocmd VimEnter,Colorscheme * :hi IndentGuidesEven  ctermbg=140
" let g:indent_guides_enable_on_vim_startup=1
" let g:indent_guides_guide_size=1


syntax on
" ▼  エンコード
set enc=japan
set fileformat=unix
set encoding=utf-8
set fileencodings=iso-2022-jp,euc-jp,utf-8,sjis
" ▼ 基本的な設定
set guifont=Ricty_Diminished:h12:cSHIFTJIS
set clipboard=unnamed,autoselect
set autoread       " 外部でファイルに変更がされた場合は読みなおす
set nobackup       " ファイル保存時にバックアップファイルを作らない
set noswapfile     " ファイル編集中にスワップファイルを作らない
set title          " 編集中のファイル名を表示する
set nowrap         " 折り返さない
set vb t_vb=       " ピープをならさない
set novisualbell
set number         " 行番号を表示する
"set cursorline     " カーソル行の背景色を変える
set laststatus=2   " ステータス行を常に表示
set cmdheight=2    " メッセージ表示欄を2行確保
set showmatch      " 対応する括弧を強調表示
set helpheight=999 " ヘルプを画面いっぱいに開く

set hlsearch   " 検索文字列をハイライトする
set incsearch  " インクリメンタルサーチを行う
set ignorecase " 大文字と小文字を区別しない
set smartcase  " 大文字と小文字が混在した言葉で検索を行った場合に限り、大文字と小文字を区別する
set wrapscan   " 最後尾まで検索を終えたら次の検索で先頭に移る
set gdefault   " 置換の時 g オプションをデフォルトで有効にする

set expandtab     " タブ入力を複数の空白入力に置き換える
set tabstop=4     " 画面上でタブ文字が占める幅
set shiftwidth=4  " 自動インデントでずれる幅
set softtabstop=4 " 連続した空白に対してタブキーやバックスペースキーでカーソルが動く幅
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
" neocomplcache
let g:neocomplcache_enable_at_startup = 1 " 起動時に有効化
inoremap <expr><TAB>  pumvisible() ? "\<C-n>" : "\<TAB>"

" window manage
nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l
inoremap <silent> jj <c-[>
nnoremap + <C-a>
nnoremap - <C-x>
nnoremap <silent><C-n> :NERDTreeToggle<CR>
autocmd BufNewFile,BufRead *.{md,mdwn,mkd,mkdn,mark*} set filetype=markdown
" 行末の空白を削除
autocmd BufWritePre * :%s/\s\+$//e
" Previm
let g:previm_open_cmd='chrome'
let g:vim_markdown_folding_disabled=1
nnoremap [previm] <Nop>
nmap <Space>p [previm]
nmap / /\v
nnoremap <silent> [previm]o :<C-u>PrevimOpen<CR>
nnoremap <silent> [previm]r :call previm#refresh()<CR>
