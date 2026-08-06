import PortfolioController from './PortfolioController'
import Admin from './Admin'
const Controllers = {
    PortfolioController: Object.assign(PortfolioController, PortfolioController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers