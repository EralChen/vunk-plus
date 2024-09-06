import { Crowdin } from '../shared/crowdin'

declare global {
  namespace Vike {
    interface PageContext {
      // Type of pageContext.user
      crowdin: Crowdin

    }
  }
}
 
// If you define Vike.PageContext in a .d.ts file then
// make sure there is at least one export/import statment.
// Tell TypeScript this file isn't an ambient module:
export {}