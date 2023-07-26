session_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
shouldLogLocal = false;
z = `https://expressjs-postgres-production-1d4c.up.railway.app`;
// if url does not has a luonline, change z
if (window.location.href.indexOf("luonline") == -1) {
  z = `http://localhost:3333`;
}
loggingConditional = (z.indexOf("localhost") != -1 && shouldLogLocal) || z.indexOf("localhost") == -1;

window.addEventListener('load', function () {
  if (loggingConditional) {
    fetch(`${z}/v`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page_url: window.location.href,
        session_id: session_id
      })
    });
  } else {
    console.log("logging disabled")
  }
});

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function () {
    if (loggingConditional) {
      fetch(`${z}/c`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page_url: window.location.href,
          session_id: session_id,
          element_id: this.id
        })
      }).catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.log("logging disabled")
    }
  });
});

function tagFn(tag) {
  if (loggingConditional) {
    fetch(`${z}/t`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page_url: window.location.href,
        tag: tag,
        session_id: session_id,
      })
    });
  } else {
    console.log("logging disabled")
  }
}

function tagTt(tt) { 
  if (loggingConditional) {
    fetch(`${z}/tt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page_url: window?.location?.href,
        tag: window?.location?.hash?.substring(1),
        view_time: tt / 1000,
        session_id: session_id
      })
    });
  } else {
    console.log("logging disabled")
   }
}

function batch(cn) {
  if (loggingConditional) {
    fetch(`${z}/c`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page_url: window.location.href,
        session_id: session_id,
        element_id: this.id,
        click_amt: cn,
      })
    }).catch(error => {
      console.error('Error:', error);
    });
  } else {
    console.log("logging disabled")
  }
}