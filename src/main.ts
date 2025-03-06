import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 616,
  parent: "game",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

var gridUnit = 25;
var maxScore = 8;
var statusBarHeight = 50;
var progress = 0;
var score = 0;
var dialogueOpen = false;
var style = {
  font: "bold 32px Arial",
  fill: "#fff",
  boundsAlignH: "right",
  boundsAlignV: "bottom",
};

gameElements = {
  gates: [],
  inputs: [],
  outputs: [],
};

function raiseScore(firstTry) {
  if (firstTry) {
    score++;
  } else {
    score += 0.5;
  }
  updateScore(score / maxScore);
  showStatusBar();
}

function updateScore() {
  console.log("update score to:" + score);
  var http = new XMLHttpRequest();
  var url = "/update_score";
  var params = "score=" + score;
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      console.log("score updated successfully.");
      console.log(http.response);
    }
  };
  http.send(params);
}

function finishQuiz() {
  window.location.href = "/quiz_finished";
}

function showStatusBar() {
  game.add.sprite(0, 0, "status");
  var style = { font: "30px Arial", fill: "black" };
  if (progress > 1) {
    drawButton(
      I18n.t("game.buttons.room") + " 2",
      300,
      0,
      "#ffffff",
      room1_2.show,
      room1_2
    );
  }
  if (progress > 2) {
    drawButton(
      I18n.t("game.buttons.room") + " 3",
      400,
      0,
      "#ffffff",
      room2.show,
      room2
    );
  }
  if (progress > 3) {
    drawButton(
      I18n.t("game.buttons.room") + " 4",
      500,
      0,
      "#ffffff",
      room3.show,
      room3
    );
  }
  drawButton(
    I18n.t("game.buttons.room") + " 1",
    200,
    0,
    "#ffffff",
    room1_1.show,
    room1_1
  );
  drawButton(I18n.t("game.buttons.send"), 660, 0, "#ffffff", updateScore, null);
  scoreText = game.add.text(
    10,
    6,
    I18n.t("game.texts.score") + ": " + score + "/" + maxScore,
    style
  );
}

function drawButton(text, x, y, color, callback, reference) {
  var button = game.add.button(
    x,
    y + 2,
    "button_empty",
    callback,
    reference,
    2,
    1,
    0
  );
  var style = { font: "24px Arial", fill: "black" };
  var text = game.add.text(x + 14, y + 10, text, style);

  var group = game.make.group();
  group.add(button);
  group.add(text);

  return {
    group: group,
    button: button,
    text: text,
    destroy: () => {
      button.destroy();
      text.destroy();
    },
  };
}

function isSafari() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("safari") != -1) {
    if (ua.indexOf("chrome") > -1) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}

function fitSize(width, height) {
  var ww = window.innerWidth - 20;
  var wh = window.innerHeight - 50;
  var gameRatio = width / height;
  var screenRatio = ww / wh;

  if (gameRatio > screenRatio) {
    return ww / width;
  } else {
    return wh / height;
  }
}

export default new Game(config);
