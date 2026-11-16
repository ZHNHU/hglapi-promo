/* ============================================================
   HglAPI 宣传页脚本 · 无依赖
   ============================================================ */

"use strict";

/* ---------- 价格数据（单位：元 / 1M tokens） ---------- */
const MODELS = [
  // OpenAI GPT
  { name: "gpt-6.1-sol", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "新一代旗舰", in: 0.432, out: 2.16, ladder: true, tier: "hot" },
  { name: "gpt-6-luna", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "超值特惠", in: 0.022, out: 0.108, ladder: true, tier: "cheap" },
  { name: "gpt-6.1-terra", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "均衡次旗舰", in: 0.216, out: 1.08, ladder: true },
  { name: "gpt-6-sol", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "上代旗舰", in: 0.432, out: 2.16, ladder: true },
  { name: "gpt-6-astra", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "旗舰满配", in: 2.16, out: 10.8, ladder: true },
  { name: "gpt-6", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "基础旗舰", in: 2.16, out: 10.8, ladder: true },
  { name: "gpt-5.6", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "上代旗舰", in: 1.08, out: 6.48, ladder: true },
  { name: "gpt-5.6-sol", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "上代旗舰", in: 1.08, out: 6.48, ladder: true },
  { name: "gpt-5.6-terra", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "上代均衡", in: 0.432, out: 2.592, ladder: true },
  { name: "gpt-5.6-luna", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "上代轻量", in: 0.043, out: 0.259, ladder: true },
  { name: "codex-auto-review", vendor: "openai", vendorLabel: "OpenAI GPT", desc: "编程特化", in: 0.043, out: 0.259, ladder: true },
  // Anthropic Claude
  { name: "claude-opus-5-5", vendor: "anthropic", vendorLabel: "Claude", desc: "推理旗舰", in: 1.44, out: 7.2 },
  { name: "claude-opus-5", vendor: "anthropic", vendorLabel: "Claude", desc: "上代旗舰", in: 1.8, out: 9.0 },
  { name: "claude-sonnet-5-5", vendor: "anthropic", vendorLabel: "Claude", desc: "均衡主力", in: 2.592, out: 12.96 },
  { name: "claude-sonnet-5", vendor: "anthropic", vendorLabel: "Claude", desc: "均衡主力", in: 0.72, out: 3.6 },
  { name: "claude-sonnet-4-6", vendor: "anthropic", vendorLabel: "Claude", desc: "上代均衡", in: 1.08, out: 5.4 },
  { name: "claude-haiku-5-5", vendor: "anthropic", vendorLabel: "Claude", desc: "轻量极速", in: 0.13, out: 0.648, ladder: true, tier: "cheap" },
  { name: "claude-haiku-4-5", vendor: "anthropic", vendorLabel: "Claude", desc: "上代轻量", in: 1.296, out: 6.48 },
  { name: "claude-fable-5", vendor: "anthropic", vendorLabel: "Claude", desc: "长文专精", in: 3.6, out: 18.0 },
  { name: "gpt-reserve", vendor: "anthropic", vendorLabel: "Claude", desc: "预留通道", in: 0.54, out: 3.24, ladder: true },
  // DeepSeek
  { name: "deepseek-v4-pro", vendor: "deepseek", vendorLabel: "DeepSeek", desc: "通用旗舰 · 中文出色", in: 0.475, out: 1.426, tier: "cheap" },
  { name: "deepseek-v4.1-flash", vendor: "deepseek", vendorLabel: "DeepSeek", desc: "极速普惠", in: 0.108, out: 0.432, tier: "cheap" },
  // 智谱 GLM
  { name: "glm-5.3", vendor: "zhipu", vendorLabel: "智谱 GLM", desc: "深度旗舰 · Agent 首选", in: 1.44, out: 5.04 },
  { name: "glm-5.3-flash", vendor: "zhipu", vendorLabel: "智谱 GLM", desc: "秒级响应 · 高频首选", in: 0.216, out: 0.72, tier: "cheap" },
  { name: "glm-5.3-flashx", vendor: "zhipu", vendorLabel: "智谱 GLM", desc: "秒级响应", in: 0.216, out: 0.72, tier: "cheap" },
];

