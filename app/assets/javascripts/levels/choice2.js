var multipleChoice2 = function (){
    choice = new Level('choice2', 'choice', 'A || B && C');
    choice.choices = [false, true];
    input1 = choice.addInput(2, 2, true);
    input2 = choice.addInput(2, 5, true);
    input3 = choice.addInput(2, 8, true);
    gate0 = choice.addGate('or', 4, 2);
    gate1 = choice.addGate('and', 8, 4);
    output1 = choice.addOutput(true, 12, 5);

    input1.addChild(gate0);
    input2.addChild(gate0);
    gate0.addChild(gate1);
    input3.addChild(gate1);
    gate1.addChild(output1);


    input4 = choice.addInput(18, 2, true);
    input5 = choice.addInput(18, 5, true);
    input6 = choice.addInput(18, 8, true);
    gate2 = choice.addGate('or', 24, 2);
    gate3 = choice.addGate('and', 20, 6);
    output2 = choice.addOutput(true, 28, 5);

    input4.addChild(gate2);
    input5.addChild(gate3);
    gate3.addChild(gate2);
    input6.addChild(gate3);
    gate2.addChild(output2);

    return choice;
}