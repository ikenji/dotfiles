" ---- vim plugin(NeoBundle) ----
if has('vim_starting')
  " 初回起動時のみruntimepathにneobundleのパスを指定
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif

" NeoBundleを初期化
call neobundle#begin(expand('~/.vim/bundle/'))

" plugin list
NeoBundle 'plasticboy/vim-markdown'
NeoBundle 'kannokanno/previm'
NeoBundle 'tyru/open-browser.vim' " PreVimOpenでブラウザ起動
NeoBundle 'scrooloose/nerdtree' " ツリー
NeoBundle 'jistr/vim-nerdtree-tabs' " ツリータブ時に便利に
NeoBundle 'itchyny/lightline.vim' " ウィンドウ下部にモード表示
NeoBundle 'scrooloose/syntastic' " check syntax error
NeoBundle "ctrlpvim/ctrlp.vim"
NeoBundle 'Townk/vim-autoclose'
NeoBundle 'fatih/vim-go'
call neobundle#end()

" Required:
filetype plugin indent on

" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck

"NeoBundle 'nerdtree"
let NERDTreeShowHidden=1
"NeoBundle 'scrooloose/syntastic'
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

" NeoBundle 'ctrlp'
let g:ctrlp_max_height          = 25

au BufRead,BufNewFile *.md set filetype=markdown
" ファイルタイプ別のプラグイン/インデントを有効にする
filetype plugin indent on

" ---- vim config ----
syntax on
" ▼ エンコード
set enc=utf-8
set fencs=utf-8,euc-jp,sjis
" ▼ 基本的な設定
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

" ---- key bind ----
nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l
" jjでエスケープ
inoremap <silent> jj <ESC>
" 日本語入力で”っj”と入力してもEnterキーで確定させればインサートモードを抜ける
inoremap <silent> っj <ESC>
nnoremap + <C-a>
nnoremap - <C-x>
nnoremap <silent><C-n> :NERDTreeTabsToggle<CR>
