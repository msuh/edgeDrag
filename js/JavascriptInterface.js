/*
API

I have added a Utilities Section with functions you should use for programming your javascript.
// you need the module deep-diff to make the last function work. 
// use <script src="deep-diff-0.2.0.min.js"></script> More info here: https://travis-ci.org/flitbit/diff


1) We first start with two arrays. The one holds all the possition of all points.
The second stores all the lines between points.

2) We then have a function that when called can change the values within the arrays.
This is needed for ben to make changes to the arrays.

3) Then comes a function to generate all the lines.

4) Functions that react on the mouse click and release.

IMPORTANT) use the id of each array object to locate the object in the array.
Dont use the possition in the array.

Use atomicUpdateArray() and lockupArrayEntry() from the utilities section to store and look up based on the id. 

*/

//Aray of Objects based on the programmingButton and programmingLinks constructor:
programmingLinksArray = [];
programmingButtonArray = [];

// needed for the last function in this document. There is a library that adds require to javascript in browser.
var deep = require('deep-diff');

// When you work with ben call the following line to tell bens software that it has loaded the programming interface
// window.location.href = "of://programingInterface:true";

// constructors for the links.
function programmingButton() {
	
	this.id = '';
	this.possition = {
        possition2dX:0,
        possition2dY:0,
        possitionZfor2dScale:0,
        objectVisibility: true
	}
}

function programmingLinks() {
	this.id = '';
    this.idLinkSideA = '';
    this.idLinkSideB = '';
}

//Access the possition values based on the id.

function changeValueInArray(id, nameOfVariable, valuetoChange, nameofArray) {

// code that makes changes in the programmingButtonArray or the programmingLinksArray.
// this function is needed for bens open frameworks code to change the values within your code
// you can use the atomicUpdateArray() function that I wrote to make these changes. 
}


// after changes are made call:
generateAllLines(programmingLinksArray, programmingButtonArray);
	



function generateAllLines (programmingLinksArray, programmingButtonArray)
{
/*
With every entry in programmingLinksArray:
Use lockupArrayEntry() to:
Get the A possition of the first id (idLinkSideA) within programmingButtonArray
Get the B possition of the second id (idLinkSideA) within programmingButtonArray


Draw a line from A to B.

The line should be able to have different sizes of the endpoints based on the Z possition.
The line should also have a gradiant from blue to yellow, whereby the A side is blue and the B side is yellow.


*/
	
	
}


function onDoubleClickwithinButton(id, x, y)
{
/*
use double click/touch to move your buttons around.
Save the possition of your motion with atomicUpdateArray() within the programmingButtonArray.
*/
// after these changes to make them active on the lines, with calling:
generateAllLines(programmingLinksArray, programmingButtonArray);

}

function onClickwithinButton(id, x, y, programmingLinksArray)
{
/*

All buttons are side A when clicked on them.

If clicked on a button, draw a line between side A and your mouse cursor.

Use atomicUpdateArray to push a new programmingLinks entry to the programmingLinksArray.
Give it entry a random unique id, and store the id from the button on side A to idLinkSideA.


*/
// after these changes to make them active on the lines, with calling:


}


function onClickReleased(id, x, y)
{
// once the mouse click is released check if it has been released on top of an object.
// If yes, then check if the last entry in the programmingLinksArray is still imssing a idLinkSideB.
// If there is no entry jet, this means that onClickwithinButton has generated a new entry before so that we can
// store the id from the button on side B to idLinkSideB in the last entry found in the array.
	
// once this has been performed executed: 
generateAllLines(programmingLinksArray, programmingButtonArray);
// to draw all lines. 

}


/**********************************************************************************************************************
 ******************************************** Utilities Section ******************************************************
 **********************************************************************************************************************/


/**
 * @desc Updates one parameter within an object within the array.
 * If no record found, a new object in the array is created.
 * @param {String} searchArgument Any name of a parameter that would be within an object in the sourceArray.
 * @param {String} searchContent The value of a parameter that one wants to look for.
 * @param {String} replaceArgument The parameter that should be replaced.
 * @param {String} replaceContent The value of the parameter that should be replaced.
 * @param {String} nameOfSourceConstructor witout '()'. A new object created from the constructor for the object stored in the array.
 * @param {Array} sourceArray Array of all the objects that should be searched through.
 * @return {String} "added", "updated", "no change", "error"
 **/

function atomicUpdateArray(searchArgument, searchContent, replaceArgument, replaceContent,
                           nameOfSourceConstructor, sourceArray) {
    if (typeof engine === 'undefined') {
        engine = 'false';
    }

    if (typeof sourceObjectfromConstructor === 'undefined') {
        sourceObjectfromConstructor = {};
    }

    var tester = 100;

    if (typeof searchArgument !== 'undefined' && typeof searchContent !== 'undefined'
        && typeof replaceArgument !== 'undefined' && typeof replaceContent !== 'undefined') {

        tester = 0;

        for (var i = 0; i < sourceArray.length; i++) {
            if (isEquivalent(searchContent, sourceArray[i][searchArgument])) {
                if (isEquivalent(sourceArray[i][replaceArgument], replaceContent)) {
                    tester = 3;
                    break;
                }
                else {
                    sourceArray[i][replaceArgument] = replaceContent;
                    tester = 1;
                    break;
                }
            }

        }

        if (tester === 0) {
          var sourceObjectfromConstructor = new nameOfSourceConstructor();
            sourceObjectfromConstructor[replaceArgument] = replaceContent;
            sourceObjectfromConstructor[searchArgument] = searchContent;
            sourceArray.push(sourceObjectfromConstructor);
        }
    }

    if (tester === 0) {
        return "added";
    }
    else if (tester === 1) {
        return "updated";
    }
    else if (tester === 3) {
        return "no change";
    }
    else if (tester === 100) {
        return "error";
    }
}

/**
 * @desc Returns the object that contains an argumentToCheckFor with the value argumentValue stored in an array called
 * actualArray. If a returnParamter is set, only the specigic value of the return parameter within the object gets returned.
 * @param {String} argumentToCheckFor Any name of a parameter that would be within an object in the actualArray.
 * @param {String} argumentValue The value of a parameter that one wants to look for.
 * @param {Array} actualArray Array of all the objects that should be searched through.
 * @param {String} returnParamter (optional) If this argument is set, the parameter within the found object is returned.
 * @return {Object}, {String}, "no entry" or "error"
 **/

function lockupArrayEntry(argumentToCheckFor, argumentValue, actualArray, returnParamter) {
    if (typeof returnParamter === 'undefined') {
        returnParamter = 'false';
    }

    var tester = 100;

    if (typeof argumentToCheckFor !== 'undefined' && typeof argumentValue !== 'undefined') {

        tester = 0;

        for (var i = 0; i < actualArray.length; i++) {
            if (isEquivalent(argumentValue, actualArray[i][argumentToCheckFor])) {
                if(returnParamter === 'false') {
                    return actualArray[i];
                }
                else {
                    return actualArray[i][returnParamter];
                }
            }
        }
    }

    if (tester === 0) {
        return "no entry";
    }
    else if (tester === 100) {
        return "error";
    }
}

/**
 * @desc IF is not able to deep compare objects. This function can do this trick
 * @note requires 'deep-diff' library
 * @param {Object} a
 * @param {Object} b
 * @return {Boolean}
 **/

function isEquivalent(a, b) {
    if(typeof a === "boolean" || typeof a === "string" || typeof a === "number" ||
       typeof b === "boolean" || typeof b === "string" || typeof b === "number") {
       return a===b;
    }
    else {
       return !deep.diff(a,b);
    }
}