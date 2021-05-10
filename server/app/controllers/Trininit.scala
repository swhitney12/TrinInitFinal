package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._
import models._
import play.api.libs.json._

import play.api.db.slick.DatabaseConfigProvider
import scala.concurrent.ExecutionContext
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future

@Singleton
class Trininit @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) 
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val userModel = new UsersModel(db)
  private val tagModel = new TagsModel(db)
  private val projectModel = new ProjectsModel(db)

  def trininitIndex = Action { implicit request =>
    Ok(views.html.trininit())
  }

  implicit val projectDataWrites = Json.writes[ProjectData]
  implicit val projectDataReads = Json.reads[ProjectData]

  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => Future.successful(Redirect(routes.Trininit.trininitIndex()))
      }
    }.getOrElse(Future.successful(Redirect(routes.Trininit.trininitIndex())))
  }

  def createProject = Action.async { implicit request =>
    withJsonBody[ProjectData] { pd =>
      projectModel.createProject(pd).map(projectID => Ok(Json.toJson(projectID))) 
    }
  }

}