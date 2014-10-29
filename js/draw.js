//////////////// things to take care of.. ///////////////////
/*
1. (no overlap) Handling button overlap. are buttons allowed to be overlapped? I assume not
2. [Solved]  Handle deletion. When button pressed is swiped across a link 
3. Double click to move around the button -- the mousedown gets registered before
	the double click event is recognized.. how to solve this
4. When a node become invisible (objectVisibility : false), then make an elastic
    animation to go vertically up the screen from where the node is.. And the
    link stays vertically up regardless of how the node is moved around
5. Double click --> make a toggle button to switch between link drag and button drag
6. [Solved] make the nodes an iframe object


*/
///////////////// constants and variables //////////////////

programmingLinksArray = [];
programmingButtonArray = [];
const buttonRad = 15; //in pixels
const marg = 25;
const marg2 = 2;
const buttonWidth = 47;

/////////////////////////////////////////////////////////////
///////// initializing with random button and links /////////

var pos = [[200, 200], [400, 200], [300, 350], [400, 400], [500, 260]];
for(var i=0; i < pos.length; i++){
	var a = new programmingButton();
	a.id = i+1;
	a.position.position2dX = pos[i][0];
	a.position.position2dY = pos[i][1];
	a.position.positionZfor2dScale = 1;
	a.position.objectVisibility = true;
	programmingButtonArray.push(a);
}
var a = new programmingLinks();
a.id = 1; a.locationInA = 1; a.locationInB = 3;
programmingLinksArray.push(a);


//////////////////////////////////////////////////////////////
/////////////////// helper functions /////////////////////////

// constructors for the links.
function programmingButton() {
	this.id = '';
	this.position = {
        position2dX:0,
        position2dY:0,
        positionZfor2dScale:0,
        objectVisibility: true
	}
}
// constructors for the links.
function programmingButton2() {
    this.id = '';
    this.name = '';
    this.value = null;
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
    this.scale = 0;
    this.plugin = "default";
    this.pluginParameter = null;
    this.objectVisibility = true;
    // this.position = {
    //     position2dX:0,
    //     position2dY:0,
    //     positionZfor2dScale:0,
    //     objectVisibility: true
    // }
}
function programmingLinks() {
	this.id = '';
    this.ObjectA = '';
    this.locationInA = '';
    this.ObjectB = '';
    this.locationInB = '';
}

function addLink(l){
    if(l.locationInA == null){
        console.log("LINK SIDE A IS NULL ---------- NOT ADDING",l);
        return;
    }
	programmingLinksArray.push(l);
}

function addButton(b){
	programmingButtonArray.push(b);
}
function delLink(id){
    for(var j = 0; j<programmingLinksArray.length;j++) {
        if(programmingLinksArray[j].id == id){
            programmingLinksArray.splice(j, 1);
            return;
        }
    }
}
function findButton(id){
    for(var i=0; i<programmingButtonArray.length; i++){
        var b = programmingButtonArray[i];
        if(b.id == id){
            return b;
        }
    }
}
/////////////////////////////////////////////////////////////////

//function that modifies the x,y position of the button given the id
function changeButtonPos(id, x, y){
	for(var i=0; i<programmingButtonArray.length; i++){
		var b = programmingButtonArray[i];
		if(b.id == id){
			b.position.position2dX = x;
			b.position.position2dY = y;
			return;
		}
	}
}
//calculates whether a point lies inside a circle with given x,y values
function isInsideCircle(x,y, cx, cy){
	return (Math.pow((x-cx), 2) + Math.pow((y-cy), 2) < Math.pow(buttonRad,2));
}
//check whether the given x,y falls inside any circles
//return circle's id if it does, or undefined if not
function checkButton(x, y){
	for(var i=0; i<programmingButtonArray.length; i++){
		var b = programmingButtonArray[i], pos = b.position;
		if(b.objectVisibility){ //skip if visibility is false
			continue;
		}
		if(isInsideCircle(x,y, pos.position2dX, pos.position2dY)){
			return b.id; //return button's id if x,y inside circle
		}
	}
	return undefined;
}

