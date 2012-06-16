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

  }

}

