const table = "users"

module.exports = (knex) => {
  module.getUserByAttribute = (attr, payload, type) => {
    let sql = knex(table).select("*", knex.raw("? as ??", [type, "type"]))
    switch (type) {
      case "customers":
        sql = sql.innerJoin("customers", "customers.user_id", "=", "users.id")
        break
      case "employees":
        sql = sql.innerJoin("employees", "employees.user_id", "=", "users.id")
        break
      case "stores":
        sql = sql.innerJoin("stroes", "stroes.user_id", "=", "users.id")
        break

      default:
        throw new Error("Error")
    }

    return (sql = sql.where(attr, payload)).first()
  }

  module.createUser = (payload) => {
    return knex(table).insert(payload)
  }

  return module
}
