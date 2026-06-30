/* @ds-bundle: {"format":3,"namespace":"BriefDesignSystem_8e53f4","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"SectionLabel","sourcePath":"components/display/SectionLabel.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"fd5894be786b","components/buttons/IconButton.jsx":"a007030e3817","components/display/Avatar.jsx":"d99d79ff112b","components/display/Badge.jsx":"2f370e96b70b","components/display/Card.jsx":"2c13d77f7394","components/display/SectionLabel.jsx":"523b5c40596e","components/display/Tag.jsx":"c0cd4c17106d","components/forms/Checkbox.jsx":"4a3bda25cab9","components/forms/Input.jsx":"736c3b956bc0","components/forms/Switch.jsx":"6485bcea14d6","components/forms/Textarea.jsx":"e68c230cff7e","ui_kits/writer/App.jsx":"13c843da4d6a","ui_kits/writer/Composer.jsx":"a841701f199d","ui_kits/writer/DescriptionView.jsx":"071438cf9b73","ui_kits/writer/SettingsDialog.jsx":"1232cfc8cbf4","ui_kits/writer/Sidebar.jsx":"b75551025cc8","ui_kits/writer/asana.js":"9d40c8d2c91a","ui_kits/writer/icons.jsx":"74c3bf6d3cb6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BriefDesignSystem_8e53f4 = window.BriefDesignSystem_8e53f4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once. */
const CSS = `
.brief-btn {
  --_bg: var(--brand);
  --_fg: var(--text-on-brand);
  --_bd: transparent;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-sans); font-weight: 500; line-height: 1;
  border: 1.5px solid var(--_bd); background: var(--_bg); color: var(--_fg);
  border-radius: var(--radius-md); cursor: pointer; white-space: nowrap;
  transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
.brief-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.brief-btn:active:not(:disabled) { transform: translateY(0.5px); }
.brief-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.brief-btn svg { width: 1.15em; height: 1.15em; }

/* sizes */
.brief-btn--sm { font-size: 13px; padding: 0 12px; height: 32px; }
.brief-btn--md { font-size: 14px; padding: 0 16px; height: 40px; }
.brief-btn--lg { font-size: 16px; padding: 0 22px; height: 48px; border-radius: var(--radius-lg); }
.brief-btn--full { width: 100%; }

/* variants */
.brief-btn--primary { --_bg: var(--brand); --_fg: var(--text-on-brand); }
.brief-btn--primary:hover:not(:disabled) { --_bg: var(--brand-hover); }
.brief-btn--primary:active:not(:disabled) { --_bg: var(--brand-active); }

.brief-btn--secondary { --_bg: var(--surface-raised); --_fg: var(--text-strong); --_bd: var(--border-default); }
.brief-btn--secondary:hover:not(:disabled) { --_bg: var(--paper-50); --_bd: var(--border-strong); }

.brief-btn--ghost { --_bg: transparent; --_fg: var(--text-body); --_bd: transparent; }
.brief-btn--ghost:hover:not(:disabled) { --_bg: var(--paper-100); --_fg: var(--text-strong); }

.brief-btn--danger { --_bg: var(--danger); --_fg: #fff; }
.brief-btn--danger:hover:not(:disabled) { --_bg: var(--red-700); }

.brief-btn__spin { width: 1.05em; height: 1.05em; border-radius: 50%;
  border: 2px solid currentColor; border-top-color: transparent;
  animation: brief-btn-spin 0.7s linear infinite; }
@keyframes brief-btn-spin { to { transform: rotate(360deg); } }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-button-css")) {
  const s = document.createElement("style");
  s.id = "brief-button-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* Render a Lucide icon into a React-owned span so lucide's DOM swap never
   collides with React reconciliation. */
function LIcon({
  name
}) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const el = r.current;
    if (!el) return;
    el.textContent = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    if (window.lucide) window.lucide.createIcons({
      nameAttr: "data-lucide",
      root: el
    });
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: r,
    className: "brief-ic",
    "aria-hidden": "true"
  });
}
function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading = false,
  fullWidth = false,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const cls = ["brief-btn", `brief-btn--${variant}`, `brief-btn--${size}`, fullWidth ? "brief-btn--full" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled || loading
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    className: "brief-btn__spin",
    "aria-hidden": "true"
  }), !loading && icon && /*#__PURE__*/React.createElement(LIcon, {
    name: icon
  }), children, !loading && iconRight && /*#__PURE__*/React.createElement(LIcon, {
    name: iconRight
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; color: var(--text-muted); border: 1.5px solid transparent;
  border-radius: var(--radius-md); cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out);
}
.brief-iconbtn:hover:not(:disabled) { background: var(--paper-100); color: var(--text-strong); }
.brief-iconbtn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.brief-iconbtn:disabled { opacity: 0.4; cursor: not-allowed; }
.brief-iconbtn svg { width: 1.2em; height: 1.2em; }
.brief-iconbtn--sm { width: 32px; height: 32px; font-size: 16px; }
.brief-iconbtn--md { width: 40px; height: 40px; font-size: 18px; }
.brief-iconbtn--lg { width: 48px; height: 48px; font-size: 20px; }
.brief-iconbtn--solid { background: var(--brand); color: var(--text-on-brand); }
.brief-iconbtn--solid:hover:not(:disabled) { background: var(--brand-hover); color: var(--text-on-brand); }
.brief-iconbtn--bordered { border-color: var(--border-default); }
.brief-iconbtn--bordered:hover:not(:disabled) { border-color: var(--border-strong); background: var(--paper-50); }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-iconbtn-css")) {
  const s = document.createElement("style");
  s.id = "brief-iconbtn-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function LIcon({
  name
}) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const el = r.current;
    if (!el) return;
    el.textContent = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    if (window.lucide) window.lucide.createIcons({
      nameAttr: "data-lucide",
      root: el
    });
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: r,
    className: "brief-ic",
    "aria-hidden": "true"
  });
}
function IconButton({
  icon,
  size = "md",
  variant = "ghost",
  label,
  className = "",
  ...rest
}) {
  const cls = ["brief-iconbtn", `brief-iconbtn--${size}`, `brief-iconbtn--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label,
    title: label
  }, rest), /*#__PURE__*/React.createElement(LIcon, {
    name: icon
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-avatar {
  display: inline-grid; place-items: center; flex: none; overflow: hidden;
  border-radius: 50%; font-family: var(--font-sans); font-weight: 600;
  color: #fff; background: var(--coral-400); line-height: 1; user-select: none;
}
.brief-avatar img { width: 100%; height: 100%; object-fit: cover; }
.brief-avatar--xs { width: 24px; height: 24px; font-size: 10px; }
.brief-avatar--sm { width: 32px; height: 32px; font-size: 12px; }
.brief-avatar--md { width: 40px; height: 40px; font-size: 14px; }
.brief-avatar--lg { width: 56px; height: 56px; font-size: 19px; }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-avatar-css")) {
  const s = document.createElement("style");
  s.id = "brief-avatar-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* Deterministic warm color from a name. */
const PALETTE = ["#E1542C", "#D98A1A", "#C5421D", "#B56F12", "#9E3417", "#3B6FB0", "#2F8F5B"];
function colorFor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  return PALETTE[h % PALETTE.length];
}
function initials(name = "") {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || "") + (p[1]?.[0] || "")).toUpperCase() || "?";
}
function Avatar({
  name = "",
  src,
  size = "md",
  className = "",
  style,
  ...rest
}) {
  const cls = ["brief-avatar", `brief-avatar--${size}`, className].filter(Boolean).join(" ");
  const bg = src ? undefined : colorFor(name);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      background: bg,
      ...style
    },
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--font-sans); font-size: 12px; font-weight: 500; line-height: 1;
  padding: 4px 9px; border-radius: var(--radius-pill); white-space: nowrap;
  background: var(--paper-100); color: var(--text-body);
}
.brief-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.brief-badge--neutral { background: var(--paper-100); color: var(--text-muted); }
.brief-badge--brand   { background: var(--brand-subtle); color: var(--coral-700); }
.brief-badge--success { background: var(--success-subtle); color: var(--green-700); }
.brief-badge--info    { background: var(--info-subtle); color: var(--blue-700); }
.brief-badge--danger  { background: var(--danger-subtle); color: var(--red-700); }
.brief-badge--warning { background: var(--warning-subtle); color: var(--amber-600); }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-badge-css")) {
  const s = document.createElement("style");
  s.id = "brief-badge-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Badge({
  tone = "neutral",
  dot = false,
  className = "",
  children,
  ...rest
}) {
  const cls = ["brief-badge", `brief-badge--${tone}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "brief-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-card {
  background: var(--surface-card); border: 1px solid var(--border-default);
  border-radius: var(--radius-card); box-shadow: var(--shadow-sm);
  display: flex; flex-direction: column;
}
.brief-card--flat { box-shadow: none; }
.brief-card--raised { box-shadow: var(--shadow-md); border-color: var(--border-subtle); }
.brief-card--interactive { cursor: pointer; transition: box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out); }
.brief-card--interactive:hover { box-shadow: var(--shadow-md); border-color: var(--border-strong); transform: translateY(-1px); }
.brief-card__pad { padding: var(--space-7); }
.brief-card__header { padding: var(--space-6) var(--space-7); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.brief-card__header h3 { font-size: 18px; }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-card-css")) {
  const s = document.createElement("style");
  s.id = "brief-card-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Card({
  variant = "default",
  interactive = false,
  title,
  action,
  padded = true,
  className = "",
  children,
  ...rest
}) {
  const cls = ["brief-card", variant !== "default" ? `brief-card--${variant}` : "", interactive ? "brief-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), (title || action) && /*#__PURE__*/React.createElement("div", {
    className: "brief-card__header"
  }, title && /*#__PURE__*/React.createElement("h3", null, title), action), padded ? /*#__PURE__*/React.createElement("div", {
    className: "brief-card__pad"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-sectionlabel {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--font-mono); font-weight: 500; font-size: 12px;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);
}
.brief-sectionlabel svg { width: 14px; height: 14px; color: var(--accent); }
.brief-sectionlabel--brand { color: var(--coral-600); }
.brief-sectionlabel--brand svg { color: var(--brand); }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-sectionlabel-css")) {
  const s = document.createElement("style");
  s.id = "brief-sectionlabel-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function LIcon({
  name
}) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const el = r.current;
    if (!el) return;
    el.textContent = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    if (window.lucide) window.lucide.createIcons({
      nameAttr: "data-lucide",
      root: el
    });
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: r,
    className: "brief-ic",
    "aria-hidden": "true"
  });
}
function SectionLabel({
  icon,
  tone = "muted",
  className = "",
  children,
  ...rest
}) {
  const cls = ["brief-sectionlabel", tone === "brand" ? "brief-sectionlabel--brand" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), icon && /*#__PURE__*/React.createElement(LIcon, {
    name: icon
  }), children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-sans); font-size: 13px; color: var(--text-body);
  background: var(--surface-raised); border: 1px solid var(--border-default);
  border-radius: var(--radius-sm); padding: 4px 8px; white-space: nowrap;
}
.brief-tag svg { width: 14px; height: 14px; color: var(--text-subtle); }
.brief-tag__remove {
  display: inline-grid; place-items: center; width: 16px; height: 16px; margin: -2px -2px -2px 0;
  border: none; background: transparent; color: var(--text-subtle); cursor: pointer; border-radius: 4px;
}
.brief-tag__remove:hover { background: var(--paper-100); color: var(--text-strong); }
.brief-tag__remove svg { width: 12px; height: 12px; }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-tag-css")) {
  const s = document.createElement("style");
  s.id = "brief-tag-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function LIcon({
  name
}) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const el = r.current;
    if (!el) return;
    el.textContent = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    if (window.lucide) window.lucide.createIcons({
      nameAttr: "data-lucide",
      root: el
    });
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: r,
    className: "brief-ic",
    "aria-hidden": "true"
  });
}
function Tag({
  icon,
  onRemove,
  className = "",
  children,
  ...rest
}) {
  const cls = ["brief-tag", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), icon && /*#__PURE__*/React.createElement(LIcon, {
    name: icon
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "brief-tag__remove",
    onClick: onRemove,
    "aria-label": "Remove"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "x"
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; user-select: none; }
.brief-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.brief-check__box {
  width: 20px; height: 20px; border-radius: var(--radius-sm); flex: none; margin-top: 1px;
  border: 1.5px solid var(--border-strong); background: var(--surface-raised);
  display: grid; place-items: center; color: #fff;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.brief-check__box svg { width: 14px; height: 14px; stroke-width: 3; opacity: 0; transform: scale(0.6); transition: all var(--dur-fast) var(--ease-out); }
.brief-check input:checked + .brief-check__box { background: var(--brand); border-color: var(--brand); }
.brief-check input:checked + .brief-check__box svg { opacity: 1; transform: scale(1); }
.brief-check input:focus-visible + .brief-check__box { box-shadow: var(--focus-ring); }
.brief-check input:disabled + .brief-check__box { opacity: 0.45; }
.brief-check__label { font-size: 14px; color: var(--text-body); line-height: 1.4; }
.brief-check--disabled { cursor: not-allowed; }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-check-css")) {
  const s = document.createElement("style");
  s.id = "brief-check-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function LIcon({
  name
}) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const el = r.current;
    if (!el) return;
    el.textContent = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    if (window.lucide) window.lucide.createIcons({
      nameAttr: "data-lucide",
      root: el
    });
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: r,
    className: "brief-ic",
    "aria-hidden": "true"
  });
}
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  id,
  ...rest
}) {
  const inputId = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    className: "brief-check" + (disabled ? " brief-check--disabled" : ""),
    htmlFor: inputId
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: inputId,
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "brief-check__box"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "check"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "brief-check__label"
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-field { display: flex; flex-direction: column; gap: 6px; }
.brief-field__label { font-size: 13px; font-weight: 500; color: var(--text-strong); }
.brief-field__hint { font-size: 12px; color: var(--text-muted); }
.brief-field__hint--error { color: var(--danger); }

.brief-input {
  font-family: var(--font-sans); font-size: 15px; color: var(--text-strong);
  background: var(--surface-raised); border: 1.5px solid var(--border-default);
  border-radius: var(--radius-md); padding: 0 12px; height: 40px; width: 100%;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.brief-input::placeholder { color: var(--text-subtle); }
.brief-input:hover:not(:disabled):not(:focus) { border-color: var(--border-strong); }
.brief-input:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.brief-input:disabled { opacity: 0.5; cursor: not-allowed; background: var(--bg-sunken); }
.brief-input--error { border-color: var(--danger); }
.brief-input--error:focus { box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--danger) 30%, transparent); }

.brief-input__wrap { position: relative; display: flex; align-items: center; }
.brief-input__wrap svg { width: 18px; height: 18px; color: var(--text-subtle); position: absolute; left: 12px; pointer-events: none; }
.brief-input__wrap .brief-input { padding-left: 38px; }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-input-css")) {
  const s = document.createElement("style");
  s.id = "brief-input-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function LIcon({
  name
}) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const el = r.current;
    if (!el) return;
    el.textContent = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    if (window.lucide) window.lucide.createIcons({
      nameAttr: "data-lucide",
      root: el
    });
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: r,
    className: "brief-ic",
    "aria-hidden": "true"
  });
}
function Input({
  label,
  hint,
  error,
  icon,
  id,
  className = "",
  ...rest
}) {
  const inputId = id || React.useId();
  const inputCls = ["brief-input", error ? "brief-input--error" : "", className].filter(Boolean).join(" ");
  const field = /*#__PURE__*/React.createElement("div", {
    className: "brief-input__wrap"
  }, icon && /*#__PURE__*/React.createElement(LIcon, {
    name: icon
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest)));
  if (!label && !hint && !error) return field;
  return /*#__PURE__*/React.createElement("div", {
    className: "brief-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "brief-field__label",
    htmlFor: inputId
  }, label), field, (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: "brief-field__hint" + (error ? " brief-field__hint--error" : "")
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.brief-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.brief-switch__track {
  width: 38px; height: 22px; border-radius: var(--radius-pill);
  background: var(--ink-200); position: relative; flex: none;
  transition: background var(--dur-base) var(--ease-out);
}
.brief-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%;
  background: #fff; box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-out);
}
.brief-switch input:checked + .brief-switch__track { background: var(--brand); }
.brief-switch input:checked + .brief-switch__track .brief-switch__thumb { transform: translateX(16px); }
.brief-switch input:focus-visible + .brief-switch__track { box-shadow: var(--focus-ring); }
.brief-switch input:disabled + .brief-switch__track { opacity: 0.45; }
.brief-switch__label { font-size: 14px; color: var(--text-body); }
.brief-switch--disabled { cursor: not-allowed; }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-switch-css")) {
  const s = document.createElement("style");
  s.id = "brief-switch-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  id,
  ...rest
}) {
  const inputId = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    className: "brief-switch" + (disabled ? " brief-switch--disabled" : ""),
    htmlFor: inputId
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: inputId,
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "brief-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brief-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "brief-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.brief-textarea {
  font-family: var(--font-sans); font-size: 15px; line-height: 1.5; color: var(--text-strong);
  background: var(--surface-raised); border: 1.5px solid var(--border-default);
  border-radius: var(--radius-md); padding: 10px 12px; width: 100%; resize: vertical;
  min-height: 88px;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.brief-textarea::placeholder { color: var(--text-subtle); }
.brief-textarea:hover:not(:disabled):not(:focus) { border-color: var(--border-strong); }
.brief-textarea:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.brief-textarea:disabled { opacity: 0.5; cursor: not-allowed; background: var(--bg-sunken); }
.brief-textarea__count { font-size: 12px; color: var(--text-subtle); text-align: right; font-family: var(--font-mono); }
`;
if (typeof document !== "undefined" && !document.getElementById("brief-textarea-css")) {
  const s = document.createElement("style");
  s.id = "brief-textarea-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Textarea({
  label,
  hint,
  id,
  maxLength,
  value,
  className = "",
  ...rest
}) {
  const inputId = id || React.useId();
  const cls = ["brief-textarea", className].filter(Boolean).join(" ");
  const count = maxLength != null && value != null ? `${String(value).length} / ${maxLength}` : null;
  const ta = /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    className: cls,
    maxLength: maxLength,
    value: value
  }, rest));
  if (!label && !hint && !count) return ta;
  return /*#__PURE__*/React.createElement("div", {
    className: "brief-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "brief-field__label",
    htmlFor: inputId
  }, label), ta, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "8px"
    }
  }, hint ? /*#__PURE__*/React.createElement("span", {
    className: "brief-field__hint"
  }, hint) : /*#__PURE__*/React.createElement("span", null), count && /*#__PURE__*/React.createElement("span", {
    className: "brief-textarea__count"
  }, count)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/writer/App.jsx
