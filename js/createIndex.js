
function addLink(...args){
    var nodeLink = document.createElement('a');
    nodeLink.href = '#' + args[1].trim();
    nodeLink.textContent = args[1].trim();
    args[0].appendChild(nodeLink)
    return args[0];
}

function createSection(){
    /* Se podria usar el querySelector que te devuelve el primero ya que por sentido solo DEBERIA haber UNO */
    var contentTitle = arguments[0].getElementsByClassName('content-title')[0].textContent;
    var nodeContentTitle = document.createElement('li');
    nodeContentTitle = addLink(nodeContentTitle, contentTitle);
    var nodesContentSubTitle = arguments[0].getElementsByClassName('content-subtitle');
    var nodeOrderedList = document.createElement('ol');
    for (const iterator of nodesContentSubTitle) {
        var listItem = document.createElement('li');
        listItem = addLink(listItem, iterator.textContent);
        nodeOrderedList.appendChild(listItem);
    }
    return [nodeContentTitle, nodeOrderedList];
}

function createIndex(contentItem, index){
    var nodeIndex = document.createElement('ol');
    for (const item of contentItem) {
        createSection(item).forEach( bundle => {
            nodeIndex.appendChild(bundle);
        });
    }
    index.appendChild(nodeIndex);
}

function addID(nodesContentItem){
    for (const item of nodesContentItem) {
        var nodesContentTitle = item.getElementsByClassName('content-title');
        Array.from(nodesContentTitle).forEach(title =>{
            title.id = title.textContent.trim();
        });

        var nodesContentSubTitle = item.getElementsByClassName('content-subtitle');
        Array.from(nodesContentSubTitle).forEach(subTitle =>{
            subTitle.id = subTitle.textContent.trim();
        });
    }
    /* No se puede getElements de una HTMLCollection tiene que ser de un solo elemento*/;
    /* ILEGAL => var nodeSubTitle = nodesContentItem.getElementsByClassName('content-subtitle');*/
}

function defer(){
    if(document.readyState == 'complete'){
        /* Los trigers tienen que estar cargados */
        var nodesContentItem = document.getElementsByClassName('content-item');
        var index = document.getElementById('index');
        createIndex(nodesContentItem, index);

        addID(nodesContentItem);
    }
}

document.addEventListener('readystatechange',defer);