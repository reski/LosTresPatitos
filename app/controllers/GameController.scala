package controllers

import play.api._
import libs.iteratee.PushEnumerator
import libs.json.JsValue
import play.api.mvc._
import scala.Predef._
import models.{ShootResult, Game}

object GameController extends Controller {

  var games = Map.empty[String, Game];
  var currentGame = new Game
  var gameid = 0

  def parse(username: String,gameId:String, shot: JsValue):Boolean = {

    println("shot: " + shot.toString() + "by :" + username)
    val text: String = (shot \ "text").as[String]
    val x: Int = (shot \ "cordx").as[Int]
    val y: Int = (shot \ "cordy").as[Int]
    val boats: Array[JsValue] = (shot \ "boats").as[Array[JsValue]]

    if (!text.equals("")) {
      games(gameId).chat(username, text);
    }
    if(boats.length != 0){
      var default :Boolean = (shot \ "default").as[Boolean]
      if(default) games(gameId).setDefaultBoard(username)
      else games(gameId).fillBoard(username,boats)

    }

    if (x != -1 && y != -1) {
      if (username.equals(games(gameId).currentPlayer)) {
        val shot: ShootResult.Value = games(gameId).shoot(username, x, y)
        shot match {
          case ShootResult.AlreadyFired => {
            return false}
          case default => {games(gameId).informShotResult(shot,x,y)}
        }

        //game.calculateShot(username, x, y)
        games(gameId).changeTurn(username)

      } else {
        games(gameId).notYourTurn(username);
      }
    }

    true
  }

  def addPlayer(s: String,gameId :String, out: PushEnumerator[JsValue]) = {
    games(gameId).addPlayer(s, out)

    //game.startingMessage(s);

  }


  def checkIfGameAvailable(userName: String): (String, List[String],String) = {
    if (currentGame.player1 == "") {
      currentGame.player1 = userName
      gameid += 1
      games += ("game"+gameid -> currentGame)
      ("Waiting for chalenger", List(currentGame.player1),"game"+gameid)
    } else if (currentGame.player2 == "" && userName != currentGame.player1 ) {
      currentGame.player2 = userName
      currentGame.informOponentEntered()
      ("Waiting for chalenger to Finish Strategy", List(currentGame.player2, currentGame.player1),"game"+gameid)
    }else if (currentGame.player1 != "" && currentGame.player2 != ""){
      currentGame = new Game
      checkIfGameAvailable(userName)
    }else {
      ("", null,"")
    }

  }




}
