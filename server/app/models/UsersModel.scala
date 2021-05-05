package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future
import org.mindrot.jbcrypt.BCrypt

class UsersModel(db: Database)(implicit ec: ExecutionContext) {
  /**
    * Validates if a user is in the database
    *
    * @param username
    * @param password
    * @return the user's ID if the user is in the database
    */
  def validateUser(username: String, password: String): Future[Option[Int]] = {
    val matches = db.run(Users.filter(userRow => userRow.username === username).result)
    matches.map(userRows => userRows.headOption.flatMap {
      userRow => if (BCrypt.checkpw(password, userRow.password)) Some(userRow.id) else None
    })
  }

  /**
    * Creates a user in the database
    *
    * @param user
    * @return the new user's ID if creation was successful
    */
  def createUser(user: UserData): Future[Option[Int]] = {
    val matches = db.run(Users.filter(userRow => userRow.username === user.username).result)
    matches.flatMap { userRows =>
      if (userRows.isEmpty) {
        db.run(Users += UsersRow(-1, user.username, BCrypt.hashpw(user.password, BCrypt.gensalt()), 
                                 user.major, user.graduationYear, user.githubLink))
          .flatMap { addCount => 
            if (addCount > 0) db.run(Users.filter(userRow => userRow.username === user.username).result)
              .map(_.headOption.map(_.id))
            else Future.successful(None)
          }
      } else Future.successful(None)
    }
  }
  
  /**
    * Return all data of a user given a user's ID
    *
    * @param userId
    * @return a user's data if it exists in database
    */
  def getUserData(userId: Int): Future[Option[UserData]] = {
    val matches = db.run(Users.filter(userRow => userRow.id === userId).result)
    matches.map(userRows => userRows.headOption match {
      case None => None
      case Some(user) => Some(UserData(user.username, user.password, user.major, user.graduationyear, user.githublink)) 
    })
  }
  
  /**
    * Return all data of a user given a username
    *
    * @param userId
    * @return a user's data if it exists in database
    */
  def getUserData(username: String): Future[Option[UserData]] = {
    val matches = db.run(Users.filter(userRow => userRow.username === username).result)
    matches.map(userRows => userRows.headOption match {
      case None => None
      case Some(user) => Some(UserData(user.username, user.password, user.major, user.graduationyear, user.githublink)) 
    })
  }
}

case class UserData(username: String, password: String, major: String,
                    graduationYear: Int, githubLink: Option[String])