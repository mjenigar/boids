function AddVectors(vec_a, vec_b){
    vec = [];
    for(i in vec_a){
        vec.push(Number(vec_a[i]) + Number(vec_b[i]))
    }

    return vec;
}

function SubtractVectors(vec_a, vec_b){
    vec = [];
    for(i in vec_a){
        vec.push(Number(vec_a[i]) - Number(vec_b[i]))
    }

    return vec;
}

function DivideByScalar(vec, scalar){
    if(scalar == 0) vec;

    _vec = [];
    for(i of vec){
        _vec.push(Math.round((Number(i) / scalar)));
    }

    return _vec;
}

function EucDistance(a, b) {
    return a
        .map((x, i) => Math.abs( x - b[i] ) ** 2) // square the difference
        .reduce((sum, now) => sum + now) // sum
        ** (1/2)
}

function LimitVector(vec, limit){
    _vec = [];
    for(i of vec){
        if(i > limit) _vec.push(limit);
        else _vec.push(i);
    }

    return _vec;
}

// function SetMagnitude()

// #TODO for fun
// function SpawnBoidPos(map){
//     return position = {
//         "x" : randomNumber(0, map["width"] - 1),
//         "y" : randomNumber(0, map["height"] - 1 ) 
//     }
// }