//we do not want any undirected link or a repeated link. 
//return true if no repeat of id1 and id2 in the links. False if repeat exists
function checkRepeatLink(id1,id2){
	for(var i = 0; i<programmingLinksArray.length;i++) {
		var l = programmingLinksArray[i];
		if(l.locationInA == id1 && l.locationInB == id2){
			return false;
		}
		if(l.locationInA == id2 && l.locationInB == id1){
			return false;
		}
	}
	return true;
}
//function for drawing all the elements in the programmingLinkArray and programmingButtonArray
function drawAll(context, w, h){
	context.clearRect(0, 0, w, h);

    for(var i = 0; i<programmingLinksArray.length;i++) {
    	var l = programmingLinksArray[i];
    	var posA = getButtonPoint(l.locationInA),
    		posB = getButtonPoint(l.locationInB);
        if(posA === undefined || posB === undefined){ 
        	continue; //should not be undefined
        }
        drawLine(context, posA[0], posA[1], posB[0], posB[1]);
    }
    // for(var i = 0; i<programmingButtonArray.length;i++) {
    // 	var b = programmingButtonArray[i];
    // 	// drawButton(context, b.position.position2dX, b.position.position2dY);
    //     drawButton2(context, b.id, b.position.position2dX, b.position.position2dY);
    // }
}

//function for adding all the buttons
function addAllButtons(){
    // clearHTML();
    for(var i = 0; i<programmingButtonArray.length;i++) {
        var b = programmingButtonArray[i];
        // drawButton(context, b.position.position2dX, b.position.position2dY);
        drawButton2(b.id, b.position.position2dX, b.position.position2dY);
    }
}


//draws the button with given context of canvas and center x,y positions
function drawButton(context, x, y){
	context.beginPath();
	context.arc(x, y, buttonRad, 0, 2 * Math.PI);
	context.fillStyle = '#73BEC0';
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = '#D5D8CA';
	context.stroke();
}

//makes an iframe for each button
function drawButton2(id, x, y){
    // var iframe = '<iframe src="iframe.html" left="'+x+'" top="'+y+'" width="0" height="0" id="'+id+'" frameborder="0" onLoad="autoResize("'+id+'");"></iframe>';
    //creating iframe object
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src","iframe.html");
    iframe.setAttribute("id",id);
    iframe.setAttribute("class","iframe");
    iframe.setAttribute("width",buttonWidth);
    iframe.setAttribute("height",buttonWidth);
    iframe.setAttribute("draggable",true);
    iframe.style.left = x-buttonWidth/2+'px';
    iframe.style.top = y-buttonWidth/2+'px';
    // iframe.setAttribute("onLoad", autoResize(id));

    document.getElementById("nodes").appendChild(iframe);
}

function reDrawButton(id, x, y){
    var iframe = document.getElementById(id);
    iframe.style.left = x-buttonWidth/2+'px';
    iframe.style.top = y-buttonWidth/2+'px';
}

function clearHTML(){
    document.getElementById("nodes").innerHTML = '';
}
//function to resize the iframe
function autoResize(id){
    var f = function(){
        var newheight;
        var newwidth;

        if(document.getElementById){
            newheight=document.getElementById(id).contentWindow.document.body.scrollHeight;
            newwidth=document.getElementById(id).contentWindow.document.body.scrollWidth;
        }
        newheight = '15', newwidth = '15';
        document.getElementById(id).height=(newheight);//+"px";
        document.getElementById(id).width=(newwidth);//+"px";
    }
    return f;
    
}


