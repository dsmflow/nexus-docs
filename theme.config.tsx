import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import AuthStatus from './components/AuthStatus'

const config: DocsThemeConfig = {
  logo: <span>Nexus Docs</span>,
  project: {
    link: 'https://github.com/dsmflow/nexus-docs',
  },
  docsRepositoryBase: 'https://github.com/dsmflow/nexus-docs',
  footer: {
    text: 'Nexus Trading Documentation ' + new Date().getFullYear(),
  },
  head: (
    <>
      <meta name="description" content="Documentation for Nexus Trading - A comprehensive suite of stock analysis methods enhanced with AI/ML" />
      <meta name="og:title" content="Nexus Trading Documentation" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Nexus Docs'
    }
  },
  navbar: {
    extraContent: () => <AuthStatus />
  }
}

export default config
