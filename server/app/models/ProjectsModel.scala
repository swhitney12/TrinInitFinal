package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future

class ProjectsModel(db: Database)(implicit ec: ExecutionContext) {
  
  /**
    * Gets a project from the database given a project's ID
    *
    * @param projectId
    * @return the data of a project if it exists in the database
    */
  def getProject(projectId: Int): Future[Option[ProjectData]] = {
    val matches = db.run(Projects.filter(projectRow => projectRow.id === projectId).result)
    matches.map(projectRows => projectRows.headOption.map(project => 
      ProjectData(project.id, project.ownerid, project.name, project.description,
        project.repositorylink, project.creationdate)
    ))
  }


  /**
    * Creates a project given the project's data
    *
    * @param project
    * @return the ID for the new project
    */
  def createProject(project: ProjectData): Future[Int] = {
    db.run(Projects += ProjectsRow(-1, project.ownerId, project.name, project.description,
      project.repositoryLink, project.creationDate))
  }

  // getPersonalProject(userId)
  // getAllProject

  /**
    * Adds 1 like to a project
    *
    * @param projectId
    * @param userId
    * @return greater than 0 if successful
    */
  def likeProject(projectId: Int, userId: Int): Future[Int] = {
    db.run(Projectlikes += ProjectlikesRow(Some(userId), Some(projectId)))
  }

  /**
    * Counts the likes for a project given its ID
    *
    * @param projectId
    * @return the amount of likes
    */
  def getLikeCount(projectId: Int): Future[Int] = {
    val matches = db.run(Projectlikes.filter(row => row.projectid === projectId).result)
    matches.map(_.length)
  }
}

case class ProjectData(id: Int, ownerId: Option[Int], name: String, description: String, 
  repositoryLink: Option[String], creationDate: Option[java.sql.Timestamp])