const BASE_URL = "http://localhost:3000";

export class API_URLS_CONSTANTS {
  static API_URLS = {
    LOGIN_SCREEN: {
      SIGN_UP: "https://visakharoyalinteriors.herokuapp.com/entervu/register",
      SIGN_IN: "https://visakharoyalinteriors.herokuapp.com/entervu/login",
    },
    ORGANIZATION: {
      DASHBOARD: {
        URL: "/organization-dashboard",
      },
      MANAGE_EVENTS: {
        // GET_EVENTS: "https://visakharoyalinteriors.herokuapp.com/auth/event",
        // CREATE_EVENTS:
        //   "https://visakharoyalinteriors.herokuapp.com/auth/create-event",
        // DELETE_EVENTS: "https://visakharoyalinteriors.herokuapp.com/auth/event",
        GET_EVENTS: `${BASE_URL}/events`,
        CREATE_EVENTS: `${BASE_URL}/events`,
        UPDATE_EVENTS: `${BASE_URL}/events`,
        DELETE_EVENT: `${BASE_URL}/events`,
      },
      MANAGE_CANDIDATES: {
        GET_CANDIDATES: `${BASE_URL}/candidates`,
        ADD_CANDIDATE: `${BASE_URL}/candidates`,
        UPDATE_CANDIDATE: `${BASE_URL}/candidates`,
        DELETE_CANDIDATE: `${BASE_URL}/candidates`,
      },
      MANAGE_HR_TEAM: {
        GET_TEAM_MEMBERS: `${BASE_URL}/teams`,
        ADD_TEAM_MEMBERS: `${BASE_URL}/teams`,
        UPDATE_TEAM_MEMBERS: `${BASE_URL}/teams`,
        DELETE_TEAM_MEMBERS: `${BASE_URL}/teams`,
      },
      PROFILE: {
        GET_PROFILE: `${BASE_URL}/profiles`,
        UPDATE_PROFILE: `${BASE_URL}/profiles`,
        DELETE_PROFILE: `${BASE_URL}/profiles`,
      },
    },
    INDIVIDUAL: { DASHBOARD: { URL: "/individual-dashboard" } },
    ADMIN: {
      SKILLS: {
        GET_SKILLS: `${BASE_URL}/skills`,
        CREATE_SKILLS: `${BASE_URL}/skills`,
        UPDATE_SKILLS: `${BASE_URL}/skills`,
        DELETE_SKILLS: `${BASE_URL}/skills`,
      },
    },
  };
}
