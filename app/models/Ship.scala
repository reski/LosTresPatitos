package models

import play.api.libs.json.JsValue

case class Ship(id: Long, size: Int) {

  var hitPoints: Int = size

  def hit(board: Board) : ShootResult.Value = {
    hitPoints-=1
    if (hitPoints <= 0) {
      board.boatsLeft-=1
      id match {
        case 1 => ShootResult.patrol
        case 2 => ShootResult.patrol
        case 3 => ShootResult.submarine
        case 4 => ShootResult.battleship
      }
    }
    else ShootResult.hit
  }
}

object Ship{

  def smallShip(): Ship = {
    Ship(1,1)
  }
  def mediumShip(): Ship = {
    Ship(2,2)
  }
  def largeShip(): Ship = {
    Ship(3,3)
  }
  def xLargeShip(): Ship = {
    Ship(4,4)
  }


}





