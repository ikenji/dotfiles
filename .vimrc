let $PATH = "~/.pyenv/shims:".$PATH

call plug#begin()
Plug 'nanotech/jellybeans.vim'

Plug 'itchyny/lightline.vim'
Plug 'lambdalisue/fern.vim'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'mattn/ctrlp-matchfuzzy'


Plug 'easymotion/vim-easymotion'
Plug 'thinca/vim-quickrun'
Plug 'mattn/vim-sqlfmt'
Plug 'tpope/vim-surround'
Plug 'AndrewRadev/linediff.vim'

Plug 'previm/previm'
Plug 'airblade/vim-gitgutter'
Plug 'godlygeek/tabular'
Plug 'mattn/vim-maketable'
Plug 'Townk/vim-autoclose'
Plug 'cohama/lexima.vim'
Plug 'codota/tabnine'

Plug 'othree/html5.vim'
Plug 'hail2u/vim-css3-syntax'
Plug 'pangloss/vim-javascript'
Plug 'posva/vim-vue'
Plug 'sekel/vim-vue-syntastic'
Plug 'kchmck/vim-coffee-script'
Plug 'slim-template/vim-slim'
Plug 'pangloss/vim-javascript'
Plug 'mxw/vim-jsx'


Plug 'mattn/vim-goimports'
Plug 'mattn/vim-goaddtags'
Plug 'mattn/emmet-vim'
Plug 'tomtom/tcomment_vim'

Plug 'epilande/vim-es2015-snippets'
Plug 'epilande/vim-react-snippets'
Plug 'SirVer/ultisnips'
Plug 'gorodinskiy/vim-coloresque'

