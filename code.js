(function (global) {
    "use strict";
  
    const CodeJS = {};
  
    // Helper to resolve a CSS selector or DOM element
    const resolveElement = (target, context = global.document) => {
      if (typeof target === "string") {
        return context?.querySelector?.(target) ?? null;
      }
  
      return target?.nodeType === 1 ? target : null;
    };
  
    // ==========================
    // String Utilities
    // ==========================
    CodeJS.capitalize = function (str) {
      if (typeof str !== "string" || !str.length) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
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
  
    CodeJS.startsWith = (str, prefix) =>
      typeof str === "string" && str.startsWith(prefix);
  
    CodeJS.endsWith = (str, suffix) =>
      typeof str === "string" && str.endsWith(suffix);
  
    // ==========================
    // Array Utilities
    // ==========================
    CodeJS.unique = function (arr) {
      return Array.isArray(arr) ? [...new Set(arr)] : [];
    };
  
    CodeJS.shuffle = function (arr) {
      if (!Array.isArray(arr)) return [];
  
      const shuffled = [...arr];
  
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
  
      return shuffled;
    };
  
    CodeJS.flatten = function (arr, depth = Infinity) {
      return Array.isArray(arr) ? arr.flat(depth) : [];
    };
  
    CodeJS.chunk = function (arr, size = 1) {
      if (!Array.isArray(arr) || !Number.isFinite(size) || size < 1) return [];
  
      size = Math.floor(size);
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
        if (seen.has(item)) {
          duplicates.add(item);
        } else {
          seen.add(item);
        }
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
  
    // ==========================
    // Object Utilities
    // ==========================
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
  
    // ==========================
    // DOM Utilities
    // ==========================
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
      if (el) el.classList.toggle(className, force);
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
  
      if (el) {
        el.style.display = el.style.display === "none" ? "" : "none";
      }
  
      return el;
    };
  
    // ==========================
    // Math Utilities
    // ==========================
    CodeJS.randomInt = function (min, max) {
      min = Math.ceil(Number(min));
      max = Math.floor(Number(max));
  
      if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
        throw new RangeError("Expected valid min and max values, with min <= max.");
      }
  
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    CodeJS.sum = function (arr) {
      if (!Array.isArray(arr)) return 0;
      return arr.reduce((acc, val) => acc + (Number(val) || 0), 0);
    };
  
    CodeJS.average = function (arr) {
      if (!Array.isArray(arr) || arr.length === 0) return 0;
      return CodeJS.sum(arr) / arr.length;
    };
  
    CodeJS.factorial = function (num) {
      if (typeof num !== "number" || num < 0 || !Number.isInteger(num)) {
        return undefined;
      }
  
      let result = 1;
  
      for (let i = 2; i <= num; i++) {
        result *= i;
      }
  
      return result;
    };
  
    CodeJS.gcd = function (a, b) {
      a = Math.abs(a);
      b = Math.abs(b);
  
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
  
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
  
    // ==========================
    // Date Utilities
    // ==========================
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
  
    // ==========================
    // Function Utilities
    // ==========================
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
      // ==========================
  // More Array Utilities
  // ==========================
  CodeJS.compact = function (arr) {
    return Array.isArray(arr) ? arr.filter(Boolean) : [];
  };

  CodeJS.zip = function (...arrays) {
    if (arrays.length === 0 || !arrays.every(Array.isArray)) return [];

    const length = Math.min(...arrays.map((arr) => arr.length));
    return Array.from({ length }, (_, i) => arrays.map((arr) => arr[i]));
  };

  CodeJS.take = function (arr, count = 1) {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, Math.max(0, Math.floor(count)));
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

  // ==========================
  // More Object Utilities
  // ==========================
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

  CodeJS.mapValues = function (obj, mapper) {
    if (!obj || typeof obj !== "object" || typeof mapper !== "function") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, mapper(value, key, obj)])
    );
  };

  // ==========================
  // More Math Utilities
  // ==========================
  CodeJS.lerp = function (start, end, amount) {
    return start + (end - start) * amount;
  };

  CodeJS.roundTo = function (value, decimalPlaces = 0) {
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  };

  CodeJS.percentage = function (part, total) {
    if (total === 0) return 0;
    return (part / total) * 100;
  };

  // ==========================
  // More Date Utilities
  // ==========================
  CodeJS.isValidDate = function (value) {
    return !Number.isNaN(new Date(value).getTime());
  };

  CodeJS.daysBetween = function (date1, date2) {
    const start = new Date(date1);
    const end = new Date(date2);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return undefined;
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor(Math.abs(end - start) / millisecondsPerDay);
  };

  // ==========================
  // More Function Utilities
  // ==========================
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

  CodeJS.delay = function (milliseconds = 0) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  
    // ==========================
    // Universal Module Export
    // ==========================
    if (typeof module !== "undefined" && module.exports) {
      module.exports = CodeJS;
    } else if (typeof define === "function" && define.amd) {
      define([], () => CodeJS);
    } else {
      global.CodeJS = CodeJS;
    }
  })(typeof globalThis !== "undefined" ? globalThis : this);
  