package models

case class Ship(id: Long, size: Int, var hitPoints: Int) {


  def hit = {
    hitPoints = hitPoints - 1
    if (hitPoints <= 0) ShootResult.SunkShip
    else ShootResult.HitShip
  }


}
object SmallShip extends Ship(1,1,1){}
object MediumShip extends Ship(2,2,2){}
object LargeShip extends Ship(3,3,3){}
object XLShip extends Ship(4,4,4){}

