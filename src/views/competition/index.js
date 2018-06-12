import '@/index.js'
import './index.scss'
import $ from '$'
import store from 'store'
import ListItem from './children/ListItem/index.hbs'
import {Competition} from '@/services/models'

$(async () => {
  const $list = $('#list-wrapper')

  // 初始化列表
  let {list} = await Competition.find()
  let html = list.map(_ => ListItem(_))
  $list.html(html)

  // 初始化事件
})
