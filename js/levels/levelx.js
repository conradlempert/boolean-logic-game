var createLevelX = function () {

    //Define Inputs//////////////////////////////////////
    gameElements.inputs.push(new Input(2, 2, false));
    gameElements.inputs.push(new Input(2, 8, false));
    gameElements.inputs.push(new Input(2, 14, false));
    gameElements.inputs.push(new Input(2, 20, false));


    //Define Gates///////////////////////////////////////
    gameElements.gates.push(new Gate('and', 8, 4));
    gameElements.inputs[0].addChild(gameElements.gates[0]);
    gameElements.inputs[1].addChild(gameElements.gates[0]);

    gameElements.gates.push(new Gate('or', 8, 10));
    gameElements.inputs[1].addChild(gameElements.gates[1]);
    gameElements.inputs[2].addChild(gameElements.gates[1]);


    gameElements.gates.push(new Gate('not', 8, 14));
    gameElements.inputs[2].addChild(gameElements.gates[2]);


    gameElements.gates.push(new Gate('and', 14, 16));
    gameElements.gates[2].addChild(gameElements.gates[3]);
    gameElements.inputs[3].addChild(gameElements.gates[3]);


    gameElements.gates.push(new Gate('or', 14, 6));
    gameElements.gates[0].addChild(gameElements.gates[4]);
    gameElements.gates[1].addChild(gameElements.gates[4]);


    gameElements.gates.push(new Gate('or', 20, 8));
    gameElements.gates[4].addChild(gameElements.gates[5]);
    gameElements.gates[3].addChild(gameElements.gates[5]);



    //Define Outputs/////////////////////////////////////

    gameElements.outputs.push(new Output(false, 'output', 26, 12));
    gameElements.gates[5].addChild(gameElements.outputs[0]);

    gameElements.outputs.push(new Output(false, 'output', 26, 18));
    gameElements.gates[3].addChild(gameElements.outputs[1]);


    //Define Connections/////////////////////////////////


};
