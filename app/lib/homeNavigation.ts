/**
 * Call before navigating to `/` from inner pages (gallery, services, reviews, etc.)
 * so the homepage shows the main card front face and scrolls to the top.
 */
export function prepareReturnToHeroCard(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem('forceHeroFront', 'true')
    sessionStorage.setItem('homeBackSkipLoad', 'true')
    sessionStorage.removeItem('openAppointment')
    sessionStorage.removeItem('openPayment')
    sessionStorage.removeItem('openFlip')
    sessionStorage.removeItem('fromGallery')
    sessionStorage.removeItem('fromServices')
    sessionStorage.removeItem('fromReviews')
  } catch {
    // sessionStorage may be unavailable
  }
}
