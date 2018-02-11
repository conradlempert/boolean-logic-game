var createLevel2_2 = function (){
    var level2_2 = new Level('level2_2', 'choice', 'A || B && C');
    level2_2.choices = [false, true];
    var a = level2_2.addInput(2, 2, true);
    var b = level2_2.addInput(2, 5, true);
    var c = level2_2.addInput(2, 8, true);
    var or = level2_2.addGate('or', 4, 2);
    var and = level2_2.addGate('and', 8, 4);
    var output = level2_2.addOutput(true, 12, 5);

    a.addChild(or);
    b.addChild(or);
    or.addChild(and);
    c.addChild(and);
    and.addChild(output);


    var a2 = level2_2.addInput(18, 2, true);
    var b2 = level2_2.addInput(18, 5, true);
    var c2 = level2_2.addInput(18, 8, true);
    var or2 = level2_2.addGate('or', 24, 2);
    var and2 = level2_2.addGate('and', 20, 6);
    var output2 = level2_2.addOutput(true, 28, 5);

    a2.addChild(or2);
    b2.addChild(and2);
    and2.addChild(or2);
    c2.addChild(and2);
    or2.addChild(output2);

    return level2_2;
}