package controllers

import play.api._
import libs.iteratee.{PushEnumerator, Enumerator, Iteratee}
import libs.json.{JsValue}
import play.api.mvc._
import com.codahale.jerkson.Json

object Application extends Controller {

  def index = Action {
    implicit request =>
      Ok(views.html.index())
  }

  def battleRoom(username: Option[String]) = Action {
    implicit request =>
      username.filterNot(_.isEmpty).map {
        username =>
          val welcomeText: (String,List[String]) = GameController.checkIfGameAvailable(username)
          if (welcomeText != ("",null)) {

            Ok(views.html.battleRoom(username,welcomeText))

          } else {
            Redirect(routes.Application.index).flashing(
              "error" -> "Battle is full");
          }

      }.getOrElse {
        Redirect(routes.Application.index).flashing(
          "error" -> "Please choose a valid username."
        )
      }
  }


  def connect(username: String) = WebSocket.using[JsValue] {
    request =>

      val out: PushEnumerator[JsValue] = Enumerator.imperative[JsValue]()

      val in = Iteratee.foreach[JsValue] {
        json => GameController.parse(username, json)
      }

      GameController.addPlayer(username, out)
      (in, out)
  }

}