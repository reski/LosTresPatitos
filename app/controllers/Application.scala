package controllers

import play.api._
import libs.iteratee.{PushEnumerator, Enumerator, Iteratee}
import libs.json.JsValue
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    implicit request =>
      Ok(views.html.index())
  }

  def battleRoom(username: Option[String]) = Action {
    implicit request =>
      username.filterNot(_.isEmpty).map {
        username =>

          if (GameController.checkIfGameAvailable(username)) {

            Ok(views.html.battleRoom(username))

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


  def connect(username: String) = WebSocket.using[String] {
    request =>

      val out: PushEnumerator[String] = Enumerator.imperative[String]()
      println("adding player" + username + "asddas")
      GameController.addPlayer(username, out)
      val in = Iteratee.foreach[String] {
        s => println(s)
        GameController.parse(username, s)
      }

      (in, out)
  }

}