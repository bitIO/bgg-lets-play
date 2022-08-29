import '@testing-library/jest-dom/extend-expect';

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn().mockImplementation(() => ({
    isAuthenticated: true,
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
    user: {
      email: 'jest@google.com',
      email_verified: true,
      sub: 'google-oauth2|12345678901234',
    },
  })),
  withAuthenticationRequired: jest.fn().mockImplementation((component, ignore) => component),
}));
