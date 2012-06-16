package controllers

import play.api._
import play.api.mvc._
import models.{ShootResult, Tile, Board}

object BoardController extends Controller {

  val board :Board = new Board();

  def shoot(tileId: String) = {
    val position = tileId.split(",").map {
      s => s.toInt
    }
    board.shoot(position {0}, position {1}) match {
      case ShootResult.Missed => {}
      case ShootResult.HitShip => {}
      case ShootResult.SunkShip => {}
      case ShootResult.AlreadyFired => {}
    }
  }

}

