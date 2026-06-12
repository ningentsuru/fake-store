export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    header: {
      slots: {
        toggle: 'md:hidden',
        content: 'md:hidden',
        overlay: 'md:hidden'
      }
    }
  }
})