" lsp
Plug 'mattn/vim-lsp-settings'
Plug 'prabirshrestha/async.vim'
Plug 'prabirshrestha/asyncomplete.vim'
Plug 'prabirshrestha/asyncomplete-lsp.vim'
Plug 'prabirshrestha/vim-lsp'
" /lsp
"
Plug 'prettier/vim-prettier', { 'do': 'yarn install', 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue', 'yaml', 'html', 'ruby'] }
call plug#end()

if has("multi_lang")
				language C
endif

colorscheme jellybeans
set synmaxcol=320
set ttimeoutlen=0
set number
set ma
set nf=
set wrapscan
set hlsearch
set gdefault
set clipboard=unnamed,autoselect
set enc=utf-8
set fencs=utf-8,sjis,euc-jp
set fileformats=unix,dos,mac
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
set ignorecase
set smartcase
set tabstop=2
set list
set listchars=tab:>.,trail:_,eol:↲,extends:>,precedes:<,nbsp:%
set whichwrap=b,s,h,l,<,>,[,],~
set imdisable
set updatetime=250

au FileType html        setlocal sw=2 sts=2 ts=2 et
au FileType erb         setlocal sw=2 sts=2 ts=2 et
au FileType ruby        setlocal sw=2 sts=2 ts=2 et
au FileType python      setlocal sw=4 sts=4 ts=4 et
au FileType yaml        setlocal sw=2 sts=2 ts=2 et
au FileType yal         setlocal sw=2 sts=2 ts=2 et
au FileType php         setlocal sw=2 sts=2 ts=2 et
au FileType slim        setlocal sw=2 sts=2 ts=2 et
au FileType js          setlocal sw=2 sts=2 ts=2 et
au FileType vue         setlocal sw=2 sts=2 ts=2 et
au FileType javascript  setlocal sw=2 sts=2 ts=2 et
au FileType coffee      setlocal sw=2 sts=2 ts=2 et
au FileType css         setlocal sw=2 sts=2 ts=2 et
au FileType scss        setlocal sw=2 sts=2 ts=2 et
au FileType json        setlocal sw=2 sts=2 ts=2 et
au FileType sh          setlocal sw=2 sts=2 ts=2 et
au FileType go          setlocal sw=4 ts=4 sts=4 noet
au FileType go :highlight goErr cterm=bold gui=BOLD ctermfg=197 guifg=#CC4635
au FileType go :match goErr /\<err\>/
au BufNewFile,BufRead *.{md,mdwn,mkd,mkdn,mark*} set filetype=markdown
hi def link markdownBold NONE
hi def link markdownBoldItalic NONE
hi def link markdownItalic NONE

" convert from jj to escape
inoremap <silent> jj <ESC>
inoremap <silent> っｊ <ESC>
" path to clipboard when use C-g
nnoremap <C-g> :<C-u>echo "[copied]" . expand('%') \| let @+=expand('%')<CR>
" exit :terminal
tnoremap <C-[> <C-w><S-n>

:command T :terminal
:command LSPI :LspInstallServer
:command LSP :LspStatus
:command P :Prettier
:command SQLF :SQLFmt
:command JSONF :%!jq .
cabbrev xmllint %!xmllint --format -
let g:ruby_path = ""

"" plugin setting
" previm
let g:previm_open_cmd = 'open -a Safari'
let g:previm_show_header = 0
:command M :PrevimOpen
:command Markdown :PrevimOpen
" vim-markdown
let g:vim_markdown_folding_disabled = 1
let g:previm_disable_default_css = 1
let g:previm_custom_css_path = '~/src/dotfiles/markdown.css'
" previm markdown
let g:preview_markdown_vertical = 1
nnoremap <C-h> :CtrlPBuffer<CR>

" ctrlp -
let g:ctrlp_match_func = { 'match' : 'ctrlp_matchfuzzy#matcher' }

" Fern - File Tree
nnoremap <C-n> :Fern . -reveal=% -drawer -toggle -width=30<CR>
let g:fern#default_hidden=1

" easymotion
let g:EasyMotion_leader_key='<Space>'
" preview markdown
"" :command  PM :PreviewMarkdown
" tableformat
:command TF :TableFormat
" maketable
cabbrev MT :MakeTable
" linediff
cabbrev LD :Linediff
" vim-react-snippets
let g:UltiSnipsExpandTrigger="<C-e>"
" QuickRun
nnoremap \r :QuickRun<CR>
vnoremap \r :QuickRun<CR>

function! s:on_lsp_buffer_enabled() abort
				setlocal omnifunc=lsp"complete
				setlocal signcolumn=yes
				nmap <buffer> gd <plug>(lsp-definition)
				nmap <buffer> gc <plug>(lsp-document-diagnostics)
				nmap <buffer> gC <plug>(lsp-document-format)
				nmap <buffer> <f2> <plug>(lsp-rename)
				inoremap <expr> <cr> pumvisible() ? "\<c-y>\<cr>" : "\<cr>"
endfunction

augroup vimrc-highlight
  autocmd!
  autocmd Syntax Ruby if 10000 < line('$') | syntax sync minlines=100 | endif
augroup END

augroup lsp_install
				au!
				autocmd User lsp_buffer_enabled call s:on_lsp_buffer_enabled()
augroup END
command! LspDebug let lsp_log_verbose=1 | let lsp_log_file = expand('~/lsp.log')

let g:lsp_diagnostics_enabled = 1
" let g:lsp_diagnostics_enabled = 0
let g:lsp_signs_enabled = 1         " enable signs
let g:lsp_diagnostics_echo_cursor = 1 " enable echo under cursor when in normal mode
let g:asyncomplete_auto_popup = 0
let g:asyncomplete_auto_completeopt = 0
let g:asyncomplete_popup_delay = 200
let g:lsp_text_edit_enabled = 0

"" function
function! RTrim()
				let s:tmppos = getpos(".")
				if &filetype != "markdown"
								%s/\v\s+$//e
				endif
				call setpos(".", s:tmppos)
endfunction
if &filetype != "markdown"
				autocmd BufWritePre * :call RTrim()
endif

function! ZenkakuSpace()
				highlight ZenkakuSpace cterm=reverse ctermfg=DarkGray gui=reverse guifg=DarkGray
endfunction

if has('syntax')
				augroup ZenkakuSpace
								autocmd!
								autocmd ColorScheme       * call ZenkakuSpace()
								autocmd VimEnter,WinEnter * match ZenkakuSpace /　/
				augroup END
				call ZenkakuSpace()
endif
