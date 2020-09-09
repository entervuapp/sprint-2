import { ROUTE_URL_PATH_CONSTANTS } from "../constants/route-url-path.constants";

export class SHARED_CONSTANTS {
  public static SERVICE_MESSAGES = {
    SUCCESS: [{ code: "SUCCESS", systemMessage: "Success" }],
    ERROR: [{ code: "ERROR", systemMessage: "Error" }],
    WARNING: [{ code: "WARNING", systemMessage: "Warning" }],
    INFO: [{ code: "INFO", systemMessage: "Info" }],
  };

  public static EVU_ROUND_NAMES = [
    "Written",
    "Telephonic",
    "Tech 1",
    "Tech 2",
    "Manager",
    "Client",
    "HR",
  ];

  public static EVU_USER_ROLES = {
    SUPER_USER: "ROLE_SUPER_USER",
    HR_ADMIN: "ROLE_HR_ADMIN",
    HR_USER: "ROLE_HR_USER",
    CANDIDATE: "ROLE_CANDIDATE",
  };

  public static EVU_LOCAL_STORAGES = {
    LS_EVU_USER_ROLE: "LS_EVU_USER_ROLE",
    LS_EVU_SESSION_TOKEN: "LS_EVU_SESSION_TOKEN",
    LS_EVU_USER_DETAILS: "LS_EVU_USER_DETAILS",
  };

  public static MAIN_MENU = {
    ORGANIZATION_MENU_LIST: [
      {
        DISPLAY_TEXT: "EVENTS",
        NAVIGATE_TO:
          ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD,
      },
      {
        DISPLAY_TEXT: "TEAM",
        NAVIGATE_TO: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_TEAM,
      },
    ],
    INDIVIDUAL_MENU_LIST: [
      {
        DISPLAY_TEXT: "DASHBOARD",
        NAVIGATE_TO:
          ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD,
      },
      {
        DISPLAY_TEXT: "QA",
        NAVIGATE_TO: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD,
      },
    ],
    SUPER_USER_MENU_LIST: [
      {
        DISPLAY_TEXT: "EVENTS",
        NAVIGATE_TO:
          ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD,
      },
      {
        DISPLAY_TEXT: "TEAM",
        NAVIGATE_TO: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_TEAM,
      },
      {
        DISPLAY_TEXT: "DASHBOARD",
        NAVIGATE_TO:
          ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD,
      },
      {
        DISPLAY_TEXT: "QA",
        NAVIGATE_TO: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD,
      },
      {
        DISPLAY_TEXT: "ADMIN",
        NAVIGATE_TO: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN,
      },
    ],
  };

  public static USER_TYPES = {
    ORGANIZATION: ["A", "U"],
    CANDIDATE: ["C"],
    SUPER_USER: ["S"],
  };
}
