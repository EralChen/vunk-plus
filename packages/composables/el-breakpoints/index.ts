import { useBreakpoints } from '@vueuse/core'

export function useElBreakpoints () {
  const breakpoints = useBreakpoints({
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1920,
  })
  const isMobile = breakpoints.smaller('lg')
  const isDesktop = breakpoints.greaterOrEqual('lg')
  return {
    breakpoints,
    isMobile,
    isDesktop,
  }
}
