package models

import play.api.libs.iteratee.PushEnumerator
import play.api.libs.json.{JsArray, JsString, JsObject, JsValue}
import scala.Predef._

class Game {


  var player1: String = "";
  var player2: String = "";
  var players = Map.empty[String, PushEnumerator[JsValue]]
  var boards = Map.empty[String, Board]


  def addPlayer(username: String, out: PushEnumerator[JsValue]) = {
    players += (username -> out)


  }
  def startingMessage (username : String) = {
    if (username.equals(player2)){
      players{player1}.push(createJson("The Game has started. Oponents Move","BattleLord"))
  }
  }

  def calculateShot(s: String) = {

    players {s}.push(createJson("nice shot","BattleLord"))
    if (player1.equals(s)) {
       players {player2}.push(createJson("your getting shot","BattleLord"))


    } else {
       players {player1}.push(createJson("your getting shot","BattleLord"))
    }


  }

  def notYourTurn(s: String) = {
    players {s}.push(createJson("not your turn sonny","BattleLord"))
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
