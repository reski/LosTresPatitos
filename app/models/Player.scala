package models

import play.api.libs.iteratee.PushEnumerator
import play.api.libs.json.JsValue


class Player() {

  var out: PushEnumerator[JsValue]= null
  var board: Board = null

}
