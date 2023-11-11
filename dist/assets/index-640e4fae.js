import { _ as __vitePreload } from "./index-84307f9c.js";
function importGistId(fetchjsonp2, document2, gistId) {
  return fetchjsonp2("https://gist.github.com/" + gistId + ".json").then((data) => {
    var files = {};
    var el = document2.createElement("div");
    el.innerHTML = data.div;
    var gistFiles = el.querySelectorAll(".gist-file .gist-data .file");
    for (var i = 0; i < gistFiles.length; i++) {
      var fileName = data.files[i];
      files[fileName] = {
        html: gistFiles[i].outerHTML,
        text: gistFiles[i].textContent.replace("This file contains bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters. Learn more about bidirectional Unicode characters", "")
      };
    }
    return files;
  });
}
function makeFlatObject(snippetsObj, ArrMain, preKey) {
  Object.keys(snippetsObj).reduce((acc, key1) => {
    if (typeof snippetsObj[key1] === "object") {
      makeFlatObject(snippetsObj[key1], acc, preKey + key1 + "▷");
    } else if (!(preKey + key1).includes("_")) {
      acc.push(preKey + key1);
    }
    return acc;
  }, ArrMain);
}
function removeMenuById(id) {
  const elem = document.getElementById(id);
  if (elem) {
    elem.parentNode.removeChild(elem);
  }
}
const elemId = "inquirer-ui-menu";
function createMenu(snippets, context2) {
  const choices = [];
  makeFlatObject(snippets, choices, "");
  const listObj = { name: "keyname", choices };
  removeMenuById(elemId);
  const topMenu = document.createElement("ul");
  document.body.appendChild(topMenu);
  const _answers = {};
  function _resolveCallback(answ) {
    const arr = answ.keyname.split("▷");
    let lastThis = snippets;
    const callback = arr.reduce((acc, item) => {
      const curLavel = acc[item];
      if (typeof curLavel === "function") {
        lastThis = acc;
      }
      return curLavel;
    }, snippets);
    callback.call(lastThis, context2);
  }
  topMenu.setAttribute("id", elemId);
  topMenu.setAttribute(
    "style",
    "            z-index: 2147483000;            position:fixed;            list-style-type:none;            margin:0;            padding: 0;            font-family: monospace;            font-size: 14px;            cursor: pointer;            top: 0;            left: 0;            background: rgba(255, 255, 255, 0.8);            border-radius: 16px;            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);            backdrop-filter: blur(5px);            -webkit-backdrop-filter: blur(5px);            border: 1px solid rgba(255, 255, 255, 0.3);        "
  );
  let currentLavel = null;
  let menu = topMenu;
  const createNewSubMenu = function(answer) {
    const id = encodeURI(currentLavel).replace(/\%/g, "");
    let CurMenu = document.getElementById(id);
    if (CurMenu) {
      return CurMenu;
    }
    const newItem = document.createElement("li");
    newItem.setAttribute(
      "style",
      "              padding: 10px;            "
    );
    newItem.innerHTML = currentLavel;
    CurMenu = document.createElement("ul");
    CurMenu.id = id;
    CurMenu.setAttribute(
      "style",
      "              display: none;            "
    );
    newItem.appendChild(CurMenu);
    menu.appendChild(newItem);
    newItem.onclick = (event) => {
      event.stopPropagation();
      if (CurMenu.dataset.open === "on") {
        CurMenu.setAttribute(
          "style",
          "                  display: none;                "
        );
        CurMenu.dataset.open = "";
      } else {
        CurMenu.setAttribute(
          "style",
          "                display: block;              "
        );
        CurMenu.dataset.open = "on";
      }
    };
    return CurMenu;
  };
  const createNewItem = function(itemName, answer) {
    const menuitem = document.createElement("li");
    menuitem.innerHTML = itemName;
    menuitem.setAttribute(
      "style",
      "            padding: 10px;          "
    );
    menuitem.setAttribute(
      "onmouseover",
      'this.style.backgroundColor="rgba(81, 114, 201, 0.42)";'
    );
    menuitem.setAttribute(
      "onmouseout",
      'this.style.backgroundColor="rgba(255, 255, 255, 0.2)";'
    );
    menuitem.addEventListener(
      "click",
      () => {
        removeMenuById(elemId);
        if (_resolveCallback) {
          _answers[listObj.name] = answer;
          _resolveCallback(_answers);
          _resolveCallback = null;
        }
      },
      false
    );
    menu.appendChild(menuitem);
  };
  const recursiveMenu = function(topMenuNew, answer, trueAnswer, oldCurrentLavel) {
    const answerKeys = answer.split("▷");
    if (currentLavel !== answerKeys[0]) {
      currentLavel = null;
      menu = topMenuNew;
    }
    if (answerKeys.length > 1 && !currentLavel) {
      currentLavel = answerKeys[0];
      menu = createNewSubMenu();
    }
    const itemName = answer.replace(currentLavel + "▷", "");
    if (itemName.includes("▷")) {
      currentLavel = recursiveMenu(menu, itemName, trueAnswer, currentLavel);
    } else {
      createNewItem(itemName, trueAnswer);
    }
    return oldCurrentLavel;
  };
  listObj.choices.forEach((answer) => {
    recursiveMenu(topMenu, answer, answer);
  });
}
function fetchscript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  if (callback) {
    script.onreadystatechange = callback;
    script.onload = callback;
  }
  return script;
}
function fetchjsonp(url) {
  return new Promise(function(resolve, reject) {
    try {
      const id = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + +/* @__PURE__ */ new Date();
      const addSymbol = url.indexOf("?") !== -1 ? "&" : "?";
      const handler = fetchscript.bind(this, url + addSymbol + "callback=fun" + id);
      const elem = handler(function() {
        if (elem.readyState && elem.readyState !== "complete" && elem.readyState !== "loaded") {
          return false;
        }
        elem.parentNode.removeChild(elem);
      });
      window["fun" + id] = function(data) {
        resolve(data);
        window["fun" + id] = null;
      };
      document.getElementsByTagName("head")[0].appendChild(elem);
    } catch (e) {
      reject(e);
    }
  });
}
let currentEl = null;
let defaultCommandTimeout = 4e3;
function getEl(selector) {
  let results = [];
  const parent = currentEl[0];
  if (selector.slice(0, 2) === "//") {
    const XPathResult = 7;
    let query = document.evaluate(
      selector,
      parent || document,
      null,
      XPathResult,
      null
    );
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
      results.push(query.snapshotItem(i));
    }
  } else {
    results = [...parent.querySelectorAll(selector)];
  }
  return results;
}
const getDefaultApi = function(logger2) {
  const waitElArr = function(methodLog, findElArr, options) {
    let ms = defaultCommandTimeout;
    if ((options || {}).timeout) {
      ms = options.timeout;
    }
    return new Promise((resolve, reject) => {
      let waited = 0;
      let startTime = Date.now();
      let timeOutId = null;
      logger2.log("wait " + methodLog);
      (function waitElem() {
        timeOutId = setTimeout(() => {
          let elArr = findElArr();
          const isFind = elArr.length > 0;
          if (waited >= ms || isFind) {
            clearTimeout(timeOutId);
            if (isFind) {
              logger2.log("found " + methodLog);
              currentEl = elArr;
              resolve(currentEl);
            } else {
              currentEl = [];
              resolve(currentEl);
            }
          } else {
            waited = Date.now() - startTime;
            waitElem();
          }
        }, 0);
      })();
    });
  };
  return {
    // system
    initEl: async (el) => {
      currentEl = [el];
    },
    then: (resolve) => resolve(currentEl),
    // queries
    contains: (selector, content, options) => {
      return waitElArr(
        "contains " + selector + " " + content,
        () => getEl(selector).filter((el) => {
          const elText = (el.innerText || "").toLowerCase();
          const text = (content || "").toLowerCase();
          return elText.indexOf(text) > -1;
        }),
        options
      );
    },
    eq: async (index2) => {
      currentEl = currentEl.slice(index2, index2 + 1);
    },
    find: async (selector) => {
      const el = [...currentEl[0].querySelectorAll(selector)];
      if (el.length > 0) {
        currentEl = el;
      }
    },
    focused: async () => {
      currentEl = [document.activeElement];
    },
    get: (selector, options) => {
      return waitElArr("get " + selector, () => getEl(selector), options);
    },
    last: async () => {
      currentEl = [currentEl[currentEl.length - 1]];
    },
    parent: async () => {
      currentEl = [currentEl[0].parentElement];
    },
    siblings: async (selector) => {
      currentEl = [currentEl[0].parentElement];
      currentEl = [...currentEl[0].querySelectorAll(selector)];
    },
    // actions
    click: async () => {
      const { left: clientX, bottom: clientY } = currentEl[0].getBoundingClientRect();
      let evt = new MouseEvent("click", {
        button: 0,
        bubbles: true,
        cancelable: true,
        clientX,
        clientY
      });
      currentEl[0].dispatchEvent(evt);
    },
    rightclick: async () => {
      const { left: clientX, bottom: clientY } = currentEl[0].getBoundingClientRect();
      let evt = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: false,
        button: 2,
        buttons: 0,
        clientX,
        clientY
      });
      currentEl[0].dispatchEvent(evt);
    },
    select: async (valueOrTextorIndex) => {
      const selectObj = currentEl[0];
      [...selectObj.options].forEach((option, index2) => {
        const isMatchValue = option.value == valueOrTextorIndex;
        const isMatchText = option.text == valueOrTextorIndex;
        const isMatchIndex = index2 === valueOrTextorIndex;
        if (isMatchValue || isMatchText || isMatchIndex) {
          option.selected = true;
          selectObj.dispatchEvent(
            new CustomEvent("change", {
              bubbles: true
            })
          );
        }
      });
    },
    trigger: async (eventName) => {
      currentEl[0].dispatchEvent(new Event(eventName));
    },
    type: async (text) => {
      const value = text.replace(
        /{backspace}|{del}|{downArrow}|{end}|{enter}|{esc}|{home}|{insert}|{leftArrow}|{moveToEnd}|{moveToStart}|{pageDown}|{pageUp}|{rightArrow}|{selectAll}|{upArrow}|{alt}|{ctrl}|{meta}|{shift}]/g,
        ""
      );
      currentEl[0].value = value;
      currentEl[0].dispatchEvent(
        new CustomEvent("input", {
          bubbles: true
        })
      );
    },
    // other commands
    focus: async () => {
      currentEl[0].dispatchEvent(new CustomEvent("focus", { bubbles: true }));
    },
    wait: async (time) => await new Promise((resolve) => setTimeout(resolve, time)),
    log: async (message) => {
      logger2.log(message);
    }
  };
};
class Queue {
  constructor() {
    const that = this;
    this._queue = [];
    this.isRun = false;
    this.isAsynch = false;
    this._queueAsynch = [];
    this.isRunAsynch = false;
    return {
      _add(name, promiseFunction) {
        this[name] = (...args) => {
          that.runThroughQueue(promiseFunction.bind(that, ...args));
          return this;
        };
      }
    };
  }
  runThroughQueue(payload) {
    if (!this.isAsynch) {
      this._queue.push(payload);
      this.run();
    } else {
      this._queueAsynch.push(payload);
      this.runAsynch();
    }
  }
  runAsynch() {
    if (this._queueAsynch.length && !this.isRunAsynch) {
      this.isRunAsynch = true;
      const curFunction = this._queueAsynch.shift();
      (curFunction() || /* @__PURE__ */ (async () => {
      })()).then(() => {
        this.isRunAsynch = false;
        this.runAsynch();
      });
    }
  }
  run() {
    if (this._queue.length && !this.isRun) {
      const curFunction = this._queue.shift();
      this.isRun = true;
      this.isAsynch = curFunction.name === "bound then";
      const result = curFunction();
      if ((result || {}).then) {
        result.then(() => {
          this.isAsynch = false;
          this.isRun = false;
          this.run();
        });
      }
    }
  }
}
function createApiProperty(mountElement, api) {
  const queue = new Queue();
  for (let [defaultName, func] of Object.entries(api)) {
    queue._add(defaultName, func);
  }
  return new Proxy(queue, {
    get(target, prop) {
      target.initEl(mountElement);
      return target[prop];
    }
  });
}
function mount$1(element, logger2 = { log() {
} }) {
  return createApiProperty(element, getDefaultApi(logger2));
}
const apiCy = { mount: mount$1 };
function mount(element, logger2 = { log() {
} }) {
  const api = getDefaultApi(logger2);
  return createApiProperty(
    element,
    {
      initEl: api.initEl,
      then: api.then,
      locator(selector) {
        return api.get(selector);
      },
      click: (selectorOrObject) => {
        if (typeof selectorOrObject === "string") {
          return api.get(selectorOrObject).then(() => api.click());
        }
        if ((selectorOrObject || {}).button === "right") {
          return api.rightclick();
        }
        return api.click();
      },
      check() {
        return api.click();
      },
      fill: (selectorOrText, text) => {
        if (selectorOrText && text) {
          return api.get(selectorOrText).then(() => api.type(text));
        }
        return api.type(selectorOrText);
      },
      type: (text) => {
        return api.type(text);
      },
      hover: () => {
        return api.trigger("mouseover");
      },
      selectOption: (valueOrTextorIndex) => {
        return api.select(valueOrTextorIndex);
      },
      getByTestId: (id) => {
        return api.get(`[data-testid="${id}"]`);
      },
      getByLabel: async (label) => {
        const elArrAttrLabel = await api.get(`[aria-label="${label}"]`, { timeout: 10 });
        if (elArrAttrLabel[0]) {
          return elArrAttrLabel;
        }
        api.initEl(element);
        const elArrLabel = await api.contains("label", label, { timeout: 10 });
        const forAttr = elArrLabel[0] && elArrLabel[0].getAttribute("for");
        if (forAttr) {
          api.initEl(element);
          return api.get(`#${forAttr}`);
        }
      },
      getByRole: (selector, options) => {
        if (options.name) {
          return api.contains(selector, options.name);
        }
      }
    }
  );
}
const apiPlaywrite = { mount };
const logger = {
  log() {
    console.log(...arguments);
  }
};
let env = {};
const context = {};
const setEnv = function(name, value) {
  if (!name) {
    return env;
  }
  if (typeof value !== "undefined") {
    env[name] = value;
  }
  if (typeof name === "object") {
    env = { ...env, ...name };
  }
  if (typeof name === "string" && typeof value === "undefined") {
    return env[name];
  }
};
context.env = setEnv;
context.cy = apiCy.mount(window.document, logger);
context.Cypress = {
  env: setEnv
};
context.page = apiPlaywrite.mount(window.document, logger);
function load(url) {
  __vitePreload(() => import(
    /* @vite-ignore */
    /*webpackIgnore: true*/
    url
  ), true ? [] : void 0).then((res) => {
    const snippets = res.default;
    createMenu(snippets, context);
  });
}
function loadGist(payload) {
  importGistId(fetchjsonp, document, payload.id).then((gists) => {
    const js = gists[payload.file].text;
    const objectURL = URL.createObjectURL(new Blob([js], { type: "text/javascript" }));
    load(objectURL);
  });
}
function snip(payload) {
  if (payload.url) {
    load(payload.url);
  }
  if (payload.id) {
    loadGist(payload);
  }
  if (payload.env) {
    setEnv(payload.env);
  }
  if (payload.file && !payload.id) {
    payload.file.then((res) => {
      const snippets = res.default;
      createMenu(snippets, context);
    });
  }
}
window.snip = snip;
const index = {
  loadByLongPress(payload) {
    const timeout = payload.timeout || 5e3;
    let timer;
    let timeLongPress = timeout;
    const handleTap = function(event) {
      if (payload.onlyFromTags && !payload.onlyFromTags.includes(event.target.nodeName)) {
        return;
      }
      timer = setTimeout(() => {
        if (timeLongPress === timeout) {
          timeLongPress = 500;
        }
        snip(payload);
      }, timeLongPress);
    };
    const handleEnd = function() {
      clearTimeout(timer);
    };
    document.body.addEventListener("touchstart", handleTap);
    document.body.addEventListener("mousedown", handleTap);
    document.body.addEventListener("touchend", handleEnd);
    document.body.addEventListener("mouseup", handleEnd);
  }
};
export {
  index as default
};
//# sourceMappingURL=index-640e4fae.js.map
