import { id } from './module'
console.log(id)

const btn = document.getElementById('async-btn')
btn.addEventListener('click', () => {
  console.log('click')
  import(/* webpackChunkName: "asyncModule" */ './asyncModule.js').then(m => m.test())
})
