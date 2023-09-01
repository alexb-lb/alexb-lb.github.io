const SVG_CARET_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#333333" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="96 48 176 128 96 208" fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>`;

const renderCookieConsent = async () => {
  const VISITOR_ID = "_lb_fp";
  const LOCAL_STORAGE_KEY = "lb-cookie-consent";

  const root = document.getElementById("lb-cookie-consent");
  let webAppUrl = "";
  let clientDomain = "";
  let showPreferences = "";
  let domain;

  if (root) {
    webAppUrl = root.getAttribute("data-web-app") || "";
    clientDomain = root.getAttribute("data-domain") || "";
    showPreferences = root.getAttribute("data-preferences-only") || "";
  }

  let userAgent = "";
  if (window.navigator && window.navigator.userAgent) {
    userAgent = window.navigator.userAgent;
  }

  const bannerTypes = {
    classic: "classic",
    floating: "floating",
    popup: "popup",
  };

  const bannerPositions = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    center: "center",
  };

  const cookieConsentTypes = {
    accept: "accept",
    reject: "reject",
    acceptReject: "accept-reject",
  };

  // utils
  const cleanUrlString = (domain) =>
    domain.replace(/https?:\/\//i, "").replace(/^(\.+)/g, "");

  const getBrowserName = () => {
    if (!userAgent) return "";

    const isOpera =
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      userAgent.indexOf(" OPR/") >= 0;

    var isFirefox = typeof InstallTrigger !== "undefined";
    var isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        !window["safari"] ||
          (typeof safari !== "undefined" && window["safari"].pushNotification)
      );
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isEdgeChromium = isChrome && userAgent.indexOf("Edg") != -1;
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return isFirefox
      ? "Firefox"
      : isSafari
      ? "Safari"
      : isIE
      ? "IE"
      : isEdge
      ? "Edge"
      : isChrome
      ? "Chrome"
      : isEdgeChromium
      ? "Edge chromium"
      : isBlink
      ? "Blink"
      : "";
  };

  const isMobile = () => {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(userAgent);
  };

  const getBrowserLang = () => {
    return (window.navigator && window.navigator.language) || "";
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const getPrettyDate = (incomingDate) => {
    if (!incomingDate) return "--";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(+incomingDate * 1000);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  // API requests
  const fetchDomainInfo = async () => {
    const response = await fetch(
      `${webAppUrl}/api/cookie-consent/domain?domainName=${clientDomain}`
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

  const postCookieConsent = ({
    consentAccepted,
    consentRejected,
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
        consentInfo: { consentAccepted, consentRejected },
      }),
      headers,
    });
  };

  // DOM handlers
  const initHandlers = () => {
    document.addEventListener("click", function (e) {
      if (e.targe && e.target.id === "lb-cookie-consent-accept-all") {
        window.yet && window.yett.unblock();
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: [] })
        );
        postCookieConsent({
          consentAccepted: domain.cookies.map((c) => c.name),
          consentRejected: [],
        });
        hideBanner();
      }

      if (e.targe && e.target.id === "lb-cookie-consent-reject-all") {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: essentialsWhiteList })
        );
        const regExpArr = essentialsWhiteList.map(
          (pattern) => new RegExp(pattern)
        );
        window.yett && window.yett.unblock(regExpArr);

        const consentRejected = domain.cookies
          .filter((cookie) => {
            let isMatch = false;
            regExpArr.forEach((regExp) => {
              if (cookie.domain.match(regExp)) {
                isMatch = true;
              }
            });

            return isMatch;
          })
          .map((cookie) => cookie.name);

        postCookieConsent({ consentRejected });
        hideBanner();
      }
      if (e.target && e.target.id === "lb-cookie-consent-save-preferences") {
        const acceptedDomains = [];
        const consentAccepted = [];
        const consentRejected = [];

        document.querySelectorAll(".category.accepted").forEach((elem) => {
          domain &&
            domain.cookies.forEach((cookie) => {
              if (cookie.cookieCategoryId === elem.id) {
                acceptedDomains.push(cleanUrlString(cookie.domain));
                consentAccepted.push(cookie.name);
              }
            });
        });
        document
          .querySelectorAll(".category:not(.accepted)")
          .forEach((elem) => {
            domain &&
              domain.cookies.forEach((cookie) => {
                if (cookie.cookieCategoryId === elem.id) {
                  consentRejected.push(cookie.name);
                }
              });
          });

        const uniqueDomains = [...new Set(acceptedDomains)];
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: uniqueDomains })
        );
        const regExpArr = uniqueDomains.map((pattern) => new RegExp(pattern));
        window.yett && window.yett.unblock(regExpArr);

        postCookieConsent({ consentAccepted, consentRejected });
        hideBanner();
      }
      if (e.target && e.target.id === "lb-cookie-consent-open-preferences") {
        document
          .querySelector(".cookie-consent-banner-container")
          .classList.add("hidden");
        document
          .querySelector(".cookie-consent-banner-preferences")
          .classList.remove("hidden");
      }
    });

    const preferences = document.getElementById(
      "cookie-consent-banner-preferences"
    );
    if (preferences) {
      preferences.addEventListener("click", function (e) {
        const category = e.target && e.target.closest(".category.accepted");
        if (category && category.classList) {
          Array.from(category.classList).includes("expanded")
            ? category.classList.remove("expanded")
            : category.classList.add("expanded");
        }
      });

      preferences.addEventListener("change", function (e) {
        const container = e.target.closest(".lb-switch");
        if (!container) return;

        const categoryId = container.getAttribute("data-category-id");
        const input = container.querySelector(".lb-switch-input");
        const isChecked = input && input.checked;
        const category = document.getElementById(categoryId);
        if (category && category.classList) {
          if (isChecked) {
            category.classList.add("accepted");
          } else {
            category.classList.remove("accepted", "expanded");
          }
        }
      });
    }
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
      <div class="lb-toggle-container lb-switch" data-category-id="${id}">
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

  const renderActionButton = (props) => {
    const {
      id = "",
      backgroundColor = "FFF",
      color = "000",
      borderColor = "FFF",
      text = "Preferences",
    } = props || {};

    return `\
      <button\
        id="${id ? id : ""}"\
        class="btn customize"\
        style="background-color: #${backgroundColor};\
        color: #${color};\
        border-color: #${borderColor};"\
      >\
        ${text}\
      </button>`;
  };

  const renderRejectButton = (props) => {
    const {
      backgroundColor = "FFF",
      color = "000",
      borderColor = "FFF",
      text = "Accept all",
    } = props || {};

    return `\
        <button\
          id="lb-cookie-consent-reject-all"\
          class="btn reject"\
          style="background-color: #${backgroundColor};\
          color: #${color};\
          border-color: #${borderColor};"\
        >\
          ${text}\
        </button>`;
  };

  const renderAcceptButton = (props) => {
    const {
      backgroundColor = "FFF",
      color = "000",
      borderColor = "FFF",
      text = "Accept all",
    } = props || {};

    return `\
        <button\
          id="lb-cookie-consent-accept-all"\
          class="btn accept"\
          style="background-color: #${backgroundColor};\
          color: #${color};\
          border-color: #${borderColor};"\
        >\
          ${text}\
        </button>`;
  };

  const renderBanner = (banner, showPreferencesOnly = false) => {
    if (!banner) return;
    const layout = banner && banner.layout;
    const mainBanner = layout && layout.banner;

    if (!mainBanner) return;

    const showReject =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.reject;
    const showAccept =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.accept;

    const btnCustomize = renderActionButton({
      ...(mainBanner.actionButton || {}),
      id: "lb-cookie-consent-open-preferences",
    });
    const rejectButton = renderRejectButton(mainBanner.rejectAllButton);
    const acceptButton = renderAcceptButton(mainBanner.acceptAllButton);

    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `\
        <div \
          class="\
          cookie-consent-banner-container \
          ${layout && layout.type} \
          ${layout && layout.position ? layout.position.join(" ") : ""} \
          ${showPreferencesOnly ? "hidden" : ""} \
          "id="lb-cookie-consent-banner"\
        >\
          <div class="overlay"></div>
          <div \
            class="main-banner"\
            style="background-color: #${
              mainBanner && mainBanner.backgroundColor
            };\
                   border-color: #${mainBanner && mainBanner.borderColor};"\
          >\
            <div class="main-banner-body">\
              <div\
                class="policy-text"\
                style="color: #${mainBanner && mainBanner.bodyTextColor};"\
              >\
                ${mainBanner && mainBanner.body}\
              </div>\
              <a
                class="policy-link"
                href="${mainBanner && mainBanner.policyUrl}"
                rel="noreferrer"
                target="_blank"
                style="color: #${mainBanner && mainBanner.policyTextColor};"\
              >
                ${mainBanner && mainBanner.policy}
              </a>\
            </div>\
            <div class="buttons">\
              ${banner.customizable ? btnCustomize : ""}\
              ${showReject ? rejectButton : ""}\
              ${showAccept ? acceptButton : ""}\
            </div>\
          </div>\
        </div>
        ${renderPreferences(banner, showPreferencesOnly)}
      `
    );
  };

  const renderPreferences = (banner, showByDefault = false) => {
    const categories = domain.categories || [];
    if (!banner) return;
    const layout = banner && banner.layout;
    const preferences = layout && layout.preferences;
    if (!preferences) return;

    const categorySettings = preferences.category;

    const showReject =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.reject;
    const showAccept =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.accept;

    const btnSavePreferences = renderActionButton({
      ...(preferences.actionButton || {}),
      id: "lb-cookie-consent-save-preferences",
    });
    const rejectButton = renderRejectButton(preferences.rejectAllButton);
    const acceptButton = renderAcceptButton(preferences.acceptAllButton);

    const htmlDescription = `\
      <div\
        class="description"\
        style="color: #${preferences && preferences.bodyTextColor};"\
      >\
        ${preferences && preferences.body}\
      </div>
    `;

    const getCookieHtml = (cookie) => {
      const cookieDescription = `\
      <div class="row">\
        <div class="label">Description:</div>
        <div class="value">${cookie.description}</div>
      </div>`;

      return `\
          <div class="category-cookie">\
            <div class="row">\
              <div class="label">Cookie name:</div>\
              <div class="value">${cookie.name}</div>\
            </div>\
            <div class="row">\
              <div class="label">Expires:</div>\
              <div class="value">${getPrettyDate(cookie.expires)}</div>\
            </div>\
            ${cookie.description ? cookieDescription : ""}
          </div>`;
    };

    const getCategoryHtml = (category) => {
      const {
        id = "",
        name = "",
        optOut = false,
        description = "",
      } = category || {};
      const showToggle =
        categorySettings && categorySettings.checkboxType === "toggle";

      const checkboxPayload = { id, checked: !optOut, disabled: !optOut };
      const categoryCookies = domain.cookies.filter(
        (c) => c.cookieCategoryId === id
      );

      const htmlCaret = `<div class="icon-box">${SVG_CARET_RIGHT}</div>`;
      const htmlDescription = `<div class="row category-description">${description}</div>`;

      const htmlCategoryCookies = `\
        <div class="category-cookies">\
          ${
            (categoryCookies &&
              categoryCookies.map((c) => getCookieHtml(c)).join("")) ||
            ""
          }\
        </div>`;

      const html = `\
      <div class="category ${!optOut ? "accepted" : ""}" id="${id}">\
        <div class="row category-name">\
            ${categoryCookies.length ? htmlCaret : ""}\
          <div\
            class="title"\
            style="color: #${
              categorySettings ? categorySettings.colorTitle : "000"
            };"\
          >\
            ${name}\
          </div>\
          ${
            showToggle
              ? renderToggle(checkboxPayload)
              : renderCheckbox(checkboxPayload)
          }
        </div>\
        ${description ? htmlDescription : ""}
        ${categoryCookies && categoryCookies.length ? htmlCategoryCookies : ""}
      </div>\
      `;
      return html;
    };

    const htmlCookieCategories = `\
      <div class="cookie-categories">\
        ${categories.map((c) => getCategoryHtml(c)).join("") || ""}\
      </div>`;

    const htmlPreferences = `\
      <div \
        class="cookie-consent-banner-preferences ${
          showByDefault ? "" : "hidden"
        }" \
        id="cookie-consent-banner-preferences">\
        <div\
          class="banner-header"\
          style="color: #${preferences.titleTextColor || ""};"\
        >
          ${preferences.title || ""}\
        </div>\
        <div class="preferences-banner-body">\
          ${preferences.body ? htmlDescription : ""}\
          ${!!categories.length ? htmlCookieCategories : ""}\
        </div>
        <div class="buttons">
          ${showReject ? rejectButton : ""}\
          ${showAccept ? acceptButton : ""}\
          ${btnSavePreferences}\
        </div>
      </div>\
    `;

    return htmlPreferences;
  };

  const hideBanner = () => {
    const banner = document.getElementById("lb-cookie-consent-banner");
    banner && banner.remove();
    const preferences = document.getElementById(
      "cookie-consent-banner-preferences"
    );
    preferences && preferences.remove();
  };

  // blockers / unblockers
  const initScriptBlocking = (domain) => {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) {
      return renderBanner(domain.banner, showPreferences === "true");
    }

    let parsed = null;
    try {
      parsed = JSON.parse(item);
    } catch (e) {
      console.log("cannot parse whitelisted domains");
    }

    if (parsed && parsed.whiteList && window.yett) {
      const regExpArr = parsed.whiteList.map((pattern) => new RegExp(pattern));
      parsed.whiteList.length
        ? window.yett.unblock(regExpArr)
        : window.yett.unblock();
    }
  };

  // init
  const essentialsWhiteList = ["^/", "^./", window.location.host];
  if (webAppUrl) {
    essentialsWhiteList.push(cleanUrlString(webAppUrl));
  }

  domain = await fetchDomainInfo();

  if (domain) {
    initScriptBlocking(domain);
    initHandlers(domain);
  }
};
