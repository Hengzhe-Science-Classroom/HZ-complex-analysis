window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Power Series',
    subtitle: 'Taylor series and the analytic = holomorphic equivalence',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Power Series?</h2>

<div class="env-block intuition">
    <div class="env-title">A Central Question</div>
    <div class="env-body">
        <p>You have encountered functions like \\(e^z\\), \\(\\sin z\\), and \\(\\cos z\\) defined by their real-line formulas. But what <em>is</em> \\(e^{2+3i}\\)? How do you evaluate a transcendental function at a complex argument? The answer lies in power series.</p>
        <p>More strikingly: we will prove that a function is holomorphic if and only if it locally equals a convergent power series. This equivalence is one of the deepest theorems in all of analysis, with no real-variable analogue.</p>
    </div>
</div>

<p>A <strong>power series centered at \\(z_0\\)</strong> is a formal expression</p>

\\[
\\sum_{n=0}^{\\infty} a_n (z - z_0)^n = a_0 + a_1(z-z_0) + a_2(z-z_0)^2 + \\cdots
\\]

<p>where \\(a_n \\in \\mathbb{C}\\) are the <em>coefficients</em>. For any fixed \\(z \\in \\mathbb{C}\\), this is a series of complex numbers, and the question is: for which \\(z\\) does it converge?</p>

<h3>Why the Complex Setting Is Special</h3>

<p>In real analysis, a function can be infinitely differentiable without being representable by a Taylor series. The classic example is</p>

\\[f(x) = \\begin{cases} e^{-1/x^2} & x \\neq 0 \\\\ 0 & x = 0 \\end{cases}\\]

<p>which has \\(f^{(n)}(0) = 0\\) for all \\(n\\), so its Taylor series at 0 converges to the zero function, not to \\(f\\).</p>

<p>In complex analysis, no such pathology exists. Holomorphic means analytic: once a function has a complex derivative everywhere in a domain, it automatically has a convergent power series representation there. The Cauchy integral formula, which we derived in Chapter 6, will be the key that unlocks this equivalence.</p>

<h3>Preview of the Chapter</h3>

