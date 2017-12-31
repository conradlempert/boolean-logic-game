var createLevelX = function () {

    //Define Inputs//////////////////////////////////////
    levelx = new Level('levelx');
    var i1 = levelx.addInput(2, 2, false);
    var i2 = levelx.addInput(2, 8, false);
    var i3 = levelx.addInput(2, 14, false);
    var i4 = levelx.addInput(2, 20, false);

    //Define Gates///////////////////////////////////////
    var g1 = levelx.addGate('and', 8, 4);
    var g2 = levelx.addGate('or', 8, 10);
    var g3 = levelx.addGate('not', 8, 14);
    var g4 = levelx.addGate('and', 14, 16);
    var g5 = levelx.addGate('or', 14, 6);
    var g6 = levelx.addGate('or', 20, 8);

    //Define Outputs/////////////////////////////////////
    var o1 = levelx.addOutput(false, 26, 12);
    var o2 = levelx.addOutput(false, 26, 18);
    
    //Define Connections/////////////////////////////////
    i1.addChild(g1);
    i2.addChild(g1);
    i2.addChild(g2);
    i3.addChild(g2);
    i3.addChild(g3);
    g3.addChild(g4);
    i4.addChild(g4);
    g1.addChild(g5);
    g2.addChild(g5);
    g5.addChild(g6);
    g4.addChild(g6);
    g6.addChild(o1);
    g4.addChild(o2);

    levelx.show();

};