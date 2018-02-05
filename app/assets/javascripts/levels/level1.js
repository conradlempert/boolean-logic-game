var createLevel1 = function (){
    level1 = new Level('level1', 'challenge', 'false && true == !A || B');
    inputfalse = level1.addInput(3,4,false,true);
    inputtrue = level1.addInput(3,8,true,true);
    input1 = level1.addInput(3, 12, true);
    input2 = level1.addInput(3, 16, true);
    gatenot = level1.addGate('not', 6, 12);
    gateor = level1.addGate('or', 9, 14);
    gateand = level1.addGate('and', 9, 6);
    gate1 = level1.addGate('equals', 12, 7);

    output1 = level1.addOutput(true, 15, 7);

    input1.addChild(gatenot);

    inputfalse.addChild(gateand);
    inputtrue.addChild(gateand);
    gatenot.addChild(gateor);
    input2.addChild(gateor);
    gateand.addChild(gate1);
    gateor.addChild(gate1);

    gate1.addChild(output1);

    return level1;
}