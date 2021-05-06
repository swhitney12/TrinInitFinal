package models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.jdbc.PostgresProfile
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.jdbc.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Tags.schema ++ Users.schema ++ Usertags.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Tags
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param tag Database column tag SqlType(varchar), Length(50,true) */
  case class TagsRow(id: Int, tag: String)
  /** GetResult implicit for fetching TagsRow objects using plain SQL queries */
  implicit def GetResultTagsRow(implicit e0: GR[Int], e1: GR[String]): GR[TagsRow] = GR{
    prs => import prs._
    TagsRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table tags. Objects of this class serve as prototypes for rows in queries. */
  class Tags(_tableTag: Tag) extends profile.api.Table[TagsRow](_tableTag, "tags") {
    def * = (id, tag) <> (TagsRow.tupled, TagsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(tag))).shaped.<>({r=>import r._; _1.map(_=> TagsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column tag SqlType(varchar), Length(50,true) */
    val tag: Rep[String] = column[String]("tag", O.Length(50,varying=true))
  }
  /** Collection-like TableQuery object for table Tags */
  lazy val Tags = new TableQuery(tag => new Tags(tag))

  /** Entity class storing rows of table Users
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param username Database column username SqlType(varchar), Length(20,true)
   *  @param password Database column password SqlType(varchar), Length(200,true)
   *  @param major Database column major SqlType(varchar), Length(50,true)
   *  @param graduationyear Database column graduationyear SqlType(int4)
   *  @param githublink Database column githublink SqlType(varchar), Length(50,true), Default(None) */
  case class UsersRow(id: Int, username: String, password: String, major: String, graduationyear: Int, githublink: Option[String] = None)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]]): GR[UsersRow] = GR{
    prs => import prs._
    UsersRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[Int], <<?[String]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends profile.api.Table[UsersRow](_tableTag, "users") {
    def * = (id, username, password, major, graduationyear, githublink) <> (UsersRow.tupled, UsersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(username), Rep.Some(password), Rep.Some(major), Rep.Some(graduationyear), githublink)).shaped.<>({r=>import r._; _1.map(_=> UsersRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column username SqlType(varchar), Length(20,true) */
    val username: Rep[String] = column[String]("username", O.Length(20,varying=true))
    /** Database column password SqlType(varchar), Length(200,true) */
    val password: Rep[String] = column[String]("password", O.Length(200,varying=true))
    /** Database column major SqlType(varchar), Length(50,true) */
    val major: Rep[String] = column[String]("major", O.Length(50,varying=true))
    /** Database column graduationyear SqlType(int4) */
    val graduationyear: Rep[Int] = column[Int]("graduationyear")
    /** Database column githublink SqlType(varchar), Length(50,true), Default(None) */
    val githublink: Rep[Option[String]] = column[Option[String]]("githublink", O.Length(50,varying=true), O.Default(None))
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))

  /** Entity class storing rows of table Usertags
   *  @param userid Database column userid SqlType(int4), Default(None)
   *  @param tagid Database column tagid SqlType(int4), Default(None) */
  case class UsertagsRow(userid: Option[Int] = None, tagid: Option[Int] = None)
  /** GetResult implicit for fetching UsertagsRow objects using plain SQL queries */
  implicit def GetResultUsertagsRow(implicit e0: GR[Option[Int]]): GR[UsertagsRow] = GR{
    prs => import prs._
    UsertagsRow.tupled((<<?[Int], <<?[Int]))
  }
  /** Table description of table usertags. Objects of this class serve as prototypes for rows in queries. */
  class Usertags(_tableTag: Tag) extends profile.api.Table[UsertagsRow](_tableTag, "usertags") {
    def * = (userid, tagid) <> (UsertagsRow.tupled, UsertagsRow.unapply)

    /** Database column userid SqlType(int4), Default(None) */
    val userid: Rep[Option[Int]] = column[Option[Int]]("userid", O.Default(None))
    /** Database column tagid SqlType(int4), Default(None) */
    val tagid: Rep[Option[Int]] = column[Option[Int]]("tagid", O.Default(None))

    /** Foreign key referencing Tags (database name usertags_tagid_fkey) */
    lazy val tagsFk = foreignKey("usertags_tagid_fkey", tagid, Tags)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Users (database name usertags_userid_fkey) */
    lazy val usersFk = foreignKey("usertags_userid_fkey", userid, Users)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Usertags */
  lazy val Usertags = new TableQuery(tag => new Usertags(tag))
}
