const knex = require("../knexmain")
const { listModules } = require("../helper/listOfModules")

const datas = listModules

exports.initial = async (app, express) => {
  for (const [i, data] of datas.entries()) {
    let newController = "controller" + i
    let newRepository = "repository" + i
    let newUsecase = "usecase" + i

    newController = require("./" + data + "/delivery/http")
    newRepository = require("./" + data + "/repository")
    newUsecase = require("./" + data + "/usecase")

    const categoriesRepo = newRepository(knex)
    const categoriesUseCase = newUsecase(categoriesRepo)
    newController(app, express, categoriesUseCase)
  }
}
