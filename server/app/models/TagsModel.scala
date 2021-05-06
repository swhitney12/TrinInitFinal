package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future

class TagsModel(db: Database)(implicit ec: ExecutionContext) {
  
  /**
    * Find the associated tags for a user given a username
    *
    * @param username
    * @return a Seq of tags (string) if the user exists
    */
  def getUsersTags(username: String): Future[Option[Seq[String]]] = {
    db.run(Users.filter(userRow => userRow.username === username).result)
      .flatMap(userRows => userRows.headOption match {
        case None => Future.successful(None)
        case Some(user) => db.run(Usertags
          .filter(ut => ut.userid === user.id).join(Tags).on(_.tagid === _.id)
          .map(tup => tup._2.tag).result).map(Some(_))
      })
  }

  /**
    * Finds the associated tags for a user given a user's ID
    *
    * @param userId
    * @return a Seq of tags (string) if the user exists
    */
  def getUsersTags(userId: Int): Future[Option[Seq[String]]] = {
    db.run(Usertags.filter(ut => ut.userid === userId).join(Tags).on(_.tagid === _.id)
      .map(tup => tup._2.tag).result)map(s => if (s.isEmpty) None else Some(s))
  }
}