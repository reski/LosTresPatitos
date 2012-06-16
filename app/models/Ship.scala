package models

case class Ship(id: Long, size: Int) {

  var hitPoints: Int = size;

  def hit : ShootResult.Value = {
    hitPoints = hitPoints - 1
    if (hitPoints <= 0) ShootResult.SunkShip
    else ShootResult.HitShip
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





