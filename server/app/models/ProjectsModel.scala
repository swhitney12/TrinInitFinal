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

  /**
    *
    * @return all projects
    */
  def getAllProjects(): Future[Seq[ProjectData]] = {
    val projects = db.run(Projects.result)

    projects.map(_.map(project => ProjectData(project.id, project.ownerid, project.name, project.description,
      project.repositorylink, project.creationdate)))
  }
  
  /**
    * Gets all associated project that a user is a collaborator on
    *
    * @param userId
    * @return a Sequence of Project data
    */
  def getCollaboratorProjects(userId: Int): Future[Seq[ProjectData]] = {
    val collabProjects = db.run(Userprojects.filter(_.userid === userId).result)

    collabProjects.flatMap( projects => Future.sequence(projects.map(row => 
      db.run(Projects.filter(_.id === row.projectid).result).map(_.headOption.map(proj => 
        ProjectData(proj.id, proj.ownerid, proj.name, proj.description, proj.repositorylink, proj.creationdate)
      )
    ))).map(ps => ps.flatten))
  }

  /**
    *
    * @param userId
    * @return all projects owned by a user
    */
  def getOwnedProjects(userId: Int): Future[Seq[ProjectData]] = {
    db.run(Projects.filter(_.ownerid === userId).result).map(_.map(pr =>
      ProjectData(pr.id, pr.ownerid, pr.name, pr.description, pr.repositorylink, pr.creationdate)
    ))
  }

  /**
    * Adds a user as a collaborator to a project
    *
    * @param projectId
    * @param userId
    * @return greater than 0 if add is successful
    */
  def addCollaborator(projectId: Int, userId: Int): Future[Int] = {
    db.run(Userprojects += UserprojectsRow(Some(userId), Some(projectId)))
  }

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

  /**
    * Gets all projects liked by a user
    *
    * @param userId
    * @return a Sequence of project data
    */
  def getLikedProjects(userId: Int): Future[Seq[ProjectData]] = {
    val matches = db.run(Projectlikes.filter(_.userid === userId).result)

    matches.flatMap(projects => Future.sequence(projects.map(pr => 
      db.run(Projects.filter(_.id === pr.projectid).result).map(_.headOption.map(p => 
        ProjectData(p.id, p.ownerid, p.name, p.description, p.repositorylink, p.creationdate)
      )
    ))).map(pr => pr.flatten))
  }
}

case class ProjectData(id: Int, ownerId: Option[Int], name: String, description: String, 
  repositoryLink: Option[String], creationDate: Option[java.sql.Timestamp])