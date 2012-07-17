package models

import play.api.libs.json.{JsArray, JsString, JsObject, JsValue}
import util.Random


case class Board(var tiles: Array[Array[Tile]]) {
  var boatsLeft:Int = 0
  var shipPos: List[String] = List.empty
  var posTaken : List[String] = List.empty

  def parseShip(boat: JsValue){
    val x: Int = (boat \ "x").as[Int]
    val y: Int = (boat \ "y").as[Int]
    val rot: Boolean = (boat \ "rot").as[Boolean]
    val name: String = (boat \ "name").as[String]
    addShip(name,x,y,rot)
  }


  def addShip(name:String,x:Int,y:Int,rot:Boolean) {
    name match{
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
    this.shipPos = shipPos :+ (name+","+x+","+y+","+rot)
  }

  def addRandomShip(name :String){
    val random = new Random()
    var added = false
    var x:Int = 0
    var y:Int = 0
    var rot:Boolean = false

    while (!added){
      x = random.nextInt(9)
      y = random.nextInt(9)
      rot = random.nextBoolean()

      if(!posTaken.contains(x+","+y)){
          name match{
            case "ship1good" =>
               added= true

            case "ship2good" =>
              if(rot && x<9 && !posTaken.contains((x+1)+","+y)){
                posTaken = posTaken:+((x+1)+","+y)
                added= true
              }else if(!rot && y<9 && !posTaken.contains(x+","+(y+1))){
                posTaken = posTaken:+(x+","+(y+1))
                added = true
              }

            case "ship3good" =>

              if(rot && y<8 && !posTaken.contains((x)+","+(y+1)) && !posTaken.contains((x)+","+(y+2))){
                posTaken = posTaken:+((x)+","+(y+1))
                posTaken = posTaken:+((x)+","+(y+2))
                added = true
              }
              else if (!rot && x<8 && !posTaken.contains((x+1)+","+(y)) && !posTaken.contains((x+2)+","+(y))) {
                posTaken = posTaken:+((x+1)+","+(y))
                posTaken = posTaken:+((x+2)+","+(y))
                added = true
              }

            case "ship4good" =>
              if(rot && y<8 && x<9 && !posTaken.contains((x)+","+(y+1)) && !posTaken.contains((x)+","+(y+2)) && !posTaken.contains((x+1)+","+(y+2))){
                posTaken = posTaken:+((x)+","+(y+1))
                posTaken = posTaken:+((x)+","+(y+2))
                posTaken = posTaken:+((x+1)+","+(y+2))
                added = true
              }else if (!rot && x<8 && y>0 && !posTaken.contains((x+1)+","+(y)) && !posTaken.contains((x+2)+","+(y)) && !posTaken.contains((x+2)+","+(y-1))){
                posTaken = posTaken:+((x+1)+","+(y))
                posTaken = posTaken:+((x+2)+","+(y))
                posTaken =  posTaken:+((x+2)+","+(y-1))
                added = true
              }
          }
        }
    }
    posTaken = posTaken:+(x+","+y)
    addShip(name,x,y,rot)


  }



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
    array.foreach(boat => board.parseShip(boat))
    board
  }


  def defaultBoard():(Board,JsValue) = {
    var board: Board = Board.emptyBoard()
    var ships = Array("ship4good","ship3good","ship3good","ship2good","ship1good","ship1good")
    ships.foreach(boat => board.addRandomShip(boat))

    (board,JsObject(Seq("action" ->JsString("defaultStrategy"),
                        "ships" -> JsArray(board.shipPos.map(JsString))
                        )
                     ))

  }

  def emptyBoard(): Board = {
    val a = Array.fill[Tile](10, 10) {
      Tile.emptyTile()
    }
    Board(a)
  }
}







