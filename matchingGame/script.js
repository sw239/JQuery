
var imagesArray = new Array();
var responsearr = new Array();
imagesArray.push("../images/icons8-butterfly-filled-100.png");
imagesArray.push("../images/icons8-chicken-filled-100.png");
imagesArray.push("../images/icons8-crab-filled-100.png");
imagesArray.push("../images/icons8-dog-filled-100.png");
imagesArray.push("../images/icons8-dolphin-filled-100.png");
imagesArray.push("../images/icons8-dove-filled-100.png");
imagesArray.push("../images/icons8-elephant-filled-100.png");
imagesArray.push("../images/icons8-horse-filled-100.png");

imagesArray.push("../images/icons8-butterfly-filled-100.png");
imagesArray.push("../images/icons8-chicken-filled-100.png");
imagesArray.push("../images/icons8-crab-filled-100.png");
imagesArray.push("../images/icons8-dog-filled-100.png");
imagesArray.push("../images/icons8-dolphin-filled-100.png");
imagesArray.push("../images/icons8-dove-filled-100.png");
imagesArray.push("../images/icons8-elephant-filled-100.png");
imagesArray.push("../images/icons8-horse-filled-100.png");

var startGameCounter = 0;
var clickCounter = 0;
var imageCounter = 0;
var imageOpened = "";
var currentOpened = "";

var imageId1 = "";
var imageId2 = "";

function createTable()
{
var table = document.createElement("table");
table.setAttribute("id","table1");
var tbdy = document.createElement("tbody");
var game = document.getElementById('matchingGame');
var counter = 0;

for (var i=0; i<4; i++){
    var tr = document.createElement('tr');
    for(var j=0; j<4; j++){
        var td = document.createElement('td');
        var image = new Image();
        image.id = counter;
        image.className = "hidden";

        image.src = "/hw/images/"+responsearr[counter];
        image.addEventListener("click",displayImage);
        counter ++;
        td.appendChild(image);
        tr.append(td);
    }
    tbdy.appendChild(tr);
}
table.appendChild(tbdy);
game.appendChild(table);

}

var displayImage = function(){
    if(clickCounter == 0){
        $(this).removeClass("hidden").addClass("show");
        imageOpened = $(this).attr("src");
        imageId1 = $(this).attr("id");
        imageCounter ++;
        console.log("clickCounter is bigger than 3");
    }

    if(clickCounter == 1){
        $(this).removeClass("hidden").addClass("show");
        currentOpened = $(this).attr("src");
        imageId2 = $(this).attr("id");
        if(imageId2 == imageId1){
            return;
        }
        imageCounter ++;
    }

    clickCounter ++;
    
    if (imageCounter == 2){
        var button = document.getElementsByTagName('button')[1];
        button.addEventListener("click",buttonFunction);
        console.log("clickCounter is bigger than 3");
        
    }
}

var buttonFunction = function(){
    if(imageOpened != currentOpened){
        $("#" + imageId1).removeClass("show").addClass("hidden");
        $("#" + imageId2).removeClass("show").addClass("hidden");
        console.log("continue button working");

    }

    if(imageOpened == currentOpened){
        $("#" + imageId1).parent().css("background","white");
        $("#" + imageId2).parent().css("background","white");

        $("#" + imageId1).remove();
        $("#" + imageId2).remove();
        

    }
    clear();
}

function clear(){
    imageCounter = 0;
    clickCounter = 0;
    imageOpened = "";
    currentOpened = "";
    imageId1 = "";
    imageId2 = "";
    var button = document.getElementsByTagName('button')[1];
    button.removeEventListener("click",buttonFunction);
}


//$('body').on('click','img',function(){
    //console.log("sky1");
//})

// Using Fisher-Yates (aka Knuth) Shuffle from https://github.com/Daplie/knuth-shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


function startGame(){
        clear();
        var game = document.getElementById('matchingGame');
        game.innerHTML = "";
        
        var url = "http://localhost:8080/hw/hworld?numImages=8";
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
    if (this.status == 200) {
        // loading succeeded
        //alert(this.responseText);
        var imgarr = this.responseText.split("png");
        
        for (i = 0; i < 8; i++) {
            responsearr.push(imgarr[i]+"png");
            responsearr.push(imgarr[i]+"png");
        }
        for (i = 0; i < responsearr.length; i++) {
            console.log(responsearr[i]);
        }
        shuffle(responsearr);
        createTable(); 
    } else {
        console.error("error fetching " + url);
        console.error("status code: " + this.status + " " + this.statusText);
    }
});
xhr.open("GET", url);
xhr.send();

        
}
  
  
