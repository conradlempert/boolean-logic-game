var multipleChoice1 = function (){
    choice = new Level('choice1', 'choice', '!A && B');
    choice.choices = [true, false];
    input1 = choice.addInput(2, 2, true);
    input2 = choice.addInput(2, 8, true);
    gate0 = choice.addGate('not', 4, 2);
    gate1 = choice.addGate('and', 8, 4);
    output1 = choice.addOutput(true, 12, 5);

    input1.addChild(gate0);
    gate0.addChild(gate1);
    input2.addChild(gate1);
    gate1.addChild(output1);


    input3 = choice.addInput(18, 2, true);
    input4 = choice.addInput(18, 8, true);
    gate2 = choice.addGate('not', 24, 4);
    gate3 = choice.addGate('and', 20, 5);
    output2 = choice.addOutput(true, 28, 5);

    input3.addChild(gate3);
    input4.addChild(gate3);
    gate3.addChild(gate2);
    gate2.addChild(output2);

    return choice;
}