(function (global) {
  "use strict";

  const CodeJS = {};

  const body = document.body
  
  const params = new URLSearchParams(window.location.search);

  const resolveElement = (target, context = global.document) => {
    if (typeof target === "string") {
      return context?.querySelector?.(target) ?? null;
    }
    return target?.nodeType === 1 ? target : null;
  };

  CodeJS.upper = (str) =>
    typeof str === "string" ? str.toUpperCase() : "";

  CodeJS.lower = (str) =>
    typeof str === "string" ? str.toLowerCase() : "";

// Obfuscates text (e.g., "Password" -> "IlBhc3N3b3JkIg==")
CodeJS.encode = (val) => {
  if (val === undefined) return "";
  return btoa(encodeURIComponent(JSON.stringify(val)));
};

CodeJS.decode = (str) => {
  if (typeof str !== "string" || !str) return null;
  try {
    return JSON.parse(decodeURIComponent(atob(str)));
  } catch (e) {
    return null;
  }
};


  CodeJS.website = (url) => 
    typeof url === "string" ? window.location.href = url : "";

  CodeJS.copy = async (text) => {
    if (typeof text === "string") {
        await navigator.clipboard.writeText(text);
    }
    };

    CodeJS.type = function (el, text = '', speed = 60) {
      // Clear any existing typing animation on this element
      if (el._typeTimer) clearInterval(el._typeTimer);
      
      el.textContent = '';
      const chars = Array.from(text); // Safely splits emojis & unicode
      if (!chars.length) return;
    
      let i = 0;
      el._typeTimer = setInterval(() => {
        el.textContent += chars[i++];
        if (i >= chars.length) {
          clearInterval(el._typeTimer);
          delete el._typeTimer;
        }
      }, speed);
    };
    
    


  CodeJS.camelCase = function (str) {
    if (typeof str !== "string") return "";
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
  };

  CodeJS.kebabCase = function (str) {
    if (typeof str !== "string") return "";
    return str
      .trim()
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  };

  CodeJS.titleCase = function (str) {
    if (typeof str !== "string") return "";
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  CodeJS.words = function (str) {
    if (typeof str !== "string") return [];
    return str.trim().match(/[\p{L}\p{N}]+/gu) ?? [];
  };

  CodeJS.reverseString = function (str) {
    if (typeof str !== "string") return "";
    return Array.from(str).reverse().join("");
  };

  CodeJS.truncate = function (str, length = 100, suffix = "...") {
    if (typeof str !== "string") return "";
    length = Math.max(0, Math.floor(Number(length) || 0));

    const chars = Array.from(str);
    if (chars.length <= length) return str;
    return chars.slice(0, length).join("") + suffix;
  };

  CodeJS.pad = function (str, length, char = " ") {
    str = String(str);
    char = String(char);
    if (!char || str.length >= length) return str;

    const padding = char.repeat(Math.ceil((length - str.length) / char.length));
    return (padding + str).slice(-length);
  };

  CodeJS.repeat = function (str, count = 1) {
    if (typeof str !== "string" || !Number.isFinite(count)) return "";
    return str.repeat(Math.max(0, Math.floor(count)));
  };

  CodeJS.isPalindrome = function (str) {
    if (typeof str !== "string") return false;
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return cleaned === CodeJS.reverseString(cleaned);
  };

  CodeJS.slugify = function (str) {
    if (typeof str !== "string") return "";
    return str
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  CodeJS.escapeHTML = function (str) {
    return String(str).replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[char];
    });
  };

  CodeJS.unescapeHTML = function (str) {
    if (typeof document === "undefined") return String(str);
    const el = document.createElement("textarea");
    el.innerHTML = String(str);
    return el.value;
  };

  CodeJS.countOccurrences = function (str, search) {
    if (typeof str !== "string" || typeof search !== "string" || !search) {
      return 0;
    }
    return str.split(search).length - 1;
  };

  CodeJS.removeSpace = function (str) {
    return typeof str === "string" ? str.replace(/\s+/g, "") : "";
  };

  CodeJS.startsWith = (str, prefix) =>
    typeof str === "string" && str.startsWith(prefix);

  CodeJS.endsWith = (str, suffix) =>
    typeof str === "string" && str.endsWith(suffix);

  // Array utilities
  CodeJS.unique = (arr) => (Array.isArray(arr) ? [...new Set(arr)] : []);

  CodeJS.shuffle = function (arr) {
    if (!Array.isArray(arr)) return [];
    const shuffled = [...arr];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  CodeJS.flatten = (arr, depth = Infinity) =>
    Array.isArray(arr) ? arr.flat(depth) : [];

  CodeJS.chunk = function (arr, size = 1) {
    if (!Array.isArray(arr) || !Number.isFinite(size) || size < 1) return [];
    size = Math.floor(size);
    if (size < 1) return [];

    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  CodeJS.findDuplicates = function (arr) {
    if (!Array.isArray(arr)) return [];
    const seen = new Set();
    const duplicates = new Set();

    for (const item of arr) {
      if (seen.has(item)) duplicates.add(item);
      else seen.add(item);
    }

    return [...duplicates];
  };

  CodeJS.groupBy = function (arr, getKey) {
    if (!Array.isArray(arr) || typeof getKey !== "function") return {};

    return arr.reduce((groups, item, index) => {
      const key = String(getKey(item, index));
      (groups[key] ??= []).push(item);
      return groups;
    }, {});
  };

  CodeJS.partition = function (arr, predicate) {
    if (!Array.isArray(arr) || typeof predicate !== "function") {
      return [[], []];
    }

    return arr.reduce(
      (result, item, index) => {
        result[predicate(item, index) ? 0 : 1].push(item);
        return result;
      },
      [[], []]
    );
  };

  CodeJS.countBy = function (arr, getKey) {
    if (!Array.isArray(arr) || typeof getKey !== "function") return {};

    return arr.reduce((counts, item, index) => {
      const key = String(getKey(item, index));
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {});
  };

  CodeJS.compact = (arr) => (Array.isArray(arr) ? arr.filter(Boolean) : []);

  CodeJS.zip = function (...arrays) {
    if (arrays.length === 0 || !arrays.every(Array.isArray)) return [];
    const length = Math.min(...arrays.map((arr) => arr.length));
    return Array.from({ length }, (_, i) => arrays.map((arr) => arr[i]));
  };

  CodeJS.take = function (arr, count = 1) {
    if (!Array.isArray(arr)) return [];
    const n = Number(count);
    if (!Number.isFinite(n)) return [];
    return arr.slice(0, Math.max(0, Math.floor(n)));
  };

  CodeJS.drop = function (arr, count = 1) {
    if (!Array.isArray(arr)) return [];
    const n = Number(count);
    return arr.slice(Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0);
  };

  CodeJS.first = (arr) => (Array.isArray(arr) ? arr[0] : undefined);
  CodeJS.last = (arr) => (Array.isArray(arr) ? arr.at(-1) : undefined);

  CodeJS.rotate = function (arr, count = 1) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    const n = Number(count);
    if (!Number.isFinite(n)) return [...arr];

    const offset = ((Math.trunc(n) % arr.length) + arr.length) % arr.length;
    return [...arr.slice(offset), ...arr.slice(0, offset)];
  };

  CodeJS.difference = function (arr, other) {
    if (!Array.isArray(arr) || !Array.isArray(other)) return [];
    const excluded = new Set(other);
    return arr.filter((item) => !excluded.has(item));
  };

  CodeJS.intersection = function (arr, other) {
    if (!Array.isArray(arr) || !Array.isArray(other)) return [];
    const included = new Set(other);
    return [...new Set(arr.filter((item) => included.has(item)))];
  };

  CodeJS.sample = function (arr, count = 1) {
    if (!Array.isArray(arr)) return [];
    const n = Number(count);
    if (!Number.isFinite(n) || n <= 0) return [];

    const copy = [...arr];
    const wanted = Math.min(Math.floor(n), copy.length);

    for (let i = 0; i < wanted; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, wanted);
  };

  CodeJS.range = function (start, end, step = 1) {
    if (end === undefined) {
      end = start;
      start = 0;
    }

    if (![start, end, step].every(Number.isFinite) || step === 0) return [];

    const result = [];
    const limit = 100_000;

    if (step > 0) {
      for (let value = start; value < end && result.length < limit; value += step) {
        result.push(value);
      }
    } else {
      for (let value = start; value > end && result.length < limit; value += step) {
        result.push(value);
      }
    }

    return result;
  };

  CodeJS.uniqueBy = function (arr, getKey) {
    if (!Array.isArray(arr) || typeof getKey !== "function") return [];
    const seen = new Set();

    return arr.filter((item, index) => {
      const key = getKey(item, index);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  CodeJS.sumBy = function (arr, getValue) {
    if (!Array.isArray(arr) || typeof getValue !== "function") return 0;
    return arr.reduce(
      (sum, item, index) => sum + (Number(getValue(item, index)) || 0),
      0
    );
  };

  CodeJS.sortBy = function (arr, getValue) {
    if (!Array.isArray(arr) || typeof getValue !== "function") return [];

    return [...arr].sort((a, b) => {
      const first = getValue(a);
      const second = getValue(b);
      if (first < second) return -1;
      if (first > second) return 1;
      return 0;
    });
  };

  // Object utilities
  CodeJS.deepClone = function (obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (typeof global.structuredClone === "function") {
      return global.structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
  };

  CodeJS.mergeObjects = function (...objects) {
    return Object.assign(
      {},
      ...objects.filter(
        (obj) => obj !== null && typeof obj === "object" && !Array.isArray(obj)
      )
    );
  };

  CodeJS.deepMerge = function (...objects) {
    const isPlainObject = (value) =>
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      (Object.getPrototypeOf(value) === Object.prototype ||
        Object.getPrototypeOf(value) === null);

    const merge = (target, source) => {
      for (const [key, value] of Object.entries(source)) {
        if (isPlainObject(value)) {
          target[key] = merge(
            isPlainObject(target[key]) ? { ...target[key] } : {},
            value
          );
        } else {
          target[key] = value;
        }
      }
      return target;
    };

    return objects
      .filter(isPlainObject)
      .reduce((result, obj) => merge(result, obj), {});
  };

  CodeJS.isEmptyObject = function (obj) {
    return (
      obj !== null &&
      typeof obj === "object" &&
      !Array.isArray(obj) &&
      Object.keys(obj).length === 0
    );
  };

  CodeJS.deepFreeze = function (obj, seen = new WeakSet()) {
    if (obj === null || typeof obj !== "object" || seen.has(obj)) return obj;
    seen.add(obj);
    Object.freeze(obj);

    for (const key of Reflect.ownKeys(obj)) {
      CodeJS.deepFreeze(obj[key], seen);
    }
    return obj;
  };

  CodeJS.pick = function (obj, keys) {
    if (!obj || typeof obj !== "object" || !Array.isArray(keys)) return {};

    return Object.fromEntries(
      keys
        .filter((key) => Object.prototype.hasOwnProperty.call(obj, key))
        .map((key) => [key, obj[key]])
    );
  };

  CodeJS.omit = function (obj, keys) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
    const excluded = new Set(Array.isArray(keys) ? keys : []);

    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !excluded.has(key))
    );
  };

  CodeJS.getPath = function (obj, path, defaultValue) {
    const keys = Array.isArray(path) ? path : String(path).split(".");
    let value = obj;

    for (const key of keys) {
      if (value == null || !Object.prototype.hasOwnProperty.call(value, key)) {
        return defaultValue;
      }
      value = value[key];
    }

    return value;
  };

  CodeJS.hasPath = function (obj, path) {
    const missing = Symbol("missing");
    return CodeJS.getPath(obj, path, missing) !== missing;
  };

  CodeJS.mapValues = function (obj, mapper) {
    if (!obj || typeof obj !== "object" || typeof mapper !== "function") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, mapper(value, key, obj)])
    );
  };

  CodeJS.invert = function (obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [String(value), key])
    );
  };

  CodeJS.toQueryString = function (obj) {
    if (!obj || typeof obj !== "object") return "";
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }

    return params.toString();
  };

  // DOM utilities
  CodeJS.$ = function (selector, context = global.document) {
    if (typeof selector !== "string") return selector ?? null;
    return context?.querySelector?.(selector) ?? null;
  };

  CodeJS.$All = function (selector, context = global.document) {
    if (typeof selector !== "string") return [];
    return context?.querySelectorAll
      ? Array.from(context.querySelectorAll(selector))
      : [];
  };

  CodeJS.addClass = function (target, ...classNames) {
    const el = resolveElement(target);
    if (el) el.classList.add(...classNames);
    return el;
  };

  CodeJS.removeClass = function (target, ...classNames) {
    const el = resolveElement(target);
    if (el) el.classList.remove(...classNames);
    return el;
  };

  CodeJS.toggleClass = function (target, className, force) {
    const el = resolveElement(target);
    if (!el) return null;

    if (force === undefined) el.classList.toggle(className);
    else el.classList.toggle(className, Boolean(force));

    return el;
  };

  CodeJS.on = function (target, event, handler, options) {
    const el = resolveElement(target);
    if (el && typeof handler === "function") {
      el.addEventListener(event, handler, options);
    }
    return el;
  };

  CodeJS.off = function (target, event, handler, options) {
    const el = resolveElement(target);
    if (el && typeof handler === "function") {
      el.removeEventListener(event, handler, options);
    }
    return el;
  };

  CodeJS.hide = function (target) {
    const el = resolveElement(target);
    if (el) el.style.display = "none";
    return el;
  };

  CodeJS.show = function (target, displayType = "") {
    const el = resolveElement(target);
    if (el) el.style.display = displayType;
    return el;
  };

  CodeJS.toggleVisibility = function (target) {
    const el = resolveElement(target);
    if (el) el.style.display = el.style.display === "none" ? "" : "none";
    return el;
  };

  CodeJS.createElement = function (tagName, attributes = {}, text) {
    if (typeof document === "undefined") return null;

    const el = document.createElement(tagName);

    for (const [key, value] of Object.entries(attributes)) {
      if (key === "className") {
        el.className = value;
      } else if (key === "dataset" && value && typeof value === "object") {
        Object.assign(el.dataset, value);
      } else if (key in el) {
        el[key] = value;
      } else {
        el.setAttribute(key, String(value));
      }
    }

    if (text !== undefined) el.textContent = String(text);
    return el;
  };

  CodeJS.ready = function (callback) {
    if (typeof document === "undefined" || typeof callback !== "function") return;

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  // Math utilities
  CodeJS.randomInt = function (min, max) {
    min = Math.ceil(Number(min));
    max = Math.floor(Number(max));

    if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
      throw new RangeError("Expected valid min and max values, with min <= max.");
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  CodeJS.randomFloat = function (min = 0, max = 1) {
    min = Number(min);
    max = Number(max);

    if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
      throw new RangeError("Expected finite values with min <= max.");
    }

    return Math.random() * (max - min) + min;
  };

  CodeJS.sum = function (arr) {
    if (!Array.isArray(arr)) return 0;
    return arr.reduce((acc, val) => acc + (Number(val) || 0), 0);
  };

  CodeJS.average = function (arr) {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    return CodeJS.sum(arr) / arr.length;
  };

  CodeJS.median = function (arr) {
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    const values = arr.map(Number);
    if (!values.every(Number.isFinite)) return undefined;

    values.sort((a, b) => a - b);
    const middle = Math.floor(values.length / 2);

    return values.length % 2
      ? values[middle]
      : (values[middle - 1] + values[middle]) / 2;
  };

  CodeJS.factorial = function (num) {
    if (typeof num !== "number" || num < 0 || !Number.isInteger(num)) {
      return undefined;
    }

    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
  };

  CodeJS.gcd = function (a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) [a, b] = [b, a % b];
    return a;
  };

  CodeJS.clamp = function (value, min, max) {
    if (min > max) [min, max] = [max, min];
    return Math.min(Math.max(value, min), max);
  };

  CodeJS.randomChoice = function (arr) {
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  CodeJS.isPrime = function (num) {
    if (!Number.isInteger(num) || num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  CodeJS.lerp = (start, end, amount) => start + (end - start) * amount;

  CodeJS.roundTo = function (value, decimalPlaces = 0) {
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  };

  CodeJS.percentage = function (part, total) {
    if (total === 0) return 0;
    return (part / total) * 100;
  };

  CodeJS.percentChange = function (oldValue, newValue) {
    if (oldValue === 0) return undefined;
    return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  };

  CodeJS.toRadians = (degrees) => (degrees * Math.PI) / 180;
  CodeJS.toDegrees = (radians) => (radians * 180) / Math.PI;

  // Date utilities
  CodeJS.formatDate = function (
    date,
    options = { year: "numeric", month: "2-digit", day: "2-digit" },
    locale
  ) {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Invalid Date";
    return parsed.toLocaleDateString(locale, options);
  };

  CodeJS.timeAgo = function (date) {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Invalid Date";

    const diffSeconds = Math.floor((Date.now() - parsed.getTime()) / 1000);
    const isFuture = diffSeconds < 0;
    const absSeconds = Math.abs(diffSeconds);
    if (absSeconds < 5) return "just now";

    const intervals = [
      { label: "year", seconds: 31_536_000 },
      { label: "month", seconds: 2_592_000 },
      { label: "day", seconds: 86_400 },
      { label: "hour", seconds: 3_600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(absSeconds / interval.seconds);
      if (count >= 1) {
        const unit = `${interval.label}${count === 1 ? "" : "s"}`;
        return isFuture ? `in ${count} ${unit}` : `${count} ${unit} ago`;
      }
    }

    return "just now";
  };

  CodeJS.isValidDate = (value) => !Number.isNaN(new Date(value).getTime());

  CodeJS.daysBetween = function (date1, date2) {
    const start = new Date(date1);
    const end = new Date(date2);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return undefined;
    }

    return Math.floor(Math.abs(end - start) / (24 * 60 * 60 * 1000));
  };

  CodeJS.addDays = function (date, days) {
    const result = new Date(date);
    if (Number.isNaN(result.getTime()) || !Number.isFinite(days)) {
      return new Date(NaN);
    }

    result.setDate(result.getDate() + days);
    return result;
  };

  CodeJS.startOfDay = function (date) {
    const result = new Date(date);
    if (Number.isNaN(result.getTime())) return new Date(NaN);
    result.setHours(0, 0, 0, 0);
    return result;
  };

  CodeJS.endOfDay = function (date) {
    const result = new Date(date);
    if (Number.isNaN(result.getTime())) return new Date(NaN);
    result.setHours(23, 59, 59, 999);
    return result;
  };

  CodeJS.daysInMonth = function (year, month) {
    if (!Number.isInteger(year) || !Number.isInteger(month)) return undefined;
    return new Date(year, month + 1, 0).getDate();
  };

  CodeJS.isSameDay = function (date1, date2) {
    const a = new Date(date1);
    const b = new Date(date2);

    return (
      !Number.isNaN(a.getTime()) &&
      !Number.isNaN(b.getTime()) &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  // Function utilities
  CodeJS.debounce = function (fn, delay = 0) {
    if (typeof fn !== "function") {
      throw new TypeError("debounce expects a function.");
    }

    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(context, args), delay);
    };
  };

  CodeJS.throttle = function (fn, delay = 0) {
    if (typeof fn !== "function") {
      throw new TypeError("throttle expects a function.");
    }

    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return fn.apply(this, args);
      }
    };
  };

  CodeJS.once = function (fn) {
    if (typeof fn !== "function") {
      throw new TypeError("once expects a function.");
    }

    let called = false;
    let result;

    return function (...args) {
      if (!called) {
        called = true;
        result = fn.apply(this, args);
      }
      return result;
    };
  };

  CodeJS.onceAsync = function (fn) {
    if (typeof fn !== "function") {
      throw new TypeError("onceAsync expects a function.");
    }

    let promise;
    return function (...args) {
      if (!promise) promise = Promise.resolve(fn.apply(this, args));
      return promise;
    };
  };

  CodeJS.memoize = function (fn) {
    if (typeof fn !== "function") {
      throw new TypeError("memoize expects a function.");
    }

    const cache = new Map();
    return function (...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);

      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };

  CodeJS.delay = (milliseconds = 0) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  CodeJS.withTimeout = function (promise, milliseconds = 5000) {
    return Promise.race([
      Promise.resolve(promise),
      new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Operation timed out.")),
          Math.max(0, milliseconds)
        );
      }),
    ]);
  };

  // Browser storage utilities
  CodeJS.storage = {
    get(key, fallback = null) {
      try {
        if (typeof localStorage === "undefined") return fallback;
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch {
        return fallback;
      }
    },

    set(key, value) {
      try {
        if (typeof localStorage === "undefined") return false;
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },

    remove(key) {
      try {
        if (typeof localStorage === "undefined") return false;
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },

    clear() {
      try {
        if (typeof localStorage === "undefined") return false;
        localStorage.clear();
        return true;
      } catch {
        return false;
      }
    },
  };

  // Universal module export
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CodeJS;
  } else if (typeof define === "function" && define.amd) {
    define([], () => CodeJS);
  } else {
    global.CodeJS = CodeJS;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
