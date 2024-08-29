const mockResponse = {
  id: "cf093918-d120-4e1f-96be-d2b4b6406f45",
  domain: "https://alexb-lb.github.io",
  subDomains: [],
  banner: {
    consentType: "accept-reject",
    createdBy: null,
    customizable: true,
    description: null,
    id: "993521f6-200d-42f8-898c-4ca72fff8329",
    linkDoNotSell: true,
    name: "Banner do not sell",
    rawJSON:
      '{"banner":{"acceptAllButton":{"backgroundColor":"001529","borderColor":"001529","color":"FFFFFF","text":"Accept All"},"actionButton":{"backgroundColor":"FFFFFF","borderColor":"001529","color":"001529","text":"Manage Preferences"},"backgroundColor":"FFFFFF","body":"\\u003cp\\u003eThis website uses cookies to ensure you get the best experience on our website.\\u003c/p\\u003e","bodyTextColor":"001529","borderColor":"FFFFFF","doNotSellButton":{"backgroundColor":"FFFFFF","borderColor":"001529","color":"001529","text":"Do not sell my data"},"policy":"Privacy policy","policyTextColor":"0000EE","policyUrl":"","rejectAllButton":{"backgroundColor":"1B2229","borderColor":"001529","color":"FFFFFF","text":"Reject All"}},"enableLightbeamBranding":true,"position":["bottom","left"],"preferences":{"acceptAllButton":{"backgroundColor":"FFFFFF","borderColor":"001529","color":"001529","text":"Accept All"},"actionButton":{"backgroundColor":"001529","borderColor":"001529","color":"FFFFFF","text":"Save Preferences"},"body":"\\u003cp\\u003eWe use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below. The cookies that are categorized as \\"Necessary\\" are stored on your browser as they are essential for enabling the basic functionalities of the site. We also use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent. You can choose to enable or disable some or all of these cookies but disabling some of them may affect your browsing experience.\\u003c/p\\u003e","bodyTextColor":"333333","category":{"checkboxCheckMarkColor":"D1D5DA","checkboxColorAlwaysOn":"D1D5DA","checkboxColorOff":"6E7191","checkboxColorOn":"1B2229","checkboxType":"checkbox","colorDescription":"1B2229","colorTitle":"1B2229","showCookies":true},"doNotSellButton":{"backgroundColor":"FFFFFF","borderColor":"001529","color":"001529","text":"Do not sell my data"},"rejectAllButton":{"backgroundColor":"FFFFFF","borderColor":"001529","color":"001529","text":"Reject All"},"title":"Customize","titleTextColor":"333333"},"type":"classic"}',
    regulationType: "Others",
    updatedBy: null,
  },
  cookies: [
    {
      cookieCategoryId: "f6711231-aac9-4fde-8964-0a3783565299",
      cookieType: "manual",
      createdAt: "2024-08-15T14:27:21.966Z",
      createdBy: null,
      description:
        '<p><strong>Cookie Title</strong></p>\n<p><em>Cookie description </em><span style="color: rgb(27,29,33);background-color: rgb(255,255,255);font-size: 14px;font-family: Ampersand, Archivo, -apple-system, BlinkMacSystemFont, Inter, sans-serif;"><em>Cookie description Cookie description Cookie description Cookie description Cookie description Cookie description Cookie description Cookie description Cookie description Cookie description </em></span></p>\n',
      domain: "http://lol.com",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1724284800",
      httpOnly: null,
      id: "11b6ddc6-472c-4f39-a7b5-99250bc78337",
      name: "Cookie 2 edited",
      optOut: null,
      path: null,
      priority: null,
      sameParty: null,
      sameSite: null,
      secure: null,
      session: null,
      size: null,
      sourcePort: null,
      sourceScheme: null,
      updatedAt: "2024-08-15T15:01:44.478Z",
      updatedBy: null,
      value: "Cookie 2",
    },
    {
      cookieCategoryId: "f6711231-aac9-4fde-8964-0a3783565299",
      cookieType: "manual",
      createdAt: "2024-08-15T13:18:24.614Z",
      createdBy: null,
      description:
        '<p><strong>Some cookie title</strong></p>\n<p><em>Description blah blah </em><span style="color: rgb(27,29,33);background-color: rgb(255,255,255);font-size: 14px;font-family: Ampersand, Archivo, -apple-system, BlinkMacSystemFont, Inter, sans-serif;"><em>Description blah blah Description blah blah Description blah blah Description blah blah Description blah blah Description blah blah </em></span></p>\n',
      domain: "https://google.com",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1724803200",
      httpOnly: null,
      id: "3612a47e-01bd-4808-b12c-583589f2f280",
      name: "Cookie 1",
      optOut: null,
      path: null,
      priority: null,
      sameParty: null,
      sameSite: null,
      secure: null,
      session: null,
      size: null,
      sourcePort: null,
      sourceScheme: null,
      updatedAt: "2024-08-15T14:48:24.070Z",
      updatedBy: null,
      value: "Value 1",
    },
    {
      cookieCategoryId: "7b88504a-2a88-4963-be50-f3bb23ca38bf",
      cookieType: "system",
      createdAt: "2024-08-06T07:25:00.910Z",
      createdBy: null,
      description: null,
      domain: "playground-master-privacy-ops.lightbeamsecurity.com",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1738481052",
      httpOnly: true,
      id: "ceacf333-c8aa-4cd0-992d-7241aa20fb87",
      name: "_lb_fp",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: "None",
      secure: true,
      session: false,
      size: 42,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-08-07T13:31:12.309Z",
      updatedBy: null,
      value: "d8217dd3-5f12-47e1-99d8-bc94483825fa",
    },
    {
      cookieCategoryId: "a936cb80-f6d7-4eb3-9378-c8543b499690",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "test-cookies.tiiny.site",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521349",
      httpOnly: false,
      id: "5e3a77ad-402a-44dc-a9df-0413d11c574a",
      name: "external_cookie_4",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: "None",
      secure: true,
      session: false,
      size: 33,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:44:57.261Z",
      updatedBy: null,
      value: "external_value_4",
    },
    {
      cookieCategoryId: "a936cb80-f6d7-4eb3-9378-c8543b499690",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "test-cookies.tiiny.site",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521349",
      httpOnly: false,
      id: "a713b75c-ae0d-4e71-ba8e-090fd1a51b13",
      name: "external_cookie_3",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: "None",
      secure: true,
      session: false,
      size: 33,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:10:15.712Z",
      updatedBy: null,
      value: "external_value_3",
    },
    {
      cookieCategoryId: "a936cb80-f6d7-4eb3-9378-c8543b499690",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "test-cookies.tiiny.site",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521349",
      httpOnly: false,
      id: "8564e431-4dd0-49b5-9ff5-3a222da4197d",
      name: "external_cookie_2",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: "None",
      secure: true,
      session: false,
      size: 33,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:10:15.712Z",
      updatedBy: null,
      value: "external_value_2",
    },
    {
      cookieCategoryId: "a936cb80-f6d7-4eb3-9378-c8543b499690",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "test-cookies.tiiny.site",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521349",
      httpOnly: false,
      id: "90a0b918-5f6b-4840-8c18-34263bd9c603",
      name: "external_cookie_1",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: "None",
      secure: true,
      session: false,
      size: 33,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:10:15.712Z",
      updatedBy: null,
      value: "external_value_1",
    },
    {
      cookieCategoryId: "7b88504a-2a88-4963-be50-f3bb23ca38bf",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "alexb-lb.github.io",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521348",
      httpOnly: false,
      id: "b2b97e77-1509-4439-a59a-96484a026566",
      name: "same_domain_cookie4",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: null,
      secure: false,
      session: false,
      size: 32,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:10:15.712Z",
      updatedBy: null,
      value: "local_value_4",
    },
    {
      cookieCategoryId: "7b88504a-2a88-4963-be50-f3bb23ca38bf",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "alexb-lb.github.io",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521348",
      httpOnly: false,
      id: "428718f6-d54e-42f8-9c32-a33c1c57441d",
      name: "same_domain_cookie3",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: null,
      secure: false,
      session: false,
      size: 32,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:10:15.712Z",
      updatedBy: null,
      value: "local_value_3",
    },
    {
      cookieCategoryId: "7b88504a-2a88-4963-be50-f3bb23ca38bf",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "alexb-lb.github.io",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521348",
      httpOnly: false,
      id: "749b56cf-7d4b-4419-bb86-c0890be89d42",
      name: "same_domain_cookie2",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: null,
      secure: false,
      session: false,
      size: 32,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:10:15.712Z",
      updatedBy: null,
      value: "local_value_2",
    },
    {
      cookieCategoryId: "7b88504a-2a88-4963-be50-f3bb23ca38bf",
      cookieType: "system",
      createdAt: "2024-07-31T14:10:15.712Z",
      createdBy: null,
      description: null,
      domain: "alexb-lb.github.io",
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      expires: "1722521348",
      httpOnly: false,
      id: "4483b183-beb9-4674-9ffa-c21d694a0e2d",
      name: "same_domain_cookie_1",
      optOut: null,
      path: "/",
      priority: "Medium",
      sameParty: false,
      sameSite: null,
      secure: false,
      session: false,
      size: 33,
      sourcePort: 443,
      sourceScheme: "Secure",
      updatedAt: "2024-07-31T14:10:15.712Z",
      updatedBy: null,
      value: "local_value_1",
    },
  ],
  categories: [
    {
      createdAt: "2024-07-31T14:10:15.484Z",
      createdBy: null,
      description: null,
      doNotSell: true,
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      id: "7b88504a-2a88-4963-be50-f3bb23ca38bf",
      name: "Essential",
      optOut: true,
      updatedAt: "2024-07-31T14:10:15.484Z",
      updatedBy: null,
    },
    {
      createdAt: "2024-07-31T14:09:10.805Z",
      createdBy: null,
      description: "",
      doNotSell: false,
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      id: "a936cb80-f6d7-4eb3-9378-c8543b499690",
      name: "Marketing",
      optOut: false,
      updatedAt: "2024-07-31T14:11:36.080Z",
      updatedBy: null,
    },
    {
      createdAt: "2024-08-06T07:24:59.905Z",
      createdBy: null,
      description:
        '<p><strong>Category title</strong></p>\n<p><em>category description </em><span style="color: rgb(27,29,33);background-color: rgb(255,255,255);font-size: 14px;font-family: Ampersand, Archivo, -apple-system, BlinkMacSystemFont, Inter, sans-serif;"><em>category description category description category description category description category description category description category description category description </em></span></p>\n',
      doNotSell: true,
      domainId: "cf093918-d120-4e1f-96be-d2b4b6406f45",
      id: "f6711231-aac9-4fde-8964-0a3783565299",
      name: "Other",
      optOut: true,
      updatedAt: "2024-08-15T15:09:23.965Z",
      updatedBy: null,
    },
  ],
};

