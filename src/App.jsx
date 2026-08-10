/* ═══════════════════════════════════════════════════════════════════
   國立臺灣師範大學　東亞學系 — 單頁介紹（五語）
   由 deas-ntnu-onepage.html 逐元素、逐屬性、逐 CSS、逐 JavaScript
   轉換而成的原生 React 元件。

   本檔案相對於原 HTML 的差異，僅限 JSX 語法強制要求者：
     1. class → className、tabindex → tabIndex
     2. 空元素（img、br）改為自閉合
     3. <style> 內容以字串常數經運算式容器注入
     4. document.addEventListener("DOMContentLoaded", init) → useEffect
     5. 補上原檔 foot-sand 區塊遺漏的一個 </div>
        （瀏覽器原本即自動修正於 </footer> 前，DOM 結果相同）
     6. 新增 Tailwind preflight 與 #root 相容規則，見 CSS 末段註記

   資料、識別碼、類別名稱、元素順序、CSS 規則、JavaScript 演算法
   與所有文字內容均逐字保留，未作任何改寫。
   ═══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   原檔 <style> 內容，逐字保留
   ───────────────────────────────────────────────────────────────── */
const CSS = String.raw`
/* ═══════════════════════════════════════════════════════════
   國立臺灣師範大學　東亞學系
   設計系統 — 朱與靛：兩大學群的顏色編碼
   ═══════════════════════════════════════════════════════════ */
:root{
  /* ── 色彩 ───────────────────────────── */
  --lacquer:#4E070B;      /* 漆 — 深色列、頁尾 */
  --brick:#840000;        /* 磚 — 主色 */
  --vermilion:#990000;    /* 朱 — 連結、當前項、文化學群 */
  --indigo:#24384F;       /* 靛 — 政經學群 */
  --indigo-soft:#E7EAEF;
  --vermilion-soft:#F7EDEC;
  --sand:#DBD6CC;         /* 砂 */
  --sand-lt:#E9E5DE;
  --sand-dk:#C4BDB0;
  --gold:#C9A96A;          /* 深色底上的強調 */
  --brick-lite:#B23A32;
  --paper:#FFFFFF;
  --ground:#F0EFED;
  --ink:#1A1412;
  --ink-2:#4A4340;
  --ink-3:#6B645F;
  --ink-4:#7A736D;
  --rule:#DCD8D2;
  --rule-lt:#EAE7E2;

  /* ── 字體 ───────────────────────────── */
  --serif:"Noto Serif TC","Source Han Serif TC","Songti TC","PMingLiU","新細明體",
          "Times New Roman",serif;
  --sans:"Noto Sans TC","Source Han Sans TC","PingFang TC","Hiragino Sans CNS",
         "Microsoft JhengHei","微軟正黑體",system-ui,-apple-system,sans-serif;
  --mono:ui-monospace,"SF Mono","JetBrains Mono","Roboto Mono","Menlo",monospace;

  /* ── 尺度 ───────────────────────────── */
  --wrap:1180px;
  --gut:28px;
  --label-w:54px;         /* 直排標籤欄寬 */
  --sh-1:0 1px 2px rgba(26,20,18,.05);
  --sh-2:0 3px 14px rgba(26,20,18,.08);
  --sh-3:0 12px 38px rgba(26,20,18,.14);
  --ease:cubic-bezier(.22,.7,.3,1);
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);
  font-size:15px;line-height:1.9;letter-spacing:.02em;-webkit-font-smoothing:antialiased;
  display:flex;flex-direction:column;min-height:100vh;
  font-feature-settings:"palt" 1}
img{max-width:100%;display:block}
a{color:var(--vermilion);text-decoration:none;transition:color .18s var(--ease)}
a:hover{color:var(--lacquer)}
a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible,[tabindex]:focus-visible{
  outline:2px solid var(--vermilion);outline-offset:3px;border-radius:1px}
h1,h2,h3,h4{margin:0;font-family:var(--serif);font-weight:700;line-height:1.32;
  letter-spacing:.06em;word-break:keep-all;line-break:strict}
p{margin:0 0 1.15em}
ul,ol{margin:0 0 1.15em;padding-left:1.45em}
table{border-collapse:collapse;width:100%}
.wrap{width:100%;max-width:var(--wrap);margin:0 auto;padding:0 var(--gut)}
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums;letter-spacing:.02em}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
.skip{position:absolute;left:0;top:0;transform:translateY(-200%);z-index:1200;
  background:var(--brick);color:#fff;font-weight:700;padding:11px 20px;
  transition:transform .15s var(--ease)}
.skip:focus{transform:none}

/* ═══ 標頭 ═══ */
.masthead{background:var(--lacquer);border-top:3px solid var(--brick)}
.masthead .wrap{display:flex;align-items:center;gap:22px;padding-top:17px;padding-bottom:17px}
.brandmark img{width:228px;height:auto}
.brandrule{width:1px;align-self:stretch;background:rgba(255,255,255,.2)}
.deptname{line-height:1.15;text-decoration:none;display:block}
.deptname .zh{display:block;font-family:var(--serif);font-size:27px;font-weight:700;color:#fff;
  letter-spacing:.3em;text-indent:.3em;white-space:nowrap}
.deptname .en{display:block;font-size:10.5px;color:var(--sand);letter-spacing:.16em;
  margin-top:5px;text-transform:uppercase;font-family:var(--sans);white-space:nowrap}
.deptname:hover .zh{color:var(--sand)}
.masthead .spacer{flex:1}

/* ═══ 主選單：錨點列 ═══ */
.mainnav{background:var(--brick);position:sticky;top:0;z-index:120;
  box-shadow:0 1px 0 rgba(0,0,0,.16)}
.menu{list-style:none;margin:0;padding:0;display:flex}
.menu>li{position:relative;flex:1 1 0}
.menu>li>a{display:flex;align-items:center;justify-content:center;min-height:50px;
  color:rgba(255,255,255,.94);font-family:var(--serif);font-size:16px;letter-spacing:.14em;
  text-indent:.14em;text-decoration:none;position:relative;
  transition:background .2s var(--ease),color .2s var(--ease)}
.menu>li+li>a::before{content:"";position:absolute;left:0;top:15px;bottom:15px;width:1px;
  background:rgba(255,255,255,.16)}
.menu>li>a::after{content:"";position:absolute;left:50%;right:50%;bottom:0;height:3px;
  background:var(--gold);transition:left .26s var(--ease),right .26s var(--ease)}
.menu>li>a:hover{background:var(--vermilion);color:#fff}
.menu>li>a[aria-current="true"]{background:var(--vermilion);color:#fff}
.menu>li>a[aria-current="true"]::after{left:0;right:0}
.menu>li>a[aria-current="true"]::before,
.menu>li>a:hover::before{background:transparent}
/* 回到頁首僅存在於窄螢幕覆蓋層 */
.menu .to-top{display:none}

/* ═══ 簽名元素：直排區段標籤 ═══ */
.sec{padding:66px 0}
.sec-inner{display:flex;gap:30px;align-items:flex-start}
.sec-mark{flex:0 0 var(--label-w);display:flex;flex-direction:column;align-items:center;gap:14px;
  position:sticky;top:74px}
.sec-mark .rule{width:2px;flex:0 0 44px;background:var(--vermilion)}
/* 漢字直排以逐字堆疊實作：writing-mode 依賴字型的縱書度量（vmtx），
   缺乏該表的字型會使字符前進量歸零而重疊，故不採用。 */
.sec-mark .zh{display:flex;flex-direction:column;align-items:center;gap:.34em;margin:0;
  font-family:var(--serif);font-size:19px;font-weight:700;line-height:1;color:var(--ink);
  flex:0 0 auto}
.sec-mark .zh i{font-style:normal;display:block}
.sec-mark .en{writing-mode:vertical-rl;font-feature-settings:normal;font-family:var(--mono);font-size:10px;letter-spacing:.22em;
  color:var(--ink-4);text-transform:uppercase;white-space:nowrap;line-height:1;flex:0 0 auto}
.sec-mark.indigo .rule{background:var(--indigo)}
.sec-body{flex:1;min-width:0}
.sec-lead{font-family:var(--serif);font-size:19px;line-height:1.95;color:var(--ink-2);
  letter-spacing:.05em;max-width:46em;margin-bottom:32px}
.sec-more{display:inline-flex;align-items:center;gap:8px;font-size:14px;letter-spacing:.1em;
  color:var(--ink-3);text-decoration:none;border-bottom:1px solid var(--rule);padding-bottom:3px}
.sec-more:hover{color:var(--brick);border-bottom-color:var(--brick)}
.sec-more .arw{transition:transform .2s var(--ease)}
.sec-more:hover .arw{transform:translateX(4px)}

/* ═══ 首頁：主視覺 ═══ */
.hero{background:var(--lacquer);position:relative}
/* 橫幅圖含嵌字，一律完整顯示，不作裁切 */
.hero-stage{position:relative;aspect-ratio:1400/336;max-height:430px;overflow:hidden;
  background:var(--lacquer)}
.hero-slide{position:absolute;inset:0;opacity:0;transition:opacity .75s var(--ease)}
.hero-slide.on{opacity:1}
.hero-slide .fill{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  filter:blur(26px) brightness(.44) saturate(.7);transform:scale(1.14)}
.hero-slide .plate{position:relative;width:100%;height:100%;object-fit:contain;object-position:center}

.hero-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:4;width:46px;height:70px;
  border:0;background:rgba(78,7,11,.42);color:#fff;font-size:17px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:background .2s var(--ease)}
.hero-nav:hover{background:var(--brick)}
.hero-nav.prev{left:0}
.hero-nav.next{right:0}
/* 說明軌：不覆蓋原圖，改置於圖下 */
.hero-rail{background:var(--sand);border-top:2px solid var(--brick)}
.hero-rail .wrap{display:flex;align-items:center;gap:20px;min-height:56px;flex-wrap:wrap}
.hero-count{font-family:var(--mono);font-size:12.5px;color:var(--brick);letter-spacing:.1em;flex:0 0 auto}
.hero-title{font-family:var(--serif);font-size:17px;font-weight:700;color:var(--lacquer);
  letter-spacing:.1em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hero-go{font-size:13.5px;letter-spacing:.1em;color:var(--brick);text-decoration:none;
  display:inline-flex;align-items:center;gap:7px;flex:0 0 auto}
.hero-go:hover{color:var(--lacquer)}
.hero-dots{display:flex;gap:6px;flex:0 0 auto}
.hero-dots button{width:22px;height:3px;padding:0;border:0;background:var(--sand-dk);cursor:pointer;
  transition:background .2s var(--ease)}
.hero-dots button[aria-current="true"]{background:var(--brick)}
.hero-dots button:hover{background:var(--vermilion)}

/* ═══ 定位陳述 ═══ */
.thesis{background:var(--paper);border-bottom:1px solid var(--rule)}
.thesis .wrap{padding-top:62px;padding-bottom:62px}
h1.thesis-claim{margin:0}
.thesis-claim{font-family:var(--serif);font-size:clamp(21px,3vw,35px);line-height:1.72;
  letter-spacing:.08em;color:var(--ink);max-width:22em;word-break:keep-all;line-break:strict}
.thesis-claim b{color:var(--brick);font-weight:700}
.thesis-sub{margin-top:22px;font-size:15.5px;line-height:2;color:var(--ink-2);max-width:40em}
.thesis-meta{display:flex;gap:38px;margin-top:36px;flex-wrap:wrap;padding-top:26px;
  border-top:1px solid var(--rule)}
.tm{min-width:104px}
.tm .n{font-family:var(--mono);font-size:29px;color:var(--brick);line-height:1.1;letter-spacing:.01em}
.tm .l{font-size:12.5px;color:var(--ink-3);letter-spacing:.14em;margin-top:5px}

/* ═══ 兩大學群（朱／靛） ═══ */
.pillars{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.pillar{background:var(--paper);border:1px solid var(--rule);padding:34px 32px;position:relative;
  overflow:hidden;transition:transform .28s var(--ease),box-shadow .28s var(--ease)}
.pillar:hover{transform:translateY(-3px);box-shadow:var(--sh-2)}
.pillar::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px}
.pillar.wen::before{background:var(--vermilion)}
.pillar.zheng::before{background:var(--indigo)}
.pillar .tag{display:inline-block;font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;
  padding:3px 10px;margin-bottom:16px;text-transform:uppercase}
.pillar.wen .tag{background:var(--vermilion-soft);color:var(--brick)}
.pillar.zheng .tag{background:var(--indigo-soft);color:var(--indigo)}
.pillar h3{font-size:23px;letter-spacing:.16em;margin-bottom:12px}
.pillar.wen h3{color:var(--brick)}
.pillar.zheng h3{color:var(--indigo)}
.pillar p{font-size:14.5px;line-height:1.95;color:var(--ink-2);margin-bottom:16px}
.pillar ul{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:7px}
.pillar li{font-size:12.5px;color:var(--ink-3);border:1px solid var(--rule);padding:3px 11px}

/* ═══ 學制 ═══ */
.degrees{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--rule);
  border:1px solid var(--rule)}
.degree{background:var(--paper);padding:28px 24px;text-decoration:none;display:block;
  transition:background .22s var(--ease)}
.degree:hover{background:var(--vermilion-soft)}
.degree .lv{font-family:var(--mono);font-size:11px;letter-spacing:.18em;color:var(--ink-4)}
.degree h4{font-family:var(--serif);font-size:21px;color:var(--ink);letter-spacing:.14em;margin:9px 0 8px}
.degree:hover h4{color:var(--brick)}
.degree .dg{font-family:var(--mono);font-size:12.5px;color:var(--brick);letter-spacing:.04em}
.degree .ds{font-size:13px;color:var(--ink-3);line-height:1.8;margin-top:10px}

/* ═══ 消息 ═══ */
.newsgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.ncard{background:var(--paper);border:1px solid var(--rule);padding:24px 24px 22px;
  text-decoration:none;display:flex;flex-direction:column;gap:11px;position:relative;
  transition:transform .26s var(--ease),box-shadow .26s var(--ease),border-color .26s var(--ease)}
.ncard:hover{transform:translateY(-3px);box-shadow:var(--sh-2);border-color:var(--sand-dk)}
.ncard .top{display:flex;align-items:center;gap:10px}
.ncard .cate{font-size:11.5px;letter-spacing:.1em;padding:2px 9px;background:var(--sand-lt);
  color:var(--brick)}
.ncard .date{font-family:var(--mono);font-size:12px;color:var(--ink-4);margin-left:auto}
.ncard .t{font-family:var(--serif);font-size:16.5px;line-height:1.75;color:var(--ink);
  letter-spacing:.04em;flex:1;
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.ncard:hover .t{color:var(--brick)}
.ncard .rd{font-size:12.5px;color:var(--ink-4);letter-spacing:.1em;display:inline-flex;
  align-items:center;gap:6px}
.ncard:hover .rd{color:var(--brick)}
.ncard .rd .arw{transition:transform .2s var(--ease)}
.ncard:hover .rd .arw{transform:translateX(4px)}
.pin{display:inline-block;background:var(--brick);color:#fff;font-size:11px;padding:1px 8px;
  letter-spacing:.06em;margin-right:7px;vertical-align:1px}

/* ═══ 師資概覽 ═══ */
.facegrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.face{background:var(--paper);border:1px solid var(--rule);padding:22px 20px;text-decoration:none;
  display:block;text-align:center;transition:transform .26s var(--ease),box-shadow .26s var(--ease)}
.face:hover{transform:translateY(-3px);box-shadow:var(--sh-2)}
.face .mono-av{width:60px;height:60px;margin:0 auto 13px;border:1.5px solid var(--brick);
  background:var(--sand);color:var(--brick);font-family:var(--serif);font-size:26px;
  display:flex;align-items:center;justify-content:center;transition:background .24s var(--ease),color .24s var(--ease)}
.face:hover .mono-av{background:var(--brick);color:#fff;border-color:var(--brick)}
.face .nm{font-family:var(--serif);font-size:17.5px;color:var(--ink);letter-spacing:.14em}
.face .rk{font-size:11.5px;color:var(--ink-3);letter-spacing:.08em;margin-top:4px}
.face .fd{font-size:12px;color:var(--ink-4);line-height:1.7;margin-top:9px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

/* ═══ 快捷 ═══ */
.quick{background:var(--sand-lt);border-top:1px solid var(--rule)}
.quick .wrap{padding-top:52px;padding-bottom:52px}
.qgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.qtile{background:var(--paper);border:1px solid var(--rule);padding:30px 22px;text-align:center;
  text-decoration:none;display:block;transition:transform .26s var(--ease),box-shadow .26s var(--ease)}
.qtile:hover{transform:translateY(-4px);box-shadow:var(--sh-2)}
.qtile .ic{width:52px;height:52px;margin:0 auto 15px;border-radius:50%;background:var(--brick);
  display:flex;align-items:center;justify-content:center;transition:background .24s var(--ease)}
.qtile:hover .ic{background:var(--vermilion)}
.qtile .ic svg{width:24px;height:24px;stroke:#fff;fill:none;stroke-width:1.5}
.qtile .zh{display:block;font-family:var(--serif);font-size:17.5px;color:var(--ink);letter-spacing:.16em}
.qtile:hover .zh{color:var(--brick)}
.qtile .en{display:block;font-family:var(--mono);font-size:10.5px;color:var(--ink-4);
  letter-spacing:.14em;margin-top:5px;text-transform:uppercase}

/* ═══ 內頁 ═══ */
.pagehead{background:var(--lacquer);color:#fff;position:relative;overflow:hidden}
.pagehead::after{content:"";position:absolute;right:-90px;top:-110px;width:330px;height:330px;
  border:1px solid rgba(219,214,204,.14);transform:rotate(45deg)}
.pagehead .wrap{position:relative;z-index:2;padding-top:36px;padding-bottom:36px;
  display:flex;align-items:stretch;gap:24px}
.ph-mark{flex:0 0 30px;display:flex;flex-direction:column;align-items:center;gap:12px}
.ph-mark .rule{width:2px;flex:0 0 26px;background:var(--brick)}
.ph-mark .zh{display:flex;flex-direction:column;align-items:center;gap:.3em;
  font-family:var(--serif);font-size:15px;font-weight:700;line-height:1;color:var(--sand);
  flex:0 0 auto}
.ph-mark .zh i{font-style:normal;display:block}
.ph-body{flex:1;min-width:0}
.crumbs{font-size:12.5px;color:rgba(255,255,255,.6);margin-bottom:9px;letter-spacing:.06em}
.crumbs a{color:rgba(255,255,255,.8);text-decoration:none}
.crumbs a:hover{color:var(--sand)}
.crumbs .sl{padding:0 8px;opacity:.45}
.pagehead h1{font-size:32px;letter-spacing:.2em;color:#fff}
.pagehead .en{font-family:var(--mono);font-size:11px;letter-spacing:.2em;color:var(--sand);
  margin-top:8px;text-transform:uppercase}
main{flex:1}
.content{padding:40px 0 76px}
.pagebody{display:flex;gap:34px;align-items:flex-start}
.aside{flex:0 0 226px;position:sticky;top:74px}
.aside .ahd{font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;color:var(--ink-3);
  text-transform:uppercase;padding-bottom:10px;border-bottom:2px solid var(--brick);margin-bottom:4px}
.aside ul{list-style:none;margin:0;padding:0}
.asidel{display:flex;align-items:center;gap:9px;padding:10px 13px;font-size:15px;color:var(--ink-2);
  text-decoration:none;border-bottom:1px solid var(--rule-lt);
  transition:background .18s var(--ease),color .18s var(--ease),padding-left .18s var(--ease)}
.asidel::before{content:"";width:3px;height:3px;background:var(--sand-dk);flex:0 0 auto;
  transition:background .18s var(--ease)}
.asidel:hover{background:var(--paper);color:var(--brick);padding-left:18px}
.asidel:hover::before{background:var(--vermilion)}
.asidel.active{background:var(--brick);color:#fff;font-weight:700;border-bottom-color:var(--brick)}
.asidel.active::before{background:var(--sand)}
.asidel.active:hover{background:var(--brick);color:#fff;padding-left:13px}
.pagemain{flex:1;min-width:0}
.panel{background:var(--paper);border:1px solid var(--rule);box-shadow:var(--sh-1)}
.panel-hd{background:var(--sand-lt);color:var(--lacquer);font-family:var(--serif);font-size:17px;
  font-weight:700;letter-spacing:.18em;padding:14px 26px;border-bottom:1px solid var(--rule)}
.panel-bd{padding:32px 34px}
.panel-bd h3{font-size:19px;color:var(--brick);letter-spacing:.12em;margin:32px 0 13px;
  padding-left:13px;border-left:3px solid var(--vermilion)}
.panel-bd h3:first-child{margin-top:0}
.panel-bd h4{font-family:var(--sans);font-size:15.5px;color:var(--ink);margin:20px 0 8px;
  letter-spacing:.06em;font-weight:700}
.panel-bd p{color:var(--ink-2);text-align:justify;line-height:2}
.panel-bd li{color:var(--ink-2);margin-bottom:6px;line-height:1.95}
.lead{font-family:var(--serif);font-size:18px;color:var(--lacquer);background:var(--sand-lt);
  border-left:3px solid var(--brick);padding:16px 22px;letter-spacing:.06em;line-height:1.95}
.deflist{border-top:1px solid var(--rule)}
.deflist>div{display:flex;border-bottom:1px solid var(--rule)}
.deflist dt{flex:0 0 176px;background:var(--ground);padding:13px 18px;font-weight:700;
  color:var(--brick);font-size:14px;letter-spacing:.08em}
.deflist dd{margin:0;padding:13px 18px;flex:1;min-width:0;color:var(--ink-2);font-size:14.5px;line-height:1.9}
.note{margin-top:28px;background:var(--sand-lt);border-left:3px solid var(--sand-dk);
  padding:14px 18px;font-size:13.5px;color:var(--ink-2);line-height:1.85}
.note b{color:var(--lacquer)}
.backhome{text-align:center;margin-top:34px}
.backhome a{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--brick);
  color:var(--brick);padding:9px 32px;font-size:14px;letter-spacing:.16em;text-decoration:none;
  transition:background .2s var(--ease),color .2s var(--ease)}
.backhome a:hover{background:var(--brick);color:#fff}

/* 表格 */
.newstable thead th,.doctable thead th{background:var(--lacquer);color:#fff;font-family:var(--serif);
  font-size:14.5px;font-weight:400;letter-spacing:.14em;padding:13px 16px;text-align:left}
.newstable thead th:nth-child(1),.newstable thead th:nth-child(2){width:130px}
.doctable thead th:nth-child(1){width:184px}
.doctable thead th:nth-child(3){width:216px}
.newstable td,.doctable td{border-bottom:1px solid var(--rule-lt);padding:14px 16px;
  vertical-align:top;font-size:15px}
.newstable tbody tr,.doctable tbody tr{transition:background .16s var(--ease)}
.newstable tbody tr:hover,.doctable tbody tr:hover{background:var(--vermilion-soft)}
.c-cate{color:var(--brick);font-size:13px;white-space:nowrap;letter-spacing:.06em}
.c-date{font-family:var(--mono);color:var(--ink-4);font-size:12.5px;white-space:nowrap}
.newstable a{color:var(--ink);text-decoration:none;line-height:1.75}
.newstable a:hover{color:var(--brick)}
.doctable td a.lawlink{font-size:16px;color:var(--ink-2);text-decoration:none}
.doctable td a.lawlink:hover{color:var(--brick)}
.empty{padding:54px 20px;text-align:center;color:var(--ink-3);font-size:14.5px;line-height:2}
.pager{display:flex;justify-content:center;gap:5px;flex-wrap:wrap;padding:26px 0 0}
.pager a,.pager span{min-width:38px;height:38px;display:flex;align-items:center;justify-content:center;
  border:1px solid var(--rule);background:var(--paper);font-family:var(--mono);font-size:13.5px;
  color:var(--brick);padding:0 11px;text-decoration:none;transition:background .18s var(--ease)}
.pager a:hover{background:var(--sand-lt)}
.pager .cur{background:var(--brick);border-color:var(--brick);color:#fff}
.pager .off{color:var(--ink-4);background:var(--ground)}
.tally{text-align:center;color:var(--ink-3);font-size:13px;margin-top:14px;font-family:var(--mono);
  letter-spacing:.06em}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
.chips a{border:1px solid var(--rule);background:var(--paper);padding:6px 16px;font-size:14px;
  color:var(--ink-2);text-decoration:none;transition:all .18s var(--ease)}
.chips a:hover{border-color:var(--brick);color:var(--brick)}
.chips a[aria-current="true"]{background:var(--brick);border-color:var(--brick);color:#fff}
.dl{display:flex;flex-direction:column;gap:7px}
.dl a{display:inline-flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--ink-3);
  line-height:1.5;text-decoration:none}
.dl a:hover{color:var(--brick)}
.dl svg{width:22px;height:22px;flex:0 0 auto;margin-top:1px;stroke:var(--brick);fill:none;stroke-width:1.4}
.datatable th{background:var(--sand-lt);color:var(--lacquer);font-size:13.5px;letter-spacing:.1em;
  padding:11px 15px;text-align:left;border:1px solid var(--rule);font-weight:700}
.datatable td{border:1px solid var(--rule);padding:11px 15px;font-size:14.5px;color:var(--ink-2);
  vertical-align:top}
.datatable tbody tr:nth-child(even){background:var(--ground)}
.datatable .none{text-align:center;color:var(--ink-4);padding:26px 12px;font-size:13.5px}
.cards3{display:grid;grid-template-columns:repeat(auto-fit,minmax(226px,1fr));gap:16px}
.minicard{border:1px solid var(--rule);border-top:3px solid var(--vermilion);padding:20px 22px;
  background:var(--ground)}
.minicard b{display:block;font-family:var(--serif);font-size:18px;color:var(--brick);
  letter-spacing:.12em;margin-bottom:8px}
.minicard span{font-size:13.5px;color:var(--ink-2);line-height:1.9}
.campusmap{border:1px solid var(--rule);background:var(--paper);margin:6px 0 18px;overflow:hidden}
.campusmap svg{width:100%;height:auto;display:block}
.maphint{font-size:13px;color:var(--ink-3);text-align:center;padding:10px;border-top:1px solid var(--rule-lt)}
.article-hd{border-bottom:2px solid var(--brick);padding-bottom:16px;margin-bottom:22px}
.article-hd h2{font-size:22px;color:var(--lacquer);line-height:1.65;letter-spacing:.06em}
.article-meta{display:flex;gap:18px;flex-wrap:wrap;font-size:13px;color:var(--ink-3);margin-top:12px;
  font-family:var(--mono)}

/* 師資 */
.faculty{display:grid;gap:18px}
.fcard{display:flex;gap:24px;background:var(--paper);border:1px solid var(--rule);
  box-shadow:var(--sh-1);padding:24px 26px;transition:box-shadow .24s var(--ease)}
.fcard:hover{box-shadow:var(--sh-2)}
.fcard .portrait{flex:0 0 110px;height:144px;border:1px solid var(--rule);background:var(--ground);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
  text-decoration:none;transition:border-color .2s var(--ease)}
.fcard .portrait:hover{border-color:var(--brick)}
.fcard .portrait .mono-av{width:62px;height:62px;border:1.5px solid var(--brick);background:var(--sand);
  color:var(--brick);font-family:var(--serif);font-size:28px;display:flex;align-items:center;
  justify-content:center;transition:background .22s var(--ease),color .22s var(--ease)}
.fcard .portrait:hover .mono-av{background:var(--brick);color:#fff;border-color:var(--brick)}
.fcard .portrait .rank{font-size:11.5px;color:var(--ink-3);text-align:center;padding:0 5px;line-height:1.5}
.fcard .info{flex:1;min-width:0}
.fcard .name{font-family:var(--serif);font-size:21px;color:var(--lacquer);letter-spacing:.14em;
  padding-bottom:11px;border-bottom:1px solid var(--rule);margin-bottom:14px}
.fcard .name a{color:var(--lacquer);text-decoration:none}
.fcard .name a:hover{color:var(--brick)}
.fcard .name em{font-style:normal;font-family:var(--sans);font-size:13.5px;color:var(--brick);
  margin-left:12px;letter-spacing:.06em}
.frow{display:flex;gap:14px;margin-bottom:9px;font-size:14px;line-height:1.85}
.frow .k{flex:0 0 90px;color:var(--brick);font-weight:700;font-size:12.5px;letter-spacing:.08em;
  border-right:1px solid var(--rule-lt)}
.frow .v{flex:1;min-width:0;color:var(--ink-2);white-space:pre-line}
.frow .v a{word-break:break-all}
.fmore{display:inline-flex;align-items:center;gap:7px;margin-top:12px;padding-top:11px;
  border-top:1px solid var(--rule-lt);font-size:13px;letter-spacing:.08em;color:var(--ink-3);
  text-decoration:none;width:100%}
.fmore:hover{color:var(--brick)}
.fmore .arw{transition:transform .2s var(--ease)}
.fmore:hover .arw{transform:translateX(4px)}
.profile{display:flex;gap:32px;align-items:flex-start}
.profile .side{flex:0 0 200px}
.profile .photo{border:1px solid var(--rule);background:var(--paper);min-height:216px;padding:26px 16px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
.profile .photo .mono-av{width:96px;height:96px;border:2px solid var(--brick);background:var(--sand);
  color:var(--brick);font-family:var(--serif);font-size:44px;display:flex;align-items:center;
  justify-content:center}
.profile .photo .cap{font-size:12.5px;color:var(--ink-3);letter-spacing:.1em}
.profile .body{flex:1;min-width:0}
.profile .ttl{font-family:var(--serif);font-size:26px;color:var(--lacquer);letter-spacing:.16em;
  border-bottom:2px solid var(--brick);padding-bottom:12px;margin-bottom:18px}
.profile .ttl em{font-style:normal;font-family:var(--sans);font-size:14.5px;color:var(--brick);
  margin-left:14px;letter-spacing:.06em}
.cvtabs{margin-top:32px;border:1px solid var(--rule)}
.cvtabs .tabbar{display:flex;flex-wrap:wrap;background:var(--ground);border-bottom:1px solid var(--rule)}
.cvtabs .tabbar button{appearance:none;border:0;background:transparent;font:inherit;font-size:13.5px;
  color:var(--ink-2);padding:11px 17px;cursor:pointer;border-bottom:2px solid transparent;
  transition:color .18s var(--ease),background .18s var(--ease)}
.cvtabs .tabbar button:hover{color:var(--brick)}
.cvtabs .tabbar button[aria-selected="true"]{background:var(--paper);color:var(--brick);
  font-weight:700;border-bottom-color:var(--brick)}
.cvtabs .tabpane{padding:18px 20px;background:var(--paper)}
.staff{display:grid;gap:18px}
.scard{background:var(--paper);border:1px solid var(--rule);box-shadow:var(--sh-1);padding:26px 30px}
.scard .shd{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;padding-bottom:12px;
  border-bottom:1px solid var(--rule);margin-bottom:16px}
.scard .shd b{font-family:var(--serif);font-size:21px;color:var(--lacquer);letter-spacing:.16em}
.scard .shd em{font-style:normal;font-size:13.5px;color:var(--brick)}
.scard .shd .contact{margin-left:auto;font-size:13px;color:var(--ink-3);font-family:var(--mono)}
.duty{margin-bottom:16px}
.duty > b{display:inline-block;background:var(--sand-lt);color:var(--brick);font-size:12.5px;
  letter-spacing:.14em;padding:3px 13px;margin-bottom:8px}
.duty ol{margin:0;padding-left:1.5em}
.duty li{font-size:14px;color:var(--ink-2);margin-bottom:5px;line-height:1.9}

/* ═══ 頁尾 ═══ */
.foot-sand{background:var(--sand);color:var(--lacquer);border-top:3px solid var(--brick)}
.foot-sand .wrap{padding-top:46px;padding-bottom:34px}
.foot-grid{display:grid;grid-template-columns:1.15fr 1fr;gap:48px}
.foot-brand .zh{font-family:var(--serif);font-size:21px;letter-spacing:.2em;color:var(--lacquer)}
.foot-brand .en{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;color:var(--brick);
  margin-top:7px;text-transform:uppercase}
.foot-brand .mottos{margin-top:18px;font-family:var(--serif);font-size:15px;letter-spacing:.16em;
  color:var(--brick);padding-left:12px;border-left:2px solid var(--brick)}
.foot h4,.foot .foot-h{font-family:var(--serif);font-size:15px;letter-spacing:.18em;color:var(--lacquer);
  padding-bottom:9px;border-bottom:1px solid var(--sand-dk);margin-bottom:12px}
.foot-sand a{color:var(--lacquer);text-decoration:none}
.foot-sand a:hover{color:var(--brick);text-decoration:underline}
.foot .sm{font-size:13.5px;line-height:1.95}
.foot .sm .mono{font-size:13px}
.footmail{display:inline-flex;align-items:center;gap:8px;background:var(--brick);color:#fff !important;
  padding:7px 16px;font-size:13px;font-family:var(--mono);letter-spacing:.02em;margin-top:12px;
  text-decoration:none;transition:background .2s var(--ease)}
.footmail:hover{background:var(--lacquer);color:#fff !important;text-decoration:none}
.footmail svg{width:13px;height:13px;fill:currentColor}
.foot-links{list-style:none;padding:0;margin:0}
.foot-links li{margin-bottom:6px}
.foot-dark{background:var(--lacquer);color:rgba(255,255,255,.62);font-size:12.5px}
.foot-dark .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  padding-top:15px;padding-bottom:15px}
.foot-dark .mono{color:var(--sand)}

/* ═══ 進場動態 ═══ */
.rise{opacity:0;transform:translateY(14px);transition:opacity .62s var(--ease),transform .62s var(--ease)}
.rise.in{opacity:1;transform:none}

/* ═══ 響應式 ═══ */
@media (max-width:1100px){
  .newsgrid{grid-template-columns:repeat(2,1fr)}
  .facegrid{grid-template-columns:repeat(2,1fr)}
  .degrees{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:1014px){
  :root{--gut:20px}
  .brandmark img{width:186px}
  .deptname .zh{font-size:21px;letter-spacing:.18em;text-indent:.18em}

  /* 直排標籤轉橫排 */
  .sec-inner{flex-direction:column;gap:18px}
  .sec-mark{flex:auto;flex-direction:row;align-items:center;gap:12px;position:static;width:100%}
  .sec-mark .rule{width:30px;height:2px;flex:0 0 30px}
  .sec-mark .zh{flex-direction:row;gap:.16em;font-size:21px;height:auto !important}
  .sec-mark .en{writing-mode:horizontal-tb !important;letter-spacing:.18em;height:auto !important}
  .pagebody{flex-direction:column}
  .aside{flex:auto;width:100%;position:static}
  .profile{flex-direction:column}
  .profile .side{flex:auto;width:180px}
  .foot-grid{grid-template-columns:1fr 1fr}
}
@media (max-width:768px){
  .masthead .wrap{flex-wrap:wrap;gap:12px;padding-top:13px;padding-bottom:13px}
  .brandrule{display:none}
  .brandmark img{width:158px}
  .deptname .zh{font-size:19px}
  .deptname .en{font-size:9px;letter-spacing:.1em}
  br.wide{display:none}
  .sec{padding:46px 0}
  .thesis .wrap{padding-top:44px;padding-bottom:44px}
  .newsgrid,.facegrid,.degrees,.qgrid{grid-template-columns:1fr}
  .ph-mark{display:none}
  .pagehead h1{font-size:25px}
  .panel-bd{padding:22px 18px}
  .deflist>div{flex-direction:column}
  .deflist dt{flex:auto}
  .fcard{flex-direction:column;gap:16px;padding:20px}
  .fcard .portrait{flex:auto;width:106px;height:128px}
  .frow{flex-direction:column;gap:2px}
  .frow .k{flex:auto;border-right:0;border-bottom:1px solid var(--rule-lt);padding-bottom:3px}
  .newstable thead,.doctable thead{display:none}
  .newstable tr,.doctable tr{display:block;border-bottom:1px solid var(--rule);padding:12px 3px}
  .newstable td,.doctable td{display:block;border:0;padding:2px 12px}
  .scard{padding:20px}
  .scard .shd .contact{margin-left:0;flex-basis:100%}
  .foot-grid{grid-template-columns:1fr;gap:26px}
  .hero-rail .wrap{min-height:0;padding-top:12px;padding-bottom:12px}
  .hero-title{white-space:normal;flex-basis:100%;order:3}
}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001ms !important;transition-duration:.001ms !important}
  html{scroll-behavior:auto}
  .rise{opacity:1;transform:none}
  .hero-slide img{transform:none}
}
@media print{
  .mainnav,.langsw,.fab,.aside{display:none}
  body{background:#fff}
  .panel{border:0}
}

/* ═══════════════════════════════════════════════════════════
   v6 現代化：論述先行的主視覺、色調弧線、去框線化
   ═══════════════════════════════════════════════════════════ */

/* ── 區段表面：讓整頁形成明→暗→明的色調弧 ── */
.sec--paper{background:var(--paper)}
.sec--ground{background:var(--ground)}
.sec--sand{background:var(--sand-lt)}
.sec--tint{background:linear-gradient(180deg,var(--indigo-soft) 0%,var(--ground) 100%)}
.sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:76px 0}

/* ── 主視覺：論述帶 ── */
.opener{background:var(--lacquer);color:#fff;position:relative;overflow:hidden}
.opener::before{content:"";position:absolute;inset:0;opacity:.5;
  background-image:
    linear-gradient(rgba(219,214,204,.045) 1px,transparent 1px),
    linear-gradient(90deg,rgba(219,214,204,.045) 1px,transparent 1px);
  background-size:52px 52px;background-position:center}
.opener::after{content:"";position:absolute;right:-140px;bottom:-200px;width:520px;height:520px;
  border:1px solid rgba(219,214,204,.13);transform:rotate(45deg);pointer-events:none}
.opener .wrap{position:relative;z-index:2;padding-top:84px;padding-bottom:74px}
.op-eyebrow{display:flex;align-items:center;gap:14px;font-family:var(--mono);font-size:11px;
  letter-spacing:.28em;color:var(--sand);text-transform:uppercase;margin-bottom:30px}
.op-eyebrow .bar{width:34px;height:1px;background:var(--brick-lite)}
.op-claim{font-family:var(--serif);font-weight:700;color:#fff;margin:0;
  font-size:clamp(30px,5.2vw,62px);line-height:1.28;letter-spacing:.055em;
  max-width:17em;word-break:keep-all;line-break:strict}
.op-claim em{font-style:normal;color:var(--gold)}
.op-sub{margin-top:26px;font-size:16px;line-height:2.05;color:rgba(255,255,255,.76);
  max-width:38em;letter-spacing:.03em}
.op-regions{display:flex;align-items:center;gap:0;margin-top:38px;flex-wrap:wrap}
.op-regions span{font-family:var(--serif);font-size:clamp(15px,1.6vw,19px);letter-spacing:.24em;
  color:var(--sand);padding-right:22px}
.op-regions span + span{padding-left:22px;border-left:1px solid rgba(219,214,204,.26)}
.op-cta{display:flex;gap:12px;margin-top:36px;flex-wrap:wrap}
.btn-solid,.btn-ghost{display:inline-flex;align-items:center;gap:9px;padding:10px 22px;
  font-size:13.5px;letter-spacing:.1em;text-decoration:none;
  transition:background .24s var(--ease),color .24s var(--ease),border-color .24s var(--ease)}
.btn-solid{background:var(--gold);color:var(--lacquer);font-weight:700}
.btn-solid:hover{background:#fff;color:var(--lacquer)}
.btn-ghost{border:1px solid rgba(255,255,255,.42);color:#fff}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
.btn-solid .arw,.btn-ghost .arw{transition:transform .22s var(--ease)}
.btn-solid:hover .arw,.btn-ghost:hover .arw{transform:translateX(5px)}
.op-figures{display:flex;gap:52px;margin-top:52px;padding-top:30px;flex-wrap:wrap;
  border-top:1px solid rgba(255,255,255,.16)}
.op-fig .n{font-family:var(--mono);font-size:34px;color:var(--gold);line-height:1;letter-spacing:.01em}
.op-fig .l{font-size:12.5px;color:rgba(255,255,255,.6);letter-spacing:.16em;margin-top:9px}

/* ── 精選橫幅軌 ── */
.featured{background:var(--paper);border-bottom:1px solid var(--rule-lt)}
.featured .wrap{padding-top:0;padding-bottom:0}
.fx{display:flex;gap:0;align-items:stretch;margin-top:-46px;position:relative;z-index:5;
  box-shadow:0 18px 46px rgba(26,20,18,.2)}
.fx-stage{position:relative;flex:1;min-width:0;aspect-ratio:1400/336;max-height:400px;
  overflow:hidden;background:var(--lacquer)}
.fx-slide{position:absolute;inset:0;opacity:0;transition:opacity .7s var(--ease)}
.fx-slide.on{opacity:1}
.fx-slide .fill{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  filter:blur(26px) brightness(.44) saturate(.7);transform:scale(1.14)}
.fx-slide .plate{position:relative;width:100%;height:100%;object-fit:contain;object-position:center}
.fx-side{flex:0 0 268px;background:var(--lacquer);color:#fff;padding:26px 26px 22px;
  display:flex;flex-direction:column}
.fx-kicker{font-family:var(--mono);font-size:10.5px;letter-spacing:.24em;color:var(--gold);
  text-transform:uppercase;margin-bottom:14px}
.fx-title{font-family:var(--serif);font-size:19px;line-height:1.65;letter-spacing:.06em;
  color:#fff;flex:1;word-break:keep-all}
.fx-go{display:inline-flex;align-items:center;gap:9px;font-size:13.5px;letter-spacing:.12em;
  color:var(--gold);text-decoration:none;margin-top:16px}
.fx-go:hover{color:#fff}
.fx-go .arw{transition:transform .22s var(--ease)}
.fx-go:hover .arw{transform:translateX(5px)}
.fx-ctrl{display:flex;align-items:center;gap:12px;margin-top:18px;
  padding-top:16px;border-top:1px solid rgba(255,255,255,.18)}
.fx-count{font-family:var(--mono);font-size:12px;color:rgba(255,255,255,.62);letter-spacing:.08em}
.fx-btns{margin-left:auto;display:flex;gap:7px}
.fx-btns button{width:32px;height:32px;border:1px solid rgba(255,255,255,.3);background:transparent;
  color:#fff;cursor:pointer;font-size:12px;transition:all .2s var(--ease);
  display:flex;align-items:center;justify-content:center}
.fx-btns button:hover{background:var(--gold);border-color:var(--gold);color:var(--lacquer)}
.fx-bar{height:2px;background:rgba(255,255,255,.18);margin-top:14px;position:relative;overflow:hidden}
.fx-bar i{position:absolute;left:0;top:0;bottom:0;background:var(--gold);width:0;
  transition:width .35s var(--ease)}

/* ── 去框線化：卡片以留白與底色分群 ── */
.pillar{background:var(--paper);border:0;padding:38px 36px 34px;box-shadow:var(--sh-1)}
.pillar:hover{transform:translateY(-4px);box-shadow:var(--sh-3)}
.pillar::before{width:3px}
.pillars{gap:24px}

.degrees{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;background:transparent;border:0}
.degree{background:var(--paper);border:0;padding:30px 26px 28px;box-shadow:var(--sh-1);
  border-top:3px solid var(--rule);
  transition:transform .26s var(--ease),box-shadow .26s var(--ease),border-color .26s var(--ease)}
.degree:hover{background:var(--paper);transform:translateY(-4px);box-shadow:var(--sh-3);
  border-top-color:var(--brick)}
.degree .dg{margin-top:2px}
.degree .ds{margin-top:12px}

.ncard{border:0;box-shadow:var(--sh-1);padding:26px 26px 24px}
.ncard:hover{border:0;box-shadow:var(--sh-3)}
.ncard .cate{background:transparent;color:var(--brick);padding:0;font-size:12px;letter-spacing:.12em;
  position:relative;padding-left:13px}
.ncard .cate::before{content:"";position:absolute;left:0;top:50%;width:7px;height:1px;
  background:var(--brick)}

/* 首則消息放大 */
.newsgrid{grid-template-columns:repeat(3,1fr);gap:22px}
.ncard.lead-item{grid-column:span 2;background:var(--lacquer)}
.ncard.lead-item .cate{color:var(--gold)}
.ncard.lead-item .cate::before{background:var(--gold)}
.ncard.lead-item .date{color:rgba(255,255,255,.55)}
.ncard.lead-item .t{color:#fff;font-size:23px;line-height:1.62;-webkit-line-clamp:4}
.ncard.lead-item:hover .t{color:var(--gold)}
.ncard.lead-item .rd{color:rgba(255,255,255,.65)}
.ncard.lead-item:hover .rd{color:var(--gold)}
.ncard.lead-item .pin{background:var(--gold);color:var(--lacquer)}

.face{border:0;box-shadow:var(--sh-1);padding:26px 20px 24px}
.face:hover{box-shadow:var(--sh-3)}
.qtile{border:0;box-shadow:var(--sh-1)}
.qtile:hover{box-shadow:var(--sh-3)}
.minicard{border:0;border-top:3px solid var(--vermilion);background:var(--paper);box-shadow:var(--sh-1)}
.panel{border:0;box-shadow:var(--sh-2)}
.fcard{border:0;box-shadow:var(--sh-1)}
.scard{border:0;box-shadow:var(--sh-1)}

/* ── 內頁：本頁目次 ── */
.toc{margin-top:26px;padding-top:20px;border-top:1px solid var(--rule)}
.toc .ahd{font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;color:var(--ink-3);
  text-transform:uppercase;margin-bottom:10px}
.toc ul{list-style:none;margin:0;padding:0}
.toc a{display:block;padding:6px 0 6px 13px;font-size:13.5px;color:var(--ink-3);
  text-decoration:none;border-left:2px solid var(--rule-lt);
  transition:color .18s var(--ease),border-color .18s var(--ease)}
.toc a:hover{color:var(--brick);border-left-color:var(--sand-dk)}
.toc a.cur{color:var(--brick);border-left-color:var(--brick);font-weight:700}

/* ── 路由轉場 ── */
#main{animation:pageIn .42s var(--ease) both}
@keyframes pageIn{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}

/* ── 進場交錯 ── */
.stag > *{opacity:0;transform:translateY(16px)}
.stag.in > *{opacity:1;transform:none;
  transition:opacity .6s var(--ease),transform .6s var(--ease)}
.stag.in > *:nth-child(1){transition-delay:.02s}
.stag.in > *:nth-child(2){transition-delay:.09s}
.stag.in > *:nth-child(3){transition-delay:.16s}
.stag.in > *:nth-child(4){transition-delay:.23s}
.stag.in > *:nth-child(5){transition-delay:.30s}
.stag.in > *:nth-child(6){transition-delay:.37s}
.stag.in > *:nth-child(7){transition-delay:.44s}
.stag.in > *:nth-child(8){transition-delay:.51s}

@media (max-width:1100px){
  .fx{flex-direction:column;margin-top:-34px}
  .fx-side{flex:auto}
  .newsgrid{grid-template-columns:repeat(2,1fr)}
  .ncard.lead-item{grid-column:span 2}
}
@media (max-width:1014px){
  .op-seal{display:none}
  .opener .wrap{padding-top:56px;padding-bottom:52px}
  .sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:56px 0}
  .degrees{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:768px){
  .op-claim{word-break:normal;font-size:clamp(25px,6.6vw,32px);max-width:none}
  .op-sub{font-size:15px}
  h1,h2,h3,h4{word-break:normal}
  .thesis-claim,.fx-title{word-break:normal}
  .sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:44px 0}
  .opener .wrap{padding-top:42px;padding-bottom:42px}
  .op-figures{gap:30px}
  .op-regions span{padding-right:14px}
  .op-regions span + span{padding-left:14px}
  .degrees,.newsgrid{grid-template-columns:1fr}
  .ncard.lead-item{grid-column:span 1}
  .ncard.lead-item .t{font-size:19px}
  .fx{margin-top:-22px}
  .btn-solid,.btn-ghost{padding:9px 18px;font-size:12.5px}
}
@media (prefers-reduced-motion:reduce){
  #main{animation:none}
  .stag > *{opacity:1;transform:none}
}


/* ═══════════════════════════════════════════════════════════
   系級中心、地圖、交通、歷屆系主任
   ═══════════════════════════════════════════════════════════ */
.chron{list-style:none;margin:0 0 8px;padding:0;counter-reset:c;
  display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule-lt);
  border:1px solid var(--rule-lt)}
.chron li{counter-increment:c;background:var(--paper);padding:12px 16px;font-size:14.5px;
  color:var(--ink-2);display:flex;align-items:baseline;gap:10px}
.chron li::before{content:counter(c,decimal-leading-zero);font-family:var(--mono);font-size:11px;
  color:var(--ink-4);flex:0 0 auto}
.chron li b{color:var(--brick);font-weight:700}
.chron li em{font-style:normal;font-family:var(--mono);font-size:10px;letter-spacing:.14em;
  background:var(--brick);color:#fff;padding:2px 7px;margin-left:auto}

.centres{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:22px 0 8px}
.centre{background:var(--paper);box-shadow:var(--sh-1);display:flex;flex-direction:column;
  border-top:3px solid var(--brick);
  transition:transform .26s var(--ease),box-shadow .26s var(--ease)}
.centre:hover{transform:translateY(-4px);box-shadow:var(--sh-3)}
.centre-plate{height:132px;background:var(--sand-lt);display:flex;align-items:center;
  justify-content:center;padding:16px;border-bottom:1px solid var(--rule-lt)}
.centre-plate img{max-height:100%;max-width:100%;width:auto;object-fit:contain}
.centre-body{padding:22px 22px 18px;display:flex;flex-direction:column;flex:1}
.centre-yr{font-size:10.5px;letter-spacing:.2em;color:var(--ink-4)}
.centre h3{font-size:20px;color:var(--brick);letter-spacing:.12em;margin:7px 0 5px;
  padding:0;border:0}
.centre-en{font-size:11px;color:var(--ink-4);line-height:1.5;letter-spacing:.02em;
  margin-bottom:14px}
.centre-lab{font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--ink-3);
  text-transform:uppercase;padding-bottom:6px;border-bottom:1px solid var(--rule-lt);margin-bottom:10px}
.centre-focus{margin:0 0 16px;padding-left:1.2em;flex:1}
.centre-focus li{font-size:13.5px;line-height:1.85;color:var(--ink-2);margin-bottom:5px}
.centre-foot{border-top:1px solid var(--rule-lt);padding-top:13px;display:flex;
  flex-direction:column;gap:9px}
.centre-dir{display:flex;flex-direction:column;gap:3px;text-decoration:none}
.centre-dir .k{font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--ink-4)}
.centre-dir .v{font-family:var(--serif);font-size:16px;color:var(--lacquer);letter-spacing:.08em}
.centre-dir:hover .v{color:var(--brick)}
.centre-dir i{font-style:normal;transition:transform .2s var(--ease);display:inline-block}
.centre-dir:hover i{transform:translateX(4px)}
.centre-site{font-size:12.5px;letter-spacing:.06em;color:var(--ink-3);text-decoration:none;
  word-break:break-all}
.centre-site:hover{color:var(--brick)}

.maps{display:grid;grid-template-columns:1fr;gap:20px;margin:6px 0 4px}
.mapfig{margin:0;background:var(--paper);box-shadow:var(--sh-1);overflow:hidden}
.mapfig>a{display:block;line-height:0}
.mapfig img{width:100%;height:auto;display:block;transition:transform .5s var(--ease)}
.mapfig>a:hover img{transform:scale(1.02)}
.mapfig figcaption{font-size:13px;color:var(--ink-3);padding:12px 16px;line-height:1.7;
  border-top:1px solid var(--rule-lt);letter-spacing:.03em;
  display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.mapfig figcaption a{margin-left:auto;white-space:nowrap}
.mapfig figcaption b{color:var(--brick)}

.transit{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:6px}
.tmode{background:var(--ground);padding:20px 22px;border-left:3px solid var(--brick)}
.thd{display:flex;align-items:center;gap:11px;font-family:var(--serif);font-size:18px;
  color:var(--lacquer);letter-spacing:.16em;margin-bottom:14px}
.tico{width:32px;height:32px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;
  background:var(--brick);border-radius:50%}
.tico svg{width:18px;height:18px;stroke:#fff;fill:none;stroke-width:1.5;
  stroke-linecap:round;stroke-linejoin:round}
.tmode .deflist{border-top:0}
.tmode .deflist>div:last-child{border-bottom:0}
.tmode .deflist dt{flex:0 0 104px;background:transparent;padding-left:0;font-size:13.5px}
.tmode .deflist dd{font-size:13.5px;padding-right:0}
.tmode .deflist dd b{color:var(--brick)}
.tnote{font-size:13.5px;color:var(--ink-2);margin-bottom:12px}
.routes{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:7px}
.routes li{font-family:var(--mono);font-size:13px;background:var(--paper);color:var(--brick);
  border:1px solid var(--rule);padding:4px 12px;letter-spacing:.02em}
.routes li:last-child{font-family:var(--sans);letter-spacing:.08em}

@media (max-width:1014px){
  .centres{grid-template-columns:1fr 1fr}
  .chron{grid-template-columns:1fr 1fr}
}
@media (max-width:768px){
  .centres,.transit{grid-template-columns:1fr}
  .chron{grid-template-columns:1fr}
  .tmode .deflist>div{flex-direction:row}
  .tmode .deflist dt{flex:0 0 92px}
}


/* ═══════════════════════════════════════════════════════════
   一頁式：捲動定位、長文排版、分頁籤、消息列、更多資訊
   ═══════════════════════════════════════════════════════════ */
section[id]{scroll-margin-top:52px}
#top{scroll-margin-top:0}

/* 長文區塊 */
.prose h3{font-family:var(--serif);font-size:20px;color:var(--brick);letter-spacing:.12em;
  margin:34px 0 14px;padding-left:13px;border-left:3px solid var(--vermilion)}
.prose h3:first-child{margin-top:0}
.prose h4{font-family:var(--sans);font-size:15.5px;color:var(--ink);margin:20px 0 8px;
  letter-spacing:.06em;font-weight:700}
.prose p{color:var(--ink-2);text-align:justify;line-height:2;margin-bottom:1.15em}
.prose>p,.prose>h4,.prose>ul,.prose>ol:not(.chron){max-width:44em}
.prose>ol:not(.chron) li,.prose>ul li{max-width:none}
.prose li{color:var(--ink-2);margin-bottom:6px;line-height:1.95}
.prose ol,.prose ul{margin-bottom:1.15em}
.prose .lead{font-family:var(--serif);font-size:18px;color:var(--lacquer);background:var(--sand-lt);
  border-left:3px solid var(--brick);padding:16px 22px;letter-spacing:.06em;line-height:1.95;
  margin-bottom:24px}

/* 學制卡（靜態，非連結） */
.deg-static{background:var(--paper);border:0;padding:26px 24px 24px;box-shadow:var(--sh-1);
  border-top:3px solid var(--rule);display:block}
.deg-static h3{font-family:var(--serif);font-size:20px;color:var(--ink);letter-spacing:.14em;
  margin:8px 0 6px;padding:0;border:0}

/* 分頁籤 */
.cvtabs.adm,.cvtabs.fac{margin-top:26px;border:0;background:transparent}
.cvtabs.adm .tabbar,.cvtabs.fac .tabbar{background:transparent;border-bottom:2px solid var(--rule);
  gap:4px;flex-wrap:wrap}
.cvtabs.adm .tabbar button,.cvtabs.fac .tabbar button{border:0;background:transparent;
  font-family:var(--serif);font-size:16px;letter-spacing:.1em;color:var(--ink-3);
  padding:11px 20px;border-bottom:3px solid transparent;margin-bottom:-2px;
  display:flex;align-items:center;gap:8px}
.cvtabs.adm .tabbar button:hover,.cvtabs.fac .tabbar button:hover{color:var(--brick)}
.cvtabs.adm .tabbar button[aria-selected="true"],
.cvtabs.fac .tabbar button[aria-selected="true"]{color:var(--brick);font-weight:700;
  border-bottom-color:var(--brick)}
.tabbar .cnt{font-size:11px;color:var(--ink-4);background:var(--sand-lt);padding:1px 7px}
.tabbar button[aria-selected="true"] .cnt{background:var(--brick);color:#fff}
.cvtabs.adm .tabpane,.cvtabs.fac .tabpane{padding:26px 0 0;background:transparent}

/* 師資：授課領域收合 */
.fteach{margin-top:12px;border-top:1px solid var(--rule-lt);padding-top:11px}
.fteach summary{font-size:13px;letter-spacing:.08em;color:var(--ink-3);cursor:pointer;
  list-style:none;display:flex;align-items:center;gap:8px}
.fteach summary::-webkit-details-marker{display:none}
.fteach summary::before{content:"＋";font-family:var(--mono);color:var(--brick);font-size:12px}
.fteach[open] summary::before{content:"−"}
.fteach summary:hover{color:var(--brick)}
.fteach>div{font-size:13.5px;line-height:1.9;color:var(--ink-2);white-space:pre-line;
  padding-top:10px}
.faculty{display:grid;grid-template-columns:1fr 1fr;gap:18px}

/* 消息：次要列表 */
.newsrest{margin-top:16px;border-top:1px solid var(--rule)}
.nrow{display:flex;align-items:baseline;gap:16px;padding:14px 4px;text-decoration:none;
  border-bottom:1px solid var(--rule-lt);transition:background .18s var(--ease)}
.nrow:hover{background:var(--vermilion-soft)}
.nrow .date{flex:0 0 92px;font-size:12.5px;color:var(--ink-4)}
.nrow .cate{flex:0 0 86px;font-size:12.5px;color:var(--brick);letter-spacing:.06em}
.nrow .t{flex:1;min-width:0;font-size:15px;color:var(--ink);line-height:1.7}
.nrow:hover .t{color:var(--brick)}

/* 更多資訊 */
.qhd{margin-bottom:24px}
.qhd h2{font-size:24px;color:var(--lacquer);letter-spacing:.2em;margin-bottom:8px}
.qhd p{font-size:14.5px;color:var(--ink-2);margin:0}
.qgrid2{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.qlink{display:flex;align-items:center;justify-content:space-between;gap:10px;
  background:var(--paper);box-shadow:var(--sh-1);padding:16px 18px;text-decoration:none;
  font-size:14.5px;color:var(--ink);letter-spacing:.06em;
  border-left:3px solid var(--sand-dk);
  transition:transform .22s var(--ease),box-shadow .22s var(--ease),border-color .22s var(--ease)}
.qlink:hover{transform:translateY(-3px);box-shadow:var(--sh-2);color:var(--brick);
  border-left-color:var(--brick)}
.qlink i{font-style:normal;font-size:12px;color:var(--ink-4)}
.qlink:hover i{color:var(--brick)}

.tablewrap{overflow-x:auto}
.muted{color:var(--ink-4)}

.srcline{margin-top:10px;font-size:13.5px;text-align:center}
.srcline a{color:var(--ink-3);border-bottom:1px solid var(--rule);padding-bottom:2px}
.srcline a:hover{color:var(--brick);border-bottom-color:var(--brick)}
@media (max-width:1100px){ .qgrid2{grid-template-columns:repeat(3,1fr)} }
@media (max-width:1014px){
  section[id]{scroll-margin-top:12px}
  .faculty{grid-template-columns:1fr}
}
@media (max-width:768px){
  .qgrid2{grid-template-columns:1fr 1fr}
  .nrow{flex-wrap:wrap;gap:6px 14px}
  .nrow .t{flex-basis:100%}
  .cvtabs.adm .tabbar button,.cvtabs.fac .tabbar button{font-size:14.5px;padding:9px 13px}
}


/* ═══════════════════════════════════════════════════════════
   v8：區段序號、閱讀進度、理念帶、細節收斂
   ═══════════════════════════════════════════════════════════ */

/* 閱讀進度 */
.readtrack{height:2px;background:rgba(0,0,0,.18);position:relative;overflow:hidden}
.readtrack i{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--gold);
  transition:width .08s linear}

/* 區段序號 */
.sec-mark .num{font-size:11px;letter-spacing:.14em;color:var(--ink-4);line-height:1;
  padding-bottom:2px}
.sec-mark.indigo .num{color:var(--indigo)}

/* 理念帶 */
.band{background:var(--lacquer);color:#fff;position:relative;overflow:hidden;
  padding:74px 0}
.band::before{content:"";position:absolute;inset:0;opacity:.5;
  background-image:
    linear-gradient(rgba(219,214,204,.045) 1px,transparent 1px),
    linear-gradient(90deg,rgba(219,214,204,.045) 1px,transparent 1px);
  background-size:52px 52px}
.band::after{content:"";position:absolute;left:-120px;top:-160px;width:420px;height:420px;
  border:1px solid rgba(219,214,204,.12);transform:rotate(45deg)}
.band .wrap{position:relative;z-index:2;text-align:center}
.band-motto{display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;
  margin-bottom:26px}
.band-motto span{font-family:var(--serif);font-size:clamp(26px,4.2vw,44px);font-weight:700;
  letter-spacing:.3em;text-indent:.3em;color:var(--gold);padding:0 26px}
.band-motto span+span{border-left:1px solid rgba(219,214,204,.3)}
.band-text{font-size:16.5px;line-height:2.1;color:rgba(255,255,255,.8);max-width:40em;
  margin:0 auto 18px;letter-spacing:.04em}
.band-src{font-size:11px;letter-spacing:.2em;color:var(--sand);opacity:.75;margin:0}

/* 快捷替代表面 */
.quick.alt{background:var(--paper);border-top:1px solid var(--rule)}

/* 師資卡精修 */
.fcard{padding:24px 26px;transition:box-shadow .26s var(--ease),transform .26s var(--ease)}
.fcard:hover{transform:translateY(-2px);box-shadow:var(--sh-2)}
.fcard .portrait{background:var(--paper);border-color:var(--rule)}
.fcard .name{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}

/* 焦點環統一 */
a:focus-visible,button:focus-visible,summary:focus-visible,[tabindex]:focus-visible{
  outline:2px solid var(--vermilion);outline-offset:3px}
.opener a:focus-visible,.band a:focus-visible,.fx-side a:focus-visible,
.fx-btns button:focus-visible,.menu a:focus-visible{outline-color:var(--gold)}

/* 區段之間的細線，避免同色相鄰時界線消失 */
.sec--paper + .sec--paper{border-top:1px solid var(--rule-lt)}

@media (max-width:768px){
  .band{padding:52px 0}
  .band-motto span{padding:0 14px;letter-spacing:.22em;text-indent:.22em}
  .band-text{font-size:15px}
}


/* ═══ 招生區塊 ═══ */
.adm-head{padding-bottom:14px;border-bottom:1px solid var(--rule);margin-bottom:18px}
.adm-dg{font-size:13px;letter-spacing:.08em;color:var(--brick)}
.adm-intro{font-size:15px;line-height:2.05;color:var(--ink-2);text-align:justify;
  max-width:44em;margin-bottom:22px}
.adm-lab{font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;color:var(--ink-3);
  text-transform:uppercase;padding-bottom:7px;border-bottom:1px solid var(--rule-lt);
  margin:24px 0 13px}
.adm-ways,.adm-fields{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.adm-ways li{font-size:13.5px;color:var(--ink-2);background:var(--paper);
  border:1px solid var(--rule);padding:6px 15px}
.adm-fields li{font-size:13.5px;color:var(--indigo);background:var(--indigo-soft);
  padding:6px 15px;letter-spacing:.04em}
.adm-note{margin:20px 0 0;background:var(--vermilion-soft);border-left:3px solid var(--brick);
  padding:14px 18px;font-size:13.5px;line-height:1.9;color:var(--ink-2)}
.adm-note b{color:var(--brick);margin-right:9px}
.adm-links{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
.adm-links a{display:flex;align-items:center;justify-content:space-between;gap:10px;
  background:var(--paper);box-shadow:var(--sh-1);padding:12px 16px;font-size:13.5px;
  color:var(--ink);text-decoration:none;border-left:3px solid var(--sand-dk);
  transition:transform .2s var(--ease),box-shadow .2s var(--ease),border-color .2s var(--ease)}
.adm-links a:hover{transform:translateY(-2px);box-shadow:var(--sh-2);color:var(--brick);
  border-left-color:var(--brick)}
.adm-links i{font-style:normal;font-size:11px;color:var(--ink-4)}
.adm-links a:hover i{color:var(--brick)}

@media (max-width:768px){
  .adm-links{grid-template-columns:1fr}
}


/* 學制卡兼作分頁籤 */
.degrees[role="tablist"]{gap:16px}
.deg-card{appearance:none;font:inherit;text-align:left;cursor:pointer;width:100%;
  background:var(--paper);border:0;border-top:3px solid var(--rule);box-shadow:var(--sh-1);
  padding:26px 24px 22px;display:flex;flex-direction:column;gap:0;
  transition:transform .24s var(--ease),box-shadow .24s var(--ease),border-color .24s var(--ease)}
.deg-card .lv{font-family:var(--mono);font-size:11px;letter-spacing:.18em;color:var(--ink-4)}
.deg-card .dt{font-family:var(--serif);font-size:21px;color:var(--ink);letter-spacing:.14em;
  margin:9px 0 7px;font-weight:700}
.deg-card .dg{font-size:12.5px;color:var(--brick);letter-spacing:.04em}
.deg-card .ds{font-size:13px;color:var(--ink-3);line-height:1.8;margin-top:11px;flex:1}
.deg-card .pick{font-size:12px;letter-spacing:.1em;color:var(--ink-4);margin-top:14px;
  padding-top:11px;border-top:1px solid var(--rule-lt);transition:color .2s var(--ease)}
.deg-card:hover{transform:translateY(-4px);box-shadow:var(--sh-3);border-top-color:var(--brick)}
.deg-card:hover .dt,.deg-card:hover .pick{color:var(--brick)}
.deg-card[aria-selected="true"]{border-top-color:var(--brick);box-shadow:var(--sh-3);
  background:var(--paper);position:relative}
.deg-card[aria-selected="true"] .dt{color:var(--brick)}
.deg-card[aria-selected="true"] .pick{color:var(--brick);font-weight:700}
.deg-card[aria-selected="true"]::after{content:"";position:absolute;left:50%;bottom:-16px;
  transform:translateX(-50%);border:8px solid transparent;border-top-color:var(--paper)}
.admbox{margin-top:16px;background:var(--paper);box-shadow:var(--sh-1);padding:34px 36px}
.admbox .tabpane{padding:0;background:transparent}

@media (max-width:768px){
  .deg-card[aria-selected="true"]::after{display:none}
  .admbox{padding:24px 20px}
}


/* ═══════════════════════════════════════════════════════════
   成員圖記：校徽浮水印襯底 ＋ 姓氏字，不使用虛構人像
   ═══════════════════════════════════════════════════════════ */
.mono-av{background-color:var(--sand);background-repeat:no-repeat;
  background-position:center;background-size:76%}
.fcard .portrait{flex:0 0 96px;height:auto;min-height:132px;gap:10px;padding:16px 8px;
  background:var(--ground);border:1px solid var(--rule-lt)}
.fcard .portrait .mono-av{width:56px;height:56px;border:1.5px solid var(--brick);
  font-size:26px;background-size:78%}
.fcard .portrait .rank{font-size:11px;color:var(--ink-3);letter-spacing:.02em}
.fcard{gap:20px;align-items:flex-start}
.fcard .name{font-size:20px}
.fcard .name .rk{font-family:var(--sans);font-size:12px;color:#fff;background:var(--brick);
  padding:2px 9px;letter-spacing:.06em;font-weight:400;align-self:center}
.fcard .name .rk.emeritus{background:var(--ink-3)}
.fcard .name .rk.adjunct{background:var(--indigo)}

/* 成員區：改為三欄以縮短捲動距離 */
.faculty{grid-template-columns:repeat(2,1fr);gap:16px}
@media (min-width:1240px){ .faculty{grid-template-columns:repeat(2,1fr)} }


/* 行政人員圖記 */
.scard .shd{align-items:center;gap:14px}
.mono-av.sm{flex:0 0 44px;width:44px;height:44px;border:1.5px solid var(--brick);
  color:var(--brick);font-family:var(--serif);font-size:21px;display:flex;
  align-items:center;justify-content:center;background-size:80%}
.frow .v{white-space:pre-line}

/* 成員卡：圖記獨立，不再包一層空框 */
.fcard{gap:22px;align-items:flex-start;padding:22px 24px}
.fcard>.mono-av{flex:0 0 58px;width:58px;height:58px;border:1.5px solid var(--brick);
  color:var(--brick);font-family:var(--serif);font-size:27px;display:flex;
  align-items:center;justify-content:center;background-size:80%;
  transition:background-color .24s var(--ease),color .24s var(--ease)}
.fcard:hover>.mono-av{background-color:var(--brick);color:#fff}
.fcard .name .rk.joint{background:var(--indigo)}
.fcard .name .rk.adjunct{background:var(--indigo)}
.fcard .name .rk.emeritus{background:var(--ink-3)}


/* ═══════════════════════════════════════════════════════════
   外部連結按鍵　＋　漢字斷句優化
   ═══════════════════════════════════════════════════════════ */
.extwrap{margin-top:28px;padding-top:22px;border-top:1px solid var(--rule)}
.extnote{font-size:13.5px;line-height:1.9;color:var(--ink-3);margin:0 0 14px;max-width:40em}
.extbtn{display:inline-flex;align-items:center;gap:14px;background:var(--brick);color:#fff;
  padding:14px 30px;font-size:15px;letter-spacing:.1em;text-decoration:none;
  transition:background .22s var(--ease),transform .22s var(--ease),box-shadow .22s var(--ease)}
.extbtn:hover{background:var(--lacquer);color:#fff;transform:translateY(-2px);box-shadow:var(--sh-2)}
.extbtn i{font-style:normal;font-size:13px;opacity:.85}

.extgrid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.extcard{display:flex;flex-direction:column;background:var(--paper);box-shadow:var(--sh-1);
  padding:32px 30px 26px;text-decoration:none;border-top:3px solid var(--brick);
  transition:transform .26s var(--ease),box-shadow .26s var(--ease)}
.extcard:hover{transform:translateY(-4px);box-shadow:var(--sh-3)}
.ec-en{font-size:10.5px;letter-spacing:.2em;color:var(--ink-4);text-transform:uppercase}
.ec-zh{font-family:var(--serif);font-size:23px;color:var(--ink);letter-spacing:.16em;margin:9px 0 10px}
.extcard:hover .ec-zh{color:var(--brick)}
.ec-d{font-size:14px;line-height:1.95;color:var(--ink-2);flex:1;margin-bottom:18px}
.ec-go{display:inline-flex;align-items:center;gap:9px;font-size:13.5px;letter-spacing:.1em;
  color:var(--brick);padding-top:14px;border-top:1px solid var(--rule-lt)}
.ec-go i{font-style:normal;font-size:11px;transition:transform .2s var(--ease)}
.extcard:hover .ec-go i{transform:translate(3px,-3px)}

.chron-note{font-size:13px;line-height:1.9;color:var(--ink-3);margin-top:12px;
  padding-left:13px;border-left:2px solid var(--rule)}

/* ── 漢字斷句：標題求平衡，內文避免孤字 ── */
h1,h2,h3,h4,.op-claim,.sec-lead,.band-text,.ec-zh,.adm-dg,.qhd h2{
  text-wrap:balance}
p,li,dd,.adm-intro,.extnote,.ec-d,.centre-focus li,.prose p{
  text-wrap:pretty}
/* 禁則：標點不落行首、不落行尾 */
body{line-break:strict;overflow-wrap:break-word}
.prose p,.adm-intro,.op-sub,.band-text,.sec-lead,.ec-d,.extnote{
  hanging-punctuation:allow-end}
/* 半形數字與拉丁字母兩側自動留白，避免與漢字擠在一起 */
.mono{font-feature-settings:"tnum" 1}

@media (max-width:768px){
  .extgrid{grid-template-columns:1fr}
  .extbtn{width:100%;justify-content:space-between;padding:14px 22px}
}


/* ═══════════════════════════════════════════════════════════
   v9：版面節奏收斂、漢字細節排版、收尾區塊統一
   ═══════════════════════════════════════════════════════════ */

/* ── 垂直節奏：以 8px 為基準的階梯，取代散落的任意值 ── */
.sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:88px 0}
.sec-lead{margin-bottom:40px;font-size:19.5px;line-height:2;max-width:40em}
.prose h3{margin:40px 0 16px}
.prose h3:first-child{margin-top:0}
.prose h4{margin:24px 0 10px}
.prose>p:last-child,.prose>div:last-child,.prose>ol:last-child{margin-bottom:0}

/* ── 收尾區塊與其他區段對齊，不再自成一格 ── */
.quick.alt{background:var(--ground);border-top:1px solid var(--rule)}
.quick.alt .wrap{padding-top:88px;padding-bottom:88px}
.qhd{margin-bottom:32px;display:flex;align-items:baseline;gap:22px;flex-wrap:wrap}
.qhd h2{font-size:26px;color:var(--ink);letter-spacing:.2em;margin:0;
  padding-left:14px;border-left:3px solid var(--brick)}
.qhd p{font-size:14.5px;color:var(--ink-3);margin:0;flex:1;min-width:16em}

/* ── 漢字細節：括號與標點的視覺留白 ── */
.prose p,.adm-intro,.op-sub,.band-text,.sec-lead,.centre-focus li,.duty li,
.deflist dd,.minicard span,.ec-d,.extnote,.chron-note{
  text-spacing-trim:trim-start}
/* 中西文混排時，數字與拉丁字母兩側補氣口 */
.mono{margin:0 .08em}
.sec-lead .mono,.prose .mono{margin:0 .12em}

/* ── 卡片內距統一 ── */
.pillar{padding:36px 34px 32px}
.centre-body{padding:24px 24px 20px}
.admbox{padding:36px 38px}
.fcard{padding:24px 26px}
.scard{padding:26px 30px}
.extcard{padding:34px 32px 28px}

/* ── 區段標籤與內容的基線對齊 ── */
.sec-mark{top:78px;gap:16px}
.sec-mark .num{margin-bottom:-4px}

/* ── 定義列：欄寬隨內容收斂，避免窄欄留白過多 ── */
.deflist dt{flex:0 0 148px}
.tmode .deflist dt{flex:0 0 110px}

/* ── 統計卡：數字與說明的層級更明確 ── */
.minicard{padding:22px 24px}
.minicard b{font-size:22px;letter-spacing:.08em;margin-bottom:6px}
.minicard span{font-size:13px;color:var(--ink-3)}

/* ── 歷任名單：現任列強調 ── */
.chron li{padding:13px 16px}
.chron li:has(b){background:var(--vermilion-soft)}

/* ── 頁尾：兩欄改為左右對齊的資訊帶 ── */
.foot-sand .wrap{padding-top:56px;padding-bottom:40px}
.foot-grid{grid-template-columns:1.3fr 1fr;gap:56px;align-items:start}
.foot-brand .zh{font-size:22px}
.foot-brand .mottos{margin-top:20px}

@media (max-width:1014px){
  .sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:64px 0}
  .quick.alt .wrap{padding-top:64px;padding-bottom:64px}
}
@media (max-width:768px){
  .sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:48px 0}
  .quick.alt .wrap{padding-top:48px;padding-bottom:48px}
  .sec-lead{font-size:17px;margin-bottom:28px}
  .qhd{flex-direction:column;gap:10px}
  .qhd h2{font-size:22px}
  .pillar,.admbox,.extcard{padding:26px 22px}
  .deflist dt{flex:auto}
}


/* 紙白區段上的白卡會隱形，改以淺地襯底 */
.sec--paper .minicard{background:var(--ground)}
.sec--paper .cards3{gap:14px}
.minicard{border-top-width:2px}

/* 歷任名單：現任列橫跨整列，避免尾列出現空格 */
.chron li:last-child{grid-column:1 / -1}
.chron li:has(b){background:var(--vermilion-soft)}
.chron li em{margin-left:auto}

/* 紙白區段上的定義列需要底色分隔 */
.sec--paper .deflist dt{background:var(--ground)}


/* ═══════════════════════════════════════════════════════════
   v9 修正：重申響應式規則
   後段的無條件規則會蓋掉前段媒體查詢（同權重、後者勝），
   以下集中在樣式表末端重申，確保窄螢幕行為正確。
   ═══════════════════════════════════════════════════════════ */
@media (max-width:1014px){
  .degrees[role="tablist"]{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:1014px){
  .degrees,.degrees[role="tablist"]{grid-template-columns:repeat(2,1fr)}
  .foot-grid{grid-template-columns:1fr 1fr;gap:36px}
  .tmode .deflist dt{flex:0 0 104px}
}
@media (max-width:768px){
  .degrees,.degrees[role="tablist"]{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr;gap:28px}
  .fcard{flex-direction:column;gap:16px;padding:20px}
  .fcard>.mono-av{flex:0 0 52px;width:52px;height:52px;font-size:24px}
  .scard{padding:20px}
  .admbox{padding:24px 20px}
  .tmode .deflist dt{flex:0 0 92px}
  .sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:48px 0}
  .extcard{padding:26px 22px}
  .centres,.transit{grid-template-columns:1fr}
  .chron{grid-template-columns:1fr}
  .chron li:last-child{grid-column:auto}
  .faculty{grid-template-columns:1fr}
}
@media (max-width:420px){
  :root{--gut:16px}
  .foot .sm{word-break:break-word}
  .footmail{font-size:12px;padding:7px 12px}
  .op-fig .n{font-size:28px}
  .op-figures{gap:22px}
}

/* 分頁籤計數在砂色底上僅 3.72:1，改用較深字色 */
.tabbar .cnt{color:var(--ink-2)}
.tabbar button[aria-selected="true"] .cnt{color:#fff}


/* ═══ 語言切換：單一控制項 ═══ */
.masthead .wrap{position:relative}
.langsw{position:relative;margin-left:auto;flex:0 0 auto}
.lang-btn{display:inline-flex;align-items:center;gap:9px;appearance:none;
  border:1px solid rgba(255,255,255,.34);background:transparent;font:inherit;font-size:13px;
  font-family:var(--mono);letter-spacing:.08em;color:rgba(255,255,255,.86);
  padding:7px 13px;cursor:pointer;white-space:nowrap;min-width:104px;justify-content:space-between;
  transition:background .2s var(--ease),border-color .2s var(--ease),color .2s var(--ease)}
.lang-btn:hover{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.55)}
.lang-btn[aria-expanded="true"]{background:var(--gold);color:var(--lacquer);border-color:var(--gold)}
.lang-caret{width:10px;height:6px;fill:none;stroke:currentColor;stroke-width:1.6;
  stroke-linecap:round;stroke-linejoin:round;transition:transform .22s var(--ease);flex:0 0 auto}
.lang-btn[aria-expanded="true"] .lang-caret{transform:rotate(180deg)}
.lang-list{position:absolute;top:calc(100% + 6px);right:0;z-index:200;margin:0;padding:5px 0;
  min-width:158px;list-style:none;background:var(--paper);box-shadow:var(--sh-3);
  border-top:2px solid var(--gold)}
.lang-list li{padding:9px 18px;font-size:14px;color:var(--ink-2);cursor:pointer;
  display:flex;align-items:center;gap:10px;transition:background .16s var(--ease),color .16s var(--ease)}
.lang-list li::before{content:"";width:5px;height:5px;background:transparent;flex:0 0 auto}
.lang-list li:hover,.lang-list li.focus{background:var(--vermilion-soft);color:var(--brick)}
.lang-list li[aria-selected="true"]{color:var(--brick);font-weight:700}
.lang-list li[aria-selected="true"]::before{background:var(--brick)}
.lang-btn:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.lang-list li:focus-visible{outline:2px solid var(--vermilion);outline-offset:-2px}


/* 英文版：成員卡附漢字姓名 */
.zhn{font-family:var(--serif);font-size:13px;color:var(--ink-3);letter-spacing:.08em;
  font-weight:400;margin-left:2px}
.scard .shd b .zhn{font-size:13px}
.sec-mark .zh.lat{writing-mode:vertical-rl;font-feature-settings:normal;display:block;
  font-family:var(--serif);font-size:17px;font-weight:700;letter-spacing:.1em;
  color:var(--ink);white-space:nowrap;line-height:1;flex:0 0 auto;margin:0}
html[lang="en"] .band-motto span{letter-spacing:.14em;text-indent:.14em}
html[lang="en"] .deptname .zh{font-size:20px;letter-spacing:.1em;text-indent:.1em}
html[lang="en"] .op-claim{letter-spacing:.005em;line-height:1.16;max-width:13.5em;
  font-size:clamp(29px,4.4vw,54px)}
html[lang="en"] .menu>li>a{font-size:14.5px;letter-spacing:.1em;text-indent:.1em}
html[lang="en"] .prose p,html[lang="en"] .adm-intro,html[lang="en"] .sec-lead,
html[lang="en"] .band-text,html[lang="en"] .op-sub{text-align:left;letter-spacing:0}
html[lang="en"] .fcard .name{align-items:center}
html[lang="en"] .fcard .name .rk{white-space:nowrap}
html[lang="en"] .centre-dir{cursor:default}
html[lang="ja"] .centre-dir{cursor:default}
html[lang="ja"] .prose p,html[lang="ja"] .adm-intro{text-align:justify}
html[lang="ja"] .op-claim{letter-spacing:.03em;line-height:1.34}
html[lang="ja"] .band-motto span{letter-spacing:.18em;text-indent:.18em;
  font-size:clamp(22px,3.4vw,36px)}
html[lang="ja"] .menu>li>a{font-size:15px;letter-spacing:.08em;text-indent:.08em}
html[lang="ja"] .deptname .zh{font-size:24px;letter-spacing:.22em;text-indent:.22em}
html[lang="ja"] .sec-mark .zh{font-size:18px}
html[lang="ja"] .fcard .name .rk{white-space:nowrap}
/* 日本語は行頭・行末の禁則を効かせる */
html[lang="ja"] body{line-break:strict;word-break:normal}
html[lang="vi"] .prose p,html[lang="vi"] .adm-intro,html[lang="vi"] .sec-lead,
html[lang="vi"] .band-text,html[lang="vi"] .op-sub{text-align:left;letter-spacing:0}
html[lang="vi"] .op-claim{letter-spacing:.005em;line-height:1.22;max-width:15em;
  font-size:clamp(27px,4.1vw,50px)}
html[lang="vi"] .menu>li>a{font-size:14px;letter-spacing:.06em;text-indent:.06em}
html[lang="vi"] .deptname .zh{font-size:19px;letter-spacing:.06em;text-indent:.06em}
html[lang="vi"] .band-motto span{letter-spacing:.1em;text-indent:.1em;
  font-size:clamp(20px,3vw,34px)}
html[lang="vi"] .fcard .name .rk{white-space:normal}
html[lang="vi"] .centre-dir{cursor:default}
html[lang="ko"] .centre-dir{cursor:default}
html[lang="ko"] .prose p,html[lang="ko"] .adm-intro{text-align:justify}
html[lang="ko"] .op-claim{letter-spacing:.14em;line-height:1.3}
html[lang="ko"] .menu>li>a{font-size:15px;letter-spacing:.06em;text-indent:.06em}
html[lang="ko"] .deptname .zh{font-size:22px;letter-spacing:.14em;text-indent:.14em}
html[lang="ko"] .band-motto span{letter-spacing:.14em;text-indent:.14em;
  font-size:clamp(21px,3.2vw,36px)}
html[lang="ko"] .fcard .name .rk{white-space:nowrap}
html[lang="ko"] body{word-break:keep-all;line-break:normal}
/* 越南文附加符號較高，直排標籤需要額外行高 */
.sec-mark .zh.lat{line-height:1.15}

@media (max-width:1014px){
  .langsw{margin-left:auto;order:2}
}
@media (max-width:420px){
  .lang-btn{min-width:0;padding:6px 10px;font-size:12px;gap:7px}
}


/* ═══ 標誌與東亞地圖浮水印 ═══ */
.op-logo{position:absolute;right:var(--gut);top:64px;z-index:3;width:88px;height:auto;
  opacity:.95;pointer-events:none}
.op-map{position:absolute;right:-4%;bottom:-16%;z-index:1;width:min(56%,660px);height:auto;
  opacity:.10;pointer-events:none;
  filter:drop-shadow(0 0 40px rgba(201,169,106,.18))}
.opener::after{display:none}

.op-claim{font-size:clamp(42px,7vw,86px);letter-spacing:.16em;line-height:1.18;
  max-width:none;margin-bottom:0}
.op-claim-en{font-family:var(--mono);font-size:clamp(7.5px,1.05vw,14px);
  letter-spacing:clamp(.08em,.26vw,.24em);color:var(--sand);text-transform:uppercase;
  margin-top:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.op-sub{margin-top:30px}

html[lang="en"] .op-claim{font-size:clamp(30px,4.6vw,58px);letter-spacing:.02em;line-height:1.16;
  max-width:11em}
html[lang="ja"] .op-claim{font-size:clamp(40px,6.6vw,80px);letter-spacing:.14em}
html[lang="vi"] .op-claim{font-size:clamp(28px,4.2vw,54px);letter-spacing:.01em;line-height:1.18;
  max-width:12em}

@media (max-width:1014px){
  .op-logo{width:66px;top:44px}
  .op-map{width:64%;right:-10%;bottom:-12%;opacity:.08}
}
@media (max-width:768px){
  .op-logo{width:52px;top:34px}
  .op-map{width:88%;right:-18%;bottom:-8%;opacity:.07}
  .op-claim{font-size:clamp(34px,10vw,46px)}
  html[lang="en"] .op-claim,html[lang="vi"] .op-claim{font-size:clamp(26px,7.4vw,34px)}
  html[lang="ja"] .op-claim{font-size:clamp(32px,9vw,44px)}
  .op-claim-en{letter-spacing:.16em}
}


/* ═══ 漢字斷句 ═══ */
.nb{white-space:nowrap}
/* 短段落求各行等長，消除孤行 */
.op-sub,.sec-lead,.band-text,.extnote,.chron-note,.ec-d,.qhd p,.tnote,
.mapfig figcaption,.minicard span,.adm-note{text-wrap:balance}
/* 窄螢幕解除不斷行，避免長詞撐破版面 */
@media (max-width:600px){
  .nb{white-space:normal}
}


/* ═══ 內嵌地圖 ═══ */
.mapfig--embed{position:relative;background:var(--ground)}
.mapfig--embed iframe{display:block;width:100%;height:clamp(280px,32vw,420px);border:0}

/* ═══ 研究中心標誌：白底、統一高度、留白一致 ═══ */
.centre-plate{height:128px;background:var(--paper);padding:20px 24px;
  border-bottom:1px solid var(--rule)}


/* ═══ 頁尾資料時點 ═══ */
.asof{color:rgba(255,255,255,.5);font-size:11.5px;letter-spacing:.02em;
  flex:1 1 100%;order:3;padding-top:9px;margin-top:9px;
  border-top:1px solid rgba(255,255,255,.12);line-height:1.7}

@media (max-width:768px){
  .mapfig--embed iframe{height:280px}
  .centre-plate{height:104px;padding:16px 18px}
}


/* ═══════════════════════════════════════════════════════════
   v10：標頭層級、圖示化語言鈕、單一浮動鈕
   ═══════════════════════════════════════════════════════════ */

/* ── 語言鈕：圓形圖示，邊框收斂 ── */
.lang-btn{width:40px;height:40px;min-width:0;padding:0;border-radius:50%;
  border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);
  display:flex;align-items:center;justify-content:center;gap:0;
  color:rgba(255,255,255,.82);
  transition:background .22s var(--ease),border-color .22s var(--ease),color .22s var(--ease)}
.lang-btn:hover{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.34);color:#fff}
.lang-btn[aria-expanded="true"]{background:var(--gold);border-color:var(--gold);color:var(--lacquer)}
.lang-globe{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.5;
  stroke-linecap:round;stroke-linejoin:round}
.lang-list{top:calc(100% + 8px)}

/* ── 標頭：標題與標誌同列，標誌對齊標題頂端 ── */
.op-head{display:flex;align-items:flex-start;justify-content:space-between;gap:36px}
.op-head-txt{min-width:0}
.op-logo{position:static;flex:0 0 auto;width:96px;height:auto;opacity:.95;
  margin-top:.1em;pointer-events:none}

/* 眉標不換行，隨版面縮放 */
.op-eyebrow{flex-wrap:nowrap;white-space:nowrap;overflow:hidden;
  font-size:clamp(8px,1vw,11px);letter-spacing:clamp(.1em,.28vw,.28em)}
.op-eyebrow .bar{flex:0 0 auto;width:clamp(16px,2.4vw,34px)}
.op-eyebrow span:last-child{overflow:hidden;text-overflow:ellipsis}

/* ── 單一浮動鈕：寬螢幕回頂，窄螢幕開選單 ── */
.fab{position:fixed;right:24px;bottom:24px;z-index:300;width:52px;height:52px;border:0;
  border-radius:50%;background:var(--brick);color:#fff;cursor:pointer;box-shadow:var(--sh-3);
  display:flex;align-items:center;justify-content:center;
  transition:background .22s var(--ease),opacity .26s var(--ease),transform .22s var(--ease)}
.fab:hover{background:var(--vermilion);transform:translateY(-2px)}
.fab:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.fab svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;
  stroke-linecap:round;stroke-linejoin:round;position:absolute;
  transition:opacity .2s var(--ease),transform .2s var(--ease)}
.fab-menu,.fab-close{opacity:0;transform:scale(.7)}
.fab-top{opacity:1}
/* 寬螢幕：僅在捲動後出現 */
.fab{opacity:0;pointer-events:none}
.fab.show{opacity:1;pointer-events:auto}

@media (max-width:1014px){
  /* 窄螢幕：標頭僅留校徽與語言鈕，系名交由開場呈現 */
  .deptname,.brandrule{display:none}
  .masthead .wrap{justify-content:space-between}
  .brandmark img{width:176px}
  .op-head{gap:20px}
  .op-logo{width:74px}

}
@media (max-width:768px){
  .brandmark img{width:150px}
  .op-logo{width:58px}
  .fab{right:16px;bottom:16px;width:48px;height:48px}
  .menu>li>a{font-size:18px;min-height:52px}
}
@media (max-width:420px){
  .brandmark img{width:128px}
  .op-logo{width:48px}
  .op-head{gap:14px}
}


/* ═══════════════════════════════════════════════════════════
   選單斷點：橫向選單延用至 820px，之下才改為浮動鈕＋覆蓋層
   ═══════════════════════════════════════════════════════════ */
@media (min-width:821px) and (max-width:1100px){
  .menu>li>a{font-size:14.5px;letter-spacing:.08em;text-indent:.08em}
  html[lang="en"] .menu>li>a,html[lang="vi"] .menu>li>a{font-size:13px;letter-spacing:.03em}
  html[lang="ja"] .menu>li>a{font-size:14px;letter-spacing:.05em}
}
@media (min-width:821px) and (max-width:920px){
  .menu>li>a{font-size:13.5px;letter-spacing:.04em;text-indent:.04em}
  html[lang="en"] .menu>li>a,html[lang="vi"] .menu>li>a{font-size:12px;letter-spacing:0}
}

@media (max-width:820px){
  /* 浮動鈕改為選單 */
  .fab{opacity:1;pointer-events:auto}
  .fab-top{opacity:0;transform:scale(.7)}
  .fab-menu{opacity:1;transform:none}
  .fab[aria-expanded="true"]{background:var(--lacquer)}
  .fab[aria-expanded="true"] .fab-menu{opacity:0;transform:scale(.7)}
  .fab[aria-expanded="true"] .fab-close{opacity:1;transform:none}

  /* 選單改為全螢幕覆蓋層 */
  .mainnav{position:fixed;inset:0;z-index:290;overflow:auto;
    max-height:none !important;background:var(--lacquer);display:flex;align-items:center;
    opacity:0;visibility:hidden;transition:opacity .26s var(--ease),visibility .26s;
    box-shadow:none}
  .mainnav.open{opacity:1;visibility:visible;max-height:none !important}
  .mainnav .wrap{width:100%}
  .mainnav .readtrack{display:none}
  .menu{display:block;padding:24px 0}
  .menu>li>a{justify-content:flex-start;min-height:58px;font-size:21px;letter-spacing:.16em;
    padding:0 8px;border-bottom:1px solid rgba(255,255,255,.13);color:#fff}
  .menu>li>a::after{left:0;right:auto;width:0;height:2px;top:auto;bottom:0;
    transition:width .24s var(--ease)}
  .menu>li>a[aria-current="true"]{background:transparent;color:var(--gold)}
  .menu>li>a[aria-current="true"]::after{width:36px}
  .menu>li+li>a::before{display:none}
  .menu .to-top{display:block}
  .menu .to-top a{color:var(--sand);font-size:16px;min-height:48px;border-bottom:0;margin-top:14px}
}
@media (max-width:768px){
  .menu>li>a{font-size:18px;min-height:52px}
}


/* ═══════════════════════════════════════════════════════════
   v11：窄螢幕版面密度
   量測 390px 下各元件的「面積／字數」比，針對承載量低卻佔用
   大量垂直空間者重排。原則：短資料改雙欄，長文維持單欄。
   ═══════════════════════════════════════════════════════════ */

/* ── 平板：介於雙欄與單欄之間的中間態 ── */
@media (max-width:820px){
  .pillars{grid-template-columns:1fr}
}
@media (min-width:601px) and (max-width:1014px){
  .cards3{grid-template-columns:repeat(4,1fr);gap:12px}
  .minicard{padding:18px 18px}
  .minicard b{font-size:20px}
  .chron{grid-template-columns:repeat(2,1fr)}
  .degrees[role="tablist"]{grid-template-columns:repeat(2,1fr);gap:14px}
  .centres{grid-template-columns:repeat(2,1fr)}
  .extgrid{grid-template-columns:repeat(2,1fr)}
  .faculty{grid-template-columns:repeat(2,1fr)}
  .transit{grid-template-columns:repeat(2,1fr)}
}

/* ── 手機：短資料改雙欄，卡片內距收斂 ── */
@media (max-width:600px){
  /* 師資規模：4 張卡由單欄改雙欄並壓縮內距 */
  .cards3{grid-template-columns:1fr 1fr;gap:10px}
  .minicard{padding:13px 14px;border-top-width:2px}
  .minicard b{font-size:19px;letter-spacing:.04em;margin-bottom:2px}
  .minicard span{font-size:11.5px;line-height:1.55}

  /* 歷任系主任：雙欄，現任列橫跨 */
  .chron{grid-template-columns:1fr 1fr}
  .chron li{padding:10px 12px;font-size:13px;gap:7px}
  .chron li::before{font-size:10px}
  .chron li:last-child{grid-column:1 / -1}
  .chron li em{font-size:9px;padding:1px 6px}

  /* 學制卡：作為選擇器用，摘要交由下方面板呈現 */
  .degrees[role="tablist"]{grid-template-columns:1fr 1fr;gap:10px}
  .deg-card{padding:15px 13px}
  .deg-card .lv{font-size:9.5px;letter-spacing:.1em}
  .deg-card .dt{font-size:16px;letter-spacing:.08em;margin:6px 0 4px}
  .deg-card .dg{font-size:11px}
  .deg-card .ds{display:none}
  .deg-card .pick{margin-top:10px;padding-top:9px;font-size:11px;letter-spacing:.06em}
  .deg-card[aria-selected="true"]::after{display:none}

  /* 研究中心：標誌板降低，內距收斂 */
  .centre-plate{height:86px;padding:12px 16px}
  .centre-body{padding:18px 18px 16px}
  .centre h3{font-size:18px}
  .centre-en{font-size:10.5px;margin-bottom:11px}
  .centre-focus li{font-size:13px}

  /* 更多資訊 */
  .extcard{padding:22px 20px 18px}
  .ec-zh{font-size:20px;margin:7px 0 8px}
  .ec-d{font-size:13.5px;margin-bottom:14px}

  /* 交通與公車 */
  .tmode{padding:16px 18px}
  .thd{font-size:16px;margin-bottom:11px}
  .routes li{font-size:12px;padding:3px 10px}

  /* 成員卡 */
  .fcard{padding:18px 18px;gap:14px}
  .fcard .name{font-size:18px}
  .frow{font-size:13.5px;margin-bottom:7px}

  /* 學群卡 */
  .pillar{padding:24px 20px 20px}
  .pillar h3{font-size:20px;margin-bottom:10px}
  .pillar p{font-size:13.5px;margin-bottom:13px}
  .pillar li{font-size:11.5px;padding:3px 9px}

  /* 招生管道標籤 */
  .adm-ways li,.adm-fields li{font-size:12.5px;padding:5px 11px}
  .adm-intro{font-size:14px}
  .adm-lab{margin:20px 0 11px}

  /* 定義列：名稱列不獨佔一整行 */
  .deflist>div{flex-direction:column;gap:0}
  .deflist dt{padding:9px 14px 5px;font-size:12.5px;background:transparent;
    color:var(--brick);border-bottom:0}
  .deflist dd{padding:0 14px 12px;font-size:13.5px}
  .sec--paper .deflist dt{background:transparent}
  .deflist{border-top:1px solid var(--rule)}

  /* 區段留白 */
  .sec--paper,.sec--ground,.sec--sand,.sec--tint{padding:40px 0}
  .quick.alt .wrap{padding-top:40px;padding-bottom:40px}
  .prose h3{margin:28px 0 12px;font-size:18px}
  .prose h4{margin:18px 0 7px}
}

@media (max-width:400px){
  .chron{grid-template-columns:1fr}
  .chron li:last-child{grid-column:auto}
  .degrees[role="tablist"]{grid-template-columns:1fr 1fr}
  .cards3{grid-template-columns:1fr 1fr}
}


/* 1015–1240px：師資規模避免 3+1 的破碎排列，固定四欄 */
@media (min-width:1015px) and (max-width:1240px){
  .cards3{grid-template-columns:repeat(4,1fr);gap:12px}
  .minicard{padding:18px 16px}
  .minicard b{font-size:20px}
  .minicard span{font-size:12.5px}
}
/* 歷任名單維持雙欄至 340px；主流手機寬度（360–430px）皆適用 */
@media (max-width:400px){
  .chron{grid-template-columns:1fr 1fr}
  .chron li:last-child{grid-column:1 / -1}
}
@media (max-width:339px){
  .chron{grid-template-columns:1fr}
  .chron li:last-child{grid-column:auto}
}


/* ── 觸控目標：手機上的電話與信箱連結需足夠高度 ── */
@media (max-width:600px){
  .deflist dd a[href^="tel:"],
  .deflist dd a[href^="mailto:"],
  .scard .contact a,
  .mapfig figcaption a{
    display:inline-flex;align-items:center;min-height:26px;padding:3px 0}
  .scard .contact{line-height:1.9}
  .scard .contact a + a{margin-left:2px}
}


/* ═══════════════════════════════════════════════════════════
   系級中心標誌：海外華人研究中心為圖記，其餘二者本即文字，
   改以指定字體排版，任何寬度皆不換行。
   ═══════════════════════════════════════════════════════════ */
.centre-plate{display:flex;align-items:center;justify-content:center;overflow:hidden}
.centre-plate img{max-height:100%;max-width:100%;width:auto;height:auto;object-fit:contain;
  transition:transform .28s var(--ease)}
.centre:hover .centre-plate img{transform:scale(1.04)}

.mk-kai,.mk-meiryo{
  display:block;white-space:nowrap;text-align:center;color:var(--lacquer);
  max-width:100%;overflow:hidden;line-height:1.25}

/* 中國大陸研究中心：華康標楷體 */
.mk-kai{
  font-family:"DFKai-SB","BiauKai","標楷體","TW-Kai","AR PL UKai TW","Kaiti TC","STKaiti",
             "KaiTi","楷体",serif;
  font-size:clamp(20px,6.4vw,31px);letter-spacing:.1em;text-indent:.1em;font-weight:400}

/* 日本研究中心：Meiryo Bold */
.mk-meiryo{
  font-family:"Meiryo","メイリオ","Hiragino Kaku Gothic ProN","Hiragino Sans",
             "Noto Sans JP","Yu Gothic UI","Yu Gothic","MS PGothic",sans-serif;
  font-weight:700;font-size:clamp(9.5px,3.05vw,13.5px);letter-spacing:.01em}

@media (min-width:601px){
  .mk-kai{font-size:clamp(22px,2.2vw,31px)}
  .mk-meiryo{font-size:clamp(10px,1.06vw,13.5px)}
}
@media (max-width:600px){
  .mk-kai{font-size:clamp(19px,6vw,28px)}
  .mk-meiryo{font-size:clamp(9px,2.9vw,12.5px)}
}


/* ═══════════════════════════════════════════════════════════
   窄螢幕的拉丁字母區段標籤
   英文與越南文的標籤以整串旋轉（writing-mode:vertical-rl）實作，
   其基礎宣告位於樣式表較後段，會蓋過前面媒體查詢中同權重的規則，
   故此處於樣式表末端重申，確保窄螢幕確實轉為橫排。
   ═══════════════════════════════════════════════════════════ */
@media (max-width:1014px){
  .sec-mark .zh.lat{writing-mode:horizontal-tb;font-size:21px;letter-spacing:.06em;
    white-space:nowrap;height:auto !important;line-height:1.2}
}
@media (max-width:600px){
  .sec-mark .zh.lat{font-size:19px}
}


/* ═══════════════════════════════════════════════════════════
   Tailwind CSS preflight 相容規則（原 HTML 無此節）
   本專案的 src/index.css 載入 Tailwind v3，其 preflight 含有
   ol,ul,menu{list-style:none}，會移除依賴預設標記的清單編號。
   以下三處清單需要編號，於此明確復原；其餘清單本就自行宣告
   list-style:none，不受影響。
   ═══════════════════════════════════════════════════════════ */
.prose > ol:not(.chron){list-style:decimal}
.centre-focus{list-style:decimal}
.duty ol{list-style:decimal}
/* preflight 另有 h1–h6{font-size:inherit}。全站標題皆自行宣告字級，
   僅系所位置的「交通資訊」標題沿用瀏覽器預設值，於此明確指定，
   數值取自無 Tailwind 環境下的計算值 17.55px（1.17em）。 */
#location .sec-body > h3{font-size:17.55px}


/* ═══════════════════════════════════════════════════════════
   React 根容器相容規則（原 HTML 無此節；掛載至 #root 時必要）
   原檔 body 為 flex column 且 main{flex:1}；在 React 中 #root
   會插入其間而截斷 flex 鏈，故令 #root 承接同一組排版屬性。
   ═══════════════════════════════════════════════════════════ */
#root{display:flex;flex-direction:column;flex:1 0 auto;min-height:100vh;min-width:0}
`;

/* ─────────────────────────────────────────────────────────────────
   原檔 <script> 內容，逐字保留（僅末行的啟動方式改由 useEffect 承接）
   ───────────────────────────────────────────────────────────────── */
"use strict";
/* ============================================================
   東亞學系復刻 v2 — 資料層
   全部取自原站公開頁面（2026-08 擷取）
   ============================================================ */

/* ---------- 導覽樹 ---------- */

/* ---------- 系所成員 ---------- */
const PEOPLE = {
"專任教師":[
 { id:"44916208168d64d6857af4", name:"林昌平", rank:"副教授兼系主任",
   teach:"學士班：社會科學研究方法、經濟學原理、總體經濟學、統計學\n碩士班：社會科學方法論、社會科學統計方法、東亞經濟發展的空間分析",
   field:"金融發展、經濟成長、政治經濟學、應用計量經濟、空間分析",
   tel:"02-7749-3405", mail:"cplin@ntnu.edu.tw" },
 { id:"36685673868d64d6857ae3", name:"張崑將", rank:"教授",
   teach:"學士班：東亞儒學思想、東北亞區域與文化、批判性思考與寫作、日本歷史與人物\n碩士班：東亞現代思潮、東北亞儒學專題研究、研究設計與論文寫作專題",
   field:"東亞儒學、日本思想史、中日文化比較",
   tel:"02-7749-5106", mail:"yangming@ntnu.edu.tw" },
 { id:"130964667568d64d6857aeb", name:"江柏煒", rank:"特聘教授",
   teach:"東亞文化遺產、東亞移民與文化、創意城市與行銷",
   field:"海外華僑與華人研究、僑鄉研究、社會文化史、東亞建築與城市、歷史保存與遺產保護、文化政策與文化產業規劃設計",
   tel:"02-7749-5383", mail:"quemoei@ntnu.edu.tw" },
 { id:"3060981868d64d6857aec", name:"王冠雄", rank:"教授",
   teach:"國際政治、海洋政策、國際組織、國際法、國際漁業法",
   field:"國際政治、海洋政策、國際組織、國際法、國際漁業法",
   tel:"02-7749-1830", mail:"khwang@ntnu.edu.tw" },
 { id:"183013176368d64d6857aed", name:"范世平", rank:"教授",
   teach:"國際政治經濟學、中國大陸政治與經濟發展、中共對臺政策、兩岸關係、中國大陸旅遊產業發展、陸客來臺政策、中國大陸僑務政策、國家主權基金",
   field:"國際政治經濟學、中國大陸政治與經濟發展、中共對臺政策、兩岸關係、中國大陸旅遊產業發展、陸客來臺政策、中國大陸僑務政策、國家主權基金",
   tel:"02-7749-1831", mail:"fsp@ntnu.edu.tw" },
 { id:"110334205368d64d6857aee", name:"潘鳳娟", rank:"教授",
   teach:"學士班：中西文化交流、近代歐洲插畫裡的中國圖像（大碩／通識）、西學與近代中國（大碩）、東亞宗教概論\n碩博士班：Western Chinese Studies、漢學與中國模式研究、西方中國研究專題與實務、歐美漢學史、東亞宗教與族群關係",
   field:"文化交流、國際漢學、經典翻譯、基督教與中國、圖像中國、宗教對話",
   tel:"02-7749-3615", mail:"fcpan@ntnu.edu.tw", web:"https://ntnu.academia.edu/FCPan" },
 { id:"57483144068d64d6857aef", name:"田正利", rank:"教授",
   teach:"大學部：經濟學原理、個體經濟學、國際貿易理論與實務、臺灣企業的東亞經營、跨國企業經營策略等課程\n研究所：東亞區域專題研究、東亞區域研究、東亞臺商專題研究、國際企業管理專題研究等課程\n通識課：管理與電影、國際貿易英文等課程",
   field:"策略管理、國際企業管理、財金與經貿、組織行為與人力資源",
   office:"Wed: 10:30 AM ~ 12:30 PM； Thur: 10:30 AM ~ 12:30 PM\n煩請事先電郵預約時段，謝謝。Please kindly make an appointment in advance by email.",
   tel:"02-7749-3407", mail:"cltien@ntnu.edu.tw" },
 { id:"175743125668d64d6857af0", name:"金恩美", rank:"教授",
   teach:"學士班：東亞文化概論、東亞現代化城市發展、東亞歷史與人物、初級韓語、中級韓語\n碩士班：東北亞文化專題研究、東亞華僑專題研究",
   field:"東亞文化、近現代史研究、東亞華僑、華人社會近現代史研究",
   tel:"02-7749-3409", mail:"enmei@ntnu.edu.tw" },
 { id:"162115566268d64d6857af2", name:"張碧君", rank:"教授",
   teach:"學士班：東南亞民族源流與發展、全球化與東亞跨文化傳播、東南亞現代文化、東亞社會變遷、東亞各國文化政策\n碩士班：東南亞文化專題研究",
   field:"東南亞研究、文化研究、文化地理、文化政治、文化政策",
   tel:"02-7749-3410", mail:"pcc@ntnu.edu.tw" },
 { id:"17471799068d64d6857af3", name:"關弘昌", rank:"副教授",
   teach:"學士班：臺灣政治與經濟、國際政治、臺灣外交研究\n研究所：社會科學方法論、東亞區域專題研究、兩岸關係與大陸政策專題研究、研究設計與論文寫作、國際政治經濟學",
   field:"國際關係、比較政治、兩岸關係",
   tel:"02-7749-3411", mail:"khc521@ntnu.edu.tw" },
 { id:"203169228168d64d6857af5", name:"胡元玲", rank:"副教授",
   teach:"民初以來的思想與思想家、東亞禪學文化、中國思想源流與發展、20世紀動盪時局下的知識分子、現當代思潮批判、東亞現代思潮",
   field:"宋明儒學、當代新儒學、中西思想比較",
   tel:"02-7749-3413", mail:"huyl@ntnu.edu.tw" },
 { id:"139609741068d64d6857af6", name:"鄭怡庭", rank:"副教授",
   teach:"大學部：\n華人電影導論（華語系選修）\n文學、電影中的東亞城市與文化（選修）\n東亞文學導讀（選修）\n近現代中國與東亞文化（選修）\n東西文學比較：小三／小王劈腿經驗（選修）\n中西文學比較：英雄（選修）\n東亞儒學與現代挑戰（選修，與張崑將教授合開）\nChinese Literature in English（選修，全英語授課，與英語系張瓊惠教授合開）\n\n研究所：\n國際漢學研究方法與資料\n現代文學專題研究：五四文學與五四社團\n北美漢學之中國現、當代文學研究\n明清小說與北美漢學的明清小說研究\n北美漢學之中國文學研究：晚清小說\n比較文學專題研究：晚清翻譯小說\n東亞華文文學專題研究\n英語漢學名著選讀\n\n通識：\n文學、電影中的青少年成長經驗\n文學、電影中的情感經驗",
   field:"晚清小說、現代文學、比較文學、北美漢學",
   tel:"02-7749-1828", mail:"ethanzheng@ntnu.edu.tw", web:"https://crossing.cw.com.tw/blogTopic.action?id=744&nid=9136" },
 { id:"77333019868d64d6857af7", name:"徐筱琦", rank:"副教授",
   teach:"國際關係理論、美國外交政策、全球化與全球治理",
   field:"國際關係理論、外交政策分析",
   tel:"02-7749-1826", mail:"hsiaochi@ntnu.edu.tw" },
 { id:"158543340268d64d6857af8", name:"邱愷欣", rank:"副教授",
   teach:"全球研究導論、媒體與社會、質性研究",
   field:"東亞社會文化之全球化、流行文化、性別與家族、文化創意產業、電影研究、電影審查制度",
   tel:"02-7749-3414", mail:"yvonneyau@ntnu.edu.tw" },
 { id:"171457180568d64d6857af9", name:"巫俊穎", rank:"助理教授",
   teach:"東南亞政治與經濟、中國與東南亞的國際關係、政治學",
   field:"族群政治、政治行為、東南亞政治、臺灣政治",
   tel:"02-7749-1827", mail:"chunyingwu@ntnu.edu.tw" },
 { id:"8512485668d64d6857afa", name:"林書媺", rank:"助理教授",
   teach:"東北亞區域文化、東亞文學導讀、文學與電影中的東亞城市與文化、東西文學比較、東亞文學與電影中的創傷與記憶、好萊塢與東亞",
   field:"東亞文學與電影、翻譯理論、電影研究、比較文學",
   tel:"02-7749-3572", mail:"shumei.lin@ntnu.edu.tw" }
],
"合聘教師":[
 { id:"176135938368d64d6857afb", name:"黃約伯", rank:"副教授",
   teach:"東亞宗教與文化、文化人類學",
   field:"人類學、東亞文化與社會、東亞宗教思想與實踐",
   mail:"ptm102_8118@ntnu.edu.tw" }
],
"兼任教師":[
 { id:"1950215508698953529f6c6", name:"尹筱嵐", rank:"講師",
   teach:"初級日語（一）、初級日語（二）、中級日語（一）、中級日語（二）",
   mail:"r94127001@ntnu.edu.tw" },
 { id:"2094913826989561791172", name:"郭國誠", rank:"教授",
   teach:"國防經濟",
   field:"國防經濟、能源經濟、績效評估、財務管理、國際企業管理、企業社會責任",
   mail:"ptm112-16734@ntnu.edu.tw" },
 { id:"94700165168d64d6857af1", name:"林賢參", rank:"教授",
   teach:"學士班：日本政治與經濟、東亞政治經濟文獻選讀、東北亞政治與經濟、美中臺日關係、國際安全的理論與實務、國際公法、東亞區域安全\n碩士班：東北亞政經專題研究、國際政治專題研究",
   field:"東北亞區域安全、中共對外與軍事戰略、日本外交與防衛政策、日本與中共關係",
   tel:"02-7749-3412", mail:"hslin777@ntnu.edu.tw" },
 { id:"197003631968d64d6857afd", name:"孫國祥", rank:"教授",
   teach:"東南亞政治與經濟、政治經濟學專題研究、新加坡東協政經專題、國際政治與我國外交政策",
   field:"國際關係理論、公法、亞太政治與經濟",
   mail:"sunkuohsiang@ntnu.edu.tw" },
 { id:"77260308868d64d6857afe", name:"金志婷", rank:"教授",
   teach:"個體經濟學",
   field:"個體經濟、總體經濟、經濟成長、國際金融",
   mail:"debbyjin@ntnu.edu.tw" },
 { id:"153054655268d64d6857aff", name:"徐明瀚", rank:"助理教授",
   teach:"新媒體寫作與溝通、當代東亞電影",
   field:"華語電影、影像美學與政治理論、東亞影視文學與文化產業、新媒體寫作與策展",
   mail:"austin.hsu@ntnu.edu.tw" },
 { id:"64140286568d64d6857b01", name:"李圭旼", rank:"講師",
   teach:"初級韓語（一）、初級韓語（二）",
   field:"韓國現代文學、臺韓比較文學、韓語教學",
   mail:"meggilee@ntnu.edu.tw" },
 { id:"78490709468d64d6857b02", name:"阮蓮香", rank:"講師",
   teach:"初級越南文（一）、初級越南文（二）、中級越南文（一）、中級越南文（二）",
   field:"越南語言、越南歷史與文化",
   mail:"nguyenchau@ntnu.edu.tw" },
 { id:"92555913468d64d6857b03", name:"劉德良", rank:"教授級專業技術人員",
   teach:"國家安全情報實務",
   field:"國防安全、孫子兵法、兩岸關係、領導與統御",
   mail:"capton5201314@ntnu.edu.tw" }
],
"榮退教師":[
 { id:"415124618699e92658d106", name:"林賢參", rank:"教授",
   teach:"學士班：日本政治與經濟、東亞政治經濟文獻選讀、東北亞政治與經濟、美中臺日關係、國際安全的理論與實務、國際公法、東亞區域安全\n碩士班：東北亞政經專題研究、國際政治專題研究",
   field:"東北亞區域安全、中共對外與軍事戰略、日本外交與防衛政策、日本與中共關係",
   mail:"hslin777@ntnu.edu.tw" },
 { id:"144138466668d64d6857b04", name:"陳文政", rank:"教授",
   teach:"憲政主義、美國憲法、司法政治、民主化理論、法治與人權",
   field:"憲政主義、美國憲法、司法政治、民主化理論、法治與人權",
   mail:"waynejr99@ntnu.edu.tw" },
 { id:"60773116868d64d6857b05", name:"潘朝陽", rank:"教授",
   teach:"東亞研究專題討論、中國思想專題研究、儒學專題研究",
   field:"地理環境思想、思想的區域研究、文化地理、宗教地理、臺灣地理、中國儒學、臺灣儒學",
   mail:"t24012@ntnu.edu.tw" }
]
};

/* 教師個人頁的九個分頁區塊（原站欄位定義） */
const CV_TABS = [
  { k:"期刊論文",  cols:["學年度","論文名稱"] },
  { k:"研討會論文", cols:["學年度","論文名稱"] },
  { k:"專案計畫",  cols:["學年度","計畫名稱","職稱/擔任之工作","計畫期間","補助/委託或合作機構"] },
  { k:"專書",     cols:["年度","書名","出版日期"] },
  { k:"專利",     cols:["年度","專利類別","專利名稱","發表日期","專利人"] },
  { k:"活動服務",  cols:["年度","服務類別","活動名稱","擔任職務","辦理單位","活動時間"] },
  { k:"榮譽",     cols:["年度","獎項名稱","頒獎單位"] },
  { k:"學歷",     cols:["學校名稱","國別","系所","學位","起迄年月"] },
  { k:"經歷",     cols:["服務機關名稱","單位","職務","期間"] }
];

/* ---------- 行政人員 ---------- */
const STAFF = [
 { name:"鄭昶怡", rank:"助教", tel:"02-7749-1825", mail:"believer@ntnu.edu.tw",
   duties:[
     ["學務", ["受理該系特色發展獎助學金申辦業務。","協助其他獎助學金申請。"]],
     ["教務", ["碩士班、碩專班、博士班學生學籍：畢業資格審核；處理未結業同學名單及後續工作；畢業預估名單之提報與離校手續事項。",
               "受理碩博士生學位論文研究計畫、學位考試申請事項。",
               "辦理博士生資格考。",
               "碩專班學籍管理：繕造修業規定；辦理論文成果發表會；畢業資格審核與後續工作；畢業預估名單之提報與離校手續事項。"]],
     ["行政", ["教師評審委員會聯絡人。","導師暨獎學金會議聯絡人。","系級研究中心設立與評鑑業務。",
               "科技部與其他各項委辦計畫業務聯絡與協辦人。","大陸地區系級學術合作協議報部。",
               "大陸地區專家學者／學生入臺證辦理。","系所網頁管理人。","其他交辦事項。"]]
   ]},
 { name:"謝侑蓁", rank:"助教", tel:"02-7749-5413", mail:"yuichan@ntnu.edu.tw",
   duties:[
     ["課務與教務", ["大學部、碩士班、博士班課務：各學制課程與通識課程之開課事宜；繕造專兼任教師任課時數表；各學制課表與課程架構繕造更新；教師請假代課事宜。",
                    "大學部三管道入學考試（繁星、申請入學、分科考試）試務工作。",
                    "大、碩、博外國學生入學申請試務工作。",
                    "赴外交換生申請、各級國際交換生／訪問生來系相關事務。"]],
     ["總務", ["經費管理核銷。","申報系內圖書、期刊、儀器設備費預算。",
               "採購：圖書、期刊、器材、設備、消耗品、非消耗品。","器材及非消耗品之保管、維修及報廢。",
               "協助學術研討會及各式活動之預算編列與核銷結案。"]],
     ["行政", ["課程委員會聯絡人。","系所發展委員會聯絡人。",
               "國際事務：外賓來訪與國際參訪團交流活動規劃；系級中英日文學術合作協議簽約與提報。",
               "系所材料費分配制指標業務聯絡人。","校務追蹤管理系統行政管考聯絡人。",
               "系所評鑑業務。","其他交辦事項。"]]
   ]},
 { name:"鄭琇方", rank:"助教", tel:"02-7749-5396", mail:"hsiufang@ntnu.edu.tw",
   duties:[
     ["教務", ["系所招生總量、學制增設／調整業務。","國際關係與外交學分學程承辦窗口。",
               "學士班學籍管理：繕造修業規定；協助新生營選課輔導與增修新生須知；學生修課輔導；畢業資格審核（含輔系／雙主修生）；畢業預估名單之提報與離校手續事項。"]],
     ["招生", ["碩士班、博士班、碩專班招生試務工作：招生簡章修訂；試務作業規畫（命題閱卷、書審、口試、成績結算、試務經費編列）。",
               "學士班轉學考試及三管道以外入學者之試務工作。",
               "僑生與陸生入學試務工作。",
               "輔系、雙主修、轉系學生申請相關事宜。"]],
     ["行政", ["系所務聯席會議聯絡人。","招生委員會聯絡人。","協助學生職涯發展活動。",
               "協助畢業生流向調查暨系友各項事務之推動。","其他交辦事項。"]]
   ]}
];

/* ---------- 文件庫頁（課程資訊、系務法規、表單下載） ---------- */
const DOCS = {
"A-4-1":{ total:19, cates:["修業及學分規定","論文考試","課程地圖與核心能力","轉系、輔系與雙主修","畢業相關"],
  rows:[
   { cate:"修業及學分規定",   title:"東亞學系學士班修業規定(115以後入學者)", files:["東亞系學士班修業規定115學年度入學者-定稿.pdf"] },
   { cate:"轉系、輔系與雙主修", title:"雙主修、輔系課程架構查詢系統", files:[] },
   { cate:"修業及學分規定",   title:"專業學分學程專區", files:[] },
   { cate:"修業及學分規定",   title:"臺師大東亞學系學士班修業規定一覽表", files:["學士班修業規定一覽表-110後.pdf"] },
   { cate:"修業及學分規定",   title:"東亞學系學士班修業規定(112以後入學者)", files:["東亞系112學士班修業規定.pdf"] },
   { cate:"課程地圖與核心能力", title:"114學年度東亞學系學士班課程地圖", files:["114東亞系大學部課程總地圖20250915.pdf"] },
   { cate:"課程地圖與核心能力", title:"111-113學年度東亞學系學士班課程地圖",
     files:["111東亞系大學部課程總地圖20221220.pdf","112東亞系大學部課程總地圖20230815.pdf","113東亞系大學部課程總地圖20240830.pdf"] },
   { cate:"課程地圖與核心能力", title:"學士班課程核心能力指標", files:[] },
   { cate:"轉系、輔系與雙主修", title:"【臺大與臺科大學生專用】臺師大東亞系跨校輔系、雙主修申請書", files:["臺師大東亞系跨校輔系、雙主修申請書.odt"] },
   { cate:"轉系、輔系與雙主修", title:"國立臺灣師範大學東亞學系轉系辦法", files:["國立臺灣師範大學東亞學系轉系辦法.pdf"] }
  ]}
};

const LOGO = "data:image/png;base64,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";

const BRAND = {"logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFXAQMAAADpjQXKAAAABlBMVEX///8AAABVwtN+AAAAAnRSTlP/AOW3MEoAAAhkSURBVHja7Vs7jtxIEn0MEiINYatMGQK6jtDmOoviUfoIa47XaY6pI+goxEDGmDoCZzBGm9SiDXaDxVwjmcxfRDLV89k1hoDQ3axXERmfjF+moPdnBQDU7oWegJP9vdIwjya4RwN46QAA1WrfmWeG9LQGsAEXyM/VZ11lgPUCAGZlv2RwuKl9jSuyz2lf45QHVlpro5RPeaBWG+sDzsDdxno6ArYb669HwNeNNQ6fR63JGPbgGQDkzOxrkoAC4AwQMB0DXwECxmOgBlAiNPCoCUXAAYSiZwRhLQFOICwlwBlUokZgAZWoEVgDYe70EGwqbTx2U6T7sLK79rTYbeq4acIOJKBWAHBvfgzA+x2oPNbvATwAQI8+2eqDZ5g7uyvMjzrYTVdywAsAE5jQAWgCqmNkQu/TLvyEHPV+jzBoUhsyTsH7SfS2cm/PAKAccCnzs5nh0/CsZwCox6znuDV+/JAJuMagBvjAsLvsK+kBLJgAVHq1Qd3ELv/PkzEoTQAoG+yNjUiWc3vO5mPavqLEiHExGII1QsjJhRJjrpVGb++yT28MSb4mmM0X+lUP9GKcVDmfMuHGWg+XEJj3I9qoX8BFq9mIfM6yjikOkdKiaAfaNEtw1BUrELNnBjYRRcBOWltj/gVFzCgpO2Y97TrxxOs8IG0cZsHUByaMbEXez4UxzO6rxHJaUw8lL+hoTt+XkjUOnDCKsaHavDuhaCL6YsSawqWQH29HRo0qTFFaDwBOejF/TgBaU5XY6pL8mDSHWpr9vEAucgCvWIyWJgBLWGFRWGM8mWWNAFY/TXi/dABw+WyEHwDofyXxq43K4TvNfEbMGp40E7EoyjAA8EJ+dEwIKSE6JsBeCnox8HIcLVot1tiVTqTmdzYxvzXS9o+BtZhiYj1z+rnnWhsuz2hGmCjbxOaKCqToeccCGWk+8I6bSvPA9mmpNJVmhUFSL/xD2DNtXouOtR5YLbpt0nq9KuLAwK0xWBOAj+K+rlROOR7rkHelRdbWir0QYx1Fs6FPq+tEBYomGN+btd7nCs2LK6+Z/dvqUJrN6jrHujPeek57c6a8Jpfyi3Jhcwhs2D1O4l7uSqvzOQtc8pVUXIKiSr9DaSpn6oQUOG1mVHaWIAE/i/USpRMJ6wxfM8Bf/Rj/nyTL794z75t0cPMbznt+DP3yi8T6RYUx8XYWgD/HQfVbVMQtkDbfpxC4OdVL6kHPLOun1GFvLHBk3FtxwD5ucwKTOmE0l0UmhuLq67pK3I4E51bxS4qF3pbax95LidDKrwe0vGeqUCSVAofgRRe7eVLOvA81PibASI314b5+CHlOPsfay05VuC2YIm6JUnl7MCyYo6CxJMAZAO68ONKOMsUq+OxO+TYkodYAgB9YilNaArzzjU1sVZlUPajId56eaSoUM4pO6pm+tOe6CMDqsG3enICYsL87ZGnbXNHhyIOh2BSt8bBjz1W4jbdpSFjSH8D6b+CbgFzHPpdMFb7LKZY3r3EWgGuug4yPmMAnuIi1kgdI8fihQBhm/IDB4xJQfJIHSCHwNcTd2PHDBUmB9ywr/JP8VwgM6rZvih0mnAFAe6Hz5Zyz9Zc4HDT85AO3neSLNKeIC7knyTJxgfZZGmhQ5FZKGmhUYQmsDz18Dp24F4uPJdyASpylrAHhimF9HyxukicfXcBslCcfDbcfusyIZPThZ049A7MLHpAUSHtJdHLdrjci8XNhm8aCmrfMmASc9zzwYxKG/s0D6yGKnq0wGcY/o1j7g+Q9UYV3EiPFNk60M8pJ9scP8niD+J56OhgW1Plo6d0RUK7dq4JhQUVKqsaYfOFRHDeKKni7pAXS2XlYfljQicUNs5KhJMU1QpxgKY7fkTTXIuBUSnFmMzcz0Hg1XrYcUtQsd26g0TsHztoaJx2OzThbfwaAbzdB6fHcbHuuAcWQdSDpKWHtHOo3MYNGrIX3iTDfQmCQXysA7cw1N57ktyak+BM3dfK/0ooXbWp2OvNbCryx0nFeeGXGs2z1eGJYP3PAZ8bNvnLAG7NGvsh7TNYoXNS4S9b4ygMnvhHPSENZWbhGXChbdSK1VNteI2FEYNzuiddYpgi4HLUBlNeOo0ABB3PboJ6EUNnuJwWPM2DvpVTbyUVkazNRNBa/auOKq3ULXz3K5NPKRDMF4BwfChiKVrkmGQ5wN2KuAUUT6AagBypTh/ZbkTIGFBdLeQQqQ8r66Ek8djET9grhyQV5an2IZ4V4CE3Rmrqs2o4BzErsX3Zh5CxIaRbonA0pW4g1yasJ7IEYOWNT2vd27LyG+DGQV4aGZ6uDrT4n4KT1akOjeR8qvJLacFXSX3NVMxU14oMw7en20HBAp8n0Cm8bP9BB8ZH9ypmdgu17gdTvGpGsadQ6OpaOmzP1RtZ/JrAXG8jvo7j8PwiTAy5vohi09sv3sVZvEab5c9Vz+V9aZoF07vpXOEVFfeHXfz/reHhKuZoH3BnSX2uZaQPqkivLdGFTRioRlQW9DThkIaMDjgeXoAcLnEpFb2dbw8f5Wg9bP1kTALzOhcLocw4y65KOfQCWFQCoS5Yc3TrDugBo6GDqAMDMyUpi+BkASDoPivykiw9oRzHiklTOK8lxJyvSGp2NbuvUYQtoSvRx7x333ovCUkIbKqNds3ZBch+W1/to8epa312wK4W94hMAfNV7W/fsUqq7eHQXNYfhZXfosWhba8K5KOqVRgoCHRVvNlxT/pQwpFnwdEf3s51L0lGcsBakoruC6O3F/0N9a0KJfmqAkuNtIdETSsTuzFY4FvveAO9LhMbBf5SCHaERhAuN/vNuD80HwA8AKm1mTnl1W4p1Pn+0sBQPSHoRN/v/FbQ1t39T8dGfTgdzv/8C8ZaTvK2s34YAAAAASUVORK5CYII=", "map": "data:image/png;base64,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"};

const SEAL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACwCAYAAACvt+ReAACETElEQVR42u2dd3wc1dWGn3tnZptWvVjuTe4dm2rA9N7BDiQQeknoBEK6cQpJINQEEhJKICEQTO8dDJhm3HvvtmT1tn3mfn9M2V1bkmVbBudL9peFYGu1M/e+c+457znnPYL/vZgKMGkSzIBpzGjzZ+7tP1LTdUs3FT6hMBQYgC5QuhJCopSGQAqFEEIItd3nBWAphRBYSmEJsJTAFIiUgJRSJC1BUigrqfll8polS8y2ruMZJrN40jaYMYNp/9s6xH/jTStgOpMBmML0Hf7u/ooRhlTKbworIJF+FAZgINB0IdCFwAWoUmChUIBSzr87+G4JCCEQgEQgRHojUkqRUgoUpkKlhCSBEnGhiJlKxWeuWZqc3gagASYz/b9yM8V/H2inMyXL+k6ibHCt30xZQYQKKQgIMAKaJjQhsBSYKEylbNPp/TaRtXhqFxZz+59V2/1OTQj7jUAKMJUiZlmgSChBTEdETEF0VI+S+JEzZmSAGZg8mcnT/3vA/P/+Pp9x7FOmpf3b8OEykRAhpVSOEiIEyh+QGgApZZFygCqUQgkbVuprXCz3uxQKoUAJgQRs6y8RQMQyEZCQiAhStOgkoleuWGFmW+bsh/V/AP4Psra3TZrEtAzr9MehQzVSMqRQuRKRY0ipaQiSyiKplO0LAN6ZvqcLK0T6dymFUqqLbi59nYYQGEJiokgoywQVEUo0myRar1+1Kg3m/8dW+f/VPU0FRmRY28nAUQNHhExUnhIi7JdCFwgSjpUVSnUZYF1QSSmxLAsrkcRKpWy/V9eRPsP7O7oKzO7D4fjlPiFRQNwyTU2IFrAaq1YujUzLOI0Ww/+r4E/8fwEuGRtz99Chut8UeZYS+boQfl1IB7SWczSLLr9xISVWyiTR0owRChDu3o1gYQkA0foaWrZWkYzE8IVzkbqGsqwuP3Xcf+pC4heSFIqUZcU1RGMC2XT9qoUpd72WANP/B+B9C7j3Dxrhl6hCpVReUNNl0lIklGPxhNhrNys0jWRLK77cECPOO5shp5xC0cAB+POLAIg31lG3eg3LX32VxU8/R6IpghHOQZnmXnOhUAqR4WZELdOSiCahzIbvr14W+/8CZPGfCtwR4AUoD1YMDSihFVtK5QalRkxZmJZl+6F7beXsB0LoOvGmJrqNGspxd99B6bCRHX6sZtli3rzxFrYtXIY/Lw+VSqWtp9o7l6qUQpOCgNCIWSZAs1Jm/bWrl0faMgT/A/BepsJcH/eBgSOCSqgiIUSuTwiijn+putDausGY+zAopVCmhWWaKKVItLRSMnQg5778LKGiUqxUCiFlm0GcsiykrhOtr+WpU8+iZtkqfDlhhASp6QhNZn1PVwZ/mVY5ICUppVCKFhB1V69aFHGZi/80Pvk/5lqfyQDuH4cM8WumXqwEeYaQxCwbTF1hcYUQIG2qyrIsrGQSM5HESiZBgNQ0jHAIf24uwZJ8dH+QQ3/8Q3ofPBErlULqeoe/3/2ZjZ/N5JPf3YkZjxKpaSTR3EyipRUrZYICaRhoPgNp2MGfjT8LZakuALNN1AVdIEOzQtVcs3JJfPu1/h+Au8BduM250Dv6DtdyfBSDKPQJKSKW6VmVPXIFnLdlWZjxBKl4HCwTIxQk1K2Ugr69KBo8mKKB/SgcWEG4vIxwWXeMnCCaEfAsZmevI/NnrVScZCRGS9VWWiqrqF+zhrpVa6hdsYKGdRuJbKsm2RoFIdH9fjS/H6lJ26Jn0n97AOSQ1EhYllLQoLRU7bXLl3vB3rT/AXgPwJvB5f5p0PACoUSJX0o9sqcWVwiEFAgEZjJFKhrFSiUxckLk9+1Ft9Ej6TFhP7qNGUNBv34E8gs7BCNKIRwr2WnwWFaWa9LWK9ZYT+P69VTOX8DW2XOoWrCQhnWbSLa0InUDPRhEM3QUyrbMuwlmdy1DUiNumaalqKlZvaR+Gnamsr36kP8BuAOr6z75fxw4NKAJWWZILZRQFqk9CM5c39RMpUi2RlCWSai0iG6jR9L38In0OvggSoYMRQ+EdnAgLTv4sRcs0791fMvMf6udLbZXALHd73BqKQCk1HbYnVQ8Su3yZWz89HM2zPyUqrkLaa2uRUgNIxSywez42rsLZF1KfEKSsKyoKVTVdSuXxGy3gn0yqyf2VfA+w2S2VSwuEUIUG0KIqGXCHvC3QtNItkYw4zGCJYX0PHACA449mr6HHUZ+7747WEfPwreTTWsLYHsSYbkPSGbgmPm9AoHQsq1806b1rPvoY9a88x5bvpxNpLoOzR/AyAntNkWnsFPofk0jZT8INdt81ExbsmSftMb7DICV4+tOA+6rGObXEeV+qQWjlom1h6kHIaVNdY0eztCzTqXi+OMp6Dcwy/pZjmUXbqWZZdmbKUS77oGVShBvaiLWUEe8qZVEa5RESwPx5iasVBK7ggEUFlI38Ifz8OXk4cvNwZcbIlhYjD8vD6n72nUzbPDiBZau7+sxHc6rccNaVr31NsteeJnKeYvxhXNBWXuwH/aah6RGzDJjlknldWuXxDJjkv8B2HnZZSf26/5BIws1rDJdSBEzzT1mFoSUxFuamXDVxRx6661oPifoshRKWZ4v7AFDSITM/s5ktJXmzZudAGsV9WvX07xpE82V1SSamklGWklGY1gJE4UFlkJt50gIBEiBQCJ9GnrAjy8njD8vl5xuJeT16k1+v94UDxpE4YAB5PXsgRHK3Q7QzjV7D5rt+2Y+ZFYqwcw772TWH/+GLzd3jzN+SikCmoaplLJQ1desXFK3L7kU3ziA3UDtruHDpT9BeUBqeV1hdV3wJppbGHjCEZz+6GMejSWkREjp0VJS07I+F6mrpmbpUrbOmUPlvIXUrVxNS2U1ieZmlKkcOk1HGjpCaghNQ0r32Bftr6py/qFs4FmmibJMrJSJlUqCAqEJfLlhcspKKB4ymPIxI+k2ZgxlI0cQKi7LPgGcB9y7F9NCaDpCwCtXXMGKV94mkJ+LZe4hiDOscdyyWpKm2HrD2kXm1O0Kpv7rAOyBt//wQECjh19qvoiV6rJaBSElidZmzn7q7/Q9dBKWabbD0yqqly1l4ycz2TDzU7YtWkJrZTWpeAKp6Wg+H5phIHTNuy6VFXTtRhZNkPbpMxMlgDJNzGQSM57AMlNoPoNweSmlI4bR59CJ9Dl0IiXDhnkuyg6glpLNX37G9HPOxwjldEndhU24KUJSJ2FZyZjFlpvWLI5+037xNwJglfHl9w4Ynu/TRLkUQsS7wGXIpMqUZaEZBhe8+wZ5PXukAzMnGKtetoSVr7/Bho9nsm3RUhJNLQhNRw8E0HxGtj+s1Ne7MRkJFaUUZiJJKhZDmSl8eWFKhg2h3xGHUnHCCZQNH5m+Z+cem7dW8sTRJ2AmErZ70VUZPaXwSYkClbJU1XWrlzR8k36x/k2wDO6N3l8xrDQgZXFcKZKW2fW1C0JgmSZWMp4FQGVZCE1jzXvv8t6Pp5JT0g1fbphAUZF9YFo2FaX45l5KKTDNNK1m6Pj9uY6/DpVzFrH6zXcQUlI2YhTKNBGOK6SUwkom9kqxkBB2OapEiKAmy++vGOG7btXibdP4ZhIf2jdBkd1XUSFOKSrvEdL0wqgb7e+F51fTNGKNDZSNHEq3UaNRqRRC0xyfUdHrwIPoMWEMG2fOJNkSQRoGyrTYZ19KgZSkYlF8uSFOffhPjL3wEo+VAFCpFFLTWPPe2yx7/mV8oVCXl266HSoppcjRtOCxhSX+o4zuLT9trWIydoXb/zsXwo1ab+8xVMvLkT2DQgu1mKm9WjEmhCCVSJDXsxvfeulZckq6ZdUrKMtCSMm2xQt56eIraNlavUcc6l7fLE2SisTI6VbEqX/7M+Vj97NZCCm8AFXqOrGGOp4+/Wwa1m1GD/i6pH6io4cqpOnELDNqkth0/apV5tfJUGhfJ3h/VzFKzzNEH7/Ugq17GbzeDRoGkeo61n34Ab0OOoCc0jIv0BFCYKVShMu70//Iw1j5xhskm1qRhtG1XRNdFJCa8QT+/BzOfvoJykaOtgHruA1ugFq/ZhUvX3I5tcvWYISCexe8jpuWsCyCmmZYaLnH5ha1XNZYaz3D11NnrO198E5mCku4d8AwIyjoY0jhj+6CvyukRDq0F1LsOrCUQg/4admyjeUvv0Lx0IEUDaywfUYpEFLDSqUIlZTRY8JYlj73Iiibs9130IuTkUtxxhN/pXzM+OyTxDSRmsa6Ge/z0kWX07B2E/7c8G65DkLLWG/RufUWwu4t9EupSSlzD88rar2yodacyiRmsP4/F8C25V3CH4YO9fmV1leXwuh0ckLY6d9UNEaipZVkNIqVTKL5fLscVSsHxMlonGXPv0SwOJfu48bbxy/291ipFHm9ehMsyWPFK2/YvuM+YoWlphFrbOTIX/2MIaecvgN4haax4Ml/8MY1P8CMm/hyQli76Aa5a5poaSHRGrEZD0uh+fyd9otTloVPk5ouZO6k0qKWn9XONve2Jdb2Lnjh7kGDDL/S++pC6olOWl57MSHR3ETJ8EEMOe1E+h95GP68MI0bN2HGEmg+Y5dBLHUdqRmsfPUNkCZ9Jh6aTiFrGpZpUj5mHLWrllE5fzG+UPAbB7HQNOKNTVSccBRHTvul7Spodh2GnbjQ+Py+e/jgZ7/GCOYgDX2XLa+QklQ0htAE/Y86jKGnn0S3McOxUika129AM3x2HcZO1kIIG8SGlFJXIveo/OKWyxtq9iqI98o56eoa/K6iQg/j72NI4YtZZqeYBqFpDoGf5NAf38R+l17qpX8BtsyZxVs33EzDus0YweCub5aTuWqtruaQH17Hobf+2AOFsiyEkDRtXs8/TziNVDTZqY3bq66DpRCGxvlvvERBvwFe4Ola3s/vu5uPf30XwaJiULvOV7vgzevbnRPu/QM9xh/g/Z1lJpn397/z8a/vACXRAv5OBbgWiqDUSCmVSsjU+huXL0/urSL5LrfAU4Ejgbt6DZchXevjk9LfWbdB6nbFmC8c4OS/3MfIb52H1HSvfUcpRV7PXvQ9fCLLnn8RM5Ha5Tpc+wFT+MO5rH3/Q3K6FdN93H4eICzLJFBQiGUmWPP2B/jCob0fCHWwHtH6Bg689goGnXRK+kFzrnXh00/y/k9+SbCoGKV2o13fTfb4Dc5+6nG6jRqbtdZS6nTfbzzdJ4xh7XvvE2tsxggGdmo0PHdCSoklwhOL8pu+V/eJmgpdnrPTutryfjgVztpcITRN6x3QZDDaafDqxBqbKejfizOeeITeBx1i1y04FtN9W8kUoZJSmrduYtPns3bbV1UodH+Qte+9T9/DJ5Lbs6fds2ZnmSgdNpSVr79OrL4JqWtfv/EVAjORILdnOSfccxeaP4B0M22aRtXCebx6+TUYgRwvyNsd3zre1MTwyacz6rzveL618II4hZUyKew3gAHHHsnGmTNp2rQFoxPcshvYBaWmacjQGf37NDVv3coRXQxi2ZWLfhuTmDYNFL4eIV0LRXYBvNH6BsrHDmfKs0/bmSU3UBFkL5a0N7F83Lg95i+FJrFSig9+PhUzGfeObWVZ+PMKGHXBuSQirbtl5buCNku0tDLqO1MIFBR5HRw235vkg59PIxVP2Q/Xnrg4lqLH+PG2EcjYK2VrsSF1HWWmKKoYzOTpT9HzoP2I1tbttPfPBpcgYpoEpRZMNEZ7TsPuJlf7IoCnTrKLOu6tGFaaq2m5ralU58FbW0efw/bn7Kf+Qbi8h31E6rqzMdn1uMJ5uvP79kYP+PfoeFemiT83zJYv57L0uedsC2/aJZYoxcgpU8jt0Q0zkexaBZ9OHO1mMkm4eykjz/2W1/fn8tdLX3yBTZ/Owp+Xu8tsw/aBrebXyevdy1PMzAqkHRpNaDrKNAmVlHHWPx5n4AlHdhrEQghaUylCmha+b+CIsinAh5Mm7VsAnopdVXb3wGF5IakXR3YFvPUN9D/2cM547FEC+UUoy/bvMi3O1rmzMz5kX3JB77748/OwzNQegUuZJnowxJy/PUYqFrU5UMc3DJWUUXHicSRaW7zO4K/F93Ws78DjjiLcrUdWza+ZTDD34cfQ/IE9SxELgZUy8efmkd+3j3e6ua+tc2ejLNPzk9098YXzOO2RvzHolGOJ1NR2HsRmipAmi+4ZMKTgyBkzmMqkfQPAk7FFof8wcGggIGX3hGVidRK8kZo6Bhx7OGf8/TF84TwnwtbSkbaV4o3rr+fFCy8jGWnN+nywuNi2jsnkHhlHpRR6KEj1kuWs/fB9pwDI8tyMYWedgeb3fa10mlIKaWgMPfMM5xRKd4ys/3gGVQuW2CnvPQCwwE49h7qVEC4rzyKllGnyyuXf59WrvoeZjDt7YXn/1gw/pzz0ZwafenynLbFCELdM/FIvv2/gkOA0ZjjKxt8ggKcCw4F7+o6RfmRPIYQwUTsly6SuE6tvoO8RB3HKnx9AM3xZCySkJBlt5ZUrrmThP6cjNI1YQ106/DLtFp2iioGYiQSILrCOSrLs+ZfSVJumgRB0H7cfpcMHk4xGd+jU2FvBWyoao2TIQHpO2N/poE63Dy17/kWU1QX8p5SYiThFFQPRfP6shyFaX2O7KtNf4aVLLiXe3Ng2iP/yAANPPKpTIBZgS9YK0KTe8w+DB2vPkFYF+sYs8DRA6InuQU0zEubOuV6pa8QamygfP5LTH/1bhuVNL1CsqZ6XLr6EFS+/RbhbN2J1DbRUbfOoDreMvHzsaPsze4pdy8LICbLpsy9p3rrZq1az6wsM+h5+KKlYDCH2vhshpCQVi9HnsEPQ/AGb1nL+vLW6ig2ffI4vFLJVLveUYjZNuu83xlmDdFt+S9U2ojW15HTvxpq3P+L58y8k1lC3I4h9AU5+8E/0PnQCsYbGTrE1ccvCL6VumHp3e98mfTMAtoM2uG/g0MKwpudGOlGcIzSNREuEwoF9OP3Rh/HnFuwI3oZ6XrjgItZ98CnBkmKUZZKMxti2aJF3vLrf0/PAA+y06Z6WCyqFZhi0bqtlwyefeKB276b3oRO9lvW97z6ANDT6HHaYBzTXOm789FNaKqt3OQvZ9kOrMIJ+eh6wv/Pg4HHJ1UuWkGiNoiyLYFEhm7+YwwsXXkysoX4HEPtycjnt4b9RMryCRHPrDu1ZOwBOCKKpFGFNC98zYFjRNGZ4YxK+NgArYNqMGdw7YKhfl1pZzDJROwOvlFjxBP68EKf97UHC3bp7UbW7IPHmRl648CK2fDGPYHERVjLlfFZj02dfpI93hyUoHTaC4qEVdhpUdoWslGTdhx953+MGjN1GjSJcXoaZ3MtshBBYySSh0mLKx4z2jnr3gV334Ywu4aCEFKRiMYoqBtBt1Gjv3oWwmYeNMz/DrdC2UimChYVs+WIeL3z3IqLbW2LTJFhUwml/+wvBknxSsfhOaUclBBHLxC+10vsGDg1MYfpu35bcHfBOZzIPjR+PkKK73hm/VwiUpTDNBCc9eC8lQ0eks0qORU3FIrxyxZVs/nwugcICD7yWZWGEQmz6fBbRumrneLf/XOoGQ047iVQ8hpDaHlokCz0QYOvsecRbmmy/0/nzYGEx5ePHkIpG9yonLKQkGYtSPnYUoZJunuV1Y4ItX81FDwT2uEBdSI1kNMqgU09E82W7KbGmBjZ99kVWssJKpQgUFrD5y7m8dNElJFqb0yB2akgKB1Rw8l/+CMJpLu3gQbf9YYUUCCFk9/sqKsT03eSHd3k3XHXIWGO0JKzpgVhn/F4piTU2cMRtP6HfpKPSdayeAqPF69ddz9p3PyFYXOgpm7tnqu4zaN5cyaq33k4f7w6QRn7rXPJ6d8eMxfeMTlMKze+jaeNmts6ZbQeLGb1w/Y+YZFN8e9P/BVTKpN+Rk7xrwgFR5fx5NK7faHPfe+I+OBm+cPdSRp17rnfauGBd8847NKzbhL4d82KlUgSLCtn02Wxe+973sVIJb3+kU83X+6CJHHX7VOLNTTt90IXDSuRIzY8ySqaQnhy11wA8GXss1b39R/p1RHHENHcKGqnrROvqGX3+ZMZdcllWZ7DlAPGDX/yc5S+8Tqik2LO8O4DL52Phk0/bgiGuGJ9zfE248lLizc079b86wwBYSZM1b7/rUUquJek9cSLBogLMVGrvlEAJO6jyF+TS59BD08By/nr1W++QiiX3uAlAOtVt+11xUTpp5HHfJguffBpptE0bWskUwaIiVr3xPu/+6Me2W+hI2kpdx0qZjDrvfMZe+h0idZ1gJhxXQhey+I8DhgSmMN0ZyrO3ADx5st2UKc1yQwphqbZdB5eG0nw+Ei2tlI0ZxpG//mWW5XRdiK8eepDZDz1OqLgk2/LuwBLksPWreax68w0nY2baKo2WxdiLL6H3oQcQb2zyGht3zwpb6MEg62fMJBlttfvnnPqDgj79KB053Pa39wIbIYQkGYlROmIohf0HeqryUtNIxWOs//BjjEBgj6yv0DTiTc30OHAc4y+/wtsPNxZZ8/67bPr8K3w57bfi28X/Jcx//Ck+v+9u2/q6ro6zH0f8Yio99h9LornFrt921rHN34dClwJLyPKpkyYxffLkvQPgZ5jMlOnTKRo4tCBH14NtdlU4+rlmMkm8oZHWqm1IHU649y58jsqMEMLrIFj97lt89Ms7CBYWZWmDtReeSyPAF/c/gBmPOe3x9l9pho9j7/wtvvwQViK52wGdsuzC9/q169ny1SzvlFCmnRXsd+ThmMnEXuGDhRSYiTh9Dz80bdkcYGydM5u6VWvRg7vv/9qnSwpfOMBxf7gD3R/M+jszmeCLe/6IlPpOvVHbnShm5u/uZfmrL9kgzqh70QNBTrj3D2gBnZbKKmINjaQSCY9b396ViFkmOboeKNxUXTh9+vRdYiU6Za7swG0J5wwdqgkleymQFmyXO7cBFWtsJK9nOYNOOY6Kk45hwlVX0OuAg7LpMk2jfu1qXrzwMrAEQu9Eza3TVVG/Zj3+whx67n+gHcg5i5dTUkbhwH4se/5Fu4tgN49aKSXJlgj+/FwGHH20I51quyx60G+3HO0NPljZv/bQH91MbvceWYHdvMceY9Nns+zAancssLDlsxKtzZz4xz/QZ+Jh6fJR017DeY8/xvwnniZQUNCpml/huIdr33ufAcccQU5Zt6w9DpWU0m3MSIqHDKR4yEBi9XU0b6lEM4x0/JPx25RSSCGCx4SLmy5t/MiCzlWtdQrAIyZP5polSzghv6wspGmh2HbWV0j76VbK5KAbv89xf/g9Q884i96HTKSw/wCv7dtdfCsR56VLLqdhzQb0XWj7dn3hLbNmU3HiMYSKS+0SSAfEJYOHYOQGWfn627vfEiRsUjTR3MTI86agGT7PSoWKiln95lu0VG5D8/m6rNDdprXiFA3qz8E33ej58nbtQ5yPf3sH8cZm26fczbLJaF0dh0+9lTHnX5hVwC81jYb1a3jjmhuR2q7JhGi6TrIlypavvrRT7oYPSO91Yb/+9DroYAYcfTTDJ59FsCiPzZ9/iZVMZd2LO0c6pGkyhZIH1de0XD15MtOXLNlzAE8Gpi1Zwj19R/gMXXRPKktkWTfXJfDpnPq3Bxj97fMxgvYEHhdAnmaBs2Af/fqXLHv+dYKFhbvcwi51jURzhOolixl+9pm27KiTbrVMk577H4CyYqx990N84VybnN9FS6jpBq3bqulz2CHk9+rtKfNIXad+3Vo2fvpFl/bMSamRaGlhyBknM/CYY+3j2HnoK+fN4asHH7bps90Eb6SulgOvv5JDfvDDdEuSp+5u8dr3rqZmud3FzC64KEop9GCA+rUbiDfXM/DY4zwr7DIbyrSc0zNIz/0PoOcB+7HqzbdIxRJZQbcQgpRSaEIETigua77k4w/NzmhMyM4AGEDoVqlPSGGpHVUXU7EYx911O/2POAormfSKrqUjIpIZtK1+501m//VxgkVF7QZtHS6aaeHPy2Xjx1/w8e9+5/GQ9mZJlGlx6K0/Yf/rriBS27lqqTb90XiS1S5tl+Eu9T9yEprP6NKsnFIgdI3+Rx2ZptMy2YdobLf4Z6nrRGprGXfZdzn8Z7+wa0gy9kNoGp/+4S7Wvv8Jgfy83dLDsP3hIub//SmWv5L2h13DJXVb/BClMJNJeh10CCf+8S6UmWwzoDOkRFmqFOw6mz0K4hRTmQLc239EwJAydwfXQdOINTUx7OxTGXzyaTa/axg7BHeuCxGpq+aDn01zetx2n4y3UikCRYV89cDDLJ7+tEPhpOzHSQonEr6N0Rd+q9MlfzuyEQHWf/gxqXjMaaK076n7fvuR37e3rTnWFVk5h5fN79WDHuMneH9mB8Nx1n3w0W5ZX7var5aR3z6bY26/3U4uOAqabufFspdf4PN7HyRYWLhbxiS9IRZGMIcPf/FLWio3e37w9vepGQZWKkX/I49hxHlnE9uONbIDOguflOH7+w8LukLnuw3g2zygWiU+Idje+irTwgj6GH/FZVnyRm3RYEIIPv71b51mzMAe95kppfDl5PLuD3/Bhk9mpEHsaudaFsf+7ndUnHQU0br6XQKxzUYEqFu1Nl2L7IzXMkJhek4YR7I1gvQZNkW0B2/NZ5BsjdB9/Fj8efnOxttrU7VgAbUrVqMHdq151eXeBxx3OMfdeadt4bcD76YvPuXtm35su3tqz/dC9/to3lLDh9N+lcUQtZVtVEqx32WX4s8LOQxPNmGgCTAlJQCLd2KHZYe+L9O4d/CIgCFkeMfAze5mLRs5jNIRI53YR7Zx5JuOVtc7LHrqOQIFBXv2tGecu7bkvuSVK66hcv5sG8QZyRWpG5z84J/oceCYTldLZQVW8QRr3/vAW1hX23fEtyajBQwiNbXEGhqINdTv5rvBPiH8GiPPm5KeJ+ds/roPPiDptLvvSowQa2yifL+RnPKXB21GxuGU3SRS1fw5vHzZ91AptectSa4RNk2Chfkse+E1Vrz2ss0Jt+GSuCn64kFDKBs9kmQkksWrCyBmmfilzLl/0LDgNKZ1mNzQO8hawPTpYKkSQzrzEkQ2r2gm4rZOrZDp4GC7JxMhSLa28NGvf+tFqV3mOzodtanWBC+cfyln/vNRysfslxVl+3LyOO3hvzH9nHNpWLMRXzinU204rhVe/+HHmD+Mo+l+r3my9yGH8p03XqJqwXznWRHsnkCwDdZuo0ZTNnK0l5ZFKaxkkjXvzUD3d/60cqv9Cvr15PRH/+ZU+5m2+pCzJpXz5/DC+ZeQaIqiB/1dKmaonGDt49/cQZ9DD7O/X1k7JH5c+rN48GA2fvxFVsbRA6Y9aKYE2Li4A93LNgE8FZg2fTp3Dxzm0yEctdpPGftygx0CTGoaX/31r1QvWk6opKRrrO92bowe9BNvivDCBZdwzjP/pHToyKwW9HBZOac98hDTzzmXeGOro29g7fThMAJBalesYtuihZSP2c/WaHAAVjZiFGUjRnXhjSivfQegevkSapet6FQbu0e5xeL483M4/dGHyO3eM2sNpKZRu2o5L150OfHGVoxQcI/66dpds2CQupXrmPXAgxz2k5/a69zOwWeEfO0+3HHLxIfMuW/g0MD1q6fF2hMMlO3xvg7HVhSQHR8xyUiiffBKScP6tcz566P48/O7fMEyjy89GCDe0MqL372chnVrsvQTLNOkeNAQTn34L0hDw0p2Tk/C5mcTrHj1NY+mc2k5ZZpYqVSXvN2jVinljUBY9fobJFtjnb5OK2UiNDj14Qezq/2cNWjavJEXLriUaE3jXgFv5l4ECvKZ9/cnqVu1ou2AznmlYskOrblhN5YWeh5BZwCsgCnTp3Nv/5GaFCIvltFcuf0XSJ+P2mXLPC6zrQj7yz/+iWhdI5qh71WFG2XakzWbN1fx4kWX0bptq9OIaHrVUj33P5ATH7gHMxH3GiU7Dq5N/Hl5LHjiaTbM/MjO6zs1s0LTbKmqLni7KVYhhJ2omTOLeY/+0+463pn1FQJlQSoe4YT776T3QRO9aj836xmpreaF715C04YtnXah9uQksQuGWvj8nvvaxI6LlZqly5DtUZJCEFMmApH3wMAR+pTp09tsP9oRdZMmMWP9ek4qKSkMaVo43p6emVJoPoPmLVvpeeA48nv3sf0tkS52rlo0nw9//qsum9PQGR/MCAZp2VzJpi8+Y9DJJ9pRtputS6UoHjSYnPIiVrzyOnoguFPf1ZZgtVj1+ptIQ5DboztS11BmCiuV7LK3mUwQqd7GkunP8O4Pf0Yqkth55k2AEBrxxnqO/t1tjJh8rscyZDUJXHAh2+YvJZCf1+UuXLv7EAhSvXQZfScdQm6Pnl7Vm31dgk1ffMasBx5C9wXav0dbe1gklWm+UV8TPcLB5vaRxA4W+LZJkyjaXN3fL6Q/0UEmS+o6kepqDv3xTRz8g5uzNcak5NXvfY/lL7yOvyD/axWNdmmkPocfwJlP/B0jGE5XXqVMpK7x+f338PGv/kCouHinFkk4ncqJ1hZySksIFOY69QVdtOHOZsUamolsq8EI5SANbafBm9Q0IrW1TPzRjRySuf7OYEQzGeOFCy9i3fufEiwq/FrAm3ltsYYmKk46itMffTSr8k1qGl/+8X5mTPsdodLSDq/LsIO5RJ2fNdPaSC1n7YErwHZfxciQT6g+yZ08/cpUaD6N77zxIgX9BmZ1EGxbtICnTj0bzfB/IwqPrmBKxcnHcNpf/4LUfCiBV0csNY33f/4zZv/l7wSLi3b+gLnp6mTSnii/V65Zs8ccWDvXOXPrG8Zc/G2O/f0d6RkZ3kRRxStXXsWKl96027O+RvBmBpbJaIRvvfA0Pcbvb6+xs47NWzbxz+NPIRlJ2DShav/x9guNpGVtvGb1ktbtR3vJNvPGysw3RMcVYlJqJFtbGHDckR54MwOOuY8+RjIS/0ZkmbwUZ3ERK199h7d+cLN9p07+X0o75XzkL6cx5IwTSDTtvIPATmTYINH9vr3yFk7QtVMZU6eut+LkYzn69t84WTaZHksrJW/ffAvLX3zjGwOvd3IlUsx55NFsI2BZ5PboRcVJx5Fobmk7fso4nqQQmELlA4yYUdZ2EOcGb/f0HSMFhOPK6rBR0xbf0Bl13rnp1iAHxA3r17Ly9Xfw5Yb3bsDQCRCHSopZ9K/nee+nP01XxAnh+Y9HTJuKvyDPtqqdSQ17yYaMd8bmuKOu2npn/Qzs+PedPKlUysTIDTFp6s+QmuHqbdkDCaXkg6k/Z8E//m13uHxD4HUZCV9umDXvfEDtymVpH9i515HnfQs95OswPlJCEFcWAsIPDR6sbd8A6gH4NkevShipnICmaSnVvt6CkJJka4RuY0fSY//97WIXx/cCWPTU08TqGtB0nW/6ZaVShEpLmP2Xx/j07j9kd9QqRV6P3nQbPZxkbNc6m4VTr2BbTYtkJEq0vp5ES2vbD4IQJFpaidbXk4xEPXFq2UG3QrtrH4tSNmIohf0GpktVHW3jL+6/h68eeKTDDpev1ZXTNBKNrSx88inP8AlNQwHlY8bRY/9xJFoj7Z6AAjCVRVDqMpqS4UysZgF4hONXSGXlCgRCdbx5qUScIaedjNTSPpvUNBItTSx/6bWvjXnofJqzkHkPP06svi6rNhml0EMB6Gy2S0qn0CZFtL6BeGMDml+ndMRgRp3/LSpOOspRC8ouOTXjCQadfDSjLziXspGD0YMG8cZGovUNmImkN/6rMwk8ZSn8+eGs09BWs2xk7iNP4M+zM3D7wsttB1v52lvEGuq8INN94Iacdord5bKTh1ihkELYbT0ZPrDuug8CWyIKEjkJx30Q7QQzZjJFTmkRg048Me3rOFTV6nfeoX7teoIFhd+o+7D9A5eIxigbPQ4jnJOeAI9dedaydZtTE9AxcAESLa1YZpL8Pr3oc+hJ9J10GOVjx5Dbsxea7mPNe++w4uW37QqyjLLCVCzGiG9NYcDRx2KlkjRv3UzV/AWs/eBDNs78nIZ1m5Caji+c4218uz6hrtO4YQtWKukVodtp3BxKhw9j/YzP8OXlwj6w/u58ksYNm1j5xhuMOu87HqUGMPD44wjfea+dtNFkm3sgECSUQgkRuq9irHb9qnmmi1kd3Hbm6QgjFfJLTYtZHbsPieYW+h5+FHm9+qSDNyfyXfr8i0ip7zMDUtIgVhxyy402K2JZduZWk2yY+QnVi5Z5fHFb4He1epUy6XngeEZ86xwqjjuOQGFxhpW3sFIp4s0tbVoTIQTx5hanYk4jv3c/8nv3Y/AppxFrqGfNu++w6OnpbPpsFkJIfOFwVlt/dro2QO2ylaz98D0GHnOC148mdZ2Db76BjZ9+0ekT5euywlL3sfSFlxl17nleeaqyLMJl3ekz8WCWvfAagYL2s7WmUgSllHErEQKab5s0CWbMyGYhpDLDGsJ2sts/wVCWycDjj3GKs5RXLlm/djVbvpzTKQXvr49Os/nIwWecRO+DD/WuFWELRX92170oizZb5d00dLS+nm7jRnDao3/mW88/y8hvnUegsNhOJyeTdhG/U+ml+9uf6qP7A45gdPbnAgWFDD9nClOenc7pj/2F7vuPJVpf76SHtXYMicZnd92PmYh5MgPKsugx/gCGTzmTWEPDHssMdKkbEQpROWc+NSuWe+B1A9eKk44nrXjXDu6UQtq9c+FMNkKCrfUwddIkFCKU3E6pu033oayYvkdMsiP5DH9y1VtvE61v/EYk+Tu63mBhHhNvudmL8l09isXPTmfTzFltzlSTuk6iqRk96OOo23/BuS88S8XxJ4ISXg0DUiINA2kYaD4DMxGndVtV2xZYSlqqtmAmYmg+w/scUqZ/n1IMPO4EvvXcMxx756/w5QaINzbtUMts6/SG2frVAhY8+WS6i9nx6Q++8QZC3Yr3vhTWLgVzkkRTCytffyPNYjmMTO9DDiHcvaxjIXFnZIGC0H0VFcIdGKO5gzcm6yGfEKLE7OA5cNmHXgfvz9jvXpj2JYVACMUnt/+OlsoatH1k0qU9drWBA66/ikEnnmyDVEpbFaapntevvh4raXoaaB5XqWnE6urpc/iBnP7IQww4+lhbt9jhaL05EkJQt2oFy156kdl//Suf3/NHVr/9nu2XZt6/k3bf9NkXLH3hRTbM/ITW6ip8uWFCxSXeTAo3GBaaTvmYsQw6+XjqVq9k26JlGKFQmzRm1YKFDDvrdHw5Yc+yBfILgBSr33oPXzjnGxtSsz0AlaVIRiOM/NZkj/tVCnw5OWye9QU1S1egB/3tYscCNCE1pXwtb9ZvSz0DSBxKwkSEdlZ5JoTATCXpe/ihniVwtc3q1qymevHyTpf/fR2BWzISpXjwAMZffrkzUzidi//yTw/SsMaWavK6Y53281h9PftddSFn/+ufFA4YZFehOUVNdoFQipVvvMoLF17Iv045k/duvY3lL7xBw9oNmIn2lXuspEnD2k2sfPUd3v/xL/nXKWfx3HfOZ/krL6EsexA5zjVapkl+n/6c9eQ/OPD6K4k1Ndqt966FcrogmjZV8sX9f/RcCOl8fuxFF1M2ahjJ1ujXMtK3M26EKyRes2JZBl9uY6XvpMNQZqpjmTKlCEiJUlYQYPGkScgRZWWOb6tCO6WjLAtfOESvQw7yNtx1HzZ8/IntPuwjfpdwproffPP1+HPzvRlqUtOoXbmMeX9/kkBmiaezyfHmRo745U846pe/ttPPTkDrWsnV777JU6edycuXXs2atz8CSxIqLSFQWIDu93tccuZkJe+t6xihIMHCAkKlJQgkG2Z8zmtX3cBTp5/JyjdeS09lcjZdKMnhP/s5R98+lWS0NUte1i1dXPjPf7Nt0XyvDgWlMEI5HHLLDZ7C+j7hRkhJsqWV9TM+dkCdvpdeBx6IP3/nMz+UHZCHAJaUzUCbvmQJk4E+xaWlAjSrXUDYXGZBv14cdP11SN1w1cMQTtlk/er1aAH/N+4+uExJn8MP5PCf/dwRJ5HeQ/fuj35E9cLl6WHYwpZ2ijc3c+Svf8H4y69MK804xHtrdSXv/PCHzPzt3bRW1eLLzcUI+klGIiRbW9Oab86tJyP2uFYzHk+/EwlS8TipaIxUNOrwxfY1tWytZvmLr1CzYgk9JuyHP68AnNPCMi16jB9Pbq9urHz1DVuTwuk7k5ok0Rqleetmhp55piOQYsclxYMHUzl/LjVLV9on4zft1jlzOYSEYWef5ZWQIgSB/HxWvv46LVXV7WtuuA+uQp5YnN9w1yd1No128KBBhrAwUk4k2Db/a3OZ3UaPRPcH00eqFMQa66lcsLhLpD+7iHxEGhqH/ugWu7xTWV5t7Nr332HVa+9mFdhL6Qh//OKH7HfpZXbFmiY9bnv9JzN4+we30rhuC4HCAo8yTLREGXvxt+k98RA2fDKT+X9/Cl9uLsnWVo6+/ZcUVVRktdR4xU7OpmX6s+/96Kc0b9nKypffpnL2fI79w+30P/IY58GwA72RU84j0dTC+z/9JQFHU8MyLQL5eax9Zwar3niVQSed6hXNgODQH93CxplfoEy1D2yLQgsE2LZkGZGabYRKymw3wjSRho9uY0ZTNX+prbnRzu8wlUIKDCn8BpDQATRL9wc0TUQ74n/tM43u48elsz9KgaaxbfFiWiq34dsHsm92lVY9oy/8Ft33298GgDO8MBWP8cnv70Zoaf0vqelE6+oYfdG5HHDNdTuAd/H0f/POzT8BtHRJoqNiibDY77JLyO/TnxWvvEaiuRXNb/PM5ePG0m3UyE5ft+b3YyaTBIuLiNY28uJ3L+eo229jzAUXei1BVirFfpddTsO6dcz56+NOoY7pKBb5mXnnPfQ74ij0QNCruisbMZrR509h9l8e/0YLe7xg1tCJVNVQtWgR/Y84yhZScdDa84DxLHji6Y7dWBQhqRMxU34PwEqIgCYc/rcdh1+ZFnooQLfRo9P+rzPtfetXX2HGE4iccLqwxbEyXs9jVu+01+ObLv/riuNNCMxEkpxuxRx84w2erplrfRf88x9UzVlob6RpIjRJoqWF7hNGceQvf+kFeC54Fz71L97+wY8xQmHPCrqNnVITDD3zNPJ69qFywRy2LV5Iz4PGkorFadpYyUsXX4GVSGJZJipl4csNMuX5f5PXoydfPHA/n935gK3HYJrofj/JSCu6z4eZSKD5fUjL4J0f/JRkNMqEK67yhEiUZXHE1KlsW7SYLbMW4MsN290oOSGqF61g7mOPcMDV16ULyJXigOuuY8WrbxGvb0Z0VWfM9nucccR73qracY9tIiDFli9n0f+IoxxhbftzpcNHYOQE01Oi2uSD7WlgQhAAmnWHDPYrhV0v22H6uITC/v3TN+B8ceW8BWi6jtAkQtkJglQ8Yfd7edkklU4MujcuhM2hGoZDTTndqZa1+zJK9fUcfPNPyO3Ry5MNRQpat1Uy608P2RvuuD/KtND8Osfe+TuMQMi7VqlpLHv5Bd6+6Uf4wnn2/AjT8hII8cZGjrljKmMuuASA8tH7cdEHMwCLeFMj/zr5DOpWraf3xPEEi4tIxeIYwQBGKIjQNPJ796LXwePw59mF8dWLlxOti6H5fFmJoUBBIR/+/DcECgoYOeVczzWQho9j7/gd/zrlLMentK2tPy+Pr/78CMPOPJPc7r1sh9BS5JSUccB13+PdH/7CLuDfDSvsjlwQTvBlppJYyZSnxLTjrGZnn6WdIdR9fqRhY0QzfFTOW+AFdu6nCvsPILd7Oc2bq9pVP1LCSTIq/AD6VPthMVJOFX+79FkiQX6/3gQKijwsCilIRlupX70WqRlE6+pBQKi4kJJhg8jv25vcHt0IFpXiy7HrMMxEnFhjHdG6Wlqr6mjespnmrVXE6upJRRMITaL7A2g+w7YgtvO4Uy7T5ajLRg9j7MUXZVFK9lT3+2naXEWouNBxE2y/96AfXEPZiNFpcGgaW+fN5u2bfoQRCnsWfPtXqLgEgIYNa4nW1aLpOsWDh9vBl4CC/n2Y8uy/aavxe9iZkxl2ZrpJcdnLz/PaFTegBQJe/YLNNoA/N493f/gzCvv1o6ej8qlMk+LBQzng2iv56Fd3EiqyTxTN0IlU1/PpXfdw/F13g5mmDkd/+zss/vezVC9a4QSvO5l1LAWINBtiJpKk4jEs08QIBggWFRDu3o3cnr0IdysiWFRCoLDEY6FSsSiR2m20bK2kceMWGtauI7KtFmUppOGjYf0GEi3N+MK5noU2QjkU9O9D/dqNaAEftOG3CwSm7SkYD40fj15UUaGhMMwOAjjhjD4tHjTIodNMz4rWrVzBtkVLyOvVi35HHsqA446h+9ixhLv3QIidU2rKShGtq6N+zWoq5y9ky1ezqZq/iJatVSSjMaS0hbI1p+BbQNv1s47G7cRbbkyLCzrp4G2LFrDoX8/aufaU6czkiFNY0Y/9v/89xyLjFOs08fZNP8SMmxg5/nY7NVJxuxt71oMPMuuPDxMuL+aC996ksG8FViqF7guilADLZPYjfyVaW8P4y68gVNKNDTNnsPK11+k76XAGHnuibTjaaZwVmkQlBG/ddAvnvfIigfxCb57zfpddxtLnXvL4bMs0CeTns2T6i4w671x6TDjAo9U0n5+JP7yJF75z2Y677JyGrj6DSpmkojZropSJHggQ7t6NbmNG0mPCfpSPGUPhwIEECwsRsnMlsy3btlI1bx5r3n2fte/NoGbxMmqWLaHHhAPtE9fZq6JBFax5+0MEos1ATgEp+yqNWGOjrkulG0qgtae2nuneFA8euAOlYeTkcvgvfsyIKZPJ7d5zB7/Zy3CrtAuB66oIgZA6oZIyQiVl9DzgYMZfDvGmBupWraJy3ny2zp1LzZLlNG7YTKyh3qaODLuDQeq6pwYfrW9gwLGTqDjh5Kx6X1B8/LvfY8aT9nhWx61IRlrZ74pb8efmZ7W6fHbPPWxbuHynxeAufxksLqSgfx9yygqRumEzHh5BL0Ao5j36JDXLlzPsjDMIlXRj42ef8uFv72CSaVJx/MkdtjPZ4iwhapev5dM7/8DRt//Wc3WMYA7jr7yUt274kW1VTRMkKBM++f2dnPPvpxCks3z9jzyGipOPZeWr7xAsKvQURK1kimQijpVIghT488IUDe5P6fAhlO83jvLRoymqqLBPlzauD7eofzsXwv6fQGiScFl3wsd1Z+BxJ9JaXcXS554nUFiUxpLz2aKKgR2mv10pVoGQWH5DNy3N8OmQ6sDntMljSX6fgd4vcTewaGAFB11/Q9bNuL6Ss39pX8a9UJV+ALyNVk6FmBD48wrovt8Euu83gXGAmYjRsGE92xYtpnLOXKoWLKZ+zVqitXbBCwq0gMHEW2/23BtLWUipseL1V1j33sf4823h5kzrO+Kcc7zFl1KybclCO8FRuHP5K1vWCg689gYOvPpaEBIjaJdC+vNySUXi3u36C/IJFRXZA8wBIxgilFOEkZPTRvDTRuTtjLpa+OR0hk8+m+7jJnjgG3rGGXz1l4dpXLfZHsxiWvhzw2z46HOWvfgCw8+anMVpT/zhzax970Nat1UjpEDqGqGSIroNGEbZ6BF0328cZSNGkt+3L5rh3wGsXiJFbKdGlJHNtP+v45I6Qa8b24Agp7QbE676Xpb7h1O/XDRwIJpP36nLqAtJQpiGLqUydCFJqp2NiFVYqcSOjrUz0dKbJ+FmkDI6DXaWyHT1wFzQ2wFBeqih5gtQXDGE4oohDDvjLPtIqtxMzfLlVM6dR83yVQw9/RTbl3WzOwqSkVY+vfMeeyMytIqTkVaGnH4xvnBeljT+l398gFRrnEBBoNO1zEJIW5xAQTLaQrypiXhjs92y77Itpmn/Pve/LcsLcDufnBGYiRRf3v8gpz/2qJc6NoI5DDvrND7+zV12ssIRX9GDQT67634GHnMsvnC+8zApigcN4bSH/8ySZ1+geHAF3fcbR/GQwYS79WjTuqYBm22QbJdDepsrtrOSO7JYZtpNyegvTKfG0762MpWXqGnPoGp2IZmhKzB2Fu+7fufGz2Yy8LjjMC0LzU0Ze/UBadC6N9Cwfi31q1dTv3YNsfoWEi3N+HML8OcHye3Vk4K+/cjv3cte4O111TI6CtyNdouHhKYRLu9JuLwn/SYdlfUwuRG51DTmPvYY1YtWZLkDlmlhhHMYctop7qohNIOaZUtY8/YH+HJzO6ed5rASM++4nbmPPkmwoAClFGYiSay+hbJRQ52HvWvqECzTxJ+by9r3P6JqwTy6jR6Lcu5pyKmnMuvBvzl9fe4UziB1K9by1V//xsSbb8nqWu5/1DH0P+qYNr8j0z3KXldnf7T0HSVaGmncuImG9eto3rSZWEMr8eZ6jGAuwcJcCgb0o6iigsL+FVklBsqhMDO/x7IsNMNg46cznTilY8UOu6cQQwel78xK2s15uSx66jlGTJlM6bCR6SDKDQA02wxVLpjH2nffZ/1Hn1C7YhXxxmZn/IDKED2xf94IBcgpK6VwYH+6jRlFzwP2p3TYUHLKyr2ALXMRvQZKy3RNdTrwFKQn3QtB85aNfPXnv9nqNhmdEcnWCOX7jaRk8DDHlbFdgSXPP08yEiNYFLKtcuZCtQVo5wdyunWnbMQI/OFce4B2PMbmWXO7hGvNXAPl0IRmi8mSZ5+n2+ixXkFM4YCBlI8dxcZPZjnVZxaWmSKQn8/ch//O8HPOprBv/6wZFtlrl+0OZGYKM/KFtFRVUrNsGZu/nEXVvAXUrVlHZFs1yUjMc2nszKd9nEpdx5+XQ/GgCnofehADjz2W8nHjPDBncsOaYVCzfAkL/vlvuxm4g9MpfbXK0IVA78xSS00jFY3z4kWXc/Tt0+h35FHORBto3rKRla+/wYrX3qBq/iISLVE0nx894McXzk0viJsocRZPmRYtW6tpXL+Z1W9/gGYYhEoKye/bh5Khg+g2ZjSlw4ZR0K8fwaKSHdUvLduCKodeSSu1a8z8/Z1EqusJFhZkAFiQisfpPfFgu1jdUbFJtDSx9NkXSMVjROtqs/wvIYVXqrg9bQcw4YrvMeGK72X93eNHH+2NXN3tUkaliDc27HAtZiLJkmef56AbrydYaM/VE4ZOn4kHs/6DmQjhJJOUW8zfyCe//T2nPvQQWMpzmVRGiYBXgJTx9dG6ahrWrWPbkqVUzV9A7fKVNK7fSKS2HjORRNMNNJ8PaRj48/3pByFzj5XNaFTOXcSmL2bz1Z8foWzkMAaddDyDTj6Jgr4DHNnXJOtmfMj7P/4FiaZIp6Yx2aex0nQQ0uqEtbBHsfpprarjpYu/R9moYRT07UW8qYVtC5fSsrUK6fNjhIKEiu0iGZeU7+i3az7Dpsgca5JojlI5ZyGbv5gDPIUeCJBTVkJB/76UjRxO6fBhlAwbRkH/fvhCuQi0HXyvOY/8lSXPvrJDi4qyFJpPp+cBE3YIkibeelOWDKjr5yVamvj83r+QbI1lP0DOTdWtWuUMfTEoGzkCIxSy08LxyG6XgVqmiZET4NCfXI8vnJdVgeYORPROBeeSu48fvwP5b5km/vw8VrzyFp8Pu5uDbrjJW6NMsCYjLdSvXUv10iVUL15K9eKl1K9ZR6S6llQ0BkKiGTZgfTlhRFh41tP1Z9vdYwlGTsg7GarmL2Hzl3OZ9eDDdBs9HH9+mMZ1m9m2eBlC6p0Dr1MbjBKajkJTAjrjrSnLQvcZgI9tC5ZROXsRQgr0QIBgUZEH2F1RrvEWwl1YXcMwQvhclsKyiNQ00LxlG+s+nImQEl9OkHB5N4oq+lMyfBjl48YQKi6iZWsVy196hZVvvLtjW5NTCRUoyKeoYlCWFQ0UFDHyW99ph++NMOvPj5BojmYpybm/e86jf2PWnx4jt7yY77z1CoX9K9Jqk2bHCRjlBMDb/4yyFJrfYNR3LkD3h3YeRAJFFRUEi4tINEcQGaLVyrLwh8PMvON+ts6dz7AzTyevVw8itfVUzptH9eJl1K9ZS8vWKhKtUbAspOFD8/nQ/QGMYCgj0N65QWoLbUqlP2OEQvhyckhFE6z/8DNveI79PapzUrLu9aCkjlDSYwA6CziUPdHGOypU13UgZ/q6rpU2dDszJ8JeINa0uZL6NRtY+cZ7SN1Wy0nF4oDEn5e7w0IIAalkkoIBvcnv3Tdr8zMDmO0tcLyhsW1/1m1PMk3MRBIzmUr/nFO+KTQdodG23oTTpSGdWIA22J14QyOyxJ9tgb3aWs1r6QIId+tOXu/uVM1fhmFkN9UqpewA8J2PWPPWB+hBH6l4EpUyEZqO5vehGT6CBf5so+JY1y6t5/GSFhJfbjiNoV0sAnPcRqkrhVRi9y7k6yzDYztQ6z4fesBvZ2ycp9zvt9Um2xKvVsrVS6ulbvUKigYOcg4i6fjNcrsFsnlMoYt2AyxlWfQ+5CCw7MlJ/tx8+9oCARrXr+HtW25BKYvWKrvNynLoNCuVwgjlsOHjz3nvxz+mfs1a9OCO6V2hC3vyEm2l+VXWVjZsWEfrNjul3WYNgWXhywsDNv3m94WcSN+ul+hSI7QLhmq3P+4QYLoUgn2rAX4XQG1mg7pDa6EUmq4RrWvi2Snnk9enJ+22I2ecVVYyRaIllqH66HDfli1EPez0cxh2+jlZS2smkyRboyz853SUsvCFcpB+iT8vD6lpdneyoVO3ch2VcxbZx3UozRvbAjExXrzwMqSh70QB1h7x2bRxC5Hq+h2mzLdF/dm3YP5H7vsOIL6/YvhQ/otebjmflUh2umxQ9/vTOHdmDuf2Kqd0WIWToLCXU+o6scZmts5egJCaLert/LzCYvyV3yVc3p21733Amrc+SouYtHWEKkjF452m4+yqvn1Pj2Ov7+d/G4Azi1d2210SAiuRtAG2Q8ZM2vGBgkRrK0pZtoUNBEg0N6Ms0662CwR2rkK5K71se3gk/6e+dP4LX27T5K4cVW0FYFrAz478jcJKmuhBg6N+8lNCJaWsff99lj77KoGCgnRw1Jloe1ceMiH2CSmp/wH4a3jFG5uwzM4VdQsh8efumMhQkKFgpHaw7prPYPiUyfjDBcSbm1j81Auehtz21rXNjhSliNY3dHrWs5SaHdX/twF4dyac/Uf7v4kEoy+YQq8DD2mTntqehUi0NPLpXa74nMOvClCpFKlksk33RKVMhK6I1TdgBHOJNzeTjEbRI5E2I32p67ZKjztqy0lkHP7zW/GF89thIVyc202jW+bMYtFTzyL1fUNU5msDsKUU/5FMxHZF2G5Ovb3j2R2ZVTigN8fecUenv8aMR/jiTw+QaI7i1ucr08JfkEdOWbd06nS7aN8IB9ADAaSmkVNaStmokbYORea1OZ+N1dcTqa7xyi3dRMbIcyej+UOdus5hZ5/B1jlzqF60st2OC2+KvFvDQjbn+x8HAUAXAkuA3OU5k1J4vl+XNWV2AqxuUGUmU5iJBFYyaRcH6RIradoSpW1onbnEoZlMkWhpQg/mpIuR8IiErGNdCEG0oSHr3qSmEW1qZuiZJ3DsHXc5QtWyw0Bx+NlTGHbmOTv8iFuL8dWfH+LDqb8mVFqSttBKEW1oIFTcRiJDZBS0OPdgJuJ2S5aUbZ6prsKmlUraA2RMC2XazInmt2sa3En2qisbbXcWSDs3sqt5BbfMWEcJS0gh1U7rgTMCCyFIRWNei7keDHgE+h4nOLbrdnU7BlKJhC1Wh0IP+skpLaagf19Khg+j+7ixBAryaN1Ww/KXX2Xdex9jhMNZG6CUQjMMu0drw3pKh4/Kqs6SGQ9kBuLR2hIqVMqeGeco7nQ2cNz+pfnsSZV6O6Ijmq45Qok7BorKUumePylp2LKJ5i1b226GFIJEczN9Jh3MsDPPIKdbCfGmVjuVvGQZDWvW0bqtmngkZhcB+Qy7CdNptO1KUNtrZhuSZDRmr72hYwSDu3QSCMACSwdldXZglJDSSZvGKRk6iHB5CclInJplK4nU1Dm586DdCNlZMGe6Asq2Sqlk0hlGaKH7fQSKCijtO5iSoUMoGzmMslGj7Qq1DH1e9zVi8rf4/L57+PSO+/CFs1PKUpNEmyJsW7SY0uEjvfaiSG01r33/asx4KkPr2OV8k04iQ3opTz0YoHLeIj696w+olGn3eWcsrZVMEu7ejbEXXeIJAC769zPO3ON0/51yamC3zJqbrt1QylbbaYnxwncvS/vGrn/tNHue9Kd7yevV1wNw9eIlxJtaCBQUZCV0hNRINDdx8C3XcvCNP8haqyGnnmYHtc0N1K9ZR/WSRWxbtJSapcuoX7ueaG09ZixuF/P47PoIqWtpV62TgPZcF0uRjERJxWKESgopHzsef36Ypo1bqVm6AqnZhV2dKeZxOkwsXQlMKTrWBPZ8yHicYGEeR/zq9ww89nh0fwCA+jUrWfHqa6x84x2qFy8jFYuj+wN2qtetut+uAVMpBRmugJlMIHWNQEE+hQN7UzJkMGWjRlI6YjhFAwcSLu/R5p1YTuG78OyU4KDrb6R2xUqWPvcawe0q0gSCjZ9+zogp59r1w0oRKinFSlps+PiLLKlVhV3faicy0pZI8/upXrySLbPm71BLawul1DPm4nMZd/Gl3oJ/+ce/oEyn5cb5eTsNbg8VzxJFFAKVsqhasNQO0lwRLylItEbosf9Ywt17ZrkWGz/9zI4DMq5GahqxxkYqTj6Gg2/8gVMhaGY1TEop8ecWUD5mLOVjxnr30VpdSf3qNVQvXUrVgkXULl9h9yXWN2AmU2hOwY800kqdaSGI9B4r07RBG4+jB3yUjhhMxQnHMfiUkyiqGGLHGck46z78gPd/dhutlbU7VXgS2AUAQmCK+yqG9wxImRvfmbVUCiRMfuYflI8dn/YTERkWJcWWr75i1dtvs+nTL6hbtZZEc6vnatgLp7x5GprfR6ikiIJ+fSgfN4Ye+0+gdNhQcnv0ROo7DoL2Oo2dBcqqYnOaMl3Nh6ZNG/jn8afaVtWxnsIRPgn3KOWCd97Al5Pr+aGLp/+bN6+9haDTot5hIsP9vkxJfGf/7InxzZz99N/pffChdu2sz+ClSy9lzdsf4s/Ps612xm4oS7UbdGWzFRqR2jqOueOXjP3uRd61J6MR/nn8STSu35KdSlaAVHznzZcp6j/Q65rJVH5vay3dQqHsNUjRXLmVmqXL2DLrK7bOmUfD2vVEampJxeJOBaJIP6BOlZkvN4fCAf28gvYeE/b3xiJkto0hoGb5Yp4569ukYsmdzI4Dn5TELbNVV5ZKITsup5RO1++4y86nfOx4zGTSFjLJCKpsQRCdngccZOsXKJO61aupXb6MhnUbidbW2QGEbhAsLiLcvZTC/hXk9+lNqLi0DbBaDn1E2vqlSc+2++2cKjDLNMnv3ZfxV17Mx7/+A6ESe2KPO6+hYe1GNnz8sS1Y7bwqTjiBgv5/pGVrNdK3cypKKZUNRNLDFfsdfSi9DjrE8XNtn3T85Zey+s33sJJmpwewbF8OmozEyOvVnSGnnJJ1z5u//Jz61euyXCYX7AffdDVFAyq8liJ3IExbI1rd63J7EjO7NoSmk9ejN3k9ejPg6GMBiDbU0rRhEw3r1tC0aSvRunrMRNzb44J+vSkeMpSigQOzJBbcovpMy20mU5QMGcGoC77FF3f/2Zbxaicx412TEildEyK50zpgB0N9DzvMWwAydGrdJztzhprUNIorBlNcMbhTm+W18bjdGxlnoacsmfHzsYY6u6lz3jxqlq5gyGkn0/+oYzIETRT7XXY5S5972e7YDfozalkFi6c/R8UJJ3mA9+fmM/ai7/D+z35NKLjrI6qkppGKxQkU5HLEbT8HBLGGOrYtWUSfQw6n10GHsN8VF/LlfQ8RLi93AtJd+/2x+noOvPEqgkUl6UEpQrDkmefSjZDO6ZCKxikc0JcJ37sqPYrL4YzXf/IRS555nqJBA+gxfj+KBw8iVNJtx44X03KOlXQBe7qLWyNYUEywoJhuo8d0bn/deEfKtJSBI0IoHRmEPhMnMuuPf92pa+20kSV1S5BMdYqBEGi+4I7EvzNcxD3iPcBtP8Avi65S2TQK6W5VoVxVmMzQ0qJp82a2LVzI1rnz2LZwEbUrVtNaVW13sVoWy158hfPffJmSIcM9bQZfTphDbr6eVy6/FiMU8PrbfOEw6z78hOqliygdOsK7zlHnn8/Cp6bbQiGdFep2er+SLRGEpjjpwT9SPMguL1n41L/4/N4HuOyzjwkWlnDYT2wFyqXTXyFUWgqi7dLPtlyJZCRK0eABjL3wIq9eWgpB3eoVrHnngyzq0P75CAfdeC2BfMeSOetdv3Y1L118BfG6ZoQukYZuS4ZV9KPbqJF0H78fZSNHkNe7N1IzsrkP1yJnuAmuG9DRHrugdSXDhKZ5nHcWNej0xgkpOhZax5WXspK6oaxkCklHGTnhHCuNG1YDR2QlDho3rGPVW28z7Kwzs10B+wuyjjqV2TOF+3BLb9Kku1ipeIT6NWuonDefynnzqV68lIa1G+zUaspyuEs/RigHX45A6BrR2npm/v5OTn/sMbDwKKbBp55GvyOfZsNHX+DLy3WUHiXxpihf/eWvnHjf/Y4PaOHLyWXSL37C8+dfik5wp3Si0DSsZJJIdS2FFX054Z476HXQRAC2zJ7FF/f+mXhDhLdvuZXTH3kYTfdx8gN/ItytjDkP/wMhbB8x8+Fv77tS8SiH/fSHBDL0LRCC2Q/9jVhjsycUaE+ob6HXxP0Zcc45WScSUjDzjj+QaI6S070M5Shbxhpb2PTpbDbM+ByhCfwFeRT07U3p8GGUjxtL+dgxFA0caEttbYeMzMBz+5rtdLJG2lvuWPhIXQ3LX3yRfkccQeGACsfg2DBoWLcOM5HClyNQHXhaSWWBFAnt5MIeysIq0KSQ7VXH2kObYxT07c2Ao49Ot7cLQeOGtbxw/qWsePV1GtatQWiCQF4uRiinbZXyrLdtgeNNjdQsW8raD95j7iOP8Omd9zD7L4+w4uU3qJq3mEhNHSiBEQxhhIIeB5vZNaAHg1QvXkr52OEUVQzK0C+WFA0awOLpz2XMZbAj/5olS+l7xKHkde9hL7QFhQMHEm+sY/1Hn+LPC7dthZ3BhfGmJvy5OYy56FxOuOcuSoYMA6B6ySJeuvgKEs0RAvl5VM1bRKR+GwOOOQohdfofeRTdx42kaeN6GtatJxmNoft9bbsOhkGkppYxF36LA66+1jl6bXqseukiPvjFr9EDwYygzG6SPPH+P9idJ27nr6ax/pOP+OQ3f7A7tZ2YAEe+Svf77LUNBFApk5at1VTOW8iat99j6XMvsOzFl9k65ysiNdVYqQRGKIgeCHRij20DFa2rZtMXnzPnbw/z0S9vZ+G/pjPs7NPI69nbM3RCSpa9+CKbvvgKIxhsuzAf0GzK1dKUrBXPTJ7M1jmL+vul5k+0UzjiZnF6HTKBKdOfcdgS2wIno6388/iTaVizCSuVQOga4fJSCvr1I79vT/J69iJYWIrmN5CGJNmaxIxHaK3eSktlNc1bK2natJlIdR3J1ohTfxuwKRqt85kh9yErGTqA8155Ec3wpyVgNck7t/6Q+X9/Km2pnKk5vSZOYPK/n/ZUgewMWZJnz/sOG2fOIlhUgJVMZddTJJMUDuzLkNNPZvCpp1DYLy25tfqdN3n75p8Qb2i2uyyc4ClWX8+Q00/k6N/9hlBRqeMXJln3wQcsf/kVVr/1wQ69cVLXidU30n3CKM7597885R/lyLs+9+3zWffhp3YLlWkhdY1oXQMjzj2DE++735MYsLstUvz7zLOpmrcEI2cnY9AcxXpvPSwLM57AjMcd0ZQAoZIicnt0J7dnd8LdywgVlzmjHBxmxbSI1FXRvGULjes307BuHS2V1VgpE83wkduzGxe8/Zo9VTRD1eeFC77Lmvc+to1HO+6VISQJy0zU+cUaAfDHiuE9g1LLbbXaGbLhEPqh0iIueOd1AvmFDqBsf/XFiy5mzdsfepJMZiJpp3md0VH2dCDHzzWttP8rBVKz+92kbjjtM+y+vKquE6mp5ajbf54eEyBt+q6lagv/OO4Uki0xpK55gWa0ro4jf/0zxl9xlTOXzVacaa2uZPrk86hdvpZAYb4HYpuRqeP4e37LqG9f4H13S+VmvvjjAyz4x9NIzYfmN7I2QGp2i3thRV8m3voDBp98sieMZ5kJHjv0KFq2VnushdR14k3NFPTryeTp/yK3R287CLVsF2r+P/7OOzf/3HsgM+Viz3/zZfJ79/XahYSmMf+fj/POTT8l2AXyqpZledKqtiV3m1fVDpV8boxkJ0IMu9W/sZk+E/fnnH8/5VHH9lCeVv5x7Ikdy6umBa5brl+9dJN0zHJcOLJB7XHAmmHQuq2GhrVr0z6tY7HLx47CTCZRlumlBn3hHAKFBQSLCgmVlhAqKiJY6Pz/kiKCRYUECgrwhXPssVwor118dwtLXPWaWX96iJaqLU5u35kIWd6T/a++nHhzs8dqWJaJPy+fT353N1vmzLLTtg4nm1NazhlPPErJsIFEa+vtjFhWKtn+76pF8/n4t7/hyZPPYO7D/8QIhGxtr+2shzuQpWljJa9eeR3Tp5zLkuemE62v9abMe6rxhk6svoGCAb04619PeOB1udVti+bz0a/uwJ+b6xUHSU0j3tTI+CsvJr9PP8fC2qCL1Nbwxb0PYuSEd7tJ03XVXIksaegYOSH8Bfn2vpYUESopyXoHiwoJFNp7LA3dkYa1sBJxuo0dZWctrbSucMP6tbRUVSENo10MeALXEMdJaKCUiplukNXeE6hJUpEoVQsWZCQx7Ff38eNti2OpLGpNZTQxZjY0WikzDdbdtLbtPmh+g5at1Xx+733e3DQ3wTH2wovpNmYYiYgzHd0ZN6tMeP3qG2ip2uJJXCnLoqBPfyY/8y/6HnEwkepqD/h6MMSyF1/h+Qsu4N+nT+Hze/5CrL6ZYGGBk0JX7T5gesCHPzefTZ/N4Y2rf8CTJ57Gm9fdQDIS9QYfRqpr6HXIBCY/8xQFfft7/KzQNCK123jt+9eRiia99nkh7ZFiJcMGsd9ll2WpcwohmPXAAzRt2IIe8HfpWmfvsekNbPTeGXvstfkrWzqhx4QJWQ8HwLbFS0g0R3ZosM36WlfgWoo0gBEyHjNN5E4ScQjJ1rnzs44UgG6jRu180uLX9HK1HxY/9TyV8+c4zZj2AuqBIBNvvRkrY4KlO3u4af0WXrrkcmINtekA0bIIlXTjrCf/wf7XXEaytYVESytGTg4bPvqSde99YsvDFhUidb1zmmqWQlkmvnAO/oICWitrWP7CmyQj9iSjRHMT46+6mHOefpLc7j09S2pTYy28cvlV1K1cjy8cTKvGC4kZj3LIzTfgy8lNc/FSUrNsCfOfeAp/ft43Ox/DdUVTSXJKiuk2ZkxGVaP92jp77k6L0yWCuGWSslTMA3Bdz8VJJURC7wh8ykL3+6mavxAzHsuYZaYIFBRRNnIEqVhs35hJJgWpRIqZv78rXSHhWOGBxx7HwOOPsEe4OtbWVbCpnL2IFy68xAaxk7VSykLTfRwxdRpn/utRykYNIVpTY+voFuTbw1csa5ertFyrowcDaH4fsfp6iocM5Iwn/sZRv/o1mi+QVoeUkkRrMy9degWbZs72hLrdWoZ4UzN9jzyMIaee5tFm7mvmHX9IF+N/4yXcdhVj6chhhMvKndoNO4lhpZJUzp1vD8npYC01ITBRKU3YmSD5zOTJTJsBKBXThWyXDVaWQgv4aVi3gdpVKzLYAWfS4mETdz5p8Wt6KdMikJfL2vc/ZvmrL6drJJwQe+Ktt2CE/PYwEZGuzQ0UFrDli3k8e94FNG7a4AwOTPew9Tv8SM596XmOv/d3FA/uT6yhnlhDo61PJiVS05CalqaQMkj87f/eSqWINzQSa2igoF9vjv79bZz36osMOPpYD7jKsgPN5srNPPft81n/wUwCRdnaxUoppE/j0FtvtoUKla2NLKRkzbtvs+qNdwnk5XW5QMnulVLaDE7viQc7hsPyiuvr162x9TEC/nYZEqUUhpAIJaLXr1qlJgNy8bZt7jEUEdChCZdSkmiJ2JVPGUXfAH0Om+hMWkyxL7xsGSw/n915L8nWFo/5sEyL0mEjGf3dc4k3Zk90d0G8bcEy/n3mZDZ8/KENOE89xkTzBRj17fP59msvc/rf/8LQc04hWFJAorWFaF0d0foGEi0RktEoqXiCVDxBMhol0RIhWt9AtK6OREszgcI8Bp9xIqc98gDfefMVxl18qT1/zwmSBLb49KYvPuPfZ05h66wFOwhvu8zGyHPPpnzsflmsSyoeZeYddyN1307mwH+N7p1p4csN0e+Iwz1Au9Z28xdfEG9s7nDSq1uxraSKAgyfNAmdGTPciDwaRXXowyql0HSDDR/PZPzlV6bdCKUoqhhE6chhbJk1H9/OeMavA8BK2aOnlqxkziMPc+B1N3iZKqUUB1xzDSteeZNobaMjHqI8EPtyw0S21fP8+ZdxwLVXcOB116P5/N4MYwDN8FNx3IlUHHci0fpati1eROXcedStWkvz5o3EGlrtSZyA5vMTyA+R27MXRRUD6DZmFGUjR2VlLjO1ee36jCSzHnyQz+95AGXiJR+ykimJJOHupRx0w/WOq5EeETb/icepnLeIUFHxPmFU3HR46YjBlAwdnj33GVg/4xO7vLWjh00IYspCCRkBGDFjBvo05+/G9O4WX7BpW8InNV9StW/C9WCAyrkLaancTLi8Z9ZoqgHHHMXGmV8iwjn7xDPvjp6a/dCjDDvrLPJ69vYCnFBxKQde/33e/sFPd9hkZZrOUab49I77WfvBR0z84U30m3QU7inlgkkISbCwmL6HTqLvoZOyot5UPGb7uf5A20NcHF7XrSN23ZkNn3zEzDvuYvMXc/Dn5SEMuUOA6I4Um/ij6wmX9/CKZaSUNFduYdYDf8UfzvXqpfcF/9eMxxhw7JFITfcGUAopidbVsOWruY68VvvI0YUgqaxkfiISB5jiBnHPMJkjZ8xAQMQQHRRSKIV0+OANMz/dwY2oOOF4AgV5X6/G1s5oNUMnUtPAp3fd5YHIrZMYde559DxwHPGWlh2CTxtYimBxMdsWLOWF8y/jhQsvYv0nM0DYfKzUdZDCTt4kk5jJZHqUgBDogaA9asBZU8s00z+XTNpVWO7vEbDx85m8cuUVPPfti6ics4hgYXoiUVuZ0fJxoxhz4YXpwM0pG/zivvtp2WInRfaVDmXLtAfFV5x4ggdoN/jd8MkntGypan9GsrOXhpAIZOTi9evVM0wmTaOl88wtJh3zwfYCaqx6/U3PArnHctHACnrsP45ka2SfmZDujp5a+twrbJ71WXp6kbLnlR3ygxtx1GbboeVSGKEQRiiHNW9/yPPfvph/n3UO8x5/jKZN622rp+u2fq5hq02muxFs4t4NVKSmpX/Oqbpq3rKRBf98gmfOmcxz3/ouK15+CyOQg5ETypCt2tEbtMwkB914je03O6eK0CSV8+ew+Knn8G/XifLNuw8RyvcbQ+nQEWn1TqcgafVb76RLJDvgf+0psKoVYPEkO3bTASYz3c4xh/RILJIydSm19koslWVhhEJs+vwrmrdsIrdHrzTdo2kMPfM01r77kS01j7VvWGJpVzbNvONuzv7Xk0jd8AbB9D18EqUjhlCzdJVdQNKG7+7+mT8/DyzF5i/nsnHml4RK76PbmBH0mDCe7uPGkt+3N+HynhjBgDP8JXMFLVKxOC2VW2hYv4FtCxay6fMvqVq4mNaqGqRu4MvJQQ8KJ5Br7yi2h64XDx7IgKOP8cCAAstM8emdd2MmUmiB4D7BPLjBmpVMMOSMU7z6a5eZaa2pYsPMzzFCOR2OFdCEJGqaVtxPK8BtM2YwzQWwAJ4BpixcaN03cFjEJ2SuqVJtPxNOWjlSXcuqN99k3CWXpYvcgYrjjqeg3320bqvbZ8Tm7GRFkG0LlpBobiZYVOxYYQshNAr69WHbgmUQ2smcJgcQvpwch9NMsP6DT1nzzgw0Q8efFyZQWESwKBd/Xj5GyC6+SUZaiTc3E6tvIlpXT7yxCTOZQuqGPfWysDDdBLszzEkwk0ny+/WyuWJv+pIg2dLKtkWLbbfF2jeMh10KmiCvdw8Gn3SyZ5HdJog1b79Dy9YqgoVFHXRgKHxCEhNW5IdLlppTM5DpnfOLJ9kBiFSqWe2EeLEF6/wse+lVrzPAlcb35xUw5PSTSba27DNuhFuAM+aib9tK8k6Vltv5kWhp3XHu2U4eCLeizZcbJlRUhC+ci5m0aN5SSdX85az/8DNWvvYOK197h/UffkbV3KU0bdqKGU/hC+cSKirCnxe2a4rddGunvtxp7mxqzQKJsix84XzGXnQBscb6fSJx4bkPLa1UnHgswaISLNNKF7hjNyJ0huoTCCxLNQMwaVLm82y/bnPotLDpb4mZlqkL2e6vVJaFkROiau5CtsyZ5VSZpeetjTzvW/gL8nZp1MBeA69ToTbmwvM47Mc/RVnpDRdC0LJtK9sWLHa6gnfxtHBHKjgAFFKg++y6Wl9uGH9+Hv78PHy5YYycILrPZ9deuJ8xdyODZ1kYgSDbFi+jYf2a9L04Vu2gG25i/PcuIVJd43XK7Avc76jzv+0yYTZWgKoF89kya45d3tlO6aTKcB9QeksmVrMALIBnJk/m4vXzLSVUi0/IDlvt7aMhycInn/Y4OncRC/tXUHHiMcSbOyamvw7wRmvrGHLGiRx3153OEMQ0+AA++vXtRGoa7Iq4zoAps01m+zfpPkEc2QDcNHNGF3B7n+9sHYnQJMnmCDN+9RuUlfK+0wXz0b/+NaO+cw6RmtpvFMRC00g0N9PvqEl265b7oDn3uujpZ+zhOR2c1AKF3+7aab1h7SLzGSZnObayHae70dzJ4AzLsnvLVr/9Po2b1m+XroX9Lr0EI+T/xhIaUrf1GfodNZGT/nS/fatO65Ll+F8f//Z2ljz9gl3osrOAx2ER0pPbE137TiTSzbE7AbJyRhqsfOkt3v/FVDswcjpQEAIsOO7uPzD4tOOI1tZ9cyBWCunTGX/lpRkPtk35tVRuYeVrb+ELdzwTzg5/FQjZmMk+eMFd5n9MX7IEBURHDk9uaWzJ80lN62gmjRvM+fPD9Jk40eYjnU0Ol3enZsVSquYtzpLP/7rAG2topMf+YzjziccwQuF0y72jpTD74Yf4+Dd/IFhYvNM2d9eyxZsa8eWECHUrJlScT6Agt2vehbn4ckKYySSx+gY03ejQKrn8uy8nh40ff47wQ5+DJ2KlTG+mhhQ6A48/lsq5X1GzbBW+nJyv1ZjY9cnNDDz+SPb/3tXew+kyEPP/8QTLX3oDf15eh9dlCI2YZSYhse3NujpmrF+fndzY/gO3TZrEtBkzuH/QsAZDirJkqv30sjJN9FCA7uPHtcnj7X/Vlax+/V2ngPPrAq+9cKXDKzjj74/Yc9aco8sF79IXnuPDX9xOsKBo5/q7QmCmTDRdcuiPbmLI6aeSU1beYc3qbhkr06K1upqVb7zGl/c/RCqWzEpxt3cKBoqKmHn73eQUlzD6/O9692j7yiFO/dtfee7b51M5Z7FTxZb6moyvQuqS/b9/VZbL5gb2PSZMIJCf23GcpBSGFCSFaLxu1So11cFmuxYY4Ij165kBHFtWkjRTFAgpRbvRZTRG2ehhTPrZz7MuzrVY4fLu1K9bzdav5uELhfY6pSY1jURrhPw+3Tn7qX8Q7tbd60mzTBOp66z/+ENeu+p6dH/QnjLb0TV5elUWpz78ACPP/TbBwiJHI8zo0rfm8xEoKKTn/gfQfcIYVrzymh1wyp37xbo/wOq33qF0+CCKBw+xQeychEYwRMXxx7L2g/dp2VK1e8Hq7ljfxiYGnXo8E668Ku0audhQiryevdgw8xPq16y3pbva2AchBCmllEypra831FguNunIB57mBHM3LVuWsoRqCgrZ7i8343FKhg71Ml5tPUEHXX8tgcI8TEdeam8GDMlojFBJPmc8/ohd9+Cq0TjDv6sWzePVK68BNIcN6HgjpdSINzUx8tyz6TfpKKdtypkzbLbRgbCbb7cCzfWvex80kbGXXkCiuWmnroTbkaH5/Lx+zU1s/vIzr7jeFRAJlZRx5uOPkNerG8nW6F6n2OyB6kEOvvH6dn14FJQMG2LL44q28w0BqWEp1XzNuqWpZ5jMtLZp8R1fk6fbmTlNs+pjltkh8AL54Xb5P2UpCvtXMO6yC7IKyLsevBIzFscI+Tj973+leNCQLPAKTaNx4zpevvhKki1xp/3J6tQxqPkMhpx2ildvIKR0BvVpXh3Dnr496ySl3XBqWQw66URbjKUz1+n0IaqU4uXLvk/tiqW2Bc5Yg/w+/TjjH4/gLwyTikb32l7Yk5oaGP3dcykZOtzWT27rIRTgzw936LollYWQos6J0No+fdo7OSdPnsy106fH760Y1pIj9XDUbMOCCkGsoaXjFK5lMeGq77Hipddp3LC1w4Ll3SXKzXgC6Zec9shfKB8z3nYXnCNUOEmMly65guYt1fhzw52qERBSkorGKKroT7cxYzOaLpUnmVqzfMVO/dSd+ddWMkXhwAGUDh2ekRZWlA4ZTvHQQVQvWtGu4vr2PrQe8BOrb+alS65gynPP2C5URvBUMng4Zz7xCC+cfwnxpogtt2V25V7YHRcF/Xtz4LXX2idcB4durL653cxbUOpEzGTrDauXxaYylSlt2t8OhrxMnj6d6YC0ZG1SWOEd1AodkefaFctRymrziXZ9YX84j8N+eisvXnQVeiDQpQtmJW3F8dMfe4jehxyaBq9TQJOKRXjliiupXrh8h4LwnaZAYzH6HnEYuj+Ype21+avPee7cC+1WnYyi7N0BsC0oLTnzH4/S77BJ3sMlDYMBRx/B1tkL8IVDdGbWi2Wa+MIh6tds4qVLL+ecp57En5vvsUOWaVI+Zj/O+uejPPfti0i2xjulx7sLG0IyGuGwH/+WYGExlmm1Gey6blHtsuVtdiDb0lEKBHUAI1jSvo1s7y+mAFOZynVrFkfjlmoNOFq6mceWHghQvWQ51UsWtT+bwlm4ihNOYsSU04k1NDiq43u6WLZoiWUmOfkv99HnkMO84MVToxGKN2+4ifUzPtsl8HpRtE9nwNFHpeM556FY/MyzxJtaCRYX4cu16x52652bS7CoEDOaYtFT/95hlMKAY4623YhdsJJWyiSQn8fWWQt47fvXYKUSaU5W07BSKbqN2Y9T/vYASOXpdHRJ4NbQyOBTj2foGWc5D41s091RQN2aVVTOX2ifLhlPp8L2fePKit6walnrVGBKO+5DhwDORL6mRE2qjYk+QpMkIzHmPvyoZ23bs5RKKQ7/+c/I611OKhbfpRlobQdYknhTE0fdfhsDjjrWo4/sMbC23/X+z37G0udeJbSLYh5CCsxYnIIBfek+fnxWIiMVi7D5y9l2uWMq6RSlm7v5tjCTSYycEFvnzCPW1JDlL5aOGEnxoIG73CxrpVIEiwpZ/eYHvH3LrV484upKWKkUfQ45jOPu/i2J1uY93gshBKlEklBpIUdMm9qhS+Wm8Oc+/AjxxlbH4GRaX4GpFMKi2sbgTnDQ0V9OYTpTgevWLI4mTNUS3K7lQzm1tkuefZnV776F1HVbNlTtqNBii4V048hf/oJUNOK15O9uoBCpq2Pc5d9l9HcuSIPXDWg0jY9/dzuzH3p8l8HrXm8yGqXf4RMxgjnpInWgcv58Ghzqp0voKMcVa9q0la2zv/L+zDJNNMNPvyMPtwG8iyCzUilCJcUsenI6H067LYN1SYN42Blnc8B1VxGtq9+jbJ2QkmRrC0dM+6nN/lhtBG7KniEtdZ11H3/IwienE9guA6qAgJTELav1ujVLIpMdT2C3AQx43ocu1LaEZantpZHt4Sl+3rz2ZjZ88pFdU+BUplkpM6NlxnYlBp10CmMvOX+3U5yuplnPA8Yx6ec/8wDr+oBC0/j8/nv44u4HbRml3egHU47yzMDjj81aXIB1H3yIGUt0ip/dJVc4ZbL2/Q+973J/+8Djj/W0jXeZzkqlCBYVM+tPf+Xj3/4aoUm7E9vZD2WaTPzhLfQ78hDijU27Ra/ZKfs6Rn7nHIadNdnbA9eYuCI2ONKpW776kjeuvtGT1doejEmlEKhqJxLb+ffv7AemO7zwNauXJpJKNQZtbi47323opGJJXrrkKr566M8kWm3KTOpaugOCdB3o4T//Gd3HjyLe3LJrdI4AlbLQQz6OvfN36P5gOpp3grcF/3yCT35zN4HCwk4roe8YvMUpHNiXHhP2T9NbUkNZJhs+nmkrOHZhMkApC90fYOOnX9gK55pmn1AKuo0eQ/GQit3W3LDMFKHiEj6/58989dCDniFx6yakZnDM73+LPz+cJfjSWe490dJK6cghHDnttizL69aIS92WEki0NPHVX//C89+5mHhTZEftM6UISo2kZTVev3pZ7JnJk5nege/bbiaurdfwJUs4Asgv7B5NKLPAEFKamaljx7dSlmL12++z+q23qF+7moa16zHjMfJ7ZxwrSqH5/PQ4YDxLn38BK5HqdFpW6hrRhgYOvvlahpxyWgZdZv977fvv8MY1P8CXk8vOJAI6zOY1NzPk9JMYdMJJGaLdgtoVy/ji/j+jGb6ure1Q2L171TX0P+owcrv39LTnNN2gccN6Ns783J5ktBvfqwAjEGL12+9TMryCkiFDvbWzTJNQUTFaQGf1G+90umZCCGHXXhiSMx//myflKjJGf238/FOWv/QSy158gU9+eydLp7+E1G2Rv8zvUNgNmymlLCX0zW/UbbOmL1myQ9Zttyywm50bwWS+v2aBaSpV7dN2FEBxLzpQUEDDus3M/uvjvHPzT3juOxdSs3xJ1o0p06Rk8DCOv+u3JGORTj31tjpNlLKRQxh/xZVZNbBCajSsW8Ob19+C1P17RG0pQOqSAccc7f23+7vWz/iYeFPLXkkCuAHxuhkfpy2Y83cDjj7Sprt296FRtu9rBEO884MfU7timceTS0837kK6TxhDoqW1c5beUQs69s7fUDZyTDrz5+xL/ZpVvHTR5Xz4898w79EnaVy/hUBhoVcPvT3vG9A0Uoqa61ctTE2fPLkd1nc3AewGdM9MnszMNUsbWlJmdHtazV0oZZr2bLeCAsLdy7HiJm/d9ENSsUh6YzQNK2Uy6KRTOfRHNxKt7UTdqhBYiTgH3XANRjCU1Q2tLJN3bv0JkZoGe0rPbvKaQtjsQ36/3vQ68CDvwXEHkaz7cAaabnR6APcuYcyyT6b1H31i8+pSeoFu+bjxFFX0JxXdfekumxY0iDe28vYtt2Im42Twg2iGn4NuvBbLTMJO1JXsOutaDr7paoadcZZnzT1tjWSCt35wC4nmKOEe5fgLCux9yQiGswI3odGaMmPBgmDd5MmTvUxwlwLYdohtr0QIVZmy7BnL7S2WMk3MRAJfbpgts+bxwW23OdbXDSLs5r4Dr7uBMRd/u8PiazvKjdBt3EgGnXSKp0ORLs37B+ve/9iuttqDRka3e7bPoYdkTfwRUtK0eRNV8xfb2gV7oShJKQsjFKB68TLq16zOasXX/QH6HnEYyd1gI7KzdbYG3KaZXzHnkUe8/XBHbw04+lh6HjieRAftYNKwO1xGnnc2E3/4I0/fwQuipWTGb37Nxpmz8OflYsYTHUrmCscCK2FVXjl7NpOns0viZLsE4CnYGhLXr1oaTyqrJqhpO91MK5UiVFTE/MeeYsE/n0Dqmjc3zj2+jvnt7VScdLTNTBh625YxHmPUeVOQupHWypWSaF0tX/7xzzbg9rAL12YfNCpOOM5e1ozkzMZPPyVSYzeq7pXaZuUmA5rY8NGObsTA449FDxh7/PB4Yi9/fpiWqq22Go4nIqgx+vzz2i2wsS1vPf2POZRj7/y93eHiTEry5u098zSz//yY3aS5E/pSKUWOphFXVt31q5bFnmFyh0mLPbfA2C34zzCZYEGoJpoyY226Em2Q1/7cPN7/2S/Z+OknaSlSNxLWfZzy5wfoNXGCLSadaYm94YTdGHTSSZ5FdDsQljz3LI3rN+2x9q07BDG3R3dHu9Z+wNyNXPvBDEcqYO+9FCB0nXUzPvKuyXMjxtht+3ucBFIKze+jecs2Fj39tM3sZHSVDzj6GPL79CAVT2R9j90k0ECPA8Zy6kN/dhgg5fVDSl1ny+wveO/HU/Hn5rKz3LdC4ZeSiGkmzFh+9WTS8g57FcDC+aIrZ8/GEmqriVJSiJ10MduiGwKN175/HXVrVqWrpZwMnhEKc/pjj9DzwHHE6hs8EEspSUQi9DxwAqGSMqevzbXeJstffi09g3iP0viSVCxK+X6j7bkNGe5DvKmBytlzOz96a7f9YAs9EKRy3kIiNVVpSsq0MII59JgwrkskbJVlD8VZ8cob9ohfTXOkci0CBYX0OvggktG0OI3UdeKNjZSOGMLpjz2MP68wO4jWNBo3rufVK6/FSilPmrbDQBmBpSAl1JYfbPpcsV2v214DsAviZybbrkTcUtVBqe101rKyLLSAn2hNIy9feiWR2mrP93IXIlhQxJlP/J0eB44lWp9hiS2T3occ5Mwks7wJRDXLl1KzZDl6J6q1OgsgVzkx033YtmgRzTuTPuoaR9ge5VBdS+X8+c69W172s9+RR3RJSbWyFEYgQN3KNVQtmJ++X8dq9jlsYnqgoW6POygZPoiznnycnJKy7RggSayhjpcvu4KWrTXZM5/bw4/D+cYtq/rGlUtjU5nUKc63ywAMMGX6dKYyiRtXL6lrNc2WoK5nJzjaCSJ8uTnULlvNy5ddYefhM+k1xwKc+fhj9DxwP6J19QipoQf9lI0c6Q3Dc5/uTZ9/Qby5dedF3514Is1UimBxIX0PO8w7vt272fDJTFJdnH3rMCuXNFn/0Sdpt8K5vz4HH0JOeWmXKOELKUhGY2z+4gsP1ELY31M6bChGTtAR3qun+4TRnPXkE+kOF3fqp5Sk4jFeufIqts1fZito7iQOsVAENZ2IMltvXLO01i5Un7Hb97GHOz/DfkoNa2vMNJN+qe3UR3RHAGya+RWvfe9qzESsDRAXcdY/H2fAcYfTUrWNYFEhud3LPbC57euV8+Z3iXiKy3L0PHA8eb36eAUnUmpYZor1Mz7putqHTrkRATZ+8hlmPJZ1vIdKy+h96EEkIpE9fmiVk7SpnLfQA7R7hud0KyNUXExr5Tb6TjqIs/75uFNbbKZPTQRmIs5r3/s+6z/8vNPVfj4hiVtmSibYooDFu2l5uwTA0xxm4tply8yUsrYohdI6kQCzUimCxUWsfvMDXr3qasxkfAcQ+3PzOf3RRxg++RTMZJJAQaFnLm19rRR1K1ejGb49jswFAqVMhp11RsZxqkAoqhbMZ9uipZ0qKu8aL8KWsK1ZvorNX81KD1Nx7nHYWWe4Qux79rIsNMNH3arV3vq7CA4WlaKUxeDTjuPMJx4jUFDkJYzcecsKxZs33sSKl9+yB3PvjHHIYJdNJbZcs36JOZ3OJyz2kgW2ayVsV2JZNIFZ6e+EP5wJ4hWvvMWrV34fM7EjiDXDz8l/fpDTHvmz3RqfceRHamto3rQVzTD2mH1IRmMUD6lgwDHHeIGj/TsFy158iVQ0/rXKZAkhsJImy1540XEV0sOw+x42ibJRw/ZYAdQ+OQ1aKrfRUlmZ8ae2ZT75L/dz2sN/Qw/kZPu8QmImY7z2/atZ+uzLhEo7Nxhd4NY6qKrrVy+OTGXSLlNmewXAtiWewdRJk7hh1dLGiJWqy9E7J+rnlvytfPVtXrr0MhItTV6q2a2bEEKj14GHZFkOgKaNG4g1NdnF8XsCYE0jGWll3MXnp0snHRBH62tZ+fpbGDk5OxXf6MqXZVn4wjmsfvt9e/SXkxpXjtUcd8mF3qCdPQkYpW7XfTRu2OB8cXode044EKkb6foGZ09SsQivXvV9lj77MsGiok6B1+Z7dVpMs+H61Uvqp06atEd+b5cDGGDajBlMBa5ftXRbi5lq3hUQB4uLbO3dCy4kUrPNaURMpQdIb1f4oZSiedPWPbaMbjVV+biRjDz3PG80lcsxL33+eZrWb7bnGH+dKpsOG9GytZrF/57u6Q279QvDzz6HXgfvT7ypeY86jO0EUYrGDRu9SfSZvrgr1O2WSMYaannhuxey8rV3CJWU7BJ4I6bZUr96SeUzZGub7TMAdl9TgUB+aEvUNKOhTmTqPBAXFbH58zlMn3wedatWIDTdy9hlgdThgbfOm7tnjqDXQWJx5C+nogdCWUOnE63NzHv0H3bdxTcgj6UcK7zgyadttUmZljeQusERv5qK5tOc4d9ij9Zh65w53iCbzMDWy7BpGg3r1/DM5PPY8NGXnba8llIENY2oacYsEltuAxZDl86x6tKyqhnAEcDNW7dydElhC5bI9UtNSylrp9kjVzi7ees2VrzyKqWjhlLYb4DXIuQeodLQady0ng9//kv7+dudzRMgpU6ktoYjbvux3cPlCqA4FVpzH3uUJc++jD8/7xvTd9N8Bs1bqvCFA/Q++BBvgIsyTXK79yBYUsjyl17xdIh3xw/WfAb1q9cw8PijyCkts5sQXMV3BELT2PT5TF688HIa1m7qtLqPcut7sZIRzdz4g5UrTTfwZ18FsAviZ4DLa2vVUXklzZoUuT5Nakll7XSGnE0h+Um2Rln2wkv48oKUjx2bNXuteukiXvv+dd7o1F0+2h16LFJTw4HXX8UhP7jFqaaygyQpJC1VW3nz+psRriDgN/Ryu12q5i9g8CknelJYrtZD+dixSN1izTsfYIRydi+TpWkkIzHWfzSD8nGjyOvRy1trUCx48h+8cd0tJFqi+NyxBzt9MBR+TcPCSkVT1sYfrlqeVEzlSGZ0+Rrtte15xqHY/tB/qC+gyz46Uo9bZqfy+DZNZpFsbaH7hDH0OugA/Ll51Cxfxtr3PibZGt0tWktIAUoQra/jgOuuZNLPf5Eldm2lTKSu8fq117Bk+isE94E5E0LTiDc2UnHS0Zz+yKPew4bCs8if3XMXn/z2HgL5BXbAt8vrYmtgaAGDfkccSvHgQSSjUbZ8NYets+aiB3M8wZXOPHSGlCiF2WomN/xw7Yr41L1gefc6gDNB/PshQ3xhU++jS6HHzM6B2G0xT0YidkmeE8QY4RwvmNlVIJiJJGY8yuE/v4UJV129HXidaqrn/s0b19xCIL9gn5kxYSvM13PMHb9k7IUXZzSxKpRp15nMe/wxPvjZr5C6D93v2+UHzy2tTLS2YjkTVzWfzxafztA33pnP69c0LEuZKWVuvH717lWY7TMAxuGIpzGD3/cb4svV9d6aFEbMMjs9kjY9zcaVl911VXNX9M/I8XPc3b9j8EmnOpJH2eCtWjiP6ed8Gytld0jsKyOqbM1fhWUlOeffj9Nz/4OzO7Ed/33Ne2/z5vW3EG9owRfO2fXTQ9gTqESGNe2soVDK7qowlZWKktz4g5Ur4+7e79Wl+TrW37XE9/QdYhg+vbdfCF+ks5Z4T2/QmRBZMKAXJz1wH91GjrFnOmu6x4BIXadx43qeOftcWqtq0AOBb3zSaFv3YcYTBArDnPPMkxQPGpoFYrcronbFMl77/rXULluN8TVpAiuHbUgqlUya1oYb1ixNfh3g/doAnAni+yoqNA1fr4DUghFzLytWOjW+oW5FnPvSs+SW99xBQ0JISc2Kpbxy2fdoWLMRI5yzz7gObblBqdYoOd2LOf3RhygbOSarE9j14VtrqnjmrCk0rt+KHvDt1RoOl+eNW2bM0sxN1y5fntqbPu9eZyHae03H7vK/q65One7v0xQ3Ev4cXfcnHQJ9b8BYahrx5iYO/9mt9Jl4GGYyaetWkC7iXvP+u7xy+fdp2VKNbx8Gr3PRaH4f8fomVrz6KgX9e1M8eIjXHyikxEom8efm4c/PZfnLr9mz7/ZGCxR2ejis6cQss6WaxKZbV640nwGu+Tqpxq9z/ZdgJzpubtnKG3XVzccWlMqgJoOmsgd7iS6GsVIK3e/n0B/fanfEehPr7T6ur/76Z144/1KwNPy5Dpcqxb4JXgegQgg0w0essYW5j/wdf16I3gcdnE6/O9Y4kJfLkunPY6ZSXV7H4RqcoNSJmmbDtauXbJlRV6emfs3g/doB7PLErj24tb669biCkpQmRI4mhGhLf21PNlw5KdlxF19EID/Pcyvc79D8PnJ7lGMmYrRUVhFrakIlTaS0RVnszmDxjVDBrkWVUoKQqFSKZCRCorUVIaBs1BDGXnQ+A445mnC38qwpR3aKOMHCfz2FGUt2KYAtZ+igFJDAqrpu1dKaqdgJrGnfwDp9I+NrRAZDce3qGQ13DxgRD0h6hDXdiFiprrHFDu0Wb26kfu1K8nr2sK2Urnsb3W3UGLqNGoO61aR6yWLWf/wxGz75jOrFS4lU1zrTNHV0nx9p2ELUmRG627WwJ/rAIoMydK2bMm2ldjORwEwlkbpGqLSYngeOo/fEg+l72KGUjRrVpjyT3a0iadiwjlhdA3qgC10IpwkzoaxU0lRbblizNOLGNt/YwfRNn4zu4I47+g7XcgzR3S9lOGKZXeJSCClJNDdTcdLRnPbwI948YaFpXi+eyy9nvlqqtrJt0SK2zplL1YJF1K9cTWt1LYnWiF2xJQTSGewtNXtcgWflXCvYxrFLBtiV5YwpME1bgsAVRZRg5ITIKS2hcEA/uo0ZRfnYMZSPGUO4vEe2NXQ1i51SS9uN0BBS8NrVV7Ps+VcJ5O95MsZ1GUJSI2aZrXGR3PqDlStTbQ1d+a8DcCZDAfCnQcOKpJKlUgoR7wKqzQXx/tdezsRbbkHqPs9SuYGcq/2rMqeoZ7zizY00btxA/eq11K5cTuO6TTRt2kikuo54czPJ1lZSsYQtnKec4nOV0Rbv8Nj2MS+RmkQLGPhCYXy5ueSUFZLXsw/5fXtQPHgoBQP6UdCnL/68gh18ejf54rU8OZVzaTfB4vP77uWzO/+EEcrZYxEWpRR+Rw9PCaqvXrm41t6zvZug+I8CME5wh+NH3TNoWMCHLPdLGYiYe26NhZDEm5vpvt9Ihk0+k4rjjie3R6+MY1c5nQbZwFDOZ9vrhUvFY8Qa6ojV15FojhFvbiTW1IAZi5KKx0lGYwhAD/jRAwE0nx9/fiGB/AKMcIBAQSHBwmJ0f6Bd8NjtO8D2D9p219VStZnVb7/L0udeZMuXczHC4T1KxLifzNE0YqYVtywqr1uzOJq5T/tEbLuvBdsuAT61b19R6g+XSEsVa1ISc8oGd/eChaaRbI1gxuPklJfQ88AJDDz2GPocdqgtppe5eabdCZw1/tVtM3IWrasn/SjT9EDT1ve29Z2t27ay4dNPWfP2u2z89AtatlQjfT5HoM/cfeB6WTWFUlbdmmaj+q6qBerrSk78RwN4e5fivoqhAR3ZzS+1YMyyMDtRmtmROyGEwEwmSUaiKGUSLi+jfNwo+h5+GL0OOpCiikFohr9NS+gtWNZcY+XOfoHtZ667FjDjesV2/50JVDKKyttyZSwzSd2qlWz+4kvWzfiEyjnzaamsAiUwQiFPsnS3s2/KlgsL2L5uLClU1Y0rl0a335P/AbjTQLb9rMnApEHDCgWyxC+ltsduhcupAmYiSTIaRVkmvtwwBf37UD5mJD0mTKBs9CgK+/XL7sdrK+qHXaaqOvO5ZLSVhnXr2LZwIVvnzKVy3kLqV6+zOzGkhhEMIn1G+vfttiKnvZa2VoNpIUTNgrxA3V9nz95nfN3/SAC7vvE0zxqP0jVllghBgU9KIplWcQ/4YiHtSfOWaWLGE6TicUDhC4cIl3ejoH8fSoYMpnBQBQV9+pDbozuh0m4YQT9CZmT2OnkyZClrqhTJSIxIzTZatlbSsH49dStXUbtiJQ1rN9C8tZJESysouzpMD/jtarw9BG0muxCQkoRSWFiNZsKquXH98iTYmdPp+zg+9nkAb+8bA/xxwMiAJq0SIURYE4KoZUEXZfIyj27LtDCTCaxEEitli4loPh1fOIw/P49QSSF6MIeDrr+GPocellVn0d7L/ZnKeXP55Ld3kow201pdT7yxiURziy1aohRCN9AMewStKwC+R+5BGxbXLyWWUphKtZhYNdevWhbblxiG/1cAdi3G9IzFfWDgiBCCIiEI60IQc/UTRNdlz9yAKm0xbclT5bTeJFpaKR7cn/Nee4FQUSmWk7ptKxBTloXUdRKtzTx9xtls/Woh/rxcm/1wpPjTCQ0FlurSOgbX8gekxAJMpSIoaq9etbjV9XMX70MMw/87ALdFublAVlIVAeGA0IhZpjMoby/dnpdBA6npxJqaKRs1hBPu+QMlQ4d3+NGG9Wt466Zb2Pz5HCfJkPLiwL1Wf+wBVyOhLFC0pJSqv371kta21pP/AfjrYysyLcb9g4YHJKIQVG5AajJpWSQ9lZ29V9Pgtuf783IY9Z0pDDn1FAoHDsSXk5sOxtauYeUbbzH/iX8RrWnAlxvea5Vv3sMgBD4hMGwaUiFoFpaov3r14mj6RNs32YX/CgC3B+Q/9RumC0PmW0rlG1L6NARxZVNw7m139Y0LKbFSJonmZoxwkLxePQjk2XJY8ZZGmjZtIdHUii8cRvr0Lp1R7IHW+aeGtP1bFHHLSkhJk1Ra4/dXLky6FnfEfzhw/18BONO1yNyYqcOHUxonB0m+UionIDVNAQmlbD7ZTrV1qWshnYZUM5GwxVkAoeloPrt2wtpD5qAtvxZhg9bnsCkxy7QktIBoShFvvX7VKvWf6uP+VwE4y0fertDkT32Ha/gIKyVyBSrok1ITCJLKIuUmEUTX2eb2snhdwiA4D54uBIYjtJewLEshIkKo5jjJ1h+sXOmJN0ydNAlmzPh/Bdz/1wDOdi9sNjPzuHxwwGjNkqkQghyUCCHwBZzxAS6gXaC4oFZf42K537X9NbiAFUBcWShUUigRkdJqMXURuWbJEjP7NPrPocP+B+BOgOK2NizRfRUVQpd+P5YVNJUIKQgIgRGUGlLg8KSQQnkC3m4TlNgOcLsD0kz/1f2NUgh0BFKAJmwp/phlYkFSQEwIFZVCRkLxlvjF69er7U+e22bM+K/Z2P8aAG8PnunOHN7tLdQzw4ezNYHPAH8KFUDhF0IYFhgCpCEkmkiXPyilsDL+v+rEggsEQtjCdMJhRwTYD4qyUGAJpVIWIgEqLpWMC2HFTJFMuv5s1gkzGSZPn/5fuZn/lQBuk8WYNIkRM2a0GZk/w2Q2DFyiG2CAZUgpDUtZhgBDKKE5ut5SCVsST3Ww2JZtwC1QlkCYllCmRCSlJZKWIKVBAkjqBYHUlbNn7/K1/re9/g/8DHee38GDmgAAAABJRU5ErkJggg==";

const IMG2 = {"campus": "data:image/jpeg;base64,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89RCP/8A/vPTz/8A+/8A/wD7DDD3/wD/AMsNfP8A/wDz/wD4AWxXYDosu/01GG0MMMeE2F/3/wD/AE8/4x//AP8A/wD/AP8AAZmvzz/vr73Tz3z/AE7g8/uccYwxw009/wD/AOAQIlwRVJJ/z99f/rD3VRZl9hX3zDDXv7zx/wD48w9GwIw3/wD+/wDPPDrPx8sPD+/DHDDTDDLTv/NNAAAALGbMDB99/rDDDbtJH5DjDDHNBzDhBBDXDDcLkDDT/wD8/wDPf/8A7TXH/wA4T/8AGs80lH10H/FNH24H+EJiMUHHOME8tPW1k0002Un0380UEUEc03Q6XO2nf8PPMUnmUGE08G4IIMKYsILNIJFdr7sM6pBysIIY5+mM4ILNcIK7/wC/uueuD/8Ai1f7uv8AGX889OM//Mtb4MIPKI7yAh0XywyTQzyQSg68hzDSDpjDADMdnjj707iTQAYE6wjwAwSVjgxS2JWhAiSjQQg7hzCgABTDzzxw2+xwgjBDj7gRBmAyzj2EgiijY5CTo3wRWASHFlAzAisZuQwyq8sezzgDSRy0nzRRTQBQCHX3zxzmwyww10Xy/wB+MRNc6dsNRXOtRxaSwpFNMyQkdNJACgGcE9sPaRxwgkhkpj+EZwAE8g9A8pJw88898408888888pA0858oAE8pBc9s88888pARV9hBAE888895pAAAMMIAhE4AgANo0gwc8oAEV9888IAA81oU80tsBAI080c80M888s85AABRA89JBAQkks88ZgAAA08sAYRIIMAM8Nhx88gAA98488884Awc8oA8dMdsc8U8c888g888NAAAMM4888MM4k8408MAsMc48888884gU88tAc8AAcg8888c8AAAA8888888888888888A88cgAAc8gAAc8AcAAcAc8gAc8gc8gc88gAAc8gcA//8QALBEBAAIABAQGAgMBAQEAAAAAAQARECExYSBBUbEwcZGh0fCBwUDh8VBggP/aAAgBAwEBPxD/AMQ4qGbBM6yhOpWFynBfLCzguCMvBpL/APScVkEA1EqpHKXSnQl5Railw1jE5xKMpeWB5EPKaKhbrHOFn/qqLJfMzIhMqKYmcRCOkBu6lZ3C1iZUTRKsplAgVOZAZVwEjAWv8iyXLJeVy5ZLly5cuXLJSXLlmF+A8CjdQdB/yqlSpUqVKwqVKlYV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", "roc": "data:image/png;base64,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"};

/* 原站位址：一頁式版本將量大或需即時更新的單元導向原站 */
const SITE    = "https://www.deas.ntnu.edu.tw/deas/include/index.php?Page=";
const DLICON  = '<svg viewBox="0 0 24 24" aria-hidden="true">'+
  '<path d="M12 3v12M7 11l5 5 5-5M4 20h16"/></svg>';
function initLogo(){ const el = document.querySelector("#ntnu-logo"); if(el) el.setAttribute("src", LOGO); }

/* ═══════════════════════════════════════════════════════════
   雙語：語言狀態與介面字串
   ═══════════════════════════════════════════════════════════ */
let LANG = "zh";
const LI = () => ({ en:1, ja:2, vi:3, ko:4 }[LANG] || 0);
const T = (zh, en, ja, vi, ko) => [zh, en,
  ja === undefined ? en : ja,
  vi === undefined ? en : vi,
  ko === undefined ? en : ko][LI()];

const SECTIONS_ZH = [
  { id:"about",      zh:"學系概況",  en:"Overview" },
  { id:"pillars",    zh:"學術主軸",  en:"Pillars" },
  { id:"vision",     zh:"發展理念",  en:"Vision" },
  { id:"programs",   zh:"學制招生",  en:"Admissions" },
  { id:"curriculum", zh:"課程資訊",  en:"Curriculum" },
  { id:"centers",    zh:"系級中心",  en:"Centers" },
  { id:"faculty",    zh:"系所成員",  en:"People" },
  { id:"location",   zh:"系所位置",  en:"Location" }
];
const SECTIONS_KO = [
  { id:"about",      zh:"학과 개요",  en:"Overview" },
  { id:"pillars",    zh:"두 축",      en:"Pillars" },
  { id:"vision",     zh:"발전 이념",  en:"Vision" },
  { id:"programs",   zh:"과정·입시",  en:"Admissions" },
  { id:"curriculum", zh:"교과 과정",  en:"Curriculum" },
  { id:"centers",    zh:"연구 센터",  en:"Centers" },
  { id:"faculty",    zh:"구성원",     en:"People" },
  { id:"location",   zh:"찾아오는 길",en:"Location" }
];
const SECTIONS_VI = [
  { id:"about",      zh:"Giới thiệu",   en:"Overview" },
  { id:"pillars",    zh:"Trụ cột",      en:"Pillars" },
  { id:"vision",     zh:"Phát triển",   en:"Vision" },
  { id:"programs",   zh:"Tuyển sinh",   en:"Admissions" },
  { id:"curriculum", zh:"Chương trình", en:"Curriculum" },
  { id:"centers",    zh:"Trung tâm",    en:"Centers" },
  { id:"faculty",    zh:"Nhân sự",      en:"People" },
  { id:"location",   zh:"Địa chỉ",      en:"Location" }
];
const SECTIONS_JA = [
  { id:"about",      zh:"学科概要",  en:"Overview" },
  { id:"pillars",    zh:"二大領域",  en:"Pillars" },
  { id:"vision",     zh:"発展理念",  en:"Vision" },
  { id:"programs",   zh:"課程入試",  en:"Admissions" },
  { id:"curriculum", zh:"授業科目",  en:"Curriculum" },
  { id:"centers",    zh:"研究拠点",  en:"Centers" },
  { id:"faculty",    zh:"教員職員",  en:"People" },
  { id:"location",   zh:"所在地",    en:"Access" }
];
const SECTIONS_EN = [
  { id:"about",      zh:"Overview",   en:"Overview" },
  { id:"pillars",    zh:"Pillars",    en:"Two Pillars" },
  { id:"vision",     zh:"Vision",     en:"Development" },
  { id:"programs",   zh:"Admissions", en:"Programs" },
  { id:"curriculum", zh:"Curriculum", en:"Courses" },
  { id:"centers",    zh:"Centers",    en:"Research" },
  { id:"faculty",    zh:"People",     en:"Faculty" },
  { id:"location",   zh:"Location",   en:"Visit" }
];

const UI = {
  deptZh:      ["東亞學系", "Dept. of East Asian Studies",
                "東亜学科",
                "Khoa Nghiên cứu Đông Á",
                "동아시아학과"],
  deptEn:      ["DEPARTMENT OF EAST ASIAN STUDIES", "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY"],
  skip:        ["跳至主要內容", "Skip to main content",
                "本文へスキップ",
                "Chuyển đến nội dung chính",
                "본문으로 건너뛰기"],
  menu:        ["選單", "Menu",
                "メニュー",
                "Menu",
                "메뉴"],
  close:       ["關閉選單", "Close menu", "メニューを閉じる", "Đóng menu",
                "메뉴 닫기"],
  toTop:       ["回到頁首", "Back to top",
                "ページ先頭へ戻る",
                "Về đầu trang",
                "맨 위로"],
  eyebrow:     ["NATIONAL TAIWAN NORMAL UNIVERSITY", "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY"],
  claim:       ["東亞學系", "Department of East Asian Studies",
                "東亜学科", "Khoa Nghiên cứu Đông Á",
                "동아시아학과"],
  claimEn:     ["Department of East Asian Studies", "",
                "Department of East Asian Studies", "Department of East Asian Studies",
                "Department of East Asian Studies"],
  claimSub:    ["於 100 學年度由東亞文化暨發展學系與國際漢學研究所整併成立，104 學年度政治學研究所併入，106 學年度增設博士班。以文化與應用、政經與區域發展為兩大主軸。",
                "Formed in academic year 100 (2011) through the merger of the Department of East Asian Culture and Development with the Graduate Institute of Sinology; the Graduate Institute of Political Science was incorporated in AY 104 (2015), and a doctoral program was added in AY 106 (2017). Its work rests on two pillars: Culture and Application, and Political Economy and Regional Development.",
                "民国100学年度（2011年）に東亜文化暨発展学系と国際漢学研究所が統合して発足し、104学年度（2015年）に政治学研究所が合流、106学年度（2017年）に博士課程を増設した。「文化と応用」および「政治経済と地域発展」を二大領域とする。",
                "Thành lập năm học 100 (2011) trên cơ sở sáp nhập Khoa Văn hóa và Phát triển Đông Á với Viện Nghiên cứu Hán học Quốc tế; Viện Nghiên cứu Chính trị học gia nhập năm học 104 (2015) và chương trình tiến sĩ được mở năm học 106 (2017). Hoạt động của khoa dựa trên hai trụ cột: Văn hóa và Ứng dụng, cùng Kinh tế Chính trị và Phát triển Khu vực.",
                "100학년도(2011년)에 동아문화·발전학과와 국제한학연구소가 통합되어 출범했으며, 104학년도(2015년)에 정치학연구소가 합류하고 106학년도(2017년)에 박사 과정을 신설했다. 문화와 응용, 정치경제와 지역 발전을 두 축으로 삼는다."],
  ctaAdmit:    ["學制與招生", "Programs & Admissions",
                "課程・入試",
                "Chương trình & Tuyển sinh",
                "과정·입시"],
  ctaAbout:    ["學系概況", "Overview",
                "学科概要",
                "Giới thiệu khoa",
                "학과 개요"],
  figFaculty:  ["專任教師", "Full-time faculty",
                "専任教員",
                "Giảng viên cơ hữu"],
  figPrograms: ["學制", "Degree programs",
                "課程数",
                "Chương trình đào tạo"],
  figCenters:  ["系級研究中心", "Research centers",
                "研究センター",
                "Trung tâm nghiên cứu"],
  figDoctoral: ["博士班設立學年度", "Doctoral program est. (AY)",
                "博士課程設置年度",
                "Năm mở chương trình tiến sĩ"],
  seal:        [["東亞","學系"], ["EAS","NTNU"], ["東亜","学科"], ["EAS","NTNU"], ["EAS","NTNU"]],
  motto:       [["全球視野","在地實踐"], ["Global Vision","Local Practice"], ["世界的視野","地域での実践"], ["Tầm nhìn toàn cầu","Thực tiễn địa phương"], ["세계적 시야","지역에서의 실천"]],
  mottoText:   ["願景為聚焦東亞人文社會科學的各項議題，成為區域研究及教學之重鎮，培養學生具備獨立從事文化與應用、政經與區域發展之基礎能力。",
                "The department's stated vision is to concentrate on questions across the humanities and social sciences in East Asia, to become a leading center for regional studies and teaching, and to equip students to work independently in culture and application as well as political economy and regional development.",
                "東アジアの人文社会科学における諸課題に焦点を当て、地域研究および教育の拠点となること、そして学生が文化と応用、政治経済と地域発展の分野で自立して取り組める基礎力を養うことを理念として掲げている。",
                "Tầm nhìn của khoa là tập trung vào các vấn đề khoa học nhân văn và xã hội ở Đông Á, trở thành một trung tâm nghiên cứu và giảng dạy khu vực, đồng thời trang bị cho sinh viên năng lực làm việc độc lập trong lĩnh vực văn hóa và ứng dụng cũng như kinh tế chính trị và phát triển khu vực.",
                "동아시아 인문사회과학의 여러 과제에 집중하여 지역 연구와 교육의 거점이 되고, 학생이 문화와 응용, 정치경제와 지역 발전 분야에서 자립적으로 연구할 수 있는 기초 역량을 기르는 것을 이념으로 삼는다."],
  mottoSrc:    ["— 發展理念", "— Development Principles",
                "— 発展理念",
                "— Định hướng phát triển",
                "— 발전 이념"],
  extGo:       ["前往原站　", "Open on the official site — ",
                "公式サイトを開く　",
                "Mở trang chính thức　",
                "공식 사이트 열기　"],
  extNoteAdm:  ["招生簡章、報名日程、修業規定與名額每年更動，請以原站公告為準。",
                "Admission guidelines, deadlines, degree requirements and quotas change annually. The official departmental site is the authoritative source.",
                "募集要項、出願日程、修了要件、定員は毎年変更される。公式サイトの公告を正とする。",
                "Thông báo tuyển sinh, thời hạn nộp hồ sơ, quy định tốt nghiệp và chỉ tiêu thay đổi hằng năm. Trang chính thức của khoa là nguồn thông tin có giá trị pháp lý.",
                "모집 요강, 원서 접수 일정, 수료 요건, 정원은 매년 변경된다. 학과 공식 사이트의 공고를 기준으로 한다."],
  extNoteCur:  ["修業規定、課程地圖與各項表單皆有版本更動，請至原站取得最新檔案；各學制的課程專頁亦可由上方「學制招生」進入。",
                "Degree requirements, curriculum maps and forms are revised periodically. Current files are available on the official site; each degree program's course page can also be reached from the Programs section above.",
                "修了要件、カリキュラムマップ、各種様式は改訂されることがある。最新の資料は公式サイトで確認されたい。各課程の科目ページは上記「課程・入試」からも辿れる。",
                "Quy định tốt nghiệp, bản đồ chương trình và các biểu mẫu được sửa đổi định kỳ. Tài liệu mới nhất có trên trang chính thức; trang môn học của từng chương trình cũng có thể truy cập từ mục Tuyển sinh ở trên.",
                "수료 요건, 교과 과정표, 각종 서식은 수시로 개정된다. 최신 자료는 공식 사이트에서 확인할 수 있으며, 각 과정의 교과 페이지는 위의 「과정·입시」에서도 접근할 수 있다."],
  moreTitle:   ["更多資訊", "Further Information",
                "関連情報",
                "Thông tin khác",
                "추가 정보"],
  moreLead:    ["下列單元內容量較大且需即時更新，於原站查閱最為完整。",
                "The following sections are extensive and updated frequently; the official site holds the complete and current versions.",
                "以下の項目は分量が多く更新も頻繁なため、公式サイトで確認するのが最も確実である。",
                "Các mục dưới đây có khối lượng lớn và được cập nhật thường xuyên; trang chính thức lưu giữ bản đầy đủ và mới nhất.",
                "아래 항목은 분량이 많고 갱신이 잦으므로 공식 사이트에서 확인하는 것이 가장 정확하다."],
  resZh:       ["相關資源", "Resources",
                "関連資料",
                "Tài nguyên",
                "관련 자료"],
  resEn:       ["Resources", "Resources",
                "Resources",
                "Resources",
                "Resources"],
  resDesc:     ["系務法規、表單下載、外語門檻、活動花絮與相關連結。",
                "Departmental regulations, downloadable forms, foreign-language requirements, event photos and related links.",
                "学科規程、各種様式、外国語要件、行事記録および関連リンク。",
                "Quy chế của khoa, biểu mẫu tải về, yêu cầu ngoại ngữ, hình ảnh hoạt động và các liên kết liên quan.",
                "학과 규정, 서식 다운로드, 외국어 요건, 행사 기록 및 관련 링크."],
  carZh:       ["職涯導航", "Careers",
                "キャリア",
                "Hướng nghiệp",
                "진로 안내"],
  carEn:       ["Careers", "Careers",
                "Careers",
                "Careers",
                "Careers"],
  carDesc:     ["職涯進路、產業實習、系友傳承、徵才訊息與國際移動。",
                "Career pathways, industry internships, alumni mentoring, job postings and international mobility.",
                "進路、インターンシップ、卒業生の実績、求人情報、海外派遣。",
                "Lộ trình nghề nghiệp, thực tập doanh nghiệp, kinh nghiệm cựu sinh viên, tin tuyển dụng và cơ hội quốc tế.",
                "진로, 산업 인턴십, 동문 사례, 채용 정보, 국제 교류."],
  goSite:      ["前往原站", "Open official site",
                "公式サイトへ",
                "Mở trang chính thức",
                "공식 사이트로"],
  footAddrHd:  ["系所位置", "Location",
                "所在地",
                "Địa chỉ",
                "찾아오는 길"],
  footAddr:    ['106308 臺北市大安區和平東路一段162號<br>臺師大校本部　誠大樓9樓',
                'No. 162, Sec. 1, Heping E. Rd., Da\u2019an Dist.<br>Taipei City 106308, Taiwan<br>9F, Cheng Building, NTNU Main Campus',
                "106308 台北市大安区和平東路一段162号<br>台湾師範大学 校本部　誠大楼9階",
                "Số 162, Đoạn 1, Đường Heping East, Quận Da’an<br>Thành phố Đài Bắc 106308, Đài Loan<br>Tầng 9, Tòa nhà Cheng, Khuôn viên chính NTNU",
                "106308 타이베이시 다안구 허핑둥로 1가 162호<br>국립대만사범대학 본교 Cheng Building 9층"],
  footMapLink: ["在地圖上開啟", "Open in Google Maps",
                "Google マップで開く",
                "Mở trên Google Maps",
                "Google 지도에서 열기"],
  footName:    ["國立臺灣師範大學　東亞學系", "Department of East Asian Studies, NTNU",
                "国立台湾師範大学　東亜学科",
                "Khoa Nghiên cứu Đông Á, NTNU",
                "국립대만사범대학　동아시아학과"],
  footEn:      ["DEPARTMENT OF EAST ASIAN STUDIES, NTNU", "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY",
                "NATIONAL TAIWAN NORMAL UNIVERSITY"],
  copyright:   ["國立臺灣師範大學　東亞學系", "Department of East Asian Studies, National Taiwan Normal University",
                "国立台湾師範大学　東亜学科",
                "Khoa Nghiên cứu Đông Á, Đại học Sư phạm Quốc lập Đài Loan",
                "국립대만사범대학　동아시아학과"],

  /* 區段導言 */
  leadAbout:   ["教育目標：培育區域研究及其應用能力之跨領域人才。",
                "Educational aim: to train interdisciplinary specialists in regional studies and its applications.",
                "教育目標：地域研究とその応用能力を備えた学際的人材の育成。",
                "Mục tiêu đào tạo: bồi dưỡng nhân lực liên ngành về nghiên cứu khu vực và ứng dụng của nó.",
                "교육 목표: 지역 연구와 그 응용 능력을 갖춘 학제적 인재 양성."],
  leadPillars: ["兩大領域構成該系的課程與研究骨幹，各學制皆在此架構下規劃。",
                "Two fields form the backbone of the department's teaching and research; every degree program is planned within this framework.",
                "二つの領域が教育と研究の骨格をなし、各課程はこの枠組みのもとで設計されている。",
                "Hai lĩnh vực tạo nên khung xương của giảng dạy và nghiên cứu; mọi chương trình đào tạo đều được thiết kế trong khuôn khổ này.",
                "두 영역이 교육과 연구의 골격을 이루며, 모든 과정이 이 틀 안에서 설계된다."],
  leadVision:  ["發展方向共六項，並依短、中、長三期設定重點；末節就師資、學生、課程、研究四個面向歸納。",
                "Six directions of development, with priorities set over short, medium and long terms; the closing section summarizes these across faculty, students, curriculum and research.",
                "発展の方向は六項目からなり、短期・中期・長期に重点を置く。末節では教員、学生、カリキュラム、研究の四つの側面から総括する。",
                "Sáu định hướng phát triển, với trọng tâm đặt theo các mốc ngắn hạn, trung hạn và dài hạn; phần cuối tổng kết theo bốn phương diện: giảng viên, sinh viên, chương trình và nghiên cứu.",
                "발전 방향은 여섯 항목이며 단기·중기·장기로 중점을 둔다. 마지막 절에서는 교원, 학생, 교과 과정, 연구의 네 측면으로 정리한다."],
  leadPrograms:["四種學制對應不同的培育目標與學位授予；點選學制查看招生管道與官方連結。",
                "Four degree programs, each with its own aims and award; select a program to see admission routes and official links.",
                "四つの課程がそれぞれ異なる育成目標と学位に対応する。課程を選ぶと入学方式と公式リンクが表示される。",
                "Bốn chương trình đào tạo, mỗi chương trình có mục tiêu và văn bằng riêng; chọn một chương trình để xem phương thức tuyển sinh và liên kết chính thức.",
                "네 개 과정이 서로 다른 양성 목표와 학위에 대응한다. 과정을 선택하면 입학 전형과 공식 링크가 표시된다."],
  leadCurric:  ["課程涵蓋「文化與應用」與「政經與區域發展」兩大領域，各學制另訂修業規定、課程地圖與轉輔系辦法。",
                "Coursework spans the two fields of Culture and Application and Political Economy and Regional Development. Each program sets its own degree requirements, curriculum map and transfer or minor regulations.",
                "科目は「文化と応用」「政治経済と地域発展」の二領域にわたり、課程ごとに修了要件、カリキュラムマップ、転科・副専攻の規程が定められている。",
                "Các môn học trải trên hai lĩnh vực Văn hóa và Ứng dụng, Kinh tế Chính trị và Phát triển Khu vực. Mỗi chương trình có quy định tốt nghiệp, bản đồ chương trình và quy chế chuyển ngành riêng.",
                "교과목은 「문화와 응용」과 「정치경제와 지역 발전」 두 영역에 걸쳐 있으며, 과정마다 수료 요건, 교과 과정표, 전과·부전공 규정이 따로 정해져 있다."],
  leadCenters: ["依發展規劃設立主題型研究中心，帶動相關領域發展；目前設有三個系級研究中心。",
                "Thematic research centers were established under the department's development plan to advance work in their fields; three departmental centers are currently in operation.",
                "発展計画に基づき主題別の研究センターを設置し、関連分野の展開を促している。現在三つの学科附属研究センターが活動している。",
                "Các trung tâm nghiên cứu theo chủ đề được thành lập theo kế hoạch phát triển của khoa; hiện có ba trung tâm đang hoạt động.",
                "발전 계획에 따라 주제별 연구 센터를 설치하여 관련 분야의 전개를 이끌고 있다. 현재 세 개의 학과 부설 연구 센터가 운영 중이다."],
  leadFaculty: ["專任教師 16 位，含教授 8 位、副教授 6 位、助理教授 2 位；另有合聘、兼任與榮退教師，以及行政團隊共同支援。",
                "Sixteen full-time faculty: eight professors, six associate professors and two assistant professors, supported by jointly appointed, adjunct and emeritus faculty together with the administrative team.",
                "専任教員16名（教授8名、准教授6名、助教2名）。ほかに兼担教員、非常勤講師、名誉教員および事務職員が支えている。",
                "Mười sáu giảng viên cơ hữu: tám giáo sư, sáu phó giáo sư và hai trợ lý giáo sư, cùng với giảng viên kiêm nhiệm, thỉnh giảng, danh dự và đội ngũ hành chính.",
                "전임 교원 16명(교수 8명, 부교수 6명, 조교수 2명). 이 밖에 겸임 교원, 시간강사, 명예 교원과 행정 직원이 함께 지원한다."],

  /* 成員欄位 */
  fField:      ["研究專長", "Research interests",
                "研究分野",
                "Lĩnh vực nghiên cứu",
                "연구 분야"],
  fTel:        ["電話", "Tel",
                "電話",
                "Điện thoại",
                "전화"],
  fMail:       ["Email", "Email",
                "Email",
                "Email",
                "Email"],
  fWeb:        ["個人網頁", "Website",
                "ウェブサイト",
                "Trang cá nhân",
                "홈페이지"],
  fOffice:     ["Office Hour", "Office hours",
                "オフィスアワー",
                "Giờ tiếp sinh viên",
                "면담 시간"],
  fTeach:      ["授課領域", "Courses taught",
                "担当科目",
                "Môn giảng dạy",
                "담당 과목"],
  catFull:     ["專任教師", "Full-time",
                "専任教員",
                "Cơ hữu",
                "전임 교원"],
  catJoint:    ["合聘教師", "Jointly appointed",
                "兼担教員",
                "Kiêm nhiệm",
                "겸임 교원"],
  catAdjunct:  ["兼任教師", "Adjunct",
                "非常勤講師",
                "Thỉnh giảng",
                "시간강사"],
  catEmeritus: ["榮退教師", "Emeritus",
                "名誉教員",
                "Danh dự",
                "명예 교원"],
  catStaff:    ["行政人員", "Administrative staff",
                "事務職員",
                "Hành chính",
                "행정 직원"],

  /* 中心 */
  cEst:        ["EST. ", "EST. ",
                "EST. ",
                "EST. ",
                "EST. "],
  cFocus:      ["研究重點", "Research focus",
                "研究重点",
                "Trọng tâm nghiên cứu",
                "연구 중점"],
  cDir:        ["中心主任", "Director",
                "センター長",
                "Giám đốc",
                "센터장"],
  cSite:       ["網站 ↗", " — website ↗",
                "ウェブサイト ↗",
                "trang web ↗",
                "웹사이트 ↗"],

  /* 招生 */
  aWays:       ["入學管道", "Admission routes",
                "入学方式",
                "Phương thức tuyển sinh",
                "입학 전형"],
  aFields:     ["主要研究領域", "Principal research fields",
                "主要研究領域",
                "Lĩnh vực nghiên cứu chính",
                "주요 연구 영역"],
  aNote:       ["注意", "Note",
                "注意",
                "Lưu ý",
                "유의"],

  /* 交通 */
  tMetro:      ["捷運", "Metro",
                "MRT",
                "Tàu điện ngầm",
                "지하철"],
  tBus:        ["公車", "Bus",
                "バス",
                "Xe buýt",
                "버스"],
  tBusNote:    ["於「師大站」或「師大一站」下車，可搭乘下列路線：",
                "Alight at NTNU or NTNU (1); the following routes serve these stops:",
                "「師大」または「師大一」で下車。以下の系統が停車する。",
                "Xuống tại trạm NTNU hoặc NTNU (1); các tuyến sau đây có dừng:",
                "「스다(師大)」 또는 「스다1(師大一)」 정류장에서 하차. 다음 노선이 정차한다."],
  mapCap1:     ["周邊街道圖", "Street map",
                "周辺地図",
                "Bản đồ khu vực",
                "주변 지도"],
  mapCap2:     ['校本部配置圖　<b>誠大樓</b>位於校區西北側，鄰近側門',
                'Main campus plan — <b>Cheng Building</b> stands on the northwest side of campus, near the side entrance',
                "校本部配置図　<b>誠大楼</b>は構内北西側、通用門の近くにある",
                "Sơ đồ khuôn viên chính — <b>Tòa nhà Cheng</b> nằm ở phía tây bắc, gần cổng phụ",
                "본교 배치도 — <b>Cheng Building</b>은 캠퍼스 북서쪽, 쪽문 가까이에 있다"],
  mapOpen:     ["開啟 Google 地圖 ↗", "Open in Google Maps ↗",
                "Google マップで開く ↗",
                "Mở trên Google Maps ↗",
                "Google 지도에서 열기 ↗"],
  asOf:        ["本頁內容整理自原站公開資訊，資料時點為 2026 年 8 月。",
                "Compiled from publicly available information on the official departmental site; content as of August 2026.",
                "本ページは公式サイトの公開情報に基づき作成した。内容は2026年8月時点のもの。",
                "Biên soạn từ thông tin công khai trên trang chính thức của khoa; nội dung cập nhật đến tháng 8 năm 2026.",
                "본 페이지는 학과 공식 사이트의 공개 정보를 정리한 것이며, 자료 기준 시점은 2026년 8월이다."],
  langLabel:   ["語言", "Language",
                "言語",
                "Ngôn ngữ",
                "언어"]
};
const t = k => { const v = UI[k]; return v[LI()] !== undefined ? v[LI()] : v[0]; };

/* ═══════════════════════════════════════════════════════════
   漢字斷句：瀏覽器可在任意漢字間換行，會把複合詞攔腰切斷
   （如「政治學研究所」斷為「政／治學研究所」）。以下將關鍵
   複合詞包成不斷行區段。窄螢幕解除，避免溢出。
   ═══════════════════════════════════════════════════════════ */
const NOBREAK = {
  zh: ["東亞文化暨發展學系","國際漢學研究所","政治學研究所","國際與社會科學院",
       "臺灣師範大學","國家科學及技術委員會","臺灣東亞文明研究學刊",
       "國際關係與外交學分學程","海外華人研究中心","中國大陸研究中心","日本研究中心",
       "碩士在職專班","漢學與文化組","政治與經濟組","政經與區域發展","文化與應用",
       "和平東路一段","誠大樓","東亞學系","跨領域","學士班","碩士班","博士班",
       "社會科學碩士","社會科學博士","專任教師","區域研究"],
  ja: ["東亜文化暨発展学系","国際漢学研究所","政治学研究所","国際与社会科学院",
       "国立台湾師範大学","国家科学及技術委員会","台湾東亜文明研究学刊",
       "海外華人研究センター","中国大陸研究センター","日本研究センター",
       "社会人修士課程","政治経済と地域発展","文化と応用","和平東路一段","誠大楼",
       "東亜学科","学士課程","修士課程","博士課程","社会科学修士","社会科学博士","専任教員"]
};

/* 僅處理標籤外的文字，避免破壞屬性值 */
function applyNoBreak(html){
  const terms = NOBREAK[LANG];
  if(!terms || !html) return html;
  return html.split(/(<[^>]*>)/).map(seg=>{
    if(seg.charAt(0) === "<") return seg;
    let s = seg;
    /* 「106 學年度」之類：數字與量詞之間的空格不應斷行 */
    s = s.replace(/(\d+)\s(學年度|学年度)/g, '<span class="nb">$1\u00A0$2</span>');
    terms.forEach(w=>{
      if(s.indexOf(w) === -1) return;
      s = s.split(w).join('<span class="nb">'+w+'</span>');
    });
    return s;
  }).join("");
}

/* ═══════════════════════════════════════════════════════════
   英文版長文內容。專有名詞採官方英譯：
   臺北市道路譯名、臺北捷運站名、校本部配置圖建築英文名、
   各研究中心標誌所載英文全名、《臺灣東亞文明研究學刊》官方刊名。
   ═══════════════════════════════════════════════════════════ */
const PAGES_EN = {

"A-8-1": { body:`
<h3>History and Position</h3>
<p>The Department of East Asian Studies belongs to the College of International Studies and Social Sciences at National Taiwan Normal University, and occupies the ninth floor of the Cheng Building on the Main Campus, Sec.&nbsp;1, Heping E. Rd., Taipei. It was formed in academic year 100 (2011) through the merger of the Department of East Asian Culture and Development with the Graduate Institute of Sinology, admitting undergraduate and master's students in two divisions: Sinology and Culture; and Politics and Economics. The Graduate Institute of Political Science was incorporated in AY 104 (2015), and a doctoral program was added from AY 106 (2017), completing the bachelor's, master's and doctoral sequence.</p>
<p>Since AY 107 (2018) students have been admitted without divisional separation. The department focuses on Northeast Asia, China, Southeast Asia and adjacent regions, emphasizes cross-disciplinary integration, and organizes its work around two pillars: Culture and Application, and Political Economy and Regional Development. The undergraduate program provides a general humanities and social sciences education leading to the Bachelor of Arts (B.A.). The master's programs, including the executive master's program, train specialists capable of independent research and practice, leading to the Master of Social Science (M.S.S.). The doctoral program centers on advanced research in the humanities and social sciences, leading to the Doctor of Philosophy (Ph.D.).</p>
<h3>Faculty Size</h3>
<div class="cards3">
  <div class="minicard"><b>16</b><span>Full-time faculty</span></div>
  <div class="minicard"><b>8</b><span>Professors</span></div>
  <div class="minicard"><b>6</b><span>Associate professors</span></div>
  <div class="minicard"><b>2</b><span>Assistant professors</span></div>
</div>
<p style="margin-top:16px">Faculty expertise covers East Asian Sinology, history, literature, cultural studies, international relations, political science, cross-strait studies, finance and economics, supporting the academic formation and career development of students across all programs.</p>
<h3>Department Chairs</h3>
<ol class="chron">
  <li>Pan Chao-yang, Professor</li><li>Tsai Chang-yen, Professor</li><li>Chang Kun-chiang, Professor</li>
  <li>Chiang Po-wei, Professor</li><li>Lin Hsien-tsan, Professor</li><li>Chang Kun-chiang, Professor</li>
  <li><b>Lin Chang-ping, Associate Professor</b><em>Current</em></li>
</ol>
<p class="chron-note">The official Overview page lists chairs through the sixth term, Professor Chang Kun-chiang. According to the Full-time Faculty roster, the current chair is Associate Professor Lin Chang-ping. Names are romanized here for reading convenience; the department does not publish official English spellings for every chair.</p>
<h3>Distinguishing Features</h3>
<p>As the only East Asian studies department in Taiwan covering all three degree levels, it is also a teaching and research unit devoted to interdisciplinary, integrative expertise, offering systematic academic training to students committed to East Asian regional studies. Students studying or pursuing further degrees abroad can articulate with leading universities in Europe, the Americas, Japan, Korea and Southeast Asia that maintain East Asian studies programs.</p>
<h4>Research</h4>
<p>Full-time faculty bring strong academic and professional records together with substantial research output. Their work spans East Asian cultural thought and its applications, political economy and regional studies, and includes numerous projects funded by the National Science and Technology Council as well as industry–academia collaborations.</p>
<h4>Internationalization</h4>
<p>Faculty backgrounds are diverse and include several international members. The department actively encourages undergraduate and master's students to undertake exchanges in East Asia, Europe and the Americas. The proportion of international students is high, so that peers learn from one another across cultures.</p>
<h3>Curricular Character</h3>
<div class="deflist">
  <div><dt>Bachelor's</dt><dd>General education in the humanities and social sciences, cross-regional and multidisciplinary in aim. Coursework spans both fields and includes Japanese and Korean language courses, drawing additionally on NTNU's Southeast Asian language resources. Representative courses include Introduction to East Asian Culture, East Asian Cultural Heritage, Southeast Asian Politics and Economics, Theory and Practice of Regional Studies, and Cultural Policies of East Asian Countries.</dd></div>
  <div><dt>Master's</dt><dd>Training in independent thought and independent research. Research areas include East Asian culture and thought, cultural creativity and application, East Asian political economy and cross-strait relations, and globalization and governance; course selection offers both breadth and depth.</dd></div>
  <div><dt>Executive Master's</dt><dd>The Executive Master's Program in National Security and International Affairs trains senior professionals to safeguard national security and handle international affairs. Its curriculum comprises three fields. <b>International relations theory</b>: building scholarly grounding through theory and practice, strengthening the capacity to read and analyze current international conditions. <b>National security studies</b>: examining Taiwan's past experience of security threats and present threat perception, and considering how soft and hard power may respond. <b>East Asian regional studies</b>: developing accurate understanding and analysis of political, economic, security and cultural questions in the region.</dd></div>
  <div><dt>Doctoral</dt><dd>Training advanced academic researchers, anchored in core-field coursework and reinforced interdisciplinary capacity. The curriculum emphasizes four aims: East Asian perspective, local practice, cross-domain integration and critical thinking.</dd></div>
</div>
<h3>After Graduation</h3>
<h4>Further study</h4>
<p>Graduate institutes in literature, history and philosophy within or beyond NTNU, as well as institutes of political science, diplomacy, public affairs, national development and mainland China studies.</p>
<h4>Employment</h4>
<ol>
  <li>Academic researchers at research units or think tanks working on East Asian Sinology, cultural application, political and economic questions, and regional development.</li>
  <li>Administrative and civil service positions in foreign affairs, culture, political economy, overseas Chinese affairs and national development.</li>
  <li>Journalists, editors, travel professionals, marketing, planning and business management roles requiring specialist knowledge.</li>
  <li>Diplomatic and professional translators working in Japanese, Korean, English or European languages.</li>
  <li>Professionals in cultural and creative industries and the service sector.</li>
</ol>
`},

"A-8-2": { body:`
<h3>I. Directions of Development</h3>
<ol>
  <li>Building a cross-regional, multidisciplinary curriculum under aims of specialization and diversity; recruiting varied specialist faculty; accumulating scholarly standing of influence at home and abroad; and strengthening teaching quality at an appropriate student–faculty ratio.</li>
  <li>Actively pursuing research projects and grants within and beyond the university so that research and teaching support one another, organized into the two clusters of Culture and Application and Political Economy and Regional Development, discharging social responsibility and cultivating younger researchers.</li>
  <li>Attending to students' foreign-language ability: some courses are taught entirely in English, Japanese and Korean courses are offered, and students are encouraged to draw on NTNU's Malay, Thai and Vietnamese offerings. Graduation requirements include a foreign-language proficiency test.</li>
  <li>Cooperating with relevant departments and institutions at home and abroad in line with national and social needs. The doctoral program was established in AY 106 (2017), while undergraduate foundations and applied competence and master's-level independent research capacity were strengthened.</li>
  <li>Pursuing international engagement, securing cooperation agreements with leading universities worldwide, attracting international students and visiting scholars, and raising the department's influence within scholarly communities at home and abroad.</li>
  <li>Valuing local research and local practice, so that students use specialist knowledge to affect society and assist others, realizing the principle of global vision and local practice.</li>
</ol>
<h3>II. Priorities</h3>
<p>The short, medium and long terms advance in sequence: from curriculum and the establishment of research centers, through databases, dual-degree arrangements and the running of an academic journal, toward a position of leadership within the region.</p>
<div class="deflist">
  <div><dt>Short term</dt><dd>East Asian culture and application together with political economy and regional development as priorities; distinct educational aims and complete curricula for each degree program; and thematic research centers to advance work in their fields.</dd></div>
  <div><dt>Medium term</dt><dd>Dedicated research rooms and databases; dual-degree programs with well-regarded overseas universities together with mutually recognized coursework; and continued publication of the <i>Taiwan Journal of East Asian Studies</i>.</dd></div>
  <div><dt>Long term</dt><dd>To become an academic unit of leading standing in Taiwan and across East Asia, joining theoretical research to local practice, building a complete framework of theory and application, and offering counsel on the country's direction of development.</dd></div>
</div>
<h3>III. Summary</h3>
<div class="cards3">
  <div class="minicard"><b>Faculty</b><span>Teaching, research and service are weighted equally; faculty scholarship is expected to meet the demands of the times and to carry the public intellectual duty of the university professor.</span></div>
  <div class="minicard"><b>Students</b><span>Cultivating professionals with independent thought, initiative, responsibility, teamwork, an international outlook and sound character.</span></div>
  <div class="minicard"><b>Curriculum</b><span>Focused on analytical study of East Asian subjects, raising students' command of the cultures and political economies of East Asian countries, with emphasis on language training.</span></div>
  <div class="minicard"><b>Research</b><span>Covering Sinology, East Asian history, culture, thought, politics and trade, centered on regional observation and the gathering, analysis and application of political and commercial intelligence.</span></div>
</div>
`},

"A-4-5": { body:`
<p>The Credit Program in International Relations and Diplomacy brings together coursework in international relations theory, foreign policy analysis and East Asian regional studies, and is open to students intending to work in diplomacy, international organizations or international affairs.</p>
<div class="deflist">
  <div><dt>Related courses</dt><dd>International Relations Theory, American Foreign Policy, Globalization and Global Governance, International Politics, International Organizations, International Law, International Fisheries Law, Taiwan's Diplomacy, International Political Economy, and International Politics and Taiwan's Foreign Policy.</dd></div>
  <div><dt>Teaching faculty</dt><dd>Hsu Hsiao-chi, Wang Kuan-hsiung, Kuan Hung-chang, Fan Shih-ping, Sun Kuo-hsiang and others.</dd></div>
  <div><dt>Program contact</dt><dd>Cheng Hsiu-fang, Teaching Assistant　<a class="mono" href="tel:+886277495396">02-7749-5396</a>　<a class="mono" href="mailto:hsiufang@ntnu.edu.tw">hsiufang@ntnu.edu.tw</a></dd></div>
</div>
`},

"A-8-5": { body:`
<p class="lead">No. 162, Sec. 1, Heping E. Rd., Da\u2019an Dist., Taipei City 106308, Taiwan　(9F, Cheng Building, NTNU Main Campus)</p>
__MAPS__
<h3>Getting Here</h3>
__TRANSIT__
`}
};

const ADM_EN = {
"A-A-1": { dg:"Bachelor of Arts, B.A.",
  intro:"Aimed at general education in the humanities and social sciences, cross-regional and multidisciplinary in scope. Coursework spans both Culture and Application and Political Economy and Regional Development, and includes Japanese, Korean and Vietnamese language courses, giving students cross-cultural understanding together with a foundation of knowledge and perspective on East Asia.",
  ways:["Application admission","Placement by examination","Star Program recommendation","Second-year transfer examination","Transfer, minor and double major","International student admission","Overseas Chinese student admission"] },
"A-A-2": { dg:"Master of Social Science, M.S.S.",
  intro:"Aimed at training independent thinkers and independent researchers. Research areas and faculty expertise are wide-ranging, and coursework spans both Culture and Application and Political Economy and Regional Development. Whether a student's interest lies in East Asian culture and thought, cultural creativity and application, East Asian political economy and cross-strait relations, or globalization and governance, course selection offers both breadth and depth.",
  ways:["Recommendation and screening","Entrance examination","Pre-master's study","International student admission","Overseas Chinese student admission"] },
"A-A-3": { dg:"Master of Social Science, M.S.S.",
  intro:"Formally the Executive Master's Program in National Security and International Affairs, it joins the theory and practice of international political economy to train senior professionals who can safeguard national security and handle international affairs. The curriculum centers on two fields, comprehensive national security affairs and East Asian affairs bearing on national security, supported by courses in research methods, East Asian regional security and political-economic conditions, and cultural soft power. Beyond faculty from within the department and the university, senior officials from relevant government bodies and outside professionals are invited to teach and take part in seminars as the coursework requires.",
  ways:["Executive master's entrance examination"],
  note:"Classes are held at weekends on odd-numbered weeks, on an alternating schedule; the actual timetable follows the university calendar. The program is not opened in any admission year in which total applications fall below twelve." },
"A-A-4": { dg:"Doctor of Philosophy, Ph.D.",
  intro:"Established in AY 106 (2017) in response to the multidisciplinary and cross-domain direction of the humanities and social sciences. The Department of East Asian Studies and the master's program of the Graduate Institute of Political Science had already merged in AY 105 (2016); the doctoral program builds on the former political science doctoral program, with research directions adjusted, scope widened and faculty strengthened. Its axis is interdisciplinary regional study joining Sinological culture with political economy, taking Taiwan as its standpoint and focusing on the states, societies, histories and cultures of East Asia.",
  fields:["East Asian culture and thought","Cultural industries and their application","East Asian political economy and cross-strait relations","Globalization and governance"],
  ways:["Recommendation and screening","Entrance examination","Direct doctoral admission","International student admission","Overseas Chinese student admission"] }
};

/* ── 學群與學制 ── */
const PILLARS_EN = [
  { cls:"wen", tag:"Pillar 01", zh:"Culture and Application",
    d:"Centered on East Asian Sinology, intellectual history, literature and film, extending to cultural heritage, cultural policy and the practical work of the cultural and creative industries.",
    tags:["East Asian Confucianism","International Sinology","East Asian literature and film","Cultural heritage","Overseas Chinese studies","Cultural policy"] },
  { cls:"zheng", tag:"Pillar 02", zh:"Political Economy and Regional Development",
    d:"Covering international relations theory, comparative politics, cross-strait relations and international political economy, with attention to the region's political and economic dynamics and security questions.",
    tags:["International relations","Cross-strait relations","International political economy","Southeast Asian politics","Maritime policy","Finance and economic growth"] }
];
const DEGREES_EN = [
  { lv:"Bachelor",  zh:"Bachelor's",           dg:"B.A.",   d:"General humanities and social sciences education, cross-regional and multidisciplinary, with Japanese, Korean and Vietnamese courses." },
  { lv:"Master",    zh:"Master's",             dg:"M.S.S.", d:"Independent thought and independent research; course selection offers both breadth and depth." },
  { lv:"Executive", zh:"Executive Master's",   dg:"M.S.S.", d:"National security and international affairs; senior professionals versed in international practice." },
  { lv:"Doctoral",  zh:"Doctoral",             dg:"Ph.D.",  d:"Admitting students since AY 106 (2017); training advanced academic researchers." }
];

/* ── 研究中心（英文全名取自各中心標誌與網址）── */
const CENTRES_EN = {
  "海外華人研究中心": { zh:"Research Center for the Overseas Chinese", en:"National Taiwan Normal University",
    focus:["Advancing cross-regional social and cultural research on overseas Chinese homelands and diaspora settlements.",
           "Advancing integrative, multidisciplinary research on scholarly questions concerning overseas Chinese.",
           "Encouraging early-career scholars to enter the field."],
    dir:"Chiang Po-wei", rank:"Distinguished Professor" },
  "中國大陸研究中心": { zh:"Research Center for Mainland China Studies", en:"National Taiwan Normal University",
    focus:["Mainland China studies, cross-strait relations, international politics and political science."],
    dir:"Kuan Hung-chang", rank:"Associate Professor" },
  "日本研究中心": { zh:"Japan Research Center", en:"National Taiwan Normal University",
    focus:["Japanese politics, diplomacy, security, economy, culture and society."],
    dir:"Chang Kun-chiang", rank:"Professor" }
};

/* ── 教師：姓名羅馬化與職稱、研究專長英譯 ── */
const PEOPLE_EN = {
"林昌平":{n:"Lin Chang-ping",r:"Associate Professor & Chair",f:"Financial development, economic growth, political economy, applied econometrics, spatial analysis"},
"張崑將":{n:"Chang Kun-chiang",r:"Professor",f:"East Asian Confucianism, Japanese intellectual history, comparative Sino-Japanese culture"},
"江柏煒":{n:"Chiang Po-wei",r:"Distinguished Professor",f:"Overseas Chinese studies, qiaoxiang studies, social and cultural history, East Asian architecture and cities, historic preservation and heritage conservation, cultural policy and planning for the cultural industries"},
"王冠雄":{n:"Wang Kuan-hsiung",r:"Professor",f:"International politics, maritime policy, international organizations, international law, international fisheries law"},
"范世平":{n:"Fan Shih-ping",r:"Professor",f:"International political economy, mainland China's political and economic development, the PRC's Taiwan policy, cross-strait relations, mainland China's tourism industry, policy on mainland visitors to Taiwan, mainland China's overseas Chinese policy, sovereign wealth funds"},
"潘鳳娟":{n:"Pan Feng-chuan",r:"Professor",f:"Cultural exchange, international Sinology, translation of classical texts, Christianity and China, China in images, interreligious dialogue"},
"田正利":{n:"Tien Cheng-li",r:"Professor",f:"Strategic management, international business management, finance and trade, organizational behavior and human resources"},
"金恩美":{n:"Kim Eun-mi",r:"Professor",f:"East Asian culture, modern and contemporary history, overseas Chinese in East Asia, modern history of Chinese societies"},
"張碧君":{n:"Chang Pi-chun",r:"Professor",f:"Southeast Asian studies, cultural studies, cultural geography, cultural politics, cultural policy"},
"關弘昌":{n:"Kuan Hung-chang",r:"Associate Professor",f:"International relations, comparative politics, cross-strait relations"},
"胡元玲":{n:"Hu Yuan-ling",r:"Associate Professor",f:"Song-Ming Confucianism, contemporary New Confucianism, comparative Chinese and Western thought"},
"鄭怡庭":{n:"Cheng Yi-ting",r:"Associate Professor",f:"Late Qing fiction, modern literature, comparative literature, North American Sinology"},
"徐筱琦":{n:"Hsu Hsiao-chi",r:"Associate Professor",f:"International relations theory, foreign policy analysis"},
"邱愷欣":{n:"Yau Hoi-yan",r:"Associate Professor",f:"Globalization of East Asian society and culture, popular culture, gender and family, cultural and creative industries, film studies, film censorship"},
"巫俊穎":{n:"Wu Chun-ying",r:"Assistant Professor",f:"Ethnic politics, political behavior, Southeast Asian politics, Taiwanese politics"},
"林書媺":{n:"Lin Shu-mei",r:"Assistant Professor",f:"East Asian literature and film, translation theory, film studies, comparative literature"},
"黃約伯":{n:"Huang Yueh-po",r:"Associate Professor",f:"Anthropology, East Asian culture and society, East Asian religious thought and practice"},
"尹筱嵐":{n:"Yin Hsiao-lan",r:"Lecturer",f:""},
"郭國誠":{n:"Kuo Kuo-cheng",r:"Professor",f:"Defense economics, energy economics, performance evaluation, financial management, international business management, corporate social responsibility"},
"林賢參":{n:"Lin Hsien-tsan",r:"Professor",f:"Northeast Asian regional security, the PRC's external and military strategy, Japanese foreign and defense policy, Japan–PRC relations"},
"孫國祥":{n:"Sun Kuo-hsiang",r:"Professor",f:"International relations theory, public law, Asia-Pacific politics and economics"},
"金志婷":{n:"Chin Chih-ting",r:"Professor",f:"Microeconomics, macroeconomics, economic growth, international finance"},
"徐明瀚":{n:"Hsu Ming-han",r:"Assistant Professor",f:"Chinese-language cinema, image aesthetics and political theory, East Asian screen literature and cultural industries, new media writing and curation"},
"李圭旼":{n:"Lee Kyu-min",r:"Lecturer",f:"Modern Korean literature, comparative Taiwanese and Korean literature, Korean language teaching"},
"阮蓮香":{n:"Nguyen Lien-huong",r:"Lecturer",f:"Vietnamese language, Vietnamese history and culture"},
"劉德良":{n:"Liu Te-liang",r:"Professor-level Specialist",f:"National defense and security, Sun Tzu's Art of War, cross-strait relations, leadership and command"},
"陳文政":{n:"Chen Wen-cheng",r:"Professor",f:"Constitutionalism, American constitutional law, judicial politics, democratization theory, rule of law and human rights"},
"潘朝陽":{n:"Pan Chao-yang",r:"Professor",f:"Geographical and environmental thought, regional studies of thought, cultural geography, religious geography, geography of Taiwan, Chinese Confucianism, Taiwanese Confucianism"}
};

/* ── 行政人員 ── */
const STAFF_EN = {
"鄭昶怡":{n:"Cheng Chang-yi", r:"Teaching Assistant", duties:[
  ["Student affairs",["Administering applications for the department's distinctive development scholarship.","Assisting with other scholarship applications."]],
  ["Academic affairs",["Student records for the master's, executive master's and doctoral programs: graduation eligibility review; handling lists of students who have not completed requirements and subsequent procedures; submission of prospective graduate lists and departure formalities.","Receiving applications for thesis and dissertation research proposals and degree examinations.","Administering doctoral qualifying examinations.","Executive master's records: drafting degree requirements; organizing thesis presentation sessions; graduation eligibility review and handling of incomplete cases; submission of prospective graduate lists and departure formalities."]],
  ["Administration",["Liaison for the Faculty Evaluation Committee.","Liaison for the advisor and scholarship committee.","Establishment and evaluation of departmental research centers.","Liaison and co-administrator for National Science and Technology Council and other commissioned projects.","Reporting departmental academic cooperation agreements with mainland China.","Entry permit processing for specialists, scholars and students from mainland China.","Departmental website administration.","Other assigned duties."]]]},
"謝侑蓁":{n:"Hsieh Yu-chen", r:"Teaching Assistant", duties:[
  ["Curriculum and academic affairs",["Course administration for the bachelor's, master's and doctoral programs: course offerings for all programs and general education; preparation of teaching-hour schedules for full-time and adjunct faculty; drafting and updating timetables and curriculum structures; substitute teaching arrangements.","Examination administration for the three undergraduate admission routes: Star Program, application admission and subject-based placement.","Examination administration for international student applications at bachelor's, master's and doctoral level.","Outbound exchange applications and matters relating to incoming exchange and visiting students at all levels."]],
  ["General affairs",["Budget management and reimbursement.","Reporting departmental budgets for books, periodicals and equipment.","Procurement of books, periodicals, materials, equipment, consumables and non-consumables.","Custody, maintenance and disposal of equipment and non-consumables.","Assisting with budgeting, reimbursement and closing for conferences and other events."]],
  ["Administration",["Liaison for the Curriculum Committee.","Liaison for the Departmental Development Committee.","International affairs: planning visits by overseas guests and delegations; signing and reporting departmental academic cooperation agreements in Chinese, English and Japanese.","Liaison for departmental materials-budget allocation indicators.","Liaison for the university administrative tracking and management system.","Departmental evaluation.","Other assigned duties."]]]},
"鄭琇方":{n:"Cheng Hsiu-fang", r:"Teaching Assistant", duties:[
  ["Academic affairs",["Departmental enrollment quotas and the establishment or adjustment of degree programs.","Contact point for the Credit Program in International Relations and Diplomacy.","Undergraduate student records: drafting degree requirements; assisting with orientation course guidance and updating the new-student handbook; course advising; graduation eligibility review, including minor and double-major students, and handling of incomplete cases; submission of prospective graduate lists and departure formalities."]],
  ["Admissions",["Examination administration for master's, doctoral and executive master's admission: revision of admission guidelines; planning of examination procedures, including question setting and marking, document review, oral examinations, results compilation and budgeting.","Examination administration for undergraduate transfer admission and routes other than the three main ones: revision of admission guidelines; planning of examination procedures, including screening, results compilation and budgeting.","Examination administration for overseas Chinese and mainland Chinese student admission: revision of admission guidelines; planning of examination procedures.","Applications for minors, double majors and transfers."]],
  ["Administration",["Liaison for the joint departmental affairs meeting.","Liaison for the Admissions Committee.","Assisting with student career development activities.","Assisting with graduate destination surveys and alumni affairs."]]]}
};

/* ── 交通 ── */
const TRANSIT_EN = {
  metro:[["Guting Station","Tamsui, Zhonghe and Xindian lines. <b>Exit 4</b>, then about 8 minutes on foot toward Heping E. Rd."],
         ["Taipower Building Station","Xindian line. <b>Exit 2</b>, then about 8 minutes on foot toward Shida Rd."]],
  routes:["15","18","235","237","278","295","662","663","672","907","Heping Trunk Line"]
};

/* ═══════════════════════════════════════════════════════════
   日本語版。学科名は日本研究センターの掲示に基づき「東亜学科」、
   大学名は「国立台湾師範大学」。地名・駅名は日本語表記の慣例に従う。
   ═══════════════════════════════════════════════════════════ */
const PAGES_JA = {

"A-8-1": { body:`
<h3>沿革と位置づけ</h3>
<p>東亜学科は国立台湾師範大学 国際与社会科学院に属し、台北市和平東路一段の校本部・誠大楼9階に学科事務室を置く。民国100学年度（2011年）に「東亜文化暨発展学系」と「国際漢学研究所」が統合して発足し、当初は「漢学と文化」「政治と経済」の二組に分けて学士課程および修士課程の学生を受け入れた。104学年度（2015年）に政治学研究所が合流し、106学年度（2017年）から博士課程を増設して、学士・修士・博士の三段階が揃った。</p>
<p>107学年度（2018年）からは組分けをせずに募集している。北東アジア、中国、東南アジアおよびその周辺地域に焦点を当て、複数の学問分野の融合を重んじ、「文化と応用」「政治経済と地域発展」を二大領域とする。学士課程は人文社会分野における幅広い教養の形成を主眼とし、文学士（B.A.）を授与する。修士課程（社会人修士課程を含む）は自立した研究と実践の力を備えた専門人材を育て、社会科学修士（M.S.S.）を授与する。博士課程は人文社会分野の高度な研究を中心とし、社会科学博士（Ph.D.）を授与する。</p>
<h3>教員構成</h3>
<div class="cards3">
  <div class="minicard"><b>16名</b><span>専任教員</span></div>
  <div class="minicard"><b>8名</b><span>教授</span></div>
  <div class="minicard"><b>6名</b><span>准教授</span></div>
  <div class="minicard"><b>2名</b><span>助教</span></div>
</div>
<p style="margin-top:16px">専門分野は東アジア漢学、歴史、文学、文化研究、国際関係、政治学、両岸関係、金融・経済学などにわたり、各課程の学生の学識形成とキャリア形成の双方に応じられる体制をとる。</p>
<h3>歴代学科主任</h3>
<ol class="chron">
  <li>潘朝陽　教授</li><li>蔡昌言　教授</li><li>張崑將　教授</li>
  <li>江柏煒　教授</li><li>林賢參　教授</li><li>張崑將　教授</li>
  <li><b>林昌平　准教授</b><em>現任</em></li>
</ol>
<p class="chron-note">公式サイトの「学科概要」に載る歴代名簿は第六代の張崑將教授までである。「専任教員」名簿によれば、現在の学科主任は林昌平准教授である。</p>
<h3>学科の特色</h3>
<p>学士・修士・博士の三課程をすべて備えた台湾唯一の東アジア研究学科であり、同時に学際的・統合的な専門人材を養成する教育研究組織でもある。東アジア地域研究を志す学生に体系的な学術訓練を提供する。海外での研修や進学に際しては、欧米、日本、韓国、東南アジアで東アジア研究のプログラムを設ける有力大学と接続できる。</p>
<h4>研究</h4>
<p>専任教員は学歴・職歴ともに充実しており、研究の蓄積も厚い。研究範囲は東アジアの文化思想とその応用、政治経済と地域研究などに及び、国家科学及技術委員会の助成研究や産学連携も多数手がけている。</p>
<h4>国際性</h4>
<p>教員の背景は多様で、外国籍教員も複数在籍する。学士課程・修士課程の学生には東アジアや欧米への交換留学を積極的に勧めている。留学生の比率が高く、学生同士が異文化を通じて学び合える環境にある。</p>
<h3>カリキュラムの特色</h3>
<div class="deflist">
  <div><dt>学士課程</dt><dd>人文社会分野の幅広い教養を養い、地域横断・複数分野を目標とする。科目は二領域にわたり、日本語・韓国語の科目を置くほか、本学の東南アジア諸言語の資源も活用する。代表的な科目に東アジア文化概論、東アジア文化遺産、東南アジアの政治と経済、地域研究の理論と実務、東アジア各国の文化政策などがある。</dd></div>
  <div><dt>修士課程</dt><dd>自立した思考と自立した研究ができる人材を育てる。研究領域は東アジアの文化と思想、文化創造とその応用、東アジアの政治経済と両岸関係、グローバル化と統治などに及び、履修の選択は幅と深さを兼ね備える。</dd></div>
  <div><dt>社会人修士課程</dt><dd>「国家安全与国際事務研究 社会人修士課程」は、国家の安全を確保し国際事務に通じた高度専門人材の育成を目的とする。カリキュラムは三領域からなる。<b>国際関係理論研究</b>：理論と実践の検討を通じて学術的素養を養い、現下の国際情勢を読み解き分析する力を高める。<b>国家安全研究</b>：台湾が過去に安全保障上の脅威へ対処した経験と教訓、および現在の脅威認識を検討し、ソフトパワーとハードパワーをどう用いるかを考える。<b>東アジア地域研究</b>：東アジアの政治経済、安全保障、文化交流などの課題を正確に把握し分析する力を養う。</dd></div>
  <div><dt>博士課程</dt><dd>高度な学術研究人材を育てる。中核領域の科目に立脚しつつ学際的な研究力を強化する。カリキュラムは東アジア的視野、地域での実践、分野横断の統合、批判的思考という四つの目標を掲げる。</dd></div>
</div>
<h3>修了後の進路</h3>
<h4>進学</h4>
<p>学内外の文学・史学・哲学系の大学院、および政治、外交、公共事務、国家発展、中国大陸研究などの大学院。</p>
<h4>就職</h4>
<ol>
  <li>東アジア漢学、文化応用、政治経済、地域発展を扱う研究機関やシンクタンクの研究職。</li>
  <li>外交、文化、経済、僑務、国家発展などの公的部門における行政職・公務員。</li>
  <li>専門知識を要する記者、編集者、旅行業、マーケティング、企画、経営管理の職。</li>
  <li>日本語、韓国語、英語、欧州諸語による外交・専門翻訳の職。</li>
  <li>文化産業をはじめとする創造産業およびサービス業の専門職。</li>
</ol>
`},

"A-8-2": { body:`
<h3>一、発展の方向</h3>
<ol>
  <li>専門性と多様性という目標のもと、地域横断・複数分野にわたるカリキュラムを構築し、多様な専門教員を招聘して国内外で影響力のある学術的評価を積み上げる。あわせて適切な学生対教員比のもとで教育の質を高める。</li>
  <li>学内外の研究プロジェクトと助成を積極的に獲得し、研究と教育が相互に支え合う体制をとる。「文化と応用」「政治経済と地域発展」の二つの研究群に分け、社会的責任を果たすとともに若手研究者を育てる。</li>
  <li>学生の外国語能力を重視する。一部の科目は全編英語で開講し、日本語・韓国語の科目を設けるほか、本学のマレー語、タイ語、ベトナム語の資源の活用を促す。修了要件には外国語能力検定を課している。</li>
  <li>国家と社会の要請に応じ、国内外の関連学科・機関と積極的に連携する。106学年度（2017年）に博士課程を設置するとともに、学士課程の基礎力と実務応用力、修士課程の自立した研究力の育成を強化した。</li>
  <li>国際的な連携を進め、世界の有力大学との交流協定の締結を図り、留学生や研究者を招き、国内外の学術コミュニティにおける影響力を高める。</li>
  <li>在地の研究と実践を重んじ、学生が専門知識をもって社会に働きかけ、他者を助けられるよう育て、「世界的視野・地域での実践」の理念を具体化する。</li>
</ol>
<h3>二、重点</h3>
<p>短期・中期・長期の目標は順を追って進む。カリキュラムと研究センターの整備に始まり、データベース、ダブルディグリー、学術誌の運営を経て、地域における主導的な学術組織へと向かう。</p>
<div class="deflist">
  <div><dt>短期</dt><dd>東アジアの文化と応用、政治経済と地域発展を重点とし、課程ごとに異なる教育目標を定めて完備したカリキュラムを設計する。あわせて主題別の研究センターを設け、関連分野の展開を促す。</dd></div>
  <div><dt>中期</dt><dd>専門研究室の整備と各種データベースの構築、海外の有力大学との共同によるダブルディグリーおよび単位互換科目の設計。あわせて『台湾東亜文明研究学刊』の刊行を継続する。</dd></div>
  <div><dt>長期</dt><dd>台湾さらには東アジア地域で主導的地位を占める学術組織となり、理論研究と在地の実践を結びつけ、理論と実務の体系を整え、国の進路について提言を行う。</dd></div>
</div>
<h3>三、総括</h3>
<div class="cards3">
  <div class="minicard"><b>教員</b><span>教育・研究・社会貢献を等しく重んじ、教員の学識が時代の要請に適うことを期し、大学教授としての公共的知識人の務めを担う。</span></div>
  <div class="minicard"><b>学生</b><span>自立した思考力、進取の精神、主体的な責任感、優れた協働性、国際的な視野、確かな人格を備えた専門人材を育てる。</span></div>
  <div class="minicard"><b>カリキュラム</b><span>東アジアに関わる領域の分析的研究に重点を置き、東アジア各国の文化と政治経済についての専門知識を高め、語学訓練を重んじる。</span></div>
  <div class="minicard"><b>研究</b><span>漢学、東アジアの歴史、文化、思想、政治、経済貿易にわたり、地域の観察と政治・経済情報の収集、分析、応用に焦点を置く。</span></div>
</div>
`},

"A-4-5": { body:`
<p>「国際関係与外交学分学程（国際関係・外交単位プログラム）」は、国際関係理論、外交政策分析、東アジア地域研究の科目を束ねたもので、外交、国際機関、国際事務の分野を志す学生が履修できる。</p>
<div class="deflist">
  <div><dt>関連科目</dt><dd>国際関係理論、アメリカ外交政策、グローバル化とグローバル・ガバナンス、国際政治、国際機構、国際法、国際漁業法、台湾外交研究、国際政治経済学、国際政治と台湾の外交政策。</dd></div>
  <div><dt>担当教員</dt><dd>徐筱琦、王冠雄、關弘昌、范世平、孫國祥ほか。</dd></div>
  <div><dt>窓口</dt><dd>鄭琇方 助教　<a class="mono" href="tel:+886277495396">02-7749-5396</a>　<a class="mono" href="mailto:hsiufang@ntnu.edu.tw">hsiufang@ntnu.edu.tw</a></dd></div>
</div>
`}
};

const ADM_JA = {
"A-A-1": { dg:"文学士　Bachelor of Arts, B.A.",
  intro:"人文社会分野の幅広い教養の形成を主眼とし、地域横断・複数分野を目標とする。科目は「文化と応用」「政治経済と地域発展」の二領域にわたり、日本語・韓国語・ベトナム語の科目を置いて、異文化への理解と東アジア地域についての基礎的な知識と視野を養う。",
  ways:["個人申請入学","分発入学","繁星推薦","二年次編入学試験","転科・副専攻・ダブルメジャー","外国人留学生入試","華僑学生入試"] },
"A-A-2": { dg:"社会科学修士　Master of Social Science, M.S.S.",
  intro:"自立した思考と自立した研究ができる人材を育てる。研究領域と教員構成は多様で、科目は二領域にわたる。学生の関心が東アジアの文化と思想、文化創造とその応用、東アジアの政治経済と両岸関係、グローバル化と統治のいずれにあっても、履修の選択は幅と深さを兼ね備える。",
  ways:["推薦入試","一般入試","修士先修制度","外国人留学生入試","華僑学生入試"] },
"A-A-3": { dg:"社会科学修士　Master of Social Science, M.S.S.",
  intro:"正式名称は「国家安全与国際事務研究 社会人修士課程」。国際政治経済学の理論と実務を結びつけ、国家の安全を確保し国際事務に通じた高度専門人材を育てることを目的とする。カリキュラムは総合的な国家安全事務と、国家安全に関わる東アジア事務の二領域を軸に、研究方法、東アジアの地域安全保障と政治経済情勢、文化的ソフトパワーなどの科目を配する。学科および学内の関連学科の教員に加え、科目内容に応じて政府関係部局の責任者や学外の専門家を招いて授業や座談会を行う。",
  ways:["社会人修士課程入学試験"],
  note:"授業は週末の奇数週、隔週で行う（実際の日程は大学の学年暦による）。当該年度の出願者数が12名に満たない場合は開講しない。" },
"A-A-4": { dg:"社会科学博士　Doctor of Philosophy, Ph.D.",
  intro:"106学年度（2017年）に設置された。人文社会科学における複数分野・分野横断の潮流に応えるものである。東亜学科と政治学研究所の修士課程は105学年度（2016年）にすでに統合されており、博士課程も旧政治学研究所の博士課程を基礎として、研究の方向を調整し、視野を広げ、教員体制を強化した。漢学文化と政治経済にまたがる学際的な地域研究を軸とし、台湾を主体として東アジアの国家、社会、歴史、文化に関わる領域に焦点を当てる。",
  fields:["東アジアの文化と思想","文化産業とその応用","東アジアの政治経済と両岸関係","グローバル化と統治"],
  ways:["推薦入試","一般入試","博士課程飛び級進学","外国人留学生入試","華僑学生入試"] }
};

/* ── 二大領域・課程 ── */
const PILLARS_JA = [
  { cls:"wen", tag:"Pillar 01", zh:"文化と応用",
    d:"東アジア漢学、思想史、文学と映画を中核に据え、文化遺産、文化政策、文化創造産業の実務へと広げる。",
    tags:["東アジア儒学","国際漢学","東アジアの文学と映画","文化遺産","華僑研究","文化政策"] },
  { cls:"zheng", tag:"Pillar 02", zh:"政治経済と地域発展",
    d:"国際関係理論、比較政治、両岸関係、国際政治経済学を扱い、東アジア地域の政治経済の動向と安全保障の課題に着目する。",
    tags:["国際関係","両岸関係","国際政治経済学","東南アジア政治","海洋政策","金融と経済成長"] }
];
const DEGREES_JA = [
  { lv:"Bachelor",  zh:"学士課程",       dg:"B.A.",   d:"人文社会分野の教養形成。地域横断・複数分野で、日本語・韓国語・ベトナム語の科目を置く。" },
  { lv:"Master",    zh:"修士課程",       dg:"M.S.S.", d:"自立した思考と研究の力を養う。履修の選択は幅と深さを兼ね備える。" },
  { lv:"Executive", zh:"社会人修士課程", dg:"M.S.S.", d:"国家安全と国際事務。国際実務に通じた高度専門人材を育てる。" },
  { lv:"Doctoral",  zh:"博士課程",       dg:"Ph.D.",  d:"106学年度（2017年）から募集。高度な学術研究人材を育てる。" }
];

/* ── 研究センター ── */
const CENTRES_JA = {
  "海外華人研究中心": { zh:"海外華人研究センター", en:"Research Center for the Overseas Chinese",
    focus:["海外華人の原郷と移住先における社会文化を、地域を越えて研究する。",
           "海外華人に関わる学術課題を、複数分野にまたがって統合的に研究する。",
           "若手研究者の参入を促す。"],
    dir:"江柏煒", rank:"特別招聘教授" },
  "中國大陸研究中心": { zh:"中国大陸研究センター", en:"Research Center for Mainland China Studies",
    focus:["中国大陸研究、両岸関係、国際政治、政治学。"],
    dir:"關弘昌", rank:"准教授" },
  "日本研究中心": { zh:"日本研究センター", en:"Japan Research Center",
    focus:["日本の政治、外交、安全保障、経済、文化、社会に関わる諸課題。"],
    dir:"張崑將", rank:"教授" }
};

/* ── 教員：職称と研究分野 ── */
const PEOPLE_JA = {
"林昌平":{r:"准教授・学科主任",f:"金融発展、経済成長、政治経済学、応用計量経済、空間分析"},
"張崑將":{r:"教授",f:"東アジア儒学、日本思想史、日中文化比較"},
"江柏煒":{r:"特別招聘教授",f:"海外華僑・華人研究、僑郷研究、社会文化史、東アジアの建築と都市、歴史保存と遺産保護、文化政策と文化産業の企画設計"},
"王冠雄":{r:"教授",f:"国際政治、海洋政策、国際機構、国際法、国際漁業法"},
"范世平":{r:"教授",f:"国際政治経済学、中国大陸の政治経済発展、中国共産党の対台湾政策、両岸関係、中国大陸の観光産業、中国大陸観光客の来台政策、中国大陸の僑務政策、政府系ファンド"},
"潘鳳娟":{r:"教授",f:"文化交流、国際漢学、古典翻訳、キリスト教と中国、図像のなかの中国、宗教間対話"},
"田正利":{r:"教授",f:"戦略経営、国際経営、財務・金融・貿易、組織行動と人的資源"},
"金恩美":{r:"教授",f:"東アジア文化、近現代史研究、東アジアの華僑、華人社会の近現代史"},
"張碧君":{r:"教授",f:"東南アジア研究、文化研究、文化地理、文化政治、文化政策"},
"關弘昌":{r:"准教授",f:"国際関係、比較政治、両岸関係"},
"胡元玲":{r:"准教授",f:"宋明儒学、現代新儒学、東西思想比較"},
"鄭怡庭":{r:"准教授",f:"清末小説、現代文学、比較文学、北米漢学"},
"徐筱琦":{r:"准教授",f:"国際関係理論、外交政策分析"},
"邱愷欣":{r:"准教授",f:"東アジア社会文化のグローバル化、大衆文化、ジェンダーと家族、文化創造産業、映画研究、映画検閲"},
"巫俊穎":{r:"助教",f:"エスニック政治、政治行動、東南アジア政治、台湾政治"},
"林書媺":{r:"助教",f:"東アジアの文学と映画、翻訳理論、映画研究、比較文学"},
"黃約伯":{r:"准教授",f:"人類学、東アジアの文化と社会、東アジアの宗教思想と実践"},
"尹筱嵐":{r:"講師",f:""},
"郭國誠":{r:"教授",f:"防衛経済、エネルギー経済、業績評価、財務管理、国際経営、企業の社会的責任"},
"林賢參":{r:"教授",f:"北東アジアの地域安全保障、中国共産党の対外・軍事戦略、日本の外交・防衛政策、日中関係"},
"孫國祥":{r:"教授",f:"国際関係理論、公法、アジア太平洋の政治と経済"},
"金志婷":{r:"教授",f:"ミクロ経済、マクロ経済、経済成長、国際金融"},
"徐明瀚":{r:"助教",f:"華語圏映画、映像美学と政治理論、東アジアの映像文学と文化産業、ニューメディアの執筆とキュレーション"},
"李圭旼":{r:"講師",f:"韓国現代文学、台韓比較文学、韓国語教育"},
"阮蓮香":{r:"講師",f:"ベトナム語、ベトナムの歴史と文化"},
"劉德良":{r:"教授級専門技術者",f:"国防・安全保障、孫子の兵法、両岸関係、リーダーシップと統率"},
"陳文政":{r:"教授",f:"立憲主義、アメリカ憲法、司法政治、民主化理論、法の支配と人権"},
"潘朝陽":{r:"教授",f:"地理環境思想、思想の地域研究、文化地理、宗教地理、台湾地理、中国儒学、台湾儒学"}
};

/* ── 事務職員 ── */
const STAFF_JA = {
"鄭昶怡":{r:"助教", duties:[
  ["学生支援",["学科の特色発展奨学金の申請受付。","その他の奨学金申請の補助。"]],
  ["教務",["修士課程・社会人修士課程・博士課程の学籍管理：修了資格審査、未修了者名簿の処理と後続業務、修了見込者名簿の提出と離校手続。","修士・博士学生の学位論文研究計画および学位試験の申請受付。","博士課程の資格試験の実施。","社会人修士課程の学籍管理：修了要件の作成、論文成果発表会の実施、修了資格審査と未修了者の処理、修了見込者名簿の提出と離校手続。"]],
  ["管理運営",["教員審査委員会の連絡担当。","指導教員・奨学金会議の連絡担当。","学科附属研究センターの設置と評価に関する業務。","国家科学及技術委員会その他の受託事業の連絡・共同担当。","中国大陸との学科レベルの学術協定の届出。","中国大陸の専門家・研究者・学生の入台証手続。","学科ウェブサイトの管理。","その他の付託事項。"]]]},
"謝侑蓁":{r:"助教", duties:[
  ["教務・カリキュラム",["学士・修士・博士課程の授業運営：各課程および共通教育科目の開講、専任・非常勤教員の担当時間表の作成、各課程の時間割とカリキュラム構成の作成と更新、教員の休講・代講の手配。","学士課程の三方式（繁星推薦、個人申請、分科試験）の入試実務。","学士・修士・博士課程の外国人留学生出願の実務。","海外派遣交換留学の申請、および各段階の交換・訪問学生の受入に関わる事務。"]],
  ["総務",["経費の管理と精算。","学科の図書、雑誌、機器備品費の予算申請。","図書、雑誌、資材、設備、消耗品、非消耗品の調達。","機器・非消耗品の保管、修繕、廃棄。","学術シンポジウム等の予算編成、精算、決算の補助。"]],
  ["管理運営",["カリキュラム委員会の連絡担当。","学科発展委員会の連絡担当。","国際関係事務：来訪者・視察団の受入企画、学科レベルの中国語・英語・日本語による学術協定の締結と届出。","学科の材料費配分指標に関する連絡担当。","全学の行政追跡管理システムの連絡担当。","学科評価に関する業務。","その他の付託事項。"]]]},
"鄭琇方":{r:"助教", duties:[
  ["教務",["学科の募集定員、課程の増設・調整に関する業務。","国際関係・外交単位プログラムの窓口。","学士課程の学籍管理：修了要件の作成、新入生オリエンテーションの履修指導と新入生の手引の改訂補助、履修相談、修了資格審査（副専攻・ダブルメジャーを含む）と未修了者の処理、修了見込者名簿の提出と離校手続。"]],
  ["入試",["修士・博士・社会人修士課程の入試実務：募集要項の改訂、実施計画（出題採点、書類審査、口述試験、成績集計、経費計上）の補助。","学士課程の編入学試験および三方式以外の入学者の実務：募集要項の改訂、選考、成績集計、経費計上の補助。","華僑学生および中国大陸学生の入試実務：募集要項の改訂と選考の実施。","副専攻、ダブルメジャー、転科の申請に関する事務。"]],
  ["管理運営",["学科事務連席会議の連絡担当。","入試委員会の連絡担当。","学生のキャリア形成に関する活動の補助。","卒業生の進路調査および同窓会関連業務の補助。"]]]}
};

/* ── アクセス ── */
const TRANSIT_JA = {
  metro:[["古亭駅","淡水線・中和線・新店線。<b>4番出口</b>から和平東路方向へ徒歩約8分。"],
         ["台電大楼駅","新店線。<b>2番出口</b>から師大路方向へ徒歩約8分。"]],
  routes:["15","18","235","237","278","295","662","663","672","907","和平幹線"]
};

/* ═══════════════════════════════════════════════════════════
   Bản tiếng Việt. Danh từ riêng giữ theo dạng chính thức xuất hiện
   trên biển chỉ dẫn tại Đài Bắc (Guting, Taipower Building, Heping
   East Road, Da'an, Cheng Building) để thuận tiện khi di chuyển.
   ═══════════════════════════════════════════════════════════ */
const PAGES_VI = {

"A-8-1": { body:`
<h3>Lịch sử và vị thế</h3>
<p>Khoa Nghiên cứu Đông Á thuộc Trường Nghiên cứu Quốc tế và Khoa học Xã hội của Đại học Sư phạm Quốc lập Đài Loan, đặt tại tầng 9 Tòa nhà Cheng, khuôn viên chính trên Đoạn 1 Đường Heping East, Đài Bắc. Khoa được thành lập năm học 100 (2011) trên cơ sở sáp nhập Khoa Văn hóa và Phát triển Đông Á với Viện Nghiên cứu Hán học Quốc tế, ban đầu tuyển sinh cử nhân và thạc sĩ theo hai ban: Hán học và Văn hóa, Chính trị và Kinh tế. Viện Nghiên cứu Chính trị học gia nhập năm học 104 (2015), và chương trình tiến sĩ được mở từ năm học 106 (2017), hoàn chỉnh đủ ba bậc cử nhân, thạc sĩ và tiến sĩ.</p>
<p>Từ năm học 107 (2018) khoa tuyển sinh không phân ban. Khoa tập trung vào Đông Bắc Á, Trung Quốc, Đông Nam Á và các khu vực lân cận, coi trọng sự giao thoa giữa nhiều ngành, và lấy hai trụ cột làm nền tảng cho hoạt động: Văn hóa và Ứng dụng, Kinh tế Chính trị và Phát triển Khu vực. Chương trình cử nhân hướng tới nền học vấn tổng quát về khoa học nhân văn và xã hội, cấp bằng Cử nhân Văn chương (B.A.). Các chương trình thạc sĩ, kể cả chương trình dành cho người đi làm, đào tạo chuyên gia có năng lực nghiên cứu và thực hành độc lập, cấp bằng Thạc sĩ Khoa học Xã hội (M.S.S.). Chương trình tiến sĩ lấy nghiên cứu trình độ cao về khoa học nhân văn và xã hội làm trọng tâm, cấp bằng Tiến sĩ (Ph.D.).</p>
<h3>Quy mô đội ngũ</h3>
<div class="cards3">
  <div class="minicard"><b>16</b><span>Giảng viên cơ hữu</span></div>
  <div class="minicard"><b>8</b><span>Giáo sư</span></div>
  <div class="minicard"><b>6</b><span>Phó giáo sư</span></div>
  <div class="minicard"><b>2</b><span>Trợ lý giáo sư</span></div>
</div>
<p style="margin-top:16px">Chuyên môn của giảng viên bao trùm Hán học Đông Á, lịch sử, văn học, nghiên cứu văn hóa, quan hệ quốc tế, chính trị học, quan hệ hai bờ eo biển, tài chính và kinh tế học, đáp ứng nhu cầu học thuật và định hướng nghề nghiệp của sinh viên ở mọi bậc học.</p>
<h3>Các đời trưởng khoa</h3>
<ol class="chron">
  <li>Pan Chao-yang, Giáo sư</li><li>Tsai Chang-yen, Giáo sư</li><li>Chang Kun-chiang, Giáo sư</li>
  <li>Chiang Po-wei, Giáo sư</li><li>Lin Hsien-tsan, Giáo sư</li><li>Chang Kun-chiang, Giáo sư</li>
  <li><b>Lin Chang-ping, Phó giáo sư</b><em>Đương nhiệm</em></li>
</ol>
<p class="chron-note">Trang Giới thiệu chính thức liệt kê các trưởng khoa đến nhiệm kỳ thứ sáu là Giáo sư Chang Kun-chiang. Theo danh sách Giảng viên cơ hữu, trưởng khoa đương nhiệm là Phó giáo sư Lin Chang-ping. Tên được phiên âm La-tinh để tiện đọc; khoa không công bố cách viết chính thức cho từng người.</p>
<h3>Đặc điểm nổi bật</h3>
<p>Là khoa nghiên cứu Đông Á duy nhất tại Đài Loan có đủ ba bậc đào tạo, đây đồng thời là đơn vị giảng dạy và nghiên cứu chuyên về nhân lực liên ngành, mang tính tích hợp, cung cấp chương trình đào tạo học thuật có hệ thống cho sinh viên theo đuổi nghiên cứu khu vực Đông Á. Sinh viên đi trao đổi hoặc học tiếp ở nước ngoài có thể kết nối với các đại học uy tín ở châu Âu, châu Mỹ, Nhật Bản, Hàn Quốc và Đông Nam Á có chương trình nghiên cứu Đông Á.</p>
<h4>Nghiên cứu</h4>
<p>Giảng viên cơ hữu có nền tảng học thuật và kinh nghiệm vững vàng, năng lực nghiên cứu dồi dào. Phạm vi nghiên cứu trải rộng từ tư tưởng văn hóa Đông Á và ứng dụng của nó cho đến kinh tế chính trị và nghiên cứu khu vực, bao gồm nhiều đề tài do Hội đồng Khoa học và Công nghệ Quốc gia tài trợ cùng các hợp tác giữa nhà trường và doanh nghiệp.</p>
<h4>Mức độ quốc tế hóa</h4>
<p>Đội ngũ giảng viên có nền tảng đa dạng, trong đó có nhiều giảng viên nước ngoài. Khoa tích cực khuyến khích sinh viên cử nhân và thạc sĩ tham gia trao đổi tại Đông Á, châu Âu và châu Mỹ. Tỷ lệ sinh viên quốc tế cao, tạo điều kiện để sinh viên học hỏi lẫn nhau qua khác biệt văn hóa.</p>
<h3>Đặc điểm chương trình học</h3>
<div class="deflist">
  <div><dt>Cử nhân</dt><dd>Học vấn tổng quát về khoa học nhân văn và xã hội, hướng tới tính liên vùng và đa ngành. Môn học trải trên cả hai lĩnh vực, có các lớp tiếng Nhật và tiếng Hàn, đồng thời tận dụng nguồn lực ngôn ngữ Đông Nam Á của NTNU. Các môn tiêu biểu gồm Khái luận Văn hóa Đông Á, Di sản Văn hóa Đông Á, Chính trị và Kinh tế Đông Nam Á, Lý thuyết và Thực hành Nghiên cứu Khu vực, Chính sách Văn hóa các nước Đông Á.</dd></div>
  <div><dt>Thạc sĩ</dt><dd>Đào tạo năng lực tư duy và nghiên cứu độc lập. Lĩnh vực nghiên cứu gồm văn hóa và tư tưởng Đông Á, sáng tạo văn hóa và ứng dụng, kinh tế chính trị Đông Á và quan hệ hai bờ eo biển, toàn cầu hóa và quản trị; việc chọn môn vừa có bề rộng vừa có chiều sâu.</dd></div>
  <div><dt>Thạc sĩ dành cho người đi làm</dt><dd>Chương trình Thạc sĩ về An ninh Quốc gia và Quan hệ Quốc tế đào tạo nhân lực cấp cao có khả năng bảo đảm an ninh quốc gia và am hiểu công việc quốc tế. Chương trình gồm ba lĩnh vực. <b>Lý thuyết quan hệ quốc tế</b>: xây dựng nền tảng học thuật qua lý thuyết và thực tiễn, nâng cao năng lực đọc hiểu và phân tích tình hình quốc tế đương thời. <b>Nghiên cứu an ninh quốc gia</b>: xem xét kinh nghiệm và bài học của Đài Loan trong ứng phó với các mối đe dọa an ninh cùng nhận thức về mối đe dọa hiện nay, và cân nhắc cách vận dụng sức mạnh mềm và sức mạnh cứng. <b>Nghiên cứu khu vực Đông Á</b>: rèn luyện khả năng nhận thức và phân tích chính xác các vấn đề chính trị, kinh tế, an ninh và giao lưu văn hóa trong khu vực.</dd></div>
  <div><dt>Tiến sĩ</dt><dd>Đào tạo nhà nghiên cứu trình độ cao, dựa trên các môn cốt lõi và tăng cường năng lực liên ngành. Chương trình nhấn mạnh bốn mục tiêu: tầm nhìn Đông Á, thực tiễn địa phương, tích hợp liên lĩnh vực và tư duy phản biện.</dd></div>
</div>
<h3>Sau tốt nghiệp</h3>
<h4>Học tiếp</h4>
<p>Các viện sau đại học về văn học, sử học và triết học trong hoặc ngoài NTNU, cùng các viện về chính trị, ngoại giao, công vụ, phát triển quốc gia và nghiên cứu Trung Quốc đại lục.</p>
<h4>Việc làm</h4>
<ol>
  <li>Nghiên cứu viên tại các đơn vị nghiên cứu hoặc viện chính sách về Hán học Đông Á, ứng dụng văn hóa, các vấn đề kinh tế chính trị và phát triển khu vực.</li>
  <li>Vị trí hành chính và công vụ trong lĩnh vực ngoại giao, văn hóa, kinh tế chính trị, công tác kiều bào và phát triển quốc gia.</li>
  <li>Phóng viên, biên tập viên, nhân viên du lịch, tiếp thị, lập kế hoạch và quản trị doanh nghiệp đòi hỏi kiến thức chuyên môn.</li>
  <li>Biên phiên dịch ngoại giao và chuyên ngành bằng tiếng Nhật, tiếng Hàn, tiếng Anh hoặc các ngôn ngữ châu Âu.</li>
  <li>Chuyên viên trong ngành công nghiệp văn hóa, công nghiệp sáng tạo và dịch vụ.</li>
</ol>
`},

"A-8-2": { body:`
<h3>I. Định hướng phát triển</h3>
<ol>
  <li>Xây dựng chương trình liên vùng, đa ngành theo mục tiêu chuyên sâu và đa dạng; mời gọi đội ngũ giảng viên chuyên môn phong phú; tích lũy uy tín học thuật có ảnh hưởng trong và ngoài nước; đồng thời nâng cao chất lượng giảng dạy với tỷ lệ sinh viên trên giảng viên hợp lý.</li>
  <li>Tích cực tranh thủ các đề tài nghiên cứu và nguồn tài trợ trong và ngoài trường để nghiên cứu và giảng dạy hỗ trợ lẫn nhau, phân thành hai nhóm Văn hóa và Ứng dụng, Kinh tế Chính trị và Phát triển Khu vực, làm tròn trách nhiệm xã hội và bồi dưỡng đội ngũ nghiên cứu trẻ.</li>
  <li>Coi trọng năng lực ngoại ngữ của sinh viên: một số môn giảng dạy hoàn toàn bằng tiếng Anh, có các lớp tiếng Nhật và tiếng Hàn, đồng thời khuyến khích sinh viên tận dụng các lớp tiếng Mã Lai, tiếng Thái và tiếng Việt của NTNU. Điều kiện tốt nghiệp có yêu cầu về chứng chỉ ngoại ngữ.</li>
  <li>Hợp tác với các khoa và tổ chức liên quan trong và ngoài nước theo nhu cầu của quốc gia và xã hội. Chương trình tiến sĩ được lập năm học 106 (2017), đồng thời tăng cường nền tảng và năng lực ứng dụng thực tiễn ở bậc cử nhân, năng lực nghiên cứu độc lập ở bậc thạc sĩ.</li>
  <li>Đẩy mạnh hội nhập quốc tế, ký kết thỏa thuận hợp tác với các đại học uy tín trên thế giới, thu hút sinh viên quốc tế và học giả, nâng cao ảnh hưởng trong cộng đồng học thuật trong và ngoài nước.</li>
  <li>Coi trọng nghiên cứu bản địa và thực tiễn địa phương, đào tạo sinh viên biết dùng kiến thức chuyên môn để tác động đến xã hội và giúp đỡ người khác, hiện thực hóa lý niệm tầm nhìn toàn cầu và thực tiễn địa phương.</li>
</ol>
<h3>II. Trọng tâm</h3>
<p>Các mục tiêu ngắn hạn, trung hạn và dài hạn tiến triển theo trình tự: từ chương trình học và việc lập các trung tâm nghiên cứu, qua cơ sở dữ liệu, chương trình song bằng và việc duy trì tạp chí học thuật, hướng tới vị thế dẫn dắt trong khu vực.</p>
<div class="deflist">
  <div><dt>Ngắn hạn</dt><dd>Lấy văn hóa và ứng dụng Đông Á cùng kinh tế chính trị và phát triển khu vực làm trọng tâm; đặt mục tiêu đào tạo riêng cho từng bậc học và thiết kế chương trình hoàn chỉnh; lập các trung tâm nghiên cứu theo chủ đề để thúc đẩy các lĩnh vực liên quan.</dd></div>
  <div><dt>Trung hạn</dt><dd>Xây dựng phòng nghiên cứu chuyên đề và các cơ sở dữ liệu; hợp tác với các đại học uy tín ở nước ngoài mở chương trình song bằng cùng các môn công nhận tín chỉ lẫn nhau; duy trì việc xuất bản <i>Tạp chí Nghiên cứu Văn minh Đông Á Đài Loan</i>.</dd></div>
  <div><dt>Dài hạn</dt><dd>Trở thành đơn vị học thuật có vị thế dẫn dắt tại Đài Loan và khu vực Đông Á, gắn nghiên cứu lý thuyết với thực tiễn địa phương, xây dựng hệ thống lý luận và thực hành hoàn chỉnh, đóng góp ý kiến về định hướng phát triển của đất nước.</dd></div>
</div>
<h3>III. Tổng kết</h3>
<div class="cards3">
  <div class="minicard"><b>Giảng viên</b><span>Giảng dạy, nghiên cứu và phục vụ được coi trọng ngang nhau; học vấn của giảng viên cần đáp ứng yêu cầu của thời đại và gánh vác trách nhiệm của người trí thức trước công chúng.</span></div>
  <div class="minicard"><b>Sinh viên</b><span>Đào tạo chuyên gia có tư duy độc lập, tinh thần cầu tiến, thái độ trách nhiệm, khả năng làm việc nhóm, tầm nhìn quốc tế và phẩm chất tốt.</span></div>
  <div class="minicard"><b>Chương trình</b><span>Chú trọng nghiên cứu phân tích các lĩnh vực liên quan đến Đông Á, nâng cao hiểu biết chuyên môn về văn hóa và kinh tế chính trị các nước Đông Á, đồng thời coi trọng đào tạo ngôn ngữ.</span></div>
  <div class="minicard"><b>Nghiên cứu</b><span>Bao trùm Hán học, lịch sử, văn hóa, tư tưởng, chính trị và thương mại Đông Á, tập trung vào quan sát khu vực cùng việc thu thập, phân tích và ứng dụng thông tin chính trị, kinh tế.</span></div>
</div>
`},

"A-4-5": { body:`
<p>Chương trình Tín chỉ về Quan hệ Quốc tế và Ngoại giao tập hợp các môn về lý thuyết quan hệ quốc tế, phân tích chính sách đối ngoại và nghiên cứu khu vực Đông Á, dành cho sinh viên có ý định làm việc trong ngành ngoại giao, các tổ chức quốc tế hoặc lĩnh vực đối ngoại.</p>
<div class="deflist">
  <div><dt>Môn học liên quan</dt><dd>Lý thuyết Quan hệ Quốc tế, Chính sách Đối ngoại Hoa Kỳ, Toàn cầu hóa và Quản trị Toàn cầu, Chính trị Quốc tế, Tổ chức Quốc tế, Luật Quốc tế, Luật Nghề cá Quốc tế, Nghiên cứu Ngoại giao Đài Loan, Kinh tế Chính trị Quốc tế, Chính trị Quốc tế và Chính sách Đối ngoại Đài Loan.</dd></div>
  <div><dt>Giảng viên phụ trách</dt><dd>Hsu Hsiao-chi, Wang Kuan-hsiung, Kuan Hung-chang, Fan Shih-ping, Sun Kuo-hsiang và các giảng viên khác.</dd></div>
  <div><dt>Đầu mối liên hệ</dt><dd>Cheng Hsiu-fang, Trợ giảng　<a class="mono" href="tel:+886277495396">02-7749-5396</a>　<a class="mono" href="mailto:hsiufang@ntnu.edu.tw">hsiufang@ntnu.edu.tw</a></dd></div>
</div>
`}
};

const ADM_VI = {
"A-A-1": { dg:"Cử nhân Văn chương　Bachelor of Arts, B.A.",
  intro:"Hướng tới nền học vấn tổng quát về khoa học nhân văn và xã hội, mang tính liên vùng và đa ngành. Môn học trải trên cả hai lĩnh vực Văn hóa và Ứng dụng, Kinh tế Chính trị và Phát triển Khu vực, đồng thời có các lớp tiếng Nhật, tiếng Hàn và tiếng Việt, giúp sinh viên hiểu biết liên văn hóa cùng nền tảng kiến thức và tầm nhìn về Đông Á.",
  ways:["Xét tuyển hồ sơ","Phân bổ theo kỳ thi","Tiến cử Ngôi sao","Thi chuyển tiếp năm hai","Chuyển ngành, ngành phụ và song ngành","Tuyển sinh quốc tế","Tuyển sinh Hoa kiều"] },
"A-A-2": { dg:"Thạc sĩ Khoa học Xã hội　Master of Social Science, M.S.S.",
  intro:"Hướng tới đào tạo năng lực tư duy và nghiên cứu độc lập. Lĩnh vực nghiên cứu và chuyên môn của giảng viên rất phong phú, môn học trải trên cả hai lĩnh vực. Dù mối quan tâm của sinh viên nằm ở văn hóa và tư tưởng Đông Á, sáng tạo văn hóa và ứng dụng, kinh tế chính trị Đông Á và quan hệ hai bờ eo biển, hay toàn cầu hóa và quản trị, việc chọn môn vẫn vừa có bề rộng vừa có chiều sâu.",
  ways:["Xét tuyển và sơ tuyển","Thi tuyển sinh","Học trước bậc thạc sĩ","Tuyển sinh quốc tế","Tuyển sinh Hoa kiều"] },
"A-A-3": { dg:"Thạc sĩ Khoa học Xã hội　Master of Social Science, M.S.S.",
  intro:"Tên đầy đủ là Chương trình Thạc sĩ về An ninh Quốc gia và Quan hệ Quốc tế dành cho người đi làm. Chương trình gắn lý thuyết với thực tiễn của kinh tế chính trị quốc tế nhằm đào tạo nhân lực cấp cao có khả năng bảo đảm an ninh quốc gia và am hiểu công việc quốc tế. Nội dung xoay quanh hai lĩnh vực là công tác an ninh quốc gia tổng hợp và các vấn đề Đông Á liên quan đến an ninh quốc gia, kèm theo các môn về phương pháp nghiên cứu, an ninh khu vực và tình hình kinh tế chính trị Đông Á, sức mạnh mềm văn hóa. Ngoài giảng viên của khoa và của trường, chương trình còn mời lãnh đạo các cơ quan chính phủ và chuyên gia bên ngoài tham gia giảng dạy và tọa đàm tùy theo nội dung môn học.",
  ways:["Kỳ thi tuyển sinh chương trình thạc sĩ dành cho người đi làm"],
  note:"Lớp học vào cuối tuần của các tuần lẻ, theo lịch cách tuần; thời gian thực tế theo lịch năm học của trường. Chương trình không mở trong năm tuyển sinh có tổng số hồ sơ dưới 12 người." },
"A-A-4": { dg:"Tiến sĩ　Doctor of Philosophy, Ph.D.",
  intro:"Được lập năm học 106 (2017) nhằm đáp ứng xu hướng đa ngành và liên lĩnh vực của khoa học nhân văn và xã hội. Khoa Nghiên cứu Đông Á và chương trình thạc sĩ của Viện Nghiên cứu Chính trị học đã sáp nhập từ năm học 105 (2016); chương trình tiến sĩ kế thừa chương trình tiến sĩ chính trị học trước đây, có điều chỉnh hướng nghiên cứu, mở rộng phạm vi và tăng cường đội ngũ. Trục chính là nghiên cứu khu vực liên ngành kết hợp văn hóa Hán học với kinh tế chính trị, lấy Đài Loan làm chủ thể và tập trung vào nhà nước, xã hội, lịch sử và văn hóa Đông Á.",
  fields:["Văn hóa và tư tưởng Đông Á","Công nghiệp văn hóa và ứng dụng","Kinh tế chính trị Đông Á và quan hệ hai bờ eo biển","Toàn cầu hóa và quản trị"],
  ways:["Xét tuyển và sơ tuyển","Thi tuyển sinh","Chuyển thẳng lên tiến sĩ","Tuyển sinh quốc tế","Tuyển sinh Hoa kiều"] }
};

/* ── Hai trụ cột và các chương trình ── */
const PILLARS_VI = [
  { cls:"wen", tag:"Pillar 01", zh:"Văn hóa và Ứng dụng",
    d:"Lấy Hán học Đông Á, lịch sử tư tưởng, văn học và điện ảnh làm hạt nhân, mở rộng sang di sản văn hóa, chính sách văn hóa và công việc thực tiễn của ngành công nghiệp văn hóa sáng tạo.",
    tags:["Nho học Đông Á","Hán học quốc tế","Văn học và điện ảnh Đông Á","Di sản văn hóa","Nghiên cứu Hoa kiều","Chính sách văn hóa"] },
  { cls:"zheng", tag:"Pillar 02", zh:"Kinh tế Chính trị và Phát triển Khu vực",
    d:"Bao gồm lý thuyết quan hệ quốc tế, chính trị so sánh, quan hệ hai bờ eo biển và kinh tế chính trị quốc tế, chú trọng động thái kinh tế chính trị và các vấn đề an ninh của khu vực Đông Á.",
    tags:["Quan hệ quốc tế","Quan hệ hai bờ eo biển","Kinh tế chính trị quốc tế","Chính trị Đông Nam Á","Chính sách biển","Tài chính và tăng trưởng kinh tế"] }
];
const DEGREES_VI = [
  { lv:"Bachelor",  zh:"Cử nhân",              dg:"B.A.",   d:"Học vấn tổng quát về nhân văn và xã hội, liên vùng, đa ngành, có lớp tiếng Nhật, tiếng Hàn và tiếng Việt." },
  { lv:"Master",    zh:"Thạc sĩ",              dg:"M.S.S.", d:"Rèn luyện tư duy và nghiên cứu độc lập; việc chọn môn vừa rộng vừa sâu." },
  { lv:"Executive", zh:"Thạc sĩ vừa làm vừa học", dg:"M.S.S.", d:"An ninh quốc gia và quan hệ quốc tế; nhân lực cấp cao am hiểu công việc quốc tế." },
  { lv:"Doctoral",  zh:"Tiến sĩ",              dg:"Ph.D.",  d:"Tuyển sinh từ năm học 106 (2017); đào tạo nhà nghiên cứu trình độ cao." }
];

/* ── Trung tâm nghiên cứu ── */
const CENTRES_VI = {
  "海外華人研究中心": { zh:"Trung tâm Nghiên cứu Hoa kiều Hải ngoại", en:"Research Center for the Overseas Chinese",
    focus:["Thúc đẩy nghiên cứu văn hóa xã hội liên vùng về quê gốc và nơi định cư của Hoa kiều hải ngoại.",
           "Thúc đẩy nghiên cứu tích hợp, đa ngành về các vấn đề học thuật liên quan đến Hoa kiều.",
           "Khuyến khích các nhà nghiên cứu trẻ tham gia lĩnh vực này."],
    dir:"Chiang Po-wei", rank:"Giáo sư Xuất sắc" },
  "中國大陸研究中心": { zh:"Trung tâm Nghiên cứu Trung Quốc Đại lục", en:"Research Center for Mainland China Studies",
    focus:["Nghiên cứu Trung Quốc đại lục, quan hệ hai bờ eo biển, chính trị quốc tế và chính trị học."],
    dir:"Kuan Hung-chang", rank:"Phó giáo sư" },
  "日本研究中心": { zh:"Trung tâm Nghiên cứu Nhật Bản", en:"Japan Research Center",
    focus:["Chính trị, ngoại giao, an ninh, kinh tế, văn hóa và xã hội Nhật Bản."],
    dir:"Chang Kun-chiang", rank:"Giáo sư" }
};

/* ── Giảng viên ── */
const PEOPLE_VI = {
"林昌平":{n:"Lin Chang-ping",r:"Phó giáo sư & Trưởng khoa",f:"Phát triển tài chính, tăng trưởng kinh tế, kinh tế chính trị học, kinh tế lượng ứng dụng, phân tích không gian"},
"張崑將":{n:"Chang Kun-chiang",r:"Giáo sư",f:"Nho học Đông Á, lịch sử tư tưởng Nhật Bản, so sánh văn hóa Trung – Nhật"},
"江柏煒":{n:"Chiang Po-wei",r:"Giáo sư Xuất sắc",f:"Nghiên cứu Hoa kiều và người Hoa hải ngoại, nghiên cứu kiều hương, lịch sử văn hóa xã hội, kiến trúc và đô thị Đông Á, bảo tồn lịch sử và di sản, chính sách văn hóa và quy hoạch ngành công nghiệp văn hóa"},
"王冠雄":{n:"Wang Kuan-hsiung",r:"Giáo sư",f:"Chính trị quốc tế, chính sách biển, tổ chức quốc tế, luật quốc tế, luật nghề cá quốc tế"},
"范世平":{n:"Fan Shih-ping",r:"Giáo sư",f:"Kinh tế chính trị quốc tế, phát triển chính trị và kinh tế Trung Quốc đại lục, chính sách đối với Đài Loan của Trung Quốc đại lục, quan hệ hai bờ eo biển, ngành du lịch Trung Quốc đại lục, chính sách khách du lịch đại lục đến Đài Loan, chính sách kiều vụ của Trung Quốc đại lục, quỹ đầu tư quốc gia"},
"潘鳳娟":{n:"Pan Feng-chuan",r:"Giáo sư",f:"Giao lưu văn hóa, Hán học quốc tế, dịch thuật kinh điển, Cơ Đốc giáo và Trung Quốc, hình ảnh Trung Quốc, đối thoại liên tôn giáo"},
"田正利":{n:"Tien Cheng-li",r:"Giáo sư",f:"Quản trị chiến lược, quản trị kinh doanh quốc tế, tài chính và thương mại, hành vi tổ chức và nhân sự"},
"金恩美":{n:"Kim Eun-mi",r:"Giáo sư",f:"Văn hóa Đông Á, nghiên cứu lịch sử cận hiện đại, Hoa kiều Đông Á, lịch sử cận hiện đại xã hội người Hoa"},
"張碧君":{n:"Chang Pi-chun",r:"Giáo sư",f:"Nghiên cứu Đông Nam Á, nghiên cứu văn hóa, địa lý văn hóa, chính trị văn hóa, chính sách văn hóa"},
"關弘昌":{n:"Kuan Hung-chang",r:"Phó giáo sư",f:"Quan hệ quốc tế, chính trị so sánh, quan hệ hai bờ eo biển"},
"胡元玲":{n:"Hu Yuan-ling",r:"Phó giáo sư",f:"Nho học Tống – Minh, Tân Nho học đương đại, so sánh tư tưởng Đông – Tây"},
"鄭怡庭":{n:"Cheng Yi-ting",r:"Phó giáo sư",f:"Tiểu thuyết cuối Thanh, văn học hiện đại, văn học so sánh, Hán học Bắc Mỹ"},
"徐筱琦":{n:"Hsu Hsiao-chi",r:"Phó giáo sư",f:"Lý thuyết quan hệ quốc tế, phân tích chính sách đối ngoại"},
"邱愷欣":{n:"Yau Hoi-yan",r:"Phó giáo sư",f:"Toàn cầu hóa văn hóa xã hội Đông Á, văn hóa đại chúng, giới và gia đình, công nghiệp văn hóa sáng tạo, nghiên cứu điện ảnh, kiểm duyệt điện ảnh"},
"巫俊穎":{n:"Wu Chun-ying",r:"Trợ lý giáo sư",f:"Chính trị tộc người, hành vi chính trị, chính trị Đông Nam Á, chính trị Đài Loan"},
"林書媺":{n:"Lin Shu-mei",r:"Trợ lý giáo sư",f:"Văn học và điện ảnh Đông Á, lý thuyết dịch thuật, nghiên cứu điện ảnh, văn học so sánh"},
"黃約伯":{n:"Huang Yueh-po",r:"Phó giáo sư",f:"Nhân học, văn hóa và xã hội Đông Á, tư tưởng và thực hành tôn giáo Đông Á"},
"尹筱嵐":{n:"Yin Hsiao-lan",r:"Giảng viên",f:""},
"郭國誠":{n:"Kuo Kuo-cheng",r:"Giáo sư",f:"Kinh tế quốc phòng, kinh tế năng lượng, đánh giá hiệu quả, quản trị tài chính, quản trị kinh doanh quốc tế, trách nhiệm xã hội của doanh nghiệp"},
"林賢參":{n:"Lin Hsien-tsan",r:"Giáo sư",f:"An ninh khu vực Đông Bắc Á, chiến lược đối ngoại và quân sự của Trung Quốc đại lục, chính sách ngoại giao và quốc phòng Nhật Bản, quan hệ Nhật Bản – Trung Quốc"},
"孫國祥":{n:"Sun Kuo-hsiang",r:"Giáo sư",f:"Lý thuyết quan hệ quốc tế, công pháp, chính trị và kinh tế châu Á – Thái Bình Dương"},
"金志婷":{n:"Chin Chih-ting",r:"Giáo sư",f:"Kinh tế vi mô, kinh tế vĩ mô, tăng trưởng kinh tế, tài chính quốc tế"},
"徐明瀚":{n:"Hsu Ming-han",r:"Trợ lý giáo sư",f:"Điện ảnh Hoa ngữ, mỹ học hình ảnh và lý thuyết chính trị, văn học điện ảnh và công nghiệp văn hóa Đông Á, viết và giám tuyển truyền thông mới"},
"李圭旼":{n:"Lee Kyu-min",r:"Giảng viên",f:"Văn học Hàn Quốc hiện đại, văn học so sánh Đài – Hàn, giảng dạy tiếng Hàn"},
"阮蓮香":{n:"Nguyễn Liên Hương",r:"Giảng viên",f:"Tiếng Việt, lịch sử và văn hóa Việt Nam"},
"劉德良":{n:"Liu Te-liang",r:"Chuyên viên kỹ thuật cấp giáo sư",f:"Quốc phòng và an ninh, Binh pháp Tôn Tử, quan hệ hai bờ eo biển, lãnh đạo và chỉ huy"},
"陳文政":{n:"Chen Wen-cheng",r:"Giáo sư",f:"Chủ nghĩa hiến pháp, luật hiến pháp Hoa Kỳ, chính trị tư pháp, lý thuyết dân chủ hóa, pháp quyền và nhân quyền"},
"潘朝陽":{n:"Pan Chao-yang",r:"Giáo sư",f:"Tư tưởng địa lý và môi trường, nghiên cứu khu vực về tư tưởng, địa lý văn hóa, địa lý tôn giáo, địa lý Đài Loan, Nho học Trung Quốc, Nho học Đài Loan"}
};

/* ── Nhân viên hành chính ── */
const STAFF_VI = {
"鄭昶怡":{n:"Cheng Chang-yi", r:"Trợ giảng", duties:[
  ["Công tác sinh viên",["Tiếp nhận hồ sơ xin học bổng phát triển đặc thù của khoa.","Hỗ trợ các hồ sơ học bổng khác."]],
  ["Học vụ",["Quản lý học vụ bậc thạc sĩ, thạc sĩ vừa làm vừa học và tiến sĩ: xét điều kiện tốt nghiệp; xử lý danh sách sinh viên chưa hoàn thành và các thủ tục tiếp theo; nộp danh sách dự kiến tốt nghiệp và thủ tục rời trường.","Tiếp nhận đề cương nghiên cứu luận văn, luận án và hồ sơ thi học vị.","Tổ chức kỳ thi tư cách nghiên cứu sinh tiến sĩ.","Quản lý học vụ chương trình thạc sĩ vừa làm vừa học: soạn quy định tốt nghiệp; tổ chức buổi báo cáo kết quả luận văn; xét điều kiện tốt nghiệp và xử lý các trường hợp chưa hoàn thành; nộp danh sách dự kiến tốt nghiệp và thủ tục rời trường."]],
  ["Hành chính",["Đầu mối của Hội đồng Thẩm định Giảng viên.","Đầu mối của hội nghị cố vấn học tập và học bổng.","Công tác thành lập và đánh giá các trung tâm nghiên cứu của khoa.","Đầu mối và đồng phụ trách các đề tài của Hội đồng Khoa học và Công nghệ Quốc gia và các đề tài ủy thác khác.","Báo cáo các thỏa thuận hợp tác học thuật cấp khoa với Trung Quốc đại lục.","Thủ tục giấy phép nhập cảnh cho chuyên gia, học giả và sinh viên từ Trung Quốc đại lục.","Quản trị trang web của khoa.","Các nhiệm vụ khác được giao."]]]},
"謝侑蓁":{n:"Hsieh Yu-chen", r:"Trợ giảng", duties:[
  ["Chương trình và học vụ",["Quản lý giảng dạy bậc cử nhân, thạc sĩ và tiến sĩ: mở môn cho các bậc học và môn đại cương; lập bảng giờ giảng của giảng viên cơ hữu và thỉnh giảng; soạn và cập nhật thời khóa biểu, cấu trúc chương trình; sắp xếp nghỉ và dạy thay.","Công tác thi tuyển ba phương thức bậc cử nhân: Tiến cử Ngôi sao, xét tuyển hồ sơ và thi phân môn.","Công tác xét tuyển sinh viên quốc tế bậc cử nhân, thạc sĩ và tiến sĩ.","Hồ sơ trao đổi ra nước ngoài và các việc liên quan đến sinh viên trao đổi, sinh viên thăm quan đến khoa."]],
  ["Tổng vụ",["Quản lý và thanh quyết toán kinh phí.","Lập dự toán sách, tạp chí và thiết bị của khoa.","Mua sắm sách, tạp chí, vật tư, thiết bị, vật phẩm tiêu hao và không tiêu hao.","Bảo quản, sửa chữa và thanh lý thiết bị, vật phẩm không tiêu hao.","Hỗ trợ lập dự toán, thanh toán và quyết toán cho hội thảo và các hoạt động khác."]],
  ["Hành chính",["Đầu mối của Hội đồng Chương trình.","Đầu mối của Hội đồng Phát triển Khoa.","Công tác đối ngoại: tổ chức đón tiếp khách và đoàn tham quan quốc tế; ký kết và báo cáo thỏa thuận hợp tác học thuật cấp khoa bằng tiếng Trung, tiếng Anh và tiếng Nhật.","Đầu mối về chỉ tiêu phân bổ kinh phí vật tư của khoa.","Đầu mối của hệ thống theo dõi và quản lý hành chính toàn trường.","Công tác đánh giá khoa.","Các nhiệm vụ khác được giao."]]]},
"鄭琇方":{n:"Cheng Hsiu-fang", r:"Trợ giảng", duties:[
  ["Học vụ",["Chỉ tiêu tuyển sinh của khoa, việc mở mới và điều chỉnh các chương trình đào tạo.","Đầu mối của Chương trình Tín chỉ về Quan hệ Quốc tế và Ngoại giao.","Quản lý học vụ bậc cử nhân: soạn quy định tốt nghiệp; hỗ trợ tư vấn chọn môn trong tuần định hướng và cập nhật sổ tay tân sinh viên; tư vấn học tập; xét điều kiện tốt nghiệp, kể cả sinh viên ngành phụ và song ngành, và xử lý các trường hợp chưa hoàn thành; nộp danh sách dự kiến tốt nghiệp và thủ tục rời trường."]],
  ["Tuyển sinh",["Công tác thi tuyển bậc thạc sĩ, tiến sĩ và thạc sĩ vừa làm vừa học: sửa đổi thông báo tuyển sinh; lập kế hoạch tổ chức thi, gồm ra đề và chấm thi, xét hồ sơ, vấn đáp, tổng hợp điểm và lập dự toán.","Công tác thi chuyển tiếp bậc cử nhân và các phương thức nhập học ngoài ba phương thức chính: sửa đổi thông báo tuyển sinh; lập kế hoạch sơ tuyển, tổng hợp điểm và dự toán.","Công tác tuyển sinh Hoa kiều và sinh viên Trung Quốc đại lục: sửa đổi thông báo tuyển sinh và tổ chức sơ tuyển.","Hồ sơ đăng ký ngành phụ, song ngành và chuyển ngành."]],
  ["Hành chính",["Đầu mối của hội nghị liên tịch công tác khoa.","Đầu mối của Hội đồng Tuyển sinh.","Hỗ trợ các hoạt động hướng nghiệp cho sinh viên.","Hỗ trợ khảo sát việc làm của sinh viên tốt nghiệp và công tác cựu sinh viên."]]]}
};

/* ── Đi lại ── */
const TRANSIT_VI = {
  metro:[["Ga Guting","Tuyến Tamsui, Zhonghe và Xindian. <b>Lối ra 4</b>, đi bộ khoảng 8 phút về hướng Đường Heping East."],
         ["Ga Taipower Building","Tuyến Xindian. <b>Lối ra 2</b>, đi bộ khoảng 8 phút về hướng Đường Shida."]],
  routes:["15","18","235","237","278","295","662","663","672","907","Tuyến chính Heping"]
};

/* ── 交通（中文） ── */
const TRANSIT_ZH = {
  metro:[["古亭站","淡水線、中和線、新店線　<b>4 號出口</b>往和平東路方向直行約 8 分鐘"],
         ["臺電大樓站","新店線　<b>2 號出口</b>往師大路方向直行約 8 分鐘"]],
  routes:["15","18","235","237","278","295","662","663","672","907","和平幹線"]
};

/* ═══════════════════════════════════════════════════════════
   한국어판. 지명·역명은 타이베이 현지 표기를 병기하여
   실제 이동에 지장이 없도록 했다.
   ═══════════════════════════════════════════════════════════ */
const PAGES_KO = {

"A-8-1": { body:`
<h3>연혁과 위상</h3>
<p>동아시아학과는 국립대만사범대학 국제·사회과학대학에 속하며, 타이베이시 허핑둥로 1가 본교 Cheng Building 9층에 학과 사무실을 두고 있다. 100학년도(2011년)에 「동아문화·발전학과」와 「국제한학연구소」가 통합되어 출범했으며, 처음에는 「한학·문화」와 「정치·경제」 두 반으로 나누어 학사 과정과 석사 과정 학생을 모집했다. 104학년도(2015년)에 정치학연구소가 합류했고, 106학년도(2017년)부터 박사 과정을 신설하여 학사·석사·박사 세 단계를 모두 갖추게 되었다.</p>
<p>107학년도(2018년)부터는 반을 나누지 않고 모집한다. 동북아시아, 중국, 동남아시아와 그 주변 지역에 초점을 맞추고 여러 학문 분야의 융합을 중시하며, 「문화와 응용」과 「정치경제와 지역 발전」을 두 축으로 삼는다. 학사 과정은 인문사회 분야의 폭넓은 교양 형성을 주안점으로 하며 문학사(B.A.)를 수여한다. 석사 과정은 재직자 석사 과정을 포함하여 자립적인 연구와 실천 역량을 갖춘 전문 인재를 기르고 사회과학석사(M.S.S.)를 수여한다. 박사 과정은 인문사회 분야의 고급 연구를 중심으로 하며 사회과학박사(Ph.D.)를 수여한다.</p>
<h3>교원 구성</h3>
<div class="cards3">
  <div class="minicard"><b>16명</b><span>전임 교원</span></div>
  <div class="minicard"><b>8명</b><span>교수</span></div>
  <div class="minicard"><b>6명</b><span>부교수</span></div>
  <div class="minicard"><b>2명</b><span>조교수</span></div>
</div>
<p style="margin-top:16px">전공 분야는 동아시아 한학, 역사, 문학, 문화 연구, 국제관계, 정치학, 양안 관계, 금융·경제학 등에 걸쳐 있어 각 과정 학생의 학문적 형성과 진로 개발을 모두 뒷받침한다.</p>
<h3>역대 학과장</h3>
<ol class="chron">
  <li>Pan Chao-yang 교수</li><li>Tsai Chang-yen 교수</li><li>Chang Kun-chiang 교수</li>
  <li>Chiang Po-wei 교수</li><li>Lin Hsien-tsan 교수</li><li>Chang Kun-chiang 교수</li>
  <li><b>Lin Chang-ping 부교수</b><em>현직</em></li>
</ol>
<p class="chron-note">공식 사이트의 「학과 개요」에 실린 역대 명단은 제6대 Chang Kun-chiang 교수까지이다. 「전임 교원」 명부에 따르면 현재 학과장은 Lin Chang-ping 부교수이다. 이름은 읽기 편의를 위해 로마자로 표기했으며, 학과가 공식 표기를 공표하지는 않았다.</p>
<h3>학과의 특색</h3>
<p>학사·석사·박사 세 과정을 모두 갖춘 대만 유일의 동아시아 연구 학과이며, 동시에 학제적·통합적 전문 인재를 양성하는 교육 연구 조직이기도 하다. 동아시아 지역 연구를 지향하는 학생에게 체계적인 학술 훈련을 제공한다. 해외 연수나 진학 시에는 구미, 일본, 한국, 동남아시아에서 동아시아 연구 프로그램을 운영하는 주요 대학과 연계할 수 있다.</p>
<h4>연구</h4>
<p>전임 교원은 학력과 경력이 두루 충실하고 연구 축적도 두텁다. 연구 범위는 동아시아 문화 사상과 그 응용, 정치경제와 지역 연구 등에 이르며, 국가과학및기술위원회의 지원 과제와 산학 협력도 다수 수행하고 있다.</p>
<h4>국제화</h4>
<p>교원의 배경이 다양하고 외국인 교원도 여러 명 재직한다. 학사·석사 과정 학생에게 동아시아와 구미 지역 교환 학생 파견을 적극 권장한다. 외국인 학생 비율이 높아 학생들이 서로 다른 문화적 차이를 통해 배울 수 있는 환경이다.</p>
<h3>교과 과정의 특색</h3>
<div class="deflist">
  <div><dt>학사 과정</dt><dd>인문사회 분야의 폭넓은 교양을 기르며 지역 횡단·복수 분야를 목표로 한다. 교과목은 두 영역에 걸쳐 있고 일본어·한국어 과목을 두는 외에 본교의 동남아시아 언어 자원도 활용한다. 대표 과목으로 동아시아 문화 개론, 동아시아 문화유산, 동남아시아의 정치와 경제, 지역 연구의 이론과 실무, 동아시아 각국의 문화 정책 등이 있다.</dd></div>
  <div><dt>석사 과정</dt><dd>자립적으로 사고하고 연구할 수 있는 인재를 기른다. 연구 영역은 동아시아의 문화와 사상, 문화 창조와 응용, 동아시아 정치경제와 양안 관계, 세계화와 거버넌스 등에 이르며 이수 선택의 폭과 깊이를 모두 갖추었다.</dd></div>
  <div><dt>재직자 석사 과정</dt><dd>「국가안보·국제사무연구 재직자 석사 과정」은 국가 안보를 확보하고 국제 사무에 밝은 고급 전문 인재 양성을 목적으로 한다. 교과 과정은 세 영역으로 구성된다. <b>국제관계이론연구</b>: 이론과 실천의 검토를 통해 학문적 소양을 기르고 현 국제 정세를 읽고 분석하는 역량을 높인다. <b>국가안보연구</b>: 대만이 과거 안보 위협에 대처한 경험과 교훈, 현재의 위협 인식을 검토하고 소프트파워와 하드파워의 활용을 고찰한다. <b>동아시아지역연구</b>: 동아시아의 정치경제, 안보, 문화 교류 등의 과제를 정확히 파악하고 분석하는 역량을 기른다.</dd></div>
  <div><dt>박사 과정</dt><dd>고급 학술 연구 인재를 기른다. 핵심 영역 과목에 기반하여 학제적 연구 역량을 강화한다. 교과 과정은 동아시아적 시야, 지역에서의 실천, 분야 횡단 통합, 비판적 사고라는 네 가지 목표를 내세운다.</dd></div>
</div>
<h3>졸업 후 진로</h3>
<h4>진학</h4>
<p>교내외 문학·사학·철학 계열 대학원, 그리고 정치, 외교, 공공사무, 국가발전, 중국대륙연구 등의 대학원.</p>
<h4>취업</h4>
<ol>
  <li>동아시아 한학, 문화 응용, 정치경제, 지역 발전을 다루는 연구 기관이나 싱크탱크의 연구직.</li>
  <li>외교, 문화, 경제, 교민 업무, 국가 발전 등 공공 부문의 행정직·공무원.</li>
  <li>전문 지식을 요구하는 기자, 편집자, 여행업, 마케팅, 기획, 경영 관리직.</li>
  <li>일본어, 한국어, 영어, 유럽어를 활용한 외교·전문 번역직.</li>
  <li>문화 산업을 비롯한 창조 산업과 서비스업의 전문직.</li>
</ol>
`},

"A-8-2": { body:`
<h3>Ⅰ. 발전 방향</h3>
<ol>
  <li>전문성과 다양성이라는 목표 아래 지역 횡단·복수 분야의 교과 과정을 구축하고, 다양한 전문 교원을 초빙하여 국내외에서 영향력 있는 학술적 평판을 쌓는다. 아울러 적정한 학생 대 교원 비율 아래 교육의 질을 높인다.</li>
  <li>교내외 연구 과제와 지원 사업을 적극 확보하여 연구와 교육이 서로를 뒷받침하도록 한다. 「문화와 응용」과 「정치경제와 지역 발전」 두 연구군으로 나누어 사회적 책임을 다하고 젊은 연구자를 기른다.</li>
  <li>학생의 외국어 역량을 중시한다. 일부 과목은 전부 영어로 개설하고 일본어·한국어 과목을 두는 외에, 본교의 말레이어·태국어·베트남어 자원을 활용하도록 권장한다. 졸업 요건에 외국어 능력 검정을 두고 있다.</li>
  <li>국가와 사회의 요청에 부응하여 국내외 관련 학과·기관과 적극 협력한다. 106학년도(2017년)에 박사 과정을 설치하는 한편 학사 과정의 기초와 실무 응용 역량, 석사 과정의 자립적 연구 역량 육성을 강화했다.</li>
  <li>국제적 연계를 추진하여 세계 유수 대학과 교류 협정 체결을 도모하고, 유학생과 연구자를 유치하여 국내외 학술 공동체에서의 영향력을 높인다.</li>
  <li>지역 연구와 실천을 중시하여 학생이 전문 지식으로 사회에 기여하고 타인을 도울 수 있도록 기르며, 「세계적 시야·지역에서의 실천」이라는 이념을 구체화한다.</li>
</ol>
<h3>Ⅱ. 중점</h3>
<p>단기·중기·장기 목표는 순차적으로 진행된다. 교과 과정과 연구 센터의 정비에서 시작하여 데이터베이스, 복수 학위, 학술지 운영을 거쳐 지역에서 주도적인 학술 조직으로 나아간다.</p>
<div class="deflist">
  <div><dt>단기</dt><dd>동아시아 문화와 응용, 정치경제와 지역 발전을 중점으로 삼고, 과정별로 서로 다른 교육 목표를 정하여 완비된 교과 과정을 설계한다. 아울러 주제별 연구 센터를 두어 관련 분야의 전개를 촉진한다.</dd></div>
  <div><dt>중기</dt><dd>전문 연구실 정비와 각종 데이터베이스 구축, 해외 주요 대학과의 공동 복수 학위 및 학점 상호 인정 과목 설계. 아울러 『대만동아문명연구학간』의 간행을 이어간다.</dd></div>
  <div><dt>장기</dt><dd>대만과 나아가 동아시아 지역에서 주도적 위치를 차지하는 학술 조직이 되어 이론 연구와 지역 실천을 결합하고, 이론과 실무의 체계를 갖추어 국가의 진로에 관해 제언한다.</dd></div>
</div>
<h3>Ⅲ. 총괄</h3>
<div class="cards3">
  <div class="minicard"><b>교원</b><span>교육·연구·사회 공헌을 동등하게 중시하며, 교원의 학식이 시대의 요청에 부합하기를 기대하고 대학교수로서 공공 지식인의 소임을 다한다.</span></div>
  <div class="minicard"><b>학생</b><span>자립적 사고력, 진취적 정신, 주체적 책임감, 뛰어난 협업 능력, 국제적 시야, 바른 인성을 갖춘 전문 인재를 기른다.</span></div>
  <div class="minicard"><b>교과 과정</b><span>동아시아 관련 영역의 분석적 연구에 중점을 두어 동아시아 각국의 문화와 정치경제에 대한 전문 지식을 높이고 어학 훈련을 중시한다.</span></div>
  <div class="minicard"><b>연구</b><span>한학, 동아시아의 역사·문화·사상·정치·경제 무역에 걸쳐 있으며, 지역 관찰과 정치·경제 정보의 수집·분석·응용에 초점을 둔다.</span></div>
</div>
`},

"A-4-5": { body:`
<p>「국제관계·외교 학점 프로그램」은 국제관계이론, 외교정책분석, 동아시아지역연구 과목을 묶은 것으로, 외교·국제기구·국제 사무 분야를 지향하는 학생이 이수할 수 있다.</p>
<div class="deflist">
  <div><dt>관련 과목</dt><dd>국제관계이론, 미국 외교정책, 세계화와 글로벌 거버넌스, 국제정치, 국제기구, 국제법, 국제어업법, 대만 외교 연구, 국제정치경제학, 국제정치와 대만의 외교정책.</dd></div>
  <div><dt>담당 교원</dt><dd>Hsu Hsiao-chi, Wang Kuan-hsiung, Kuan Hung-chang, Fan Shih-ping, Sun Kuo-hsiang 외.</dd></div>
  <div><dt>문의처</dt><dd>Cheng Hsiu-fang 조교　<a class="mono" href="tel:+886277495396">02-7749-5396</a>　<a class="mono" href="mailto:hsiufang@ntnu.edu.tw">hsiufang@ntnu.edu.tw</a></dd></div>
</div>
`}
};

const ADM_KO = {
"A-A-1": { dg:"문학사　Bachelor of Arts, B.A.",
  intro:"인문사회 분야의 폭넓은 교양 형성을 주안점으로 하며 지역 횡단·복수 분야를 목표로 한다. 교과목은 「문화와 응용」과 「정치경제와 지역 발전」 두 영역에 걸쳐 있고 일본어·한국어·베트남어 과목을 두어, 이문화에 대한 이해와 동아시아에 관한 기초 지식 및 시야를 기른다.",
  ways:["수시 전형","정시 배정","별빛 추천 전형","2학년 편입 시험","전과·부전공·복수전공","외국인 학생 전형","화교 학생 전형"] },
"A-A-2": { dg:"사회과학석사　Master of Social Science, M.S.S.",
  intro:"자립적으로 사고하고 연구할 수 있는 인재를 기른다. 연구 영역과 교원 구성이 다양하며 교과목은 두 영역에 걸쳐 있다. 학생의 관심이 동아시아의 문화와 사상, 문화 창조와 응용, 동아시아 정치경제와 양안 관계, 세계화와 거버넌스 어느 쪽에 있든 이수 선택의 폭과 깊이를 모두 갖추었다.",
  ways:["추천 전형","일반 전형","석사 선수 과정","외국인 학생 전형","화교 학생 전형"] },
"A-A-3": { dg:"사회과학석사　Master of Social Science, M.S.S.",
  intro:"정식 명칭은 「국가안보·국제사무연구 재직자 석사 과정」이다. 국제정치경제학의 이론과 실무를 결합하여 국가 안보를 확보하고 국제 사무에 밝은 고급 전문 인재를 기르는 것을 목적으로 한다. 교과 과정은 종합적 국가 안보 사무와 국가 안보에 관련된 동아시아 사무 두 영역을 축으로, 연구 방법, 동아시아 지역 안보와 정치경제 정세, 문화적 소프트파워 등의 과목을 배치한다. 학과 및 교내 관련 학과 교원 외에 과목 내용에 따라 정부 관계 부처의 책임자와 외부 전문가를 초빙하여 수업과 좌담을 진행한다.",
  ways:["재직자 석사 과정 입학 시험"],
  note:"수업은 주말 홀수 주에 격주로 진행한다(실제 일정은 대학 학사력에 따른다). 해당 모집 연도의 지원자 수가 12명에 미치지 못하면 개설하지 않는다." },
"A-A-4": { dg:"사회과학박사　Doctor of Philosophy, Ph.D.",
  intro:"106학년도(2017년)에 설치되었다. 인문사회과학의 복수 분야·분야 횡단이라는 흐름에 부응한 것이다. 동아시아학과와 정치학연구소 석사 과정은 105학년도(2016년)에 이미 통합되었으며, 박사 과정도 옛 정치학연구소 박사 과정을 기반으로 연구 방향을 조정하고 시야를 넓히며 교원 진용을 강화했다. 한학 문화와 정치경제에 걸친 학제적 지역 연구를 축으로 삼고, 대만을 주체로 하여 동아시아의 국가·사회·역사·문화 관련 영역에 초점을 맞춘다.",
  fields:["동아시아의 문화와 사상","문화 산업과 그 응용","동아시아 정치경제와 양안 관계","세계화와 거버넌스"],
  ways:["추천 전형","일반 전형","박사 과정 조기 진학","외국인 학생 전형","화교 학생 전형"] }
};

/* ── 두 축과 과정 ── */
const PILLARS_KO = [
  { cls:"wen", tag:"Pillar 01", zh:"문화와 응용",
    d:"동아시아 한학, 사상사, 문학과 영화를 핵심으로 삼아 문화유산, 문화 정책, 문화 창조 산업의 실무로 확장한다.",
    tags:["동아시아 유학","국제 한학","동아시아 문학과 영화","문화유산","화교 연구","문화 정책"] },
  { cls:"zheng", tag:"Pillar 02", zh:"정치경제와 지역 발전",
    d:"국제관계이론, 비교정치, 양안 관계, 국제정치경제학을 다루며 동아시아 지역의 정치경제 동향과 안보 문제에 주목한다.",
    tags:["국제관계","양안 관계","국제정치경제학","동남아시아 정치","해양 정책","금융과 경제 성장"] }
];
const DEGREES_KO = [
  { lv:"Bachelor",  zh:"학사 과정",        dg:"B.A.",   d:"인문사회 분야의 교양 형성. 지역 횡단·복수 분야이며 일본어·한국어·베트남어 과목을 둔다." },
  { lv:"Master",    zh:"석사 과정",        dg:"M.S.S.", d:"자립적 사고와 연구 역량을 기른다. 이수 선택의 폭과 깊이를 모두 갖추었다." },
  { lv:"Executive", zh:"재직자 석사 과정", dg:"M.S.S.", d:"국가 안보와 국제 사무. 국제 실무에 밝은 고급 전문 인재를 기른다." },
  { lv:"Doctoral",  zh:"박사 과정",        dg:"Ph.D.",  d:"106학년도(2017년)부터 모집. 고급 학술 연구 인재를 기른다." }
];

/* ── 연구 센터 ── */
const CENTRES_KO = {
  "海外華人研究中心": { zh:"해외화인연구센터", en:"Research Center for the Overseas Chinese",
    focus:["해외 화인의 고향과 이주지의 사회 문화를 지역을 넘어 연구한다.",
           "해외 화인에 관한 학술 과제를 여러 분야에 걸쳐 통합적으로 연구한다.",
           "젊은 연구자의 참여를 장려한다."],
    dir:"Chiang Po-wei", rank:"석좌교수" },
  "中國大陸研究中心": { zh:"중국대륙연구센터", en:"Research Center for Mainland China Studies",
    focus:["중국 대륙 연구, 양안 관계, 국제정치, 정치학."],
    dir:"Kuan Hung-chang", rank:"부교수" },
  "日本研究中心": { zh:"일본연구센터", en:"Japan Research Center",
    focus:["일본의 정치, 외교, 안보, 경제, 문화, 사회에 관한 여러 과제."],
    dir:"Chang Kun-chiang", rank:"교수" }
};

/* ── 교원 ── */
const PEOPLE_KO = {
"林昌平":{n:"Lin Chang-ping",r:"부교수·학과장",f:"금융 발전, 경제 성장, 정치경제학, 응용 계량경제, 공간 분석"},
"張崑將":{n:"Chang Kun-chiang",r:"교수",f:"동아시아 유학, 일본 사상사, 중일 문화 비교"},
"江柏煒":{n:"Chiang Po-wei",r:"석좌교수",f:"해외 화교·화인 연구, 교향 연구, 사회문화사, 동아시아 건축과 도시, 역사 보존과 유산 보호, 문화 정책과 문화 산업 기획"},
"王冠雄":{n:"Wang Kuan-hsiung",r:"교수",f:"국제정치, 해양 정책, 국제기구, 국제법, 국제어업법"},
"范世平":{n:"Fan Shih-ping",r:"교수",f:"국제정치경제학, 중국 대륙의 정치경제 발전, 중국의 대만 정책, 양안 관계, 중국 대륙의 관광 산업, 중국 관광객의 대만 방문 정책, 중국 대륙의 교민 정책, 국부펀드"},
"潘鳳娟":{n:"Pan Feng-chuan",r:"교수",f:"문화 교류, 국제 한학, 고전 번역, 기독교와 중국, 이미지 속의 중국, 종교 간 대화"},
"田正利":{n:"Tien Cheng-li",r:"교수",f:"전략 경영, 국제 경영, 재무·금융·무역, 조직 행동과 인적 자원"},
"金恩美":{n:"Kim Eun-mi",r:"교수",f:"동아시아 문화, 근현대사 연구, 동아시아 화교, 화인 사회 근현대사"},
"張碧君":{n:"Chang Pi-chun",r:"교수",f:"동남아시아 연구, 문화 연구, 문화 지리, 문화 정치, 문화 정책"},
"關弘昌":{n:"Kuan Hung-chang",r:"부교수",f:"국제관계, 비교정치, 양안 관계"},
"胡元玲":{n:"Hu Yuan-ling",r:"부교수",f:"송명 유학, 현대 신유학, 동서 사상 비교"},
"鄭怡庭":{n:"Cheng Yi-ting",r:"부교수",f:"청말 소설, 현대 문학, 비교 문학, 북미 한학"},
"徐筱琦":{n:"Hsu Hsiao-chi",r:"부교수",f:"국제관계이론, 외교정책 분석"},
"邱愷欣":{n:"Yau Hoi-yan",r:"부교수",f:"동아시아 사회문화의 세계화, 대중문화, 젠더와 가족, 문화 창조 산업, 영화 연구, 영화 검열"},
"巫俊穎":{n:"Wu Chun-ying",r:"조교수",f:"종족 정치, 정치 행동, 동남아시아 정치, 대만 정치"},
"林書媺":{n:"Lin Shu-mei",r:"조교수",f:"동아시아 문학과 영화, 번역 이론, 영화 연구, 비교 문학"},
"黃約伯":{n:"Huang Yueh-po",r:"부교수",f:"인류학, 동아시아 문화와 사회, 동아시아 종교 사상과 실천"},
"尹筱嵐":{n:"Yin Hsiao-lan",r:"강사",f:""},
"郭國誠":{n:"Kuo Kuo-cheng",r:"교수",f:"국방 경제, 에너지 경제, 성과 평가, 재무 관리, 국제 경영, 기업의 사회적 책임"},
"林賢參":{n:"Lin Hsien-tsan",r:"교수",f:"동북아시아 지역 안보, 중국의 대외·군사 전략, 일본의 외교·국방 정책, 일중 관계"},
"孫國祥":{n:"Sun Kuo-hsiang",r:"교수",f:"국제관계이론, 공법, 아시아·태평양의 정치와 경제"},
"金志婷":{n:"Chin Chih-ting",r:"교수",f:"미시경제, 거시경제, 경제 성장, 국제 금융"},
"徐明瀚":{n:"Hsu Ming-han",r:"조교수",f:"중화권 영화, 영상 미학과 정치 이론, 동아시아 영상 문학과 문화 산업, 뉴미디어 집필과 큐레이션"},
"李圭旼":{n:"Lee Kyu-min",r:"강사",f:"한국 현대문학, 대만·한국 비교문학, 한국어 교육"},
"阮蓮香":{n:"Nguyễn Liên Hương",r:"강사",f:"베트남어, 베트남의 역사와 문화"},
"劉德良":{n:"Liu Te-liang",r:"교수급 전문기술직",f:"국방·안보, 손자병법, 양안 관계, 리더십과 통솔"},
"陳文政":{n:"Chen Wen-cheng",r:"교수",f:"입헌주의, 미국 헌법, 사법 정치, 민주화 이론, 법치와 인권"},
"潘朝陽":{n:"Pan Chao-yang",r:"교수",f:"지리 환경 사상, 사상의 지역 연구, 문화 지리, 종교 지리, 대만 지리, 중국 유학, 대만 유학"}
};

/* ── 행정 직원 ── */
const STAFF_KO = {
"鄭昶怡":{n:"Cheng Chang-yi", r:"조교", duties:[
  ["학생 지원",["학과 특색 발전 장학금 신청 접수.","기타 장학금 신청 지원."]],
  ["교무",["석사·재직자 석사·박사 과정 학적 관리: 수료 자격 심사, 미수료자 명단 처리와 후속 업무, 수료 예정자 명단 제출과 이수 절차.","석사·박사생 학위 논문 연구 계획 및 학위 시험 신청 접수.","박사 과정 자격시험 시행.","재직자 석사 과정 학적 관리: 수료 요건 작성, 논문 성과 발표회 운영, 수료 자격 심사와 미수료자 처리, 수료 예정자 명단 제출과 이수 절차."]],
  ["행정",["교원심사위원회 연락 담당.","지도교수·장학금 회의 연락 담당.","학과 부설 연구 센터 설치와 평가 업무.","국가과학및기술위원회 및 기타 수탁 사업 연락·공동 담당.","중국 대륙과의 학과 단위 학술 협정 보고.","중국 대륙 전문가·연구자·학생의 입경 허가 수속.","학과 웹사이트 관리.","기타 위임 사항."]]]},
"謝侑蓁":{n:"Hsieh Yu-chen", r:"조교", duties:[
  ["교무·교과",["학사·석사·박사 과정 수업 운영: 각 과정 및 교양 과목 개설, 전임·시간강사 담당 시수표 작성, 각 과정 시간표와 교과 구성 작성 및 갱신, 교원 휴강·대강 조정.","학사 과정 세 가지 전형(별빛 추천, 수시, 분과 시험)의 시험 실무.","학사·석사·박사 과정 외국인 학생 지원 실무.","해외 파견 교환학생 신청 및 각 단계 교환·방문 학생 관련 사무."]],
  ["총무",["경비 관리와 정산.","학과 도서·학술지·기자재 예산 신청.","도서, 학술지, 자재, 설비, 소모품, 비소모품 구매.","기자재·비소모품의 보관, 수리, 폐기.","학술 심포지엄 등의 예산 편성, 정산, 결산 지원."]],
  ["행정",["교과과정위원회 연락 담당.","학과발전위원회 연락 담당.","국제 업무: 외빈·시찰단 방문 기획, 학과 단위의 중국어·영어·일본어 학술 협정 체결과 보고.","학과 재료비 배분 지표 연락 담당.","교내 행정 추적 관리 시스템 연락 담당.","학과 평가 업무.","기타 위임 사항."]]]},
"鄭琇方":{n:"Cheng Hsiu-fang", r:"조교", duties:[
  ["교무",["학과 모집 정원, 과정의 신설·조정 업무.","국제관계·외교 학점 프로그램 창구.","학사 과정 학적 관리: 수료 요건 작성, 신입생 오리엔테이션 수강 지도와 신입생 안내 개정 지원, 수강 상담, 수료 자격 심사(부전공·복수전공 포함)와 미수료자 처리, 수료 예정자 명단 제출과 이수 절차."]],
  ["입시",["석사·박사·재직자 석사 과정 입시 실무: 모집 요강 개정, 출제·채점, 서류 심사, 구술 시험, 성적 집계, 예산 편성 지원.","학사 과정 편입 시험 및 세 가지 전형 이외 입학자의 실무: 모집 요강 개정, 전형, 성적 집계, 예산 편성 지원.","화교 학생 및 중국 대륙 학생 입시 실무: 모집 요강 개정과 전형 시행.","부전공, 복수전공, 전과 신청 사무."]],
  ["행정",["학과 사무 연석회의 연락 담당.","입시위원회 연락 담당.","학생 진로 개발 활동 지원.","졸업생 진로 조사 및 동문 업무 지원."]]]}
};

/* ── 찾아오는 길 ── */
const TRANSIT_KO = {
  metro:[["구팅역 (Guting)","단수이선·중허선·신뎬선. <b>4번 출구</b>에서 허핑둥로 방향으로 도보 약 8분."],
         ["타이뎬빌딩역 (Taipower Building)","신뎬선. <b>2번 출구</b>에서 스다로 방향으로 도보 약 8분."]],
  routes:["15","18","235","237","278","295","662","663","672","907","허핑 간선"]
};


/* ---------- 內頁文字 ---------- */
const SRC = code =>
  '<div class="note"><b>資料來源：</b>本頁內容依原站 Page='+code+' 之公開資訊整理，敘述性段落為改寫，未逐字轉載。' +
  '正式文本請以<a href="https://www.deas.ntnu.edu.tw/deas/include/index.php?Page='+code+'" target="_blank" rel="noopener">原站頁面</a>為準。</div>';
const SHELL = code =>
  '<div class="note"><b>復刻說明：</b>本頁沿用原站的頁面代碼、麵包屑與次選單結構。原站此頁的條文、附件與下載檔未納入本靜態復刻，' +
  '實際內容請參閱<a href="https://www.deas.ntnu.edu.tw/deas/include/index.php?Page='+code+'" target="_blank" rel="noopener">原站頁面</a>。</div>';

const PAGES = {
"A-8-1":{ sec:1, title:"系所簡介", en:"Overview", body:`
<p class="lead">教育目標：培育區域研究及其應用能力之跨領域人才。</p>
<h3>沿革與定位</h3>
<p>東亞學系隸屬臺灣師範大學國際與社會科學院，系館設於臺北市和平東路校本部誠大樓九樓。該系於 100 學年度由「東亞文化暨發展學系」與「國際漢學研究所」整併成立，初期分「漢學與文化組」、「政治與經濟組」兩組招收學士班與碩士班學生；104 學年度政治學研究所併入；106 學年度起增設博士班，至此形成學士、碩士、博士三級完整學制。</p>
<p>自 107 學年度起改採不分組招生，聚焦東北亞、中國、東南亞及其周邊區域，強調多學科交融，並以「文化與應用」、「政經與區域發展」為兩大主軸。學士班以人文社會領域的通才養成為目標，授予文學士（B.A.）學位；碩士班（含碩士在職專班）培育具獨立研究與實踐能力的專業人才，授予社會科學碩士（M.S.S.）學位；博士班以高階人文社會研究為主，授予社會科學博士（Ph.D.）學位。</p>
<h3>師資規模</h3>
<div class="cards3">
  <div class="minicard"><b>16 位</b><span>專任教師總數</span></div>
  <div class="minicard"><b>8 位</b><span>教授</span></div>
  <div class="minicard"><b>6 位</b><span>副教授</span></div>
  <div class="minicard"><b>2 位</b><span>助理教授</span></div>
</div>
<p style="margin-top:16px">專長領域涵蓋東亞漢學、歷史、文學、文化研究、國際關係、政治學、兩岸研究、金融與經濟學等，足以支持不同學制學生的知識養成與生涯發展。</p>
<h3>歷任系主任</h3>
<ol class="chron">
  <li>潘朝陽　教授</li><li>蔡昌言　教授</li><li>張崑將　教授</li>
  <li>江柏煒　教授</li><li>林賢參　教授</li><li>張崑將　教授</li>
  <li><b>林昌平　副教授</b><em>現任</em></li>
</ol>
<p class="chron-note">原站「系所簡介」所列歷任名單至第六任張崑將教授為止；依「專任教師」名冊，現任系主任為林昌平副教授。</p>
<h3>學系特色</h3>
<p>作為國內唯一涵蓋三級學制的東亞研究學系，該系同時是跨領域、整合性專業人才的教學研究單位，為有志投入東亞區域研究的學生提供系統性的學術訓練。學生赴外研習或深造時，可與歐美、日韓及東南亞設有東亞研究學程的名校接軌。</p>
<h4>學術研究</h4>
<p>專任師資學經歷完整、研究能量豐沛，研究範圍涵蓋東亞文化思想與應用、政經與區域研究等領域，並主持多項國家科學及技術委員會計畫與產學合作案。</p>
<h4>國際化程度</h4>
<p>教師背景多元，並聘有多名外籍教師；積極鼓勵學士班與碩士班學生赴東亞或歐美國家交換。境外生比例高，同儕之間得以相互認識不同文化。</p>
<h3>課程特色</h3>
<div class="deflist">
  <div><dt>學士班</dt><dd>培養人文社會領域通才，以跨地域、多學科為目標。課程兼具「文化與應用」與「政經與區域發展」兩大領域，並設日語、韓語課程，另援引臺師大東南亞各語系資源。代表科目包括東亞文化概論、東亞文化遺產、東南亞政治與經濟、區域研究理論與實務、東亞各國文化政策等。</dd></div>
  <div><dt>碩士班</dt><dd>培養獨立思考與獨立研究人才。研究領域涵蓋東亞文化與思想、文化創意與應用、東亞政經與兩岸關係、全球化與治理等方向，修課選擇兼具廣度與深度。</dd></div>
  <div><dt>碩士在職專班</dt><dd>「國家安全與國際事務研究碩士在職專班」旨在培育確保國家安全、嫻熟國際事務的高階精英人才，課程由三大領域構成。<b>國際關係理論研究</b>：透過理論與實踐的探討培養學術素養，增強理解與分析當前國際情勢的職能。<b>國家安全研究</b>：探討臺灣處理國家安全威脅的經驗教訓與當今威脅的認知，思考如何運用軟硬實力對應。<b>東亞區域研究</b>：培養正確認知與分析東亞區域政經發展、安全與文化交流等議題的能力。</dd></div>
  <div><dt>博士班</dt><dd>培養高階學術研究人才，扣合核心領域課程並強化跨領域研究素質。課程設計強調東亞視野、在地實踐、跨域整合與批判思考四大目標。</dd></div>
</div>
<h3>升學就業</h3>
<h4>升學</h4>
<p>報考該系或校內外文史哲相關研究所，以及政治、外交、公共事務、國家發展、大陸研究等研究所。</p>
<h4>就業</h4>
<ol>
  <li>東亞漢學、文化應用、政經議題、區域發展等研究單位或智庫的學術研究人員。</li>
  <li>外交、文化、政經、僑務、國家發展等公部門的行政或公務人員。</li>
  <li>具備專業知識的記者、編輯、旅遊從業人員、行銷、企劃與企業管理人才。</li>
  <li>日、韓、英或歐語類的外交與專業翻譯人才。</li>
  <li>文化產業等創意產業、服務業的專業人才。</li>
</ol>` + SRC("A-8-1") },

"A-8-2":{ sec:1, title:"發展理念", en:"Vision", body:`
<h3>一、發展方向</h3>
<ol>
  <li>在專業與多元的目標下建立跨地域、多學科的課程架構，延聘多元專業師資，累積國內外具影響力的學術聲望；並在適宜的生師比例下強化教學品質。</li>
  <li>積極爭取校內外研究專案與補助計畫，以研究與教學相互支援，劃分「文化與應用」、「政經與區域發展」兩大學群，善盡社會責任並培養年輕研究成員。</li>
  <li>重視學生外語能力：部分課程以全英語授課，並開設日本語、韓國語等課程，鼓勵學生善用臺師大馬來語、泰國語、越南語等資源；畢業門檻設有外語能力檢定要求。</li>
  <li>配合國家與社會發展需要，積極與國內外相關系所、機構合作。106 學年度（2017 年）起設立博士班，同時強化學士班基礎與實務應用能力、碩士班獨立研究能力之培育。</li>
  <li>積極國際接軌，爭取與世界名校簽訂合作交流計畫，吸引國際學生及專家學者，提高在國內外學術社群的影響力。</li>
  <li>重視本土研究與在地實踐，培養學生以專業知識影響社會、協助他人，落實「全球視野、在地實踐」的理念。</li>
</ol>
<h3>二、發展重點</h3>
<p>短、中、長三期目標依序推進，由課程與研究中心的建置，到資料庫、雙聯學制與學術刊物的經營，最終指向區域內具領導地位的學術單位。</p>
<div class="deflist">
  <div><dt>短期</dt><dd>以東亞文化與應用、政治經濟與區域發展為發展重點，為各學制設定不同教育目標並規劃完備課程，建立特定主題的研究中心以帶動相關領域發展。</dd></div>
  <div><dt>中期</dt><dd>規劃專題研究室、建立各類資料庫，與海外知名大學校系合作開辦雙聯學制並規劃相互承認的課程；持續經營《臺灣東亞文明研究學刊》。</dd></div>
  <div><dt>長期</dt><dd>成為國內乃至東亞地區具領導地位的學術單位，結合理論研究與在地實踐，建立完整的理論與實務體系，提供國家發展方向的建言。</dd></div>
</div>
<h3>三、歸納</h3>
<div class="cards3">
  <div class="minicard"><b>師資團隊</b><span>強調教學、研究與服務並重，期許教師的學養與專業能與時俱進，並負起大學教授作為公共知識分子的職志。</span></div>
  <div class="minicard"><b>培養學生</b><span>培育具獨立思考能力、積極進取精神、主動負責態度、優秀團隊精神、國際宏觀視野與良好品德修養的專業人才。</span></div>
  <div class="minicard"><b>課程設計</b><span>著重東亞相關範疇的分析研究，提升學生對東亞各國文化與政經的專業知能，並強調語文訓練。</span></div>
  <div class="minicard"><b>學術研究</b><span>研究範疇涵蓋漢學、東亞歷史、文化、思想、政治、經貿，聚焦東亞區域觀察與政商情資的蒐集分析應用。</span></div>
</div>` + SRC("A-8-2") },

"A-8-4": { sec:1, title:"系級中心", en:"Research Centers", body:`
<p class="lead">依發展規劃設立主題型研究中心，帶動相關領域發展；目前設有三個系級研究中心。</p>
<div class="centres"><article class="centre"><div class="centre-plate" aria-hidden="true"><img src="${IMG2.roc}" alt=""></div><div class="centre-body"><div class="centre-yr mono">EST. 2014</div><h3>海外華人研究中心</h3><div class="centre-en">Research Center for the Overseas Chinese</div><div class="centre-lab">研究重點</div><ol class="centre-focus"><li>促進跨地域之海外華人原鄉與散居地的社會文化研究。</li><li>促進多學科之海外華人學術議題的整合性研究。</li><li>鼓勵年輕學者投入相關領域之研究。</li></ol><div class="centre-foot"><a class="centre-dir" href="#/A-3-1/專任教師/130964667568d64d6857aeb"><span class="k">中心主任</span><span class="v">江柏煒　特聘教授 <i>→</i></span></a><a class="centre-site" href="https://rcocntnu.blogspot.com/" target="_blank" rel="noopener noreferrer">海外華人研究中心網站 ↗</a></div></div></article><article class="centre"><div class="centre-plate" aria-hidden="true"><span class="mk-kai">中國大陸研究中心</span></div><div class="centre-body"><div class="centre-yr mono">EST. 2015</div><h3>中國大陸研究中心</h3><div class="centre-en">Research Center for Mainland China Studies</div><div class="centre-lab">研究重點</div><ol class="centre-focus"><li>中國大陸研究、兩岸關係、國際政治、政治學。</li></ol><div class="centre-foot"><a class="centre-dir" href="#/A-3-1/專任教師/17471799068d64d6857af3"><span class="k">中心主任</span><span class="v">關弘昌　副教授 <i>→</i></span></a><a class="centre-site" href="https://vocus.cc/user/66878b86fd8978000199fb7e" target="_blank" rel="noopener noreferrer">中國大陸研究中心網站 ↗</a></div></div></article><article class="centre"><div class="centre-plate" aria-hidden="true"><span class="mk-meiryo">国立台湾師範大学東亜学科日本研究センター</span></div><div class="centre-body"><div class="centre-yr mono">EST. 2020</div><h3>日本研究中心</h3><div class="centre-en">Japan Research Center</div><div class="centre-lab">研究重點</div><ol class="centre-focus"><li>日本政治、外交、安全保障、經濟、文化以及社會等議題。</li></ol><div class="centre-foot"><a class="centre-dir" href="#/A-3-1/專任教師/36685673868d64d6857ae3"><span class="k">中心主任</span><span class="v">張崑將　教授 <i>→</i></span></a><a class="centre-site" href="https://ntnueasjrc.blogspot.com/" target="_blank" rel="noopener noreferrer">日本研究中心網站 ↗</a></div></div></article></div>
<div class="note"><b>資料來源：</b>本頁內容依原站 Page=A-8-4 之公開資訊整理，中心標誌與連結均取自原頁面。</div>`
},

"A-8-5": { sec:1, title:"系所位置", en:"Location", body:`
<p class="lead">106308 臺北市大安區和平東路一段162號（臺師大校本部　誠大樓 9 樓）</p>
<div class="maps"><figure class="mapfig"><a href="https://maps.app.goo.gl/G7UHHukk3fesCLiP9" target="_blank" rel="noopener noreferrer" aria-label="在 Google 地圖開啟該系位置"><img src="${IMG2.map}" alt="該系周邊街道圖，臺師大校本部位於和平東路一段" loading="lazy"></a><figcaption>周邊街道圖　<a href="https://maps.app.goo.gl/G7UHHukk3fesCLiP9" target="_blank" rel="noopener noreferrer">開啟 Google 地圖 ↗</a></figcaption></figure><figure class="mapfig"><img src="${IMG2.campus}" alt="臺師大校本部配置圖，誠大樓位於校區西北側" loading="lazy"><figcaption>校本部配置圖　<b>誠大樓</b>位於校區西北側，鄰近側門</figcaption></figure></div>
<h3>交通資訊</h3>
<div class="transit"><div class="tmode"><div class="thd"><span class="tico"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="13" rx="3"/><path d="M6 16l-2 4M18 16l2 4M8 19h8"/><circle cx="8.5" cy="12" r="1.2"/><circle cx="15.5" cy="12" r="1.2"/><path d="M7 7h10"/></svg></span>捷運</div><div class="deflist"><div><dt>古亭站</dt><dd>淡水線、中和線、新店線　<b>4 號出口</b>往和平東路方向直行約 8 分鐘</dd></div><div><dt>臺電大樓站</dt><dd>新店線　<b>2 號出口</b>往師大路方向直行約 8 分鐘</dd></div></div></div><div class="tmode"><div class="thd"><span class="tico"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="11" rx="2"/><path d="M5 16v3M19 16v3M3 10h18"/><circle cx="7" cy="13" r="1.2"/><circle cx="17" cy="13" r="1.2"/></svg></span>公車</div><p class="tnote">於「師大站」或「師大一站」下車，可搭乘下列路線：</p><ul class="routes"><li>15</li><li>18</li><li>235</li><li>237</li><li>278</li><li>295</li><li>662</li><li>663</li><li>672</li><li>907</li><li>和平幹線</li></ul></div></div>
<div class="note"><b>資料來源：</b>地圖與交通資訊取自原站 Page=A-8-5。原頁「自行開車」一節未載明內容，此處從略。</div>`
},

"A-A-1": { sec:2, title:"學士班", en:"Bachelor's Programme", body:`
<div class="adm-head"><div class="adm-dg mono">文學士　Bachelor of Arts, B.A.</div></div><p class="adm-intro">旨在培養人文社會領域之通才，以跨地域、多學科為目標。課程兼具「文化與應用」與「政經與區域發展」兩大領域，並設有日語、韓語及越南語課程，提供學生跨文化的認識，以及東亞區域的基本知識能力與視野。</p><div class="adm-lab">入學管道</div><ul class="adm-ways"><li>申請入學</li><li>分發入學</li><li>繁星推薦</li><li>二年級轉學考</li><li>轉系／輔系／雙主修</li><li>外國學生招生</li><li>僑生招生</li></ul>`
},

"A-A-2": { sec:2, title:"碩士班", en:"Master's Programme", body:`
<div class="adm-head"><div class="adm-dg mono">社會科學碩士　Master of Social Science, M.S.S.</div></div><p class="adm-intro">旨在培養獨立思考與獨立研究之人才。研究領域與師資陣容多元，課程兼具「文化與應用」與「政經與區域發展」兩大領域。不論學生的研究興趣為東亞文化與思想、文化創意與應用、東亞政經與兩岸關係或全球化與治理，修課選擇皆兼具廣度與深度。</p><div class="adm-lab">入學管道</div><ul class="adm-ways"><li>甄試入學</li><li>考試入學</li><li>碩士學位先修</li><li>外國學生招生</li><li>僑生招生</li></ul>`
},

"A-A-3": { sec:2, title:"碩士在職專班", en:"Executive Master's Programme", body:`
<div class="adm-head"><div class="adm-dg mono">社會科學碩士　Master of Social Science, M.S.S.</div></div><p class="adm-intro">全名為「國家安全與國際事務研究碩士在職專班」，目的在於將國際政治經濟學的理論與實務相結合，為國家社會培育確保國家安全與嫻熟國際事務的高階精英人才。課程著重綜合性國家安全事務，以及與國家安全相關的東亞事務兩個領域，並輔以研究方法、東亞區域安全與政經情勢研究、文化軟實力等課程。除運用系內及校內相關系所師資外，亦視課程內容延聘政府相關部門首長及校外專業人士參與教學及座談。</p><div class="adm-lab">入學管道</div><ul class="adm-ways"><li>碩士在職專班招生考試</li></ul><p class="adm-note"><b>注意</b>上課時間為週末單數週，採隔週上課（實際時間依學校行事曆為準）。該招生學年度總報名人數未達 12 人則停開。</p>`
},

"A-A-4": { sec:2, title:"博士班", en:"Doctoral Programme", body:`
<div class="adm-head"><div class="adm-dg mono">社會科學博士　Doctor of Philosophy, Ph.D.</div></div><p class="adm-intro">於 106 學年度（2017 年）正式成立，因應人文社會科學多學科、跨領域的發展趨勢而設。東亞學系與政治學研究所碩士班已於 105 學年度整併為東亞學系碩士班，博士班亦在原政治學研究所博士班的基礎上，進一步調整研究方向、擴展研究視野、強化師資陣容。以漢學文化及政治經濟跨學科之區域研究為發展主軸，以臺灣為主體，聚焦東亞區域的國家、社會、歷史及文化相關領域。</p><div class="adm-lab">主要研究領域</div><ul class="adm-fields"><li>東亞文化與思想</li><li>文化產業及其應用</li><li>東亞政經與兩岸關係</li><li>全球化與治理</li></ul><div class="adm-lab">入學管道</div><ul class="adm-ways"><li>甄試入學</li><li>考試入學</li><li>逕修讀博士學位</li><li>外國學生招生</li><li>僑生招生</li></ul>`
},

"A-4-5":{ sec:3, title:"國際關係與外交學分學程", en:"IR & Diplomacy Program", body:`
<p>本學程整合國際關係理論、外交政策分析與東亞區域研究之課程，供有志投入外交、國際組織與國際事務工作的學生修習。</p>
<div class="deflist">
  <div><dt>相關課程</dt><dd>國際關係理論、美國外交政策、全球化與全球治理、國際政治、國際組織、國際法、國際漁業法、臺灣外交研究、國際政治經濟學、國際政治與臺灣外交政策。</dd></div>
  <div><dt>該系授課教師</dt><dd>徐筱琦、王冠雄、關弘昌、范世平、孫國祥等。</dd></div>
  <div><dt>承辦窗口</dt><dd>鄭琇方助教　<a href="tel:+886277495396">02-7749-5396</a>　<a href="mailto:hsiufang@ntnu.edu.tw">hsiufang@ntnu.edu.tw</a></dd></div>
</div>` + SHELL("A-4-5") },

"A-5-1":{ sec:5, title:"系務法規", en:"Regulations", body:
  `<p>本頁於原站收錄系所會議規則、修業辦法、論文計畫與學位考試相關規定等法規文件，並提供檔案下載。</p>` + SHELL("A-5-1") },
"A-5-2":{ sec:5, title:"表單下載", en:"Forms", body:
  `<p>本頁於原站提供各項申請表、修業與學位考試表單之下載檔案。</p>` + SHELL("A-5-2") },
"A-5-8":{ sec:5, title:"外語門檻", en:"Language Requirement", body:
  `<p>該系各學制之畢業門檻設有外語能力檢定要求，用以引導學生的語言學習方向。詳細標準與替代方案載於原站頁面。</p>` + SHELL("A-5-8") },
"A-5-5":{ sec:5, title:"捐贈東亞", en:"Give to DEAS", body:`
<p>捐贈款項用於支持學生獎助學金、國際移動、學術活動與系務發展。</p>
<div class="deflist">
  <div><dt>捐贈洽詢</dt><dd>謝侑蓁助教（總務）　<a href="tel:+886277495413">02-7749-5413</a></dd></div>
  <div><dt>電子信箱</dt><dd><a href="mailto:deas@deps.ntnu.edu.tw">deas@deps.ntnu.edu.tw</a></dd></div>
</div>` + SHELL("A-5-5") },
"A-5-6":{ sec:5, title:"活動花絮", en:"Gallery", body:
  `<p>本頁於原站以相簿形式收錄系內演講、研討會、迎新與系友活動之紀錄照片。</p>
   <div class="note"><b>復刻說明：</b>原站相片涉及著作權與肖像權，未納入本復刻版本。</div>` },
"A-5-7":{ sec:5, title:"相關連結", en:"Links", body:`
<table class="datatable">
  <thead><tr><th style="width:34%">單位</th><th>連結</th></tr></thead>
  <tbody>
    <tr><td>國立臺灣師範大學</td><td><a href="https://www.ntnu.edu.tw/" target="_blank" rel="noopener">www.ntnu.edu.tw ↗</a></td></tr>
    <tr><td>教務處學校行事曆</td><td><a href="https://www.aa.ntnu.edu.tw/zh_tw/Calender" target="_blank" rel="noopener">教務處行事曆 ↗</a></td></tr>
    <tr><td>教務處選課專區</td><td><a href="https://www.aa.ntnu.edu.tw/zh_tw/Curriculum/CourseSelection" target="_blank" rel="noopener">選課專區 ↗</a></td></tr>
    <tr><td>東亞學系（原站）</td><td><a href="https://www.deas.ntnu.edu.tw/deas/include/index.php" target="_blank" rel="noopener">www.deas.ntnu.edu.tw ↗</a></td></tr>
  </tbody>
</table>` + SHELL("A-5-7") },

"A-6-1":{ sec:6, title:"職涯進路", en:"Career Paths", body:`
<h3>升學</h3>
<p>報考該系或校內外文史哲相關研究所，以及政治、外交、公共事務、國家發展、大陸研究等研究所。</p>
<h3>就業</h3>
<div class="cards3">
  <div class="minicard"><b>學術研究</b><span>東亞漢學、文化應用、政經議題、區域發展等研究單位或智庫。</span></div>
  <div class="minicard"><b>公部門</b><span>外交、文化、政經、僑務、國家發展等機關之行政或公務人員。</span></div>
  <div class="minicard"><b>傳播與企業</b><span>記者、編輯、旅遊從業、行銷、企劃與企業管理。</span></div>
  <div class="minicard"><b>翻譯</b><span>日、韓、英或歐語類外交與專業翻譯人才。</span></div>
  <div class="minicard"><b>文化產業</b><span>文化創意產業與服務業之專業人才。</span></div>
</div>
<h3>承辦窗口</h3>
<p>學生職涯發展活動與畢業生流向調查由鄭琇方助教協助辦理（<a href="tel:+886277495396">02-7749-5396</a>）。</p>` + SRC("A-6-1") },
"A-6-2":{ sec:6, title:"產業實習", en:"Internships", body:
  `<p>東亞學系與智庫、文化機構、外貿與旅遊產業等單位合作，提供學生實習機會與職場銜接管道；實習訊息於「最新消息」之職涯訊息類別公告。</p>
   <p><a href="#/A-2/職涯訊息">前往職涯訊息 &rsaquo;</a></p>` + SHELL("A-6-2") },
"A-6-3":{ sec:6, title:"系友傳承", en:"Alumni Voices", body:
  `<p>本頁於原站收錄系友的求學與職涯經驗分享。系友事務由鄭琇方助教協助推動。</p>` + SHELL("A-6-3") },
"A-6-4":{ sec:6, title:"職涯活動", en:"Career Events", body:
  `<p>本頁於原站公告系內舉辦之職涯講座、業師座談與校友回饋活動。</p>` + SHELL("A-6-4") },
"A-6-8":{ sec:6, title:"徵才訊息", en:"Job Openings", body:
  `<p>本頁於原站彙整各單位提供之徵才與實習訊息。該系教師徵聘公告則發布於「系所公告」。</p>
   <p><a href="#/A-2/系所公告">前往系所公告 &rsaquo;</a></p>` + SHELL("A-6-8") },
"A-6-9":{ sec:6, title:"國際移動", en:"Global Mobility", body:`
<p>積極鼓勵學士班與碩士班學生赴東亞或歐美國家交換，並爭取與世界名校簽訂合作交流計畫。赴外研習及深造可與歐美、日韓、東南亞多所設有東亞研究學程的名校接軌。</p>
<div class="deflist">
  <div><dt>交換生業務</dt><dd>謝侑蓁助教　<a href="tel:+886277495413">02-7749-5413</a>　<a href="mailto:yuichan@ntnu.edu.tw">yuichan@ntnu.edu.tw</a></dd></div>
  <div><dt>規劃方向</dt><dd>與海外知名大學校系合作開辦雙聯學制，並規劃相互承認的課程。</dd></div>
</div>` + SRC("A-6-9") }
};

/* 課程資訊：A-4-2 至 A-4-4 使用文件庫版型 */
["A-4-2","A-4-3","A-4-4"].forEach((c,i)=>{
  DOCS[c] = { total:0, cates:["修業及學分規定","論文考試","課程地圖與核心能力","畢業相關"], rows:[] };
});

/* ============================================================
   工具
   ============================================================ */
const $  = (s,el)=> (el||document).querySelector(s);
const $$ = (s,el)=> Array.prototype.slice.call((el||document).querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const enc = s => encodeURIComponent(s);
const telHref = tel => "tel:+886" + tel.replace(/^0/,"").replace(/-/g,"");

/* 依課程代碼取得所屬選單索引 */
const SEC_OF = { "A-2":0, "A-8":1, "A-A":2, "A-4":3, "A-3":4, "A-5":5, "A-6":6 };
function secIndexOf(code){
  if(PAGES[code]) return PAGES[code].sec;
  const k = Object.keys(SEC_OF).filter(p=> code.indexOf(p)===0).sort((a,b)=>b.length-a.length)[0];
  return k===undefined ? -1 : SEC_OF[k];
}

/* ============================================================
   主選單
   ============================================================ */

/* ============================================================
   共用元件
   ============================================================ */
/* 本頁目次資料，由 viewStatic 於每次路由時填入 */
let TOC = [];
function backHome(){ return '<div class="backhome"><a href="#/">'+esc(t("backHome"))+'</a></div>'; }

function pager(base, cur, pages){
  const win = 6;
  let start = Math.max(1, Math.min(cur - Math.floor(win/2), pages - win + 1));
  if(start < 1) start = 1;
  const end = Math.min(pages, start + win - 1);
  let p = cur>1 ? '<a href="'+base+'/p/'+(cur-1)+'" aria-label="上一頁">&#10094;</a>'
                : '<span class="off">&#10094;</span>';
  for(let i=start;i<=end;i++)
    p += (i===cur) ? '<span class="cur">'+i+'</span>' : '<a href="'+base+'/p/'+i+'">'+i+'</a>';
  p += cur<pages ? '<a href="'+base+'/p/'+(cur+1)+'" aria-label="下一頁">&#10095;</a>'
                 : '<span class="off">&#10095;</span>';
  p += cur<pages ? '<a href="'+base+'/p/'+pages+'" aria-label="最末頁">&raquo;</a>'
                 : '<span class="off">&raquo;</span>';
  return '<div class="pager">'+p+'</div>';
}

/* 誠大樓位置示意圖（以 SVG 繪製，非原站圖檔） */
function campusMap(){
  return '<svg viewBox="0 0 760 300" role="img" aria-label="臺師大校本部與誠大樓位置示意圖">'+
  '<rect width="760" height="300" fill="#f2efe9"/>'+
  '<g stroke="#d8d2c6" stroke-width="1">'+
    '<path d="M0 60 H760 M0 140 H760 M0 225 H760 M120 0 V300 M300 0 V300 M470 0 V300 M620 0 V300"/></g>'+
  '<rect x="0" y="132" width="760" height="18" fill="#cfc6b4"/>'+
  '<text x="620" y="145" font-size="11" fill="#4e070b" font-family="sans-serif">和平東路一段</text>'+
  '<rect x="292" y="0" width="16" height="300" fill="#cfc6b4"/>'+
  '<text x="252" y="24" font-size="11" fill="#4e070b" font-family="sans-serif">師大路</text>'+
  '<rect x="316" y="158" width="230" height="118" fill="#e6ded1" stroke="#990000" stroke-width="1.4"/>'+
  '<text x="330" y="182" font-size="13" fill="#4e070b" font-family="sans-serif" font-weight="bold">臺師大　校本部</text>'+
  '<rect x="430" y="196" width="98" height="62" fill="#990000"/>'+
  '<text x="479" y="224" font-size="12" fill="#fff" font-family="sans-serif" text-anchor="middle">誠大樓</text>'+
  '<text x="479" y="242" font-size="10.5" fill="#dbd6cc" font-family="sans-serif" text-anchor="middle">9 樓　東亞學系</text>'+
  '<g fill="#990000"><circle cx="152" cy="141" r="6"/><circle cx="300" cy="62" r="6"/></g>'+
  '<text x="152" y="126" font-size="11" fill="#990000" font-family="sans-serif" text-anchor="middle">古亭站 4 號出口</text>'+
  '<text x="300" y="47" font-size="11" fill="#990000" font-family="sans-serif" text-anchor="middle">臺電大樓站 2 號出口</text>'+
  '<g stroke="#990000" stroke-width="1.6" stroke-dasharray="5 4" fill="none">'+
    '<path d="M158 141 H420"/><path d="M300 68 V132"/></g>'+
  '<text x="290" y="160" font-size="10.5" fill="#990000" font-family="sans-serif">步行約 8 分鐘</text>'+
  '</svg>';
}

function qIcon(kind){
  const p = {
    news:'<rect x="4" y="5" width="20" height="18" rx="1.5"/><path d="M8 10h12M8 14h12M8 18h7"/>',
    admit:'<path d="M14 5 26 11 14 17 2 11z"/><path d="M7 13.5V19c0 2.2 3.1 4 7 4s7-1.8 7-4v-5.5"/>',
    grant:'<circle cx="14" cy="11" r="6.5"/><path d="M10 17l-2 7 6-3 6 3-2-7"/>',
    give:'<path d="M14 23S4 16.8 4 10.9A5.4 5.4 0 0 1 14 8a5.4 5.4 0 0 1 10 2.9C24 16.8 14 23 14 23z"/>'
  }[kind]||"";
  return '<svg viewBox="0 0 28 28" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
}
function dlIcon(){
  return '<svg viewBox="0 0 20 20" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">'+
    '<path d="M10 3v9M6.5 8.5 10 12l3.5-3.5M3.5 14.5v2h13v-2"/></svg>';
}


const PILLARS = [
  { cls:"wen", tag:"Pillar 01", zh:"文化與應用",
    d:"以東亞漢學、思想史、文學與電影為核心，延伸至文化遺產、文化政策與文化創意產業的實務應用。",
    tags:["東亞儒學","國際漢學","東亞文學與電影","文化遺產","華僑研究","文化政策"] },
  { cls:"zheng", tag:"Pillar 02", zh:"政經與區域發展",
    d:"涵蓋國際關係理論、比較政治、兩岸關係與國際政治經濟學，聚焦東亞區域的政經動態與安全議題。",
    tags:["國際關係","兩岸關係","國際政治經濟學","東南亞政治","海洋政策","金融與經濟成長"] }
];

const DEGREES = [
  { lv:"Bachelor",  zh:"學士班",       dg:"B.A.",   d:"人文社會領域通才養成，跨地域、多學科，設日語、韓語及越南語課程。", r:"#/A-A-1" },
  { lv:"Master",    zh:"碩士班",       dg:"M.S.S.", d:"培養獨立思考與獨立研究能力，修課選擇兼具廣度與深度。", r:"#/A-A-2" },
  { lv:"Executive", zh:"碩士在職專班", dg:"M.S.S.", d:"國家安全與國際事務研究，培育嫻熟國際事務的高階人才。", r:"#/A-A-3" },
  { lv:"Doctoral",  zh:"博士班",       dg:"Ph.D.",  d:"106 學年度起招生，高階學術研究人才培育。", r:"#/A-A-4" }
];


let revealObserver = null;
function bindReveal(){
  const nodes = $$(".rise, .stag");
  if(!nodes.length) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    nodes.forEach(n=>n.classList.add("in")); return;
  }
  if(revealObserver) revealObserver.disconnect();
  if(!("IntersectionObserver" in window)){ nodes.forEach(n=>n.classList.add("in")); return; }
  revealObserver = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); revealObserver.unobserve(e.target); } });
  }, {rootMargin:"0px 0px -8% 0px", threshold:.06});
  nodes.forEach(n=>revealObserver.observe(n));
}

/* ═══════════════════════════════════════════════════════════
   一頁式組建：所有內容置於同一頁，選單負責捲動定位
   ═══════════════════════════════════════════════════════════ */

let SECTIONS = SECTIONS_ZH;

const METRO_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="13" rx="3"/>'+
  '<path d="M6 16l-2 4M18 16l2 4M8 19h8"/><circle cx="8.5" cy="12" r="1.2"/><circle cx="15.5" cy="12" r="1.2"/>'+
  '<path d="M7 7h10"/></svg>';
const BUS_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="11" rx="2"/>'+
  '<path d="M5 16v3M19 16v3M3 10h18"/><circle cx="7" cy="13" r="1.2"/><circle cx="17" cy="13" r="1.2"/></svg>';
const S = id => SECTIONS.find(x=>x.id===id);
const PG = code => {
  const M = { en:PAGES_EN, ja:PAGES_JA, vi:PAGES_VI, ko:PAGES_KO }[LANG];
  return (M && M[code]) ? M[code] : PAGES[code];
};
function extBtn(url, label, note){
  return '<div class="extwrap">'+
    (note ? '<p class="extnote">'+esc(note)+'</p>' : '')+
    '<a class="extbtn" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+
      '<span>'+t('extGo')+esc(label)+'</span><i aria-hidden="true">↗</i></a></div>';
}
function extCard(url, zh, en, desc){
  return '<a class="extcard" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+
    '<span class="ec-en mono">'+esc(en)+'</span>'+
    '<span class="ec-zh">'+esc(zh)+'</span>'+
    '<span class="ec-d">'+esc(desc)+'</span>'+
    '<span class="ec-go">'+t('goSite')+' <i aria-hidden="true">↗</i></span></a>';
}
const ARW2 = '<span class="arw" aria-hidden="true">→</span>';

function secHead(s, indigo){
  const n = String(SECTIONS.indexOf(s)+1).padStart(2,"0");
  /* 漢字逐字堆疊；拉丁字母整串旋轉，逐字堆疊會難以辨讀 */
  const label = (LANG === 'en' || LANG === 'vi')
    ? '<h2 class="zh lat" style="height:'+(s.zh.length*0.72).toFixed(2)+'em">'+esc(s.zh)+'</h2>'
    : '<h2 class="zh" aria-label="'+esc(s.zh)+'">'+
        Array.from(s.zh).map(c=>'<i aria-hidden="true">'+esc(c)+'</i>').join("")+'</h2>';
  return '<div class="sec-mark'+(indigo?" indigo":"")+'">'+
    '<span class="num mono" aria-hidden="true">'+n+'</span>'+
    '<span class="rule" aria-hidden="true"></span>'+ label +
    '<span class="en" style="height:'+(s.en.length*0.82).toFixed(2)+'em">'+esc(s.en)+'</span></div>';
}
function section(s, lead, inner, cls){
  return '<section class="sec '+(cls||"sec--paper")+'" id="'+s.id+'">'+
    '<div class="wrap"><div class="sec-inner rise">'+ secHead(s, s.id==="programs"||s.id==="faculty"||s.id==="location") +
    '<div class="sec-body">'+
      (lead ? '<p class="sec-lead">'+lead+'</p>' : '') + inner +
    '</div></div></div></section>';
}
/* 取出 PAGES 內容，去掉重複的引言與資料來源附註 */
function pageBody(code){
  const p = PG(code); if(!p) return "";
  return p.body.replace(/__MAP__/g, "").trim();
}
function stripNote(html){ return html.replace(/<div class="note">[\s\S]*?<\/div>\s*$/,"").trim(); }
function stripLead(html){ return html.replace(/^\s*<p class="lead">[\s\S]*?<\/p>/,"").trim(); }

/* ── 導覽列 ── */
function renderNav(){
  $("#menu").innerHTML = SECTIONS.map(s=>
    '<li><a href="#'+s.id+'" data-spy="'+s.id+'">'+esc(s.zh)+'</a></li>').join("")+
    '<li class="to-top"><a href="#top">'+esc(t('toTop'))+'</a></li>';
}

/* ── 開場 ── */
function secOpener(){
  return '<section class="opener" id="top"><div class="wrap">'+
    '<img class="op-map" src="'+BRAND.map+'" alt="" aria-hidden="true">'+
    '<div class="op-eyebrow"><span class="bar"></span><span>'+t('eyebrow')+'</span></div>'+
    '<div class="op-head">'+
      '<div class="op-head-txt">'+
        '<h1 class="op-claim">'+t('claim')+'</h1>'+
        (t('claimEn') ? '<div class="op-claim-en">'+t('claimEn')+'</div>' : '')+
      '</div>'+
      '<img class="op-logo" src="'+BRAND.logo+'" alt="" aria-hidden="true">'+
    '</div>'+
    '<p class="op-sub">'+t('claimSub')+'</p>'+
    '<div class="op-cta">'+
      '<a class="btn-solid" href="#programs">'+t('ctaAdmit')+' '+ARW2+'</a>'+
      '<a class="btn-ghost" href="#about">'+t('ctaAbout')+' '+ARW2+'</a>'+
    '</div>'+
    '</div></section>';
}


/* ── 關於該系 ── */
function secAbout(){
  const b = stripNote(pageBody("A-8-1"));
  return section(S("about"), t('leadAbout'),
    '<div class="prose">'+stripLead(b)+'</div>');
}

/* ── 學術主軸 ── */
function secPillars(){
  return section(S("pillars"), t('leadPillars'),
    '<div class="pillars stag">'+ ({en:PILLARS_EN,ja:PILLARS_JA,vi:PILLARS_VI,ko:PILLARS_KO}[LANG] || PILLARS).map(p=>
      '<article class="pillar '+p.cls+'">'+
        '<span class="tag mono">'+esc(p.tag)+'</span>'+
        '<h3>'+esc(p.zh)+'</h3><p>'+esc(p.d)+'</p>'+
        '<ul>'+p.tags.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>'+
      '</article>').join("") +'</div>', "sec--ground");
}

/* ── 理念帶：全頁中段的深色喘息點 ── */
function bandMotto(){
  return '<section class="band" aria-label="發展理念"><div class="wrap rise">'+
    '<div class="band-motto">'+UI.motto[LI()].map(x=>'<span>'+x+'</span>').join('')+'</div>'+
    '<p class="band-text">'+t('mottoText')+'</p>'+
    '<p class="band-src mono">'+t('mottoSrc')+'</p>'+
  '</div></section>';
}

/* ── 發展理念 ── */
function secVision(){
  return section(S("vision"), t('leadVision'),
    '<div class="prose">'+stripNote(pageBody("A-8-2"))+'</div>', "sec--paper");
}

/* ── 學制與招生 ── */
/* 原站各學制專頁：A-4-1 學士班、A-4-2 碩士班、A-4-3 碩專班、A-4-4 博士班、A-4-5 學分學程 */
const DEGPAGE = ["A-4-1","A-4-2","A-4-3","A-4-4"];
function secPrograms(){
  const codes=[["A-A-1","學士班","Bachelor's","学士課程","Cử nhân"],
               ["A-A-2","碩士班","Master's","修士課程","Thạc sĩ"],
               ["A-A-3","碩士在職專班","Executive Master's","社会人修士課程","Thạc sĩ vừa làm vừa học"],
               ["A-A-4","博士班","Doctoral","博士課程","Tiến sĩ"]];
  const DEG = {en:DEGREES_EN,ja:DEGREES_JA,vi:DEGREES_VI,ko:DEGREES_KO}[LANG] || DEGREES;
  const cards = DEG.map((d,i)=>
    '<button type="button" class="degree deg-card" role="tab" aria-controls="adm-'+i+'"'+
      ' aria-selected="'+(i?'false':'true')+'">'+
      '<span class="lv mono">'+esc(d.lv)+'</span><span class="dt">'+esc(d.zh)+'</span>'+
      '<span class="dg mono">'+esc(d.dg)+'</span><span class="ds">'+esc(d.d)+'</span>'+
      '<span class="pick" aria-hidden="true">'+T("詳細資訊 →","Details →","詳細 →","Chi tiết →","자세히 →")+'</span></button>').join("");
  const panes = codes.map(([c,zh,en,ja,vi],i)=>{
    const nm = { en:en, ja:ja, vi:vi }[LANG] || zh;
    return '<div class="tabpane prose" id="adm-'+i+'" role="tabpanel" aria-label="'+esc(nm)+'"'+
      (i?' hidden':'')+'>'+ admBody(c) +
      extBtn(SITE+DEGPAGE[i], nm, t('extNoteAdm'))+'</div>';
  }).join("");
  return section(S("programs"), t('leadPrograms'),
    '<div class="degrees stag" data-tabs role="tablist" aria-label="'+T("學制","Degree programs","課程","Chương trình","과정")+'">'+cards+'</div>'+
    '<div class="admbox">'+panes+'</div>', "sec--tint");
}

/* 招生內文：中文沿用 PAGES，英文由 ADM_EN 組裝 */
function admBody(code){
  const M = { en:ADM_EN, ja:ADM_JA, vi:ADM_VI, ko:ADM_KO }[LANG];
  const d = M ? M[code] : null;
  if(!d) return stripNote(pageBody(code));
  let h = '<div class="adm-head"><div class="adm-dg mono">'+esc(d.dg)+'</div></div>'+
          '<p class="adm-intro">'+esc(d.intro)+'</p>';
  if(d.fields) h += '<div class="adm-lab">'+t('aFields')+'</div><ul class="adm-fields">'+
                    d.fields.map(f=>'<li>'+esc(f)+'</li>').join("")+'</ul>';
  h += '<div class="adm-lab">'+t('aWays')+'</div><ul class="adm-ways">'+
       d.ways.map(w=>'<li>'+esc(w)+'</li>').join("")+'</ul>';
  if(d.note) h += '<p class="adm-note"><b>'+t('aNote')+'</b>'+esc(d.note)+'</p>';
  return h;
}

/* ── 課程資訊 ── */
function secCurriculum(){
  return section(S("curriculum"),
    t('leadCurric'),
    '<div class="prose">'+stripNote(stripLead(pageBody("A-4-5")))+'</div>'+
    extBtn(SITE+"A-4-5", T("國際關係與外交學分學程","Credit Program in International Relations and Diplomacy"),
      t('extNoteCur')),
    "sec--paper");
}

/* ── 系級中心 ── */
function secCenters(){
  if(LANG === 'zh')
    return section(S("centers"), t('leadCenters'),
      stripNote(stripLead(pageBody("A-8-4"))), "sec--ground");
  const SRC = { ja:CENTRES_JA, vi:CENTRES_VI, ko:CENTRES_KO }[LANG] || CENTRES_EN;
  const MARK = {
    "海外華人研究中心": '<img src="'+IMG2.roc+'" alt="" aria-hidden="true">',
    "中國大陸研究中心": '<span class="mk-kai">中國大陸研究中心</span>',
    "日本研究中心":     '<span class="mk-meiryo">国立台湾師範大学東亜学科日本研究センター</span>'
  };
  const YR   = {"海外華人研究中心":"2014","中國大陸研究中心":"2015","日本研究中心":"2020"};
  const TID  = {"海外華人研究中心":"130964667568d64d6857aeb",
                "中國大陸研究中心":"17471799068d64d6857af3",
                "日本研究中心":"36685673868d64d6857ae3"};
  const URL  = {"海外華人研究中心":"https://rcocntnu.blogspot.com/",
                "中國大陸研究中心":"https://vocus.cc/user/66878b86fd8978000199fb7e",
                "日本研究中心":"https://ntnueasjrc.blogspot.com/"};
  const cards = Object.keys(SRC).map(k=>{
    const c = SRC[k];
    return '<article class="centre">'+
      '<div class="centre-plate" aria-hidden="true">'+MARK[k]+'</div>'+
      '<div class="centre-body">'+
        '<div class="centre-yr mono">EST. '+YR[k]+'</div>'+
        '<h3>'+esc(c.zh)+'</h3>'+
        '<div class="centre-en">'+esc(c.en)+'</div>'+
        '<div class="centre-lab">'+t('cFocus')+'</div><ol class="centre-focus">'+
          c.focus.map(f=>'<li>'+esc(f)+'</li>').join("")+'</ol>'+
        '<div class="centre-foot">'+
          '<span class="centre-dir"><span class="k">'+t('cDir')+'</span>'+
            '<span class="v">'+esc(c.dir)+'　'+esc(c.rank)+'</span></span>'+
          '<a class="centre-site" href="'+URL[k]+'" target="_blank" rel="noopener noreferrer">'+
            esc(c.zh)+T('網站 ↗',' — website ↗','ウェブサイト ↗',' — trang web ↗',' 웹사이트 ↗')+'</a>'+
        '</div></div></article>';
  }).join("");
  return section(S("centers"), t('leadCenters'),
    '<div class="centres">'+cards+'</div>', "sec--ground");
}

/* ── 系所成員 ── */
function facultyCard(f, cat){
  const CAT = { "合聘教師":" joint", "兼任教師":" adjunct", "榮退教師":" emeritus" };
  const cls = CAT[cat] || "";
  const M   = { en:PEOPLE_EN, ja:PEOPLE_JA, vi:PEOPLE_VI, ko:PEOPLE_KO }[LANG];
  const p   = M ? M[f.name] : null;
  const nm  = (p && p.n) ? p.n : f.name;
  const rk  = p ? p.r : f.rank;
  const fld = p ? p.f : f.field;
  const av  = f.name.charAt(0);
  const rows=[];
  if(fld)     rows.push([t('fField'), esc(fld)]);
  if(f.tel)   rows.push([t('fTel'), '<a class="mono" href="'+telHref(f.tel)+'">'+esc(f.tel)+'</a>']);
  if(f.mail)  rows.push([t('fMail'), '<a class="mono" href="mailto:'+esc(f.mail)+'">'+esc(f.mail)+'</a>']);
  if(f.web)   rows.push([t('fWeb'), '<a href="'+esc(f.web)+'" target="_blank" rel="noopener noreferrer">'+
                esc(f.web.replace(/^https?:\/\//,"").slice(0,44))+' ↗</a>']);
  if(f.office)rows.push([t('fOffice'), esc(f.office)]);
  const teach = (LANG==='zh' && f.teach)
    ? '<details class="fteach"><summary>'+t('fTeach')+'</summary><div>'+esc(f.teach)+'</div></details>' : "";
  const zhName = (p && p.n) ? '<span class="zhn">'+esc(f.name)+'</span>' : '';
  return '<article class="fcard" id="t-'+esc(f.id)+'">'+
    '<span class="mono-av" style="background-image:url('+SEAL+')" aria-hidden="true">'+esc(av)+'</span>'+
    '<div class="info"><div class="name">'+esc(nm)+zhName+
      '<span class="rk'+cls+'">'+esc(rk)+'</span></div>'+
      rows.map(r=>'<div class="frow"><span class="k">'+r[0]+'</span><span class="v">'+r[1]+'</span></div>').join("")+
      teach+'</div></article>';
}
function staffCard(s){
  const M  = { en:STAFF_EN, ja:STAFF_JA, vi:STAFF_VI, ko:STAFF_KO }[LANG];
  const p  = M ? M[s.name] : null;
  const nm = (p && p.n) ? p.n : s.name;
  const rk = p ? p.r : s.rank;
  const du = p ? p.duties : s.duties;
  const zhName = (p && p.n) ? '<span class="zhn">'+esc(s.name)+'</span>' : '';
  return '<article class="scard"><div class="shd">'+
    '<span class="mono-av sm" style="background-image:url('+SEAL+')" aria-hidden="true">'+
      esc(s.name.charAt(0))+'</span>'+
    '<b>'+esc(nm)+zhName+'</b><em>'+esc(rk)+'</em>'+
    '<span class="contact">'+(s.tel?'<a href="'+telHref(s.tel)+'">'+esc(s.tel)+'</a>':'')+
    (s.mail?'　<a href="mailto:'+esc(s.mail)+'">'+esc(s.mail)+'</a>':'')+'</span></div>'+
    du.map(d=>'<div class="duty"><b>'+esc(d[0])+'</b><ol>'+
      d[1].map(i=>'<li>'+esc(i)+'</li>').join("")+'</ol></div>').join("")+'</article>';
}
function secFaculty(){
  const cats = Object.keys(PEOPLE);
  const CATNAME = {"專任教師":t('catFull'),"合聘教師":t('catJoint'),
                   "兼任教師":t('catAdjunct'),"榮退教師":t('catEmeritus')};
  const tabs = cats.map((c,i)=>
    '<button type="button" role="tab" aria-controls="fac-'+i+'" aria-selected="'+(i?'false':'true')+'">'+
    esc(CATNAME[c]||c)+'<span class="cnt mono">'+PEOPLE[c].length+'</span></button>').join("")+
    '<button type="button" role="tab" aria-controls="fac-'+cats.length+'" aria-selected="false">'+
    esc(t('catStaff'))+'<span class="cnt mono">'+STAFF.length+'</span></button>';
  const panes = cats.map((c,i)=>
    '<div class="tabpane" id="fac-'+i+'" role="tabpanel"'+(i?' hidden':'')+'>'+
      '<div class="faculty">'+PEOPLE[c].map(f=>facultyCard(f,c)).join("")+'</div></div>').join("")+
    '<div class="tabpane" id="fac-'+cats.length+'" role="tabpanel" hidden>'+
      '<div class="staff">'+STAFF.map(staffCard).join("")+'</div></div>';
  return section(S("faculty"),
    t('leadFaculty'),
    '<div class="cvtabs fac" data-tabs><div class="tabbar" role="tablist">'+tabs+'</div>'+panes+'</div>',
    "sec--paper");
}


/* ── 系所位置 ── */
function secLocation(){
  const TR = { ja:TRANSIT_JA, vi:TRANSIT_VI, ko:TRANSIT_KO, zh:TRANSIT_ZH }[LANG] || TRANSIT_EN;
  const GM = "https://maps.app.goo.gl/G7UHHukk3fesCLiP9";
  const maps =
    '<div class="maps">'+
      '<figure class="mapfig mapfig--embed">'+
        '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1807.6251455465854!2d121.5263677!3d25.0255787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9857a3d9c47%3A0xf922ba2ba8bcabd7!2sDepartment%20of%20East%20Asian%20Studies%2C%20National%20Taiwan%20Normal%20University!5e0!3m2!1sen!2sus!4v1786315174197!5m2!1sen!2sus" title="'+
          T('本系位置的 Google 地圖','Google map of the department location',
            '所在地の Google マップ','Bản đồ Google về vị trí khoa')+
        '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'+
        '<figcaption>'+t('mapCap1')+
          '<a href="'+GM+'" target="_blank" rel="noopener noreferrer">'+t('mapOpen')+'</a>'+
        '</figcaption></figure>'+
      '<figure class="mapfig">'+
        '<img src="'+IMG2.campus+'" alt="'+T('校本部配置圖','Plan of the NTNU Main Campus; Cheng Building is on the northwest side','校本部配置図','Sơ đồ khuôn viên chính NTNU','본교 배치도')+'" loading="lazy">'+
        '<figcaption>'+t('mapCap2')+'</figcaption></figure>'+
    '</div>';
  const metro = TR.metro.map(m=>
    '<div><dt>'+esc(m[0])+'</dt><dd>'+m[1]+'</dd></div>').join("");
  const transit =
    '<div class="transit">'+
      '<div class="tmode"><div class="thd"><span class="tico">'+METRO_ICON+'</span>'+t('tMetro')+'</div>'+
        '<div class="deflist">'+metro+'</div></div>'+
      '<div class="tmode"><div class="thd"><span class="tico">'+BUS_ICON+'</span>'+t('tBus')+'</div>'+
        '<p class="tnote">'+t('tBusNote')+'</p>'+
        '<ul class="routes">'+TR.routes.map(r=>'<li>'+esc(r)+'</li>').join("")+'</ul></div>'+
    '</div>';
  return section(S("location"), "",
    '<p class="lead">'+T('106308 臺北市大安區和平東路一段162號（臺師大校本部　誠大樓 9 樓）',
      'No. 162, Sec. 1, Heping E. Rd., Da\u2019an Dist., Taipei City 106308, Taiwan　(9F, Cheng Building, NTNU Main Campus)',
      '106308 台北市大安区和平東路一段162号（台湾師範大学 校本部・誠大楼9階）',
      'Số 162, Đoạn 1, Đường Heping East, Quận Da\u2019an, Thành phố Đài Bắc 106308, Đài Loan　(Tầng 9, Tòa nhà Cheng, Khuôn viên chính NTNU)',
      '106308 타이베이시 다안구 허핑둥로 1가 162호　(국립대만사범대학 본교 Cheng Building 9층)')+'</p>'+ maps +
    '<h3>'+T("交通資訊","Getting Here","アクセス","Đi lại","찾아오는 길")+'</h3>'+ transit, "sec--sand");
}

/* ── 相關資源與職涯（外部連結） ── */
function secLinks(){
  return '<section class="quick alt" id="resources"><div class="wrap rise">'+
    '<div class="qhd"><h2>'+t('moreTitle')+'</h2><p>'+t('moreLead')+'</p></div>'+
    '<div class="extgrid">'+
      extCard(SITE+"A-5-1", t('resZh'), t('resEn'), t('resDesc'))+
      extCard(SITE+"A-6-1", t('carZh'), t('carEn'), t('carDesc'))+
    '</div></div></section>';
}

/* ── 組裝整頁 ── */
function buildPage(){
  $("#main").innerHTML = applyNoBreak(
    secOpener() + secAbout() + secPillars() + bandMotto() + secVision() +
    secPrograms() + secCurriculum() + secCenters() + secFaculty() +
    secLocation() + secLinks());
  renderNav();
  bindTabs();
  bindReveal();
  bindSpy();
  bindSmoothScroll();
}

/* ── 分頁籤（招生、師資） ── */
function bindTabs(){
  $$("[data-tabs]").forEach(box=>{
    const btns = $$('[role="tab"]', box);
    btns.forEach(b=> b.addEventListener("click", ()=>{
      btns.forEach(x=>{
        x.setAttribute("aria-selected","false");
        const pane = document.getElementById(x.getAttribute("aria-controls"));
        if(pane) pane.hidden = true;
      });
      b.setAttribute("aria-selected","true");
      const pane = document.getElementById(b.getAttribute("aria-controls"));
      if(pane) pane.hidden = false;
    }));
  });
}


/* ── 捲動定位高亮 ── */
let spyObserver = null;
function bindSpy(){
  if(spyObserver) spyObserver.disconnect();
  const links = {};
  $$("#menu a[data-spy]").forEach(a=> links[a.dataset.spy] = a);
  const ids = Object.keys(links);
  if(!ids.length || !("IntersectionObserver" in window)) return;
  spyObserver = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        Object.values(links).forEach(a=> a.removeAttribute("aria-current"));
        const a = links[e.target.id];
        if(a) a.setAttribute("aria-current","true");
      }
    });
  }, { rootMargin:"-72px 0px -62% 0px", threshold:0 });
  ids.forEach(id=>{ const el = document.getElementById(id); if(el) spyObserver.observe(el); });

  /* 捲動至首段之上時清除高亮，否則會殘留最後一次的狀態 */
  const first = document.getElementById(ids[0]);
  window.addEventListener("scroll", ()=>{
    if(first && window.scrollY + 90 < first.offsetTop)
      Object.values(links).forEach(a=> a.removeAttribute("aria-current"));
  }, { passive:true });
}

/* ── 平滑捲動（含固定選單偏移；行動版點擊後收合選單） ── */
function bindSmoothScroll(){
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("click", e=>{
    const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if(!a) return;
    const id = a.getAttribute("href").slice(1);
    if(!id) return;
    const el = document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    const navH = $(".mainnav") ? $(".mainnav").getBoundingClientRect().height : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - (id==="top" ? 0 : navH - 1);
    window.scrollTo({ top: Math.max(0,y), behavior: reduce ? "auto" : "smooth" });
    closeNav();
    /* 不寫入 history：變更網址會被沙箱環境判定為外部導向 */
  });
}

/* ── 閱讀進度：長頁需要進度感知 ── */
function bindProgress(){
  const bar = document.getElementById("readbar");
  if(!bar) return;
  let ticking = false;
  function update(){
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    bar.style.width = pct.toFixed(2) + "%";
    ticking = false;
  }
  window.addEventListener("scroll", ()=>{
    if(!ticking){ ticking = true; window.requestAnimationFrame(update); }
  }, { passive:true });
  window.addEventListener("resize", update, { passive:true });
  update();
}

/* ── 單一浮動鈕：寬螢幕回頂，窄螢幕開選單 ── */
const NARROW = () => window.matchMedia("(max-width:820px)").matches;

function closeNav(){
  const nav = $("#mainnav"), fab = $("#fab");
  if(nav) nav.classList.remove("open");
  if(fab) fab.setAttribute("aria-expanded","false");
  document.body.style.overflow = "";
  syncFab();
}
function openNav(){
  const nav = $("#mainnav"), fab = $("#fab");
  if(nav) nav.classList.add("open");
  if(fab){ fab.setAttribute("aria-expanded","true"); fab.setAttribute("aria-label", t('close')); }
  document.body.style.overflow = "hidden";
}
function syncFab(){
  const fab = $("#fab"); if(!fab) return;
  const open = fab.getAttribute("aria-expanded") === "true";
  fab.setAttribute("aria-label", NARROW() ? (open ? t('close') : t('menu')) : t('toTop'));
}
function bindFab(){
  const fab = $("#fab"); if(!fab) return;
  fab.addEventListener("click", ()=>{
    if(NARROW()){
      $("#mainnav").classList.contains("open") ? closeNav() : openNav();
    } else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top:0, behavior: reduce ? "auto" : "smooth" });
    }
  });
  window.addEventListener("scroll", ()=>{
    if(!NARROW()) fab.classList.toggle("show", window.scrollY > 600);
  }, { passive:true });
  window.addEventListener("resize", ()=>{
    if(!NARROW()){ closeNav(); fab.classList.toggle("show", window.scrollY > 600); }
    syncFab();
  }, { passive:true });
  document.addEventListener("keydown", e=>{
    if(e.key === "Escape" && $("#mainnav").classList.contains("open")){ closeNav(); fab.focus(); }
  });
  syncFab();
}

/* ── 語言切換 ── */
function applyLang(){
  SECTIONS = { en:SECTIONS_EN, ja:SECTIONS_JA, vi:SECTIONS_VI, ko:SECTIONS_KO }[LANG] || SECTIONS_ZH;
  document.documentElement.lang =
    { en:"en", ja:"ja", vi:"vi", ko:"ko" }[LANG] || "zh-Hant-TW";
  document.title = T("國立臺灣師範大學　東亞學系",
    "Department of East Asian Studies, National Taiwan Normal University",
    "国立台湾師範大学　東亜学科",
    "Khoa Nghiên cứu Đông Á, Đại học Sư phạm Quốc lập Đài Loan",
    "국립대만사범대학　동아시아학과");
  const q = (s)=>document.querySelector(s);
  if(q("#skiplink"))  q("#skiplink").textContent  = t('skip');
  if(q("#dept-zh"))   q("#dept-zh").textContent   = t('deptZh');
  if(q("#dept-en"))   q("#dept-en").textContent   = t('deptEn');
  syncFab();
  const LNAME = { zh:"中文", en:"English", ja:"日本語", vi:"Tiếng Việt", ko:"한국어" };
  const cur = document.getElementById("lang-cur");
  if(cur) cur.textContent = LNAME[LANG] || "中文";
  $$("#lang-list li").forEach(li=>
    li.setAttribute("aria-selected", String(li.dataset.lang === LANG)));
  const lb = document.getElementById("lang-btn");
  if(lb) lb.setAttribute("aria-label", t('langLabel') + "：" + (LNAME[LANG] || ""));
  /* 頁尾 */
  const fh = q(".foot .foot-h"); if(fh) fh.textContent = t('footAddrHd');
  const fa = q(".foot .sm");
  if(fa) fa.innerHTML = t('footAddr') +
    '<br><a href="https://maps.app.goo.gl/G7UHHukk3fesCLiP9" target="_blank" rel="noreferrer noopener">'+
    t('footMapLink')+'</a>';
  const fn = q(".foot-brand .zh");  if(fn) fn.textContent = t('footName');
  const fe = q(".foot-brand .en");  if(fe) fe.textContent = t('footEn');
  const fm = q(".foot-brand .mottos");
  if(fm) fm.textContent = UI.motto[LI()].join("　");
  const cp = q(".foot-dark span"); if(cp) cp.textContent = t('copyright');
  const ao = q("#asof"); if(ao) ao.textContent = t('asOf');
  buildPage();
  window.scrollTo({ top:0, behavior:"auto" });
}

/* ── 語言選單：單一控制項，支援鍵盤操作 ── */
function bindLangMenu(){
  const btn  = document.getElementById("lang-btn");
  const list = document.getElementById("lang-list");
  if(!btn || !list) return;
  const items = $$("li", list);
  let fi = 0;

  function open(){
    list.hidden = false;
    btn.setAttribute("aria-expanded","true");
    fi = Math.max(0, items.findIndex(li=> li.dataset.lang === LANG));
    mark();
    list.focus();
  }
  function close(back){
    list.hidden = true;
    btn.setAttribute("aria-expanded","false");
    items.forEach(li=> li.classList.remove("focus"));
    if(back) btn.focus();
  }
  function mark(){ items.forEach((li,i)=> li.classList.toggle("focus", i===fi)); }
  function pick(li){
    close(true);
    if(LANG === li.dataset.lang) return;
    LANG = li.dataset.lang;
    applyLang();
  }

  btn.addEventListener("click", ()=> list.hidden ? open() : close(false));
  items.forEach((li,i)=>{
    li.addEventListener("click", ()=> pick(li));
    li.addEventListener("mouseenter", ()=>{ fi = i; mark(); });
  });
  list.addEventListener("keydown", e=>{
    if(e.key === "Escape"){ e.preventDefault(); close(true); }
    else if(e.key === "ArrowDown"){ e.preventDefault(); fi = (fi+1) % items.length; mark(); }
    else if(e.key === "ArrowUp"){ e.preventDefault(); fi = (fi-1+items.length) % items.length; mark(); }
    else if(e.key === "Home"){ e.preventDefault(); fi = 0; mark(); }
    else if(e.key === "End"){ e.preventDefault(); fi = items.length-1; mark(); }
    else if(e.key === "Enter" || e.key === " "){ e.preventDefault(); pick(items[fi]); }
  });
  btn.addEventListener("keydown", e=>{
    if(e.key === "ArrowDown" || e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); }
  });
  document.addEventListener("click", e=>{
    if(!list.hidden && !e.target.closest(".langsw")) close(false);
  });
}

function init(){
  bindLangMenu();
  applyLang();
  bindProgress();
  bindFab();
  initLogo();
}
/* 原檔此處為 document.addEventListener("DOMContentLoaded", init);
   於 React 中改由下方元件的 useEffect 觸發，演算法本身未更動。 */

/* ─────────────────────────────────────────────────────────────────
   原檔 <body> 靜態骨架，逐元素轉為 JSX
   ───────────────────────────────────────────────────────────────── */
export default function App() {
  const booted = useRef(false);

  useEffect(() => {
    /* React 嚴格模式會重複掛載，此旗標確保 init() 僅執行一次，
       與原檔 DOMContentLoaded 只觸發一次的行為一致。 */
    if (booted.current) return;
    booted.current = true;
    init();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <a className="skip" href="#main" id="skiplink">跳至主要內容</a>



      <header className="masthead"><div className="wrap">
        <a className="brandmark" href="https://www.ntnu.edu.tw/" target="_blank" rel="noopener noreferrer" aria-label="國立臺灣師範大學">
          <img id="ntnu-logo" alt="國立臺灣師範大學" width="228" />
        </a>
        <span className="brandrule" aria-hidden="true"></span>
        <a className="deptname" href="#/">
          <span className="zh" id="dept-zh">東亞學系</span>
          <span className="en" id="dept-en">DEPARTMENT OF EAST ASIAN STUDIES</span>
        </a>
        <span className="spacer"></span>
        <div className="langsw">
          <button className="lang-btn" type="button" id="lang-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="lang-list">
            <svg className="lang-globe" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
              <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
            </svg>
            <span className="vh" id="lang-cur">中文</span>
          </button>
          <ul className="lang-list" id="lang-list" role="listbox" tabIndex="-1" hidden>
            <li role="option" data-lang="zh" aria-selected="true">中文</li>
            <li role="option" data-lang="en" aria-selected="false">English</li>
            <li role="option" data-lang="ja" aria-selected="false">日本語</li>
            <li role="option" data-lang="vi" aria-selected="false">Tiếng Việt</li>
            <li role="option" data-lang="ko" aria-selected="false">한국어</li>
          </ul>
        </div>
      </div></header>

      <nav className="mainnav" id="mainnav" aria-label="主選單"><div className="wrap"><ul className="menu" id="menu"></ul></div><div className="readtrack" aria-hidden="true"><i id="readbar"></i></div></nav>

      <main id="main" tabIndex="-1"></main>

      <footer className="foot-sand"><div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="zh">國立臺灣師範大學　東亞學系</div>
            <div className="en">Department of East Asian Studies, NTNU</div>
            <div className="mottos">全球視野　在地實踐</div>
          </div>
          <div className="foot">
            <h3 className="foot-h">系所位置</h3>
            <div className="sm">106308 臺北市大安區和平東路一段162號<br />臺師大校本部　誠大樓9樓<br />
              <a href="https://maps.app.goo.gl/G7UHHukk3fesCLiP9" target="_blank" rel="noreferrer noopener">在地圖上開啟</a></div>
            <a href="mailto:deas@deps.ntnu.edu.tw" className="footmail">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M.05 3.55 8 8.99l7.95-5.44A2 2 0 0 0 14 2H2A2 2 0 0 0 .05 3.55zM16 5.4l-8 5.47L0 5.4V12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4z" /></svg>
              deas@deps.ntnu.edu.tw</a>
          </div>
        </div></div></footer>
      <footer className="foot-dark"><div className="wrap">
        <span>國立臺灣師範大學　東亞學系</span>
        <span className="asof" id="asof"></span>
        </div></footer>
      <button className="fab" type="button" id="fab" aria-label="回到頁首" aria-expanded="false" aria-controls="mainnav">
        <svg className="fab-top" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        <svg className="fab-menu" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg className="fab-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </>
  );
}
