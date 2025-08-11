
export const getSubdomainUrl = (path) => {
    if (typeof window === 'undefined') return path;

    const { hostname, protocol, port } = window.location;
    const parts = hostname.split('.');

    if (parts.length >= 2) {
        const subdomain = parts[0];
        const domain = parts.slice(1).join('.');
        const portStr = port ? `:${port}` : '';
        return `${protocol}//${subdomain}.${domain}${portStr}${path}`;
    }

    return path;
};


export const redirectWithSubdomain = (path, router = null) => {
    console.log('redirectWithSubdomain called with path:', path);

    const redirectUrl = getSubdomainUrl(path);
    console.log('Calculated redirectUrl:', redirectUrl);

    // Force a full page redirect for cross-subdomain navigation
    if (redirectUrl.startsWith('http')) {
        console.log('Using window.location.href for external URL');
        window.location.href = redirectUrl;
    } else {
        console.log('Using router.replace for internal path');
        if (router) {
            // Use push instead of replace to see if that helps
            router.push(redirectUrl);
        } else {
            window.location.href = redirectUrl;
        }
    }
};

export const redirectWithSubdomainForced = (path, router = null) => {
    console.log('redirectWithSubdomainForced called with path:', path);

    const redirectUrl = getSubdomainUrl(path);
    console.log('Calculated redirectUrl:', redirectUrl);

    // Always use window.location.href to ensure redirect works
    window.location.href = redirectUrl;
};

export const getRoleBasedRedirectPath = (user) => {
    console.log('getRoleBasedRedirectPath called with user:', user);

    if (!user || !user.role) {
        console.log('No user or role, defaulting to dashboard');
        return '/main/dashboard';
    }

    console.log('User role in getRoleBasedRedirectPath:', user.role);

    switch (user.role) {
        case 'superadmin':
            console.log('Matched superadmin case');
            return '/main/manage-admin/';
        case 'admin':
            console.log('Matched admin case');
            return '/main/dashboard';
        case 'salesperson':
            console.log('Matched salesperson case');
            return '/main/card-scanner';
        case 'manager':
            console.log('Matched manager case');
            return '/main/card-scanner';
        default:
            console.log('No role match, defaulting to dashboard. Role was:', user.role);
            return '/main/dashboard';
    }
};