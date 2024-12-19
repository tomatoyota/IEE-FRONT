const { transform } = require('@vue/compiler-core')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    screens: {
      md: '768px', // 平板尺寸
      lg: '992px', // 桌上型電腦尺寸
      xl: '1200px' // 大型螢幕尺寸
    },
    container: {
      padding: {
        DEFAULT: '16px',
        md: '22px',
        lg: '24px',
        xl: '0px'
      }
    },
    extend: {
      boxShadow: {
        normal: '0px 0px 10px 0px rgba(0, 0, 0, 0.10)'
      },
      colors: {
        hoverColor: 'rgba(34, 34, 34, 0.05)',
        logoColor: '#1B2482',
        lightDark: '#4E4E4E'
      },
      listStyleType: {
        alpha: 'lower-alpha',
        ideographic: 'cjk-ideographic'
      },
      keyframes: {
        fadedown: {
          '0%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' }
        },
        moveRight: {
          '0%,100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' }
        },
        circleFloatUpDown: {
          '0%,100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-15px)'
          }
        },
        shadowFloatUpDown: {
          '0%,100%': {
            transform: 'translateY(0)',
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'translateY(-30px)',
            transform: 'scale(0.9)'
          }
        },
        typingCursor: {
          '0%,100%': {
            background: 'transparent'
          },
          '50%': {
            background: '#1B2482'
          }
        },
        typingText: {
          '0%': {
            width: '0'
          },
          '100%': {
            width: '100%'
          }
        }
      }
    }
  },
  plugins: []
}
