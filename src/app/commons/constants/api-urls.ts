export class API_URLS_CONSTANTS {
  static API_URLS = {
    LOGIN_SCREEN: {
      SIGN_UP: "https://visakharoyalinteriors.herokuapp.com/auth/signup",
      SIGN_IN: "https://visakharoyalinteriors.herokuapp.com/auth/login",
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
        GET_EVENTS: "http://localhost:3000/events",
        CREATE_EVENTS: "http://localhost:3000/events",
        DELETE_EVENT: "http://localhost:3000/events",
      },
    },
    INDIVIDUAL: { DASHBOARD: { URL: "/individual-dashboard" } },
  };
}
