var createLE_A_and_B = function (){
    le = new Level('A_and_B', 'lernItem');
    input1 = le.addInput(5, 5, false);
    input2 = le.addInput(5, 10, true);
    gate1 = le.addGate('and', 8, 8);
    output1 = le.addOutput(true, 12, 8);

    input1.addChild(gate1);
    input2.addChild(gate1);
    gate1.addChild(output1);

    le.window = {x: 100, y: 100, width: 300, height: 300};

    input1.onClickUpdate.addOnce(function() {
        new Dialogue("r1.le_A&&B");
    }
    );

    return le;
}

var createLE_A = function (){
    le = new Level('A', 'lernItem');
    input1 = le.addInput(5, 5, false);

    le.window = {x: 100, y: 100, width: 300, height: 300};

    input1.onClickUpdate.addOnce(function() {
            new Dialogue("r1.le_A");
        }
    );

    return le;
}

var createLE_A_or_B = function (){
    le = new Level('A_or_B', 'lernItem');

    input1 = le.addInput(5, 5, false);
    input2 = le.addInput(5, 10, false);
    gate1 = le.addGate('or', 8, 8);
    output1 = le.addOutput(true, 12, 8);

    input1.addChild(gate1);
    input2.addChild(gate1);
    gate1.addChild(output1);

    le.window = {x: 100, y: 100, width: 300, height: 300};

    input1.onClickUpdate.addOnce(function() {
            new Dialogue("r1.le_A||B");
        }
    );

    return le;
}

var createLE_A_equals_B = function (){
    le = new Level('A_equals_B', 'lernItem');

    input1 = le.addInput(5, 5, false);
    input2 = le.addInput(5, 10, true);
    gate1 = le.addGate('equals', 8, 8);
    output1 = le.addOutput(true, 12, 8);

    input1.addChild(gate1);
    input2.addChild(gate1);
    gate1.addChild(output1);

    le.window = {x: 100, y: 100, width: 300, height: 300};

    output1.onClickUpdated.addOnce(function() {
            new Dialogue("r1.le_A==B");
        }
    );

    return le;
}