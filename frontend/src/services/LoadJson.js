import "whatwg-fetch";
//FetchJson

/* this function takes an "url", fetch the json content and returns it using the "callback" function*/

async function LoadJson(url, method, body) {

	method = method || 'GET';

	let myHeaders = new Headers();
	myHeaders.append('Accept', 'application/json');

	let myInit = {
		method,
		headers: myHeaders,
        mode: 'cors',
		cache: 'default'
	};

	if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
		myHeaders.set('Content-Type', 'application/json'); // body parsing does not work without correct content type
	}

	if (body) {
		myInit['body'] = JSON.stringify(body);
	}

	const myRequest = new Request(url, myInit);
	try {
		require('es6-promise').polyfill();
		const response = await fetch(myRequest);
		if (!response.ok) {
			if (response.status == 401) {
				return {"error": response.statusText};
			} else if (response.status == 403) {
				return {"error": "accessDenied"}
			} else {
				console.error('The Fetch request of ' + myRequest.url + ' failed.', myRequest, response);
			}
		}
		if (response.status == 204) {
			return "ok"
		} else if (response.status == 201) {
		    return {"ok": "userCreated"}
        } else if (response.status == 200 && method == "PUT") {
        return {"ok": "userEdited"}
    }
		return response.json();
	} catch (e) {
		console.error('The Fetch request of ' + myRequest.url + ' failed.', myRequest, e)
	}
}
export default LoadJson;
