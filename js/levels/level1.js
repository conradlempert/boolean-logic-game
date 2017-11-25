var createLevel1 = function (){
    input1 = new Input(2, 2, true);
    input2 = new Input(2, 8, true);
    gate1 = new Gate('or', 8, 4);

    gameElements.gates.push(gate1);
    gameElements.parents.push(input1);
    gameElements.parents.push(input2);

    input1.nextGates.push(gate1);
    input1.addChild(gate1);
    input2.addChild(gate1);
    gameElements.outputs.push(new Output(true, 'off', 24, 8));
    gate1.addChild(gameElements.outputs[0]);
}