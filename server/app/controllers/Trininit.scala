package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._
import models._

import play.api.db.slick.DatabaseConfigProvider
import scala.concurrent.ExecutionContext
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future
import play.api.libs.json.Json

@Singleton
class Trininit @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) 
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val userModel = new UsersModel(db)
  private val tagModel = new TagsModel(db)
  
  implicit val userDataReads = Json.writes[models.UserData]
  
  def trininitIndex = Action { implicit request =>
    Ok(views.html.trininit())
  }

  // def getUserData = Action.async { implicit request =>
  //   println("getting data")

  //   userModel.getUserData("swibi").map(info => {
  //     // println(info)
  //     Ok(Json.toJson(info))
  //     })
  // }
}