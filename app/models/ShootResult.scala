package models

object ShootResult extends Enumeration {
  type ShootResult = Value
  val Missed, HitShip, SunkShip, AlreadyFired = Value
}