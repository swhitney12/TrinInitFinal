package models

import java.sql.Timestamp
import play.api.libs.json._

object ImplicitJsonConversions {
  implicit val timestampReads: Reads[Timestamp] = {
      implicitly[Reads[Long]].map(new Timestamp(_))
  }

  implicit val timestampWrites: Writes[Timestamp] = {
    implicitly[Writes[Long]].contramap(_.getTime)
  }

  implicit val userDataWrites = Json.writes[UserData]
  implicit val userDataReads = Json.reads[UserData]
  implicit val projectDataWrites = Json.writes[ProjectData]
  implicit val projectDataReads = Json.reads[ProjectData]
}