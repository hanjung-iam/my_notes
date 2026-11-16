/* =========================================================
   my_notes — 全站唯一腳本
   - 首頁：課程卡片、全站搜尋、標籤篩選
   - 課程頁：筆記卡片、課程內搜尋、標籤篩選
   - 筆記頁：課程圖示、自動目錄、目前段落標示、KaTeX 公式
   資料來源：data/courses.js（window.NOTES_DATA）
   ========================================================= */
(function () {
  "use strict";

  var DATA = window.NOTES_DATA || { courses: [] };
  var body = document.body;
  var ROOT = body.getAttribute("data-root") || "./";
  var COLORS = ["gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"];

  /* ---------- 小工具 ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function setCourseColor(node, course) {
    var c = COLORS.indexOf(course.color) >= 0 ? course.color : "gray";
    node.style.setProperty("--course-color", "var(--c-" + c + ")");
  }

  /* 課程圖示：讀 assets/icons/ 的檔案；沒有或載入失敗 → 第一個字 + 代表色 */
  function courseIcon(course, size) {
    var box = el("span", { class: "course-icon" + (size ? " " + size : ""), "aria-hidden": "true" });
    setCourseColor(box, course);
    function fallback() {
      box.innerHTML = "";
      box.classList.add("fallback");
      box.textContent = (course.name || "?").charAt(0);
    }
    if (course.icon) {
      var img = el("img", { src: ROOT + course.icon, alt: "" });
      img.addEventListener("error", fallback);
      box.appendChild(img);
    } else {
      fallback();
    }
    return box;
  }

  function noteNumber(note) {
    var m = /^(\d+)-/.exec(note.file || "");
    return m ? m[1] : "";
  }

  function sortedNotes(course) {
    return (course.notes || []).slice().sort(function (a, b) {
      return (a.file || "").localeCompare(b.file || "");
    });
  }

  function noteHref(course, note) {
    return ROOT + "courses/" + course.slug + "/" + note.file;
  }

  function noteCard(course, note, showCourse) {
    var num = el("div", { class: "num" });
    if (showCourse) {
      num.appendChild(courseIcon(course, "sm"));
      num.appendChild(el("span", { class: "course-name", text: course.name + " ·" }));
    }
    num.appendChild(el("span", { text: [noteNumber(note), note.unit].filter(Boolean).join(" · ") }));

    var tags = el("div", { class: "tags" });
    (note.tags || []).forEach(function (t) { tags.appendChild(el("span", { class: "tag", text: t })); });

    return el("a", { class: "card note-card", href: noteHref(course, note) }, [
      num,
      el("h3", { text: note.title }),
      el("p", { class: "summary", text: note.summary || "" }),
      el("div", { class: "foot" }, [tags, el("span", { class: "date", text: note.updated ? "更新 " + note.updated : "" })])
    ]);
  }

  function courseCard(course) {
    var card = el("a", { class: "card course-card", href: ROOT + "courses/" + course.slug + "/index.html" }, [
      el("div", { class: "cover" }),
      courseIcon(course),
      el("div", { class: "body" }, [
        el("h3", { text: course.name }),
        el("p", { class: "desc", text: course.description || "" }),
        el("div", { class: "meta", text: (course.notes || []).length + " 份筆記" })
      ])
    ]);
    setCourseColor(card, course);
    return card;
  }

  /* 標籤列（含數量），回傳目前選取狀態的 getter */
  function buildTagBar(container, notes, onChange) {
    var counts = {};
    notes.forEach(function (n) { (n.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
    var names = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
    var active = "";
    container.innerHTML = "";
    if (!names.length) { container.hidden = true; return function () { return ""; }; }

    function render() {
      Array.prototype.forEach.call(container.children, function (b) {
        b.classList.toggle("active", b.getAttribute("data-tag") === active);
      });
    }
    [""].concat(names).forEach(function (t) {
      var b = el("button", { type: "button", class: "tag", "data-tag": t, text: t || "全部" });
      if (t) b.appendChild(el("span", { class: "n", text: String(counts[t]) }));
      b.addEventListener("click", function () {
        active = active === t ? "" : t;
        render();
        onChange();
      });
      container.appendChild(b);
    });
    render();
    return function () { return active; };
  }

  function matches(course, note, q, tag) {
    if (tag && (note.tags || []).indexOf(tag) < 0) return false;
    if (!q) return true;
    var hay = [course.name, note.title, note.summary, note.unit].concat(note.tags || []).join(" ").toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  /* ---------- 首頁 ---------- */
  function initHome() {
    var grid = document.getElementById("course-grid");
    var coursesSection = document.getElementById("courses-section");
    var resultsSection = document.getElementById("results-section");
    var results = document.getElementById("results");
    var resultsTitle = document.getElementById("results-title");
    var input = document.getElementById("search-input");

    DATA.courses.forEach(function (c) { grid.appendChild(courseCard(c)); });
    if (!DATA.courses.length) grid.appendChild(el("p", { class: "empty", text: "還沒有任何課程" }));

    var all = [];
    DATA.courses.forEach(function (c) { sortedNotes(c).forEach(function (n) { all.push({ course: c, note: n }); }); });

    var getTag = buildTagBar(document.getElementById("tag-bar"), all.map(function (x) { return x.note; }), update);

    function update() {
      var q = input.value.trim().toLowerCase();
      var tag = getTag();
      var filtering = q || tag;
      coursesSection.hidden = !!filtering;
      resultsSection.hidden = !filtering;
      if (!filtering) return;
      var hits = all.filter(function (x) { return matches(x.course, x.note, q, tag); });
      results.innerHTML = "";
      resultsTitle.textContent = "找到 " + hits.length + " 份筆記";
      hits.forEach(function (x) { results.appendChild(noteCard(x.course, x.note, true)); });
      if (!hits.length) results.appendChild(el("p", { class: "empty", text: "找不到符合的筆記" }));
    }
    input.addEventListener("input", update);
  }

  /* ---------- 課程頁 ---------- */
  function initCourse() {
    var slug = body.getAttribute("data-course");
    var course = DATA.courses.filter(function (c) { return c.slug === slug; })[0];
    var head = document.getElementById("course-head");
    if (!course) {
      head.appendChild(el("p", { class: "empty", text: "找不到這門課程（" + slug + "）" }));
      return;
    }
    document.title = course.name + " · 我的課程筆記";
    var crumb = document.getElementById("crumb-course");
    if (crumb) crumb.textContent = course.name;

    head.appendChild(courseIcon(course, "lg"));
    head.appendChild(el("h1", { text: course.name }));
    if (course.description) head.appendChild(el("p", { class: "lead", text: course.description }));
    head.appendChild(el("p", { class: "count", text: (course.notes || []).length + " 份筆記" }));

    var notes = sortedNotes(course);
    var list = document.getElementById("note-grid");
    var input = document.getElementById("search-input");
    var getTag = buildTagBar(document.getElementById("tag-bar"), notes, update);

    function update() {
      var q = input.value.trim().toLowerCase();
      var tag = getTag();
      list.innerHTML = "";
      var hits = notes.filter(function (n) { return matches(course, n, q, tag); });
      hits.forEach(function (n) { list.appendChild(noteCard(course, n, false)); });
      if (!hits.length) list.appendChild(el("p", { class: "empty", text: notes.length ? "找不到符合的筆記" : "這門課還沒有筆記" }));
    }
    input.addEventListener("input", update);
    update();
  }

  /* ---------- 筆記頁 ---------- */
  function initNote() {
    var slug = body.getAttribute("data-course");
    var course = DATA.courses.filter(function (c) { return c.slug === slug; })[0];
    var iconSlot = document.getElementById("note-icon");
    if (course && iconSlot) iconSlot.appendChild(courseIcon(course, "lg"));

    // 自動目錄：抓 article 內有 id 的 h2 / h3
    var article = document.querySelector(".note");
    var tocList = document.getElementById("toc-list");
    var heads = article ? article.querySelectorAll("h2[id], h3[id]") : [];
    var links = [];
    Array.prototype.forEach.call(heads, function (h) {
      var a = el("a", { href: "#" + h.id, text: h.textContent });
      tocList.appendChild(el("li", { class: "lvl-" + h.tagName.charAt(1) }, [a]));
      links.push({ a: a, h: h });
    });

    // 手機版目錄預設收合
    var tocDetails = document.querySelector(".toc details");
    if (tocDetails && window.matchMedia("(max-width: 900px)").matches) tocDetails.open = false;

    // 目前閱讀段落標示
    function spy() {
      var current = null;
      links.forEach(function (x) { if (x.h.getBoundingClientRect().top < 120) current = x; });
      links.forEach(function (x) { x.a.classList.toggle("active", x === current); });
    }
    window.addEventListener("scroll", spy, { passive: true });
    spy();

    // KaTeX（正文與目錄都要渲染，目錄中的標題也可能含公式）
    if (window.renderMathInElement) {
      [article, tocList].forEach(function (node) {
        if (!node) return;
        window.renderMathInElement(node, {
          delimiters: [
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false }
          ],
          throwOnError: false
        });
      });
    }
  }

  var page = body.getAttribute("data-page");
  if (page === "home") initHome();
  else if (page === "course") initCourse();
  else if (page === "note") initNote();
})();
