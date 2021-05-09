package models

object CodeGen extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile",
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost/trininit?user=emersonspradling&password=password",
    "/Users/emersonspradling/Developer/WebApps (3345)/TrinInitFinal/server/app",
    "models", None, None, true, false
  )
}