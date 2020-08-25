const LOCAL_URL = "http://localhost:3000";
const BASE_URL = "https://visakharoyalinteriors.herokuapp.com";

export class API_URLS_CONSTANTS {
  static API_URLS = {
    LOGIN_SCREEN: {
      SIGN_IN: `${BASE_URL}/entervu/login`,
    },
    CHANGE_PASSWORD: {
      URL: `${BASE_URL}/entervu/password`,
    },
    DELETE_USER: {
      URL: `${BASE_URL}/entervu/user/`,
    },
    ORGANIZATION: {
      USER: {
        CHANGE_PASSWORD: `${BASE_URL}/entervu/password`,
        DELETE: `${BASE_URL}/entervu/user/`,
        REGISTRATION: `${BASE_URL}/entervu/company/register`,
        GET_PROFILE: `${BASE_URL}/entervu/company/user/`,
        UPDATE_PROFILE: `${BASE_URL}/entervu/company/user`,
      },
      MANAGE_EVENTS: {
        GET_EVENTS: `${BASE_URL}/entervu/event/company/`,
        FIND_EVENTS: `${BASE_URL}/entervu/event/`,
        CREATE_EVENTS: `${BASE_URL}/entervu/event`,
        UPDATE_EVENTS: `${BASE_URL}/entervu/event`,
        DELETE_EVENT: `${BASE_URL}/entervu/event`,
      },
      MANAGE_CANDIDATES: {
        FIND_CANDIDATE_BY_EMAIL: `${BASE_URL}/entervu/candidate/`,
        GET_CANDIDATES: `${LOCAL_URL}/candidates`,
        ADD_CANDIDATE: `${BASE_URL}/entervu/event/candidate`,
        UPDATE_CANDIDATE_IN_EVENT: `${BASE_URL}/entervu/event/candidate`,
        DELETE_CANDIDATE_FROM_EVENT: `${BASE_URL}/entervu/event/candidate`,
        GET_EVENT_CANDIDATES: `${BASE_URL}/entervu/candidate/event/`,
      },
      MANAGE_HR_TEAM: {
        GET_TEAM_MEMBERS: `${BASE_URL}/entervu/company/`,
        ADD_TEAM_MEMBERS: `${BASE_URL}/teams`,
        UPDATE_TEAM_MEMBERS: `${BASE_URL}/teams`,
        DELETE_TEAM_MEMBERS: `${BASE_URL}/teams`,
      },
    },
    INDIVIDUAL: {
      USER: {
        REIGSTRATION: `${BASE_URL}/entervu/candidate/register`,
        CHANGE_PASSWORD: `${BASE_URL}/entervu/password`,
        DELETE: `${BASE_URL}/entervu/user/`,
        GET_PROFILE: `${BASE_URL}/entervu/candidate/user/`,
        UPDATE_PROFILE: `${BASE_URL}/entervu/candidate/user`,
      },
    },
    ADMIN: {
      SKILLS: {
        GET_SKILLS: `${BASE_URL}/entervu/skill`,
        FIND_SKILLS: `${BASE_URL}/entervu/skill/value`,
        CREATE_SKILLS: `${BASE_URL}/entervu/skill`,
        UPDATE_SKILLS: `${BASE_URL}/entervu/skill`,
        DELETE_SKILLS: `${BASE_URL}/entervu/skill`,
      },
    },
  };
}