var SVG_CARET_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#333333" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="96 48 176 128 96 208" fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>`;

var renderCookieConsent = async () => {
  const root = document.getElementById("lb-cookie-consent");
  const webAppUrl = root?.getAttribute("data-web-app") || "";
  const clientDomain = root?.getAttribute("data-domain") || "";
  const showPreferences = root?.getAttribute("data-preferences-only") || "";
  const VISITOR_ID = "_lb_fp";
  let domain;

  const cookieConsentTypes = {
    accept: "accept",
    reject: "reject",
    acceptReject: "accept-reject",
    doNotSell: "do-not-sell",
    acceptDoNotSell: "accept-do-not-sell",
    rejectDoNotSell: "reject-do-not-sell",
  };

  /**
   * buttonName: "accept" | "reject" | "doNotSell"
   * consentType: cookieConsentTypes
   */
  const showButton = ({ buttonName = "", consentType = "" }) => {
    if (
      buttonName === "accept" &&
      (consentType === cookieConsentTypes.accept ||
        consentType === cookieConsentTypes.acceptReject ||
        consentType === cookieConsentTypes.acceptDoNotSell)
    ) {
      return true;
    }

    if (
      buttonName === "reject" &&
      (consentType === cookieConsentTypes.reject ||
        consentType === cookieConsentTypes.acceptReject ||
        consentType === cookieConsentTypes.rejectDoNotSell)
    ) {
      return true;
    }

    if (
      buttonName === "doNotSell" &&
      (consentType === cookieConsentTypes.doNotSell ||
        consentType === cookieConsentTypes.acceptDoNotSell ||
        consentType === cookieConsentTypes.rejectDoNotSell)
    ) {
      return true;
    }

    return false;
  };

  // utils
  const cleanUrlString = (domain) =>
    domain.replace(/https?:\/\//i, "").replace(/^(\.+)/g, "");

  const padTo2Digits = (num) => {
    return String(num).padStart(2, "0");
  };
  const getPrettyExpires = (expires = 0) => {
    if (!expires) return "--";
    const date = new Date(expires * 1000);

    const day = date.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = padTo2Digits(date.getHours());
    const minutes = padTo2Digits(date.getMinutes());

    return `${day} ${months[month]} ${year}, ${hours}:${minutes}`;
  };
  const getBrowserName = () => {
    let userAgentString = navigator.userAgent;
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;
    let IExplorerAgent =
      userAgentString.indexOf("MSIE") > -1 ||
      userAgentString.indexOf("rv:") > -1;
    let firefoxAgent = userAgentString.indexOf("Firefox") > -1;
    let safariAgent = userAgentString.indexOf("Safari") > -1;

    // Discard Safari since it also matches Chrome
    if (chromeAgent && safariAgent) safariAgent = false;

    let operaAgent = userAgentString.indexOf("OP") > -1;
    if (chromeAgent && operaAgent) chromeAgent = false;

    return operaAgent
      ? "Opera"
      : safariAgent
      ? "Safari"
      : firefoxAgent
      ? "Firefox"
      : IExplorerAgent
      ? "IE"
      : chromeAgent
      ? "Chrome"
      : "";
  };
  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(window.navigator?.userAgent);
  };
  const getBrowserLang = () => {
    return window.navigator?.language || "";
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const getUnique = (data = [], key = "") => {
    let unique = [];

    if (key) {
      data.forEach((elem) => {
        if (!unique.find((uniqueElem) => uniqueElem[key] === elem[key])) {
          unique.push(elem);
        }
      });
    } else {
      unique = [...new Set([...data])];
    }

    return unique;
  };

  /**
   * Calculates user accepted/rejected consents taking into account mandatory essentials
   * @param {props} { isDoNotSell?: boolean, isSavePreferences?: boolean }
   * @returns
   */
  const getConsentData = (props = {}) => {
    const { isDoNotSell = false, isSavePreferences = false } = props;
    // get mandatory that must be accepted (optOut disabled)
    const categoriesAccepted = domain.categories?.filter((c) => !c.optOut);

    let domainsAccepted = essentialsWhiteList || [];
    const domainsAcceptedRegExp = domainsAccepted.map((domain) => {
      const regex = new RegExp(domain);
      window.yett?.unblock(regex);
      return regex;
    });

    const cookiesAccepted = domain?.cookies.filter((cookie) => {
      const isMandatory = categoriesAccepted.includes(cookie.categoryId);

      let isInEssentialDomains = false;
      domainsAcceptedRegExp.forEach((regExp) => {
        if (cookie.domain.match(regExp)) {
          isInEssentialDomains = true;
        }
      });

      const isAccepted = isMandatory || isInEssentialDomains;

      if (isAccepted) {
        domainsAccepted.push(cookie.domain);
      }

      return isAccepted;
    });

    // get optional accepted by user
    if (isDoNotSell) {
      // accept categories which is not selling user data
      domain?.categories.forEach((category) => {
        if (!category.doNotSell) {
          categoriesAccepted.push(category);

          domain?.cookies.forEach((cookie) => {
            if (cookie.cookieCategoryId === category.id) {
              cookiesAccepted.push(cookie);
              domainsAccepted.push(cleanUrlString(cookie.domain));
            }
          });
        }
      });
    }

    if (isSavePreferences) {
      // accept categories that user marked as "allowed"
      document.querySelectorAll(".category.accepted").forEach((elem) => {
        const category = domain?.categories?.find((c) => c.id === elem.id);
        category && categoriesAccepted.push(category);
        domain?.cookies.forEach((cookie) => {
          if (cookie.cookieCategoryId === elem.id) {
            domainsAccepted.push(cleanUrlString(cookie.domain));
            cookiesAccepted.push(cookie);
          }
        });
      });
    }

    // calculate rejected data
    const cookiesRejected = domain.cookies.filter(
      (c) => !cookiesAccepted.find((accepted) => accepted.id === c.id)
    );

    const categoriesRejected = domain.categories.filter(
      (c) => !categoriesAccepted.find((accepted) => accepted.id === c.id)
    );

    const domainsRejected = domain.cookies
      .filter((c) => !cookiesAccepted.find((accepted) => accepted.id === c.id))
      .map((cookie) => cookie.domain);

    // return unique data
    return {
      categoriesAccepted: getUnique(categoriesAccepted, "id"),
      categoriesRejected: getUnique(categoriesRejected, "id"),
      cookiesAccepted: getUnique(cookiesAccepted, "name"),
      cookiesRejected: getUnique(cookiesRejected, "name"),
      domainsAccepted: getUnique(domainsAccepted),
      domainsRejected: getUnique(domainsRejected),
    };
  };

  // API requests
  const fetchDomainInfo = async () => {
    const response = await fetch(
      `${"https://playground-master-privacy-ops.lightbeamsecurity.com"}/api/cookie-consent/domain?domainName=${clientDomain}`
    );
    const domain = await response.json();
    domain.banner = domain.banner || {};
    domain.banner.layout = {};
    try {
      domain.banner.layout = JSON.parse(domain.banner.rawJSON);
    } catch (e) {
      return console.log("Cannot parse banner JSON");
    }

    return domain;
  };

  /* API to GET saved preferences */
  const fetchPreferences = async () => {
    const response = await fetch(`${webAppUrl}/api/cookie-consent/response`, {
      credentials: "include",
    });
    const savedPreferences = await response.json();
    savePreferencesInStorage(savedPreferences?.consentInfo?.categoriesAccepted);
    return savedPreferences.consentInfo;
  };

  /** Save accepted categories (only) in local storage */
  const savePreferencesInStorage = (categoriesAccepted) => {
    window.localStorage.setItem(
      LB_LOCAL_STORAGE_PREFERENCES_KEY,
      JSON.stringify({ categoriesAccepted })
    );
  };

  const postCookieConsent = ({
    consentAccepted,
    consentRejected,
    categoriesAccepted,
    categoriesRejected,
    headers = {},
  }) => {
    if (!domain) return;

    fetch(`${webAppUrl}/api/cookie-consent/response`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        status: "active",
        domain: clientDomain,
        networkIP: "",
        networkFamily: "",
        browserFingerprint: {
          device: isMobile() ? "mobile" : "desktop",
          browser: getBrowserName(),
          location: getBrowserLang(),
        },
        browserVisitorId: getCookie(VISITOR_ID) || "",
        consentInfo: {
          consentAccepted,
          consentRejected,
          categoriesAccepted,
          categoriesRejected,
        },
      }),
      headers,
    });
  };

  // DOM handlers
  const initHandlers = () => {
    document.addEventListener("click", function (e) {
      if (e.target?.id === "lb-cookie-consent-accept-all") {
        window.yett?.unblock();
        window.localStorage.setItem(
          LB_LOCAL_STORAGE_KEY,
          JSON.stringify({ blackList: [] })
        );
        const consentAccepted = domain.cookies.map((c) => c.name);
        savePreferencesInStorage(
          domain.categories.map((category) => category.id)
        );
        postCookieConsent({
          consentAccepted,
          consentRejected: [],
          categoriesAccepted: domain.categories.map((category) => category.id),
          categoriesRejected: [],
        });
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-reject-all") {
        const {
          cookiesAccepted,
          cookiesRejected,
          categoriesAccepted,
          categoriesRejected,
          domainsAccepted,
        } = getConsentData();

        window.localStorage.setItem(
          LB_LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: domainsAccepted })
        );

        savePreferencesInStorage([]);
        postCookieConsent({
          consentAccepted: cookiesAccepted.map((c) => c.name),
          consentRejected: cookiesRejected.map((c) => c.name),
          categoriesAccepted: categoriesAccepted.map((c) => c.id),
          categoriesRejected: categoriesRejected.map((c) => c.id),
        });
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-do-not-sell") {
        const {
          cookiesAccepted,
          cookiesRejected,
          categoriesAccepted,
          categoriesRejected,
          domainsAccepted,
          domainsRejected,
        } = getConsentData({ isDoNotSell: true });

        window.localStorage.setItem(
          LB_LOCAL_STORAGE_KEY,
          JSON.stringify({
            whiteList: domainsAccepted,
            blackList: domainsRejected,
          })
        );
        domainsAccepted.forEach((domain) =>
          window.yett?.unblock(new RegExp(domain))
        );

        savePreferencesInStorage(categoriesAccepted.map((c) => c.id));
        postCookieConsent({
          consentAccepted: cookiesAccepted.map((c) => c.name),
          consentRejected: cookiesRejected.map((c) => c.name),
          categoriesAccepted: categoriesAccepted.map((c) => c.id),
          categoriesRejected: categoriesRejected.map((c) => c.id),
        });
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-save-preferences") {
        const {
          cookiesAccepted,
          cookiesRejected,
          categoriesAccepted,
          categoriesRejected,
          domainsAccepted,
          domainsRejected,
        } = getConsentData({ isSavePreferences: true });

        window.localStorage.setItem(
          LB_LOCAL_STORAGE_KEY,
          JSON.stringify({
            whiteList: domainsAccepted,
            blackList: domainsRejected,
          })
        );
        domainsAccepted.forEach((domain) =>
          window.yett?.unblock(new RegExp(domain))
        );

        savePreferencesInStorage(categoriesAccepted.map((c) => c.id));
        postCookieConsent({
          consentAccepted: cookiesAccepted.map((c) => c.name),
          consentRejected: cookiesRejected.map((c) => c.name),
          categoriesAccepted: categoriesAccepted.map((c) => c.id),
          categoriesRejected: categoriesRejected.map((c) => c.id),
        });
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-open-preferences") {
        document
          .querySelector(".cookie-consent-banner-container")
          ?.classList.add("hidden");
        document
          .querySelector(".cookie-consent-banner-preferences")
          ?.classList.remove("hidden");
      }
      if (e.target?.classList.contains("lb-preferences-center-trigger")) {
        /* Show preferences center on click of trigger button */
        document
          .getElementById("cookie-consent-banner-preferences")
          ?.classList.remove("hidden");
      }
      if (e.target?.closest(".lb-preferences-banner-close-icon")) {
        /* Hide preferences center on click of close button */
        document
          .getElementById("cookie-consent-banner-preferences")
          ?.classList.add("hidden");
      }

      if (e.target?.closest(".category.accepted")) {
        const category = e.target?.closest(".category.accepted");
        Array.from(category?.classList).includes("expanded")
          ? category.classList.remove("expanded")
          : category.classList.add("expanded");
      }

      if (e.target.closest(".lb-switch")) {
        const container = e.target.closest(".lb-switch");

        const categoryId = container?.getAttribute("data-category-id");
        const isChecked = container?.querySelector(".lb-switch-input")?.checked;
        const category = document.getElementById(categoryId);

        if (isChecked) {
          category?.classList.add("accepted");
        } else {
          category?.classList.remove("accepted", "expanded");
        }
      }
    });

    window.lb = {
      showPreferencesCenter: function () {
        document
          .querySelector(".cookie-consent-banner-preferences")
          .classList.remove("hidden");
      },
    };
  };

  // renderers
  const renderCheckbox = ({
    id = "",
    label = "",
    checked = false,
    disabled = false,
  }) => {
    return `\
      <label \
        class="lb-checkbox-container lb-switch ${disabled ? "disabled" : ""}"\
        data-category-id="${id}"\
      >\
        ${label}\
        <input \
          class="lb-checkbox-input lb-switch-input" \
          type="checkbox"\
          id="checkbox-${id}"\
          ${checked ? "checked" : ""}\
          ${disabled ? "disabled" : ""}\
        >
        <span class="lb-checkbox-mark"></span>\
      </label>`;
  };

  const renderToggle = ({
    id = "",
    label = "",
    checked = false,
    disabled = false,
  }) => {
    return `\
      <div class="lb-toggle-container lb-switch" \
          data-category-id="${id}" \
          ${disabled ? `title="This category cannot be opted out of."` : ""}\
      >
        <input \
          class="lb-toggle-input lb-switch-input"
          type="checkbox" \
          id="checkbox-${id}" \
          ${checked ? "checked" : ""}\
          ${disabled ? "disabled" : ""}\
        />\
        <label \
          class="lb-toggle-label ${disabled ? "disabled" : ""}"\
          for="checkbox-${id}"\
        >\
          ${label}\
        </label>\
      </div>`;
  };

  const renderBanner = (banner, showPreferencesOnly = false) => {
    if (!banner) return;

    const btnCustomize = `\
      <button\
        id="lb-cookie-consent-open-preferences"\
        class="btn customize"\
        style="background-color: #${banner?.layout.banner?.actionButton?.backgroundColor};\
        color: #${banner?.layout.banner?.actionButton?.color};\
        border-color: #${banner?.layout.banner?.actionButton?.borderColor};"\
      >\
        ${banner?.layout.banner?.actionButton?.text}\
      </button>`;

    const btnReject = `\
      <button\
        id="lb-cookie-consent-reject-all"\
        class="btn reject"\
        style="background-color: #${banner?.layout.banner?.rejectAllButton?.backgroundColor};\
        color: #${banner?.layout.banner?.rejectAllButton?.color};\
        border-color: #${banner?.layout.banner?.rejectAllButton?.borderColor};"\
      >\
        ${banner?.layout.banner?.rejectAllButton?.text}\
      </button>`;

    const btnAccept = `\
      <button\
        id="lb-cookie-consent-accept-all"\
        class="btn accept"\
        style="background-color: #${banner?.layout.banner?.acceptAllButton?.backgroundColor};\
        color: #${banner?.layout.banner?.acceptAllButton?.color};\
        border-color: #${banner?.layout.banner?.acceptAllButton?.borderColor};"\
      >\
        ${banner?.layout.banner?.acceptAllButton?.text}\
      </button>`;

    const btnDoNotSell = `\
      <button\
        id="lb-cookie-consent-do-not-sell"\
        class="btn do-not-sell"\
        style="background-color: #${banner?.layout.banner?.doNotSellButton?.backgroundColor};\
        color: #${banner?.layout.banner?.doNotSellButton?.color};\
        border-color: #${banner?.layout.banner?.doNotSellButton?.borderColor};"\
      >\
        ${banner?.layout.banner?.doNotSellButton?.text}\
      </button>`;

    const policyUrl = banner?.layout.banner?.policyUrl
      ? `<a
            class="policy-link"
            href="${banner?.layout.banner?.policyUrl}"
            rel="noreferrer"
            target="_blank"
            style="color: #${banner?.layout?.banner?.policyTextColor};"\
          >
            ${banner?.layout.banner?.policy}
          </a>`
      : ``;

    document.body.insertAdjacentHTML(
      "beforeend",
      `\
    <div class="\
          cookie-consent-banner-container \
          ${banner?.layout.type} \
          ${banner?.layout.position?.join(" ")} \
          ${showPreferencesOnly ? " hidden" : ""} \
          ${isMobile() ? " mobile-view" : ""} \
      "
      id="lb-cookie-consent-banner">\
      <div class="overlay"></div>
      <div \
        class="main-banner"\
        style="background-color: #${banner?.layout.banner?.backgroundColor};\
               border-color: #${banner?.layout.banner?.borderColor};"\
      >\
      <div class="main-banner-wrapper">
        <div class="main-banner-body">\
          <div\
            class="policy-text lb-scrollbar"\
            style="color: #${banner?.layout?.banner?.bodyTextColor};"\
          >\
            ${banner?.layout.banner?.body}\
          </div>\
          ${policyUrl}\
        </div>\
        <div class="buttons">\
          ${banner.customizable ? btnCustomize : ""}\
          ${
            showButton({
              buttonName: "reject",
              consentType: banner.consentType,
            })
              ? btnReject
              : ""
          }\
          ${!!banner.linkDoNotSell ? btnDoNotSell : ""}\
          ${
            showButton({
              buttonName: "accept",
              consentType: banner.consentType,
            })
              ? btnAccept
              : ""
          }\
        </div>\
        </div>
      </div>\
    </div>
  `
    );
  };

  const renderPreferences = async (banner, showPreferencesOnly) => {
    const categories = domain.categories;

    /* Check if saved preferences present in Local Storage */
    let savedPreferences = JSON.parse(
      window.localStorage.getItem(LB_LOCAL_STORAGE_PREFERENCES_KEY)
    );
    /* If not in Local Storage, GET from API */
    if (!savedPreferences) {
      try {
        savedPreferences = await fetchPreferences();
      } catch (e) {
        savedPreferences = {};
      }
    }

    const htmlDescription = `\
      <div\
        class="description"\
        style="color: #${banner?.layout.preferences?.bodyTextColor};"\
      >\
        ${banner?.layout?.preferences?.body}\
      </div>
    `;

    const btnReject = `\
      <button\
        id="lb-cookie-consent-reject-all"\
        class="btn reject"\
        style="background-color: #${banner?.layout?.preferences?.rejectAllButton?.backgroundColor};\
        color: #${banner?.layout.preferences?.rejectAllButton?.color};\
        border-color: #${banner?.layout.preferences?.rejectAllButton?.borderColor};"\
      >\
        ${banner?.layout.preferences?.rejectAllButton?.text}\
      </button>`;

    const btnAccept = `\
      <button\
        id="lb-cookie-consent-accept-all"\
        class="btn accept"\
        style="background-color: #${banner?.layout.preferences?.acceptAllButton?.backgroundColor};\
        color: #${banner?.layout.preferences?.acceptAllButton?.color};\
        border-color: #${banner?.layout.preferences?.acceptAllButton?.borderColor};"\
      >\
        ${banner?.layout.preferences?.acceptAllButton?.text}\
      </button>`;

    const btnSavePreferences = `\
      <button\
        id="lb-cookie-consent-save-preferences"\
        class="btn customize"\
        style="background-color: #${banner?.layout?.preferences?.actionButton?.backgroundColor};\
        color: #${banner?.layout.preferences?.actionButton?.color};\
        border-color: #${banner?.layout.preferences?.actionButton?.borderColor};"\
      >\
        ${banner?.layout.preferences?.actionButton?.text}\
      </button>`;

    const btnDoNotSell = `\
      <button\
        id="lb-cookie-consent-do-not-sell"\
        class="btn do-not-sell"\
        style="background-color: #${banner?.layout.preferences?.doNotSellButton?.backgroundColor};\
        color: #${banner?.layout.preferences?.doNotSellButton?.color};\
        border-color: #${banner?.layout.preferences?.doNotSellButton?.borderColor};"\
      >\
        ${banner?.layout.preferences?.doNotSellButton?.text}\
      </button>`;

    const getCookieHtml = (cookie) => {
      const cookieDescription = `\
      <div class="row">\
        <div class="label">Description:</div>
        <div class="value">${cookie.description}</div>
      </div>`;

      return `\
          <div class="category-cookie">\
            <div class="row">\
              <div class="label">Cookie name:</div>
              <div class="value">${cookie.name}</div>
            </div>
            <div class="row">\
              <div class="label">Expires:</div>
              <div class="value">${getPrettyExpires(cookie.expires)}</div>
            </div>
            ${cookie.description ? cookieDescription : ""}
          </div>`;
    };

    const getCategoryHtml = (category) => {
      const showToggle =
        banner?.layout?.preferences?.category?.checkboxType === "toggle";

      const payload = {
        id: category.id,
        checked:
          savedPreferences?.categoriesAccepted?.includes(category.id) ||
          !category.optOut,
        disabled: !category.optOut,
      };

      const categoryCookies = domain.cookies.filter(
        (c) => c.cookieCategoryId === category.id
      );

      const htmlCaret = `<div class="icon-box">${SVG_CARET_RIGHT}</div>`;
      const htmlDescription = `<div class="lb-row category-description">${category?.description}</div>`;

      const html = `\
      <div class="category ${payload.checked ? "accepted" : ""}" id="${
        category.id
      }">\
        <div class="lb-row category-name">\
            ${categoryCookies.length ? htmlCaret : ""}\
          <div\
            class="title"\
            style="color: #${
              banner?.layout?.preferences?.category?.colorTitle
            };"\
          >\
            ${category?.name}\
          </div>\
          ${showToggle ? renderToggle(payload) : renderCheckbox(payload)}
        </div>\
        ${category?.description ? htmlDescription : ""}
        <div class="category-cookies">\
          ${categoryCookies?.map((c) => getCookieHtml(c))?.join("") || ""}\
        </div>\
      </div>\
      `;
      return html;
    };

    const htmlCookieCategories = `\
      <div class="cookie-categories lb-scrollbar">\
        ${categories?.map((c) => getCategoryHtml(c))?.join("") || ""}\
      </div>`;

    let cssClasses = "cookie-consent-banner-preferences lb-scrollbar ";
    if (!showPreferencesOnly) cssClasses += " hidden";
    if (isMobile()) cssClasses += " mobile-view";

    const htmlPreferences = `\
      <div \
        class="${cssClasses}" \
        id="cookie-consent-banner-preferences">\
          <div class="overlay"></div>\
          <div class="cookie-consent-banner-preferences-wrapper">
            <div class="lb-banner-header-wrapper">
              <div\
                class="banner-header"\
                style="color: #${banner?.layout.preferences?.titleTextColor};"\
              >
                ${banner?.layout?.preferences?.title}\
              </div>\
              <span class="lb-preferences-banner-close-icon">\
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#333" viewBox="0 0 256 256">\
                  <rect width="256" height="256" fill="none"></rect>\
                  <line x1="200" y1="56" x2="56" y2="200" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>\
                  <line x1="200" y1="200" x2="56" y2="56" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>\
                </svg>\
              </span>
            </div>
            <div class="preferences-banner-body lb-scrollbar">\
              ${banner?.layout?.preferences?.body ? htmlDescription : ""}\
              ${categories?.length ? htmlCookieCategories : ""}\
            </div>
            <div class="buttons">
              ${
                showButton({
                  buttonName: "reject",
                  consentType: banner.consentType,
                })
                  ? btnReject
                  : ""
              }\
              ${
                showButton({
                  buttonName: "accept",
                  consentType: banner.consentType,
                })
                  ? btnAccept
                  : ""
              }\
              ${!!banner.linkDoNotSell ? btnDoNotSell : ""}\
              ${btnSavePreferences}\
            </div>
            ${
              banner.layout.enableLightbeamBranding
                ? `<a href="https://www.lightbeam.ai/" target="_blank" class="lb-powered-by-container">
                      <p class="lb-powered-by-text">Powered by</p>
                      <img src="https://lb-common.s3.ap-south-1.amazonaws.com/lb-logo.png" alt="lb-logo" class="lb-powered-by-logo" />
                    </a>`
                : ""
            }
      </div>\
    </div>\
    `;

    // return htmlPreferences
    document.body.insertAdjacentHTML("beforeend", htmlPreferences);
  };

  const hideBanner = () => {
    document
      .getElementById("lb-cookie-consent-banner")
      ?.classList.add("hidden");
    document
      .getElementById("cookie-consent-banner-preferences")
      ?.classList.add("hidden");
  };

  // blockers / unblockers
  const injectHtml = (domain) => {
    const item = window.localStorage.getItem(LB_LOCAL_STORAGE_KEY);
    renderPreferences(domain.banner);
    if (!item) {
      renderBanner(domain.banner, showPreferences);
    }
  };

  // init
  const webAppDomainName = webAppUrl?.replace(/https?:\/\//i, "") || "";
  const essentialsWhiteList = [
    "^/",
    "^./",
    window.location.host,
    ...(webAppDomainName ? [webAppDomainName] : []),
  ];

  const init = () => {
    if (domain) {
      injectHtml(domain);
      initHandlers(domain);
    } else {
      setTimeout(() => init(), 100);
    }
  };

  domain = await fetchDomainInfo();
  init();
};
