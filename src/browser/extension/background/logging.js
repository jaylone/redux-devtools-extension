export function getReport(id, instance) {
  chrome.storage.local.get({
    's:hostname': null,
    's:port': null,
    's:secure': null
  }, options => {
    if (!options['s:hostname'] || !options['s:port']) return;
    const url = `${options['s:secure'] ? 'https' : 'http'}://${options['s:hostname']}:${options['s:port']}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        op: 'get',
        id: id
      })
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      if (!json.payload) return;
      window.store.liftedStore.importState(json.payload, instance);
    }).catch(function(err) {
      console.warn(err);
    });
  });
}
