window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d');
    var buttonPressed = null, pressPos = [null,null], buttonDrag = null, emptyPressed = false;
    //initial draw 
    drawAll(context, canvas.width, canvas.height);

    function mouseDrag(event) {
        if (buttonPressed) { //dragging link
            drawAll(context, canvas.width, canvas.height);
            //draw the line currently being dragged
            drawLine(context, pressPos[0],pressPos[1], event.clientX, event.clientY);
            return;
        }
        if(buttonDrag){ //dragging button
            changeButtonPos(buttonDrag, event.clientX, event.clientX);
            drawAll(context, canvas.width, canvas.height);
            return;
        }
        if(emptyPressed){//draggin over canvas
            var del = [];
            for(var i = 0; i<programmingLinksArray.length;i++) {
                var l = programmingLinksArray[i],
                    b1 = findButton(l.idLinkSideA),
                    b2 = findButton(l.idLinkSideB);
                // console.log(b1.position.position2dX, b1.position.position2dY, b2.position.position2dX, b2.position.position2dY, 
                        // pressPos[0], pressPos[1], event.clientX, event.clientX);
                // if(checkLineCross(b1.position.position2dX, b1.position.position2dY, b2.position.position2dX, b2.position.position2dY, 
                //         pressPos[0], pressPos[1], event.clientX, event.clientX, canvas.width, canvas.height)){
                //     del.push(l.id); //add the deletion link to deletion list (to manage index problem)
                // }
                // console.log("l,b1,b2:",l,b1,b2);
                if(checkPointinLine(b1.position.position2dX, b1.position.position2dY, b2.position.position2dX, b2.position.position2dY, event.clientX, event.clientY, canvas.height)){
                    del.push(l.id);
                }
            }
            for(i in del){
                delLink(del[i]);
                drawAll(context,canvas.width,canvas.height);
            }
        }

    }

    function mouseDown(event) {
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
        var id = checkButton(event.clientX, event.clientY);
        if( id !== undefined && id !== buttonPressed && checkRepeatLink(id, buttonPressed)){ //line drops on a button other than itself
            var l = new programmingLinks();
            if(programmingLinksArray.length <1){
                l.id = 1;
            }else{
                l.id = programmingLinksArray[programmingLinksArray.length-1].id + 1; //next id number
            }
            l.idLinkSideA = buttonPressed;
            l.idLinkSideB = id;
            addLink(l);
            drawAll(context, canvas.width, canvas.height);
        }else{
            drawAll(context, canvas.width, canvas.height);
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


    document.addEventListener("mousemove", mouseDrag, true);
    document.addEventListener("mousedown", mouseDown, true);
    document.addEventListener("mouseup", mouseUp, true);
    // document.addEventListener("dblclick", dblclick, true);
}