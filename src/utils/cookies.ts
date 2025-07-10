interface CookieOptions {
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
    if (typeof window === 'undefined') return; // SSR check

    const {
        maxAge = 7 * 24 * 60 * 60, // 7 days default
        path = '/',
        secure = false,
        sameSite = 'lax'
    } = options;

    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (maxAge) cookieString += `; Max-Age=${maxAge}`;
    if (path) cookieString += `; Path=${path}`;
    if (secure) cookieString += '; Secure';
    if (sameSite) cookieString += `; SameSite=${sameSite}`;

    document.cookie = cookieString;
    console.log('🍪 Cookie set:', cookieString);
};

export const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null; // SSR check

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
            console.log('🍪 Cookie retrieved:', name, value ? 'exists' : 'empty');
            return value;
        }
    }
    return null;
};

export const deleteCookie = (name: string, path: string = '/') => {
    if (typeof window === 'undefined') return; // SSR check

    document.cookie = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    console.log('🍪 Cookie deleted:', name);
};