const clientId = '75a46598742e4e548b9587df67c89580';
const redirectUri = 'http://localhost:8080';

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const codeVerifier = localStorage.getItem('code_verifier');

const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
});

fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
})
.then(response => {
    if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
    }
    return response.json();
})
.then(data => {
    localStorage.setItem('access_token', data.access_token);
})
.catch(error => {
    console.error('Error:', error);
});

async function getPlaylistDetails() {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO1AVNEQ', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Playlist Details:', data);
    } else {
        console.error('Failed to fetch playlist details:', response.status, response.statusText);
    }
}

getPlaylistDetails();
