/**
 * Google Apps Script — Pre-Congreso AI Construction Summit 2026
 * Recibe registros del formulario y los envía a:
 *   1. Google Sheets
 *   2. GoHighLevel (contacto + tags automáticos para automatizaciones)
 */

// ============================================================
//  CONFIGURACIÓN
// ============================================================
var CFG = {
  SHEET_ID:    '1OsT3ro5tdmzQYiLOJpVVxubcAW2cTmqAy1rxB_GQmqo',
  SHEET_TAB:   'Registros landing',
  GHL_API_KEY: 'pit-01fa4a1a-4325-4037-af3a-2bf7e087a917',
  GHL_LOCATION:'T8ByMoOOq7hWWswablDhF',
  GHL_TAG:     'pre-congreso-2026',
};
// ============================================================

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    guardarEnSheet(data);
    enviarAGHL(data);
    return _ok({ message: 'Registro completado' });
  } catch(err) {
    Logger.log('ERROR: ' + err.toString());
    return _error(err.toString());
  }
}

// ── 1. GOOGLE SHEETS ────────────────────────────────────────
function guardarEnSheet(data) {
  var ss  = SpreadsheetApp.openById(CFG.SHEET_ID);
  var tab = ss.getSheetByName(CFG.SHEET_TAB);

  if (!tab) {
    tab = ss.insertSheet(CFG.SHEET_TAB);
    tab.appendRow([
      'Timestamp',
      'Nombre',
      'Apellido',
      'Email',
      'WhatsApp',
      '¿Ya en el Summit?',
      '¿Cómo te enteraste?',
      'Fuente',
      'URL Registro'
    ]);
    tab.getRange('1:1').setFontWeight('bold').setBackground('#191C32').setFontColor('#ffffff');
    tab.setFrozenRows(1);
  }

  tab.appendRow([
    data.timestamp          || new Date().toISOString(),
    data.nombre             || '',
    data.apellido           || '',
    data.email              || '',
    data.whatsapp           || '',
    data.ya_en_summit       || '',
    data.como_te_enteraste  || '',
    data.fuente             || 'landing-precongreso',
    data.url_registro       || ''
  ]);
}

// ── 2. GOHIGHLEVEL ──────────────────────────────────────────
function enviarAGHL(data) {
  if (!CFG.GHL_API_KEY) return;

  // Tags automáticos desde los campos del formulario
  var tags = [CFG.GHL_TAG];

  // Tag según si ya está en el Summit
  var summitTagMap = {
    'si_vip':       'summit-experiencia-vip',
    'si_general':   'summit-entrada-general',
    'aun_no':       'summit-aun-no-inscrito',
    'quiero_saber': 'summit-quiere-info'
  };
  if (data.ya_en_summit && summitTagMap[data.ya_en_summit]) {
    tags.push(summitTagMap[data.ya_en_summit]);
  }

  // Tag según fuente de captación
  var fuenteTagMap = {
    'facebook':        'fuente-facebook',
    'instagram':       'fuente-instagram',
    'linkedin':        'fuente-linkedin',
    'amigos_whatsapp': 'fuente-amigos-whatsapp',
    'grupos_whatsapp': 'fuente-grupos-whatsapp',
    'correo':          'fuente-correo',
    'otro':            'fuente-otro'
  };
  if (data.como_te_enteraste && fuenteTagMap[data.como_te_enteraste]) {
    tags.push(fuenteTagMap[data.como_te_enteraste]);
  }

  var payload = {
    locationId:  CFG.GHL_LOCATION,
    firstName:   data.nombre    || '',
    lastName:    data.apellido  || '',
    email:       data.email     || '',
    phone:       data.whatsapp  || '',
    source:      'landing-precongreso',
    tags:        tags
  };

  var options = {
    method:             'post',
    contentType:        'application/json',
    headers: {
      'Authorization': 'Bearer ' + CFG.GHL_API_KEY,
      'Version':       '2021-07-28'
    },
    payload:            JSON.stringify(payload),
    muteHttpExceptions: true
  };

  // API v2 (services.leadconnectorhq.com) — la v1 (rest.gohighlevel.com) no acepta tokens "pit-..."
  var res  = UrlFetchApp.fetch('https://services.leadconnectorhq.com/contacts/', options);
  var code = res.getResponseCode();
  Logger.log('GHL ' + code + ': ' + res.getContentText());

  if (code !== 200 && code !== 201) {
    throw new Error('GHL error ' + code + ': ' + res.getContentText());
  }
}

// ── helpers ─────────────────────────────────────────────────
function _ok(obj)  { return ContentService.createTextOutput(JSON.stringify(Object.assign({ok:true},obj))).setMimeType(ContentService.MimeType.JSON); }
function _error(m) { return ContentService.createTextOutput(JSON.stringify({ok:false,error:m})).setMimeType(ContentService.MimeType.JSON); }
