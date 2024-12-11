import type { Media, NormalObject } from '@vunk/shared'

export enum CrowdinFileLang {
  zhCN = 'zh-CN',
  enUS = 'en-US',
}

export enum CrowdinFilePath {
  component = 'pages/component.json',
  nav = 'pages/nav.json',
  guide = 'pages/guide.json',
}

export interface CrowdinFile<
  S = any,
> {
  lang: string
  path: string
  basename: string
  source: S
}

export interface CrowdinFileLangMedia {
  label: string
  value: CrowdinFileLang
  glob: Record<string, () => Promise<NormalObject>>
}

/* json type */

/**
 * @description CrowdinFilePath.nav
 */
export interface NavRaw extends Media {
  value: string
  path: string
  redirect?: string
}

/**
 * @description CrowdinFilePath.guide | CrowdinFilePath.component
 */
export interface MenuRaw {
  text: string
  link?: string
  children: MenuRaw[]
}

/* endof  json type */
