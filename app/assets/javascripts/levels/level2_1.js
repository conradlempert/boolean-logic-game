var createLevel2_1 = function (){
    var level2_1 = new Level('level2_1', 'choice', '!A && B');
    level2_1.choices = [true, false];
    var a = level2_1.addInput('A', 2, 2, true);
    var b = level2_1.addInput('B', 2, 8, true);
    var not = level2_1.addGate('not', 4, 2);
    var and = level2_1.addGate('and', 8, 4);
    var output = level2_1.addOutput(true, 12, 5);

    a.addChild(not);
    not.addChild(and);
    b.addChild(and);
    and.addChild(output);


    var a2 = level2_1.addInput('A', 18, 2, true);
    var b2 = level2_1.addInput('B', 18, 8, true);
    var not2 = level2_1.addGate('not', 24, 4);
    var and2 = level2_1.addGate('and', 20, 5);
    var output2 = level2_1.addOutput(true, 28, 5);

    a2.addChild(and2);
    b2.addChild(and2);
    and2.addChild(not2);
    not2.addChild(output2);

    level2_1.dialogue = "r2.endlevel";

    return level2_1;
}