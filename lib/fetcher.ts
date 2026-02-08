// Fetcher function for SWR
export async function fetcher<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        throw error;
    }

    return res.json();
}

// Fetcher with authentication for admin routes
export async function adminFetcher<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        credentials: 'include',
    });

    if (!res.ok) {
        if (res.status === 401) {
            // Redirect to login if unauthorized
            window.location.href = '/admin/login';
            throw new Error('Unauthorized');
        }
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
