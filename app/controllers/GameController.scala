package controllers

import play.api._
import libs.iteratee.PushEnumerator
import libs.json.JsValue
import play.api.mvc._
import models.{Game, Tile}
import scala.Predef._

object GameController extends Controller {

  val games = Map.empty[String, Game];
  val game = new Game
  var currentPlayer = "";


  def parse(username: String, shot: JsValue) = {

    println("shot: "+ shot.toString()+ "by :" + username)
    val text: String = (shot \ "text").as[String]



    if (username.equals(currentPlayer)) {
      game.calculateShot(username);
      if(currentPlayer.equals(game.player1)){
       currentPlayer = game.player2;
      }else{
        currentPlayer = game.player1;
      }

    } else {
      game.notYourTurn(username);
    }


  }

  def addPlayer(s: String, out: PushEnumerator[JsValue]) = {
    game.addPlayer(s, out)
    game.startingMessage(s);

  }


  def checkIfGameAvailable(userName: String): (String,List[String]) = {
    if (game.player1 == "") {
      game.player1 = userName
      ("Waiting for chalenger",List(game.player1))
    } else if (game.player2 == "") {
      game.player2 = userName
      currentPlayer = game.player2
      ("The Game has started. Your Move", List(game.player2, game.player1))
    } else {
      ("",null)
    }

  }


}
