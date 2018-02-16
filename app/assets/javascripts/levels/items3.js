var createItemLevel3_NotEqual = function () {
    var item = new Level('item_notequals', 'lernItem', '(!A || C) == (A != B)');
    var a = item.addInput('A', 5, 5, false);
    var b = item.addInput('B', 5, 10, true);
    var c = item.addInput('C', 5, 15, true);
    var d = item.addInput('D', 5, 20, true);
    var not = item.addGate('not', 8, 5);
    var or = item.addGate('or', 12, 8);
    var notequals = item.addGate('notequals', 12, 18);
    var equals = item.addGate('equals', 15, 13);
    var output = item.addOutput(true, 18, 13);

    a.addChild(not);
    not.addChild(or);
    b.addChild(or);
    c.addChild(notequals);
    d.addChild(notequals);
    or.addChild(equals);
    notequals.addChild(equals);
    equals.addChild(output);

    item.window = {x: 50, y: 80, width: 500, height: 550};

    output.onClickUpdated.addOnce(function() {
            new Dialogue("r3.le1", null, false);
            dialogueOpen = false;
        }
    );

    return item;
}
