const SVG_CARET_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#333333" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="96 48 176 128 96 208" fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>`;

const renderCookieConsent = async () => {
  const root = document.getElementById("lb-cookie-consent");
  const webAppUrl = root?.getAttribute("data-web-app") || "";
  const clientDomain = root?.getAttribute("data-domain") || "";
  const showPreferences = root?.getAttribute("data-preferences-only") || "";
  const VISITOR_ID = "_lb_fp";
  let domain;

  const LOCAL_STORAGE_KEY = "lb-cookie-consent";

  const cookieConsentTypes = {
    accept: "accept",
    reject: "reject",
    acceptReject: "accept-reject",
  };

  const cookieTypes = {
    system: "system",
    manual: "manual",
  };

  // utils
  const cleanUrlString = (domain) =>
    domain.replace(/https?:\/\//i, "").replace(/^(\.+)/g, "");

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
  const setCookie = ({ name = "", value = "", expires = 0 }) => {
    const expiresStr = expires
      ? "; expires=" + new Date(expires * 1000).toUTCString()
      : "";
    document.cookie = `${name}=${value}${expiresStr}; path=/`;
  };
  const deleteCookie = (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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

  const setUpCookies = (acceptedCookies = []) => {
    acceptedCookies
      .filter((c) => c.cookieType === cookieTypes.manual)
      .forEach((c) => {
        const cookieExists = getCookie(c.name);
        if (!cookieExists) {
          setCookie(c);
        }
      });
  };

  // DOM handlers
  const initHandlers = () => {
    document.addEventListener("click", function (e) {
      if (e.target?.id === "lb-cookie-consent-accept-all") {
        window.yett?.unblock();
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: [] })
        );
        const consentAccepted = domain.cookies.map((c) => c.name);
        postCookieConsent({ consentAccepted, consentRejected: [] });
        setUpCookies(domain.cookie);
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-reject-all") {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: essentialsWhiteList })
        );
        const regExpArr = essentialsWhiteList.map(
          (pattern) => new RegExp(pattern)
        );
        window.yett?.unblock(regExpArr);

        const acceptedCookies = domain.cookies.filter((cookie) => {
          let isMatch = false;
          regExpArr.forEach((regExp) => {
            if (cookie.domain.match(regExp)) {
              isMatch = true;
            }
          });

          return isMatch;
        });
        const rejectedCookies = domain.cookies.filter(
          (c) => !acceptedCookies.find((accepted) => accepted.id === c.id)
        );
        postCookieConsent({
          consentRejected: rejectedCookies.map((c) => c.name),
        });
        setUpCookies(acceptedCookies);
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-save-preferences") {
        const acceptedDomains = [];
        const consentAccepted = [];
        const consentRejected = [];
        const acceptedCookies = [];

        document.querySelectorAll(".category.accepted").forEach((elem) => {
          domain?.cookies.forEach((cookie) => {
            if (cookie.cookieCategoryId === elem.id) {
              acceptedCookies.push(cookie);
              acceptedDomains.push(cleanUrlString(cookie.domain));
              consentAccepted.push(cookie.name);
            }
          });
        });
        document
          .querySelectorAll(".category:not(.accepted)")
          .forEach((elem) => {
            domain?.cookies.forEach((cookie) => {
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
        window.yett?.unblock(regExpArr);

        postCookieConsent({ consentAccepted, consentRejected });
        setUpCookies(acceptedCookies);
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-open-preferences") {
        document
          .querySelector(".cookie-consent-banner-container")
          .classList.add("hidden");
        document
          .querySelector(".cookie-consent-banner-preferences")
          .classList.remove("hidden");
      }
    });

    document
      .getElementById("cookie-consent-banner-preferences")
      ?.addEventListener("click", function (e) {
        const category = e.target?.closest(".category.accepted");
        if (category) {
          Array.from(category?.classList).includes("expanded")
            ? category.classList.remove("expanded")
            : category.classList.add("expanded");
        }
      });

    document
      .getElementById("cookie-consent-banner-preferences")
      ?.addEventListener("change", function (e) {
        const container = e.target.closest(".lb-switch");

        const categoryId = container?.getAttribute("data-category-id");
        const isChecked = container?.querySelector(".lb-switch-input")?.checked;
        const category = document.getElementById(categoryId);

        if (isChecked) {
          category?.classList.add("accepted");
        } else {
          category?.classList.remove("accepted", "expanded");
        }
      });
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

    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `\
    <div class="\
          cookie-consent-banner-container \
          ${banner?.layout.type} \
          ${banner?.layout.position?.join(" ")} \
          ${showPreferencesOnly ? "hidden" : ""} \
      "id="lb-cookie-consent-banner">\
      <div class="overlay"></div>
      <div \
        class="main-banner"\
        style="background-color: #${banner?.layout.banner?.backgroundColor};\
               border-color: #${banner?.layout.banner?.borderColor};"\
      >\
        <div class="main-banner-body">\
          <div\
            class="policy-text"\
            style="color: #${banner?.layout?.banner?.bodyTextColor};"\
          >\
            ${banner?.layout.banner?.body}\
          </div>\
          <a
            class="policy-link"
            href="${banner?.layout.banner?.policyUrl}"
            rel="noreferrer"
            target="_blank"
            style="color: #${banner?.layout?.banner?.policyTextColor};"\
          >
            ${banner?.layout.banner?.policy}
          </a>\
        </div>\
        <div class="buttons">\
          ${banner.customizable ? btnCustomize : ""}\
          ${
            banner.consentType === cookieConsentTypes.acceptReject ||
            banner.consentType === cookieConsentTypes.reject
              ? btnReject
              : ""
          }\
          ${
            banner.consentType === cookieConsentTypes.acceptReject ||
            banner.consentType === cookieConsentTypes.accept
              ? btnAccept
              : ""
          }\
        </div>\
      </div>\
    </div>
    ${renderPreferences(banner, showPreferencesOnly)}
  `
    );
  };

  const renderPreferences = (banner, showByDefault = false) => {
    const categories = domain.categories;

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
              <div class="value">${new Date(
                cookie.expires
              ).toDateString()}</div>
            </div>
            ${cookie.description ? cookieDescription : ""}
          </div>`;
    };

    const getCategoryHtml = (category) => {
      const showToggle =
        banner?.layout?.preferences?.category?.checkboxType === "toggle";

      const checkboxPayload = {
        id: category.id,
        checked: !category.optOut,
        disabled: !category.optOut,
      };

      const categoryCookies = domain.cookies.filter(
        (c) => c.cookieCategoryId === category.id
      );

      const htmlCaret = `<div class="icon-box">${SVG_CARET_RIGHT}</div>`;
      const htmlDescription = `<div class="row category-description">${category?.description}</div>`;

      const html = `\
      <div class="category ${!category.optOut ? "accepted" : ""}" id="${
        category.id
      }">\
        <div class="row category-name">\
            ${categoryCookies.length ? htmlCaret : ""}\
          <div\
            class="title"\
            style="color: #${
              banner?.layout?.preferences?.category?.colorTitle
            };"\
          >\
            ${category?.name}\
          </div>\
          ${
            showToggle
              ? renderToggle(checkboxPayload)
              : renderCheckbox(checkboxPayload)
          }
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
      <div class="cookie-categories">\
        ${categories?.map((c) => getCategoryHtml(c))?.join("") || ""}\
      </div>`;

    const htmlPreferences = `\
      <div \
        class="cookie-consent-banner-preferences ${
          showByDefault ? "" : "hidden"
        }" \
        id="cookie-consent-banner-preferences">\
        <div\
          class="banner-header"\
          style="color: #${banner?.layout.preferences?.titleTextColor};"\
        >
          ${banner?.layout?.preferences?.title}\
        </div>\
        <div class="preferences-banner-body">\
          ${banner?.layout?.preferences?.body ? htmlDescription : ""}\
          ${categories.length ? htmlCookieCategories : ""}\
        </div>
        <div class="buttons">
          ${
            banner.consentType === cookieConsentTypes.acceptReject ||
            banner.consentType === cookieConsentTypes.reject
              ? btnReject
              : ""
          }\
          ${
            banner.consentType === cookieConsentTypes.acceptReject ||
            banner.consentType === cookieConsentTypes.accept
              ? btnAccept
              : ""
          }\
          ${btnSavePreferences}\
        </div>
      </div>\
    `;

    return htmlPreferences;
  };

  const hideBanner = () => {
    document.getElementById("lb-cookie-consent-banner")?.remove();
    document.getElementById("cookie-consent-banner-preferences")?.remove();
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

    if (parsed) {
      const regExpArr = parsed?.whiteList.map((pattern) => new RegExp(pattern));
      parsed?.whiteList.length
        ? window.yett?.unblock(regExpArr)
        : window.yett?.unblock();
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
