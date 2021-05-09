package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._
import models.LoginInMemoryModel
import play.api.libs.json._
import models._

@Singleton
class Trininit @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def trininitIndex = Action { implicit request =>
    Ok(views.html.trininit())
  }

  

}