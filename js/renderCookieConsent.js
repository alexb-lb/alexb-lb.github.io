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
    const response = await fetch(
      `${"https://playground-master-privacy-ops.lightbeamsecurity.com"}/api/cookie-consent/response`,
      {
        credentials: "include",
      }
    );
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

    fetch(
      `${"https://playground-master-privacy-ops.lightbeamsecurity.com"}/api/cookie-consent/response`,
      {
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
      }
    );
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
        window.localStorage.setItem(
          LB_LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: essentialsWhiteList })
        );
        const regExpArr = essentialsWhiteList.map((domain) => {
          const regex = new RegExp(domain);
          window.yett?.unblock(regex);
          return regex;
        });

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
        savePreferencesInStorage([]);
        postCookieConsent({
          consentAccepted: acceptedCookies.map((c) => c.name),
          consentRejected: rejectedCookies.map((c) => c.name),
          categoriesAccepted: [],
          categoriesRejected: domain.categories.map((category) => category.id),
        });
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-do-not-sell") {
        const domainsAccepted = [];
        const domainsRejected = [];
        const consentAccepted = [];
        const consentRejected = [];
        const categoriesAccepted = [];
        const categoriesRejected = [];

        domain?.categories.forEach((category) => {
          if (category.doNotSell) {
            // rejected categories, consents and domains
            categoriesRejected.push(category.id);

            domain?.cookies.forEach((cookie) => {
              if (cookie.cookieCategoryId === category.id) {
                domainsRejected.push(cleanUrlString(cookie.domain));
                consentRejected.push(cookie.name);
              }
            });
          } else {
            // allowed categories, consents and domains
            categoriesAccepted.push(category.id);

            domain?.cookies.forEach((cookie) => {
              if (cookie.cookieCategoryId === category.id) {
                domainsAccepted.push(cleanUrlString(cookie.domain));
                consentAccepted.push(cookie.name);
              }
            });
          }
        });

        const uniqueDomainsAccepted = [
          ...new Set([...domainsAccepted, ...essentialsWhiteList]),
        ];
        const uniqueDomainsRejected = [
          ...new Set(
            domainsRejected.filter(
              (d) =>
                !essentialsWhiteList.find((essentials) =>
                  d.includes(essentials)
                )
            )
          ),
        ];
        window.localStorage.setItem(
          LB_LOCAL_STORAGE_KEY,
          JSON.stringify({
            whiteList: uniqueDomainsAccepted,
            blackList: uniqueDomainsRejected,
          })
        );
        uniqueDomainsAccepted.forEach((domain) =>
          window.yett?.unblock(new RegExp(domain))
        );

        savePreferencesInStorage(categoriesAccepted);
        postCookieConsent({
          consentAccepted,
          consentRejected,
          categoriesAccepted,
          categoriesRejected,
        });
        hideBanner();
      }
      if (e.target?.id === "lb-cookie-consent-save-preferences") {
        const domainsAccepted = [];
        const domainsRejected = [];
        const consentAccepted = [];
        const consentRejected = [];
        const categoriesAccepted = [];

        document.querySelectorAll(".category.accepted").forEach((elem) => {
          categoriesAccepted.push(elem.id);
          domain?.cookies.forEach((cookie) => {
            if (cookie.cookieCategoryId === elem.id) {
              domainsAccepted.push(cleanUrlString(cookie.domain));
              consentAccepted.push(cookie.name);
            }
          });
        });
        document
          .querySelectorAll(".category:not(.accepted)")
          .forEach((elem) => {
            domain?.cookies.forEach((cookie) => {
              if (cookie.cookieCategoryId === elem.id) {
                domainsRejected.push(cleanUrlString(cookie.domain));
                consentRejected.push(cookie.name);
              }
            });
          });

        const uniqueDomainsAccepted = [
          ...new Set([...domainsAccepted, ...essentialsWhiteList]),
        ];
        const uniqueDomainsRejected = [
          ...new Set(
            domainsRejected.filter(
              (d) =>
                !essentialsWhiteList.find((essentials) =>
                  d.includes(essentials)
                )
            )
          ),
        ];
        window.localStorage.setItem(
          LB_LOCAL_STORAGE_KEY,
          JSON.stringify({
            whiteList: uniqueDomainsAccepted,
            blackList: uniqueDomainsRejected,
          })
        );
        uniqueDomainsAccepted.forEach((domain) =>
          window.yett?.unblock(new RegExp(domain))
        );

        savePreferencesInStorage(categoriesAccepted);
        postCookieConsent({
          consentAccepted,
          consentRejected,
          categoriesAccepted,
          categoriesRejected: domain.categories
            .filter((c) => !categoriesAccepted.includes(c.id))
            .map((c) => c.id),
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
          ${showPreferencesOnly ? "hidden" : ""} \
      "id="lb-cookie-consent-banner">\
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
            banner.consentType === cookieConsentTypes.acceptReject ||
            banner.consentType === cookieConsentTypes.reject
              ? btnReject
              : ""
          }\
          ${!!banner.linkDoNotSell ? btnDoNotSell : ""}\
          ${
            banner.consentType === cookieConsentTypes.acceptReject ||
            banner.consentType === cookieConsentTypes.accept
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

    console.log("renderPreferences");

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
          savedPreferences?.categoriesAccepted?.includes(category.id) ?? true,
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

    const htmlPreferences = `\
      <div \
        class="cookie-consent-banner-preferences lb-scrollbar ${
          showPreferencesOnly ? "" : "hidden"
        }" \
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
  const essentialsWhiteList = [
    "^/",
    "^./",
    window.location.host,
    ...(webAppUrl ? [webAppUrl.replace(/https?:\/\//i, "")] : []),
  ];

  const init = () => {
    console.log("init renderCookieConsent");
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
