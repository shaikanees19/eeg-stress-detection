/* =====================================================
   EEG Stress Monitoring System — script.js
   ===================================================== */
 
// ── GitHub raw JSON URL ──────────────────────────────
// This points to the output.json your MATLAB pushes to GitHub
const JSON_URL =
  'https://raw.githubusercontent.com/shaikanees19/eeg-stress-detection/main/output.json';
 
// Refresh interval in milliseconds (5 seconds)
const REFRESH_MS = 5000;
 
// ── Chart.js instance (kept across refreshes) ────────
let eegChart = null;
 
// ── Colour logic based on stress % ──────────────────
function stressColor(pct) {
  if (pct < 40) return '#10b981'; // green  — LOW
  if (pct < 70) return '#f59e0b'; // yellow — MODERATE
  return '#ef4444';                // red    — HIGH
}
 
// ── Style the Final Decision panel by label ──────────
function applyDecisionStyle(label) {
  const box   = document.getElementById('decisionBox');
  const state = document.getElementById('decisionState');
  const after = box.querySelector('::after'); // cosmetic only
 
  const low  = label.toLowerCase().includes('low');
  const high = label.toLowerCase().includes('high');
 
  if (low) {
    box.style.background  = 'linear-gradient(135deg,rgba(16,185,129,.07),rgba(0,212,255,.04))';
    box.style.borderColor = 'rgba(16,185,129,.35)';
    state.style.color     = '#10b981';
  } else if (high) {
    box.style.background  = 'linear-gradient(135deg,rgba(239,68,68,.07),rgba(245,158,11,.04))';
    box.style.borderColor = 'rgba(239,68,68,.35)';
    state.style.color     = '#ef4444';
  } else {
    // moderate
    box.style.background  = 'linear-gradient(135deg,rgba(245,158,11,.07),rgba(239,68,68,.04))';
    box.style.borderColor = 'rgba(245,158,11,.35)';
    state.style.color     = '#f59e0b';
  }
}
 
// ── Tiny helpers ─────────────────────────────────────
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val;
}
 
function setBar(id, ratio) {
  const el = document.getElementById(id);
  if (el) el.style.width = Math.min(Math.max(ratio, 0), 1) * 100 + '%';
}
 
function f4(v) { return (parseFloat(v) || 0).toFixed(4); }
function f2(v) { return (parseFloat(v) || 0).toFixed(2); }
 
// ── Main data fetch & UI update ──────────────────────
async function loadEEGData() {
  try {
    // Cache-bust: append timestamp so browser always fetches fresh file
    const res = await fetch(JSON_URL + '?t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const d = await res.json();
 
    // Hide error banner on success
    document.getElementById('errorBanner').style.display = 'none';
 
    // ── ① Stress Level card ──────────────────────────
    const pct   = parseFloat(d.stress_percentage) || 0;
    const color = stressColor(pct);
 
    const stressNumEl = document.getElementById('stressNum');
    stressNumEl.innerText   = f2(pct) + '%';
    stressNumEl.style.color = color;
 
    const stressTagEl = document.getElementById('stressTag');
    stressTagEl.innerText   = d.stress_label || '--';
    stressTagEl.style.color = color;
 
    const fill = document.getElementById('stressFill');
    fill.style.width      = Math.min(pct, 100) + '%';
    fill.style.background = color;
    fill.style.color      = color; // used for box-shadow currentColor
 
    // ── ② Final Decision card ────────────────────────
    setText('decisionState', d.stress_label || '--');
    setText('decisionPctSpan', f2(pct) + '%');
    applyDecisionStyle(d.stress_label || '');
 
    // ── ③ Band Powers card ───────────────────────────
    setText('bDelta', f4(d.delta_power));
    setText('bTheta', f4(d.theta_power));
    setText('bAlpha', f4(d.alpha_power));
    setText('bBeta',  f4(d.beta_power));
    setText('bGamma', f4(d.gamma_power));
 
    // ── ④ Stress Indices card ────────────────────────
    setText('idxBA',  f4(d.beta_alpha_ratio));
    setText('idxBAT', f4(d.beta_alpha_theta_ratio));
 
    // ── ⑤ Relative Powers card ───────────────────────
    const rels = {
      rDelta: parseFloat(d.relative_delta) || 0,
      rTheta: parseFloat(d.relative_theta) || 0,
      rAlpha: parseFloat(d.relative_alpha) || 0,
      rBeta:  parseFloat(d.relative_beta)  || 0,
      rGamma: parseFloat(d.relative_gamma) || 0,
    };
 
    for (const [key, val] of Object.entries(rels)) {
      setText(key,          val.toFixed(4));
      setBar(key + 'Bar',   val);
    }
 
    // ── ⑥ Live Chart ─────────────────────────────────
    const chartVals = [
      rels.rAlpha,
      rels.rBeta,
      rels.rTheta,
      rels.rDelta,
      rels.rGamma,
    ];
 
    if (eegChart) {
      eegChart.data.datasets[0].data = chartVals;
      eegChart.update('active');
    } else {
      eegChart = new Chart(document.getElementById('chart'), {
        type: 'bar',
        data: {
          labels: ['Alpha', 'Beta', 'Theta', 'Delta', 'Gamma'],
          datasets: [{
            label: 'Relative Power',
            data: chartVals,
            backgroundColor: [
              'rgba(6,182,212,0.75)',
              'rgba(245,158,11,0.75)',
              'rgba(139,92,246,0.75)',
              'rgba(99,102,241,0.75)',
              'rgba(239,68,68,0.75)',
            ],
            borderColor: [
              '#06b6d4', '#f59e0b', '#8b5cf6', '#6366f1', '#ef4444',
            ],
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          animation: { duration: 600, easing: 'easeInOutQuart' },
          plugins: {
            legend: {
              labels: {
                color: '#4e6a8a',
                font: { family: "'Exo 2', sans-serif", size: 12 },
              },
            },
            tooltip: {
              backgroundColor: '#0f1f35',
              borderColor: '#1a3558',
              borderWidth: 1,
              titleColor: '#00d4ff',
              bodyColor: '#cdd9ea',
              callbacks: {
                label: ctx => ' ' + ctx.parsed.y.toFixed(4),
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#4e6a8a',
                font: { family: "'Share Tech Mono', monospace", size: 11 },
              },
              grid: { color: 'rgba(26,53,88,0.5)' },
            },
            y: {
              ticks: {
                color: '#4e6a8a',
                font: { family: "'Share Tech Mono', monospace", size: 11 },
              },
              grid: { color: 'rgba(26,53,88,0.5)' },
            },
          },
        },
      });
    }
 
    // ── Status bar ───────────────────────────────────
    const ts = d.timestamp ? ' &nbsp;|&nbsp; MATLAB: ' + d.timestamp : '';
    document.getElementById('statusBar').innerHTML =
      '<span class="ok">● LIVE</span>'
      + ' &nbsp;—&nbsp; Last fetch: ' + new Date().toLocaleTimeString()
      + ts;
 
  } catch (err) {
    console.error('EEG fetch error:', err);
    document.getElementById('errorBanner').style.display = 'block';
    document.getElementById('statusBar').innerHTML =
      '<span class="err">● OFFLINE</span>'
      + ' &nbsp;—&nbsp; ' + new Date().toLocaleTimeString()
      + ' &nbsp;|&nbsp; ' + err.message;
  }
}
 
// ── Boot ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadEEGData();
  setInterval(loadEEGData, REFRESH_MS);
});