try { (() => {
/* Brief writer — app shell: state, generation flow, toast. */

const RECENT = [{
  id: "t1",
  title: "Redesign the onboarding email",
  project: "Growth",
  state: "pushed"
}, {
  id: "t2",
  title: "Add empty states to the inbox",
  project: "Core App",
  state: "draft"
}, {
  id: "t3",
  title: "Audit pricing page copy",
  project: "Marketing",
  state: "pushed"
}, {
  id: "t4",
  title: "Spec the CSV import flow",
  project: "Core App",
  state: "draft"
}];
const EMPTY_DRAFT = {
  title: "",
  notes: "",
  links: [],
  mode: "new",
  existingTask: null,
  opts: {
    criteria: true,
    resources: true,
    tone: "Standard"
  }
};

/* ---- Real generation via the built-in Claude helper ----------------------
   Returns { context, criteria[], resources[] }. Falls back to a templated
   draft if the model isn't reachable (e.g. opened as a plain offline file). */

const TONE_GUIDE = {
  Concise: "Keep the context to 1–2 tight sentences. 3 acceptance criteria max.",
  Standard: "Context is 2–3 sentences. 3–5 acceptance criteria.",
  Detailed: "Context is a full short paragraph (3–5 sentences). 5–7 acceptance criteria covering edge cases."
};
function fallbackDescription(draft, note) {
  const title = draft.title || "this task";
  return {
    context: `We need to ${title.charAt(0).toLowerCase() + title.slice(1)}. ` + `${draft.notes ? draft.notes.trim().replace(/\s+/g, " ") + " " : ""}` + `This work matters because it shapes how the team picks up and ships the task.` + (note ? `  (${note})` : ""),
    criteria: draft.opts.criteria ? ["Scope is agreed and written down before work starts.", "A first draft is shared for feedback within two days.", "Edge cases and the empty/error states are accounted for.", "Final work is reviewed and linked back in this task."] : [],
    resources: draft.opts.resources ? draft.links.length ? draft.links.slice() : ["No links attached"] : []
  };
}
async function generateDescription(draft, {
  variation
} = {}) {
  // No helper available (e.g. standalone offline file) → templated fallback.
  if (typeof window === "undefined" || !window.claude || !window.claude.complete) {
    return fallbackDescription(draft, "offline preview — add a backend to generate live");
  }
  const wantCriteria = draft.opts.criteria;
  const wantResources = draft.opts.resources;
  const prompt = ["You are Brief, an assistant that turns rough task inputs into a clear, structured Asana task description.", "Voice: encouraging, human, plain. Sentence case. No emoji. Address the reader as a teammate. Be concrete, prefer verbs.", "", "TASK INPUTS", `Title: ${draft.title || "(untitled)"}`, `Notes/bullets: ${draft.notes ? draft.notes : "(none provided — infer sensible scope from the title)"}`, `Links: ${draft.links.length ? draft.links.join(", ") : "(none)"}`, `Tone: ${draft.opts.tone}. ${TONE_GUIDE[draft.opts.tone] || ""}`, variation ? "Write a genuinely DIFFERENT take from any previous draft — fresh framing and wording." : "", "", "Return ONLY valid minified JSON, no markdown fences, in exactly this shape:", `{"context": string, "criteria": string[], "resources": string[]}`, wantCriteria ? "- criteria: the acceptance criteria, each a short complete sentence." : '- criteria: return [] (the user turned this section off).', wantResources ? "- resources: list the provided links verbatim; if none, suggest up to 2 concrete resource types to gather (e.g. 'Current onboarding email copy')." : "- resources: return [] (the user turned this section off).", "Write the context as 2–4 sentences unless the tone says otherwise. Do not include the title inside context verbatim as a heading."].filter(Boolean).join("\n");
  try {
    const raw = await window.claude.complete({
      messages: [{
        role: "user",
        content: prompt
      }]
    });
    const jsonStr = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(jsonStr);
    return {
      context: String(parsed.context || "").trim() || fallbackDescription(draft).context,
      criteria: wantCriteria ? Array.isArray(parsed.criteria) ? parsed.criteria.map(String) : [] : [],
      resources: wantResources ? Array.isArray(parsed.resources) && parsed.resources.length ? parsed.resources.map(String) : draft.links.slice() : []
    };
  } catch (err) {
    console.warn("Brief: generation failed, using fallback —", err);
    return fallbackDescription(draft, "couldn't reach the model — showing a template");
  }
}
function App() {
  const [view, setView] = React.useState("compose");
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);
  const [generating, setGenerating] = React.useState(false);
  const [pushing, setPushing] = React.useState(false);
  const [task, setTask] = React.useState(null);
  const [justGenerated, setJustGenerated] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [tasks, setTasks] = React.useState(RECENT);
  const [activeId, setActiveId] = React.useState(null);
  const [regenerating, setRegenerating] = React.useState(false);
  const [refining, setRefining] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
    try {
      return localStorage.getItem("brief.sidebar.collapsed") === "1";
    } catch (e) {
      return false;
    }
  });
  function toggleSidebar(next) {
    setSidebarCollapsed(cur => {
      const v = typeof next === "boolean" ? next : !cur;
      try {
        localStorage.setItem("brief.sidebar.collapsed", v ? "1" : "0");
      } catch (e) {}
      return v;
    });
  }
  const [conn, setConn] = React.useState(() => ({
    connected: window.Asana ? window.Asana.isConnected() : false,
    selection: window.Asana ? window.Asana.getSelection() : null
  }));
  function refreshConn() {
    setConn({
      connected: window.Asana.isConnected(),
      selection: window.Asana.getSelection()
    });
  }
  function showToast(t) {
    setToast(t);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), 3200);
  }
  function handleGenerate() {
    setGenerating(true);
    generateDescription(draft).then(description => {
      const existing = draft.existingTask;
      const newTask = {
        id: "new",
        title: draft.title,
        project: conn.selection && conn.selection.project && conn.selection.project.name || "Core App",
        section: conn.selection && conn.selection.section && conn.selection.section.name || null,
        assignee: "Maya Chen",
        due: "Fri, Jun 12",
        priority: "Medium",
        inputCount: 1 + (draft.notes ? 1 : 0) + draft.links.length,
        state: "draft",
        rev: 0,
        asanaGid: existing ? existing.gid : null,
        asanaUrl: existing ? existing.url : null,
        isExisting: !!existing,
        draft,
        description
      };
      setTask(newTask);
      setGenerating(false);
      setJustGenerated(true);
      setView("doc");
    });
  }
  function handleRegenerate() {
    if (!task || !task.draft) {
      showToast({
        kind: "info",
        text: "Open a draft you generated to regenerate it"
      });
      return;
    }
    setRegenerating(true);
    generateDescription(task.draft, {
      variation: true
    }).then(description => {
      setTask(t => ({
        ...t,
        description,
        rev: (t.rev || 0) + 1
      }));
      setRegenerating(false);
      setJustGenerated(true);
      showToast({
        kind: "success",
        text: "Wrote a fresh take"
      });
    });
  }
  function handleRefine(instruction) {
    if (!task || !task.draft) return;
    const refinedDraft = {
      ...task.draft,
      notes: (task.draft.notes ? task.draft.notes + "\n" : "") + "Refinement: " + instruction
    };
    setRefining(true);
    generateDescription(refinedDraft, {
      variation: true
    }).then(description => {
      setTask(t => ({
        ...t,
        description,
        draft: refinedDraft,
        rev: (t.rev || 0) + 1
      }));
      setRefining(false);
      setJustGenerated(true);
      showToast({
        kind: "success",
        text: "Refined the draft"
      });
    });
  }

  // ---- inline editing ----
  function handleEdit(description) {
    setJustGenerated(false);
    setTask(t => ({
      ...t,
      description
    }));
  }
  function handleEditTitle(title) {
    setJustGenerated(false);
    setTask(t => ({
      ...t,
      title
    }));
  }
  async function handlePush() {
    if (!task) return;
    const A = window.Asana;
    // Simulated path when not connected.
    if (!A || !A.isConnected()) {
      setPushing(true);
      setTimeout(() => {
        setPushing(false);
        setTask(t => ({
          ...t,
          state: "pushed"
        }));
        setTasks(list => [{
          id: "new",
          title: task.title,
          project: task.project,
          state: "pushed"
        }, ...list.filter(x => x.id !== "new")]);
        setActiveId("new");
        showToast({
          kind: "info",
          text: "Simulated push — connect Asana in Settings to push for real",
          action: "Connect",
          onAction: () => setSettingsOpen(true)
        });
      }, 900);
      return;
    }
    // Real push.
    setPushing(true);
    const sel = A.getSelection() || {};
    const notes = window.descriptionToNotes(task.description);
    try {
      let result;
      if (task.asanaGid) {
        result = await A.updateTask(task.asanaGid, {
          name: task.title,
          notes
        });
      } else {
        result = await A.createTask({
          workspaceGid: sel.workspace && sel.workspace.gid,
          projectGid: sel.project && sel.project.gid,
          sectionGid: sel.section && sel.section.gid,
          name: task.title || "Untitled task",
          notes
        });
      }
      setPushing(false);
      const wasUpdate = !!task.asanaGid;
      setTask(t => ({
        ...t,
        state: "pushed",
        asanaGid: result.gid,
        asanaUrl: result.url
      }));
      setTasks(list => [{
        id: "new",
        title: task.title,
        project: task.project,
        state: "pushed"
      }, ...list.filter(x => x.id !== "new")]);
      setActiveId("new");
      showToast({
        kind: "success",
        text: wasUpdate ? "Updated in Asana" : "Pushed to Asana",
        action: result.url ? "View task" : null,
        onAction: result.url ? () => window.open(result.url, "_blank", "noopener") : null
      });
    } catch (e) {
      setPushing(false);
      const text = e.kind === "auth" ? "Asana rejected the token — reconnect in Settings" : e.kind === "network" ? "Couldn't reach Asana (network/CORS). Try again." : "Couldn't push: " + e.message;
      showToast({
        kind: "error",
        text,
        action: e.kind === "auth" ? "Settings" : "Retry",
        onAction: e.kind === "auth" ? () => setSettingsOpen(true) : handlePush
      });
    }
  }
  function handleNew() {
    setDraft(EMPTY_DRAFT);
    setTask(null);
    setActiveId(null);
    setJustGenerated(false);
    setView("compose");
  }
  function handleSelect(id) {
    setActiveId(id);
    const found = tasks.find(t => t.id === id);
    if (!found) return;
    setJustGenerated(false);
    const seedDraft = {
      title: found.title,
      notes: "",
      links: [],
      opts: {
        criteria: true,
        resources: true,
        tone: "Standard"
      }
    };
    setTask({
      id: found.id,
      title: found.title,
      project: found.project,
      assignee: "Devon Pierce",
      due: "Mon, Jun 15",
      priority: "High",
      inputCount: 3,
      state: found.state,
      rev: 0,
      asanaGid: null,
      asanaUrl: null,
      draft: seedDraft,
      description: fallbackDescription(seedDraft)
    });
    setView("doc");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "bw-app" + (sidebarCollapsed ? " is-sidebar-collapsed" : "")
  }, !sidebarCollapsed && /*#__PURE__*/React.createElement(Sidebar, {
    tasks: tasks,
    activeId: activeId,
    onSelect: handleSelect,
    onNew: handleNew,
    connected: conn.connected,
    onOpenSettings: () => setSettingsOpen(true),
    onCollapse: () => toggleSidebar(true)
  }), sidebarCollapsed && /*#__PURE__*/React.createElement("button", {
    className: "bw-sidebar-reopen",
    onClick: () => toggleSidebar(false),
    "aria-label": "Show sidebar",
    title: "Show sidebar"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "panel-left-open"
  })), /*#__PURE__*/React.createElement("main", {
    className: "bw-main"
  }, view === "compose" ? /*#__PURE__*/React.createElement(Composer, {
    draft: draft,
    setDraft: setDraft,
    onGenerate: handleGenerate,
    generating: generating,
    connected: conn.connected,
    selection: conn.selection,
    onOpenSettings: () => setSettingsOpen(true)
  }) : /*#__PURE__*/React.createElement(DescriptionView, {
    task: task,
    justGenerated: justGenerated,
    pushing: pushing,
    busy: regenerating || refining,
    onRefine: handleRefine,
    onRegenerate: handleRegenerate,
    onEdit: handleEdit,
    onEditTitle: handleEditTitle,
    onPush: handlePush
  })), /*#__PURE__*/React.createElement(SettingsDialog, {
    open: settingsOpen,
    onClose: () => setSettingsOpen(false),
    onConnectionChange: refreshConn
  }), toast && /*#__PURE__*/React.createElement("div", {
    className: "bw-toast bw-toast--" + toast.kind
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: toast.kind === "success" ? "check-circle-2" : toast.kind === "error" ? "alert-circle" : "info"
  }), /*#__PURE__*/React.createElement("span", null, toast.text), toast.action && /*#__PURE__*/React.createElement("button", {
    className: "bw-toast-action",
    onClick: () => {
      if (toast.onAction) toast.onAction();
      setToast(null);
    }
  }, toast.action)));
}
const _bwRoot = window.__bwRoot || (window.__bwRoot = ReactDOM.createRoot(document.getElementById("root")));
_bwRoot.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/writer/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/writer/Composer.jsx
try { (() => {
/* Brief writer — composer. Two modes:
   - "new": write a description for a brand-new task (push creates it)
   - "existing": pick a real Asana task (or subtask) and (re)write its description (push updates it) */

/* One row in the existing-task tree. Lazily loads its own subtasks on expand. */
function TaskRow({
  task,
  depth,
  onPick,
  hideCompleted
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [subs, setSubs] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  function toggle(e) {
    e.stopPropagation();
    if (expanded) {
      setExpanded(false);
      return;
    }
    setExpanded(true);
    if (subs === null && window.Asana) {
      setLoading(true);
      window.Asana.subtasks(task.gid).then(s => {
        setSubs(s);
        setLoading(false);
      }).catch(() => {
        setSubs([]);
        setLoading(false);
      });
    }
  }
  if (hideCompleted && task.completed) return null;
  const visibleSubs = subs ? subs.filter(s => !(hideCompleted && s.completed)) : [];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bw-task-row",
    style: {
      paddingLeft: depth * 18 + "px"
    }
  }, task.numSubtasks > 0 ? /*#__PURE__*/React.createElement("button", {
    className: "bw-task-expand" + (expanded ? " is-open" : ""),
    onClick: toggle,
    "aria-label": "Show subtasks"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "chevron-right"
  })) : /*#__PURE__*/React.createElement("span", {
    className: "bw-task-expand-spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "bw-task-option" + (task.completed ? " is-completed" : ""),
    onClick: () => onPick(task),
    title: "Write a description for: " + task.name
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: task.completed ? "check-circle-2" : "circle"
  }), /*#__PURE__*/React.createElement("span", null, task.name), task.numSubtasks > 0 && /*#__PURE__*/React.createElement("span", {
    className: "bw-task-count"
  }, task.numSubtasks), /*#__PURE__*/React.createElement("span", {
    className: "bw-task-pick"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "pen-line"
  })))), expanded && loading && /*#__PURE__*/React.createElement("div", {
    className: "bw-task-empty",
    style: {
      paddingLeft: (depth + 1) * 18 + 12 + "px",
      textAlign: "left"
    }
  }, "Loading subtasks\u2026"), expanded && subs && visibleSubs.map(s => /*#__PURE__*/React.createElement(TaskRow, {
    key: s.gid,
    task: s,
    depth: depth + 1,
    onPick: onPick,
    hideCompleted: hideCompleted
  })), expanded && subs && visibleSubs.length === 0 && !loading && /*#__PURE__*/React.createElement("div", {
    className: "bw-task-empty",
    style: {
      paddingLeft: (depth + 1) * 18 + 12 + "px",
      textAlign: "left"
    }
  }, "No subtasks", hideCompleted ? " (open)" : "", "."));
}
function Composer({
  draft,
  setDraft,
  onGenerate,
  generating,
  connected,
  selection,
  onOpenSettings
}) {
  const {
    Input,
    Textarea,
    Switch,
    Tag,
    Button,
    SectionLabel
  } = window.BriefDesignSystem_8e53f4;
  const [linkInput, setLinkInput] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [loadingTasks, setLoadingTasks] = React.useState(false);
  const [tasksError, setTasksError] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [hideCompleted, setHideCompleted] = React.useState(true);
  const mode = draft.mode || "new";

  // Load real tasks when entering "existing" mode while connected.
  React.useEffect(() => {
    if (mode !== "existing" || !connected || !window.Asana) return;
    const sel = selection || {};
    setLoadingTasks(true);
    setTasksError("");
    window.Asana.tasks({
      sectionGid: sel.section && sel.section.gid,
      projectGid: sel.project && sel.project.gid,
      workspaceGid: sel.workspace && sel.workspace.gid
    }).then(ts => {
      setTasks(ts);
      setLoadingTasks(false);
    }).catch(e => {
      setTasksError(e.message || "Couldn't load tasks");
      setLoadingTasks(false);
    });
  }, [mode, connected, selection]);
  function setMode(m) {
    if (m === "new") setDraft({
      ...draft,
      mode: "new",
      existingTask: null,
      title: ""
    });else setDraft({
      ...draft,
      mode: "existing"
    });
  }
  function pickTask(t) {
    setDraft({
      ...draft,
      existingTask: {
        gid: t.gid,
        name: t.name,
        url: t.url
      },
      title: t.name
    });
  }
  function addLink(e) {
    e.preventDefault();
    const v = linkInput.trim();
    if (!v) return;
    setDraft({
      ...draft,
      links: [...draft.links, v]
    });
    setLinkInput("");
  }
  function removeLink(i) {
    setDraft({
      ...draft,
      links: draft.links.filter((_, idx) => idx !== i)
    });
  }
  const scopeLabel = (() => {
    const sel = selection || {};
    if (sel.section) return sel.section.name;
    if (sel.project) return sel.project.name;
    return "My Tasks";
  })();
  const filtered = query.trim() ? tasks.filter(t => t.name.toLowerCase().includes(query.trim().toLowerCase())) : tasks;
  const canGenerate = mode === "new" ? !!draft.title.trim() : !!(draft.existingTask && draft.existingTask.gid);
  return /*#__PURE__*/React.createElement("div", {
    className: "bw-composer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-composer-head"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    icon: "sparkles",
    tone: "brand"
  }, mode === "existing" ? "Rewrite a task" : "New description"), /*#__PURE__*/React.createElement("h1", {
    className: "display bw-composer-title"
  }, "Tell me what needs doing \u2014 ", /*#__PURE__*/React.createElement("em", null, "I'll write the rest."))), /*#__PURE__*/React.createElement("div", {
    className: "bw-mode-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bw-mode" + (mode === "new" ? " is-on" : ""),
    onClick: () => setMode("new")
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "plus-circle"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "New task"), "Write & create a new task")), /*#__PURE__*/React.createElement("button", {
    className: "bw-mode" + (mode === "existing" ? " is-on" : ""),
    onClick: () => setMode("existing")
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "list-todo"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Existing task"), "Rewrite a task already in Asana"))), /*#__PURE__*/React.createElement("div", {
    className: "bw-composer-body"
  }, mode === "new" && /*#__PURE__*/React.createElement(Input, {
    label: "Task title",
    placeholder: "Redesign the onboarding email",
    value: draft.title,
    onChange: e => setDraft({
      ...draft,
      title: e.target.value
    })
  }), mode === "existing" && !connected && /*#__PURE__*/React.createElement("div", {
    className: "bw-connect-prompt"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "plug"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bw-connect-prompt-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Connect Asana to pick a task"), /*#__PURE__*/React.createElement("span", null, "Existing tasks load from your workspace once you're connected.")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: onOpenSettings
  }, "Connect")), mode === "existing" && connected && /*#__PURE__*/React.createElement("div", {
    className: "bw-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bw-field-label"
  }, "Pick a task from ", /*#__PURE__*/React.createElement("strong", null, scopeLabel)), draft.existingTask ? /*#__PURE__*/React.createElement("div", {
    className: "bw-picked-task"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "check-circle-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bw-picked-name"
  }, draft.existingTask.name), /*#__PURE__*/React.createElement("button", {
    className: "bw-link",
    onClick: () => setDraft({
      ...draft,
      existingTask: null,
      title: ""
    })
  }, "Change")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bw-picker-controls"
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Search tasks\u2026",
    value: query,
    onChange: e => setQuery(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    className: "bw-show-completed"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !hideCompleted,
    onChange: e => setHideCompleted(!e.target.checked)
  }), "Show completed")), /*#__PURE__*/React.createElement("div", {
    className: "bw-task-picker"
  }, loadingTasks && /*#__PURE__*/React.createElement("div", {
    className: "bw-task-empty"
  }, "Loading tasks\u2026"), tasksError && /*#__PURE__*/React.createElement("div", {
    className: "bw-task-empty bw-task-empty--error"
  }, tasksError), !loadingTasks && !tasksError && filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "bw-task-empty"
  }, "No tasks found in ", scopeLabel, "."), !loadingTasks && filtered.map(t => /*#__PURE__*/React.createElement(TaskRow, {
    key: t.gid,
    task: t,
    depth: 0,
    onPick: pickTask,
    hideCompleted: hideCompleted
  }))), /*#__PURE__*/React.createElement("p", {
    className: "bw-picker-hint"
  }, "Click any ", /*#__PURE__*/React.createElement("strong", null, "task or subtask"), " to write its description. Rows with a count have subtasks \u2014 click the arrow to expand."))), /*#__PURE__*/React.createElement(Textarea, {
    label: mode === "existing" ? "What should the description cover?" : "What needs doing?",
    placeholder: "A few bullets are enough \u2014 goals, constraints, who it's for\u2026",
    value: draft.notes,
    onChange: e => setDraft({
      ...draft,
      notes: e.target.value
    }),
    rows: 5
  }), /*#__PURE__*/React.createElement("div", {
    className: "bw-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bw-field-label"
  }, "Links & resources"), /*#__PURE__*/React.createElement("form", {
    className: "bw-link-row",
    onSubmit: addLink
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "link",
    placeholder: "Paste a Figma, doc, or Asana link",
    value: linkInput,
    onChange: e => setLinkInput(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    type: "submit",
    icon: "plus"
  }, "Add")), draft.links.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bw-link-tags"
  }, draft.links.map((l, i) => /*#__PURE__*/React.createElement(Tag, {
    key: i,
    icon: "link",
    onRemove: () => removeLink(i)
  }, l)))), /*#__PURE__*/React.createElement("div", {
    className: "bw-options"
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Acceptance criteria",
    checked: draft.opts.criteria,
    onChange: e => setDraft({
      ...draft,
      opts: {
        ...draft.opts,
        criteria: e.target.checked
      }
    })
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Resources section",
    checked: draft.opts.resources,
    onChange: e => setDraft({
      ...draft,
      opts: {
        ...draft.opts,
        resources: e.target.checked
      }
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "bw-tone"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-tone-label"
  }, "Tone"), /*#__PURE__*/React.createElement("div", {
    className: "bw-segmented"
  }, ["Concise", "Standard", "Detailed"].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "bw-seg" + (draft.opts.tone === t ? " is-on" : ""),
    onClick: () => setDraft({
      ...draft,
      opts: {
        ...draft.opts,
        tone: t
      }
    })
  }, t)))))), /*#__PURE__*/React.createElement("div", {
    className: "bw-composer-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-foot-hint"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "info"
  }), mode === "existing" ? "Brief rewrites the description, then updates the task in Asana." : "Brief drafts a structured description you can edit before pushing."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "sparkles",
    onClick: onGenerate,
    loading: generating,
    disabled: !canGenerate
  }, generating ? "Generating…" : mode === "existing" ? "Write description" : "Generate description")));
}
window.Composer = Composer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/writer/Composer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/writer/DescriptionView.jsx
try { (() => {
/* Brief writer — generated description view. Inline-editable before pushing to Asana. */

/* contentEditable helper: uncontrolled (no cursor jumps); commits text on blur.
   `resetKey` re-seeds the DOM when the underlying value changes (regenerate/refine). */
function Editable({
  value,
  onCommit,
  className,
  placeholder,
  multiline,
  resetKey
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && ref.current.textContent !== value) ref.current.textContent = value;
  }, [resetKey]);
  function commit() {
    const text = ref.current.textContent.trim();
    if (text !== value) onCommit(text);
  }
  function onKeyDown(e) {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      ref.current.blur();
    }
    if (e.key === "Escape") {
      ref.current.textContent = value;
      ref.current.blur();
    }
  }
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: "bw-edit " + (className || ""),
    contentEditable: true,
    suppressContentEditableWarning: true,
    spellCheck: false,
    "data-placeholder": placeholder,
    onBlur: commit,
    onKeyDown: onKeyDown
  }, value);
}
function DescriptionView({
  task,
  onRefine,
  onRegenerate,
  onPush,
  onEdit,
  onEditTitle,
  pushing,
  busy,
  justGenerated
}) {
  const {
    Badge,
    Button,
    IconButton,
    Avatar,
    SectionLabel,
    Card
  } = window.BriefDesignSystem_8e53f4;
  const d = task.description;
  const [done, setDone] = React.useState(() => d.criteria.map(() => false));
  const [refineOpen, setRefineOpen] = React.useState(false);
  const [refineText, setRefineText] = React.useState("");
  const [newResource, setNewResource] = React.useState("");
  const rev = task.rev || 0; // bumps on regenerate/refine to reseed editables

  React.useEffect(() => {
    setDone(d.criteria.map(() => false));
  }, [rev, d.criteria.length]);
  function submitRefine(e) {
    e.preventDefault();
    const v = refineText.trim();
    if (!v) return;
    onRefine(v);
    setRefineText("");
    setRefineOpen(false);
  }

  // ---- edit helpers (immutably update the description) ----
  const setContext = context => onEdit({
    ...d,
    context
  });
  const setCriterion = (i, text) => onEdit({
    ...d,
    criteria: d.criteria.map((c, idx) => idx === i ? text : c)
  });
  const removeCriterion = i => onEdit({
    ...d,
    criteria: d.criteria.filter((_, idx) => idx !== i)
  });
  const addCriterion = () => onEdit({
    ...d,
    criteria: [...d.criteria, ""]
  });
  const setResource = (i, text) => onEdit({
    ...d,
    resources: d.resources.map((r, idx) => idx === i ? text : r)
  });
  const removeResource = i => onEdit({
    ...d,
    resources: d.resources.filter((_, idx) => idx !== i)
  });
  function addResource(e) {
    e.preventDefault();
    const v = newResource.trim();
    if (!v) return;
    onEdit({
      ...d,
      resources: [...d.resources, v]
    });
    setNewResource("");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "bw-doc-wrap" + (justGenerated ? " bw-reveal" : "")
  }, /*#__PURE__*/React.createElement("header", {
    className: "bw-doc-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-doc-head-top"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: task.state === "pushed" ? "success" : task.isExisting ? "info" : "brand",
    dot: true
  }, task.state === "pushed" ? "In Asana" : task.isExisting ? "Rewriting" : "Draft"), /*#__PURE__*/React.createElement("div", {
    className: "bw-doc-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "wand-2",
    onClick: () => setRefineOpen(v => !v),
    disabled: busy
  }, "Refine"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "refresh-cw",
    label: "Regenerate",
    variant: "bordered",
    onClick: onRegenerate,
    disabled: busy
  }), /*#__PURE__*/React.createElement(Button, {
    icon: "arrow-up-right",
    onClick: onPush,
    loading: pushing,
    variant: task.state === "pushed" || task.asanaGid ? "secondary" : "primary"
  }, task.state === "pushed" || task.asanaGid ? "Update in Asana" : "Push to Asana"))), /*#__PURE__*/React.createElement("h1", {
    className: "display bw-doc-title"
  }, /*#__PURE__*/React.createElement(Editable, {
    value: task.title,
    resetKey: "title-" + task.id + rev,
    onCommit: onEditTitle,
    placeholder: "Untitled task"
  })), refineOpen && /*#__PURE__*/React.createElement("form", {
    className: "bw-refine",
    onSubmit: submitRefine
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "wand-2"
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    className: "bw-refine-input",
    placeholder: "Tell Brief what to change \u2014 e.g. 'make it more technical' or 'add a QA criterion'",
    value: refineText,
    onChange: e => setRefineText(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    type: "submit",
    loading: busy,
    disabled: !refineText.trim()
  }, "Apply"))), /*#__PURE__*/React.createElement("div", {
    className: "bw-doc-layout"
  }, /*#__PURE__*/React.createElement("article", {
    className: "bw-doc" + (busy ? " is-busy" : "")
  }, busy && /*#__PURE__*/React.createElement("div", {
    className: "bw-doc-busy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-doc-busy-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bw-doc-busy-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bw-doc-busy-dot"
  }), /*#__PURE__*/React.createElement("span", null, "Brief is writing\u2026")), /*#__PURE__*/React.createElement("section", {
    className: "bw-sec",
    style: {
      "--i": 0
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    icon: "align-left"
  }, "Context"), /*#__PURE__*/React.createElement(Editable, {
    className: "bw-prose",
    multiline: true,
    value: d.context,
    resetKey: "ctx-" + task.id + rev,
    onCommit: setContext,
    placeholder: "Describe the task\u2026"
  })), /*#__PURE__*/React.createElement("section", {
    className: "bw-sec",
    style: {
      "--i": 1
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    icon: "list-checks"
  }, "Acceptance criteria"), /*#__PURE__*/React.createElement("ul", {
    className: "bw-criteria"
  }, d.criteria.map((c, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: done[i] ? "is-done" : ""
  }, /*#__PURE__*/React.createElement("button", {
    className: "bw-crit-check",
    onClick: () => setDone(done.map((v, idx) => idx === i ? !v : v)),
    "aria-label": "Toggle done"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: done[i] ? "check-square-2" : "square"
  })), /*#__PURE__*/React.createElement(Editable, {
    value: c,
    resetKey: "crit-" + task.id + rev + "-" + i,
    onCommit: t => setCriterion(i, t),
    placeholder: "New criterion\u2026"
  }), /*#__PURE__*/React.createElement("button", {
    className: "bw-crit-remove",
    onClick: () => removeCriterion(i),
    "aria-label": "Remove criterion"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "x"
  }))))), /*#__PURE__*/React.createElement("button", {
    className: "bw-add-row",
    onClick: addCriterion
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "plus"
  }), " Add criterion")), /*#__PURE__*/React.createElement("section", {
    className: "bw-sec",
    style: {
      "--i": 2
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    icon: "paperclip"
  }, "Resources"), /*#__PURE__*/React.createElement("div", {
    className: "bw-resources-list"
  }, d.resources.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "bw-resource",
    key: i
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "link"
  }), /*#__PURE__*/React.createElement(Editable, {
    value: r,
    resetKey: "res-" + task.id + rev + "-" + i,
    onCommit: t => setResource(i, t),
    placeholder: "Resource\u2026"
  }), /*#__PURE__*/React.createElement("button", {
    className: "bw-crit-remove",
    onClick: () => removeResource(i),
    "aria-label": "Remove resource"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "x"
  }))))), /*#__PURE__*/React.createElement("form", {
    className: "bw-add-resource",
    onSubmit: addResource
  }, /*#__PURE__*/React.createElement("input", {
    className: "bw-add-resource-input",
    placeholder: "Add a link or resource\u2026",
    value: newResource,
    onChange: e => setNewResource(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    type: "submit",
    icon: "plus",
    disabled: !newResource.trim()
  }, "Add"))), /*#__PURE__*/React.createElement("div", {
    className: "bw-doc-footnote"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "sparkles"
  }), /*#__PURE__*/React.createElement("span", null, "Generated by Brief from ", task.inputCount, " inputs \xB7 ", /*#__PURE__*/React.createElement("button", {
    className: "bw-link",
    onClick: onRegenerate
  }, "regenerate"), ". Click any text to edit."))), /*#__PURE__*/React.createElement("aside", {
    className: "bw-meta"
  }, /*#__PURE__*/React.createElement(Card, {
    padded: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-meta-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Assignee"), /*#__PURE__*/React.createElement("div", {
    className: "bw-meta-assignee"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: task.assignee,
    size: "xs"
  }), /*#__PURE__*/React.createElement("span", null, task.assignee))), /*#__PURE__*/React.createElement("div", {
    className: "bw-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Project"), /*#__PURE__*/React.createElement("span", {
    className: "bw-meta-val"
  }, task.project)), task.section && /*#__PURE__*/React.createElement("div", {
    className: "bw-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Section"), /*#__PURE__*/React.createElement("span", {
    className: "bw-meta-val"
  }, task.section)), /*#__PURE__*/React.createElement("div", {
    className: "bw-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Due"), /*#__PURE__*/React.createElement("span", {
    className: "bw-meta-val"
  }, task.due)), /*#__PURE__*/React.createElement("div", {
    className: "bw-meta-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Priority"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warning"
  }, task.priority)))), /*#__PURE__*/React.createElement("p", {
    className: "bw-meta-note in-voice"
  }, "\"Click any text to edit it before pushing \u2014 your edits go to Asana, not the template.\""))));
}
window.DescriptionView = DescriptionView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/writer/DescriptionView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/writer/SettingsDialog.jsx
try { (() => {
/* Brief writer — Settings dialog: connect Asana, choose workspace + project. */

function SettingsDialog({
  open,
  onClose,
  onConnectionChange
}) {
  const {
    Button,
    IconButton,
    Input,
    Badge
  } = window.BriefDesignSystem_8e53f4;
  const A = window.Asana;
  const [token, setToken] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | checking | connected | error
  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [workspaces, setWorkspaces] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [sections, setSections] = React.useState([]);
  const [wsGid, setWsGid] = React.useState("");
  const [projGid, setProjGid] = React.useState("");
  const [sectionGid, setSectionGid] = React.useState("");
  const [loadingProjects, setLoadingProjects] = React.useState(false);
  const [loadingSections, setLoadingSections] = React.useState(false);

  // Hydrate from any existing connection when the dialog opens.
  React.useEffect(() => {
    if (!open) return;
    if (A.isConnected()) {
      setStatus("checking");
      A.me().then(me => {
        setUser(me);
        setWorkspaces(me.workspaces);
        setStatus("connected");
        const sel = A.getSelection();
        const ws = sel && sel.workspace && sel.workspace.gid || me.workspaces[0] && me.workspaces[0].gid || "";
        setWsGid(ws);
        if (sel && sel.project) setProjGid(sel.project.gid);
        if (sel && sel.section) setSectionGid(sel.section.gid);
      }).catch(e => {
        setStatus("error");
        setError(e.message);
      });
    } else {
      setStatus("idle");
      setUser(null);
      setToken("");
    }
  }, [open]);

  // Load projects when workspace changes.
  React.useEffect(() => {
    if (!wsGid || status !== "connected") return;
    setLoadingProjects(true);
    A.projects(wsGid).then(ps => {
      setProjects(ps);
      setLoadingProjects(false);
    }).catch(() => {
      setProjects([]);
      setLoadingProjects(false);
    });
  }, [wsGid, status]);

  // Load sections when project changes.
  React.useEffect(() => {
    if (!projGid || status !== "connected") {
      setSections([]);
      return;
    }
    setLoadingSections(true);
    A.sections(projGid).then(ss => {
      setSections(ss);
      setLoadingSections(false);
    }).catch(() => {
      setSections([]);
      setLoadingSections(false);
    });
  }, [projGid, status]);
  async function connect() {
    const t = token.trim();
    if (!t) return;
    A.setToken(t);
    setStatus("checking");
    setError("");
    try {
      const me = await A.me();
      setUser(me);
      setWorkspaces(me.workspaces);
      setStatus("connected");
      setWsGid(me.workspaces[0] ? me.workspaces[0].gid : "");
      notify();
    } catch (e) {
      A.setToken("");
      setStatus("error");
      setError(e.kind === "auth" ? "That token was rejected. Check it and try again." : e.message);
    }
  }
  function disconnect() {
    A.setToken("");
    A.setSelection(null);
    setStatus("idle");
    setUser(null);
    setToken("");
    setProjects([]);
    setSections([]);
    setWsGid("");
    setProjGid("");
    setSectionGid("");
    notify();
  }
  function notify() {
    if (onConnectionChange) onConnectionChange();
  }
  function saveSelection(nextWs, nextProj, nextSection) {
    const ws = workspaces.find(w => w.gid === nextWs);
    const proj = projects.find(p => p.gid === nextProj);
    const section = sections.find(s => s.gid === nextSection);
    A.setSelection({
      workspace: ws || null,
      project: proj || null,
      section: section || null
    });
    notify();
  }
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "bw-modal-scrim",
    onMouseDown: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-modal",
    role: "dialog",
    "aria-label": "Settings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-modal-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Settings"), /*#__PURE__*/React.createElement("h2", {
    className: "display bw-modal-title"
  }, "Connect Asana")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    label: "Close",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: "bw-modal-body"
  }, status !== "connected" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "bw-modal-note"
  }, "Paste a Personal Access Token to push descriptions into your real Asana workspace. Create one in Asana under ", /*#__PURE__*/React.createElement("strong", null, "My Settings \u2192 Apps \u2192 Manage Developer Apps \u2192 Personal Access Tokens"), "."), /*#__PURE__*/React.createElement("div", {
    className: "bw-token-row"
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "key-round",
    type: "password",
    placeholder: "1/12345\u2026:abcdef\u2026",
    value: token,
    onChange: e => setToken(e.target.value),
    error: status === "error" ? error : undefined
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: connect,
    loading: status === "checking",
    disabled: !token.trim()
  }, "Connect")), /*#__PURE__*/React.createElement("p", {
    className: "bw-modal-fineprint"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "lock"
  }), " Stored only in this browser (localStorage). For a personal prototype \u2014 not production.")), status === "connected" && user && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bw-connected"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-connected-badge"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "circle-check-big"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bw-connected-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-connected-name"
  }, "Connected as ", user.name), user.email && /*#__PURE__*/React.createElement("span", {
    className: "bw-connected-sub"
  }, user.email)), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: disconnect
  }, "Disconnect")), /*#__PURE__*/React.createElement("div", {
    className: "bw-select-grid"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bw-select-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-field-label"
  }, "Workspace"), /*#__PURE__*/React.createElement("div", {
    className: "bw-native-select"
  }, /*#__PURE__*/React.createElement("select", {
    value: wsGid,
    onChange: e => {
      setWsGid(e.target.value);
      setProjGid("");
      setSectionGid("");
      saveSelection(e.target.value, "", "");
    }
  }, workspaces.map(w => /*#__PURE__*/React.createElement("option", {
    key: w.gid,
    value: w.gid
  }, w.name))), /*#__PURE__*/React.createElement(LIcon, {
    name: "chevron-down"
  }))), /*#__PURE__*/React.createElement("label", {
    className: "bw-select-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-field-label"
  }, "Default project ", /*#__PURE__*/React.createElement("span", {
    className: "bw-optional"
  }, "optional")), /*#__PURE__*/React.createElement("div", {
    className: "bw-native-select"
  }, /*#__PURE__*/React.createElement("select", {
    value: projGid,
    disabled: loadingProjects,
    onChange: e => {
      setProjGid(e.target.value);
      setSectionGid("");
      saveSelection(wsGid, e.target.value, "");
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, loadingProjects ? "Loading…" : "My Tasks (no project)"), projects.map(p => /*#__PURE__*/React.createElement("option", {
    key: p.gid,
    value: p.gid
  }, p.name))), /*#__PURE__*/React.createElement(LIcon, {
    name: "chevron-down"
  }))), projGid && /*#__PURE__*/React.createElement("label", {
    className: "bw-select-field bw-select-field--full"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-field-label"
  }, "Section ", /*#__PURE__*/React.createElement("span", {
    className: "bw-optional"
  }, "optional")), /*#__PURE__*/React.createElement("div", {
    className: "bw-native-select"
  }, /*#__PURE__*/React.createElement("select", {
    value: sectionGid,
    disabled: loadingSections || !sections.length,
    onChange: e => {
      setSectionGid(e.target.value);
      saveSelection(wsGid, projGid, e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, loadingSections ? "Loading…" : sections.length ? "First / default section" : "No sections in this project"), sections.map(s => /*#__PURE__*/React.createElement("option", {
    key: s.gid,
    value: s.gid
  }, s.name))), /*#__PURE__*/React.createElement(LIcon, {
    name: "chevron-down"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "bw-modal-fineprint"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "info"
  }), " New tasks land in ", projGid ? "this project" : "My Tasks", sectionGid ? " · chosen section" : "", " when you push. You can still edit everything before pushing.")))));
}
window.SettingsDialog = SettingsDialog;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/writer/SettingsDialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/writer/Sidebar.jsx
try { (() => {
/* Brief writer — left sidebar: brand, new task, search, recent tasks, account. */

function Sidebar({
  tasks,
  activeId,
  onSelect,
  onNew,
  connected,
  onOpenSettings,
  onCollapse
}) {
  const {
    IconButton,
    Avatar,
    Badge
  } = window.BriefDesignSystem_8e53f4;
  return /*#__PURE__*/React.createElement("aside", {
    className: "bw-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-side-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bw-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoMark || "../../assets/logo-mark.svg",
    width: "28",
    height: "28",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "bw-brand-name"
  }, "Brief")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "panel-left-close",
    label: "Hide sidebar",
    size: "sm",
    onClick: onCollapse
  })), /*#__PURE__*/React.createElement("button", {
    className: "bw-new",
    onClick: onNew
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "plus"
  }), "New task"), /*#__PURE__*/React.createElement("div", {
    className: "bw-search"
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search tasks"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bw-side-section"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Recent")), /*#__PURE__*/React.createElement("nav", {
    className: "bw-tasklist"
  }, tasks.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: "bw-taskitem" + (t.id === activeId ? " is-active" : ""),
    onClick: () => onSelect(t.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-taskdot",
    "data-state": t.state
  }), /*#__PURE__*/React.createElement("span", {
    className: "bw-taskinfo"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-tasktitle"
  }, t.title), /*#__PURE__*/React.createElement("span", {
    className: "bw-taskmeta"
  }, t.project))))), /*#__PURE__*/React.createElement("div", {
    className: "bw-side-account"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bw-workspace" + (connected ? " is-connected" : ""),
    onClick: onOpenSettings
  }, /*#__PURE__*/React.createElement(LIcon, {
    name: connected ? "circle-check-big" : "plug"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bw-ws-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bw-ws-name"
  }, connected ? "Asana" : "Connect Asana"), /*#__PURE__*/React.createElement("span", {
    className: "bw-ws-sub"
  }, connected ? "Connected · ready to push" : "Push tasks to your workspace")), /*#__PURE__*/React.createElement(LIcon, {
    name: "chevron-right"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bw-account"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maya Chen",
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bw-acct-name"
  }, "Maya Chen"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "settings",
    label: "Settings",
    size: "sm",
    onClick: onOpenSettings
  }))));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/writer/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/writer/asana.js
