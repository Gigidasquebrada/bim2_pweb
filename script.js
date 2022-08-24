let posicaoColuna = document.querySelector('#coluna1');  //posição da coluna que será criada

let inputNovaColuna = document.getElementById("inputNovaColuna");  //nome da nova lista
let btnNovaColuna = document.querySelector('#btnNovaColuna');  //botão de adicionar nova lista

const qtdIdsDisponiveis = Number.MAX_VALUE;

var moverTarefa = 0;
var btnMoverId = 0;

window.onload = function () {  
  inputNovaColuna.focus();
}

function foco(){
  inputNovaColuna.focus();
}

btnNovaColuna.addEventListener('click', (e) => {
  if(inputNovaColuna.value != ""){
    executarAddColuna();
  }else{
    window.alert("Dê um noma à coluna.");
  }
  inputNovaColuna.focus();
});

inputNovaColuna.addEventListener('keypress', (e) => {
  if(e.keyCode == 13) {
    if(inputNovaColuna.value != ""){
      executarAddColuna();
    }else{
      window.alert("Dê um noma à coluna.");
  }
    inputNovaColuna.focus();
  }
});


function executarAddTarefa(input_tar, input_desc, idColuna){
  let tarefa = {
    nome: input_tar.value,
    desc: input_desc.value,
    id: gerarIdV2(),
  }
    addTarefa(input_tar, input_desc, idColuna, tarefa);
  }

function executarAddColuna(){
  let coluna = {
        nome: inputNovaColuna.value,
        id: gerarIdV2(),
  }
  adicionarColuna(coluna);
}

function executarExcl(idTarefa){
  let b = document.getElementById('' + idTarefa + '');
  let parent = (b.parentNode).id;
  let a = document.getElementById('' + parent + '');
  a.removeChild(b);
}

function executarConc(btnConc, idTarefa){
  if(btnConc.classList == 'btnDo'){  
  btnConc.classList.add('btnAcaoConc');
  let b = document.getElementById('' + idTarefa + '');
  b.classList.add('lii');
  }else{
  btnConc.classList.remove('btnAcaoConc');
  let b = document.getElementById('' + idTarefa + '');
  b.classList.remove('lii');
  }
}

function guardarId_tarefa(btnMover, idTarefa){
  if(moverTarefa == 0){
    btnMoverId = btnMover.id;
    btnMover.innerHTML = '<i class="fa fa-hand-rock-o" aria-hidden="true"></i>';
    btnMover.classList.remove('btnAcaoNaoMover');
    btnMover.classList.add('btnAcaoPegar');
    moverTarefa = idTarefa;
  }else if(moverTarefa  == idTarefa){
    btnMover.innerHTML = '<i class="fa fa-hand-paper-o" aria-hidden="true"></i>';
    btnMover.classList.add('btnAcaoNaoMover');
    btnMover.classList.remove('btnAcaoPegar');
    moverTarefa = 0;
  }
}

function executarMover(idColuna){
  if(moverTarefa != 0){
    let a = document.getElementById('' + moverTarefa + '');
    let b = document.getElementById('' + idColuna + '');
    
    b.appendChild(a);
    moverTarefa = 0;

    let x = document.getElementById('' + btnMoverId + '');
    x.innerHTML = '<i class="fa fa-hand-paper-o" aria-hidden="true"></i>';
    x.classList.add('btnAcaoNaoMover');
    x.classList.remove('btnAcaoPegar');
    x = 0;
  }
  
}

function executarExcluir_coluna(idColuna){
  let a = document.getElementById('' + idColuna + '');
  posicaoColuna.removeChild(a);
}

function gerarId() {
    return Math.floor(Math.random() * qtdIdsDisponiveis);
}

function gerarIdV2() {
    return gerarIdUnico();
}

function gerarIdUnico() {

    let itensDaLista = document.querySelector('#listaTarefas').children;
    let idsGerados = [];

    for(let i=0;i<itensDaLista.length;i++) {
        idsGerados.push(itensDaLista[i].id);
    }

    let contadorIds = 0;
    let id = gerarId();

    while(contadorIds <= qtdIdsDisponiveis && 
        idsGerados.indexOf(id.toString()) > -1) {
            id = gerarId();
            contadorIds++;

            if(contadorIds >= qtdIdsDisponiveis) {
                alert("Oops, ficamos sem IDS :/");
                throw new Error("Acabaram os IDs :/");
            }
        }

    return id;
}

function addTarefa(input_tar, input_desc, idColuna, tarefa) {
    let a = document.getElementById('' + idColuna + '');
    let li = createLI(idColuna, tarefa);
    a.appendChild(li);  
    input_tar.value = '';
    input_desc.value = '';
}

function adicionarColuna(coluna){
  let div = criarLista(coluna);
  posicaoColuna.appendChild(div);
  inputNovaColuna.value = '';
}



