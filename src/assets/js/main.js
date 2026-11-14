(function () {
  // Language buttons
  var root = document.documentElement;
  document.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      var m = b.getAttribute("data-set");
      root.setAttribute("data-lang", m);
      root.lang = m === "en" ? "en" : "ko";
      try { localStorage.setItem("geo-lang", m); } catch (e) {}
    });
  });

  // Search page
  var q = document.getElementById("q");
  if (!q) return;
  var out = document.getElementById("results");
  var count = document.getElementById("count");
  var data = [];
  var KIND = { briefs: "브리프 / Brief", writings: "글 / Writing" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function render(list) {
    count.textContent = list.length ? list.length + " 건 / results" : "결과 없음 / No results";
    out.innerHTML = list.map(function (p) {
      return '<article class="row"><time class="d">' + esc(p.d) + '</time><div class="t">' +
        '<a class="title" href="' + esc(p.u) + '">' + esc(p.t) + (p.te ? ' <span style="color:var(--muted);font-weight:400">/ ' + esc(p.te) + '</span>' : '') + '</a>' +
        (p.s ? '<div class="note">' + esc(p.s) + '</div>' : '') +
        '</div><div class="r"><span class="badge">' + esc(KIND[p.k] || p.k) + '</span></div></article>';
    }).join("");
  }
  function run() {
    var s = q.value.trim().toLowerCase();
    if (!s) { render(data); return; }
    var words = s.split(/\s+/);
    render(data.filter(function (p) {
      var hay = [p.t, p.te, p.s, p.se, (p.g || []).join(" ")].join(" ").toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    }));
  }
  fetch("/search.json").then(function (r) { return r.json(); }).then(function (d) {
    data = d; run();
  }).catch(function () { count.textContent = "검색 데이터를 불러오지 못했습니다. / Could not load the search index."; });
  q.addEventListener("input", run);
})();