const fmt = (n) => "¥" + n;

/* ---------- 价格表渲染 + 搜索 + 筛选 ---------- */
const tbody = document.getElementById("priceBody");
const emptyTip = document.getElementById("tableEmpty");
const searchInput = document.getElementById("modelSearch");
const chipRow = document.getElementById("vendorChips");
let currentVendor = "all";

function renderTable() {
  const kw = (searchInput.value || "").trim().toLowerCase();
  const rows = MODELS.filter(
    (m) =>
      (currentVendor === "all" || m.vendor === currentVendor) &&
      (!kw || m.name.toLowerCase().includes(kw) || m.desc.toLowerCase().includes(kw))
  );
  tbody.innerHTML = rows
    .map(
      (m) => `
      <tr>
        <td>
          <span class="m-name">${m.name}${m.ladder ? '<span class="tag-ladder">阶梯</span>' : ""}</span>
          <span class="m-desc">${m.desc}</span>
        </td>
        <td class="m-vendor">${m.vendorLabel}</td>
        <td class="m-price ${m.tier === "cheap" ? "cheap" : ""}">${fmt(m.in)}</td>
        <td class="m-price ${m.tier === "hot" ? "hot" : ""}">${fmt(m.out)}</td>
      </tr>`
    )
    .join("");
  emptyTip.hidden = rows.length > 0;
}

searchInput.addEventListener("input", renderTable);
chipRow.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  chipRow.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  currentVendor = chip.dataset.vendor;
  renderTable();
});
renderTable();

/* ---------- 复制工具 ---------- */
const toast = document.getElementById("toast");
let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function copyText(text, tip) {
  const done = () => showToast(tip || "已复制到剪贴板");
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch { showToast("复制失败，请手动复制"); }
  document.body.removeChild(ta);
}

const QQ_GROUP = "1064762302";
document.querySelectorAll(".copy-qq").forEach((btn) =>
  btn.addEventListener("click", () => copyText(QQ_GROUP, "QQ 群号已复制：1064762302"))
);

/* ---------- 代码选项卡 + 复制 ---------- */
const codeTabs = document.getElementById("codeTabs");
const codePanes = document.querySelectorAll(".code-pane");
codeTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".code-tab");
  if (!tab) return;
  codeTabs.querySelectorAll(".code-tab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  codePanes.forEach((p) => {
    const show = p.dataset.lang === tab.dataset.lang;
    p.classList.toggle("active", show);
    p.hidden = !show;
  });
});

document.getElementById("codeCopy").addEventListener("click", () => {
  const active = document.querySelector(".code-pane.active code");
  if (active) copyText(active.textContent, "代码已复制");
});

/* ---------- 导航：滚动状态 + 移动端菜单 ---------- */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  }
});

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
  const toTop = document.getElementById("toTop");
  if (toTop) toTop.classList.toggle("show", window.scrollY > 700);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const toTopBtn = document.getElementById("toTop");
if (toTopBtn) {
  toTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );
}

/* ---------- 导航高亮（scroll spy） ---------- */
const sections = [...document.querySelectorAll("main section[id]")];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = en.target.id;
      navLinks.querySelectorAll("a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => spy.observe(s));

/* ---------- 滚动显现动画 ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("visible"));
} else {
  let revealedAny = false;
  const ro = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        revealedAny = true;
        const delay = parseInt(el.dataset.delay || "0", 10);
        setTimeout(() => el.classList.add("visible"), delay);
        obs.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => ro.observe(el));
  // 兜底：极端节流或异常环境下，保证内容最终可见
  setTimeout(() => {
    if (!revealedAny) revealEls.forEach((el) => el.classList.add("visible"));
  }, 2500);
}

/* ---------- 数字滚动 ---------- */
const counters = document.querySelectorAll(".count");
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }
  const dur = 1400;
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const countObs = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      animateCount(en.target);
      obs.unobserve(en.target);
    });
  },
  { threshold: 0.6 }
);
counters.forEach((el) => countObs.observe(el));

