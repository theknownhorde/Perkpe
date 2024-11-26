// src/utils/auth.js

export const auth = {
    isAuthenticated: () => {
        const user = localStorage.getItem('currentUser');
        return user && JSON.parse(user).isLoggedIn;
    },

    getUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    logout: () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    },

    getToken: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user).token : null;
    }
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
    if (!auth.isAuthenticated()) {
        window.location.href = '/login';
        return null;
    }
    return children;
};