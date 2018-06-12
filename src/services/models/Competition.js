import {BaseURL} from '@/utils/decorators'
import Base from './Base'

@BaseURL('/competition')
class Competition extends Base {
  constructor () {
    super()
  }
  
  find ({page = 1} = {}) {
    return super.find({page}, '/list')
  }
}

export default new Competition()
