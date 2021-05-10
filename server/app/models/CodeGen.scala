package models

object CodeGen extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile",
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost/trininit?user=kcrusius&password=password",
    "/Users/kevin/Desktop/webAppsFinalProj/TrinInitFinal/server/app",
    "models", None, None, true, false
  )
}

