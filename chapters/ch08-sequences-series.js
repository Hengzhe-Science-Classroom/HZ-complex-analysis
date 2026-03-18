window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Sequences & Series',
    subtitle: 'Convergence in the complex plane',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Convergence in ℂ?',
            content: `
<h2>Why Convergence in &#8450;?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>The exponential series \\(e^z = 1 + z + z^2/2! + z^3/3! + \\cdots\\) converges for every \\(z \\in \\mathbb{C}\\). The geometric series \\(\\sum z^n\\) converges only for \\(|z| < 1\\). Why does one series work everywhere while the other fails outside a disk? And when a series does converge, does it converge in a way that preserves analyticity?</p>
        <p>These questions about convergence are not mere technicalities. They determine <em>which functions can be represented as series</em> and how those representations can be differentiated and integrated term by term.</p>
    </div>
</div>

<p>In real analysis, sequences and series of functions can behave badly: a series of continuous functions can converge to a discontinuous limit; you cannot always swap limits and integrals. Complex analysis is dramatically better behaved. The key is <strong>uniform convergence on compact sets</strong>, which interacts with analyticity in a deep way.</p>

<h3>From Real to Complex</h3>

<p>A complex sequence \\(\\{z_n\\}\\) lives in \\(\\mathbb{C} \\cong \\mathbb{R}^2\\), so convergence is just convergence in the plane: \\(z_n \\to L\\) iff \\(|z_n - L| \\to 0\\). But for <em>series of functions</em>, the two-dimensional domain introduces phenomena with no real analogue: convergence disks, not just intervals; the boundary of a disk can be wild even when the interior is perfect.</p>

<h3>Road Map</h3>
<ol>
    <li><strong>Complex sequences</strong>: limits, Cauchy criterion, Bolzano-Weierstrass in \\(\\mathbb{C}\\).</li>
    <li><strong>Complex series</strong>: absolute and conditional convergence, comparison and ratio tests.</li>
    <li><strong>Uniform convergence</strong>: Weierstrass M-test, term-by-term integration and differentiation.</li>
    <li><strong>Normal families</strong>: a preview of Montel's theorem and its role in deeper results.</li>
    <li><strong>Bridge</strong>: how everything here feeds into power series and Laurent expansions.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The rigorous theory of uniform convergence was developed in the 1840s, independently by Karl Weierstrass and Niels Abel. Weierstrass's 1861 construction of a continuous nowhere-differentiable function (built as a series of cosines) demonstrated that pointwise convergence alone is dangerously weak. His M-test, developed to tame this pathology, became a cornerstone of complex function theory.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Complex Sequences
        // ================================================================
        {
            id: 'sec-sequences',
            title: 'Complex Sequences',
            content: `
<h2>Complex Sequences</h2>

<p>A <strong>complex sequence</strong> is a function \\(\\mathbb{N} \\to \\mathbb{C}\\), written \\(\\{z_n\\}_{n=1}^\\infty\\) or simply \\(\\{z_n\\}\\). Writing \\(z_n = x_n + iy_n\\), a complex sequence is exactly a pair of real sequences.</p>