//given a Button id, retrieve the center [x,y] coordinates of the button
function getButtonPoint(id){
	for(var i=0; i < programmingButtonArray.length; i++){
		var b = programmingButtonArray[i];
		if(b.id == id){
			return [b.position.position2dX, b.position.position2dY];
		}
	}

	return undefined; //should not reach here given the right id value
}
//function for drawing the line given the start and end points
function drawLine(context, x1, y1, x2, y2) {
    this.startPoint = [x1, y1];
    this.endPoint = [x2, y2];
    this.startWeight = 1;
    this.endWeight = 1;

        // calculating all needed values for drawing the line
        var pointweight2 = (this.startWeight * 3 / 4) + (this.endWeight / 4);
        var pointweight3 = (this.startWeight * 2 / 4) + (this.endWeight * 2 / 4);
        var pointweight4 = (this.startWeight / 4) + (this.endWeight * 3 / 4);

        var normAlizer = 10; // find a formula for better representation
        var vector = vD(this.endPoint, this.startPoint);
        var vectorLength = Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1]));
        var vectorNorm = [vector[0] / vectorLength, vector[1] / vectorLength];

        var arrowVector = vM(vectorNorm, 20);
        var usedVector = vM(vectorNorm, -18);
        var arrowVectorN = vM(vR(arrowVector, -90), 34 / 80);
        var arrowVectorP = vM(vR(arrowVector, 90), 34 / 80);
        var endBall = vA(this.startPoint, vector);
        var end = vA(vA(this.startPoint, vector), vM(vectorNorm, normAlizer));
        var end_ = vA(vA(this.startPoint, vector), vM(vectorNorm, normAlizer - 10));
        var end4 = vA(vA(this.startPoint, vM(vector, (1 / 4))), vM(vectorNorm, normAlizer));
        var end3 = vA(vA(this.startPoint, vM(vector, (2 / 4))), vM(vectorNorm, normAlizer));
        var end2 = vA(vA(this.startPoint, vM(vector, (3 / 4))), vM(vectorNorm, normAlizer));

        // Drawing the line for when the touch point is more then 20 pixels away from the touchdown
        if (vectorLength > 20) {
            context.beginPath();
            context.arc(endBall[0], endBall[1], 7.5 * this.endWeight, 0, Math.PI * 2);
            context.fillStyle = "#f9f90a";
            context.fill();
            context.closePath();

            context.beginPath();
            var x = vA(end, vM(arrowVectorP, this.endWeight))[0];
            var y = vA(end, vM(arrowVectorP, this.endWeight))[1];
            context.moveTo(x, y);
            x = end[0];
            y = end[1];
            context.lineTo(x, y);
            x = vA(end, vM(arrowVectorN, this.endWeight))[0];
            y = vA(end, vM(arrowVectorN, this.endWeight))[1];
            context.lineTo(x, y);
            x = vA(end2, vA(usedVector, vM(arrowVectorN, pointweight4)))[0];
            y = vA(end2, vA(usedVector, vM(arrowVectorN, pointweight4)))[1];
            context.lineTo(x, y);
            x = vA(end2, usedVector)[0];
            y = vA(end2, usedVector)[1];
            context.lineTo(x, y);
            x = vA(end2, vA(usedVector, vM(arrowVectorP, pointweight4)))[0];
            y = vA(end2, vA(usedVector, vM(arrowVectorP, pointweight4)))[1];
            context.lineTo(x, y);
            context.fillStyle = "#f9f90a";
            context.fill();
            context.closePath();

            context.beginPath();
            x = vA(end2, vA(usedVector, vM(arrowVectorP, pointweight4)))[0];
            y = vA(end2, vA(usedVector, vM(arrowVectorP, pointweight4)))[1];
            context.moveTo(x, y);
            x = end2[0];
            y = end2[1];
            context.lineTo(x, y);
            x = vA(end2, vA(usedVector, vM(arrowVectorN, pointweight4)))[0];
            y = vA(end2, vA(usedVector, vM(arrowVectorN, pointweight4)))[1];
            context.lineTo(x, y);
            x = vA(end3, vA(usedVector, vM(arrowVectorN, pointweight3)))[0];
            y = vA(end3, vA(usedVector, vM(arrowVectorN, pointweight3)))[1];
            context.lineTo(x, y);
            x = vA(end3, usedVector)[0];
            y = vA(end3, usedVector)[1];
            context.lineTo(x, y);
            x = vA(end3, vA(usedVector, vM(arrowVectorP, pointweight3)))[0];
            y = vA(end3, vA(usedVector, vM(arrowVectorP, pointweight3)))[1];
            context.lineTo(x, y);
            context.fillStyle = "#a3fb5e";
            context.fill();
            context.closePath();

            context.beginPath();
            x = vA(end3, vA(usedVector, vM(arrowVectorP, pointweight3)))[0];
            y = vA(end3, vA(usedVector, vM(arrowVectorP, pointweight3)))[1];
            context.moveTo(x, y);
            x = end3[0];
            y = end3[1];
            context.lineTo(x, y);
            x = vA(end3, vA(usedVector, vM(arrowVectorN, pointweight3)))[0];
            y = vA(end3, vA(usedVector, vM(arrowVectorN, pointweight3)))[1];
            context.lineTo(x, y);
            x = vA(end4, vA(usedVector, vM(arrowVectorN, pointweight2)))[0];
            y = vA(end4, vA(usedVector, vM(arrowVectorN, pointweight2)))[1];
            context.lineTo(x, y);
            x = vA(end4, usedVector)[0];
            y = vA(end4, usedVector)[1];
            context.lineTo(x, y);
            x = vA(end4, vA(usedVector, vM(arrowVectorP, pointweight2)))[0];
            y = vA(end4, vA(usedVector, vM(arrowVectorP, pointweight2)))[1];
            context.lineTo(x, y);
            context.fillStyle = "#53fdad";
            context.fill();
            context.closePath();

            context.beginPath();
            x = vA(end4, vA(usedVector, vM(arrowVectorP, pointweight2)))[0];
            y = vA(end4, vA(usedVector, vM(arrowVectorP, pointweight2)))[1];
            context.moveTo(x, y);
            x = end4[0];
            y = end4[1];
            context.lineTo(x, y);
            x = vA(end4, vA(usedVector, vM(arrowVectorN, pointweight2)))[0];
            y = vA(end4, vA(usedVector, vM(arrowVectorN, pointweight2)))[1];
            context.lineTo(x, y);
            x = vA(this.startPoint, vM(arrowVectorN, this.startWeight))[0];
            y = vA(this.startPoint, vM(arrowVectorN, this.startWeight))[1];
            context.lineTo(x, y);
            x = this.startPoint[0];
            y = this.startPoint[1];
            context.lineTo(x, y);
            x = vA(this.startPoint, vM(arrowVectorP, this.startWeight))[0];
            y = vA(this.startPoint, vM(arrowVectorP, this.startWeight))[1];
            context.lineTo(x, y);
            context.fillStyle = "#01fffd";
            context.fill();
            context.closePath();

        }
        // Drawing the line for when the touch point is less then 20 pixels away from the touchdown
        else {
            context.beginPath();
            x = vA(end_, vM(arrowVectorP, this.endWeight))[0];
            y = vA(end_, vM(arrowVectorP, this.endWeight))[1];
            context.moveTo(x, y);
            x = end_[0];
            y = end_[1];
            context.lineTo(x, y);
            x = vA(end_, vM(arrowVectorN, this.endWeight))[0];
            y = vA(end_, vM(arrowVectorN, this.endWeight))[1];
            context.lineTo(x, y);
            x = vA(this.startPoint, vM(arrowVectorN, this.startWeight))[0];
            y = vA(this.startPoint, vM(arrowVectorN, this.startWeight))[1];
            context.lineTo(x, y);
            x = this.startPoint[0];
            y = this.startPoint[1];
            context.lineTo(x, y);
            x = vA(this.startPoint, vM(arrowVectorP, this.startWeight))[0];
            y = vA(this.startPoint, vM(arrowVectorP, this.startWeight))[1];
            context.lineTo(x, y);
            context.fillStyle = "#00fdff";
            context.fill();
            context.closePath();

            context.beginPath();
            context.arc(endBall[0], endBall[1], 7.5 * this.endWeight, 0, Math.PI * 2);
            context.fillStyle = "#f9f90a";
            context.fill();
            context.closePath();

        }
        // Drawing the start point in any case
        context.beginPath();
        context.arc(this.startPoint[0], this.startPoint[1], 8 * this.startWeight, 0, Math.PI * 2);
        context.fillStyle = "#00fdff";
        context.fill();
        context.closePath();
    
}

