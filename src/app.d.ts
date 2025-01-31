// src/app.d.ts
import '@auth/sveltekit'

declare global {
  namespace App {
    interface Locals {
      getSession(): Promise<import('@auth/core').Session | null>
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}

export {};