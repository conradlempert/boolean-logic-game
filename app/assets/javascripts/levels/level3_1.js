var createlevel3_1 = function () {

    //Define Inputs//////////////////////////////////////
    var level3_1 = new Level('level3_1', 'challenge', '(A && !B) && (B || A)');
    var a = level3_1.addInput(2, 6, true);
    var b = level3_1.addInput(8, 6, true);

    //Define Gates///////////////////////////////////////
    var not = level3_1.addGate('not', 6, 2);
    var and = level3_1.addGate('and', 12, 2);
    var and2 = level3_1.addGate('and', 16, 6);
    var or = level3_1.addGate('or', 12, 10);

    //Define Outputs/////////////////////////////////////
    var output = level3_1.addOutput(true, 20, 6);

    //Define Connections/////////////////////////////////
    a.addChild(not);
    not.addChild(and);
    b.addChild(and);
    b.addChild(or);
    a.addChild(or);

    and.addChild(and2);
    or.addChild(and2);
    and2.addChild(output);


    return level3_1;

};