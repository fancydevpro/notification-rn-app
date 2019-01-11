import registerScreens from './Screens'
import { startSingleScreenApp, setGlobalOptions } from './global/App'
import { initStore } from './Stores'

initStore()
registerScreens()
setGlobalOptions()
startSingleScreenApp()
