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
import play.api.libs.json._
import models.ImplicitJsonConversions._

@Singleton
class Trininit @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) 
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val userModel = new UsersModel(db)
  private val tagModel = new TagsModel(db)
  private val projectsModel = new ProjectsModel(db)
  
  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) =>  { 
          f(a) 
        }
        case e @ JsError(_) =>  {
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

   def validateUser = Action.async { implicit request =>
        withJsonBody[UserData] { ud => {
          userModel.validateUser(ud.username, ud.password).map { ouserId =>       
            ouserId match {
              case Some(userid) =>
                Ok(Json.toJson(ouserId)).withSession("username" -> ud.username, "userid" -> userid.toString, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse("")) 
              case None => 
                Ok(Json.toJson(false))
            }
          } 
        }
    }
  }


  def createUser = Action.async { implicit request =>
        withJsonBody[UserData] { ud => {
          userModel.createUser(ud).map { ouserId =>  Ok(Json.toJson(ouserId)) 
          } 
        }
    }
  }

  def getUserData = Action.async { implicit request =>
    withSessionUsername(username => {
      println("getting user data")
      userModel.getUserData(username).map(data => Ok(Json.toJson(data)))
    })
  }

  def getProjectData = Action.async { implicit request =>
    projectsModel.getProject(1).map { project =>
      Ok(Json.toJson(project))
    }
  }

  def likeProject = Action.async { implicit request =>
    //change to withsessionuserid to pass into likeproject, hardcoded for now
    withJsonBody[ProjectData] {pd =>
      projectsModel.likeProject(pd.id, 1).map(like => Ok(Json.toJson(true)))
    }
  }
  
  def createProject = Action.asyn { implicit request =>
    withJsonBody[ProjectData] { pd =>
      projectsModel.createProject(pd).map { projectID =>
        Ok(Json.toJson(projectID))
      }
    }
  }

}