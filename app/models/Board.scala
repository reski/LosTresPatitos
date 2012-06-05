package models

import play.api.libs.json.JsValue


case class Board(var tiles: Array[Array[Tile]]) {

  def addShip(boat: JsValue){
    val x: Int = (boat \ "x").as[Int]
    val y: Int = (boat \ "y").as[Int]
    val rot: Boolean = (boat \ "rot").as[Boolean]

    (boat \ "name").as[String] match{
      case "ship1good" =>
        val ship:Ship =Ship.smallShip()
        this.tiles(x)(y) = Tile(Some(ship))

      case "ship2good" =>
        val ship:Ship = Ship.mediumShip()
        this.tiles(x)(y) = Tile(Some(ship))
        if(rot) this.tiles(x+1)(y) = Tile(Some(ship))
        else  this.tiles(x)(y+1) = Tile(Some(ship))


      case "ship3good" =>
        val ship:Ship = Ship.largeShip()
        this.tiles(x)(y) = Tile(Some(ship))
        if(rot){
          this.tiles(x)(y+1) = Tile(Some(ship))
          this.tiles(x)(y+2) = Tile(Some(ship))
        }
        else {
          this.tiles(x+1)(y) = Tile(Some(ship))
          this.tiles(x+2)(y) = Tile(Some(ship))
        }

      case "ship4good" =>
        val ship:Ship = Ship.xLargeShip()
        this.tiles(x)(y) = Tile(Some(ship))
        if(rot){
          this.tiles(x)(y+1) = Tile(Some(ship))
          this.tiles(x)(y+2) = Tile(Some(ship))
          this.tiles(x+1)(y+2) =Tile(Some(ship))
        }else {
          this.tiles(x+1)(y) = Tile(Some(ship))
          this.tiles(x+2)(y) = Tile(Some(ship))
          this.tiles(x+2)(y-1) =Tile(Some(ship))

        }
    }
    this.boatsLeft += 1
  }



  var boatsLeft:Int = 0

  def shoot(x: Int, y: Int): ShootResult.Value = {
    val tile: Tile = tiles(x)(y)
    println("board shoot tile: " + tile.toString)
    if (!tile.alreadyFired) {
      tile.alreadyFired = true
      tile.ship.map{ship=> ship.hit(this)}.getOrElse{ShootResult.miss}
    } else {
      ShootResult.AlreadyFired
    }
  }

}

object Board {
  def fillBoard(array: Array[JsValue]): Board ={
    var board: Board = Board.emptyBoard()
    array.foreach(boat => board.addShip(boat))
    board
  }


  def defaultBoard(): Board = {

    val ship1: Ship = Ship.smallShip()
    val ship1b: Ship = Ship.smallShip()
    val ship2: Ship = Ship.mediumShip()
    val ship3: Ship = Ship.largeShip()
    val ship3b: Ship = Ship.largeShip()
    val ship4: Ship = Ship.xLargeShip()
    var board: Board = Board.emptyBoard()
    board.tiles(0)(8) = Tile(Some(ship1))
    board.tiles(1)(5) = Tile(Some(ship1b))
    board.tiles(3)(4) = Tile(Some(ship2))
    board.tiles(3)(5) = Tile(Some(ship2))
    board.tiles(0)(0) = Tile(Some(ship3b))
    board.tiles(1)(0) = Tile(Some(ship3b))
    board.tiles(2)(0) = Tile(Some(ship3b))
    board.tiles(2)(8) = Tile(Some(ship3))
    board.tiles(3)(8) = Tile(Some(ship3))
    board.tiles(4)(8) = Tile(Some(ship3))
    board.tiles(7)(7) = Tile(Some(ship4))
    board.tiles(8)(7) = Tile(Some(ship4))
    board.tiles(9)(7) = Tile(Some(ship4))
    board.tiles(9)(6) = Tile(Some(ship4))
    board.boatsLeft= 6
    board
  }

  def emptyBoard(): Board = {
    val a = Array.fill[Tile](10, 10) {
      Tile.emptyTile()
    }
    Board(a)
  }
}







