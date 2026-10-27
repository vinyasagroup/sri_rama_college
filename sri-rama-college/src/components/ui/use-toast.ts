export type ToastOptions = {
  title?: string
  description?: string
  duration?: number
}

export function toast(_options: ToastOptions) {
  // Minimal implementation to keep builds/types happy.
  // Replace with a real toast UI later if desired.
}

export function useToast() {
  return { toast }
}
