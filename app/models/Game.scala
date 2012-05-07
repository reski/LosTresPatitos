package models

import play.api.libs.iteratee.PushEnumerator


class Game {


  var player1: String = "";
  var player2: String = "";
  var players = Map.empty[String, PushEnumerator[String]]
  // var boards = Map.empty[String, Board]


  def addPlayer(username: String, out: PushEnumerator[String]) = {

    players += (username -> out)

  }

  def calculateShot(s: String) {
    //boards{s}.calculateoutcome
    // println(players.toArray.toString())
    players {
      s
    }.push("nice shot")
    if (player1.equals(s)) {
      players {
        player2
      }.push("your getting shot")
    } else {
      players {
        player1
      }.push("your getting shot")
    }


  }

  def notYourTurn(s: String) {
    players.map {
      println
    }
    players {
      s
    }.push("not your turn sonny")
  }


}
