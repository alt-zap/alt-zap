function addScript(url: string): HTMLScriptElement {
  const script = document.createElement('script')

  script.src = url
  document.body.appendChild(script)

  return script
}

export function loadHereMaps(): void {
  const first = addScript('//js.api.here.com/v3/3.1/mapsjs-core.js')

  first.onload = () => {
    addScript('//js.api.here.com/v3/3.1/mapsjs-service.js')
  }
}
