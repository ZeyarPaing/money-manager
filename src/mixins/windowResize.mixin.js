import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      winMaxX: 0,
      winMaxY: 0,
    }
  },
  mounted() {
    window.addEventListener(
      'resize',
      debounce(() => this.windowHandleResize(), 300),
    )
    this.windowHandleResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowHandleResize)
  },
  methods: {
    windowHandleResize() {
      this.winMaxX = window.innerWidth
      this.winMaxY = window.innerHeight
    },
  },
}
