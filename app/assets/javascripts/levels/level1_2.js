var createLevel1_2 = function (){
    var level1_2 = new Level('level1_2', 'challenge', 'false && true == !A || B');

    var off = level1_2.addInput('', 3, 4, false, true);
    var on = level1_2.addInput('', 3, 8, true, true);
    var a = level1_2.addInput('A', 3, 12, true);
    var b = level1_2.addInput('B', 3, 16, true);

    var not = level1_2.addGate('not', 6, 12);
    var or = level1_2.addGate('or', 9, 14);
    var and = level1_2.addGate('and', 9, 6);
    var equals = level1_2.addGate('equals', 12, 7);

    var output = level1_2.addOutput(true, 15, 7);

    a.addChild(not);

    off.addChild(and);
    on.addChild(and);
    not.addChild(or);
    b.addChild(or);
    and.addChild(equals);
    or.addChild(equals);

    equals.addChild(output);

    level1_2.dialogue = "r1.endlevel";

    return level1_2;
}