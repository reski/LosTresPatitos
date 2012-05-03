package controllers

import play.api._
import libs.json.JsValue
import play.api.mvc._


object Application extends Controller {
  
  def index = Action { implicit request =>
    Ok(views.html.index())
  }

  /**
   * Display the main page.
   */

  def lobby(username: Option[String]) = Action { implicit request =>
    username.filterNot(_.isEmpty).map { username =>
      Ok(views.html.battleship(username))
    }.getOrElse {
      Redirect(routes.Application.index).flashing(
        "error" -> "Please choose a valid username."
      )
    }
  }

  /**
   * Handles the chat websocket.
   */

  def chat(username: String) = WebSocket.async[JsValue] { request  =>

    ChatRoom.join(username)

  }




}