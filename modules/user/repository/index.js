const table = "users"

module.exports = (knex) => {
  module.getUsers = (type, { perpage, currentPage }) => {
    let url = type.replace("/", "")
    if (url == "") {
      url = "customers"
    }
    let sql = knex(table)
    switch (url) {
      case "customers":
        sql = sql.innerJoin("customers", "customers.user_id", "=", "users.id")
        break
      case "employees":
        sql = sql.innerJoin("employees", "employees.user_id", "=", "users.id")
        break
      case "stores":
        sql = sql.innerJoin("stores", "stores.user_id", "=", "users.id")
        break
      default:
        throw new Error("Error")
    }

    return sql.paginate({ perpage, currentPage }).then((data) => {
      const result = data.data.map((data) => {
        delete data.password
        return data
      })

      return {
        data: result,
        pagination: data.pagination,
      }
    })
  }

  module.getUserById = (type, id) => {
    let sql = knex(table)
    switch (type) {
      case "customers":
        sql = sql.innerJoin("customers", "customers.user_id", "=", "users.id")
        break
      case "employees":
        sql = sql.innerJoin("employees", "employees.user_id", "=", "users.id")
        break
      case "stores":
        sql = sql.innerJoin("stores", "stores.user_id", "=", "users.id")
        break
      default:
        throw new Error("Error")
    }

    return sql
      .where(type + ".id", id)
      .first()
      .then((data) => {
        if (data) {
          delete data.password
          return { data }
        }
      })
  }

  module.getUserByAttribute = (attr, payload) => {
    return knex(table)
      .where(attr, payload.param)
      .innerJoin(payload.type, payload.type + ".user_id", "=", "users.id")
      .first()
  }

  module.getUserByAttrWhereNot = (attr1, payload1, attr2, payload2, type) => {
    return knex(table)
      .where(attr1, payload1)
      .whereNot(`${type}.${attr2}`, payload2)
      .innerJoin(type, type + ".user_id", "=", "users.id")
      .first()
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

  module.updateUser = (id, payload) => {
    return knex(table)
      .where("id", payload.user_id)
      .update({ email: payload.email, password: payload.password })
      .then(() => {
        knex(payload.type)
          .where("id", id)
          .update({ name: payload.name, phone: payload.phone })
      })
  }

  module.deleteUser = (id, userId, type) => {
    return knex(type)
      .where("id", id)
      .del()
      .then(() => {
        knex(table).where("id", userId).del()
      })
  }

  return module
}
