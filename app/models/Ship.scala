package models

import play.api.libs.json.JsValue

case class Ship(id: Long, size: Int) {

  var hitPoints: Int = size;

  def hit(board: Board) : ShootResult.Value = {
    hitPoints-=1
    if (hitPoints <= 0) {
      board.boatsLeft-=1
      ShootResult.SunkShip
    }
    else ShootResult.HitShip
  }
}

object Ship{
  def byName(value: JsValue): Ship ={
      value.toString() match{
        case ship1good => Ship.smallShip()
        case ship2good => Ship.mediumShip()
        case ship3good => Ship.largeShip()
        case ship4good => Ship.xLargeShip()
      }
  }


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





