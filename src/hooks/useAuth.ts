import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, deleteCookie, getCookie } from 'utils/cookies';
import {
    selectUser,
    selectIsAuthenticated,
    selectIsInitialized,
    selectIsSuperAdmin,
    selectIsAdmin,
    selectIsAdminOrAbove,
    selectUserRole,
    selectHasRole,
    selectHasAnyRole,
} from '../store/selectors/authSelectors';
import {
    useLoginMutation,
    useLazyVerifyTokenQuery
} from 'store/apiEndPoints/authApi';
import { setCredentials, logout, setInitialized } from '../store/slices/authSlice';

const normalizeUserData = (userData: any) => {
    const id = userData.id || userData._id;

    const normalized = {
        id: id.toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role as 'admin' | 'superadmin'
    };

    return normalized;
};

export const useAuth = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isInitialized = useSelector(selectIsInitialized);
    const isSuperAdmin = useSelector(selectIsSuperAdmin);
    const isAdmin = useSelector(selectIsAdmin);
    const isAdminOrAbove = useSelector(selectIsAdminOrAbove);
    const userRole = useSelector(selectUserRole);
    const hasRole = useSelector(selectHasRole);
    const hasAnyRole = useSelector(selectHasAnyRole);
    const [loginMutation, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
    const [verifyToken] = useLazyVerifyTokenQuery();

    useEffect(() => {
        if (!isInitialized) {
            const initAuth = async () => {
                try {
                    const token = getCookie('token');

                    if (token) {
                        await verifyToken().unwrap();
                    } else {
                        dispatch(setInitialized());
                    }
                } catch (error) {
                    deleteCookie('token');
                    dispatch(logout());
                    dispatch(setInitialized());
                }
            };

            initAuth();
        }
    }, [isInitialized, verifyToken, dispatch]);

    const login = async (email: string, password: string) => {
        try {
            const result = await loginMutation({ email, password }).unwrap();

            setCookie('token', result.token, {
                maxAge: 7 * 24 * 60 * 60,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });

            const normalizedUser = normalizeUserData(result);
            dispatch(setCredentials({
                user: normalizedUser,
                token: result.token
            }));

            return { success: true, user: normalizedUser };
        } catch (error: any) {
            return {
                success: false,
                error: error.data?.message || 'Login failed'
            };
        }
    };

    const logoutUser = async () => {
        deleteCookie('token');
        dispatch(logout());
        router.push('/auth/sign-in');
    };

    return {
        user,
        userRole,
        isAuthenticated,
        isInitialized,
        isLoginLoading,
        loginError,
        isSuperAdmin,
        isAdmin,
        isAdminOrAbove,
        hasRole,
        hasAnyRole,
        login,
        logout: logoutUser,
    };
};