/**********************************************************************************************************************
 ******************************************** Utilities Section  *******************************************************
 **********************************************************************************************************************/

/**
 * @desc Multiply two 2d vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/

function vM(x, y) {
    if (typeof y !== 'number') {
        return([x[0] * y[0], x[1] * y[1]]);
    }
    else {
        return([x[0] * y, x[1] * y]);
    }
}

/**
 * @desc Add two 2d vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/

function vA(x, y) {
    if (typeof y !== 'number') {
        return([x[0] + y[0], x[1] + y[1]]);
    }
    else {
        return([x[0] + y, x[1] + y]);
    }
}

/**
 * @desc Divide 2d two vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/

function vD(x, y) {
    if (typeof y !== 'number') {
        return([x[0] - y[0], x[1] - y[1]]);
    }
    else {
        return([x[0] - y, x[1] - y]);
    }
}

/**
 * @desc rotates a 2d vector by degrees.
 * @param {Array} vector the 2d vector that will be rotated.
 * @param {Number} rotation by how many degree the 2d vector should be rotated.
 * @return {Array} representing the rotated 2d vector.
 **/

function vR(vector, rotation) {
    return([ Math.cos(rotation) * vector[0] - Math.sin(rotation) * vector[1],
            Math.sin(rotation) * vector[0] + Math.cos(rotation) * vector[1] ]);
}