/* ---------- 跑马灯内容复制一份，实现无缝循环 ---------- */
const track = document.getElementById("marqueeTrack");
track.innerHTML += track.innerHTML;

/* ---------- Hero 流式演示 ---------- */
const DEMO_SCENES = [
  { model: "gpt-6.1-sol", q: "用一句话介绍你自己", a: "我是运行在 HglAPI 网关上的旗舰模型，一把 Key 即可与你对话。" },
  { model: "claude-sonnet-5", q: "帮我写一句宣传语", a: "稳定高效的 AI API 服务 —— 让每一次调用都快人一步。" },
  { model: "glm-5.3-flash", q: "用 Python 打印斐波那契数列", a: "from functools import reduce; fib = lambda n: reduce(lambda x,_: x+[x[-1]+x[-2]], range(n-2), [0,1])" },
  { model: "deepseek-v4.1-flash", q: "翻译：The quick brown fox", a: "那只敏捷的棕色狐狸跳过了懒惰的狗。" },
];
const demoQ = document.getElementById("demoQuestion");
const demoA = document.getElementById("demoStream");
const demoM = document.getElementById("demoModel");
let sceneIdx = 0;

function playScene() {
  const s = DEMO_SCENES[sceneIdx % DEMO_SCENES.length];
  sceneIdx++;
  demoQ.textContent = s.q;
  demoM.textContent = s.model;
  demoA.textContent = "";
  let i = 0;
  const type = () => {
    if (i <= s.a.length) {
      demoA.textContent = s.a.slice(0, i);
      i += 1;
      setTimeout(type, 45);
    } else {
      setTimeout(playScene, 2600);
    }
  };
  setTimeout(type, 700);
}
if (!reduceMotion) playScene();
else demoA.textContent = DEMO_SCENES[0].a;

/* ---------- 背景代码尘 v2（移植参考实现：路径生成 + 生命周期） ----------
   字符不是预置的：鼠标跨格时在该格与邻格现场生成全新片段，
   各自"淡入→短暂停留→淡出→销毁"；停下即无新生成，页面自然归零。 */
