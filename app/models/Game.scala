package models

import play.api.libs.iteratee.PushEnumerator
import play.api.libs.json.{JsArray, JsString, JsObject, JsValue}
import scala.Predef._

class Game {



  var currentPlayer = "";
  var player1: String = "";
  var player2: String = "";
  var players = Map.empty[String, Player]

  def changeTurn(currentUser: String){
    if(currentPlayer.equals(player1)){
      currentPlayer = player2;
    }else{
      currentPlayer = player1;
    }

  }

  def addPlayer(username: String, out: PushEnumerator[JsValue])={
    val player: Player = new Player();
    player.out = out;
    //player.board = Board.defaultBoard();
    players += (username -> player)

  }
  def fillBoard(username:String, boats: Array[JsValue]){
    players(username).board = Board.fillBoard(boats)
    players(username).strategySet = true
    setCurrentPlayer(username)
  }

  def setDefaultBoard(username:String){
    players(username).board = Board.defaultBoard()
    players(username).strategySet = true
    setCurrentPlayer(username)
  }
  def setCurrentPlayer(username : String){
    if(player2 != ""){
      if (username.equals(player1)){
        if (players(player2).strategySet){
          players(player1).out.push(createJson("The Game has started. Oponents Move","BattleLord"))
          players(player2).out.push(createJson("The Game has started. Your Move","BattleLord"))
          currentPlayer = player2
        }else{
          players(player2).out.push(createJson("Oponent to Finished Strategy","BattleLord"))
        }
      }else if(username.equals(player2)){
        if (players(player1).strategySet){
          players(player2).out.push(createJson("The Game has started. Oponents Move","BattleLord"))
          players(player1).out.push(createJson("The Game has started. Your Move","BattleLord"))
          currentPlayer = player1
        }else{
          players(player1).out.push(createJson("Oponent to Finished Strategy","BattleLord"))
        }

      }
    }
  }

  def shoot(username: String, x: Int, y: Int):ShootResult.Value= {
    if(username.equals(player1)) {
      players(player2).board.shoot(x,y)
    }else{
     players(player1).board.shoot(x,y)
    }
  }

  def chat(name :String,text: String) ={
    val json: JsValue = createJson(text, name)
    players(player2).out.push(json)
    players(player1).out.push(json)
  }

  def informOponentEntered() = {
      players(player1).out.push(createJson("Waiting For Oponent to finish Strategy","BattleLord"))
  }

  def informShotResult(value: ShootResult.Value,x:Int,y:Int){
    if (currentPlayer.equals(player1)){
      players(player1).out.push(createJsonShot("You ",value,x,y,false))
      players(player2).out.push(createJsonShot("Oponent ",value,x,y,true))
    }else{
      players(player2).out.push(createJsonShot("You ",value,x,y,false))
      players(player1).out.push(createJsonShot("Oponent ",value,x,y,true))
    }
    if(players(player1).board.boatsLeft == 0){
      players(player2).out.push(JsObject(Seq("finishedGame" -> JsString("W"))))
      players(player1).out.push(JsObject(Seq("finishedGame" -> JsString("L"))))
    }
    if(players(player2).board.boatsLeft == 0){
      players(player1).out.push(JsObject(Seq("finishedGame" -> JsString("W"))))
      players(player2).out.push(JsObject(Seq("finishedGame" -> JsString("L"))))
    }
  }

/*
  def calculateShot(s: String,x: Int, y:Int) = {
    players(s).out.push(createJson("nice shot","BattleLord"))
    if (player1.equals(s)) (players(player2).out).push(createJson("your getting shot","BattleLord"))
    else players(player1).out.push(createJson("your getting shot","BattleLord"))
  }
*/

  def notYourTurn(s: String) = {
    players(s).out.push(createJson("not your turn sonny","BattleLord"))
  }

  def createJson(msg: String, user:String): JsValue ={
    val json = JsObject(
      Seq(
        "user" -> JsString(user),
        "message" -> JsString(msg),
        "members" -> JsArray(players.keySet.toList.map(JsString))
      )
    )
    json
  }
  def createJsonShot(msg: String,shotResult:ShootResult.Value,x:Int,y:Int,gettingShot:Boolean): JsValue ={
    val json = JsObject(
      Seq(
        //"user" -> JsString(user),
        //"message" -> JsString(msg + shotResult.toString),
        "shotResult"->JsString(shotResult.toString),
        "shotpos" -> JsObject(Seq(
          "posx"->JsString(x.toString),
          "posy"->JsString(y.toString))
                ),
        "gettingShot"->JsString(gettingShot.toString)
      )
    )
    json
  }
}
