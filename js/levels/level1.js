var createLevel1 = function (){
    input1 = new Input(2, 2, true);
    input2 = new Input(2, 8, true);
    gate1 = new Gate('or', 8, 4);
    output1 = new Output(true, 'off', 24, 8);

    gameElements.gates.push(gate1);
    gameElements.inputs.push(input1);
    gameElements.inputs.push(input2);
    gameElements.outputs.push(output1);

    input1.addChild(gate1);
    input2.addChild(gate1);
    gate1.addChild(output1);
}