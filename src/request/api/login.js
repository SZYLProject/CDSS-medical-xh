import {
  post
} from '../http'
const login = {
  apiPostUserLogin: p => post('/v1/userLogin', p),
  apiPostUserLogout: p => post('/v1/logout')

}

export default login
