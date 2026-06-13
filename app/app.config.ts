export default defineAppConfig({
  ui: {
    main: {
      base: 'min-h-[calc(100vh-var(--ui-header-height)-var(--ui-footer-height)-20px)]'
    },
    pageHero: {
      slots: {
        container: '!py-6'
      }
    },
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
