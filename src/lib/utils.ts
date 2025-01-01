import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Keep general utilities here
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
