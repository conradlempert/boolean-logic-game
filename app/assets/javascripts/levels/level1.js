var createLevel1 = function (){
    level1 = new Level('level1', true);
    input1 = level1.addInput(2, 2, true);
    input2 = level1.addInput(2, 8, true);
    gate1 = level1.addGate('equals', 8, 4);
    output1 = level1.addOutput(true, 24, 8);

    input1.addChild(gate1);
    input2.addChild(gate1);
    gate1.addChild(output1);

    return level1;
}