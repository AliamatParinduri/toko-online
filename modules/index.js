const knex = require("../knex")

const repository = require("./repository")
const usecase = require("./usecase")
const delivery = require("./delivery")

exports.initial = async (app, express) => {
  const categoriesRepo = repository.newCategoriesRepository(knex)
  const categoriesUseCase = usecase.newCategoriesUseCase(categoriesRepo)
  delivery.newCategoriesController(app, express, categoriesUseCase)

  const couponsRepo = repository.newCouponsRepository(knex)
  const couponsUseCase = usecase.newCouponsUseCase(couponsRepo)
  delivery.newCouponsController(app, express, couponsUseCase)

  const usersRepo = repository.newUsersRepository(knex)
  const usersUseCase = usecase.newUsersUseCase(usersRepo)
  delivery.newUsersController(app, express, usersUseCase)

  const productsRepo = repository.newProductsRepository(knex)
  const productsUseCase = usecase.newProductsUseCase(productsRepo)
  delivery.newProductsController(app, express, productsUseCase)

  const authRepo = repository.newAuthRepository(knex)
  const authUseCase = usecase.newAuthUseCase(authRepo)
  delivery.newAuthController(app, express, authUseCase)

  const cartRepo = repository.newCartRepository(knex)
  const cartUseCase = usecase.newCartUseCase(cartRepo)
  delivery.newCartController(app, express, cartUseCase)
}