<ol>
    <li><strong>Radius of Convergence</strong>: the Hadamard formula determines exactly where a power series converges.</li>
    <li><strong>Taylor's Theorem</strong>: every holomorphic function is locally a power series.</li>
    <li><strong>Analytic = Holomorphic</strong>: the great equivalence, proved via Cauchy's formula.</li>
    <li><strong>Operations</strong>: add, multiply, compose, and differentiate power series term by term.</li>
    <li><strong>Zeros</strong>: isolated zeros, orders, and the identity principle.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Brook Taylor introduced his series in 1715, but the systematic complex-variable theory was developed by Cauchy (1820s) and Weierstrass (1840s–1880s). Weierstrass actually <em>defined</em> analytic functions via convergent power series, making analyticity the primary notion and holomorphicity a consequence. Today we take the holomorphic approach first and derive the series representation as a theorem.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Write out the first five terms of the power series for \\(e^z\\) centered at \\(z_0 = 0\\). For \\(z = i\\), use the series to compute \\(e^i\\) and verify that the imaginary part matches \\(\\sin(1)\\).',
                    hint: 'The coefficients are \\(a_n = 1/n!\\). Group even- and odd-index terms separately to identify \\(\\cos(1)\\) and \\(\\sin(1)\\).',
                    solution: '\\(e^z = 1 + z + z^2/2! + z^3/3! + z^4/4! + \\cdots\\). At \\(z = i\\): \\(i^0=1, i^1=i, i^2=-1, i^3=-i, i^4=1,\\ldots\\). So \\(e^i = (1 - 1/2! + 1/4! - \\cdots) + i(1 - 1/3! + 1/5! - \\cdots) = \\cos 1 + i\\sin 1\\). The imaginary part is \\(\\sin(1) \\approx 0.8415\\), confirming Euler\'s formula.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Radius of Convergence
        // ================================================================
        {
            id: 'sec-radius',
            title: 'Radius of Convergence',
            content: `
<h2>Radius of Convergence</h2>

<p>Given \\(\\sum_{n=0}^\\infty a_n (z-z_0)^n\\), the set of \\(z\\) for which the series converges has a remarkably clean geometry: it is always a disk.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.1 (Cauchy–Hadamard)</div>
    <div class="env-body">
        <p>Define the <strong>radius of convergence</strong></p>
        \\[R = \\frac{1}{\\limsup_{n\\to\\infty} |a_n|^{1/n}}\\]
        <p>with the conventions \\(1/0 = \\infty\\) and \\(1/\\infty = 0\\). Then:</p>
        <ul>
            <li>The series converges absolutely for all \\(z\\) with \\(|z - z_0| < R\\).</li>
            <li>The series diverges for all \\(z\\) with \\(|z - z_0| > R\\).</li>
            <li>On the circle \\(|z - z_0| = R\\), convergence depends on the particular series.</li>
        </ul>
    </div>
</div>

<p>The open disk \\(D(z_0, R) = \\{z : |z - z_0| < R\\}\\) is called the <strong>disk of convergence</strong>. Note: \\(R = 0\\) means the series converges only at \\(z_0\\); \\(R = \\infty\\) means it converges everywhere in \\(\\mathbb{C}\\).</p>

<h3>Proof Sketch</h3>

<p>Set \\(L = \\limsup |a_n|^{1/n}\\). For \\(|z - z_0| = r < 1/L\\), choose \\(\\rho\\) with \\(rL < \\rho < 1\\). By definition of limsup, eventually \\(|a_n|^{1/n} < \\rho/r\\), so \\(|a_n| r^n < \\rho^n\\), and the series is dominated by the geometric series \\(\\sum \\rho^n\\). For \\(r > 1/L\\), infinitely many \\(n\\) have \\(|a_n|^{1/n} > 1/r\\), giving \\(|a_n(z-z_0)^n| > 1\\) infinitely often, so the series diverges. \\(\\square\\)</p>

<h3>The Ratio Test Alternative</h3>

<p>When the limit exists, one can use</p>
\\[R = \\lim_{n \\to \\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|.\\]
<p>This is the ratio test form, easier to apply when coefficients involve factorials.</p>

<div class="env-block example">
    <div class="env-title">Example: Geometric Series</div>
    <div class="env-body">
        <p>\\(\\sum_{n=0}^\\infty z^n\\) has \\(a_n = 1\\), so \\(\\limsup |a_n|^{1/n} = 1\\), giving \\(R = 1\\). The series converges to \\(1/(1-z)\\) for \\(|z| < 1\\) and diverges for \\(|z| \\geq 1\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Exponential</div>
    <div class="env-body">
        <p>\\(e^z = \\sum_{n=0}^\\infty z^n/n!\\) has \\(a_n = 1/n!\\). Then \\(|a_n|^{1/n} = (n!)^{-1/n} \\to 0\\) (since \\(n! \\to \\infty\\) faster than any exponential). So \\(R = \\infty\\): \\(e^z\\) converges everywhere.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Logarithm</div>
    <div class="env-body">
        <p>\\(\\log(1+z) = \\sum_{n=1}^\\infty (-1)^{n-1} z^n/n\\) has \\(a_n = (-1)^{n-1}/n\\). Then \\(|a_n|^{1/n} = n^{-1/n} \\to 1\\), giving \\(R = 1\\). The boundary circle \\(|z| = 1\\) contains both convergent points (like \\(z = 1\\), alternating harmonic series) and divergent points (like \\(z = -1\\), harmonic series).</p>
    </div>
</div>

<h3>Uniform Convergence Inside the Disk</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.2 (Uniform Convergence on Compact Subsets)</div>
    <div class="env-body">
        <p>A power series with radius of convergence \\(R > 0\\) converges uniformly on every compact subset of \\(D(z_0, R)\\). In particular, it converges uniformly on every closed disk \\(\\overline{D}(z_0, r)\\) with \\(r < R\\).</p>
    </div>
</div>

<p>This uniform convergence is what allows term-by-term differentiation and integration inside the disk of convergence.</p>

<div class="viz-placeholder" data-viz="viz-radius-convergence"></div>
<div class="viz-placeholder" data-viz="viz-hadamard"></div>
`,
            visualizations: [
                {
                    id: 'viz-radius-convergence',
                    title: 'Disk of Convergence',
                    description: 'The series converges inside the disk (blue region), diverges outside (dark). Partial sums are shown for a sample point. Drag the point or adjust R to explore.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 80 });

                        var R = 1.5;
                        var ptX = 1.0, ptY = 0.0;
                        var Nterms = 8;

                        VizEngine.createSlider(controls, 'R', 0.3, 3.0, R, 0.1, function(v) { R = v; draw(); });
                        VizEngine.createSlider(controls, 'N terms', 1, 20, Nterms, 1, function(v) { Nterms = Math.round(v); draw(); });

                        viz.addDraggable('pt', ptX, ptY, viz.colors.orange, 7, function(x, y) {
                            ptX = x; ptY = y; draw();
                        });

                        // partial sum of geometric series sum z^n
                        function partialSum(re, im, N) {
                            var sumRe = 0, sumIm = 0;
                            var zRe = 1, zIm = 0; // z^0 = 1
                            for (var n = 0; n <= N; n++) {
                                sumRe += zRe; sumIm += zIm;
                                var newRe = zRe * re - zIm * im;
                                var newIm = zRe * im + zIm * re;
                                zRe = newRe; zIm = newIm;
                            }
                            return [sumRe, sumIm];
                        }
                        // exact sum 1/(1-z) for |z|<1
                        function exactSum(re, im) {
                            var dRe = 1 - re, dIm = -im;
                            var d2 = dRe * dRe + dIm * dIm;
                            if (d2 < 1e-10) return [Infinity, Infinity];
                            return [dRe / d2, dIm / d2];
                        }

                        function draw() {
                            viz.clear();
                            // Draw convergence disk
                            var ctx = viz.ctx;
                            var [sx0, sy0] = viz.toScreen(0, 0);
                            var rPx = R * viz.scale;
                            ctx.beginPath();
                            ctx.arc(sx0, sy0, rPx, 0, Math.PI * 2);
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 3]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            viz.drawGrid(); viz.drawAxes();

                            // Label R
                            viz.screenText('R = ' + R.toFixed(2), sx0 + rPx / 2, sy0 - 10, viz.colors.blue, 12);

                            var dist = Math.sqrt(ptX * ptX + ptY * ptY);
                            var inside = dist < R;

                            // Partial sum display
                            var [psRe, psIm] = partialSum(ptX, ptY, Nterms);
                            var psStr = 'S_' + Nterms + ' = ' + psRe.toFixed(3) + (psIm >= 0 ? '+' : '') + psIm.toFixed(3) + 'i';

                            if (inside && dist < 0.98) {
                                var [exRe, exIm] = exactSum(ptX, ptY);
                                var errRe = psRe - exRe, errIm = psIm - exIm;
                                var err = Math.sqrt(errRe * errRe + errIm * errIm);
                                viz.screenText(psStr, viz.width / 2, viz.height - 52, viz.colors.teal, 12);
                                viz.screenText('Error |S_N - 1/(1-z)| = ' + err.toExponential(2), viz.width / 2, viz.height - 34, viz.colors.green, 12);
                            } else if (inside) {
                                viz.screenText(psStr + '  (z near singularity)', viz.width / 2, viz.height - 44, viz.colors.yellow, 12);
                            } else {
                                viz.screenText('Outside disk: series diverges   |z| = ' + dist.toFixed(3), viz.width / 2, viz.height - 44, viz.colors.red, 12);
                            }

                            // Segment from origin to point
                            viz.drawSegment(0, 0, ptX, ptY, viz.colors.orange, 1, true);

                            // Point label
                            var col = inside ? viz.colors.teal : viz.colors.red;
                            viz.screenText(inside ? 'CONVERGES' : 'DIVERGES', viz.width / 2, 22, col, 14);
                            viz.screenText('|z| = ' + dist.toFixed(3), viz.width / 2, 40, viz.colors.text, 11);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-hadamard',
                    title: 'Hadamard Formula: Interactive Coefficient Calculator',
                    description: 'Choose a series type and watch how \\(R = 1/\\limsup|a_n|^{1/n}\\) is computed from the coefficients. The plot shows \\(|a_n|^{1/n}\\) converging to \\(1/R\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 320, originX: 60, originY: 270, scale: 1 });
                        var ctx = viz.ctx;

                        var seriesType = 0;
                        var seriesNames = ['Geometric: a_n=1', 'Factorial: a_n=1/n!', 'Power: a_n=1/2^n', 'Logarithm: a_n=1/n', 'Mixed: a_n=n^n/n!'];

                        function getCoeffs(type, N) {
                            var arr = [];
                            for (var n = 0; n < N; n++) {
                                if (type === 0) arr.push(1);
                                else if (type === 1) {
                                    var f = 1; for (var k = 1; k <= n; k++) f *= k;
                                    arr.push(1 / f);
                                } else if (type === 2) arr.push(Math.pow(0.5, n));
                                else if (type === 3) arr.push(n === 0 ? 1 : 1 / n);
                                else {
                                    // n^n/n! => limsup = e, R = 1/e
                                    var f2 = 1; for (var k2 = 1; k2 <= n; k2++) f2 *= k2;
                                    arr.push(n === 0 ? 1 : Math.pow(n, n) / f2);
                                }
                            }
                            return arr;
                        }

                        // Build select
                        var sel = document.createElement('select');
                        sel.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 8px;font-size:0.78rem;';
                        seriesNames.forEach(function(nm, i) {
                            var opt = document.createElement('option'); opt.value = i; opt.textContent = nm; sel.appendChild(opt);
                        });
                        sel.addEventListener('change', function() { seriesType = parseInt(sel.value); draw(); });
                        controls.appendChild(sel);

                        function draw() {
                            viz.clear();
                            var N = 30;
                            var coeffs = getCoeffs(seriesType, N);
                            var roots = coeffs.map(function(a, n) { return n === 0 ? Math.abs(a) : Math.pow(Math.abs(a), 1 / n); });
                            var limsup = 0;
                            for (var k = Math.floor(N * 0.5); k < N; k++) if (isFinite(roots[k])) limsup = Math.max(limsup, roots[k]);
                            var R = limsup < 1e-10 ? Infinity : 1 / limsup;

                            var chartW = viz.width - 80, chartH = 220;
                            var maxVal = 0;
                            for (var i = 1; i < N; i++) if (isFinite(roots[i])) maxVal = Math.max(maxVal, roots[i]);
                            if (maxVal < 0.01) maxVal = 1;
                            var yScale = (chartH - 20) / (maxVal * 1.15);
                            var xStep = chartW / N;

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var g = 0; g <= 4; g++) {
                                var yy = 270 - g * (chartH / 4);
                                ctx.beginPath(); ctx.moveTo(60, yy); ctx.lineTo(viz.width - 20, yy); ctx.stroke();
                                var val = (maxVal * g / 4).toFixed(2);
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                                ctx.fillText(val, 55, yy);
                            }

                            // limsup line
                            if (isFinite(limsup) && limsup > 0) {
                                var lsY = 270 - limsup * yScale;
                                ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 1.5; ctx.setLineDash([6, 3]);
                                ctx.beginPath(); ctx.moveTo(60, lsY); ctx.lineTo(viz.width - 20, lsY); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.red; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
                                ctx.fillText('limsup = ' + limsup.toFixed(3) + ' = 1/R', viz.width - 180, lsY - 8);
                            }

                            // Plot |a_n|^{1/n}
                            ctx.beginPath();
                            var started = false;
                            for (var i2 = 1; i2 < N; i2++) {
                                if (!isFinite(roots[i2])) { started = false; continue; }
                                var px2 = 60 + i2 * xStep;
                                var py2 = 270 - roots[i2] * yScale;
                                if (!started) { ctx.moveTo(px2, py2); started = true; }
                                else ctx.lineTo(px2, py2);
                            }
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                            ctx.stroke();

                            // Dots
                            for (var i3 = 1; i3 < N; i3++) {
                                if (!isFinite(roots[i3])) continue;
                                var px3 = 60 + i3 * xStep;
                                var py3 = 270 - roots[i3] * yScale;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(px3, py3, 3, 0, Math.PI * 2); ctx.fill();
                            }

                            // X-axis labels
                            ctx.fillStyle = viz.colors.text; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var lab = 0; lab <= 30; lab += 5) {
                                ctx.fillText(lab, 60 + lab * xStep, 275);
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('n', viz.width / 2, 295);
                            ctx.save(); ctx.translate(14, 160); ctx.rotate(-Math.PI / 2);
                            ctx.fillText('|a\u2099|\u00B9\u141F\u207F', 0, 0); ctx.restore();

                            // Title / result
                            var Rstr = R === Infinity ? '\u221E' : R.toFixed(3);
                            viz.screenText(seriesNames[seriesType] + '   R = ' + Rstr, viz.width / 2, 14, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the radius of convergence of \\(\\sum_{n=0}^\\infty n! \\, z^n\\).',
                    hint: 'Compute \\(\\limsup |a_n|^{1/n}\\) where \\(a_n = n!\\). Use Stirling: \\((n!)^{1/n} \\sim n/e \\to \\infty\\).',
                    solution: 'Since \\((n!)^{1/n} \\to \\infty\\), we get \\(\\limsup |a_n|^{1/n} = \\infty\\), so \\(R = 0\\). The series converges only at \\(z = 0\\).'
                },
                {
                    question: 'Find the radius of convergence of \\(\\sum_{n=1}^\\infty \\frac{z^n}{n^2}\\).',
                    hint: 'Compute \\(|a_n|^{1/n} = (n^{-2})^{1/n} = n^{-2/n}\\). What does this tend to as \\(n \\to \\infty\\)?',
                    solution: '\\(n^{-2/n} = e^{-(2/n)\\ln n} \\to e^0 = 1\\). So \\(R = 1\\). On \\(|z|=1\\), \\(|a_n z^n| = 1/n^2\\) and \\(\\sum 1/n^2 < \\infty\\), so the series converges absolutely on the entire boundary circle.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Taylor's Theorem
        // ================================================================
        {
            id: 'sec-taylor',
            title: "Taylor's Theorem",
            content: `
<h2>Taylor's Theorem</h2>

<p>We now establish the central result connecting holomorphic functions to power series. The Cauchy integral formula from Chapter 6 is the engine that makes this work.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.3 (Taylor's Theorem for Holomorphic Functions)</div>
    <div class="env-body">
        <p>Let \\(f\\) be holomorphic in a domain \\(\\Omega\\) and let \\(z_0 \\in \\Omega\\). If \\(D(z_0, R) \\subset \\Omega\\), then for all \\(z \\in D(z_0, R)\\),</p>
        \\[f(z) = \\sum_{n=0}^{\\infty} a_n (z - z_0)^n, \\quad a_n = \\frac{f^{(n)}(z_0)}{n!} = \\frac{1}{2\\pi i} \\oint_{|w-z_0|=r} \\frac{f(w)}{(w-z_0)^{n+1}}\\,dw\\]
        <p>for any \\(r < R\\). The series converges absolutely and uniformly on compact subsets of \\(D(z_0, R)\\).</p>
    </div>
</div>

<h3>Proof via Cauchy's Formula</h3>

<p>Fix \\(z\\) with \\(|z - z_0| < R\\) and choose \\(r\\) with \\(|z - z_0| < r < R\\). By Cauchy's integral formula,</p>

\\[f(z) = \\frac{1}{2\\pi i} \\oint_{|w-z_0|=r} \\frac{f(w)}{w - z}\\,dw.\\]

<p>Factor out \\((w - z_0)\\) from the denominator:</p>

\\[\\frac{1}{w-z} = \\frac{1}{(w-z_0) - (z-z_0)} = \\frac{1}{w-z_0} \\cdot \\frac{1}{1 - \\frac{z-z_0}{w-z_0}}.\\]

<p>Setting \\(\\zeta = (z - z_0)/(w - z_0)\\), we have \\(|\\zeta| < 1\\) on the circle \\(|w - z_0| = r\\), so the geometric series converges:</p>

\\[\\frac{1}{1 - \\zeta} = \\sum_{n=0}^{\\infty} \\zeta^n = \\sum_{n=0}^{\\infty} \\frac{(z-z_0)^n}{(w-z_0)^n}.\\]

<p>Substituting back and integrating term by term (justified by uniform convergence on the circle):</p>

\\[f(z) = \\sum_{n=0}^{\\infty} \\left(\\frac{1}{2\\pi i} \\oint \\frac{f(w)}{(w-z_0)^{n+1}}\\,dw\\right)(z-z_0)^n = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(z_0)}{n!}(z-z_0)^n. \\quad \\square\\]

<h3>The Taylor Coefficients</h3>

<p>Once we know \\(f(z) = \\sum a_n(z-z_0)^n\\) in a neighborhood, the coefficients are uniquely determined by</p>

\\[a_n = \\frac{f^{(n)}(z_0)}{n!}.\\]

<p>Moreover, the radius of convergence of the Taylor series is at least the distance from \\(z_0\\) to the nearest singularity of \\(f\\) in \\(\\mathbb{C} \\cup \\{\\infty\\}\\).</p>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = 1/(1-z)\\) at \\(z_0 = 0\\)</div>
    <div class="env-body">
        <p>\\(f^{(n)}(z) = n!/(1-z)^{n+1}\\), so \\(a_n = 1\\) for all \\(n\\). The nearest singularity is at \\(z = 1\\), distance 1 from \\(z_0 = 0\\), giving \\(R = 1\\). This recovers the geometric series.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\log(1+z)\\) at \\(z_0 = 0\\)</div>
    <div class="env-body">
        <p>The principal branch of \\(\\log\\) is holomorphic on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\). The nearest singularity to \\(z_0 = 0\\) is the branch point at \\(z = -1\\), distance 1. So \\(R = 1\\). Differentiating: \\((\\log(1+z))' = 1/(1+z) = \\sum (-1)^n z^n\\), and integrating term by term gives \\(\\log(1+z) = \\sum_{n=1}^\\infty (-1)^{n-1} z^n/n\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-taylor-approximation"></div>
`,
            visualizations: [
                {
                    id: 'viz-taylor-approximation',
                    title: "Taylor Polynomial Approximation (Domain Coloring)",
                    description: 'Compare \\(f(z) = 1/(1-z)\\) (left) with its degree-\\(N\\) Taylor polynomial (right) via domain coloring. Inside the disk of convergence the colors match; outside they diverge.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 310, scale: 60 });
                        var N = 5;
                        VizEngine.createSlider(controls, 'Degree N', 1, 20, N, 1, function(v) { N = Math.round(v); draw(); });

                        function cmul(a, b) { return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]]; }
                        function cadd(a, b) { return [a[0]+b[0], a[1]+b[1]]; }

                        // f(z) = 1/(1-z)
                        function fExact(re, im) {
                            var dRe = 1-re, dIm = -im, d2 = dRe*dRe+dIm*dIm;
                            if (d2 < 1e-10) return [1e6, 0];
                            return [dRe/d2, dIm/d2];
                        }
                        // Taylor poly sum_{k=0}^N z^k
                        function fTaylor(re, im, deg) {
                            var sRe = 0, sIm = 0, zRe = 1, zIm = 0;
                            for (var k = 0; k <= deg; k++) {
                                sRe += zRe; sIm += zIm;
                                var nr = zRe*re - zIm*im; zIm = zRe*im + zIm*re; zRe = nr;
                            }
                            return [sRe, sIm];
                        }

                        function drawHalf(offsetX, f, xRange, yRange) {
                            var ctx = viz.ctx;
                            var pw = Math.round(viz.width/2), ph = viz.canvas.height;
                            var dpr = window.devicePixelRatio || 1;
                            var imgW = pw * dpr, imgH = ph;
                            ctx.save(); ctx.setTransform(1,0,0,1,0,0);
                            var imgData = ctx.createImageData(imgW, imgH);
                            var data = imgData.data;
                            for (var py = 0; py < imgH; py++) {
                                for (var px = 0; px < imgW; px++) {
                                    var re = xRange[0] + (xRange[1]-xRange[0])*px/imgW;
                                    var im = yRange[1] - (yRange[1]-yRange[0])*py/imgH;
                                    var res = f(re, im);
                                    var u = res[0], v = res[1];
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u*u+v*v);
                                    var hue = (arg/Math.PI+1)/2;
                                    var light = 1 - 1/(1+mag*0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py*imgW+px)*4;
                                    data[idx]=rgb[0]; data[idx+1]=rgb[1]; data[idx+2]=rgb[2]; data[idx+3]=255;
                                }
                            }
                            ctx.putImageData(imgData, offsetX*dpr, 0);
                            ctx.restore();
                        }

                        function draw() {
                            viz.clear();
                            var xHalf = [-viz.width/2/viz.scale, viz.width/2/viz.scale];
                            var yHalf = [-viz.height/2/viz.scale, viz.height/2/viz.scale];

                            drawHalf(0, fExact, xHalf, yHalf);
                            var Ncap = N;
                            drawHalf(viz.width/2, function(re,im){ return fTaylor(re,im,Ncap); }, xHalf, yHalf);

                            // Divider
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(viz.width/2,0); ctx.lineTo(viz.width/2,viz.height); ctx.stroke();

                            // Unit circle overlay on both halves
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5; ctx.setLineDash([5,3]);
                            var cx1 = viz.width/4, cx2 = 3*viz.width/4, cy = viz.height/2;
                            var rPx = viz.scale;
                            ctx.beginPath(); ctx.arc(cx1, cy, rPx, 0, Math.PI*2); ctx.stroke();
                            ctx.beginPath(); ctx.arc(cx2, cy, rPx, 0, Math.PI*2); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.white; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('f(z) = 1/(1\u2212z)', viz.width/4, 18);
                            ctx.fillText('Taylor poly, deg ' + N, 3*viz.width/4, 18);
                            ctx.fillStyle = viz.colors.yellow; ctx.font = '10px sans-serif';
                            ctx.fillText('R=1', cx1+rPx+12, cy-5);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the Taylor series of \\(f(z) = \\cos z\\) centered at \\(z_0 = 0\\) and determine its radius of convergence.',
                    hint: 'Differentiate \\(f\\) repeatedly at 0. Note that \\(\\cos^{(2k)}(0) = (-1)^k\\) and odd derivatives are zero.',
                    solution: '\\(\\cos z = \\sum_{k=0}^\\infty \\frac{(-1)^k}{(2k)!} z^{2k} = 1 - \\frac{z^2}{2!} + \\frac{z^4}{4!} - \\cdots\\). The coefficients \\(a_n = 1/(n!)\\) (for the \\(n\\)-th nonzero term index) give \\(\\limsup |a_{2k}|^{1/(2k)} = (1/(2k)!)^{1/(2k)} \\to 0\\), so \\(R = \\infty\\). Cosine is entire.'
                },
                {
                    question: 'Find the Taylor series of \\(f(z) = z/(z^2 + 1)\\) centered at \\(z_0 = 0\\). What is the radius of convergence?',
                    hint: 'Write \\(z/(z^2+1) = z \\cdot 1/(1-(-z^2))\\) and expand \\(1/(1-w)\\) with \\(w = -z^2\\). Identify the nearest singularities of \\(f\\).',
                    solution: '\\(\\frac{z}{z^2+1} = z \\sum_{k=0}^\\infty (-1)^k z^{2k} = \\sum_{k=0}^\\infty (-1)^k z^{2k+1}\\) for \\(|z|<1\\). Singularities are at \\(z = \\pm i\\), distance 1 from 0. So \\(R = 1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Analytic = Holomorphic
        // ================================================================
        {
            id: 'sec-analytic-holomorphic',
            title: 'Analytic = Holomorphic',
            content: `
<h2>The Great Equivalence: Analytic = Holomorphic</h2>

<p>This section delivers the central theorem of the chapter. In real analysis, there is a strict hierarchy:</p>

\\[C^\\omega \\subsetneq C^\\infty \\subsetneq C^k \\subsetneq C^0\\]

<p>where \\(C^\\omega\\) denotes real-analytic (convergent power series). Being \\(C^1\\) does not imply \\(C^2\\), much less \\(C^\\infty\\), and being \\(C^\\infty\\) does not imply \\(C^\\omega\\).</p>

<p>In complex analysis, having one complex derivative is enough for everything:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.4 (Analytic = Holomorphic)</div>
    <div class="env-body">
        <p>Let \\(f\\) be defined on a domain \\(\\Omega \\subset \\mathbb{C}\\). The following are equivalent:</p>
        <ol>
            <li>\\(f\\) is <strong>holomorphic</strong> on \\(\\Omega\\): \\(f'(z)\\) exists for every \\(z \\in \\Omega\\).</li>
            <li>\\(f\\) is <strong>analytic</strong> on \\(\\Omega\\): every \\(z_0 \\in \\Omega\\) has a neighborhood \\(D(z_0, r)\\) on which \\(f\\) equals a convergent power series.</li>
            <li>\\(f\\) is <strong>infinitely differentiable</strong>: \\(f \\in C^\\infty(\\Omega)\\) and all derivatives \\(f^{(n)}\\) are themselves holomorphic.</li>
        </ol>
    </div>
</div>

<h3>Proof of (1) \\(\\Rightarrow\\) (2)</h3>

<p>This is Taylor's Theorem (Theorem 9.3), already proved. If \\(f\\) is holomorphic, Cauchy's formula gives the power series representation. \\(\\square\\)</p>

<h3>Proof of (2) \\(\\Rightarrow\\) (3)</h3>

<p>If \\(f(z) = \\sum a_n (z-z_0)^n\\) converges in \\(D(z_0, R)\\), we show it is differentiable term by term (Theorem 9.6 below). The derivative \\(f'(z) = \\sum_{n=1}^\\infty n a_n (z-z_0)^{n-1}\\) also has radius of convergence \\(R\\) (the factor \\(n^{1/n} \\to 1\\) does not affect the limsup). Hence \\(f'\\) is itself given by a power series, so it is differentiable, and so on inductively. \\(\\square\\)</p>

<h3>Proof of (3) \\(\\Rightarrow\\) (1)</h3>

<p>Immediate: if \\(f \\in C^\\infty\\), in particular \\(f' \\) exists. \\(\\square\\)</p>

<h3>What This Means</h3>

<p>A function that merely satisfies the Cauchy–Riemann equations — the definition of holomorphicity — automatically:</p>
<ul>
    <li>has derivatives of all orders,</li>
    <li>is representable by a convergent power series around every interior point,</li>
    <li>is determined locally by its values on any curve or on any open subset.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Why Real Analysis Cannot Match This</div>
    <div class="env-body">
        <p>The key ingredient is Cauchy's integral formula, which has no real analogue. The formula expresses \\(f(z_0)\\) as a weighted average of \\(f\\) over a surrounding circle. This "rigidity at a distance" propagates regularity in a way impossible for real functions.</p>
        <p>The real function \\(f(x) = e^{-1/x^2}\\) is \\(C^\\infty\\) at 0 but equals 0 there together with all its derivatives, so it cannot equal its Taylor series (which is identically 0) on any interval. Its complex extension \\(f(z) = e^{-1/z^2}\\) has an essential singularity at \\(z = 0\\), explaining the failure.</p>
    </div>
</div>

<div class="env-block corollary">
    <div class="env-title">Corollary 9.5 (Cauchy's Estimates)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic in \\(|z - z_0| \\leq R\\) and \\(|f| \\leq M\\) there, then</p>
        \\[|f^{(n)}(z_0)| \\leq \\frac{M \\cdot n!}{R^n}.\\]
    </div>
</div>

<p>These estimates are immediate from the integral formula for \\(a_n\\).</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(f\\) be entire (holomorphic on all of \\(\\mathbb{C}\\)) with \\(|f(z)| \\leq M|z|^k\\) for all large \\(|z|\\), for some integer \\(k \\geq 0\\). Prove that \\(f\\) is a polynomial of degree at most \\(k\\).',
                    hint: 'Apply Cauchy\'s estimates to \\(f^{(n)}(0)\\) using a circle of radius \\(R\\), then let \\(R \\to \\infty\\). What happens to \\(|f^{(n)}(0)|\\) for \\(n > k\\)?',
                    solution: 'By Cauchy\'s estimates with a circle of radius \\(R\\): \\(|f^{(n)}(0)| \\leq n! \\cdot MR^k / R^n = M n! R^{k-n}\\). For \\(n > k\\), as \\(R \\to \\infty\\) this gives \\(|f^{(n)}(0)| \\leq 0\\), so \\(f^{(n)}(0) = 0\\) for all \\(n > k\\). Since \\(f(z) = \\sum_{n=0}^\\infty f^{(n)}(0)z^n/n!\\), the series terminates at degree \\(k\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Operations on Power Series
        // ================================================================
        {
            id: 'sec-manipulation',
            title: 'Operations on Power Series',
            content: `
<h2>Operations on Power Series</h2>

<p>Inside the disk of convergence, power series behave like polynomials: they can be added, multiplied, composed, differentiated, and integrated term by term. These operations are the working tools for computing with analytic functions.</p>

<h3>Addition and Scalar Multiplication</h3>

<p>If \\(f(z) = \\sum a_n z^n\\) and \\(g(z) = \\sum b_n z^n\\) both converge for \\(|z| < R\\), then</p>
\\[\\alpha f(z) + \\beta g(z) = \\sum_{n=0}^\\infty (\\alpha a_n + \\beta b_n) z^n\\]
<p>for any \\(\\alpha, \\beta \\in \\mathbb{C}\\), with the same radius of convergence \\(\\geq R\\).</p>

<h3>Multiplication (Cauchy Product)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.6 (Product of Power Series)</div>
    <div class="env-body">
        <p>If \\(f(z) = \\sum_{n=0}^\\infty a_n z^n\\) converges for \\(|z| < R_1\\) and \\(g(z) = \\sum_{n=0}^\\infty b_n z^n\\) converges for \\(|z| < R_2\\), then</p>
        \\[f(z)g(z) = \\sum_{n=0}^\\infty c_n z^n, \\quad c_n = \\sum_{k=0}^n a_k b_{n-k},\\]
        <p>with convergence for \\(|z| < \\min(R_1, R_2)\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(e^z \\cdot e^w = e^{z+w}\\)</div>
    <div class="env-body">
        <p>The product of \\(e^z = \\sum z^n/n!\\) and \\(e^w = \\sum w^n/n!\\), where we treat \\(w\\) as a parameter, gives \\(\\sum c_n\\) with \\(c_n = \\sum_{k=0}^n \\frac{z^k}{k!} \\cdot \\frac{w^{n-k}}{(n-k)!} = \\frac{1}{n!} \\sum_{k=0}^n \\binom{n}{k} z^k w^{n-k} = \\frac{(z+w)^n}{n!}\\). Hence \\(e^z e^w = e^{z+w}\\). This is a purely algebraic proof of the exponential law.</p>
    </div>
</div>

<h3>Term-by-Term Differentiation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.7 (Differentiation)</div>
    <div class="env-body">
        <p>If \\(f(z) = \\sum_{n=0}^\\infty a_n (z-z_0)^n\\) has radius of convergence \\(R\\), then \\(f\\) is holomorphic in \\(D(z_0, R)\\) and</p>
        \\[f'(z) = \\sum_{n=1}^{\\infty} n a_n (z-z_0)^{n-1}.\\]
        <p>The derived series also has radius of convergence \\(R\\).</p>
    </div>
</div>

<p>Proof: \\(\\limsup(n|a_n|)^{1/(n-1)} = \\limsup|a_n|^{1/n}\\) since \\(n^{1/n} \\to 1\\). The detailed argument uses the dominated convergence (or uniform convergence on compact sets) to justify swapping the derivative and the sum. \\(\\square\\)</p>

<h3>Composition</h3>

<p>If \\(g(z) = \\sum b_n z^n\\) with \\(b_0 = 0\\) (so \\(g(0) = 0\\)) and \\(|g(z)| < R_f\\) for \\(|z| < r\\), and \\(f(w) = \\sum a_n w^n\\) converges for \\(|w| < R_f\\), then</p>
\\[f(g(z)) = \\sum_{n=0}^\\infty a_n (g(z))^n\\]
<p>converges absolutely for \\(|z| < r\\). The coefficients of the composed series can be found by expanding \\(g(z)^n\\) using the Cauchy product repeatedly.</p>

<div class="env-block example">
    <div class="env-title">Example: \\(e^{\\sin z}\\)</div>
    <div class="env-body">
        <p>With \\(g(z) = \\sin z = z - z^3/6 + \\cdots\\) and \\(f(w) = e^w = 1 + w + w^2/2 + \\cdots\\):</p>
        \\[e^{\\sin z} = 1 + z + \\frac{z^2}{2} - \\frac{z^4}{8} - \\frac{z^5}{15} + \\cdots\\]
        <p>with \\(R = \\infty\\) (since \\(\\sin\\) is entire and \\(e^w\\) is entire).</p>
    </div>
</div>

<h3>Term-by-Term Integration</h3>

<p>If \\(f(z) = \\sum_{n=0}^\\infty a_n (z-z_0)^n\\) converges in \\(D(z_0, R)\\) and \\(\\gamma\\) is a path in \\(D(z_0, R)\\), then</p>
\\[\\int_\\gamma f(z)\\,dz = \\sum_{n=0}^\\infty a_n \\int_\\gamma (z-z_0)^n\\,dz.\\]

<div class="viz-placeholder" data-viz="viz-taylor-exp"></div>
<div class="viz-placeholder" data-viz="viz-taylor-sin"></div>
`,
            visualizations: [
                {
                    id: 'viz-taylor-exp',
                    title: 'Taylor Polynomials of \\(e^z\\) Converging',
                    description: 'Watch the Taylor polynomial of degree \\(N\\) converge to \\(e^x\\) on the real axis. Since \\(R = \\infty\\), the approximation improves everywhere as \\(N \\to \\infty\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 340, originX: 280, originY: 200, scale: 45 });
                        var N = 3;
                        var animating = false;
                        var animId = null;

                        VizEngine.createSlider(controls, 'N', 1, 15, N, 1, function(v) { N = Math.round(v); draw(); });
                        var btn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) { animating = false; btn.textContent = 'Animate'; if (animId) clearInterval(animId); }
                            else {
                                animating = true; btn.textContent = 'Stop'; N = 1;
                                animId = setInterval(function() {
                                    N = (N % 15) + 1; draw();
                                    if (!animating) clearInterval(animId);
                                }, 400);
                            }
                        });

                        function factorial(n) { var f = 1; for (var k = 2; k <= n; k++) f *= k; return f; }
                        function taylorExp(x, deg) {
                            var s = 0, xn = 1;
                            for (var k = 0; k <= deg; k++) { s += xn / factorial(k); xn *= x; }
                            return s;
                        }

                        function draw() {
                            viz.clear(); viz.drawGrid(); viz.drawAxes();

                            // True e^x
                            viz.drawFunction(function(x) { return Math.exp(x); }, -5, 3, viz.colors.teal, 2.5);

                            // Taylor poly
                            viz.drawFunction(function(x) { return taylorExp(x, N); }, -5, 3, viz.colors.orange, 2);

                            // Legend
                            viz.screenText('e^x  (exact)', viz.width - 110, 22, viz.colors.teal, 12);
                            viz.screenText('T_' + N + '(x)  (degree ' + N + ')', viz.width - 130, 40, viz.colors.orange, 12);

                            // Error at x=3
                            var err = Math.abs(Math.exp(3) - taylorExp(3, N));
                            viz.screenText('|e^3 - T_' + N + '(3)| = ' + err.toExponential(2), viz.width / 2, viz.height - 16, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-taylor-sin',
                    title: 'Taylor Polynomials of \\(\\sin z\\) on \\(\\mathbb{R}\\)',
                    description: 'The Taylor polynomial of \\(\\sin x\\) at degree \\(2k+1\\) converges to \\(\\sin x\\) on all of \\(\\mathbb{R}\\). Watch the convergence range widen as degree increases.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 300, originX: 280, originY: 150, scale: 38 });
                        var N = 1;
                        VizEngine.createSlider(controls, 'Odd degree', 1, 19, N, 2, function(v) {
                            N = Math.round(v); if (N % 2 === 0) N += 1; draw();
                        });

                        function factorial(n) { var f = 1; for (var k = 2; k <= n; k++) f *= k; return f; }
                        function taylorSin(x, deg) {
                            var s = 0, xpow = x, sign = 1;
                            for (var k = 0; 2*k+1 <= deg; k++) {
                                s += sign * xpow / factorial(2*k+1);
                                xpow *= x * x; sign = -sign;
                            }
                            return s;
                        }

                        function draw() {
                            viz.clear(); viz.drawGrid(); viz.drawAxes();
                            viz.drawFunction(Math.sin, -7, 7, viz.colors.teal, 2.5);
                            viz.drawFunction(function(x) { return taylorSin(x, N); }, -7, 7, viz.colors.purple, 2);
                            viz.screenText('sin(x)  (exact)', viz.width - 140, 20, viz.colors.teal, 12);
                            viz.screenText('T_' + N + '(x)', viz.width - 100, 38, viz.colors.purple, 12);
                            viz.screenText('Degree ' + N + ' approximation', viz.width/2, viz.height - 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the Cauchy product, find the power series for \\(1/(1-z)^2\\) and identify the radius of convergence.',
                    hint: 'Write \\(1/(1-z)^2 = [1/(1-z)] \\cdot [1/(1-z)]\\) and multiply the two geometric series, or differentiate \\(1/(1-z)\\) term by term.',
                    solution: 'Differentiating \\(1/(1-z) = \\sum z^n\\) term by term: \\(1/(1-z)^2 = \\sum_{n=1}^\\infty n z^{n-1} = \\sum_{n=0}^\\infty (n+1) z^n\\). Radius of convergence \\(R = 1\\) (same as \\(1/(1-z)\\), the differentiated series keeps the same \\(R\\)).'
                },
                {
                    question: 'Compute the first four nonzero terms of the Taylor series of \\(\\tan z\\) at \\(z_0 = 0\\) by dividing the series for \\(\\sin z\\) by the series for \\(\\cos z\\).',
                    hint: 'Write \\(\\tan z = \\sin z / \\cos z\\). Seek \\(\\tan z = b_1 z + b_3 z^3 + \\cdots\\) and match coefficients with \\(\\cos z \\cdot \\tan z = \\sin z\\).',
                    solution: 'Matching \\((1 - z^2/2 + z^4/24 - \\cdots)(b_1 z + b_3 z^3 + b_5 z^5 + \\cdots) = z - z^3/6 + z^5/120 - \\cdots\\): \\(b_1 = 1\\); \\(b_3 - b_1/2 = -1/6 \\Rightarrow b_3 = 1/3\\); \\(b_5 - b_3/2 + b_1/24 = 1/120 \\Rightarrow b_5 = 2/15\\). So \\(\\tan z = z + z^3/3 + 2z^5/15 + 17z^7/315 + \\cdots\\). Radius of convergence \\(R = \\pi/2\\) (nearest singularity).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Zeros of Analytic Functions
        // ================================================================
        {
            id: 'sec-zeros',
            title: 'Zeros of Analytic Functions',
            content: `
<h2>Zeros of Analytic Functions</h2>

<p>The power series representation gives us precise control over where a holomorphic function vanishes and with what multiplicity. This theory is foundational for the residue theorem and for understanding the global structure of analytic functions.</p>

<h3>Isolated Zeros and Order</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Zero of Order \\(m\\))</div>
    <div class="env-body">
        <p>Let \\(f\\) be holomorphic near \\(z_0\\) with \\(f(z_0) = 0\\). We say \\(z_0\\) is a <strong>zero of order \\(m\\)</strong> (or of <strong>multiplicity \\(m\\)</strong>) if</p>
        \\[f(z) = (z - z_0)^m g(z)\\]
        <p>where \\(g\\) is holomorphic near \\(z_0\\) and \\(g(z_0) \\neq 0\\). Equivalently, \\(f^{(k)}(z_0) = 0\\) for \\(0 \\leq k < m\\) and \\(f^{(m)}(z_0) \\neq 0\\).</p>
    </div>
</div>

<p>In terms of the Taylor series: if \\(f(z) = \\sum_{n=0}^\\infty a_n(z-z_0)^n\\) and the first nonzero coefficient is \\(a_m\\), then \\(z_0\\) is a zero of order \\(m\\).</p>

<h3>The Isolation of Zeros</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.8 (Zeros are Isolated)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic on a connected domain \\(\\Omega\\) and \\(f \\not\\equiv 0\\), then the zeros of \\(f\\) are isolated: every zero \\(z_0\\) has a punctured neighborhood \\(D(z_0, r) \\setminus \\{z_0\\}\\) in which \\(f\\) has no zeros.</p>
    </div>
</div>

<p><em>Proof.</em> If \\(f(z_0) = 0\\), write \\(f(z) = (z-z_0)^m g(z)\\) with \\(g(z_0) \\neq 0\\). By continuity of \\(g\\), there is \\(r > 0\\) with \\(g(z) \\neq 0\\) for \\(|z-z_0| < r\\), so \\(f(z) \\neq 0\\) for \\(0 < |z-z_0| < r\\). \\(\\square\\)</p>

<h3>The Identity Principle</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.9 (Identity Principle)</div>
    <div class="env-body">
        <p>Let \\(f\\) and \\(g\\) be holomorphic on a connected domain \\(\\Omega\\). If \\(f = g\\) on a set with an accumulation point in \\(\\Omega\\), then \\(f \\equiv g\\) on all of \\(\\Omega\\).</p>
    </div>
</div>

<p><em>Proof.</em> \\(h = f - g\\) is holomorphic and zero on a set \\(S\\) with an accumulation point \\(z_0 \\in \\Omega\\). If \\(h(z_0) \\neq 0\\), continuity gives a neighborhood with no zeros, contradicting accumulation. So \\(h(z_0) = 0\\). By the Taylor series: if any \\(a_n \\neq 0\\), the zero at \\(z_0\\) is isolated, again contradicting accumulation. Thus all \\(a_n = 0\\) and \\(h \\equiv 0\\) on a disk \\(D(z_0, r)\\). The set \\(\\{z : h \\equiv 0 \\text{ near }z\\}\\) is both open (by Taylor) and closed (by continuity) in \\(\\Omega\\), hence equals \\(\\Omega\\). \\(\\square\\)</p>

<div class="env-block remark">
    <div class="env-title">Profound Consequence</div>
    <div class="env-body">
        <p>Two holomorphic functions that agree on a sequence converging to an interior point must be identically equal. This has no real analogue: \\(f(x) = e^{-1/x^2}\\) and \\(g(x) = 0\\) agree at \\(\\{1/n\\}_{n=1}^\\infty \\to 0\\) but are different functions.</p>
        <p>The identity principle is the foundation for analytic continuation (Chapter 18): a holomorphic function on a small disk extends in at most one way to any larger connected domain.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-zero-structure"></div>
<div class="viz-placeholder" data-viz="viz-taylor-log"></div>
`,
            visualizations: [
                {
                    id: 'viz-zero-structure',
                    title: 'Zero Structure via Domain Coloring',
                    description: 'Domain coloring of \\(f(z) = z^m(1-z)\\). Zeros of order \\(m\\) appear as points where the color wheel winds \\(m\\) times. Adjust the order to see higher-order zeros.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 90 });
                        var m = 1;

                        VizEngine.createSlider(controls, 'Zero order m', 1, 5, m, 1, function(v) {
                            m = Math.round(v); draw();
                        });

                        // Complex power z^m
                        function cpow(re, im, n) {
                            var r = Math.sqrt(re*re+im*im);
                            var theta = Math.atan2(im, re);
                            var rn = Math.pow(r, n);
                            return [rn*Math.cos(n*theta), rn*Math.sin(n*theta)];
                        }
                        function cmul(a, b) { return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]]; }

                        function draw() {
                            viz.clear();
                            var xRange = [-2, 2], yRange = [-2, 2];
                            var pw = viz.canvas.width, ph = viz.canvas.height;
                            var ctx = viz.ctx;
                            ctx.save(); ctx.setTransform(1,0,0,1,0,0);
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;
                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var re = xRange[0] + (xRange[1]-xRange[0])*px/pw;
                                    var im = yRange[1] - (yRange[1]-yRange[0])*py/ph;
                                    // f(z) = z^m * (1 - z)
                                    var zm = cpow(re, im, m);
                                    var oneMz = [1-re, -im];
                                    var res = cmul(zm, oneMz);
                                    var u = res[0], v = res[1];
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u*u+v*v);
                                    var hue = (arg/Math.PI+1)/2;
                                    var light = 1 - 1/(1+mag*0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py*pw+px)*4;
                                    data[idx]=rgb[0]; data[idx+1]=rgb[1]; data[idx+2]=rgb[2]; data[idx+3]=255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);
                            ctx.restore();

                            // Axes
                            viz.drawAxes();

                            // Label zeros
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
                            var [sx0, sy0] = viz.toScreen(0, 0);
                            ctx.fillText('z=0 (order '+m+')', sx0, sy0 - 14);
                            var [sx1, sy1] = viz.toScreen(1, 0);
                            ctx.fillText('z=1 (order 1)', sx1, sy1 - 14);

                            ctx.fillStyle = viz.colors.text; ctx.font = '11px sans-serif';
                            ctx.fillText('f(z) = z\u1D50(1\u2212z)', viz.width/2, viz.height - 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-taylor-log',
                    title: 'Taylor Series of \\(\\log(1+z)\\): Radius \\(R=1\\)',
                    description: 'The partial sum of \\(\\log(1+z) = \\sum_{n=1}^\\infty (-1)^{n-1}z^n/n\\) converges for \\(|z|<1\\) but not outside. The singularity at \\(z=-1\\) limits \\(R\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 320, originX: 200, originY: 160, scale: 100 });
                        var N = 5;
                        VizEngine.createSlider(controls, 'N terms', 1, 25, N, 1, function(v) { N = Math.round(v); draw(); });

                        function logTaylor(x, n) {
                            var s = 0, xk = x, sign = 1;
                            for (var k = 1; k <= n; k++) {
                                s += sign * xk / k;
                                xk *= x; sign = -sign;
                            }
                            return s;
                        }

                        function draw() {
                            viz.clear(); viz.drawGrid(); viz.drawAxes();

                            // True log(1+x) for x in (-1, 2]
                            viz.drawFunction(function(x) { return x > -1 ? Math.log(1+x) : NaN; }, -0.95, 2.5, viz.colors.teal, 2.5);

                            // Taylor poly
                            viz.drawFunction(function(x) { return logTaylor(x, N); }, -1.5, 1.5, viz.colors.orange, 2);

                            // R=1 boundary
                            var [sx1, sy0] = viz.toScreen(1, 0);
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 1.5; ctx.setLineDash([5,3]);
                            ctx.beginPath(); ctx.moveTo(sx1, 0); ctx.lineTo(sx1, viz.height); ctx.stroke();
                            ctx.setLineDash([]);
                            var [sxm1] = viz.toScreen(-1, 0);
                            ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 1.5; ctx.setLineDash([5,3]);
                            ctx.beginPath(); ctx.moveTo(sxm1, 0); ctx.lineTo(sxm1, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.yellow; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('x=1', sx1, 14);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('x=\u22121 (singularity)', sxm1, 14);

                            viz.screenText('log(1+x)  (exact)', viz.width-160, 26, viz.colors.teal, 12);
                            viz.screenText('T_'+N+'(x)', viz.width-100, 44, viz.colors.orange, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the order of the zero of \\(f(z) = z^3 \\sin z\\) at \\(z_0 = 0\\).',
                    hint: 'Expand \\(\\sin z = z - z^3/6 + \\cdots\\) and multiply by \\(z^3\\). What is the lowest power of \\(z\\) with nonzero coefficient?',
                    solution: '\\(f(z) = z^3(z - z^3/6 + \\cdots) = z^4 - z^6/6 + \\cdots\\). The lowest power is \\(z^4\\), so \\(z_0 = 0\\) is a zero of order 4.'
                },
                {
                    question: 'Let \\(f\\) be holomorphic on \\(\\mathbb{D} = \\{|z| < 1\\}\\) with \\(f(1/n) = 1/n^2\\) for all \\(n \\geq 2\\). What can you conclude about \\(f\\)?',
                    hint: 'Consider \\(h(z) = f(z) - z^2\\) and apply the identity principle.',
                    solution: 'Let \\(h(z) = f(z) - z^2\\). Then \\(h(1/n) = 1/n^2 - 1/n^2 = 0\\) for all \\(n \\geq 2\\). Since \\(1/n \\to 0\\) and \\(0 \\in \\mathbb{D}\\), the zeros of \\(h\\) accumulate at 0. By the identity principle, \\(h \\equiv 0\\) on \\(\\mathbb{D}\\), so \\(f(z) = z^2\\) on all of \\(\\mathbb{D}\\).'
                },
                {
                    question: 'Show that if \\(f\\) is holomorphic and nonzero on a connected domain \\(\\Omega\\), and \\(|f|\\) is constant on \\(\\Omega\\), then \\(f\\) is constant.',
                    hint: 'Write \\(|f|^2 = f \\overline{f} = c^2\\). Differentiate using Cauchy--Riemann and use the fact that \\(f \\neq 0\\).',
                    solution: 'If \\(|f|^2 = c^2\\), then \\(u^2+v^2 = c^2\\) where \\(f = u+iv\\). Differentiate: \\(uu_x + vv_x = 0\\) and \\(uu_y + vv_y = 0\\). By C-R, \\(u_x = v_y\\) and \\(u_y = -v_x\\). Substituting: \\(u u_x - v u_y = 0\\) and \\(u u_y + v u_x = 0\\). This system \\((u^2+v^2)u_x = 0\\) and \\((u^2+v^2)u_y = 0\\), so if \\(c \\neq 0\\) then \\(u_x = u_y = 0\\), meaning \\(f\\) is constant.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Laurent Series
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: Beyond the Disk of Convergence</h2>

<p>Taylor series represent holomorphic functions perfectly inside a disk. But what about singularities — points where \\(f\\) fails to be holomorphic? The function \\(1/(z-1)\\) has a singularity at \\(z = 1\\), and its Taylor series centered at 0 simply refuses to see past \\(|z| = 1\\).</p>

<h3>What Happens at the Boundary</h3>

<p>The radius of convergence \\(R\\) is not arbitrary: it equals the distance from the center \\(z_0\\) to the nearest singularity. Once you hit a singularity, a power series stops. The key facts proved in this chapter are:</p>

<ol>
    <li><strong>Inside the disk</strong>: absolute and uniform convergence, term-by-term differentiation and integration, the analytic = holomorphic equivalence.</li>
    <li><strong>On the boundary circle</strong>: behavior is delicate and depends on the specific series.</li>
    <li><strong>Outside the disk</strong>: the partial sums diverge.</li>
</ol>

<h3>The Laurent Expansion</h3>

<p>To represent a holomorphic function in an <em>annulus</em> \\(R_1 < |z - z_0| < R_2\\) (the natural region surrounding a singularity), we need to allow negative powers of \\((z - z_0)\\). This leads to the <strong>Laurent series</strong></p>

\\[f(z) = \\sum_{n=-\\infty}^{\\infty} c_n (z - z_0)^n\\]

<p>which will be developed in Chapter 10. The coefficients of the negative-power part (the <em>principal part</em>) classify the type of singularity: removable, pole, or essential. This classification is the foundation for the residue theorem in Chapter 11.</p>

<h3>Summary of Chapter 9</h3>

<div class="env-block remark">
    <div class="env-title">Core Results</div>
    <div class="env-body">
        <ul>
            <li><strong>Hadamard formula</strong>: \\(R = 1/\\limsup|a_n|^{1/n}\\) determines the disk of convergence precisely.</li>
            <li><strong>Taylor's theorem</strong>: every holomorphic function equals its Taylor series inside the largest singularity-free disk.</li>
            <li><strong>Analytic = Holomorphic</strong>: the one complex derivative condition implies infinite differentiability and power series representability.</li>
            <li><strong>Isolated zeros</strong>: zeros of non-constant holomorphic functions are isolated, with well-defined orders.</li>
            <li><strong>Identity principle</strong>: a holomorphic function on a connected domain is determined by its values on any set with an accumulation point.</li>
        </ul>
    </div>
</div>

<p>These results form a tight, self-reinforcing structure. The Cauchy integral formula (Chapter 6) gives the Taylor coefficients. The Taylor series gives infinite differentiability. Infinite differentiability gives the identity principle. The identity principle gives analytic continuation. Complex analysis coheres in a way that real analysis does not, and power series are the algebraic language in which that coherence is written.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(f(z) = \\sum_{n=0}^\\infty a_n z^n\\) have radius of convergence \\(R\\). If \\(|a_n| \\leq C r^{-n}\\) for all \\(n\\) and some constants \\(C, r > 0\\), what can you say about \\(R\\)?',
                    hint: 'Apply Hadamard: \\(\\limsup |a_n|^{1/n} \\leq \\limsup (C^{1/n} r^{-1}) = r^{-1}\\).',
                    solution: '\\(|a_n|^{1/n} \\leq C^{1/n}/r\\). As \\(n\\to\\infty\\), \\(C^{1/n} \\to 1\\), so \\(\\limsup |a_n|^{1/n} \\leq 1/r\\). By Hadamard, \\(R = 1/\\limsup |a_n|^{1/n} \\geq r\\).'
                },
                {
                    question: 'Suppose \\(f\\) is holomorphic on the unit disk \\(\\mathbb{D}\\) and satisfies \\(f(z^2) = f(z)^2\\) for all \\(z \\in \\mathbb{D}\\). Suppose also \\(f(0) = 0\\) and \\(f\'(0) = 1\\). Prove that \\(f(z) = z\\) on \\(\\mathbb{D}\\).',
                    hint: 'Write \\(f(z) = \\sum a_n z^n\\), substitute into the functional equation, and match coefficients. Use induction to show \\(a_n = 0\\) for \\(n \\geq 2\\).',
                    solution: 'The condition \\(f(0)=0\\) gives \\(a_0 = 0\\); \\(f\'(0)=1\\) gives \\(a_1=1\\). Write \\(f(z) = z + a_2 z^2 + a_3 z^3 + \\cdots\\). Then \\(f(z^2) = z^2 + a_2 z^4 + \\cdots\\) and \\(f(z)^2 = z^2 + 2a_2 z^3 + (a_2^2+2a_3)z^4+\\cdots\\). Matching the \\(z^3\\) term: \\(0 = 2a_2\\), so \\(a_2=0\\). Matching \\(z^4\\): \\(a_2 = a_2^2+2a_3 \\Rightarrow 0 = 2a_3\\), so \\(a_3=0\\). By induction, all \\(a_n = 0\\) for \\(n \\geq 2\\), so \\(f(z) = z\\).'
                },
                {
                    question: 'Find all entire functions \\(f\\) satisfying \\(f(z+1) = f(z)\\) for all \\(z \\in \\mathbb{C}\\) and \\(|f(z)| \\leq e^{\\pi|\\text{Im}(z)|}\\).',
                    hint: 'The periodicity forces \\(f\\) to be a function of \\(e^{2\\pi i z}\\). The growth bound controls which Fourier modes survive.',
                    solution: 'Setting \\(w = e^{2\\pi i z}\\), define \\(g(w) = f(z)\\). The periodicity \\(f(z+1)=f(z)\\) is consistent. The map \\(z \\mapsto w\\) covers \\(\\mathbb{C}^*\\). The bound \\(|f(z)| \\leq e^{\\pi|\\text{Im}z|}\\) translates to \\(|g(w)| \\leq C(|w|^{1/2} + |w|^{-1/2})\\). The Laurent expansion of \\(g\\) around \\(w=0\\) must satisfy \\(|c_n||w|^n \\leq C|w|^{1/2}\\) (and similar for \\(w \\to \\infty\\)), forcing \\(c_n = 0\\) for \\(|n| \\geq 1\\). Wait: matching more carefully, the bound allows \\(n=0\\) and \\(n=\\pm 1\\) terms but kills \\(|n| \\geq 2\\). The answer is \\(f(z) = A + B e^{2\\pi i z} + C e^{-2\\pi iz}\\) for constants \\(A, B, C\\). (This problem previews Fourier analysis on \\(\\mathbb{T}\\).)'
                }
            ]
        }
    ]
});
