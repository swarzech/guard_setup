(function() {
  var hasOwnProperty;

  $.ajaxPrefilter(function(options, _, jqXHR) {
    Spinner.start();
    return jqXHR.always(function() {
      return Spinner.stop();
    });
  });

  Backbone.Marionette.Renderer.render = function(template, data) {
    if (typeof template === 'function') {
      return template(data);
    } else {
      if (!JST[template]) {
        throw "Template '" + template + "' not found!";
      }
      return JST[template](data);
    }
  };

  $(document).ready(function() {
    if (window.location.hash === "#_=_") {
      window.location.hash = "";
    }
    if (!Modernizr.input.placeholder) {
      $('input, textarea').placeholder();
    }
    window.canUseCSSFilters = Modernizr.cssfilters;
    return window.isiPad = navigator.userAgent.match(/iPad/i) !== null;
  });

  jQuery.fn.exists = function() {
    return this.length > 0;
  };

  String.prototype.constantize = function() {
    if (this.match(/[A-Z][A-z]*/)) {
      eval("var that = " + this);
      return that;
    } else {
      return void 0;
    }
  };

  String.prototype.parse = function() {
    var e;
    try {
      return JSON.parse(this);
    } catch (_error) {
      e = _error;
      return this;
    }
  };

  String.prototype.capitalize = function() {
    var word;
    ((function() {
      var j, len, ref, results1;
      ref = this.split(/\s+/);
      results1 = [];
      for (j = 0, len = ref.length; j < len; j++) {
        word = ref[j];
        results1.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
      }
      return results1;
    }).call(this)).join(' ');
    return ((function() {
      var j, len, ref, results1;
      ref = this.split(/\_/);
      results1 = [];
      for (j = 0, len = ref.length; j < len; j++) {
        word = ref[j];
        results1.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
      }
      return results1;
    }).call(this)).join('');
  };

  String.prototype.dasherize = function() {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-/, '').replace(/-$/, '');
  };

  String.prototype.undasherize = function() {
    return this.toLowerCase().replace(/-/g, ' ');
  };

  window.hasOwnProperty = function(obj, prop) {
    var proto;
    proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) && ((!(prop in proto)) || proto[prop] !== obj[prop]);
  };

  if (Object.prototype.hasOwnProperty) {
    hasOwnProperty = function(obj, prop) {
      return obj.hasOwnProperty(prop);
    };
  }

  $.fn.spin = function(opts) {
    this.each(function() {
      var $this, data;
      $this = $(this);
      data = $this.data();
      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        return data.spinner = new Spinner($.extend({
          color: $this.css("color")
        }, opts)).spin(this);
      }
    });
    return this;
  };

  window.setOrgColor = (function(_this) {
    return function(el, color) {
      return el.css({
        border: "2px solid " + color + "}",
        color: color
      });
    };
  })(this);

  window.popupCenter = function(url, title, w, h) {
    var dualScreenLeft, dualScreenTop, height, left, newWindow, top, width;
    dualScreenLeft = window.screenLeft !== void 0 ? window.screenLeft : screen.left;
    dualScreenTop = window.screenTop !== void 0 ? window.screenTop : screen.top;
    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    left = width / 2 - w / 2 + dualScreenLeft;
    top = height / 2 - h / 2 + dualScreenTop;
    newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    if (window.focus) {
      newWindow.focus();
    }
  };

  window.setOrgColorWithHover = (function(_this) {
    return function(el, color) {
      el.css({
        border: "2px solid " + color,
        color: color
      });
      return el.hover((function() {
        return el.css({
          background: color,
          color: getReadableColor(color)
        });
      }), function() {
        return el.css({
          background: 'none',
          color: color
        });
      });
    };
  })(this);

  window.selectElementContents = function(el) {
    var range, sel;
    range = document.createRange();
    range.selectNodeContents(el);
    sel = window.getSelection();
    sel.removeAllRanges();
    return sel.addRange(range);
  };

  window.placeCaretAtEnd = function(el) {
    var range, sel, textRange;
    el.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      sel = window.getSelection();
      sel.removeAllRanges();
      return sel.addRange(range);
    } else if (typeof document.body.createTextRange !== "undefined") {
      textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      return textRange.select();
    }
  };

  window.isPhoneNumber = (function(_this) {
    return function(inputTxt) {
      var phoneno;
      phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (inputTxt.match(phoneno)) {
        return true;
      } else {
        return false;
      }
    };
  })(this);

  window.isUrl = (function(_this) {
    return function(inputTxt) {
      var pattern;
      if (!/^(f|ht)tps?:\/\//i.test(inputTxt)) {
        inputTxt = 'http://' + inputTxt;
      }
      pattern = new RegExp("^(https?:\\/\\/)?" + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + "((\\d{1,3}\\.){3}\\d{1,3}))" + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + "(\\?[;&a-z\\d%_.~+=-]*)?" + "(\\#[-a-z\\d_]*)?$", "i");
      if (!pattern.test(inputTxt)) {
        return false;
      } else {
        return true;
      }
    };
  })(this);

  window.isRelitivePath = (function(_this) {
    return function(inputTxt) {
      var pattern;
      pattern = new RegExp("^\/[^\/]", "i");
      if (!pattern.test(inputTxt)) {
        return false;
      } else {
        return true;
      }
    };
  })(this);

  window.getUrlRoot = (function(_this) {
    return function(url) {
      var matches;
      matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      return matches && matches[1];
    };
  })(this);

  window.urlParameter = function(name) {
    var regex, regexS, results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regexS = "[\\?&]" + name + "=([^&#]*)";
    regex = new RegExp(regexS);
    results = regex.exec(window.location.search);
    if (results == null) {
      return "";
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  };

  window.escapeRegExp = function(str) {
    return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };

  window.deepCopy = function(obj) {
    return jQuery.extend(true, {}, obj);
  };

  window.sanitizeText = function(str, chars) {
    if (str !== null) {
      return str.replace(/<\/?(iframe|embed|img|a|blockquote|em|p|i|br)[^>]*>/g, "");
    } else {
      return "";
    }
  };

  window.sanitizeComparable = function(str, chars) {
    if (str !== null) {
      return str.replace(/<\/?(iframe|embed|img|div|span|a|blockquote|em|p|i|br)[^>]*>/g, "");
    } else {
      return "";
    }
  };

  window.sanitizeStatus = function(str, chars) {
    if (str !== null) {
      return str.replace(/<\/?(iframe|embed|a|blockquote|em|p|i)[^>]*>/g, "");
    } else {
      return "";
    }
  };

  Date.prototype.stdTimezoneOffset = function() {
    var jan, jul;
    jan = new Date(this.getFullYear(), 0, 1);
    jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };

  Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
  };

  window.safeDateParse = function(date) {
    var arr;
    arr = date.split(/[- :]/);
    return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  };

  window.sanitizeTextBasic = function(str) {
    if (str !== null) {
      return str.replace(/<(iframe|embed|img|em|i)[^>]*>/g, "");
    } else {
      return "";
    }
  };

  window.getReadableColor = function(backgroundColor) {
    var allColors, colorRange, i;
    colorRange = ["#ffffff", "#ebebeb", "#d8d8d8", "#c4c4c4", "#b1b1b1", "#9d9d9d", "#898989", "#767676", "#626262", "#4e4e4e", "#3b3b3b", "#272727", "#141414", "#000000"];
    allColors = [];
    for (i in tinycolor.names) {
      allColors.push(i);
    }
    return tinycolor.mostReadable(backgroundColor, allColors).toHexString();
  };

  window.generateUUID = function() {
    var d, uuid;
    d = new Date().getTime();
    uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r;
      r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : r & 0x7 | 0x8).toString(16);
    });
    return uuid;
  };

  window.generateCompactUUID = function() {
    var d, uuid;
    d = new Date().getTime();
    uuid = "xxxxxxxx".replace(/[xy]/g, function(c) {
      var r;
      r = (d + Math.random() * 36) % 36 | 0;
      d = Math.floor(d / 36);
      return (c === "x" ? r : r & 0x7 | 0x8).toString(36);
    });
    return uuid;
  };

  window.isCommonDomain = function(email) {
    return validator.contains(email, "yahoo.com") || validator.contains(email, "hotmail.com") || validator.contains(email, "outlook.com") || validator.contains(email, "aol.com") || validator.contains(email, "gmail.com") || validator.contains(email, "msn.com") || validator.contains(email, "comcast.net") || validator.contains(email, "hotmail.co.uk") || validator.contains(email, "sbcglobal.net") || validator.contains(email, "yahoo.co.uk") || validator.contains(email, "yahoo.co.in") || validator.contains(email, "bellsouth.net") || validator.contains(email, "verizon.net") || validator.contains(email, "earthlink.net") || validator.contains(email, "cox.net") || validator.contains(email, "rediffmail.com") || validator.contains(email, "yahoo.ca") || validator.contains(email, "btinternet.com") || validator.contains(email, "charter.net") || validator.contains(email, "shaw.ca") || validator.contains(email, "ntlworld.com") || validator.contains(email, "sbcglobal.net");
  };

  window.similarText = function(first, second, percent) {
    var firstLength, l, max, p, pos1, pos2, q, secondLength, sum;
    try {
      if (first === null || second === null || typeof first === "undefined" || typeof second === "undefined") {
        return 0;
      }
      first += "";
      second += "";
      pos1 = 0;
      pos2 = 0;
      max = 0;
      firstLength = first.length;
      secondLength = second.length;
      p = void 0;
      q = void 0;
      l = void 0;
      sum = void 0;
      max = 0;
      p = 0;
      while (p < firstLength) {
        q = 0;
        while (q < secondLength) {
          l = 0;
          while ((p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l))) {
            l++;
          }
          if (l > max) {
            max = l;
            pos1 = p;
            pos2 = q;
          }
          q++;
        }
        p++;
      }
      sum = max;
      if (sum) {
        if (pos1 && pos2) {
          sum += this.similarText(first.substr(0, pos1), second.substr(0, pos2));
        }
        if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
          sum += this.similarText(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
        }
      }
      if (!percent) {
        return sum;
      } else {
        return (sum * 200) / (firstLength + secondLength);
      }
    } catch (_error) {

    }
  };

  window.openCentered = function(url, title, width, height) {
    var centeredWindow, dualScreenLeft, dualScreenTop, left, top, windowHeight, windowWidth;
    if (window.screenLeft) {
      dualScreenLeft = window.screenLeft;
    } else {
      dualScreenLeft = screen.left;
    }
    if (window.screenTop) {
      dualScreenTop = window.screenTop;
    } else {
      dualScreenTop = screen.top;
    }
    if (window.innerWidth) {
      windowWidth = window.innerWidth;
    } else if (document.documentElement.clientWidth) {
      windowWidth = document.documentElement.clientWidth;
    } else {
      windowWidth = screen.width;
    }
    if (window.innerHeight) {
      windowHeight = window.innerHeight;
    } else if (document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = screen.height;
    }
    left = ((windowWidth / 2) - (width / 2)) + dualScreenLeft;
    top = ((windowHeight / 2) - (height / 2)) + dualScreenTop;
    centeredWindow = window.open(url, title, "toolbar=no,scrollbars=no,resizable=no,top=" + top + ",left=" + left + ",width=" + width + ",height=" + height);
    if (window.focus) {
      return centeredWindow.focus();
    }
  };

}).call(this);
