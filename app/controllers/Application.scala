package controllers

import play.api._
import libs.iteratee.{PushEnumerator, Enumerator, Iteratee}
import libs.json.{JsString, JsObject, JsValue}
import play.api.mvc._
import com.codahale.jerkson.Json
import java.util.{TimerTask, Timer}

object Application extends Controller {

  def index = Action {
    implicit request =>
      Ok(views.html.index())
  }
  def battle = Action {
    implicit request =>
      Ok(views.html.battleship("mono"))
  }

  def battleRoom(username: Option[String]) = Action {
    implicit request =>
      username.filterNot(_.isEmpty).map {
        username =>
          val welcomeText: (String,List[String],String) = GameController.checkIfGameAvailable(username)
          if (welcomeText != ("",null,"")) {

            Ok(views.html.battleRoom(username,welcomeText))

          } else {
            Redirect(routes.Application.index).flashing(
              "error" -> "name used");
          }

      }.getOrElse {
        Redirect(routes.Application.index).flashing(
          "error" -> "Please choose a valid username."
        )
      }
  }


  def connect(username: String,gameId : String) = WebSocket.using[JsValue] {
    request =>

      val out: PushEnumerator[JsValue] = Enumerator.imperative[JsValue]()
      val in = Iteratee.foreach[JsValue] { json => GameController.parse(username,gameId, json)}
      GameController.addPlayer(username,gameId, out)
      new Timer().schedule(new TimerTask(){
        def run(){
            out.push(JsObject(Seq("action" ->JsString("timer"))))
            GameController.games(gameId).informOponentEntered(username)
            //println("timer")
        }
      }, 2000)
      new Timer().schedule(new TimerTask(){
        def run(){
          out.push(JsObject(Seq("action" ->JsString("timerFinish"))))
         // println("timer finished")
        }
      }, 43000)
      println("chatSocker for"+ username)
      (in, out)
  }

}