try { (() => {
/* Brief writer — Asana API helper.
   Talks to the real Asana REST API (https://developers.asana.com/reference/rest-api-reference)
   using a Personal Access Token the user pastes in Settings. The token is stored
   in localStorage on the user's own machine — fine for a personal prototype, not
   for shared/production use (a real product would use OAuth + a backend).

   NOTE on CORS: Asana's API permits browser requests with a Bearer token, but if a
   network/CORS error occurs the helper surfaces it so the UI can fall back gracefully. */

const ASANA_BASE = "https://app.asana.com/api/1.0";
const TOKEN_KEY = "brief.asana.pat";
const SEL_KEY = "brief.asana.selection"; // { workspace:{gid,name}, project:{gid,name}, section:{gid,name} }

const Asana = {
  getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || "";
    } catch (e) {
      return "";
    }
  },
  setToken(t) {
    try {
      t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
  },
  isConnected() {
    return !!this.getToken();
  },
  getSelection() {
    try {
      return JSON.parse(localStorage.getItem(SEL_KEY) || "null");
    } catch (e) {
      return null;
    }
  },
  setSelection(sel) {
    try {
      sel ? localStorage.setItem(SEL_KEY, JSON.stringify(sel)) : localStorage.removeItem(SEL_KEY);
    } catch (e) {}
  },
  async _req(path, opts = {}) {
    const token = this.getToken();
    if (!token) throw new Error("Not connected to Asana.");
    let res;
    try {
      res = await fetch(ASANA_BASE + path, {
        ...opts,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(opts.headers || {})
        }
      });
    } catch (netErr) {
      const e = new Error("Network/CORS error reaching Asana. The token may be fine, but the browser blocked the request.");
      e.kind = "network";
      throw e;
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = body.errors && body.errors[0] && body.errors[0].message || "Asana error " + res.status;
      const e = new Error(msg);
      e.kind = res.status === 401 ? "auth" : "api";
      e.status = res.status;
      throw e;
    }
    return body.data;
  },
  /** Validate the token and return the current user + their workspaces. */
  async me() {
    const data = await this._req("/users/me?opt_fields=name,email,workspaces.name");
    return {
      name: data.name,
      email: data.email,
      workspaces: (data.workspaces || []).map(w => ({
        gid: w.gid,
        name: w.name
      }))
    };
  },
  /** List projects in a workspace. */
  async projects(workspaceGid) {
    const data = await this._req(`/projects?workspace=${workspaceGid}&archived=false&opt_fields=name&limit=100`);
    return (data || []).map(p => ({
      gid: p.gid,
      name: p.name
    }));
  },
  /** List sections in a project (the columns/groups inside it). */
  async sections(projectGid) {
    const data = await this._req(`/projects/${projectGid}/sections?opt_fields=name&limit=100`);
    return (data || []).map(s => ({
      gid: s.gid,
      name: s.name
    }));
  },
  /** Move a task into a specific section of a project. */
  async addTaskToSection(sectionGid, taskGid) {
    await this._req(`/sections/${sectionGid}/addTask`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          task: taskGid
        }
      })
    });
  },
  /** List tasks to attach a description to. Scopes, in priority:
      section → project → tasks assigned to me in the workspace.
      Includes completed tasks for project/section scopes (caller can hide them).
      `num_subtasks` lets the UI offer lazy subtask expansion. */
  async tasks({
    sectionGid,
    projectGid,
    workspaceGid
  }) {
    const f = "name,completed,permalink_url,num_subtasks";
    let path;
    if (sectionGid) {
      path = `/sections/${sectionGid}/tasks?opt_fields=${f}&limit=100`;
    } else if (projectGid) {
      path = `/tasks?project=${projectGid}&opt_fields=${f}&limit=100`;
    } else {
      // My Tasks: keep to incomplete only (a whole-workspace completed history is huge).
      path = `/tasks?assignee=me&workspace=${workspaceGid}&completed_since=now&opt_fields=${f}&limit=100`;
    }
    const data = await this._req(path);
    return (data || []).filter(t => t.name).map(t => ({
      gid: t.gid,
      name: t.name,
      url: t.permalink_url,
      completed: !!t.completed,
      numSubtasks: t.num_subtasks || 0
    }));
  },
  /** List the subtasks of a task (themselves possibly having subtasks). */
  async subtasks(taskGid) {
    const data = await this._req(`/tasks/${taskGid}/subtasks?opt_fields=name,completed,permalink_url,num_subtasks&limit=100`);
    return (data || []).filter(t => t.name).map(t => ({
      gid: t.gid,
      name: t.name,
      url: t.permalink_url,
      completed: !!t.completed,
      numSubtasks: t.num_subtasks || 0
    }));
  },
  /** Fetch a single task's current notes (to pre-load when rewriting). */
  async taskNotes(taskGid) {
    const data = await this._req(`/tasks/${taskGid}?opt_fields=name,notes,permalink_url`);
    return {
      gid: data.gid,
      name: data.name,
      notes: data.notes || "",
      url: data.permalink_url
    };
  },
  /** Create a task. If sectionGid is given, the task is created inside that
      section (via memberships); otherwise it lands in the project's default
      section. Returns { gid, permalink_url }. */
  async createTask({
    workspaceGid,
    projectGid,
    sectionGid,
    name,
    notes
  }) {
    const data = {
      name,
      notes,
      workspace: workspaceGid
    };
    if (projectGid && sectionGid) {
      data.memberships = [{
        project: projectGid,
        section: sectionGid
      }];
    } else if (projectGid) {
      data.projects = [projectGid];
    }
    const created = await this._req("/tasks?opt_fields=permalink_url,name", {
      method: "POST",
      body: JSON.stringify({
        data
      })
    });
    return {
      gid: created.gid,
      url: created.permalink_url
    };
  },
  /** Update an existing task's name + notes. */
  async updateTask(taskGid, {
    name,
    notes
  }) {
    const updated = await this._req(`/tasks/${taskGid}?opt_fields=permalink_url`, {
      method: "PUT",
      body: JSON.stringify({
        data: {
          name,
          notes
        }
      })
    });
    return {
      gid: updated.gid,
      url: updated.permalink_url
    };
  }
};

