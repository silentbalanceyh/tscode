import {createSelectorCreator, defaultMemoize} from 'reselect'
import {isEqual} from 'lodash'

const $$_CacheSelector = state => state.content.cache
const $$_ControlSelector = state => state.content.controls
const $$_DataSelector = state => state.content.data
const $$_QuerySelector = state => state.content.query
const $$_StatusSelector = state => state.content.status
const $$_UexSelector = state => state.content.uex
const $$_AppSelector = state => state.app.config
const $$_AppStatusSelector = state => state.app.status
const $$_UiSelector = state => state.content.ui

const _vector = (status, ui, app, etat) => ({
  status,
  ui,
  app,
  etat
})

const $$_CreateSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

export default {
  ModSelector: $$_CreateSelector(
    [
      $$_StatusSelector,
      $$_UiSelector,
      $$_AppSelector,
      $$_AppStatusSelector
    ],
    _vector
  )
}