function createLI(idColuna, tarefa) { // Criando tarefa

    let li = document.createElement('li');
    li.id = tarefa.id;
    li.setAttribute("draggable", true);
    li.setAttribute("ondragstart", "onDragStart(event)");

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let p = document.createElement('p');
    p.classList.add('textoTarefa2');
    p.innerHTML = tarefa.desc;

    let div  = document.createElement('div');

    let btnExcl = document.createElement('button');
    btnExcl.classList.add('btnDo');
    btnExcl.innerHTML = '<i class="fa fa-window-close-o"></i>';
    btnExcl.addEventListener('click', (e) => {
      if (window.confirm("Deseja realmente apagar essa tarefa? A operação não poderá ser desfeita.") == true) {
        executarExcl(tarefa.id);
    }
      foco();
});
    
    let btnMover = document.createElement('button');  //BOTÃO MOVER TAREFA
    btnMover.classList.add('btnAcaoMover');  
    btnMover.classList.add('btnAcaoNaoMover');
    btnMover.innerHTML = '<i class="fa fa-hand-paper-o" aria-hidden="true"></i>';
    let btnId = gerarIdV2();
    btnMover.id = btnId;
    btnMover.addEventListener('click', (e) => {
      guardarId_tarefa(btnMover, tarefa.id);
});

    let btnConc = document.createElement('button');  //BOTÃO MARCAR COMO CONCLUÍDO
    btnConc.classList.add('btnDo');
    btnConc.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
    btnConc.addEventListener('click', (e) => {
  executarConc(btnConc, tarefa.id);
});

    div.appendChild(btnExcl);
    div.appendChild(btnMover);
    div.appendChild(btnConc);

    li.appendChild(span);
    li.appendChild(p);
    li.appendChild(div);

    li.classList.add('li');

    return li;
}

function criarLista(coluna){

  let div = document.createElement('div');
  div.id = coluna.id;
  
  div.setAttribute ("ondragover" ,"onDragOver(event)");
  div.setAttribute ("ondrop", "onDrop(event)");

  let h2 = document.createElement('h2');  // H2/TÍTULO
  h2.innerHTML = coluna.nome;

  let input_tar = document.createElement('input');    // INPUT NOME DA TAREFA
  input_tar.classList.add('inputAdd');
  input_tar.setAttribute("type", "text");
  input_tar.setAttribute("placeholder", "Adicionar Tarefa...");
  input_tar.innerHTML = "";

  input_tar.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
      input_desc.focus();
    }
});


  let input_desc = document.createElement('input');  // INPUT DESCRIÇÃO
  input_desc.classList.add('inputAdd2');  
  input_desc.setAttribute("type", "text");
  input_desc.setAttribute("placeholder", "Descrição da Tarefa...");
  input_desc.innerHTML = "";

  let btnAdd_tar = document.createElement('button');  //BOTÃO ADICIONAR NOVA TAREFA
  btnAdd_tar.classList.add('buttonAdd');
  btnAdd_tar.innerHTML = '<i class="fa fa-plus"></i>';
  btnAdd_tar.addEventListener('click', (e) => {
    if(input_tar.value != ""){
      executarAddTarefa(input_tar, input_desc, coluna.id);
    }else{
      window.alert("Nomeie a tarefa.");
  }
    input_tar.focus();
});

  input_desc.addEventListener('keypress', (e) => {
  if(e.keyCode == 13) {
    if(input_tar.value != ""){
      executarAddTarefa(input_tar, input_desc, coluna.id);
    }else{
      window.alert("tarefa.");
  }
    input_tar.focus();
  }
});

  let btnRcb_tar = document.createElement('button');  //BOTÃO RECEBER TAREFA
  btnRcb_tar.classList.add('buttonAdd');
  btnRcb_tar.innerHTML = '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
  btnRcb_tar.addEventListener('click', (e) => {
  executarMover(coluna.id);
});

  

  let btnExcl_col = document.createElement('button');  //BOTÃO EXCLUIR COLUNA
  btnExcl_col.classList.add('buttonAdd');
  btnExcl_col.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  btnExcl_col.addEventListener('click', (e) => {
    if (window.confirm("Deseja realmente apagar essa coluna? A operação não será desfeita.") == true) {
      executarExcluir_coluna(coluna.id);
    }
    inputNovaColuna.focus();
});

  div.appendChild(h2);
  div.appendChild(input_tar);
  div.appendChild(input_desc);
  div.appendChild(btnAdd_tar);
  div.appendChild(btnRcb_tar);
  div.appendChild(btnExcl_col);

  
  div.classList.add('coluna');

  return div;
}
function onDrop(event) { // Mover tarefas entre colunas
  const id = event
    .dataTransfer
    .getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
    event
    .dataTransfer
    .clearData();
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);

  event
    .currentTarget
    .style
    .backgroundColor = 'white';
}