(function codeDust() {
  const canvas = document.getElementById("codeDust");
  if (!canvas || !canvas.getContext) return;
  if (reduceMotion) return; // 弱化动画偏好：整个效果不启用（与参考实现一致）
  const ctx = canvas.getContext("2d");

  // 片段素材：真实调用代码切片 2~4 字符，偶插运算符，观感即"真代码"
  const CODE_SRC =
    "const client = new OpenAI({ apiKey: 'sk-...', baseURL: 'https://hglapi.com/v1' }); " +
    "const stream = await client.chat.completions.create({ model: 'gpt-6.1-sol', " +
    "messages: [{ role: 'user', content: 'hello' }], stream: true }); " +
    "for await (const chunk of stream) print(chunk.choices[0].delta.content);";
  const JOIN = [" ", " ", " ", " + ", " - ", " * ", " / ", " = ", " > ", " < ", " & ", " | "];
  const COLORS = ["34,211,238", "34,211,238", "34,211,238", "79,140,255", "168,85,247"];
  const CELL_W = 64, CELL_H = 14; // 宽扁网格：字符像贴在代码行上
  const MAX_GLYPHS = 40;
  const AMBIENT_RATE = 0.07;      // 每帧环境自发概率

  let W = 0, H = 0, colsN = 0, rowsN = 0;
  const occupied = new Map(); // "col,row" -> glyph，同格不重复
  const glyphs = [];
  let rafId = 0, lastFrame = 0, prevCell = null;

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];
  const key = (c, r) => c + "," + r;

  function makeText() {
    const i = (Math.random() * (CODE_SRC.length - 4)) | 0;
    const n = 2 + ((Math.random() * 3) | 0);
    const s = CODE_SRC.slice(i, i + n);
    let out = "";
    for (let k = 0; k < s.length; k++) {
      out += s[k];
      if (k < s.length - 1 && Math.random() < 0.25) out += pick(JOIN);
    }
    return out;
  }

  function spawn(col, row, bright) {
    if (col < 0 || col >= colsN || row < 0 || row >= rowsN) return;
    const k = key(col, row);
    if (occupied.has(k) || glyphs.length >= MAX_GLYPHS) return;
    const g = {
      col, row, text: makeText(), rgb: pick(COLORS),
      life: 0,
      maxLife: bright ? 0.95 : 0.5, // 鼠标路径全亮，环境微光半亮
      speed: rand(0.05, 0.09),      // 淡入淡出速率（按 dt*60 帧率无关化）
      state: "in",
      hold: rand(8, 28),            // 停留时长（帧当量）
    };
    occupied.set(k, g);
    glyphs.push(g);
  }

  function build() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    colsN = Math.max(1, Math.floor(W / CELL_W));
    rowsN = Math.max(1, Math.floor(H / CELL_H));
  }

  function frame(nowMs) {
    const dt = Math.min(Math.max((nowMs - (frame.prev || nowMs)) / 1000, 0.001), 0.5);
    const step = dt * 60;
    frame.prev = nowMs;

    ctx.clearRect(0, 0, W, H);
    ctx.font = 'bold 12px ui-monospace, "Cascadia Code", Consolas, monospace';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = glyphs.length - 1; i >= 0; i--) {
      const g = glyphs[i];
      if (g.state === "in") {
        g.life += g.speed * step;
        if (g.life >= g.maxLife) { g.life = g.maxLife; g.state = "hold"; }
      } else if (g.state === "hold") {
        g.hold -= step;
        if (g.hold <= 0) g.state = "out";
      } else {
        g.life -= g.speed * step;
        if (g.life <= 0) { occupied.delete(key(g.col, g.row)); glyphs.splice(i, 1); continue; }
      }
      ctx.fillStyle = `rgba(${g.rgb},${g.life.toFixed(3)})`;
      ctx.fillText(g.text, g.col * CELL_W + CELL_W / 2, g.row * CELL_H + CELL_H / 2);
    }

    // 环境自发：低概率在随机位置生成半亮度片段（若隐若现的背景层）
    if (Math.random() < AMBIENT_RATE) {
      spawn((Math.random() * colsN) | 0, (Math.random() * rowsN) | 0, false);
    }
    lastFrame = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  // 看门狗：嵌入式面板抑制 rAF 时用低频定时器兜底（dt 帧率无关，行为一致）
  setInterval(() => {
    if (performance.now() - lastFrame > 450) frame(performance.now());
  }, 200);

  // 鼠标路径生成：跨格才触发（停下=无新片段），伴随 2~4 个邻格（参考实现原味）
  window.addEventListener("pointermove", (e) => {
    const col = Math.floor(e.clientX / CELL_W);
    const row = Math.floor(e.clientY / CELL_H);
    const cell = key(col, row);
    if (cell === prevCell) return;
    prevCell = cell;
    spawn(col, row, true);
    if (Math.random() < 0.9) {
      const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];
      const n = 2 + ((Math.random() * 3) | 0);
      for (let k = 0; k < n; k++) {
        const d = pick(DIRS);
        spawn(col + d[0], row + d[1], true);
      }
    }
  }, { passive: true });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { occupied.clear(); glyphs.length = 0; build(); }, 200);
  });

  build();
  rafId = requestAnimationFrame(frame);
})();
