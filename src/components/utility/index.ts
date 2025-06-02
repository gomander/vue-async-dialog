import DialogContent1 from './DialogContent1.vue'
import DialogContent2 from './DialogContent2.vue'
import ErrorComponent from './Error.vue'
import LoadingComponent from './Loading.vue'

const asyncCompSettings = {
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
}

export { DialogContent1, DialogContent2, ErrorComponent, LoadingComponent, asyncCompSettings }
