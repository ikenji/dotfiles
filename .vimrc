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
  Plug 'Townk/vim-autoclose'

	"" lsp
  Plug 'prabirshrestha/async.vim'
  Plug 'prabirshrestha/asyncomplete.vim'
  Plug 'prabirshrestha/asyncomplete-lsp.vim'
  Plug 'prabirshrestha/vim-lsp'

  Plug 'mattn/vim-lsp-settings'
	Plug 'mattn/vim-goimports'
	"" /lsp
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

au FileType html        setlocal sw=2 sts=2 ts=2 et
au FileType erb         setlocal sw=2 sts=2 ts=2 et
au FileType ruby        setlocal sw=2 sts=2 ts=2 et
au FileType php         setlocal sw=2 sts=2 ts=2 et
au FileType slim        setlocal sw=2 sts=2 ts=2 et
au FileType js          setlocal sw=2 sts=2 ts=2 et
au FileType vue         setlocal sw=2 sts=2 ts=2 et
au FileType javascript  setlocal sw=2 sts=2 ts=2 et
au FileType coffee      setlocal sw=2 sts=2 ts=2 et
au FileType css         setlocal sw=2 sts=2 ts=2 et
au FileType scss        setlocal sw=2 sts=2 ts=2 et
au FileType sh          setlocal sw=2 sts=2 ts=2 et
au FileType go          setlocal sw=4 ts=4 sts=4 noet
au FileType go :highlight goErr cterm=bold gui=BOLD ctermfg=197 guifg=#CC4635
au FileType go :match goErr /\<err\>/
au BufNewFile,BufRead *.{md,mdwn,mkd,mkdn,mark*} set filetype=markdown

" convert from jj to escape
inoremap <silent> jj <ESC>
inoremap <silent> っｊ <ESC>
" path to clipboard when use C-g
nnoremap <C-g> :<C-u>echo "[copied]" . expand('%') \| let @+=expand('%')<CR>
" exit :terminal
tnoremap <C-[> <C-w><S-n>

:command T :terminal
:command LSP :LspInstallServer
cabbrev xmllint %!xmllint --format -

"" plugin setting
" previm
let g:previm_open_cmd = ' open -a Safari'
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
" linediff
cabbrev LD :Linediff

" lsp
if empty(globpath(&rtp, 'autoload/lsp.vim'))
  finish
endif

function! s:on_lsp_buffer_enabled() abort
  setlocal omnifunc=lsp#complete
  setlocal signcolumn=yes
  nmap <buffer> gd <plug>(lsp-definition)
  nmap <buffer> <f2> <plug>(lsp-rename)
  inoremap <expr> <cr> pumvisible() ? "\<c-y>\<cr>" : "\<cr>"
endfunction

augroup lsp_install
  au!
  autocmd User lsp_buffer_enabled call s:on_lsp_buffer_enabled()
augroup END
command! LspDebug let lsp_log_verbose=1 | let lsp_log_file = expand('~/lsp.log')

let g:lsp_diagnostics_enabled = 1
let g:lsp_diagnostics_echo_cursor = 1
let g:asyncomplete_auto_popup = 0
let g:asyncomplete_auto_completeopt = 0
let g:asyncomplete_popup_delay = 300
let g:lsp_text_edit_enabled = 1
" /lsp


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

