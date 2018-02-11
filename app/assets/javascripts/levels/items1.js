var createItemAnd = function (){
    var item_and = new Level('item_and', 'lernItem');
    var a = item_and.addInput(5, 5, false);
    var b = item_and.addInput(5, 10, true);
    var and = item_and.addGate('and', 8, 8);
    var output = item_and.addOutput(true, 12, 8);

    a.addChild(and);
    b.addChild(and);
    and.addChild(output);

    item_and.window = {x: 100, y: 100, width: 300, height: 300};

    a.onClickUpdate.addOnce(function() {
        new Dialogue("r1.le_A&&B");
    }
    );

    return item_and;
}

var createItemInput = function (){
    var item_input = new Level('item_input', 'lernItem');
    var a = item_and.addInput(5, 5, false);

    item_input.window = {x: 100, y: 100, width: 300, height: 300};

    a.onClickUpdate.addOnce(function() {
            new Dialogue("r1.le_A");
        }
    );

    return item_input;
}

var createItemOr = function (){
    var item_or = new Level('item_or', 'lernItem');

    var a = item_or.addInput(5, 5, false);
    var b = item_or.addInput(5, 10, false);
    var or = item_or.addGate('or', 8, 8);
    var output = item_or.addOutput(true, 12, 8);

    a.addChild(or);
    b.addChild(or);
    or.addChild(output);

    item_or.window = {x: 100, y: 100, width: 300, height: 300};

    a.onClickUpdate.addOnce(function() {
            new Dialogue("r1.le_A||B");
        }
    );

    return item_or;
}

var createItemEquals = function (){
    var item_equals = new Level('item_equals', 'lernItem');

    var a = item_equals.addInput(5, 5, false);
    var b = item_equals.addInput(5, 10, true);
    var equals = item_equals.addGate('equals', 8, 8);
    var output = item_equals.addOutput(true, 12, 8);

    a.addChild(equals);
    b.addChild(equals);
    equals.addChild(output);

    item_equals.window = {x: 100, y: 100, width: 300, height: 300};

    output.onClickUpdated.addOnce(function() {
            new Dialogue("r1.le_A==B");
        }
    );

    return item_equals;
}