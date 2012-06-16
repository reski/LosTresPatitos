package models



case class Board() {
  var tiles : List[List[Tile]] = null;

  def shoot(x:Int, y:Int) ={
    val tile = tiles{x}{y}
    if (!tile.alreadyFired){
      tile.alreadyFired = true
      //si el tile tiene un ship, le pega, si no agua
      if (tile.ship!=Nil) tile.ship.hit else ShootResult.Missed
      //tile.ship.map{ship=> ship.hit}.getOrElse{ShootResult.Missed}

    }else{
      ShootResult.AlreadyFired
    }

  }

  def createBoard: List[List[Tile]] = {
    var lists: List[List[Tile]] = List[List[Tile]]()
    for (i <- 1 until 10) {
      var row: List[Tile] = List[Tile]()
      for (j <- 1 until 10) {
        row = Tile(i + "," + j, SmallShip, false) :: row
      }
      lists = row :: lists
    }
    lists
  }

}



