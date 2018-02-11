var createLevel2_3 = function (){
    var level2_3 = new Level('level2_33', 'level2_3', 'A && !B || C');
    level2_3.choices = [false, true];
    var a = level2_3.addInput(2, 2, true);
    var b = level2_3.addInput(2, 5, true);
    var c = level2_3.addInput(2, 8, true);
    var and = level2_3.addGate('and', 10, 2);
    var not = level2_3.addGate('not', 4, 4);
    var or = level2_3.addGate('or', 7, 5);
    var output = level2_3.addOutput(true, 13, 5);

    a.addChild(and);
    b.addChild(not);
    not.addChild(or);
    c.addChild(or);
    or.addChild(and);
    and.addChild(output);


    var a2 = level2_3.addInput(18, 2, true);
    var b2 = level2_3.addInput(18, 5, true);
    var c2 = level2_3.addInput(18, 8, true);
    var or2 = level2_3.addGate('or', 26, 5);
    var not2 = level2_3.addGate('not', 20, 4);
    var and2 = level2_3.addGate('and', 23, 2);
    var output2 = level2_3.addOutput(true, 29, 5);

    a2.addChild(and2);
    b2.addChild(not2);
    not2.addChild(and2);
    and2.addChild(or2);
    c2.addChild(or2);
    or2.addChild(output2);

    return level2_3;
}