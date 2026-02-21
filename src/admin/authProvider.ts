import type { AuthProvider } from 'react-admin';
import Parse from 'parse';

const authProvider: AuthProvider = {
    // Called when the user attempts to log in
    login: async ({ username, password }) => {
        try {
            await Parse.User.logIn(username, password);
            // Store the current timestamp for session tracking (18h)
            localStorage.setItem('login_timestamp', Date.now().toString());
            return Promise.resolve();
        } catch (error: any) {
            return Promise.reject(new Error('custom.errors.invalid_login'));
        }
    },
    // Called when the user clicks on the logout button
    logout: async () => {
        try {
            await Parse.User.logOut();
            localStorage.removeItem('login_timestamp');
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // Called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            Parse.User.logOut();
            localStorage.removeItem('login_timestamp');
            return Promise.reject({ redirectTo: '/admin/login' });
        }
        return Promise.resolve();
    },
    // Called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        try {
            const user = Parse.User.current();

            // If no user is logged in, reject with a redirect to /admin/login
            if (!user) {
                return Promise.reject({ redirectTo: '/admin/login' });
            }
        } catch (e) {
            console.error("Error in checkAuth:", e);
            return Promise.reject({ redirectTo: '/admin/login' });
        }

        // Enforce 18-hour session limit
        const loginTimestamp = localStorage.getItem('login_timestamp');
        if (loginTimestamp) {
            const now = Date.now();
            const eighteenHours = 18 * 60 * 60 * 1000;
            if (now - parseInt(loginTimestamp, 10) > eighteenHours) {
                Parse.User.logOut();
                localStorage.removeItem('login_timestamp');
                return Promise.reject({ redirectTo: '/admin/login' });
            }
        }

        return Promise.resolve();
    },
    // Called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        try {
            // Check if Parse is initialized, though unexpected to be uninitialized here
            if (!Parse.applicationId) {
                console.error("Parse not initialized in getPermissions!");
                return Promise.reject({ redirectTo: '/admin/login' });
            }
            const user = Parse.User.current();
            return user ? Promise.resolve(user.get('role')) : Promise.reject({ redirectTo: '/admin/login' });
        } catch (e) {
            console.error("Error in getPermissions:", e);
            return Promise.reject({ redirectTo: '/admin/login' });
        }
    },
    // Optional: returns current user identity (name, avatar, etc.)
    getIdentity: () => {
        try {
            const user = Parse.User.current();
            if (user && user.id) {
                return Promise.resolve({
                    id: user.id,
                    fullName: user.get('username'),
                });
            }
        } catch (e) {
            console.error("Error in getIdentity:", e);
        }
        return Promise.reject();
    },
};

export default authProvider;
