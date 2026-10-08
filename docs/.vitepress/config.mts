import { defineConfig, type DefaultTheme } from 'vitepress'

// On GitHub Pages the site lives under /<repo-name>/. The workflow sets BASE
// from the repository name, so renaming the repo needs no code change.
const base = process.env.BASE ?? '/spark-sprint-guide/'

type Labels = {
  home: string
  groupGuide: string
  event: string
  plan: string
  setup: string
  python: string
  typing: string
  resources: string
}

function sidebar(prefix: string, t: Labels): DefaultTheme.SidebarItem[] {
  return [
    {
      text: t.groupGuide,
      items: [
        { text: t.home, link: `${prefix}/` },
        { text: t.event, link: `${prefix}/event` },
        { text: t.plan, link: `${prefix}/plan` },
        { text: t.setup, link: `${prefix}/setup` },
        { text: t.python, link: `${prefix}/python-for-java` },
        { text: t.typing, link: `${prefix}/typing-mypy-coverage` },
        { text: t.resources, link: `${prefix}/resources` }
      ]
    }
  ]
}

function nav(prefix: string, t: Labels): DefaultTheme.NavItem[] {
  return [
    { text: t.plan, link: `${prefix}/plan` },
    { text: t.setup, link: `${prefix}/setup` },
    { text: t.resources, link: `${prefix}/resources` }
  ]
}

const en: Labels = {
  home: 'Overview',
  groupGuide: 'Guide',
  event: 'The event',
  plan: '30-hour plan',
  setup: 'Spark setup checklist',
  python: 'Python for Java developers',
  typing: 'Typing, mypy & coverage',
  resources: 'Resources'
}

const es: Labels = {
  home: 'Resumen',
  groupGuide: 'Guía',
  event: 'El evento',
  plan: 'Plan de 30 horas',
  setup: 'Checklist de Spark',
  python: 'Python para devs de Java',
  typing: 'Tipado, mypy y coverage',
  resources: 'Recursos'
}

const zh: Labels = {
  home: '總覽',
  groupGuide: '指南',
  event: '活動資訊',
  plan: '30 小時計畫',
  setup: 'Spark 環境檢查表',
  python: '給 Java 開發者的 Python',
  typing: '型別、mypy 與 coverage',
  resources: '資源連結'
}

export default defineConfig({
  base,
  title: 'Spark Sprint Guide',
  cleanUrls: true,
  head: [['meta', { name: 'robots', content: 'index, follow' }]],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      description: 'From Java to your first Apache Spark PR in about 30 hours.',
      themeConfig: {
        nav: nav('', en),
        sidebar: sidebar('', en),
        outline: { label: 'On this page' },
        footer: {
          message: 'Unofficial community guide. Not affiliated with PyCon TW, the ASF or Apache Spark.',
          copyright: 'MIT License'
        }
      }
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      description: 'De Java a tu primer PR en Apache Spark en unas 30 horas.',
      themeConfig: {
        nav: nav('/es', es),
        sidebar: sidebar('/es', es),
        outline: { label: 'En esta página' },
        docFooter: { prev: 'Anterior', next: 'Siguiente' },
        sidebarMenuLabel: 'Menú',
        returnToTopLabel: 'Volver arriba',
        langMenuLabel: 'Idioma',
        darkModeSwitchLabel: 'Apariencia',
        footer: {
          message: 'Guía comunitaria no oficial. Sin afiliación con PyCon TW, la ASF ni Apache Spark.',
          copyright: 'Licencia MIT'
        }
      }
    },
    'zh-TW': {
      label: '繁體中文',
      lang: 'zh-TW',
      link: '/zh-TW/',
      description: '約 30 小時，從 Java 走到你的第一個 Apache Spark PR。',
      themeConfig: {
        nav: nav('/zh-TW', zh),
        sidebar: sidebar('/zh-TW', zh),
        outline: { label: '本頁目錄' },
        docFooter: { prev: '上一頁', next: '下一頁' },
        sidebarMenuLabel: '選單',
        returnToTopLabel: '回到頂端',
        langMenuLabel: '語言',
        darkModeSwitchLabel: '外觀',
        footer: {
          message: '非官方社群指南，與 PyCon TW、ASF 及 Apache Spark 無隸屬關係。',
          copyright: 'MIT 授權'
        }
      }
    }
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          es: {
            translations: {
              button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' },
              modal: {
                noResultsText: 'Sin resultados para',
                resetButtonTitle: 'Borrar búsqueda',
                footer: { selectText: 'seleccionar', navigateText: 'navegar', closeText: 'cerrar' }
              }
            }
          },
          'zh-TW': {
            translations: {
              button: { buttonText: '搜尋', buttonAriaLabel: '搜尋' },
              modal: {
                noResultsText: '找不到結果：',
                resetButtonTitle: '清除搜尋',
                footer: { selectText: '選取', navigateText: '切換', closeText: '關閉' }
              }
            }
          }
        }
      }
    }
  }
})
