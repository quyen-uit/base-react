/**
 * Type definitions for CSS Modules
 * This enables TypeScript support for .module.css imports
 */

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
