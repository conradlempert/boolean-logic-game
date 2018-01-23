var multipleChoice3 = function (){
    choice = new Level('choice3', 'choice', 'A && !B || C');
    choice.choices = [false, true];
    input1 = choice.addInput(2, 2, true);
    input2 = choice.addInput(2, 5, true);
    input3 = choice.addInput(2, 8, true);
    gate0 = choice.addGate('and', 10, 2);
    gate1 = choice.addGate('not', 4, 4);
    gate2 = choice.addGate('or', 7, 5);
    output1 = choice.addOutput(true, 13, 5);

    input1.addChild(gate0);
    input2.addChild(gate1);
    gate1.addChild(gate2);
    input3.addChild(gate2);
    gate2.addChild(gate0);
    gate0.addChild(output1);


    input4 = choice.addInput(18, 2, true);
    input5 = choice.addInput(18, 5, true);
    input6 = choice.addInput(18, 8, true);
    gate3 = choice.addGate('or', 26, 5);
    gate4 = choice.addGate('not', 20, 4);
    gate5 = choice.addGate('and', 23, 2);
    output2 = choice.addOutput(true, 29, 5);

    input4.addChild(gate5);
    input5.addChild(gate4);
    gate4.addChild(gate5);
    gate5.addChild(gate3);
    input6.addChild(gate3);
    gate3.addChild(output2);

    return choice;
}