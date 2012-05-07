package models

case class Ship(id: Long, size: Int, var hitPoints: Int) {


  def hit = {
    hitPoints = hitPoints - 1
    if (hitPoints <= 0) ShootResult.SunkShip
    else ShootResult.HitShip
  }
}