<div class="env-block definition">
    <div class="env-title">Definition 8.1 (Convergence)</div>
    <div class="env-body">
        <p>The sequence \\(\\{z_n\\}\\) <strong>converges</strong> to \\(L \\in \\mathbb{C}\\) if for every \\(\\varepsilon > 0\\) there exists \\(N \\in \\mathbb{N}\\) such that</p>
        \\[n > N \\implies |z_n - L| < \\varepsilon.\\]
        <p>We write \\(z_n \\to L\\) or \\(\\lim_{n\\to\\infty} z_n = L\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.2 (Real and Imaginary Parts)</div>
    <div class="env-body">
        <p>\\(z_n = x_n + iy_n \\to L = a + ib\\) if and only if \\(x_n \\to a\\) and \\(y_n \\to b\\) as real sequences.</p>
    </div>
</div>

<p><em>Proof.</em> Since \\(|x_n - a| \\leq |z_n - L|\\) and \\(|y_n - b| \\leq |z_n - L|\\), convergence of \\(z_n\\) implies convergence of both parts. Conversely, \\(|z_n - L| \\leq |x_n - a| + |y_n - b|\\). \\(\\square\\)</p>

<h3>Cauchy Sequences</h3>

<div class="env-block definition">
    <div class="env-title">Definition 8.3 (Cauchy Sequence)</div>
    <div class="env-body">
        <p>\\(\\{z_n\\}\\) is a <strong>Cauchy sequence</strong> if for every \\(\\varepsilon > 0\\) there exists \\(N\\) such that</p>
        \\[m, n > N \\implies |z_m - z_n| < \\varepsilon.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.4 (Completeness of &#8450;)</div>
    <div class="env-body">
        <p>\\(\\mathbb{C}\\) is complete: every Cauchy sequence converges.</p>
    </div>
</div>

<p>This follows directly from completeness of \\(\\mathbb{R}\\), since a complex sequence is Cauchy iff its real and imaginary parts are both Cauchy.</p>

<h3>Bolzano-Weierstrass in &#8450;</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.5 (Bolzano-Weierstrass)</div>
    <div class="env-body">
        <p>Every bounded sequence in \\(\\mathbb{C}\\) has a convergent subsequence.</p>
    </div>
</div>

<p><em>Proof sketch.</em> If \\(|z_n| \\leq M\\) for all \\(n\\), then \\(\\{x_n\\}\\) and \\(\\{y_n\\}\\) are bounded real sequences. By the real Bolzano-Weierstrass theorem, extract a subsequence \\(x_{n_k} \\to a\\), then from \\(\\{y_{n_k}\\}\\) extract a further subsequence converging to \\(b\\). The resulting subsequence satisfies \\(z_{n_{k_j}} \\to a + ib\\). \\(\\square\\)</p>

<h3>Accumulation Points and the Extended Plane</h3>

<p>A point \\(L\\) is an <strong>accumulation point</strong> (cluster point) of \\(\\{z_n\\}\\) if infinitely many terms lie in every neighborhood of \\(L\\). The sequence converges iff it has exactly one accumulation point and no terms escape to \\(\\infty\\).</p>

<p>On the <strong>Riemann sphere</strong> \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\), we say \\(z_n \\to \\infty\\) if \\(|z_n| \\to \\infty\\). Bolzano-Weierstrass extends: every sequence in \\(\\hat{\\mathbb{C}}\\) has a convergent subsequence, since \\(\\hat{\\mathbb{C}}\\) is compact.</p>

<div class="viz-placeholder" data-viz="viz-sequence-convergence"></div>
`,
            visualizations: [
                {
                    id: 'viz-sequence-convergence',
                    title: 'Sequence Convergence in the Complex Plane',
                    description: 'Plot the first N terms of z_n in the complex plane and watch them approach the limit L. Choose from several sequences; drag the target point to explore.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });

                        var seqType = 0;
                        var nMax = 20;
                        var seqNames = [
                            'z_n = (1+i)^n / 2^n',
                            'z_n = e^{i\u03c0/n}',
                            'z_n = (1 + i/n)^n',
                            'z_n = cos(n)/n + i\u00b7sin(n)/n'
                        ];

                        // Sequence definitions (return {re, im} for index n, 1-based)
                        var seqs = [
                            function(n) { var r = Math.pow(Math.SQRT2 / 2, n); var th = n * Math.PI / 4; return { re: r * Math.cos(th), im: r * Math.sin(th) }; },
                            function(n) { return { re: Math.cos(Math.PI / n), im: Math.sin(Math.PI / n) }; },
                            function(n) { // (1 + i/n)^n -> e^i
                                var re = 1, im = 0;
                                for (var k = 0; k < n; k++) {
                                    var nr = re - im / n;
                                    var ni = im + re / n;
                                    re = nr; im = ni;
                                }
                                return { re: re, im: im };
                            },
                            function(n) { return { re: Math.cos(n) / n, im: Math.sin(n) / n }; }
                        ];
                        var limits = [
                            { re: 0, im: 0 },
                            { re: 1, im: 0 },
                            { re: Math.cos(1), im: Math.sin(1) },
                            { re: 0, im: 0 }
                        ];

                        // Controls
                        var typeSelect = document.createElement('select');
                        typeSelect.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 8px;font-size:0.78rem;';
                        seqNames.forEach(function(name, i) {
                            var opt = document.createElement('option');
                            opt.value = i; opt.textContent = name;
                            typeSelect.appendChild(opt);
                        });
                        controls.appendChild(typeSelect);

                        VizEngine.createSlider(controls, 'N terms', 1, 40, nMax, 1, function(v) {
                            nMax = Math.round(v); draw();
                        });

                        typeSelect.addEventListener('change', function() {
                            seqType = parseInt(typeSelect.value); draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var seq = seqs[seqType];
                            var lim = limits[seqType];
                            var pts = [];
                            for (var n = 1; n <= nMax; n++) pts.push(seq(n));

                            // Draw trajectory
                            if (pts.length > 1) {
                                ctx.strokeStyle = viz.colors.blue + '55';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var p0 = viz.toScreen(pts[0].re, pts[0].im);
                                ctx.moveTo(p0[0], p0[1]);
                                for (var i = 1; i < pts.length; i++) {
                                    var p = viz.toScreen(pts[i].re, pts[i].im);
                                    ctx.lineTo(p[0], p[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw limit point
                            viz.drawCircle(lim.re, lim.im, 0.12, null, viz.colors.orange, 2);
                            viz.drawText('L', lim.re + 0.15, lim.im + 0.15, viz.colors.orange, 13);

                            // Draw sequence points with color gradient
                            for (var j = 0; j < pts.length; j++) {
                                var t = j / (pts.length - 1 || 1);
                                // Interpolate blue -> teal
                                var r = Math.round((1 - t) * 0x58 + t * 0x3f);
                                var g = Math.round((1 - t) * 0xa6 + t * 0xb9);
                                var b2 = Math.round((1 - t) * 0xff + t * 0xa0);
                                var col = 'rgb(' + r + ',' + g + ',' + b2 + ')';
                                var radius = j === pts.length - 1 ? 5 : 3;
                                viz.drawPoint(pts[j].re, pts[j].im, col, null, radius);
                            }

                            // Label first and last
                            if (pts.length >= 1) viz.drawText('z\u2081', pts[0].re + 0.1, pts[0].im + 0.12, viz.colors.blue, 11);
                            if (pts.length >= 2) viz.drawText('z_' + nMax, pts[pts.length-1].re + 0.1, pts[pts.length-1].im + 0.12, viz.colors.teal, 11);

                            // Info box
                            var last = pts[pts.length - 1];
                            var dist = Math.sqrt(Math.pow(last.re - lim.re, 2) + Math.pow(last.im - lim.im, 2));
                            viz.screenText('|z_N - L| = ' + dist.toFixed(4), viz.width / 2, viz.height - 18, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(z_n = \\left(1 + \\frac{i}{n}\\right)^n\\) converges to \\(e^i = \\cos 1 + i \\sin 1\\). (Hint: take logarithms and use \\(\\log(1 + i/n) \\approx i/n - 1/(2n^2) + \\cdots\\).)',
                    hint: 'Write \\(n \\log(1 + i/n)\\) and expand the logarithm as a power series.',
                    solution: 'We have \\(n \\log(1 + i/n) = n(i/n - (i/n)^2/2 + O(n^{-3})) = i + 1/(2n) + O(n^{-2}) \\to i\\). Exponentiating, \\(z_n \\to e^i\\).'
                },
                {
                    question: 'A sequence \\(\\{z_n\\}\\) satisfies \\(|z_{n+1} - L| \\leq r|z_n - L|\\) for some \\(r < 1\\) and all \\(n\\). Prove \\(z_n \\to L\\).',
                    hint: 'Apply the bound repeatedly to get \\(|z_n - L| \\leq r^{n-1}|z_1 - L|\\) and take the limit.',
                    solution: 'By induction, \\(|z_n - L| \\leq r^{n-1}|z_1 - L|\\). Since \\(r < 1\\), \\(r^{n-1} \\to 0\\), so for any \\(\\varepsilon > 0\\), choose \\(N\\) with \\(r^{N-1}|z_1 - L| < \\varepsilon\\). Then \\(n > N\\) gives \\(|z_n - L| < \\varepsilon\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Complex Series
        // ================================================================
        {
            id: 'sec-series',
            title: 'Complex Series',
            content: `
<h2>Complex Series</h2>

<p>An <strong>infinite series</strong> \\(\\sum_{n=0}^\\infty a_n\\) with \\(a_n \\in \\mathbb{C}\\) is defined through its partial sums \\(S_N = \\sum_{n=0}^N a_n\\). The series <strong>converges</strong> to \\(S\\) if \\(S_N \\to S\\).</p>

<h3>Absolute Convergence</h3>

<div class="env-block definition">
    <div class="env-title">Definition 8.6 (Absolute Convergence)</div>
    <div class="env-body">
        <p>\\(\\sum a_n\\) <strong>converges absolutely</strong> if \\(\\sum |a_n| < \\infty\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.7</div>
    <div class="env-body">
        <p>Absolute convergence implies convergence. Moreover, an absolutely convergent series may be rearranged arbitrarily without changing its sum.</p>
    </div>
</div>

<p><em>Proof.</em> If \\(\\sum |a_n| < \\infty\\), then the partial sums of \\(|a_n|\\) form a Cauchy sequence in \\(\\mathbb{R}\\). For \\(m > n > N\\), \\(|S_m - S_n| \\leq \\sum_{k=n+1}^m |a_k| \\to 0\\). So \\(\\{S_N\\}\\) is Cauchy in \\(\\mathbb{C}\\), hence convergent by completeness. The rearrangement statement follows from the corresponding real result applied to real and imaginary parts. \\(\\square\\)</p>

<h3>Convergence Tests</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.8 (Comparison Test)</div>
    <div class="env-body">
        <p>If \\(|a_n| \\leq M_n\\) for all \\(n\\) and \\(\\sum M_n < \\infty\\), then \\(\\sum a_n\\) converges absolutely.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.9 (Ratio Test)</div>
    <div class="env-body">
        <p>Suppose \\(a_n \\neq 0\\) and \\(\\limsup_{n \\to \\infty} |a_{n+1}/a_n| = \\rho\\). Then:</p>
        <ul>
            <li>\\(\\rho < 1\\): the series converges absolutely.</li>
            <li>\\(\\rho > 1\\): the series diverges.</li>
            <li>\\(\\rho = 1\\): the test is inconclusive.</li>
        </ul>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.10 (Root Test)</div>
    <div class="env-body">
        <p>Let \\(\\rho = \\limsup_{n \\to \\infty} |a_n|^{1/n}\\). Then</p>
        <ul>
            <li>\\(\\rho < 1\\): converges absolutely.</li>
            <li>\\(\\rho > 1\\): diverges.</li>
        </ul>
        <p>The root test is at least as strong as the ratio test: whenever the ratio test gives a conclusion, so does the root test.</p>
    </div>
</div>

<h3>Conditional Convergence</h3>

<p>A series converges <strong>conditionally</strong> if it converges but not absolutely. By the Riemann rearrangement theorem, conditionally convergent series of real numbers can be rearranged to converge to any value or to diverge. In \\(\\mathbb{C}\\), a conditionally convergent series can similarly be rearranged to converge to any element of the plane spanned by the terms (or to diverge).</p>

<div class="env-block example">
    <div class="env-title">Example: The Alternating Harmonic Series</div>
    <div class="env-body">
        <p>\\(\\sum_{n=1}^\\infty (-1)^{n+1}/n = 1 - 1/2 + 1/3 - \\cdots = \\ln 2\\) converges conditionally (harmonic series diverges) and equals \\(-\\log(1 - (-1)) = \\log 2\\) by the power series for \\(\\log(1+z)\\) evaluated at \\(z = 1\\) on the boundary of convergence.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-partial-sums"></div>
`,
            visualizations: [
                {
                    id: 'viz-partial-sums',
                    title: 'Partial Sums as a Path in &#8450;',
                    description: 'Each term a_n is a step in the complex plane. Watch the spiral of partial sums approach (or wander away from) a limit. Choose the series and animate term by term.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 50 });

                        var seriesType = 0;
                        var nVisible = 1;
                        var animating = false;
                        var animId = null;

                        var seriesNames = [
                            '\u03a3 z\u207f/n! (|z|=1)',
                            '\u03a3 (-1)\u207f/(n+1)',
                            '\u03a3 e^{in}/n',
                            '\u03a3 i\u207f/n'
                        ];

                        function termAt(type, n) {
                            if (type === 0) { // e^{i pi/3}^n / n!
                                var z_re = 0.8, z_im = 0.6; // |z|=1 approx
                                var re = z_re, im = z_im;
                                for (var k = 1; k < n; k++) {
                                    var nr = re * z_re - im * z_im;
                                    var ni = re * z_im + im * z_re;
                                    re = nr; im = ni;
                                }
                                var fact = 1;
                                for (var j = 1; j <= n; j++) fact *= j;
                                return { re: re / fact, im: im / fact };
                            }
                            if (type === 1) { // (-1)^n / (n+1)
                                return { re: Math.pow(-1, n) / (n + 1), im: 0 };
                            }
                            if (type === 2) { // e^{in} / n = cos(n)/n + i sin(n)/n
                                return { re: Math.cos(n) / n, im: Math.sin(n) / n };
                            }
                            // i^n / n
                            var ipow = [{ re: 1, im: 0 }, { re: 0, im: 1 }, { re: -1, im: 0 }, { re: 0, im: -1 }];
                            var p = ipow[n % 4];
                            return { re: p.re / n, im: p.im / n };
                        }

                        // UI
                        var typeSelect = document.createElement('select');
                        typeSelect.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 8px;font-size:0.78rem;margin-right:6px;';
                        seriesNames.forEach(function(name, i) {
                            var opt = document.createElement('option'); opt.value = i; opt.textContent = name;
                            typeSelect.appendChild(opt);
                        });
                        controls.appendChild(typeSelect);

                        VizEngine.createSlider(controls, 'N', 1, 60, nVisible, 1, function(v) {
                            nVisible = Math.round(v); draw();
                        });

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) {
                                animating = false; clearInterval(animId); animBtn.textContent = 'Animate';
                            } else {
                                animating = true; animBtn.textContent = 'Stop';
                                nVisible = 1;
                                animId = setInterval(function() {
                                    nVisible++;
                                    draw();
                                    if (nVisible >= 60) { animating = false; clearInterval(animId); animBtn.textContent = 'Animate'; }
                                }, 120);
                            }
                        });

                        typeSelect.addEventListener('change', function() {
                            seriesType = parseInt(typeSelect.value);
                            nVisible = 1; draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            // Build partial sums
                            var partials = [{ re: 0, im: 0 }];
                            for (var n = 1; n <= nVisible; n++) {
                                var t = termAt(seriesType, n);
                                partials.push({ re: partials[n-1].re + t.re, im: partials[n-1].im + t.im });
                            }

                            // Draw path
                            if (partials.length > 1) {
                                ctx.strokeStyle = viz.colors.blue + '77';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                var p0 = viz.toScreen(partials[0].re, partials[0].im);
                                ctx.moveTo(p0[0], p0[1]);
                                for (var i = 1; i < partials.length; i++) {
                                    var pi = viz.toScreen(partials[i].re, partials[i].im);
                                    ctx.lineTo(pi[0], pi[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw partial sum points
                            for (var j = 0; j < partials.length; j++) {
                                var alpha = j / partials.length;
                                var col = j === partials.length - 1 ? viz.colors.orange : viz.colors.blue;
                                var r = j === partials.length - 1 ? 5 : 2;
                                viz.drawPoint(partials[j].re, partials[j].im, col, null, r);
                            }

                            // Label S_0 and S_N
                            viz.drawText('S\u2080=0', partials[0].re + 0.07, partials[0].im + 0.1, viz.colors.teal, 11);
                            var last = partials[partials.length - 1];
                            viz.drawText('S_' + nVisible, last.re + 0.07, last.im + 0.1, viz.colors.orange, 11);

                            // Info
                            viz.screenText('S_N = (' + last.re.toFixed(4) + ', ' + last.im.toFixed(4) + 'i)', viz.width / 2, viz.height - 18, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Apply the ratio test to \\(\\sum_{n=0}^\\infty z^n / n!\\). What do you conclude about the radius of convergence?',
                    hint: 'Compute \\(|a_{n+1}/a_n| = |z|/(n+1)\\) and take the limit as \\(n \\to \\infty\\).',
                    solution: '\\(|a_{n+1}/a_n| = |z|/(n+1) \\to 0 < 1\\) for every fixed \\(z\\). So the series converges absolutely for all \\(z \\in \\mathbb{C}\\); the radius of convergence is \\(\\infty\\).'
                },
                {
                    question: 'Show that the series \\(\\sum_{n=1}^\\infty z^n/n\\) converges absolutely for \\(|z| < 1\\) and diverges for \\(|z| > 1\\). What happens on \\(|z| = 1\\)?',
                    hint: 'Use the ratio test for \\(|z| \\neq 1\\). On the boundary, check \\(z = 1\\) (harmonic series) and \\(z = -1\\) (alternating harmonic).',
                    solution: 'Ratio test: \\(|a_{n+1}/a_n| = |z| \\cdot n/(n+1) \\to |z|\\). So converges absolutely for \\(|z| < 1\\), diverges for \\(|z| > 1\\). On \\(|z|=1\\): at \\(z=1\\) we get \\(\\sum 1/n\\) (diverges); at \\(z=-1\\) we get \\(\\sum (-1)^n/n\\) (converges conditionally). Behavior varies around the circle.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Uniform Convergence
        // ================================================================
        {
            id: 'sec-uniform',
            title: 'Uniform Convergence',
            content: `
<h2>Uniform Convergence</h2>

<p>Consider a sequence of functions \\(f_n : E \\to \\mathbb{C}\\) on some set \\(E \\subset \\mathbb{C}\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 8.11 (Pointwise vs. Uniform)</div>
    <div class="env-body">
        <p><strong>Pointwise convergence:</strong> \\(f_n \\to f\\) pointwise on \\(E\\) if for each fixed \\(z \\in E\\), \\(f_n(z) \\to f(z)\\).</p>
        <p><strong>Uniform convergence:</strong> \\(f_n \\to f\\) uniformly on \\(E\\) if</p>
        \\[\\sup_{z \\in E} |f_n(z) - f(z)| \\to 0 \\quad \\text{as } n \\to \\infty.\\]
        <p>The key difference: in uniform convergence, the same \\(N\\) works for all \\(z \\in E\\) simultaneously.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.12 (Uniform Limit of Analytic Functions)</div>
    <div class="env-body">
        <p>If \\(f_n\\) are analytic on an open set \\(U\\) and \\(f_n \\to f\\) uniformly on every compact subset of \\(U\\), then \\(f\\) is analytic on \\(U\\). Moreover, \\(f_n' \\to f'\\) uniformly on compacta.</p>
    </div>
</div>

<p>This is radically better than real analysis, where a uniform limit of differentiable functions need not be differentiable.</p>

<h3>The Weierstrass M-Test</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.13 (Weierstrass M-Test)</div>
    <div class="env-body">
        <p>Let \\(\\{f_n\\}\\) be a sequence of functions on \\(E\\). Suppose there exist constants \\(M_n \\geq 0\\) such that</p>
        \\[|f_n(z)| \\leq M_n \\quad \\text{for all } z \\in E \\text{ and all } n,\\]
        <p>and \\(\\sum_{n=1}^\\infty M_n < \\infty\\). Then \\(\\sum_{n=1}^\\infty f_n\\) converges absolutely and uniformly on \\(E\\).</p>
    </div>
</div>

<p><em>Proof.</em> For any \\(z \\in E\\) and \\(m > n\\):</p>
\\[\\left|\\sum_{k=n+1}^m f_k(z)\\right| \\leq \\sum_{k=n+1}^m |f_k(z)| \\leq \\sum_{k=n+1}^m M_k.\\]
<p>The right side is the tail of a convergent real series, which tends to 0 independently of \\(z\\). Hence the partial sums form a uniform Cauchy sequence. \\(\\square\\)</p>

<h3>Term-by-Term Integration and Differentiation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.14 (Term-by-Term Integration)</div>
    <div class="env-body">
        <p>If \\(f_n\\) are continuous on a rectifiable curve \\(\\gamma\\) and \\(f_n \\to f\\) uniformly on \\(\\gamma\\), then</p>
        \\[\\int_\\gamma f(z)\\, dz = \\lim_{n \\to \\infty} \\int_\\gamma f_n(z)\\, dz = \\sum_{n=1}^\\infty \\int_\\gamma f_n(z)\\, dz.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Integrating the Geometric Series</div>
    <div class="env-body">
        <p>For \\(|z| < 1\\), \\(\\sum_{n=0}^\\infty z^n = 1/(1-z)\\) uniformly on \\(|z| \\leq r < 1\\). Integrating from 0 to \\(w\\) (with \\(|w| < 1\\)):</p>
        \\[\\sum_{n=0}^\\infty \\frac{w^{n+1}}{n+1} = -\\log(1-w),\\]
        <p>giving the logarithm series \\(\\log(1-w) = -\\sum_{n=1}^\\infty w^n/n\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-weierstrass-m"></div>
`,
            visualizations: [
                {
                    id: 'viz-weierstrass-m',
                    title: 'Weierstrass M-Test: Bounding Terms for Uniform Convergence',
                    description: 'For the series sum z^n * f_n on a closed disk |z| <= r, visualize the term magnitudes |f_n(z)| and their M_n bounds. Adjust r to see when the M-test applies.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, originX: 80, originY: 340, scale: 1 });

                        var rVal = 0.8;
                        var nTerms = 15;

                        VizEngine.createSlider(controls, 'r = |z| max', 0.1, 0.99, rVal, 0.01, function(v) { rVal = v; draw(); });
                        VizEngine.createSlider(controls, 'Terms', 5, 25, nTerms, 1, function(v) { nTerms = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width - 100, H = 280;
                            var left = 80, bottom = 340, top = 50;

                            // Compute M_n = r^n and max partial sum
                            var Mn = [], partialM = 0;
                            for (var n = 0; n < nTerms; n++) {
                                Mn.push(Math.pow(rVal, n));
                                partialM += Mn[n];
                            }
                            var maxM = Mn[0];
                            var barW = Math.min(30, (W - 20) / nTerms - 4);
                            var chartH = H - top;

                            // Y-axis (log scale)
                            viz.screenText('|term|', left - 55, top + chartH / 2, viz.colors.text, 11);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(left, top); ctx.lineTo(left, bottom);
                            ctx.moveTo(left, bottom); ctx.lineTo(left + W, bottom);
                            ctx.stroke();

                            // Draw bars
                            for (var i = 0; i < nTerms; i++) {
                                var xBar = left + 10 + i * (barW + 4);
                                var hM = (Mn[i] / maxM) * chartH;

                                // M_n bar (bound)
                                ctx.fillStyle = viz.colors.orange + '66';
                                ctx.fillRect(xBar, bottom - hM, barW, hM);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(xBar, bottom - hM, barW, hM);

                                // n label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(i, xBar + barW / 2, bottom + 4);
                            }

                            // Annotations
                            viz.screenText('M_n = r\u207F, r = ' + rVal.toFixed(2), viz.width / 2, top - 10, viz.colors.orange, 13);
                            viz.screenText('\u03a3M_n = r/(1\u2212r) = ' + (rVal / (1 - rVal)).toFixed(3) + ' < \u221e', viz.width / 2, bottom + 30, viz.colors.green, 12);

                            var convergesText = rVal < 1
                                ? 'M-test PASSES: uniform convergence on |z| \u2264 ' + rVal.toFixed(2)
                                : 'M-test FAILS for |z| = 1 (r too large)';
                            viz.screenText(convergesText, viz.width / 2, bottom + 55, rVal < 1 ? viz.colors.green : viz.colors.red, 12);

                            // Partial sum info
                            viz.screenText('Partial sum of M_n (N=' + nTerms + '): ' + partialM.toFixed(4), viz.width / 2, viz.height - 18, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Weierstrass M-test to show that \\(\\sum_{n=1}^\\infty z^n / n^2\\) converges uniformly on the closed unit disk \\(\\overline{\\mathbb{D}} = \\{|z| \\leq 1\\}\\).',
                    hint: 'On \\(|z| \\leq 1\\), we have \\(|z^n/n^2| \\leq 1/n^2\\). Does \\(\\sum 1/n^2\\) converge?',
                    solution: 'Take \\(M_n = 1/n^2\\). On \\(|z| \\leq 1\\), \\(|z^n/n^2| \\leq |z|^n/n^2 \\leq 1/n^2\\). Since \\(\\sum 1/n^2 = \\pi^2/6 < \\infty\\), the M-test gives uniform (and absolute) convergence on \\(\\overline{\\mathbb{D}}\\).'
                },
                {
                    question: 'Let \\(f_n(z) = z^n / n\\) on \\(|z| < 1\\). Show \\(f_n \\to 0\\) pointwise but that \\(\\{f_n\\}\\) does NOT converge uniformly on \\(|z| < 1\\).',
                    hint: 'For pointwise: fix \\(z\\), use \\(|z| < 1\\). For non-uniformity: consider \\(z_n = (1 - 1/n) \\in (0,1)\\) and show the sup is bounded away from 0.',
                    solution: 'Pointwise: \\(|f_n(z)| = |z|^n/n \\leq |z|^n \\to 0\\) since \\(|z| < 1\\). Non-uniformity: \\(\\sup_{|z|<1} |z^n/n| \\geq (1 - 1/n)^n/n \\to e^{-1}/0 \\cdots\\) more precisely, \\(\\sup = 1/n \\cdot \\sup_{r<1} r^n = 1/n\\) (supremum not attained, approaches \\(1/n\\)). Actually \\(\\sup_{|z| < 1} |z^n/n| = 1/n \\to 0\\), so this example does converge uniformly! The correct example is \\(f_n(z) = z^n\\) (no \\(1/n\\)) on \\(|z| < 1\\): \\(\\sup = 1\\) does not tend to 0.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Normal Families
        // ================================================================
        {
            id: 'sec-normal',
            title: 'Normal Families',
            content: `
<h2>Normal Families</h2>

<p>Uniform convergence on compacta (compact subsets) is so central in complex analysis that it has its own terminology.</p>

<div class="env-block definition">
    <div class="env-title">Definition 8.15 (Normal Family)</div>
    <div class="env-body">
        <p>A family \\(\\mathcal{F}\\) of meromorphic functions on an open set \\(U\\) is <strong>normal</strong> if every sequence in \\(\\mathcal{F}\\) has a subsequence that converges uniformly on every compact subset of \\(U\\) (to a meromorphic function or to \\(\\infty\\)).</p>
    </div>
</div>

<p>Normal families are the function-theoretic analogue of compact sets: they are "sequentially precompact" in the topology of uniform convergence on compacta.</p>

<h3>Montel's Theorem (Preview)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.16 (Montel, 1907)</div>
    <div class="env-body">
        <p>Let \\(\\mathcal{F}\\) be a family of analytic functions on a domain \\(U\\) that is <strong>locally uniformly bounded</strong>: for each compact \\(K \\subset U\\) there exists \\(M_K\\) such that \\(|f(z)| \\leq M_K\\) for all \\(f \\in \\mathcal{F}\\) and \\(z \\in K\\). Then \\(\\mathcal{F}\\) is a normal family.</p>
    </div>
</div>

<p>The proof uses the Arzel&#224;-Ascoli theorem: local boundedness implies equicontinuity (via Cauchy's integral formula for derivatives), and equicontinuity plus pointwise boundedness gives sequential compactness.</p>

<h3>Why This Matters</h3>

<p>Montel's theorem is a key tool in:</p>
<ul>
    <li><strong>Riemann mapping theorem</strong>: The proof constructs an extremal function as a limit of a normal family.</li>
    <li><strong>Picard's theorem</strong>: A family omitting two values is normal (Picard's little theorem follows).</li>
    <li><strong>Iteration theory</strong>: Fatou and Julia sets are defined via normality of the family \\(\\{f^n\\}\\) of iterates.</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example: A Bounded Family</div>
    <div class="env-body">
        <p>The family \\(\\mathcal{F} = \\{f_n(z) = z^n : n \\geq 1\\}\\) on \\(|z| \\leq r < 1\\) is uniformly bounded by \\(r^n \\leq 1\\). By Montel's theorem it is normal. Indeed, \\(f_n \\to 0\\) uniformly on \\(|z| \\leq r\\).</p>
        <p>On the open unit disk \\(\\mathbb{D}\\), \\(\\{z^n\\}\\) is still locally uniformly bounded (bounded on every \\(|z| \\leq r < 1\\)) and hence normal, with \\(z^n \\to 0\\) uniformly on compacta of \\(\\mathbb{D}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-normal-family"></div>
`,
            visualizations: [
                {
                    id: 'viz-normal-family',
                    title: 'Normal Families: Convergence on Compact Sets',
                    description: 'Visualize the family f_n(z) = z^n on the unit disk. Pick a compact subdisk |z| <= r and watch the uniform convergence as n grows. Compare behavior inside vs. outside the radius.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 100 });

                        var rComp = 0.7;
                        var nVal = 5;
                        var showN = 8;

                        VizEngine.createSlider(controls, 'Compact radius r', 0.1, 0.99, rComp, 0.01, function(v) { rComp = v; draw(); });
                        VizEngine.createSlider(controls, 'n (f_n = z\u207F)', 1, 30, nVal, 1, function(v) { nVal = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Draw unit disk boundary
                            viz.drawCircle(0, 0, 1, null, viz.colors.axis + '88', 1.5);

                            // Draw compact subdisk
                            viz.drawCircle(0, 0, rComp, viz.colors.blue + '18', viz.colors.blue, 2);
                            viz.drawText('|z|\u2264' + rComp.toFixed(2), rComp * 0.6, rComp * 0.6, viz.colors.blue, 11);
                            viz.drawText('|z|=1', 0.72, 0.72, viz.colors.axis, 10);

                            // Sample points on the compact disk and on the circle
                            var pts = [];
                            // Grid of points in compact disk
                            for (var re = -rComp; re <= rComp; re += 0.15) {
                                for (var im = -rComp; im <= rComp; im += 0.15) {
                                    if (re * re + im * im <= rComp * rComp) pts.push({ re: re, im: im, inside: true });
                                }
                            }
                            // Points on boundary
                            for (var t = 0; t < 2 * Math.PI; t += 0.4) {
                                pts.push({ re: Math.cos(t), im: Math.sin(t), inside: false });
                            }

                            // For each point, compute |f_n(z)| = |z|^n and draw magnitude bar
                            var ctx = viz.ctx;
                            var maxSup = 0;
                            pts.forEach(function(p) {
                                var r2 = Math.sqrt(p.re * p.re + p.im * p.im);
                                var fMag = Math.pow(r2, nVal);
                                if (p.inside) maxSup = Math.max(maxSup, fMag);
                                var col = p.inside ? viz.colors.teal : viz.colors.red;
                                // Draw a small bar showing |f_n(z)|
                                var sc = viz.toScreen(p.re, p.im);
                                ctx.fillStyle = col + '99';
                                ctx.fillRect(sc[0] - 3, sc[1] - fMag * 30, 6, fMag * 30);
                                viz.drawPoint(p.re, p.im, col, null, 2);
                            });

                            var supOnDisk = Math.pow(rComp, nVal);
                            viz.screenText(
                                'sup|z|\u2264r |f_n(z)| = r\u207F = ' + supOnDisk.toFixed(5) + '  \u2192 0 as n\u2192\u221e',
                                viz.width / 2, viz.height - 36, viz.colors.teal, 12
                            );
                            viz.screenText(
                                'On |z|=1: |f_n(z)| = 1 for all n  (not converging to 0)',
                                viz.width / 2, viz.height - 18, viz.colors.red, 12
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\mathcal{F} = \\{f : \\mathbb{D} \\to \\mathbb{D}\\text{ analytic}\\}\\), i.e., functions mapping the unit disk into itself. Is \\(\\mathcal{F}\\) a normal family? Justify.',
                    hint: 'Check whether \\(\\mathcal{F}\\) is locally uniformly bounded, then apply Montel\'s theorem.',
                    solution: 'Yes. For any compact \\(K \\subset \\mathbb{D}\\) and any \\(f \\in \\mathcal{F}\\), \\(|f(z)| < 1\\) for all \\(z \\in K\\) (since \\(f(\\mathbb{D}) \\subset \\mathbb{D}\\)). So \\(\\mathcal{F}\\) is bounded by \\(M_K = 1\\) on every compact subset. By Montel\'s theorem, \\(\\mathcal{F}\\) is normal.'
                },
                {
                    question: 'Show that the family \\(\\{f_n(z) = nz : n = 1, 2, 3, \\ldots\\}\\) on \\(\\mathbb{D}\\) is NOT normal.',
                    hint: 'Check whether any subsequence converges uniformly on the compact set \\(\\{|z| \\leq 1/2\\}\\).',
                    solution: 'On \\(|z| = 1/2\\), \\(|f_n(z)| = n/2 \\to \\infty\\). So the family is not locally uniformly bounded (the bound grows without limit on any disk centered at 0). No subsequence can converge uniformly on \\(|z| \\leq 1/2\\) to a finite analytic function, so the family is not normal.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to Power Series
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: Toward Power Series',
            content: `
<h2>Bridge: Toward Power Series</h2>

<p>Everything we have developed in this chapter is preparation for the central object of Part C: <strong>power series</strong>.</p>

<h3>The Radius of Convergence</h3>

<div class="env-block definition">
    <div class="env-title">Definition 8.17 (Power Series)</div>
    <div class="env-body">
        <p>A <strong>power series centered at \\(a\\)</strong> is a series of the form</p>
        \\[\\sum_{n=0}^\\infty c_n (z - a)^n, \\quad c_n \\in \\mathbb{C}.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.18 (Cauchy-Hadamard)</div>
    <div class="env-body">
        <p>The power series \\(\\sum c_n (z-a)^n\\) has a <strong>radius of convergence</strong></p>
        \\[R = \\frac{1}{\\limsup_{n \\to \\infty} |c_n|^{1/n}}\\]
        <p>(with the conventions \\(1/0 = \\infty\\) and \\(1/\\infty = 0\\)). The series converges absolutely for \\(|z - a| < R\\) and diverges for \\(|z - a| > R\\). On \\(|z - a| = R\\), behavior varies.</p>
    </div>
</div>

<p>The root test from Section 3 gives exactly this formula: \\(\\rho = \\limsup |c_n (z-a)^n|^{1/n} = |z-a| \\cdot \\limsup |c_n|^{1/n}\\), and the series converges iff \\(|z-a| < 1/\\limsup |c_n|^{1/n} = R\\).</p>

<h3>Uniform Convergence on Compact Subdisks</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.19</div>
    <div class="env-body">
        <p>A power series \\(\\sum c_n (z-a)^n\\) with radius of convergence \\(R > 0\\) converges absolutely and uniformly on every closed subdisk \\(|z - a| \\leq r\\) for any \\(r < R\\). Consequently, the sum function is analytic on \\(|z - a| < R\\) and can be differentiated and integrated term by term.</p>
    </div>
</div>

<p><em>Proof sketch.</em> Fix \\(r < R\\) and choose \\(r < \\rho < R\\). Then \\(\\sum |c_n|\\rho^n < \\infty\\) (convergence at \\(\\rho\\)). For \\(|z - a| \\leq r\\), set \\(M_n = |c_n|\\rho^n \\cdot (r/\\rho)^n = |c_n| r^n\\). Wait, more cleanly: \\(|c_n (z-a)^n| \\leq |c_n| r^n \\leq |c_n|\\rho^n\\) since \\(r < \\rho\\). The M-test applies. Term-by-term analyticity then follows from Theorem 8.12. \\(\\square\\)</p>

<h3>What Comes Next</h3>

<p>In Chapter 9, we will show the converse: <em>every analytic function is locally a power series</em>. This is the Taylor series theorem for complex functions, proved using Cauchy's integral formula. The Weierstrass M-test and uniform convergence on compacta, developed in this chapter, are exactly what is needed to justify the interchange of integral and sum in that proof.</p>

<div class="viz-placeholder" data-viz="viz-convergence-disk"></div>
<div class="viz-placeholder" data-viz="viz-geometric-series"></div>
`,
            visualizations: [
                {
                    id: 'viz-convergence-disk',
                    title: 'The Disk of Convergence',
                    description: 'Visualize where sum c_n z^n converges. Drag the radius slider to set R. Points inside the disk converge; outside they diverge. Click anywhere to evaluate the partial sum at that point.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 80 });

                        var R = 1.2;
                        var nTerms = 20;
                        var testPoint = { re: 0.5, im: 0.5 };

                        VizEngine.createSlider(controls, 'Radius R', 0.3, 2.5, R, 0.05, function(v) { R = v; draw(); });
                        VizEngine.createSlider(controls, 'N terms', 5, 40, nTerms, 1, function(v) { nTerms = Math.round(v); draw(); });

                        // Click to set test point
                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var sx = e.clientX - rect.left, sy = e.clientY - rect.top;
                            var m = viz.toMath(sx, sy);
                            testPoint.re = m[0]; testPoint.im = m[1];
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Convergence disk (filled)
                            viz.drawCircle(0, 0, R, viz.colors.teal + '22', viz.colors.teal, 2);

                            // Divergence annotation
                            viz.drawText('|z| < R', 0, R * 0.55, viz.colors.teal, 12);
                            viz.drawText('converges', 0, R * 0.38, viz.colors.teal, 10);
                            viz.drawText('|z| = R', R * 0.72, R * 0.72, viz.colors.yellow, 10);

                            // Test point
                            var dist = Math.sqrt(testPoint.re * testPoint.re + testPoint.im * testPoint.im);
                            var inside = dist < R;
                            var ptColor = inside ? viz.colors.green : viz.colors.red;
                            viz.drawPoint(testPoint.re, testPoint.im, ptColor, null, 7);
                            viz.drawSegment(0, 0, testPoint.re, testPoint.im, ptColor, 1, true);
                            viz.drawText('|z|=' + dist.toFixed(2), testPoint.re + 0.12, testPoint.im + 0.12, ptColor, 11);

                            // Compute partial sum at test point (using c_n = 1/n! for e^z)
                            var sumRe = 0, sumIm = 0;
                            var zRe = testPoint.re, zIm = testPoint.im;
                            var powRe = 1, powIm = 0;
                            var fact = 1;
                            for (var n = 0; n <= nTerms; n++) {
                                if (n > 0) fact *= n;
                                var cn = 1 / fact; // e^z series
                                sumRe += cn * powRe; sumIm += cn * powIm;
                                var nr = powRe * zRe - powIm * zIm;
                                var ni = powRe * zIm + powIm * zRe;
                                powRe = nr; powIm = ni;
                            }

                            viz.screenText(
                                'Point: (' + testPoint.re.toFixed(3) + ', ' + testPoint.im.toFixed(3) + 'i)  |z|=' + dist.toFixed(3) + '  ' + (inside ? '< R (converges)' : '\u2265 R (diverges)'),
                                viz.width / 2, viz.height - 36, ptColor, 11
                            );
                            viz.screenText(
                                'e^z partial sum (N=' + nTerms + '): ' + sumRe.toFixed(4) + ' + ' + sumIm.toFixed(4) + 'i',
                                viz.width / 2, viz.height - 18, viz.colors.text, 11
                            );

                            viz.drawText('R = ' + R.toFixed(2), -viz.originX / viz.scale + 0.3, 0.2, viz.colors.teal, 12);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-geometric-series',
                    title: 'Geometric Series: sum z^n = 1/(1-z)',
                    description: 'Animate partial sums of sum_{n=0}^N z^n converging to 1/(1-z) inside the unit disk. Move z inside the disk and watch the partial sums spiral toward the true value.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 90 });

                        var zRe = 0.5, zIm = 0.3;
                        var N = 10;
                        var animating = false;
                        var animFrame = null;
                        var tAnim = 0;

                        VizEngine.createSlider(controls, 'N terms', 0, 30, N, 1, function(v) { N = Math.round(v); draw(); });

                        var animBtn = VizEngine.createButton(controls, 'Animate N', function() {
                            if (animating) {
                                animating = false;
                                if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
                                animBtn.textContent = 'Animate N';
                            } else {
                                animating = true; animBtn.textContent = 'Stop';
                                tAnim = 0;
                                var step = function() {
                                    N = tAnim % 31;
                                    tAnim++;
                                    draw();
                                    if (animating) animFrame = requestAnimationFrame(step);
                                };
                                animFrame = requestAnimationFrame(step);
                            }
                        });

                        // Draggable z
                        viz.addDraggable('z', zRe, zIm, viz.colors.orange, 8, function(x, y) {
                            // Clamp to slightly inside unit disk
                            var r = Math.sqrt(x * x + y * y);
                            if (r > 0.95) { x = x / r * 0.95; y = y / r * 0.95; }
                            zRe = x; zIm = y; draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.axis, 1.5);
                            viz.drawText('|z|=1', 0.72, 0.75, viz.colors.axis, 10);

                            // True value 1/(1-z)
                            var denom = (1 - zRe) * (1 - zRe) + zIm * zIm;
                            var trueRe = (1 - zRe) / denom;
                            var trueIm = zIm / denom;

                            // Partial sums S_N = sum_{n=0}^{N} z^n
                            var partials = [{ re: 0, im: 0 }];
                            var powRe = 1, powIm = 0;
                            for (var n = 0; n <= N; n++) {
                                partials.push({ re: partials[n].re + powRe, im: partials[n].im + powIm });
                                var nr = powRe * zRe - powIm * zIm;
                                var ni = powRe * zIm + powIm * zRe;
                                powRe = nr; powIm = ni;
                            }

                            // Draw path of partial sums
                            var ctx = viz.ctx;
                            if (partials.length > 1) {
                                ctx.strokeStyle = viz.colors.blue + '88';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                var p0 = viz.toScreen(partials[0].re, partials[0].im);
                                ctx.moveTo(p0[0], p0[1]);
                                for (var i = 1; i < partials.length; i++) {
                                    var pi = viz.toScreen(partials[i].re, partials[i].im);
                                    ctx.lineTo(pi[0], pi[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw partial sum points
                            for (var j = 1; j < partials.length; j++) {
                                var isLast = j === partials.length - 1;
                                viz.drawPoint(partials[j].re, partials[j].im, isLast ? viz.colors.blue : viz.colors.blue + '66', null, isLast ? 5 : 2);
                            }

                            // Draw true value
                            viz.drawPoint(trueRe, trueIm, viz.colors.orange, null, 7);
                            viz.drawText('1/(1\u2212z)', trueRe + 0.1, trueIm + 0.12, viz.colors.orange, 11);

                            // Draw z point and draggable
                            viz.draggables[0].x = zRe; viz.draggables[0].y = zIm;
                            viz.drawDraggables();
                            viz.drawText('z', zRe + 0.1, zIm + 0.1, viz.colors.orange, 12);

                            // Error
                            var lastS = partials[partials.length - 1];
                            var err = Math.sqrt(Math.pow(lastS.re - trueRe, 2) + Math.pow(lastS.im - trueIm, 2));

                            viz.screenText(
                                'z = ' + zRe.toFixed(3) + ' + ' + zIm.toFixed(3) + 'i,  |z| = ' + Math.sqrt(zRe*zRe+zIm*zIm).toFixed(3),
                                viz.width / 2, viz.height - 36, viz.colors.text, 11
                            );
                            viz.screenText(
                                'S_' + N + ' error = |S_N \u2212 1/(1\u2212z)| = ' + err.toFixed(5),
                                viz.width / 2, viz.height - 18, viz.colors.text, 11
                            );
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the radius of convergence of \\(\\sum_{n=0}^\\infty n! \\cdot z^n\\) using the ratio test and the Cauchy-Hadamard formula.',
                    hint: 'For the ratio test: \\(|a_{n+1}/a_n| = (n+1)|z|\\). For Cauchy-Hadamard: \\(\\limsup (n!)^{1/n}\\).',
                    solution: 'Ratio test: \\(|(n+1)!z^{n+1}|/|n!z^n| = (n+1)|z| \\to \\infty\\) for any \\(z \\neq 0\\). So \\(R = 0\\); the series converges only at \\(z = 0\\). Cauchy-Hadamard: \\(\\limsup (n!)^{1/n} = \\infty\\) by Stirling\'s approximation, giving \\(R = 1/\\infty = 0\\). Consistent.'
                },
                {
                    question: 'Find the radius of convergence of \\(\\sum_{n=1}^\\infty z^{n^2}\\) (i.e., the series with \\(c_{n^2} = 1\\) and \\(c_k = 0\\) if \\(k\\) is not a perfect square).',
                    hint: 'The non-zero coefficients are \\(c_{n^2} = 1\\). Apply Cauchy-Hadamard: what is \\(\\limsup_k |c_k|^{1/k}\\)?',
                    solution: '\\(|c_k|^{1/k}\\) equals \\(1^{1/k} = 1\\) when \\(k = n^2\\) is a perfect square, and 0 otherwise. So \\(\\limsup_k |c_k|^{1/k} = 1\\), giving \\(R = 1\\). The series converges for \\(|z| < 1\\) and diverges for \\(|z| > 1\\).'
                },
                {
                    question: 'Use the formula for the geometric series sum to compute \\(\\sum_{n=1}^\\infty n z^{n-1}\\) for \\(|z| < 1\\). (Hint: differentiate \\(\\sum z^n = 1/(1-z)\\) term by term.)',
                    hint: 'The geometric series is \\(\\sum_{n=0}^\\infty z^n = 1/(1-z)\\). Differentiate both sides with respect to \\(z\\).',
                    solution: 'Differentiating \\(\\sum_{n=0}^\\infty z^n = 1/(1-z)\\) term by term (justified by uniform convergence on compacta of \\(\\mathbb{D}\\)): \\(\\sum_{n=1}^\\infty n z^{n-1} = 1/(1-z)^2\\).'
                },
                {
                    question: 'Prove that if \\(\\sum a_n\\) converges absolutely, then \\(|{\\sum a_n}| \\leq \\sum |a_n|\\). (Triangle inequality for series.)',
                    hint: 'Apply the finite triangle inequality to partial sums and take limits.',
                    solution: '\\(|S_N| = |\\sum_{n=0}^N a_n| \\leq \\sum_{n=0}^N |a_n|\\) by the triangle inequality. Taking \\(N \\to \\infty\\): the left side tends to \\(|\\sum a_n|\\) and the right to \\(\\sum |a_n|\\).'
                }
            ]
        }
    ]
});
