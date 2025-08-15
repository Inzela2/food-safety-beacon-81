import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  businessName: string;
  email: string;
  isOnboarded: boolean;
  referralCode: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('compliance_shield_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login - in real app, this would call an API
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      businessName: '',
      email,
      isOnboarded: false,
      referralCode: Math.random().toString(36).substr(2, 8).toUpperCase()
    };
    
    setUser(newUser);
    localStorage.setItem('compliance_shield_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('compliance_shield_user');
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, isOnboarded: true };
      setUser(updatedUser);
      localStorage.setItem('compliance_shield_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      completeOnboarding,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};