if has("multi_lang")
  language C
endif

call plug#begin()
  Plug 'nanotech/jellybeans.vim'

  Plug 'scrooloose/nerdtree'
  Plug 'itchyny/lightline.vim'

  Plug 'easymotion/vim-easymotion'
  Plug 'junegunn/fzf'
  Plug 'junegunn/fzf.vim'
  Plug 'thinca/vim-quickrun'
  Plug 'vim-scripts/SQLUtilities'
  Plug 'tpope/vim-surround'
  Plug 'AndrewRadev/linediff.vim'

  Plug 'previm/previm'
  Plug 'plasticboy/vim-markdown'
  Plug 'godlygeek/tabular'
  Plug 'mattn/vim-maketable'
call plug#end()

set number
set hlsearch
set clipboard=unnamed,autoselect
set enc=utf-8
set fencs=utf-8,sjis,euc-jp
set noswapfile
set autoread
set backspace=indent,eol,start
set title
set nowrap
set nowrapscan
set visualbell t_vb=
set noerrorbells
set laststatus=2
set showmatch
set incsearch
set tabstop=2
set list
set listchars=tab:>.,trail:_,eol:↲,extends:>,precedes:<,nbsp:%
set imdisable


" convert from jj to escape
inoremap <silent> jj <ESC>
inoremap <silent> っｊ <ESC>
" path to clipboard when use C-g
nnoremap <C-g> :<C-u>echo "[copied]" . expand('%') \| let @+=expand('%')<CR>
" exit :terminal
tnoremap <C-[> <C-w><S-n>

:command T :terminal

cabbrev xmllint %!xmllint --format -

"" plugin setting
" previm
let g:previm_open_cmd = ' open -a Safari'
autocmd BufNewFile,BufRead *.{md,mdwn,mkd,mkdn,mark*} set filetype=markdown
:command M :PrevimOpen
:command Markdown :PrevimOpen
" vim-markdown
let g:vim_markdown_folding_disabled = 1
" fzf
nnoremap <C-p> :FZFFileList<CR>
nnoremap <C-h> :History<CR>
command! FZFFileList call fzf#run(fzf#wrap({
              \ 'source': 'find . -type d -name .git -prune -o ! -name .DS_Store',
              \ 'down': '20%'}))
" nerdtree
nnoremap <C-n> :NERDTreeToggle<CR>
let NERDTreeShowHidden=1
" easymotion
let g:EasyMotion_leader_key='<Space>'
" sqlutilities
:command SQLF :SQLUFormatter
" tableformat
:command TF :TableFormat
" maketable
cabbrev MT :MakeTable


"" function
function! RTrim()
  let s:tmppos = getpos(".")
  if &filetype == "markdown"
    %s/\v(\s{2})?(\s+)?$/\1/e
    match Underlined /\s\{2}$/
  else
    %s/\v\s+$//e
  endif
  call setpos(".", s:tmppos)
endfunction
if &filetype != "markdown"
  autocmd BufWritePre * :call RTrim()
endif

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

