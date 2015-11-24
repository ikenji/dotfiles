syntax on
" ▼  エンコード
set encoding=utf-8
set fileencoding=utf-8
" windowsで文字化けした場合に追加 
set termencoding=cp932
set fileencodings+=utf-8,euc-jp,iso-2022-jp,ucs-2le,ucs-2,euc-jp,cp932

" ▼ 基本的な設定
set clipboard=unnamed,autoselect
set autoread       " 外部でファイルに変更がされた場合は読みなおす
set nobackup       " ファイル保存時にバックアップファイルを作らない
set noswapfile     " ファイル編集中にスワップファイルを作らない
set title          " 編集中のファイル名を表示する
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
set noswapfile " ファイル編集中にスワップファイルを作らない

" window manage 
nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l


" kaoriya特有の機能をOFF
if has('kaoriya')
	let g:no_vimrc_example=0
	let g:vimrc_local_finish=1
	let g:gvimrc_local_finish=1
 
	"$VIM/plugins/kaoriya/autodate.vim
	let plugin_autodate_disable  = 1
	"$VIM/plugins/kaoriya/cmdex.vim
	let plugin_cmdex_disable     = 1
	"$VIM/plugins/kaoriya/dicwin.vim
	let plugin_dicwin_disable    = 1
	"$VIMRUNTIME/plugin/format.vim
	let plugin_format_disable    = 1
	"$VIM/plugins/kaoriya/hz_ja.vim
	let plugin_hz_ja_disable     = 1
	"$VIM/plugins/kaoriya/scrnmode.vim
	let plugin_scrnmode_disable  = 1
	"$VIM/plugins/kaoriya/verifyenc.vim
	let plugin_verifyenc_disable = 1
endif


function! s:vimdiff_in_newtab(...)
  if a:0 == 1
    tabedit %:p
    exec 'rightbelow vertical diffsplit ' . a:1
  else
    exec 'tabedit ' . a:1
    for l:file in a:000[1 :]
      exec 'rightbelow vertical diffsplit ' . l:file
    endfor
  endif
endfunction
command! -bar -nargs=+ -complete=file Diff  call s:vimdiff_in_newtab(<f-args>)
