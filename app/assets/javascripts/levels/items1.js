var createItemAnd = function (){
    var item_and = new Level('item_and', 'lernItem', 'A && B');
    var a = item_and.addInput('A', 5, 5, false);
    var b = item_and.addInput('B', 5, 10, true);
    var and = item_and.addGate('and', 8, 8);
    var output = item_and.addOutput(true, 12, 8);

    a.addChild(and);
    b.addChild(and);
    and.addChild(output);

    item_and.window = {x: 50, y: 125, width: 300, height: 250};

    a.onClickUpdate.addOnce(function() {
        new Dialogue("r1.le_A&&B");
        dialogueOpen = false;
    }
    );

    return item_and;
}

var createItemInput = function (){
    var item_input = new Level('item_input', 'lernItem');
    var a = item_input.addInput('A', 5, 5, false);

    item_input.window = {x: 50, y: 125, width: 150, height: 100};

    a.onClickUpdate.addOnce(function() {
            new Dialogue("r1.le_A");
            dialogueOpen = false;
        }
    );

    item_input.winAction = room1_1.unlockItems;

    return item_input;
}

var createItemOr = function (){
    var item_or = new Level('item_or', 'lernItem', 'A || B');

    var a = item_or.addInput('A', 5, 5, false);
    var b = item_or.addInput('B', 5, 10, false);
    var or = item_or.addGate('or', 8, 8);
    var output = item_or.addOutput(true, 12, 8);

    a.addChild(or);
    b.addChild(or);
    or.addChild(output);

    item_or.window = {x: 50, y: 125, width: 300, height: 250};

    a.onClickUpdate.addOnce(function() {
            new Dialogue("r1.le_A||B");
            dialogueOpen = false;
        }
    );

    return item_or;
}

var createItemEquals = function (){
    var item_equals = new Level('item_equals', 'lernItem', 'A == B');

    var a = item_equals.addInput('A', 5, 5, false);
    var b = item_equals.addInput('B', 5, 10, true);
    var equals = item_equals.addGate('equals', 8, 8);
    var output = item_equals.addOutput(true, 12, 8);

    a.addChild(equals);
    b.addChild(equals);
    equals.addChild(output);

    item_equals.window = {x: 50, y: 125, width: 300, height: 250};

    output.onClickUpdated.addOnce(function() {
            new Dialogue("r1.le_A==B");
            dialogueOpen = false;
        }
    );

    return item_equals;
}

var createItemNot = function (){
    var item_not = new Level('item_not', 'lernItem', '!A');

    var a = item_not.addInput('A', 5, 5, false);
    var not = item_not.addGate('not', 8, 5);
    var output = item_not.addOutput(true, 12, 5);

    a.addChild(not);
    not.addChild(output);

    item_not.window = {x: 50, y: 125, width: 300, height: 250};

    output.onClickUpdated.addOnce(function() {
            new Dialogue("r1.le1");
            dialogueOpen = false;
        }
    );

    return item_not;
}