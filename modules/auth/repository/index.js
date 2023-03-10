const table = "users"

module.exports = (knex) => {
  module.getUserByAttribute = (attr, payload, type) => {
    let sql = knex(table).select("*", knex.raw("? as ??", [type, "type"]))
    switch (type) {
      case "customers":
        sql = sql
          .select("customers.id as type_id")
          .innerJoin("customers", "customers.user_id", "=", "users.id")
        break
      case "employees":
        sql = sql
          .select("employees.id as type_id")
          .innerJoin("employees", "employees.user_id", "=", "users.id")
        break
      case "stores":
        sql = sql
          .select("stores.id as type_id")
          .innerJoin("stores", "stores.user_id", "=", "users.id")
        break

      default:
        throw new Error("Error")
    }
    return (sql = sql.where(attr, payload)).first()
  }

  module.createUser = (payload) => {
    return knex.transaction(function (trx) {
      return trx
        .insert({
          email: payload.email,
          password: payload.password,
        })
        .into(table)
        .then((ids) => {
          return trx(payload.type).insert({
            phone: payload.phone,
            name: payload.name,
            user_id: ids[0],
          })
        })
    })
  }

  return module
}
