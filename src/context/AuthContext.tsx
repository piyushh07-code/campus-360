import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { DataAdapter } from '../services/storage/dataAdapter';
import { isFirebaseConfigured } from '../services/firebase/config';

interface AuthContextType {
  currentUser: UserProfile;
  role: UserRole;
  isDemoMode: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  loginAsDemo: (role?: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => DataAdapter.getCurrentUser());
  const isDemo = !isFirebaseConfigured();

  useEffect(() => {
    DataAdapter.setCurrentUser(currentUser);
  }, [currentUser]);

  const switchRole = (newRole: UserRole) => {
    const updated = DataAdapter.switchPersona(newRole);
    setCurrentUser(updated);
  };

  const loginAsDemo = (targetRole: UserRole = 'student') => {
    switchRole(targetRole);
  };

  const login = (email: string, targetRole: UserRole = 'student') => {
    const updated = DataAdapter.switchPersona(targetRole);
    updated.email = email;
    setCurrentUser(updated);
  };

  const logout = () => {
    const defaultUser = DataAdapter.switchPersona('student');
    setCurrentUser(defaultUser);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser.role,
        isDemoMode: isDemo,
        switchRole,
        login,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
