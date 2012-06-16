package models

import play.api.libs.iteratee.PushEnumerator
import play.api.libs.json.{JsArray, JsString, JsObject, JsValue}
import scala.Predef._

class Game {



  var player1: String = "";
  var player2: String = "";
  var players = Map.empty[String, Player]



  def addPlayer(username: String, out: PushEnumerator[JsValue])={
    val player: Player = new Player();
    player.out = out;
    player.board = Board.defaultBoard();
    players += (username -> player)

  }

  def shoot(username: String, x: Int, y: Int) = {
    players{username}.board.shoot(x,y)


  }

  def chat(name :String,text: String) ={
    val json: JsValue = createJson(text, name)
    players{player2}.out.push(json)
    players {player1}.out.push(json)


  }

  def startingMessage (username : String) = {
    if (username.equals(player2)){
      players{player1}.out.push(createJson("The Game has started. Oponents Move","BattleLord"))
  }
  }

  def calculateShot(s: String,x: Int, y:Int) = {

    players{s}.out.push(createJson("nice shot","BattleLord"))
    if (player1.equals(s)) {
       (players{player2}.out).push(createJson("your getting shot","BattleLord"))


    } else {
       players {player1}.out.push(createJson("your getting shot","BattleLord"))
    }


  }

  def notYourTurn(s: String) = {
    players {s}.out.push(createJson("not your turn sonny","BattleLord"))
  }

  def createJson(msg: String, user:String): JsValue ={
    val json = JsObject(
      Seq(
        "user" -> JsString(user),
        "message" -> JsString(msg),
        "members" -> JsArray(
          players.keySet.toList.map(JsString)
        )
      )
    )
    json
  }


}
