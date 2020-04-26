import {IUser} from "./model/Models";

const defaultBasePath = "http://localhost:8000/";

export const auth = {
    signIn: (email: string, password: string) =>
        post<IUser>("performLogin", {
            "email": email,
            "password": password
        })
}

export function get<T> (url:string): Promise<T> {
    return fetchAsync("GET", url);
}

export function post<T> (url: string, body?: any): Promise<T> {
    return fetchAsync("POST", url, body);
}

export function toQueryString(obj) {
    const parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
        }
    }
    return parts.join('&');
}

export function serializeObject<T>(form) {
    let obj = {};
    if (typeof form == 'object' && form.nodeName == 'FORM') {
        for (let i = 0; i < form.elements.length; i++) {
            const field = form.elements[i];
            if (
                field.name &&
                field.type != 'file' &&
                field.type != 'reset' &&
                field.type != 'submit' &&
                field.type != 'button'
            ) {
                if (field.type == 'select-multiple') {
                    obj[field.name] = '';
                    let tempvalue = '';
                    for (let j = 0; j < form.elements[i].options.length; j++) {
                        if (field.options[j].selected) tempvalue += field.options[j].value + ';';
                    }
                    if (tempvalue.charAt(tempvalue.length - 1) === ';')
                        obj[field.name] = tempvalue.substring(0, tempvalue.length - 1);
                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    obj[field.name] = field.value;
                }
            }
        }
    }
    return obj as T;
}


async function fetchAsync(method: 'GET' | 'POST' | 'DELETE' | 'PUT', url: string, body?: any)
{
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    };
    //if (access_token) headers['Authorization'] = `Token ${access_token}`;
    const response = await window['fetch'](`${defaultBasePath}${url}`, {
        method,
        headers,
        body: body && JSON.stringify(body)
    });
    if (response.status === 401) throw new Error('401');
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
}