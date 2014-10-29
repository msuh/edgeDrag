window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d');
    var buttonPressed = null, pressPos = [null,null], buttonDrag = null, emptyPressed = false,
        switchOn = false;
    //initial draw 
    drawAll(context, canvas.width, canvas.height);
    addAllButtons();
    function mouseDrag(event) {
        if(switchOn){
            buttonDragFn(event);
        }else{
            linkDrag(event);
        }
    }

    //event listener for when switch for manipulating links
    function linkDrag(event){
        if (buttonPressed) { //dragging link
            drawAll(context, canvas.width, canvas.height);
            //draw the line currently being dragged
            drawLine(context, pressPos[0],pressPos[1], event.clientX, event.clientY);
            return;
        }
        if(buttonDrag){ //dragging button
            changeButtonPos(buttonDrag, event.clientX, event.clienty);
            drawAll(context, canvas.width, canvas.height);
            return;
        }
        if(emptyPressed){//draggin over canvas
            drawAll(context, canvas.width, canvas.height);
            drawDotLine(context, pressPos[0],pressPos[1], event.clientX, event.clientY);
        }
    }
    //event listener for when switch for manipulating buttons 
    function buttonDragFn(event){
        if (buttonPressed){
            changeButtonPos(buttonPressed, event.clientX, event.clientY);
            reDrawButton(buttonPressed, event.clientX, event.clientY);
            drawAll(context,canvas.width,canvas.height);
        }
    }

    function mouseDown(event) {
        singleClick(event);    
    }

    function singleClick(event){
        var id = checkButton(event.clientX, event.clientY);
        if( id !== undefined){
            pressPos = getButtonPoint(id);
            buttonPressed = id;
        }else{ //pressed empty space
            emptyPressed = true;
            pressPos = [event.clientX, event.clientY];
        }
    }


    function mouseUp(event) {
        if(switchOn){
            mouseUpButton(event);
        }else{
            mouseUpLink(event);
        }
    }

    function mouseUpLink(event){
        var id = checkButton(event.clientX, event.clientY);
        if( id !== undefined && id !== buttonPressed && checkRepeatLink(id, buttonPressed)){ //line drops on a button other than itself
            var l = new programmingLinks();
            if(programmingLinksArray.length <1){
                l.id = 1;
            }else{
                l.id = programmingLinksArray[programmingLinksArray.length-1].id + 1; //next id number
            }
            l.locationInA = buttonPressed;
            l.locationInB = id;
            if(l.locationInA == null){
                console.log("Not adding link because locationInA is Null ----------");
                console.log(l);
                console.log("buttonPressed:",buttonPressed);
            }
            if(l.locationInA !== null){
                addLink(l);
                drawAll(context, canvas.width, canvas.height);    
            }
            
        }else if( buttonPressed == null && emptyPressed){
            var del = [];
            for(var i = 0; i<programmingLinksArray.length;i++) {
                var l = programmingLinksArray[i],
                    b1 = findButton(l.locationInA),
                    b2 = findButton(l.locationInB);
                // console.log("l,b1,b2:",l,b1,b2, del);
                if(checkLineCross(b1.position.position2dX, b1.position.position2dY, b2.position.position2dX, b2.position.position2dY, 
                        pressPos[0], pressPos[1], event.clientX, event.clientY, canvas.width, canvas.height)){
                    del.push(l.id); //add the deletion link to deletion list (to manage index problem)
                }
            }
            for(i in del){
                delLink(del[i]);
                drawAll(context,canvas.width,canvas.height);
            }

        }
        drawAll(context,canvas.width,canvas.height);
        buttonPressed = null;
        pressPos = [null, null];
        buttonDrag = null;
        emptyPressed = false;
    }

    function mouseUpButton(event){
        if(buttonPressed){
            changeButtonPos(buttonPressed, event.clientX, event.clientY);
            reDrawButton(buttonPressed, event.clientX, event.clientY);
            drawAll(context,canvas.width,canvas.height);
        }

        buttonPressed = null;
        pressPos = [null, null];
        buttonDrag = null;
        emptyPressed = false;

    }
    function dblclick(event){
        console.log("into double click");
        var id = checkButton(event.clientX, event.clientY);
        if(id !== undefined){
            buttonDrag = id;
        }
    }

    function switchButton(){
        console.log("into switch Button");
        var b = document.getElementById('button_doubleClick');
        if(switchOn){
            b.setAttribute("value","Controlling Link");
            switchOn = false;
        }else{
            b.setAttribute("value","Controlling Button");
            switchOn = true;
        }
    }

    function buttondrag3(event){
        console.log("draggin button");
        singleClick(event);
    }

    function test(event){
        console.log("test click");
    }
    function attachEventListener(lst){
        for(var i=0; i<lst.length ; i++){
            lst.item(i).ondrop = mouseUpButton;
            lst[i].ondrop = mouseUpButton;
            lst[i].onmouseup = mouseUpButton;
        }
    }


/////////////////////////////////////////////////////////////
//////////////////////  main functions  /////////////////////
/////////////////////////////////////////////////////////////

document.addEventListener("mousemove", mouseDrag, true);
document.addEventListener("mousedown", mouseDown, true);
document.addEventListener("mouseup", mouseUp, true);
document.getElementById('button_doubleClick').addEventListener("click", switchButton);
attachEventListener(document.getElementsByClassName('iframe'));
attachEventListener(document.getElementsByTagName('img'));
console.log(document.getElementsByClassName('iframe'));

}