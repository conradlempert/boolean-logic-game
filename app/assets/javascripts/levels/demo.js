var createDemo = function (){
    demo = new Level('demo', false);
    input1 = demo.addInput(5, 5, true);
    input2 = demo.addInput(5, 10, true);
    gate1 = demo.addGate('and', 8, 8);
    output1 = demo.addOutput(true, 12, 8);

    input1.addChild(gate1);
    input2.addChild(gate1);
    gate1.addChild(output1);

    demo.window = {x: 100, y: 100, width: 300, height: 300};

    console.log(demo);

    return demo;

}