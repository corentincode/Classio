// Types de transition disponibles
export type TransitionType = "fade" | "none"

export const getTransitionForRoute = (pathname: string): TransitionType => {
  // Par défaut, utiliser une transition de fondu simple
  return "fade"
}

