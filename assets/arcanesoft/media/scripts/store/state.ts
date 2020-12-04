import { reactive, provide, inject, UnwrapRef } from 'vue'
import { DISPLAY_MODES, MEDIA_TOOLS } from '../enums'
import { MediaItems } from '../types'
import config from '../config'

export type State = {
    loading:       boolean
    location:      string
    tool:          MEDIA_TOOLS | null
    previewMode:   boolean
    items:         MediaItems
    selectedItems: MediaItems
    displayMode:   DISPLAY_MODES
}

export const createState = (): UnwrapRef<State> => reactive({
    loading:       false,
    location:      '/',
    tool:          null,
    previewMode:   config.previewMode,
    items:         [],
    selectedItems: [],
    displayMode:   config.defaultDisplayMode,
})

export const stateSymbol = Symbol('media-state')

export const useState = (): State => inject(stateSymbol)

export const provideState = (): void => provide(stateSymbol, createState())

