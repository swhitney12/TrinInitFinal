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
          println(body)
          println(e)
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
      userModel.getUserData(username).map(data => Ok(Json.toJson(data)))
    })
  }

  def getOwnerData = Action.async { implicit request =>
    withSessionUserid(userid => {
      userModel.getUserData(userid).map(data => Ok(Json.toJson(data)))
    })
  }

  def getCommentSenderData = Action.async { implicit request => 
    withJsonBody[Int] { senderid =>
      userModel.getUserData(senderid).map { data =>
        Ok(Json.toJson(data))
      }
    }
  }

  def getUserID = Action.async { implicit request =>
    withSessionUserid(userid => {
      userModel.getUserData(userid).map(data => Ok(Json.toJson(userid)))
    })
  }

  def setCollabs = Action.async {implicit request =>
    withJsonBody[String] {argString =>
      println("sdsf: "+ argString);
      val argArray = argString.split(",");
      println("the first element of this array is " + argArray(0));
      projectsModel.addCollaborator(argArray(0).toInt, argArray(1).toInt).map { collabNum =>
        Ok(Json.toJson(collabNum))
      }
    }

  }

  def getCollaboratorID = Action.async {implicit request =>
    withJsonBody[String] { collab =>
      userModel.getUserId(collab).map { data =>
        Ok(Json.toJson(data))
      }
    }
  }

  def getProjectData = Action.async { implicit request =>
    withJsonBody[Int] {projectid =>
      projectsModel.getProject(projectid).map { project =>
        Ok(Json.toJson(project))
      }
    }
  }

  def getUserProjects = Action.async { implicit request => 
    withSessionUserid(userid =>{
      projectsModel.getOwnedProjects(userid).map(data => Ok(Json.toJson(data)))
    })
  }

  def getLikedProjects = Action.async { implicit request => 
    withSessionUserid(userid =>{
      projectsModel.getLikedProjects(userid).map(data => Ok(Json.toJson(data)))
    })
  }

  def getAllProjects = Action.async { implicit request => 
    projectsModel.getAllProjects().map(data => Ok(Json.toJson(data)))
  }

  def likeProject = Action.async { implicit request =>
    //change to withsessionuserid to pass into likeproject, hardcoded for now
    withJsonBody[ProjectData] {pd =>
      projectsModel.likeProject(pd.id, 1).map(like => Ok(Json.toJson(true)))
    }
  }
  
  def createProject = Action.async { implicit request =>
    withJsonBody[ProjectData] { pd =>
      projectsModel.createProject(pd).map { projectID =>
        //project id returns 1 for successful, need to find a new way to pass ID to func
        println(Json.toJson(projectID))
        Ok(Json.toJson(projectID))
      }
    }
  }

  def addComment = Action.async { implicit request =>
    withJsonBody[CommentData] { cd => 
      projectsModel.addComment(cd).map { comment =>
        Ok(Json.toJson(comment))
      }
    }
  }

  def getComments = Action.async { implicit request =>
    withJsonBody[Int] { projectID =>
      projectsModel.getComments(projectID).map {comments =>
        Ok(Json.toJson(comments))
      }
    }
  }

  def getLikeCount = Action.async { implicit request => 
    withJsonBody[Int] { projectId => 
      projectsModel.getLikeCount(projectId).map(count => Ok(Json.toJson(count)))
    }
  }

  def getCommentCount = Action.async { implicit request => 
    withJsonBody[Int] { projectId => 
      projectsModel.getCommentCount(projectId).map(count => Ok(Json.toJson(count)))
    }
  }

}