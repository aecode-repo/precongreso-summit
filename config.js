/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  CONFIGURACIÓN DEL PRE-CONGRESO — editar aquí       ║
 * ║  Abrir con Notepad o cualquier editor de texto      ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Después de editar: guardar el archivo (Ctrl+S).
 * NO tocar el archivo precongreso.html.
 */

var CFG = {

  /* ── INTEGRACIONES ─────────────────────────────────── */

  // Google Apps Script (NO cambiar salvo que redespliegues el script)
  SHEETS_WEBHOOK: 'https://script.google.com/macros/s/AKfycbyfNHHnykcZhv0bdluxhXTlRIFADeWHANesdLqOZIue8uvTmB2pdmXGIMFHTqV-GdPF/exec',

  // GoHighLevel
  GHL_LOCATION:   'T8ByMoOOq7hWWswablDhF',
  GHL_TAG:        'pre-congreso-2026',

  /* ── LINKS DEL EVENTO ──────────────────────────────── */

  // Summit principal
  SUMMIT_URL:     'https://aecode.ai/summit',

  // Redirección tras registrarse / botones "Unirme al grupo de WhatsApp"
  // Apunta al panel externo (GitHub Pages) donde se gestiona el link de WhatsApp vigente.
  // Si el grupo se llena, actualiza el link ahí — no hace falta volver a desplegar este sitio.
  WA_GROUP:       'https://anggiej-svg.github.io/aecode-wsp/summit/',

  /* ── ZOOM EN VIVO ──────────────────────────────────── */

  // Link de la sala de Zoom del Pre-Congreso (mismo link ambos días)
  ZOOM_URL:       'https://us06web.zoom.us/j/88230639016?pwd=1LSWilcKKymymlWliu9v2Gxbdf78Ch.1',

  // Horarios de cada día (hora de Perú, UTC-5). Controla cuándo aparece
  // el aviso rojo "EN VIVO" / "EN BREVE" junto al botón de Zoom.
  EVENT_DAYS: [
    { start: '2026-07-08T12:00:00-05:00', end: '2026-07-08T14:30:00-05:00' },
    { start: '2026-07-09T12:00:00-05:00', end: '2026-07-09T14:30:00-05:00' },
  ],

  /* ── REDES SOCIALES ────────────────────────────────── */

  SOCIAL_IG:      'https://www.instagram.com/aecode.ai/',
  SOCIAL_LI:      'https://www.linkedin.com/company/aecode-ai',
  SOCIAL_WA:      'https://wa.me/51900121245',

};
