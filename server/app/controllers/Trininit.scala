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
import play.api.libs.json._
import models.ImplicitJsonConversions._



@Singleton
class Trininit @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) 
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val userModel = new UsersModel(db)
  private val tagModel = new TagsModel(db)


  
  implicit val userDataWrites = Json.writes[UserData]
  implicit val userDataReads = Json.reads[UserData]

  private val projectsModel = new ProjectsModel(db)
  
  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) =>  { 
          println("success")
          f(a) 
        }
        case e @ JsError(_) =>  {
          println(e)
          println(body) 
          Future.successful(Redirect(routes.Trininit.trininitIndex()))
        }
      }
    }.getOrElse(Future.successful(Redirect(routes.Trininit.trininitIndex())))
  }

  def withSessionUsername(f: String => Future[Result])(implicit request: Request[AnyContent]): Future[Result] = {
    request.session.get("username").map(f).getOrElse(Future.successful(Ok(Json.toJson(Seq.empty[String]))))
  }

  def withSessionUserid(f: Int => Future[Result])(implicit request: Request[AnyContent]): Future[Result] = {
    request.session.get("userid").map(userid => f(userid.toInt)).getOrElse(Future.successful(Ok(Json.toJson(Seq.empty[String]))))
  }
  
  def trininitIndex = Action { implicit request =>
    Ok(views.html.trininit())
  }

  def createUser = Action.async { implicit request =>
        withJsonBody[UserData] { ud => {
          userModel.createUser(ud).map { ouserId =>  Ok(Json.toJson(ouserId)) 
          } 
        }
    }
  }

  //get username w/ json
  def getUserData = Action.async { implicit request =>
    println("getting data")

    userModel.getUserData("swibi").map(info => {
      println(info)
      Ok(Json.toJson(info))
      })
  }
  

}