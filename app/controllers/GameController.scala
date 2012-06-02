package controllers

import play.api._
import libs.iteratee.PushEnumerator
import libs.json.JsValue
import play.api.mvc._
import scala.Predef._
import models.{ShootResult, Game}

object GameController extends Controller {

  val games = Map.empty[String, Game];
  val game = new Game


  def parse(username: String, shot: JsValue):Boolean = {

    println("shot: " + shot.toString() + "by :" + username)
    val text: String = (shot \ "text").as[String]
    val x: Int = (shot \ "cordx").as[Int]
    val y: Int = (shot \ "cordy").as[Int]
    val boats: Array[JsValue] = (shot \ "boats").as[Array[JsValue]]

    if (!text.equals("")) {
      game.chat(username, text);
    }
    if(boats.length != 0){

       game.fillBoard(username,boats)
    }

    if (x != -1 && y != -1) {
      if (username.equals(game.currentPlayer)) {
        val shot: ShootResult.Value = game.shoot(username, x, y)
        shot match {
          case ShootResult.AlreadyFired => {
            return false}
          case default => {game.informShotResult(shot,x,y)}
        }

        //game.calculateShot(username, x, y)
        game.changeTurn(username)

      } else {
        game.notYourTurn(username);
      }
    }

    true
  }

  def addPlayer(s: String, out: PushEnumerator[JsValue]) = {
    game.addPlayer(s, out)
    game.startingMessage(s);

  }


  def checkIfGameAvailable(userName: String): (String, List[String]) = {
    if (game.player1 != "afsd") {
      game.player1 = userName
      ("Waiting for chalenger", List(game.player1))
    } else if (game.player2 == "") {
      game.player2 = userName
      game.currentPlayer = game.player2
      ("The Game has started. Your Move", List(game.player2, game.player1))
    } else {
      ("", null)
    }

  }




}
