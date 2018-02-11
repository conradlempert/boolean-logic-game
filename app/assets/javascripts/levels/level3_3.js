var createLevel3_3 = function () {

    //Define Inputs//////////////////////////////////////
    var level3_3 = new Level('level3_3', 'challenge', '[A && B || (B || C)] || !C && D');
    var a = level3_3.addInput(2, 2, true);
    var b = level3_3.addInput(2, 8, true);
    var c = level3_3.addInput(2, 14, true);
    var d = level3_3.addInput(2, 20, true);

    //Define Gates///////////////////////////////////////
    var andTop = level3_3.addGate('and', 8, 4);
    var or1 = level3_3.addGate('or', 8, 10);
    var not = level3_3.addGate('not', 8, 14);
    var andBottom = level3_3.addGate('and', 14, 16);
    var or2 = level3_3.addGate('or', 14, 6);
    var or3 = level3_3.addGate('or', 20, 8);

    //Define Outputs/////////////////////////////////////
    var outputTop = level3_3.addOutput(false, 26, 12);
    var outputBottom = level3_3.addOutput(false, 26, 18);
    
    //Define Connections/////////////////////////////////
    a.addChild(andTop);
    b.addChild(andTop);
    b.addChild(or1);
    c.addChild(or1);
    c.addChild(not);
    not.addChild(andBottom);
    d.addChild(andBottom);
    andTop.addChild(or2);
    or1.addChild(or2);
    or2.addChild(or3);
    andBottom.addChild(or3);
    or3.addChild(outputTop);
    andBottom.addChild(outputBottom);

    level3_3.dialogue = "r3.endlevel";

    return level3_3;

};