var createLevel3_2 = function () {

    //Define Inputs//////////////////////////////////////
    var level3_2 = new Level('level3_2', 'challenge', '(!A && !B) == (B || false)');
    var a = level3_2.addInput('A', 2, 2, true);
    var b = level3_2.addInput('B', 2, 8, true);
    var off = level3_2.addInput('', 2, 14, false, true);

    //Define Gates///////////////////////////////////////
    var notA = level3_2.addGate('not', 8, 2);
    var notB = level3_2.addGate('not', 8, 6);
    var and = level3_2.addGate('and', 12, 4);
    var or = level3_2.addGate('or', 8, 10);
    var equals = level3_2.addGate('equals', 16, 7);

    //Define Outputs/////////////////////////////////////
    var output = level3_2.addOutput(true, 20, 7, I18n.t("challenge.out_on"));

    //Define Connections/////////////////////////////////
    a.addChild(notA);
    b.addChild(notB);
    notA.addChild(and);
    notB.addChild(and);
    b.addChild(or);
    off.addChild(or);
    and.addChild(equals);
    or.addChild(equals);
    equals.addChild(output);


    return level3_2;

};