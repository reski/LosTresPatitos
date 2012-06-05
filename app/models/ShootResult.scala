package models

object ShootResult extends Enumeration {
  type ShootResult = Value
  val miss, hit, AlreadyFired,patrol,submarine,battleship = Value
}