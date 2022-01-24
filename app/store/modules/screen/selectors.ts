import { TState } from 'app/store/store'

export const getScreen = (state: TState) => state.screen.screen
export const getShowNav = (state: TState) => state.screen.showNav
