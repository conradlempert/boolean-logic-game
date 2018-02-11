var createLevel1_1 = function (){
    var level1_1 = new Level('level1_1', 'challenge', 'false && true == !A || B');

    var off = level1_1.addInput(3, 4, false, true);
    var on = level1_1.addInput(3, 8, true, true);
    var a = level1_1.addInput(3, 12, true);
    var b = level1_1.addInput(3, 16, true);

    var not = level1_1.addGate('not', 6, 12);
    var or = level1_1.addGate('or', 9, 14);
    var and = level1_1.addGate('and', 9, 6);
    var equals = level1_1.addGate('equals', 12, 7);

    var output = level1_1.addOutput(true, 15, 7);

    a.addChild(not);

    off.addChild(and);
    on.addChild(and);
    not.addChild(or);
    b.addChild(or);
    and.addChild(equals);
    or.addChild(equals);

    equals.addChild(output);

    level1_1.dialogue = "r1.endlevel";

    return level1_1;
}