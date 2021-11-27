(function(window, document) {
//////////////////////////////////////////////////////////////////////
//
//                Ludicrous⠀|⠀𝘽𝙪𝙨𝙩𝙡.•io
//      a simple--and qquick--updater for iOS Shortcuts
//
//
// Get input via URL search parameters
  const Q = new URL(window.location.href).searchParams


// If id contains hyphens, return url to ShortcutsPro repo, else return RoutinfHub API 
  function parseId(id) {
    let url = '';
    if (id.split('-')[1] != undefined) {
      url = 'https://Cutz.Bustl.io/library/versions/latest/'+id+'.json'
    } else {
      url = 'https://RoutineHub.co/api/v1/shortcuts/'+id+'/versions/latest'
    }
    console.log(url)
    return url
  }


// Use XMLHttpRequest to retreive current release data
  function API(id, v) {
    let api = new XMLHttpRequest()
    api.open('GET', parseId(id), false)
    api.send()

    let response = api.responseText
//    console.log(response)

    if (response != 'undefined' && response != 'null') {
      response = JSON.parse(response)

//      console.log(JSON.stringify(response))
      let ver = response.version || response.Version;
      if (v != ver) return response.link || response.URL
    }
    return false
  }


// Primary update call returnsa blank page if either id or version parameter is missing or if version is the current version.

  function update(id, v) {
    if (id == null || v == null) return ''

    const link = API(id, v)
    console.log(link)
    if (!link) return ''

// Return a direct install link that opens in the Shortcuts app.
    return `shortcuts://shortcuts/${link.match(/[a-zA-Z0-9]+$/)}`
  }


// Testing RoutineHub
//  const body = update('10547', '1')

// Testing Bustl.Cutz
//  const body = update('E6CE9CFC-B0AE-4B8B-9810-6229C86B3EF5', '3.14')

// Update check input via URL params.
  const body = update(Q.get('id'), Q.get('v'))

  console.log(body)
  document.write(body)

})(window, document);