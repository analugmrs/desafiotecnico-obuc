var table = document.getElementById("locaisDeTrabalho");
var isOnEdit = false;
var index;
var line;
var lineCounter = 0;
var isContent = false;
varreSessionStorage();
var arrLocaisTrabalho;

function localTrabalho(predio, local){
    var lines = table.rows.length;
    line = table.insertRow(lines);

    var botoes = '<button type="button" class="btn-item" onclick="escolheLinhaEditar(this)">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">'
                + '<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z">'
                + '</path></svg></button>'
                + '<button type="button" class="btn-item" onclick="deletaLocal()">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">'
                + '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>'
                + '</svg></button>';

    var colPredio = line.insertCell(0);
    var colLocal = line.insertCell(1);
    var colBtn = line.insertCell(2);

    console.log("lines: " + lines);
    console.log("line: " + line);
    console.log("colLocal: " + colLocal);

    colPredio.innerHTML = predio;
    colLocal.innerHTML = local;
    colBtn.innerHTML = botoes;

    preencheArrLocaisTrabalho()
}

function escolheLinhaEditar(x)
{
    if (isOnEdit == true)
    {
        alert("Termine de editar o campo primeiro!");
    } else 
    {
        atualizaIndex(x);
        var a = index;
    
        console.log(a);
        table.rows[a].cells[0].innerHTML = '<select class="input" name="predio" id="predio2">'
        table.rows[a].cells[1].innerHTML = '<input type="text" class="input" id="inputLocal" name="local"/>'
        table.rows[a].cells[2].innerHTML = '<button type="button" class="btn-item" onclick="salvaLocal()">'
        + '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">'
        + '<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>'
        + '</path></svg></button>'
        + '<button type="button" class="btn-item" onclick="limpaLocal(predio.value, local.value)">'
        + '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">'
        + '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'
        + '</svg></button>';

        selectPredioEditar()
    }
    isOnEdit = true;
}

function salvaLocal()
{
    predio = document.getElementById("predio2").value;
    local = document.getElementById("inputLocal").value;

    table.rows[index].cells[0].innerHTML = predio;
    table.rows[index].cells[1].innerHTML = local;
    table.rows[index].cells[2].innerHTML = '<button type="button" class="btn-item" onclick="escolheLinhaEditar(this)">'
    + '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">'
    + '<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z">'
    + '</path></svg></button>'
    + '<button type="button" class="btn-item" onclick="deletaLocal()">'
    + '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">'
    + '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>'
    + '</svg></button>';

    isOnEdit = false;
}

function deletaLocal()
{
    table.deleteRow(index);
}

function limpaLocal(predio, local)
{
    isOnEdit = false;
        table.rows[index].cells[0].innerHTML = predio
        table.rows[index].cells[1].innerHTML = local
        table.rows[index].cells[2].innerHTML = '<button type="button" class="btn-item" onclick="escolheLinhaEditar(this)">'
        + '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">'
        + '<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z">'
        + '</path></svg></button>'
        + '<button type="button" class="btn-item" onclick="deletaLocal()">'
        + '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">'
        + '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>'
        + '</svg></button>';
}

function atualizaIndex(x)
{
    index = x.parentElement.parentElement.rowIndex;
}

function salvarPredio(){
    var addContent = true;
    var i = lineCounter;
    var predio = document.getElementById('predio');
    var item = document.createElement('option');
    if (predio.options[predio.selectedIndex].text == 'Add predio'){
        item.text = prompt('Nome do prédio: ')
        console.log(item.text);
        predio.add(item, predio.options);
        predio.selectedIndex = 0;
        while(addContent){
            lineCounter += 1;
            sessionStorage.setItem('predio' + i.toString(), item.text);
            addContent = false;
        }
    }
}

function varreSessionStorage()
{
    var isContent = true;
    var i = 0;
    var j = 0;
    var predio = document.getElementById('predio');
    while(isContent)
    {
        var textoItem = sessionStorage.getItem('predio' + i.toString());

        if(textoItem == null)
        {
            isContent = false;
        } 
        else
        {
            var item = document.createElement('option');
            item.text = textoItem;
            predio.add(item, predio.options);
            lineCounter += 1;
            j++;
        }
        i++;
    }
}

function preencheArrLocaisTrabalho()
{
    arrLocaisTrabalho = new Array();

    for(var i =  0; i < lineCounter; i++)
    {
        var predio = sessionStorage.getItem('predio' + i.toString());
        arrLocaisTrabalho[i] = predio;
    }

    console.log(arrLocaisTrabalho);
}

function selectPredioEditar()
{
    var predio = document.getElementById('predio2');
    arrLocaisTrabalho.forEach(element => {
        var item = document.createElement('option');
        item.text = element;
        predio.add(item, predio.options);
    });
}
