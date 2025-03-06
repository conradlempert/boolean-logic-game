var createLevel3_3 = function () {

    //Define Inputs//////////////////////////////////////
    var level3_3 = new Level('level3_3', 'challenge', 'X = (A && B || !B) || (!C || D)\n Y = !C || D');
    var a = level3_3.addInput('A', 2, 2, true);
    var b = level3_3.addInput('B', 2, 8, true);
    var c = level3_3.addInput('C', 2, 14, true);
    var d = level3_3.addInput('D', 2, 20, true);

    //Define Gates///////////////////////////////////////
    var andTop = level3_3.addGate('and', 8, 4);
    var notTop = level3_3.addGate('not', 8, 10);
    var notBottom = level3_3.addGate('not', 8, 14);
    var orBottom = level3_3.addGate('or', 14, 16);
    var or1 = level3_3.addGate('or', 14, 6);
    var or2 = level3_3.addGate('or', 20, 8);

    //Define Outputs/////////////////////////////////////
    var x = level3_3.addOutput(false, 26, 12, 'X ' + I18n.t("challenge.out_off"));
    var y = level3_3.addOutput(false, 26, 18, 'Y ' + I18n.t("challenge.out_off"));
    
    //Define Connections/////////////////////////////////
    a.addChild(andTop);
    b.addChild(andTop);
    b.addChild(notTop);
    c.addChild(notBottom);
    notBottom.addChild(orBottom);
    d.addChild(orBottom);
    andTop.addChild(or1);
    notTop.addChild(or1);
    or1.addChild(or2);
    orBottom.addChild(or2);
    or2.addChild(x);
    orBottom.addChild(y);

    level3_3.dialogue = "r3.endlevel";

    return level3_3;

};