/** Render the editable description as Asana task notes (plain text). */
function descriptionToNotes(description) {
  const lines = [];
  if (description.context) {
    lines.push(description.context.trim(), "");
  }
  if (description.criteria && description.criteria.length) {
    lines.push("Acceptance criteria:");
    description.criteria.forEach(c => c.trim() && lines.push("- " + c.trim()));
    lines.push("");
  }
  if (description.resources && description.resources.length) {
    lines.push("Resources:");
    description.resources.forEach(r => r.trim() && lines.push("- " + r.trim()));
    lines.push("");
  }
  lines.push("— Written with Brief");
  return lines.join("\n");
}
window.Asana = Asana;
window.descriptionToNotes = descriptionToNotes;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/writer/asana.js", error: String((e && e.message) || e) }); }

// ui_kits/writer/icons.jsx
try { (() => {
/* Shared icon helper for the writer kit. Renders a Lucide icon into a
   React-owned span so lucide's DOM swap never collides with reconciliation. */
function LIcon({
  name,
  className
}) {
  const r = React.useRef(null);
  React.useEffect(() => {
    const el = r.current;
    if (!el) return;
    el.textContent = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    if (window.lucide) window.lucide.createIcons({
      nameAttr: "data-lucide",
      root: el
    });
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: r,
    className: "brief-ic" + (className ? " " + className : ""),
    "aria-hidden": "true"
  });
}
window.LIcon = LIcon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/writer/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
