import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import {App} from './app'

const appDom = document.createElement('div')
document.body.appendChild(appDom)
ReactDOM.render(<AppContainer><App /></AppContainer>, appDom)


if (module.hot) {
  module.hot.accept('./app', () => {
    const UpdatedApp = require('./app').App
    ReactDOM.render(<AppContainer><UpdatedApp /></AppContainer>, appDom)
  })
}


function init() {
  const head = document.getElementsByTagName('head')[0]
  const metaViewport = document.createElement('meta')
  metaViewport.setAttribute('name', 'viewport')
  metaViewport.setAttribute(
    'content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
  head.appendChild(metaViewport);

  [...document.getElementsByTagName('title')].
    forEach(titleElement => titleElement.textContent = 'Mime-Express')

  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
    })
  }
}
init()
