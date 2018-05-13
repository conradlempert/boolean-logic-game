var createLevel1_1 = function (){
    var level1_1 = new Level('level1_1', 'challenge', 'A && false || B && C(false)');

    var a = level1_1.addInput('A', 3, 4, true);
    var off = level1_1.addInput('', 3, 8, false, true);
    var b = level1_1.addInput('B', 3, 12, true);
    var c = level1_1.addInput('C', 3, 16, false);

    //var not = level1_1.addGate('not', 6, 12);
    var and1 = level1_1.addGate('and', 9, 6);
    var and2 = level1_1.addGate('and', 9, 14);
    var or = level1_1.addGate('or', 12, 7);

    var output = level1_1.addOutput(true, 15, 7);

    a.addChild(and1);
    off.addChild(and1);
    b.addChild(and2);
    c.addChild(and2);

    and1.addChild(or);
    and2.addChild(or);

    or.addChild(output);

    level1_1.dialogue = "r1.endlevel";

    return level1_1;
}