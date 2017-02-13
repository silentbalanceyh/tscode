import {createSelector} from 'reselect'

const $$_UserSelector = state => state.app.user
const $$_AppSelector = state => state.app.config
const $$_DataSelector = state => state.app.data
const $$_SliceSelector = state => state.app.slice
const $$_StatusSelector = state => state.app.status

const _vector = (user, data, config, slice, status) => ({
  user,
  config,
  data,
  slice,
  status
})

export default {
  AppSelector: createSelector(
    [
      $$_UserSelector,
      $$_DataSelector,
      $$_AppSelector,
      $$_SliceSelector,
      $$_StatusSelector
    ],
    _vector
  )
}