function drawDotLine(context, x1, y1, x2, y2) {
    this.startPoint = [x1, y1];
    this.endPoint = [x2, y2];
        context.beginPath();
        context.moveTo(this.startPoint[0], this.startPoint[1]);
        context.lineTo(this.endPoint[0], this.endPoint[1]);
        context.setLineDash([5]);
        context.lineWidth = 1;
        context.strokeStyle = "#00fdff";
        context.stroke();
        context.closePath();

}


//////////////////////////////////////////////////////////////////////////
/////////////////////// cross check for deletion /////////////////////////

//function for calucating the slope of given points
//slope has to be multiplied by -1 because the y-axis value increases we we go down
var slopeCalc = function(x1, y1, x2, y2){
    if((x1 - x2) == 0){
        return 9999; //handle cases when slope is infinity
    }
    return (y1-y2)/(x1-x2);
}

//function for calculating the line equation.
//returns [m, b], where this corresponds to y = mx + b
//y = [(y1-y2)/(x1-x2), -(y1-y2)/(x1-x2)*x1 + y1]
var lineEq = function(x1,y1,x2,y2){
    var m = slopeCalc(x1,y1,x2,y2);
    // if(m == 'vertical'){
    //     return ['vertical', 'vertical'];
    // }
    return [m, -1*m*x1+y1];
}

