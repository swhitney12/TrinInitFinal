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
  lazy val schema: profile.SchemaDescription = Array(Projectcomments.schema, Projectlikes.schema, Projects.schema, Projecttags.schema, Tags.schema, Userprojects.schema, Users.schema, Usertags.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Projectcomments
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param projectid Database column projectid SqlType(int4), Default(None)
   *  @param userid Database column userid SqlType(int4), Default(None)
   *  @param creationdate Database column creationdate SqlType(timestamp)
   *  @param comment Database column comment SqlType(varchar), Length(2000,true) */
  case class ProjectcommentsRow(id: Int, projectid: Option[Int] = None, userid: Option[Int] = None, creationdate: Option[java.sql.Timestamp], comment: String)
  /** GetResult implicit for fetching ProjectcommentsRow objects using plain SQL queries */
  implicit def GetResultProjectcommentsRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Option[java.sql.Timestamp]], e3: GR[String]): GR[ProjectcommentsRow] = GR{
    prs => import prs._
    ProjectcommentsRow.tupled((<<[Int], <<?[Int], <<?[Int], <<?[java.sql.Timestamp], <<[String]))
  }
  /** Table description of table projectcomments. Objects of this class serve as prototypes for rows in queries. */
  class Projectcomments(_tableTag: Tag) extends profile.api.Table[ProjectcommentsRow](_tableTag, "projectcomments") {
    def * = (id, projectid, userid, creationdate, comment) <> (ProjectcommentsRow.tupled, ProjectcommentsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), projectid, userid, creationdate, Rep.Some(comment))).shaped.<>({r=>import r._; _1.map(_=> ProjectcommentsRow.tupled((_1.get, _2, _3, _4, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column projectid SqlType(int4), Default(None) */
    val projectid: Rep[Option[Int]] = column[Option[Int]]("projectid", O.Default(None))
    /** Database column userid SqlType(int4), Default(None) */
    val userid: Rep[Option[Int]] = column[Option[Int]]("userid", O.Default(None))
    /** Database column creationdate SqlType(timestamp) */
    val creationdate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("creationdate")
    /** Database column comment SqlType(varchar), Length(2000,true) */
    val comment: Rep[String] = column[String]("comment", O.Length(2000,varying=true))

    /** Foreign key referencing Projects (database name projectcomments_projectid_fkey) */
    lazy val projectsFk = foreignKey("projectcomments_projectid_fkey", projectid, Projects)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Users (database name projectcomments_userid_fkey) */
    lazy val usersFk = foreignKey("projectcomments_userid_fkey", userid, Users)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Projectcomments */
  lazy val Projectcomments = new TableQuery(tag => new Projectcomments(tag))

  /** Entity class storing rows of table Projectlikes
   *  @param userid Database column userid SqlType(int4), Default(None)
   *  @param projectid Database column projectid SqlType(int4), Default(None) */
  case class ProjectlikesRow(userid: Option[Int] = None, projectid: Option[Int] = None)
  /** GetResult implicit for fetching ProjectlikesRow objects using plain SQL queries */
  implicit def GetResultProjectlikesRow(implicit e0: GR[Option[Int]]): GR[ProjectlikesRow] = GR{
    prs => import prs._
    ProjectlikesRow.tupled((<<?[Int], <<?[Int]))
  }
  /** Table description of table projectlikes. Objects of this class serve as prototypes for rows in queries. */
  class Projectlikes(_tableTag: Tag) extends profile.api.Table[ProjectlikesRow](_tableTag, "projectlikes") {
    def * = (userid, projectid) <> (ProjectlikesRow.tupled, ProjectlikesRow.unapply)

    /** Database column userid SqlType(int4), Default(None) */
    val userid: Rep[Option[Int]] = column[Option[Int]]("userid", O.Default(None))
    /** Database column projectid SqlType(int4), Default(None) */
    val projectid: Rep[Option[Int]] = column[Option[Int]]("projectid", O.Default(None))

    /** Foreign key referencing Projects (database name projectlikes_projectid_fkey) */
    lazy val projectsFk = foreignKey("projectlikes_projectid_fkey", projectid, Projects)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Users (database name projectlikes_userid_fkey) */
    lazy val usersFk = foreignKey("projectlikes_userid_fkey", userid, Users)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Projectlikes */
  lazy val Projectlikes = new TableQuery(tag => new Projectlikes(tag))

  /** Entity class storing rows of table Projects
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param ownerid Database column ownerid SqlType(int4), Default(None)
   *  @param name Database column name SqlType(varchar), Length(20,true)
   *  @param description Database column description SqlType(varchar), Length(2000,true)
   *  @param repositorylink Database column repositorylink SqlType(varchar), Length(100,true), Default(None)
   *  @param creationdate Database column creationdate SqlType(timestamp) */
  case class ProjectsRow(id: Int, ownerid: Option[Int] = None, name: String, description: String, repositorylink: Option[String] = None, creationdate: Option[java.sql.Timestamp])
  /** GetResult implicit for fetching ProjectsRow objects using plain SQL queries */
  implicit def GetResultProjectsRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[String], e3: GR[Option[String]], e4: GR[Option[java.sql.Timestamp]]): GR[ProjectsRow] = GR{
    prs => import prs._
    ProjectsRow.tupled((<<[Int], <<?[Int], <<[String], <<[String], <<?[String], <<?[java.sql.Timestamp]))
  }
  /** Table description of table projects. Objects of this class serve as prototypes for rows in queries. */
  class Projects(_tableTag: Tag) extends profile.api.Table[ProjectsRow](_tableTag, "projects") {
    def * = (id, ownerid, name, description, repositorylink, creationdate) <> (ProjectsRow.tupled, ProjectsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), ownerid, Rep.Some(name), Rep.Some(description), repositorylink, creationdate)).shaped.<>({r=>import r._; _1.map(_=> ProjectsRow.tupled((_1.get, _2, _3.get, _4.get, _5, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column ownerid SqlType(int4), Default(None) */
    val ownerid: Rep[Option[Int]] = column[Option[Int]]("ownerid", O.Default(None))
    /** Database column name SqlType(varchar), Length(20,true) */
    val name: Rep[String] = column[String]("name", O.Length(20,varying=true))
    /** Database column description SqlType(varchar), Length(2000,true) */
    val description: Rep[String] = column[String]("description", O.Length(2000,varying=true))
    /** Database column repositorylink SqlType(varchar), Length(100,true), Default(None) */
    val repositorylink: Rep[Option[String]] = column[Option[String]]("repositorylink", O.Length(100,varying=true), O.Default(None))
    /** Database column creationdate SqlType(timestamp) */
    val creationdate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("creationdate")

    /** Foreign key referencing Users (database name projects_ownerid_fkey) */
    lazy val usersFk = foreignKey("projects_ownerid_fkey", ownerid, Users)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Projects */
  lazy val Projects = new TableQuery(tag => new Projects(tag))

  /** Entity class storing rows of table Projecttags
   *  @param projectid Database column projectid SqlType(int4), Default(None)
   *  @param tagid Database column tagid SqlType(int4), Default(None) */
  case class ProjecttagsRow(projectid: Option[Int] = None, tagid: Option[Int] = None)
  /** GetResult implicit for fetching ProjecttagsRow objects using plain SQL queries */
  implicit def GetResultProjecttagsRow(implicit e0: GR[Option[Int]]): GR[ProjecttagsRow] = GR{
    prs => import prs._
    ProjecttagsRow.tupled((<<?[Int], <<?[Int]))
  }
  /** Table description of table projecttags. Objects of this class serve as prototypes for rows in queries. */
  class Projecttags(_tableTag: Tag) extends profile.api.Table[ProjecttagsRow](_tableTag, "projecttags") {
    def * = (projectid, tagid) <> (ProjecttagsRow.tupled, ProjecttagsRow.unapply)

    /** Database column projectid SqlType(int4), Default(None) */
    val projectid: Rep[Option[Int]] = column[Option[Int]]("projectid", O.Default(None))
    /** Database column tagid SqlType(int4), Default(None) */
    val tagid: Rep[Option[Int]] = column[Option[Int]]("tagid", O.Default(None))

    /** Foreign key referencing Projects (database name projecttags_projectid_fkey) */
    lazy val projectsFk = foreignKey("projecttags_projectid_fkey", projectid, Projects)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Tags (database name projecttags_tagid_fkey) */
    lazy val tagsFk = foreignKey("projecttags_tagid_fkey", tagid, Tags)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Projecttags */
  lazy val Projecttags = new TableQuery(tag => new Projecttags(tag))

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

  /** Entity class storing rows of table Userprojects
   *  @param userid Database column userid SqlType(int4), Default(None)
   *  @param projectid Database column projectid SqlType(int4), Default(None) */
  case class UserprojectsRow(userid: Option[Int] = None, projectid: Option[Int] = None)
  /** GetResult implicit for fetching UserprojectsRow objects using plain SQL queries */
  implicit def GetResultUserprojectsRow(implicit e0: GR[Option[Int]]): GR[UserprojectsRow] = GR{
    prs => import prs._
    UserprojectsRow.tupled((<<?[Int], <<?[Int]))
  }
  /** Table description of table userprojects. Objects of this class serve as prototypes for rows in queries. */
  class Userprojects(_tableTag: Tag) extends profile.api.Table[UserprojectsRow](_tableTag, "userprojects") {
    def * = (userid, projectid) <> (UserprojectsRow.tupled, UserprojectsRow.unapply)

    /** Database column userid SqlType(int4), Default(None) */
    val userid: Rep[Option[Int]] = column[Option[Int]]("userid", O.Default(None))
    /** Database column projectid SqlType(int4), Default(None) */
    val projectid: Rep[Option[Int]] = column[Option[Int]]("projectid", O.Default(None))

    /** Foreign key referencing Projects (database name userprojects_projectid_fkey) */
    lazy val projectsFk = foreignKey("userprojects_projectid_fkey", projectid, Projects)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Users (database name userprojects_userid_fkey) */
    lazy val usersFk = foreignKey("userprojects_userid_fkey", userid, Users)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Userprojects */
  lazy val Userprojects = new TableQuery(tag => new Userprojects(tag))

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
