var SVG_CARET_RIGHT =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#333333" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="96 48 176 128 96 208" fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>';

var renderCookieConsent = function () {
  var VISITOR_ID = "_lb_fp";
  var LOCAL_STORAGE_KEY = "lb-cookie-consent";

  var root = document.getElementById("lb-cookie-consent");
  var webAppUrl = "";
  var clientDomain = "";
  var showPreferences = "";
  var domain;

  if (root) {
    webAppUrl = root.getAttribute("data-web-app") || "";
    clientDomain = root.getAttribute("data-domain") || "";
    showPreferences = root.getAttribute("data-preferences-only") || "";
  }

  var userAgent = "";
  if (window.navigator && window.navigator.userAgent) {
    userAgent = window.navigator.userAgent;
  }

  var bannerTypes = {
    classic: "classic",
    floating: "floating",
    popup: "popup",
  };

  var bannerPositions = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    center: "center",
  };

  var cookieConsentTypes = {
    accept: "accept",
    reject: "reject",
    acceptReject: "accept-reject",
  };

  // utils
  var cleanUrlString = function (domain) {
    domain.replace(/https?:\/\//i, "").replace(/^(\.+)/g, "");
  };

  var getBrowserName = function () {
    if (!userAgent) return "";

    var isOpera =
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

  var isMobile = function () {
    var regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(userAgent);
  };

  var getBrowserLang = function () {
    return (window.navigator && window.navigator.language) || "";
  };

  var getCookie = function (name) {
    var value = ";" + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  var getPrettyDate = function (incomingDate) {
    if (!incomingDate) return "--";

    var months = [
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

    var date = new Date(+incomingDate * 1000);
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    return day + " " + month + " " + year + ", " + hours + ":" + minutes;
  };

  var filterArray = function (array, callback) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      if (!!callback(array[i])) {
        filtered.push(array[i]);
      }
    }

    return filtered;
  };
  var mapArray = function (array, callback) {
    var mapped = [];
    for (var i = 0; i < array.length; i++) {
      var updated = callback(array[i]);
      mapped.push(updated);
    }

    return mapped;
  };
  var getUniqueArray = function (array) {
    var j = {};

    array.forEach(function (v) {
      j[v + "::" + typeof v] = v;
    });

    return Object.keys(j).map(function (v) {
      return j[v];
    });
  };

  // API requests
  // var httpRequest = function (params) {
  //   var method = params.method || "GET";
  //   var url = params.url || "";
  //   var body = params.body;
  //   var xhr = new XMLHttpRequest();

  //   return new Promise(function (res, rej) {
  //     xhr.open(method, url, true);
  //     xhr.onload = res;
  //     xhr.onerror = rej;
  //     if (body) xhr.send(body);
  //   });
  // };
  var httpRequest = function (params, callback) {
    var method = params.method || "GET";
    var url = params.url || "";
    var body = params.body;

    var xhr = new XMLHttpRequest();

    xhr.open(method, url);
    if (body) {
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(body));
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        console.log(callback(xhr.responseText));
        // try {
        //   domain.banner.layout = JSON.parse(domain.banner.rawJSON);
        // } catch (e) {
        //   return console.log("Cannot parse banner JSON");
        // }
        // callback(JSON.parse(xhr.responseText));
      }
    };
  };

  var fetchDomainInfo = function (callback) {
    console.log("fetchDomainInfo");
    // var response = await fetch(
    //   webAppUrl + "/api/cookie-consent/domain?domainName=" + clientDomain
    // );
    // var domain = await response.json();
    // domain.banner = domain.banner || {};
    // domain.banner.layout = {};
    // try {
    //   domain.banner.layout = JSON.parse(domain.banner.rawJSON);
    // } catch (e) {
    //   return console.log("Cannot parse banner JSON");
    // }

    // return domain;

    const payload = {
      url: webAppUrl + "/api/cookie-consent/domain?domainName=" + clientDomain,
    };
    return httpRequest(payload, function (data) {
      console.log(data);
      callback(data);
    });
  };

  var postCookieConsent = function (data) {
    if (!domain) return;

    var consentAccepted = data.consentAccepted || [];
    var consentRejected = data.consentRejected || [];
    var headers = data.headers || {};

    const payload = {
      url: webAppUrl + "/api/cookie-consent/response",
      method: "POST",
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
          consentAccepted: consentAccepted,
          consentRejected: consentRejected,
        },
      }),
      headers: headers,
    };

    return httpRequest(payload);
  };

  // DOM handlers
  var initHandlers = function () {
    document.addEventListener("click", function (e) {
      if (e.targe && e.target.id === "lb-cookie-consent-accept-all") {
        window.yet && window.yett.unblock();
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: [] })
        );
        postCookieConsent({
          consentAccepted: mapArray(domain.cookies, function (c) {
            return c.name;
          }),
          consentRejected: [],
        });
        hideBanner();
      }

      if (e.targe && e.target.id === "lb-cookie-consent-reject-all") {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: essentialsWhiteList })
        );
        var regExpArr = mapArray(essentialsWhiteList, function (pattern) {
          return new RegExp(pattern);
        });
        window.yett && window.yett.unblock(regExpArr);

        var consentRejectedFiltered = filterArray(
          domain.cookies,
          function (cookie) {
            var isMatch = false;
            for (let i = 0; i < regExpArr.length; i++) {
              const regExp = regExpArr[i];
              if (cookie.domain.match(regExp)) {
                isMatch = true;
              }
            }
            return isMatch;
          }
        );

        var consentRejected = mapArray(
          consentRejectedFiltered,
          function (cookie) {
            return cookie.name;
          }
        );

        postCookieConsent({ consentRejected: consentRejected });
        hideBanner();
      }
      if (e.target && e.target.id === "lb-cookie-consent-save-preferences") {
        var acceptedDomains = [];
        var consentAccepted = [];
        var consentRejected = [];

        document
          .querySelectorAll(".category.accepted")
          .forEach(function (elem) {
            domain &&
              domain.cookies.forEach(function (cookie) {
                if (cookie.cookieCategoryId === elem.id) {
                  acceptedDomains.push(cleanUrlString(cookie.domain));
                  consentAccepted.push(cookie.name);
                }
              });
          });
        document
          .querySelectorAll(".category:not(.accepted)")
          .forEach(function (elem) {
            domain &&
              domain.cookies.forEach(function (cookie) {
                if (cookie.cookieCategoryId === elem.id) {
                  consentRejected.push(cookie.name);
                }
              });
          });

        var uniqueDomains = getUniqueArray(acceptedDomains);
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ whiteList: uniqueDomains })
        );
        var regExpArr = mapArray(uniqueDomains, function (pattern) {
          return new RegExp(pattern);
        });
        window.yett && window.yett.unblock(regExpArr);

        postCookieConsent({
          consentAccepted: consentAccepted,
          consentRejected: consentRejected,
        });
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

    var preferences = document.getElementById(
      "cookie-consent-banner-preferences"
    );
    if (preferences) {
      preferences.addEventListener("click", function (e) {
        var category = e.target && e.target.closest(".category.accepted");
        if (category && category.classList) {
          Array.from(category.classList).includes("expanded")
            ? category.classList.remove("expanded")
            : category.classList.add("expanded");
        }
      });

      preferences.addEventListener("change", function (e) {
        var container = e.target.closest(".lb-switch");
        if (!container) return;

        var categoryId = container.getAttribute("data-category-id");
        var input = container.querySelector(".lb-switch-input");
        var isChecked = input && input.checked;
        var category = document.getElementById(categoryId);
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
  var renderCheckbox = function (props) {
    var id = props.id || "";
    var label = props.label || "";
    var checked = props.checked || false;
    var disabled = props.disabled || false;

    // prettier-ignore
    return '\
      <label \
        class="lb-checkbox-container lb-switch ' + disabled ? "disabled" : "" + '"\
        data-category-id="' + id + '"\
      >\
        ' + label + '\
        <input \
          class="lb-checkbox-input lb-switch-input" \
          type="checkbox"\
          id="checkbox-' + id + '"\
          ' + checked ? "checked" : "" + '\
          ' + disabled ? "disabled" : "" + '\
        >\
        <span class="lb-checkbox-mark"></span>\
      </label>';
  };

  var renderToggle = function (props) {
    var id = props.id || "";
    var label = props.label || "";
    var checked = props.checked || false;
    var disabled = props.disabled || false;

    // prettier-ignore
    return '\
      <div class="lb-toggle-container lb-switch" data-category-id="' + id + '">\
        <input \
          class="lb-toggle-input lb-switch-input"\
          type="checkbox" \
          id="checkbox-' + id +'" \
          ' + checked ? "checked" : "" +'\
          ' + disabled ? "disabled" : "" +'\
        />\
        <label \
          class="lb-toggle-label ' + disabled ? "disabled" : ""+ '"\
          for="checkbox-' + id + '"\
        >\
          '+ label + '\
        </label>\
      </div>';
  };

  var renderActionButton = function (props) {
    var id = props.id || "";
    var backgroundColor = props.backgroundColor || "FFF";
    var color = props.color || "000";
    var borderColor = props.borderColor || "FFF";
    var text = props.text || "Preferences";

    // prettier-ignore
    return '\
      <button\
        id="'+ id || "" +'"\
        class="btn customize"\
        style="background-color: #'+ backgroundColor + ';\
        color: #' + color + ';\
        border-color: #' + borderColor + ';"\
      >' + text + '</button>';
  };

  var renderRejectButton = function (props) {
    var backgroundColor = props.backgroundColor || "FFF";
    var color = props.color || "000";
    var borderColor = props.borderColor || "FFF";
    var text = props.text || "Reject all";

    // prettier-ignore
    return '\
        <button\
          id="lb-cookie-consent-reject-all"\
          class="btn reject"\
          style="background-color: #' + backgroundColor + ';\
          color: #' + color + ';\
          border-color: #' + borderColor + ';"\
        >'+ text + '</button>';
  };

  var renderAcceptButton = function (props) {
    var backgroundColor = props.backgroundColor || "FFF";
    var color = props.color || "000";
    var borderColor = props.borderColor || "FFF";
    var text = props.text || "Accept all";

    // prettier-ignore
    return '\
        <button\
          id="lb-cookie-consent-accept-all"\
          class="btn accept"\
          style="background-color: #' + backgroundColor + ';\
          color: #' + color + ';\
          border-color: #' + borderColor + ';"\
        >' + text + '</button>';
  };

  var renderBanner = function (banner, showPreferencesOnly) {
    if (!banner) return;
    var layout = banner && banner.layout;
    var mainBanner = layout && layout.banner;

    if (!mainBanner) return;

    var showReject =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.reject;
    var showAccept =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.accept;

    var btnCustomize = renderActionButton(
      Object.assign(mainBanner.actionButton, {
        id: "lb-cookie-consent-open-preferences",
      })
    );
    var rejectButton = renderRejectButton(mainBanner.rejectAllButton);
    var acceptButton = renderAcceptButton(mainBanner.acceptAllButton);

    // prettier-ignore
    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      '<div \
          class="\
            cookie-consent-banner-container \
            ' + layout && layout.type + ' \
            ' + layout && layout.position ? layout.position.join(" ") : "" + ' \
            ' + showPreferencesOnly ? "hidden" : "" + '" \
          id="lb-cookie-consent-banner"\
        >\
          <div class="overlay"></div>\
          <div \
            class="main-banner"\
            style="background-color: #' + mainBanner && mainBanner.backgroundColor + ';\
                   border-color: #' + mainBanner && mainBanner.borderColor + ';"\
          >\
            <div class="main-banner-body">\
              <div\
                class="policy-text"\
                style="color: #' + mainBanner && mainBanner.bodyTextColor + ';"\
              >\
                ' + mainBanner && mainBanner.body + '\
              </div>\
              <a \
                class="policy-link" \
                href="' + mainBanner && mainBanner.policyUrl + '" \
                rel="noreferrer"\
                target="_blank"\
                style="color: #' + mainBanner && mainBanner.policyTextColor + ';"\
              >\
                '+ mainBanner && mainBanner.policy +'\
              </a>\
            </div>\
            <div class="buttons">\
              '+ banner.customizable ? btnCustomize : "" + ' \
              '+ showReject ? rejectButton :  "" + ' \
              '+ showAccept ? acceptButton :  "" + ' \
            </div>\
          </div>\
        </div>\
        '+ renderPreferences(banner, showPreferencesOnly)
    );
  };

  var renderPreferences = function (banner, showByDefault) {
    var categories = domain.categories || [];
    if (!banner) return;
    var layout = banner && banner.layout;
    var preferences = layout && layout.preferences;
    if (!preferences) return;

    var categorySettings = preferences.category;

    var showReject =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.reject;
    var showAccept =
      banner.consentType === cookieConsentTypes.acceptReject ||
      banner.consentType === cookieConsentTypes.accept;
    var btnSavePreferences = renderActionButton(
      Object.assign(preferences.actionButton, {
        id: "lb-cookie-consent-save-preferences",
      })
    );
    var rejectButton = renderRejectButton(preferences.rejectAllButton);
    var acceptButton = renderAcceptButton(preferences.acceptAllButton);

    var htmlDescription =
      '\
      <div\
        class="description"\
        style="color: #' + preferences &&
      preferences.bodyTextColor +
        ';"\
      >' +
        preferences &&
      preferences.body + "</div>";

    var getCookieHtml = function (cookie) {
      var cookieDescription =
        '\
      <div class="row">\
        <div class="label">Description:</div>\
        <div class="value">' +
        cookie.description +
        "</div>\
      </div>";

      return '\
          <div class="category-cookie">\
            <div class="row">\
              <div class="label">Cookie name:</div>\
              <div class="value">' +
        cookie.name +
        '</div>\
            </div>\
            <div class="row">\
              <div class="label">Expires:</div>\
              <div class="value">' +
        getPrettyDate(cookie.expires) +
        "</div>\
            </div>" +
        cookie.description
        ? cookieDescription
        : "" + "</div>";
    };

    var getCategoryHtml = function (category) {
      var id = category.id || "";
      var name = category.name || "";
      var optOut = category.optOut || false;
      var description = category.description || "";
      var showToggle =
        categorySettings && categorySettings.checkboxType === "toggle";

      var checkboxPayload = { id: id, checked: !optOut, disabled: !optOut };
      var categoryCookies = filterArray(domain.cookies, function (c) {
        return c.cookieCategoryId === id;
      });

      var htmlCaret = '<div class="icon-box">' + SVG_CARET_RIGHT + "</div>";
      var htmlDescription =
        '<div class="row category-description">' + description + "</div>";

      var htmlCategoryCookies =
        '\
        <div class="category-cookies">\
        ' +
          (categoryCookies &&
            mapArray(categoryCookies, function (c) {
              return getCookieHtml(c);
            }).join("")) || "" + "</div>";

      // prettier-ignore
      var html =
        '\
          <div class="category ' + !optOut ? "accepted" : "" + '"\
               id="' + id + '">\
            <div class="row category-name">\
              ' + categoryCookies.length ? htmlCaret : "" + '\
              <div\
                class="title"\
                style="color: #' + categorySettings ? categorySettings.colorTitle : "000" + ';"\
              >' + name + '</div>\
              ' + showToggle ? renderToggle(checkboxPayload) : renderCheckbox(checkboxPayload) + '\
            </div>\
            ' + description ? htmlDescription : "" + '\
            ' + categoryCookies && categoryCookies.length ? htmlCategoryCookies : "" + '\
          </div>';
      return html;
    };

    var htmlCookieCategories =
      '\
      <div class="cookie-categories">\
        ' +
        mapArray(categories, function (c) {
          return getCategoryHtml(c);
        }).join("") ||
      "" +
        "\
      </div>";

    var htmlPreferences =
      '\
      <div \
        class="cookie-consent-banner-preferences ' + showByDefault
        ? ""
        : "hidden" +
            '" \
        id="cookie-consent-banner-preferences">\
        <div\
          class="banner-header"\
          style="color: #' +
            preferences.titleTextColor ||
          "" +
            ';"\
        >' +
            preferences.title ||
          "" +
            '</div>\
        <div class="preferences-banner-body">\
          ' +
            preferences.body
        ? htmlDescription
        : "" +
          " \
          " +
          !!categories.length
        ? htmlCookieCategories
        : "" +
          '\
        </div>\
        <div class="buttons">\
          ' +
          showReject
        ? rejectButton
        : "" +
          "\
          " +
          showAccept
        ? acceptButton
        : "" +
          "\
          " +
          btnSavePreferences +
          "\
        </div>\
      </div>";

    return htmlPreferences;
  };

  var hideBanner = function () {
    var banner = document.getElementById("lb-cookie-consent-banner");
    banner && banner.remove();
    var preferences = document.getElementById(
      "cookie-consent-banner-preferences"
    );
    preferences && preferences.remove();
  };

  // blockers / unblockers
  var initScriptBlocking = function (domain) {
    var item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) {
      return renderBanner(domain.banner, showPreferences === "true");
    }

    var parsed = null;
    try {
      parsed = JSON.parse(item);
    } catch (e) {
      console.log("cannot parse whitelisted domains");
    }

    if (parsed && parsed.whiteList && window.yett) {
      var regExpArr = mapArray(parsed.whiteList, function (pattern) {
        return new RegExp(pattern);
      });
      parsed.whiteList.length
        ? window.yett.unblock(regExpArr)
        : window.yett.unblock();
    }
  };

  // init
  var essentialsWhiteList = ["^/", "^./", window.location.host];
  if (webAppUrl) {
    essentialsWhiteList.push(cleanUrlString(webAppUrl));
  }

  console.log("init");
  fetchDomainInfo(function (domain) {
    if (domain) {
      console.log("domain", domain);
      initScriptBlocking(domain);
      initHandlers(domain);
    }
  });
};