//calculate the intersection x value given two line segment
//param: [m1,b1], [m2,b2]
//return x -> the x value
var calculateX=function(seg1, seg2){
    return (seg2[1]-seg1[1])/(seg1[0]-seg2[0]);
}

//calculate y given x and the line equation
var calculateY=function(seg1, x){
    return seg1[0]*x + seg1[1];
}

//given two end points of the segment and some other point p,
//return true - if p is between thw two segment points,  false otherwise
var checkBetween = function(e1, e2, p){
    // console.log("e1,e2,p :",e1,e2,p);
    if(e1-marg2<=p && p<=e2+marg2){
        return true;
    }
    if(e2-marg2<=p && p<=e1+marg2){
        return true;
    }

    return false;
}
/*
VERSION1
******* More useful for if we choose to delete on "mouseup" instead of on drag **********
function that checks whether given two lines intersect. This is used for
line deletion. 
param:  the four points for the two segments  (The x1,y1 points should be that of the link,
                                        and x2,y2 should be the finger swipe positions)
        w - width of the canvas
        h - height of the canvas
return:  true if two segments cross,  false otherwise
*/
function checkLineCross(x11, y11, x12, y12, x21, y21, x22, y22, w, h){
    var l1 = lineEq(x11, y11, x12, y12),
        l2 = lineEq(x21, y21, x22, y22);
    // console.log("l1, l2",l1,l2);
    // if(l1[0] == 'vertical'){

    // }else{

    // }
    var interX = calculateX(l1, l2); //calculate the intersection X value
    if(interX > w || interX < 0){
        return false; //false if intersection of lines is out of canvas
    }
    var interY = calculateY(l1, interX);
    // console.log("interX, interY",interX, interY);

    if(interY == NaN || interX == NaN){
        return false;
    }
    if(interY > h || interY < 0){
        return false; //false if intersection of lines is out of canvas
    }
    console.log("point on line --- checking on segment now");
    return (checkBetween(x11,x12,interX) && checkBetween(y11,y12,interY) 
            & checkBetween(x21,x22,interX) && checkBetween(y21,y22,interY));
}


/*
  VERSION2
******* for checking the point in line every drag point **********  
So that the edge will delete whenever it is cross regardless of mouseup
*/
function checkPointinLine(x11,y11,x12,y12, px, py, h){
    var l1 = lineEq(x11, y11, x12, y12);
    var interY = calculateY(l1, px);
    if(Math.abs(py-interY) > marg ){
        return false;
    }
    if(interY > h || interY < 0){
        return false; //false if intersection of lines is out of canvas
    }
    //at this point, the given point lies on the given line. But we need to 
    //check whether the point actually lies on the segment, not on the infinite line
    return (checkBetween(x11,x12,interX) && checkBetween(y11,y12,interY) 
            & checkBetween(x21,x22,interX) && checkBetween(y21,y22,interY));

}















