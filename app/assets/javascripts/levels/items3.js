var createItemLevel3_NotEqual = function () {
    var item = new Level('item_notequals', 'lernItem', '(!A || C) == (A != B)');
    var a = item.addInput('A', 5, 5, false);
    var b = item.addInput('B', 5, 10, true);
    var c = item.addInput('C', 5, 15, true);
    var d = item.addInput('D', 5, 20, true);
    var not1 = item.addGate('not', 8, 5);
    var or = item.addGate('or', 12, 8);
    var equals1 = item.addGate('equals', 8, 17);
    var not2 = item.addGate('not', 11, 18);
    var equals2 = item.addGate('equals', 15, 13);
    var output = item.addOutput(true, 18, 13);

    a.addChild(not1);
    not1.addChild(or);
    b.addChild(or);
    c.addChild(equals1);
    d.addChild(equals1);
    or.addChild(equals2);
    equals1.addChild(not2);
    not2.addChild(equals2);
    equals2.addChild(output);

    item.window = {x: 50, y: 80, width: 500, height: 550};
    item.dialogue = new Dialogue("r3.le1", null, false);

    return item;
}
