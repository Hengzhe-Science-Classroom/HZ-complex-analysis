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
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>We know from calculus that many familiar functions, \\(e^x\\), \\(\\sin x\\), \\(\\cos x\\), can be expressed as infinite polynomials (power series). In complex analysis, something far more remarkable happens: <strong>every</strong> holomorphic function has a power series expansion around each point of its domain. Conversely, every convergent power series defines a holomorphic function. The two notions, "differentiable" and "expressible as a power series," are the same.</p>
    </div>
</div>

<p>A <strong>power series</strong> centered at \\(z_0 \\in \\mathbb{C}\\) is a formal expression</p>
\\[
f(z) = \\sum_{n=0}^{\\infty} a_n (z - z_0)^n = a_0 + a_1(z-z_0) + a_2(z-z_0)^2 + \\cdots
\\]
<p>where the coefficients \\(a_n \\in \\mathbb{C}\\). Without loss of generality we often take \\(z_0 = 0\\) (by translating coordinates), writing \\(\\sum a_n z^n\\).</p>

<h3>Why This Chapter Matters</h3>

<p>Power series are the single most important computational and theoretical tool in complex analysis, for three reasons:</p>
<ol>
    <li><strong>Local representation.</strong> Every holomorphic function equals its Taylor series in a disk around each point. This lets us reduce analytic questions to algebraic manipulations of coefficients.</li>
    <li><strong>The analytic-holomorphic equivalence.</strong> In real analysis, being infinitely differentiable (\\(C^\\infty\\)) does <em>not</em> guarantee a convergent Taylor series. In complex analysis it does. This is the deepest structural fact separating complex from real.</li>
    <li><strong>Gateway to singularities.</strong> Understanding where a power series converges (and where it fails) leads directly to the classification of singularities and the Laurent series of Chapter 10.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">A Real Cautionary Tale</div>
    <div class="env-body">
        <p>The function \\(f(x) = e^{-1/x^2}\\) (with \\(f(0)=0\\)) is \\(C^\\infty\\) on \\(\\mathbb{R}\\), and all its derivatives at \\(x=0\\) are zero. Its Taylor series at the origin is the zero function, yet \\(f\\) is clearly not zero. In the complex plane, \\(f(z) = e^{-1/z^2}\\) has an essential singularity at \\(z=0\\), so no Taylor series exists there. The real and complex stories are consistent, but the complex viewpoint explains <em>why</em> the real Taylor series fails.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Radius of Convergence
        // ================================================================
        {
            id: 'sec-radius',
            title: 'Radius of Convergence',
            content: `
<h2>Radius of Convergence</h2>

<div class="env-block intuition">
    <div class="env-title">The Key Idea</div>
    <div class="env-body">
        <p>Every power series \\(\\sum a_n z^n\\) converges inside some disk \\(|z| < R\\) and diverges outside it. The boundary \\(|z| = R\\) is where anything can happen. The number \\(R\\) is determined entirely by the growth rate of the coefficients \\(a_n\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.1 (Hadamard's Formula)</div>
    <div class="env-body">
        <p>The <strong>radius of convergence</strong> of \\(\\sum_{n=0}^\\infty a_n z^n\\) is</p>
        \\[
        R = \\frac{1}{\\limsup_{n \\to \\infty} |a_n|^{1/n}}.
        \\]
        <p>The series converges absolutely for \\(|z| < R\\) and diverges for \\(|z| > R\\). (We set \\(R = \\infty\\) if the limsup is 0, and \\(R = 0\\) if it is \\(\\infty\\).)</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Disk of Convergence)</div>
    <div class="env-body">
        <p>The open disk \\(D(z_0, R) = \\{z \\in \\mathbb{C} : |z - z_0| < R\\}\\) is the <strong>disk of convergence</strong> of the power series \\(\\sum a_n (z-z_0)^n\\).</p>
    </div>
</div>

<h3>Proof Sketch of Hadamard's Formula</h3>

<p>Set \\(\\alpha = \\limsup |a_n|^{1/n}\\). For \\(|z| < 1/\\alpha\\), choose \\(r\\) with \\(|z| < r < 1/\\alpha\\). Then \\(|a_n|^{1/n} < 1/r\\) for all large \\(n\\), so \\(|a_n z^n| < (|z|/r)^n\\). Since \\(|z|/r < 1\\), the series converges by comparison with a geometric series. For \\(|z| > 1/\\alpha\\), we get \\(|a_n z^n| > 1\\) for infinitely many \\(n\\), so the terms do not tend to zero and the series diverges.</p>

<h3>The Ratio Test Alternative</h3>

<p>When the limit exists, the ratio test gives a more practical formula:</p>
\\[
R = \\lim_{n \\to \\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|.
\\]

<div class="env-block example">
    <div class="env-title">Example: Geometric Series</div>
    <div class="env-body">
        <p>For \\(\\sum z^n\\), we have \\(a_n = 1\\), so \\(|a_n|^{1/n} = 1\\) and \\(R = 1\\). The series converges for \\(|z| < 1\\) to \\(\\frac{1}{1-z}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Exponential Series</div>
    <div class="env-body">
        <p>For \\(e^z = \\sum \\frac{z^n}{n!}\\), we have \\(a_n = 1/n!\\), so \\(|a_n|^{1/n} = (n!)^{-1/n} \\to 0\\) by Stirling, giving \\(R = \\infty\\). The exponential function is entire (analytic on all of \\(\\mathbb{C}\\)).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\sum n! \\, z^n\\)</div>
    <div class="env-body">
        <p>Here \\(|a_n|^{1/n} = (n!)^{1/n} \\to \\infty\\), so \\(R = 0\\). This series converges only at \\(z = 0\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-radius-convergence"></div>
<div class="viz-placeholder" data-viz="viz-hadamard"></div>
`,
            visualizations: [
                {
                    id: 'viz-radius-convergence',
                    title: 'Convergence Disk of a Power Series',
                    description: 'The power series \\(\\sum a_n z^n\\) converges inside the disk of radius \\(R\\) (green) and diverges outside (red). Points on the boundary can go either way. Drag the test point \\(z\\) to see whether partial sums converge or diverge. Choose different series with the buttons.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 480, scale: 80 });
                        var seriesType = 'geometric';
                        var N = 30;

                        function getCoeffs(type) {
                            if (type === 'geometric') return { name: '1/(1-z)', R: 1, a: function(n) { return 1; } };
                            if (type === 'log') return { name: 'Log(1+z)', R: 1, a: function(n) { return n === 0 ? 0 : Math.pow(-1, n+1) / n; } };
                            if (type === 'exp') return { name: 'exp(z)', R: 12, a: function(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return 1 / f; } };
                            return { name: 'sin(z)', R: 12, a: function(n) { if (n % 2 === 0) return 0; var f = 1; for (var i = 2; i <= n; i++) f *= i; return Math.pow(-1, (n-1)/2) / f; } };
                        }

                        var info = getCoeffs(seriesType);
                        var zDrag = viz.addDraggable('z', 0.6, 0.4, viz.colors.blue);

                        VizEngine.createButton(controls, '1/(1-z)', function() { seriesType = 'geometric'; info = getCoeffs(seriesType); draw(); });
                        VizEngine.createButton(controls, 'Log(1+z)', function() { seriesType = 'log'; info = getCoeffs(seriesType); draw(); });
                        VizEngine.createButton(controls, 'exp(z)', function() { seriesType = 'exp'; info = getCoeffs(seriesType); draw(); });
                        VizEngine.createButton(controls, 'sin(z)', function() { seriesType = 'sin'; info = getCoeffs(seriesType); draw(); });

                        function complexPow(re, im, n) {
                            var r = Math.sqrt(re * re + im * im);
                            var theta = Math.atan2(im, re);
                            var rn = Math.pow(r, n);
                            return [rn * Math.cos(n * theta), rn * Math.sin(n * theta)];
                        }

                        function partialSum(re, im, maxN) {
                            var sr = 0, si = 0;
                            for (var n = 0; n <= maxN; n++) {
                                var an = info.a(n);
                                var p = complexPow(re, im, n);
                                sr += an * p[0];
                                si += an * p[1];
                                if (Math.abs(sr) > 1e8 || Math.abs(si) > 1e8) return [sr, si, false];
                            }
                            return [sr, si, true];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var R = info.R;
                            var dispR = Math.min(R, 5);

                            // Draw convergence disk
                            if (R < 10) {
                                viz.drawCircle(0, 0, dispR, viz.colors.green + '15', viz.colors.green, 2);
                            }

                            // Labels
                            var ctx = viz.ctx;
                            viz.screenText('Series: ' + info.name, viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('R = ' + (R > 10 ? '∞' : R.toString()), viz.width / 2, 38, viz.colors.teal, 12);

                            // Test point info
                            var zx = zDrag.x, zy = zDrag.y;
                            var r = Math.sqrt(zx * zx + zy * zy);
                            var result = partialSum(zx, zy, N);
                            var converged = result[2] && Math.abs(result[0]) < 1e6 && Math.abs(result[1]) < 1e6;

                            // Draw line from origin to z
                            viz.drawSegment(0, 0, zx, zy, viz.colors.blue + '66', 1, true);

                            // Info panel
                            var col = converged ? viz.colors.green : viz.colors.red;
                            viz.screenText('z = ' + zx.toFixed(2) + ' + ' + zy.toFixed(2) + 'i', viz.width / 2, viz.height - 60, viz.colors.white, 12);
                            viz.screenText('|z| = ' + r.toFixed(3), viz.width / 2, viz.height - 44, viz.colors.text, 11);
                            if (converged) {
                                viz.screenText('S_' + N + ' = ' + result[0].toFixed(4) + ' + ' + result[1].toFixed(4) + 'i', viz.width / 2, viz.height - 26, col, 12);
                            } else {
                                viz.screenText('DIVERGES', viz.width / 2, viz.height - 26, col, 13);
                            }

                            viz.drawDraggables();
                        }

                        zDrag.onDrag = function() { draw(); };
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-hadamard',
                    title: 'Hadamard\'s Formula: \\(R = 1/\\limsup |a_n|^{1/n}\\)',
                    description: 'Watch how \\(|a_n|^{1/n}\\) behaves as \\(n\\) grows. The limsup of this sequence determines the radius of convergence. Choose different series to see how coefficient decay rates control \\(R\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 60, originY: 300, scale: 12
                        });

                        var seriesType = 'geometric';

                        function getInfo(type) {
                            if (type === 'geometric') return { name: 'Σ zⁿ (aₙ=1)', a: function(n) { return 1; }, R: 1 };
                            if (type === 'log') return { name: 'Σ zⁿ/n', a: function(n) { return n === 0 ? 1 : 1/n; }, R: 1 };
                            if (type === 'exp') return { name: 'Σ zⁿ/n!', a: function(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return 1/f; }, R: Infinity };
                            return { name: 'Σ 2ⁿzⁿ', a: function(n) { return Math.pow(2, n); }, R: 0.5 };
                        }

                        VizEngine.createButton(controls, 'aₙ = 1', function() { seriesType = 'geometric'; draw(); });
                        VizEngine.createButton(controls, 'aₙ = 1/n', function() { seriesType = 'log'; draw(); });
                        VizEngine.createButton(controls, 'aₙ = 1/n!', function() { seriesType = 'exp'; draw(); });
                        VizEngine.createButton(controls, 'aₙ = 2ⁿ', function() { seriesType = 'pow2'; draw(); });

                        function draw() {
                            var info = getInfo(seriesType);
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw axes manually (custom coordinate system)
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(60, 300); ctx.lineTo(540, 300); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(60, 300); ctx.lineTo(60, 20); ctx.stroke();

                            // X-axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var i = 0; i <= 40; i += 5) {
                                var sx = 60 + i * 12;
                                ctx.fillText(i.toString(), sx, 305);
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(sx, 20); ctx.lineTo(sx, 300); ctx.stroke();
                            }

                            // Compute and plot |a_n|^{1/n}
                            var maxY = 0;
                            var pts = [];
                            for (var n = 1; n <= 40; n++) {
                                var an = Math.abs(info.a(n));
                                if (an === 0) { pts.push(null); continue; }
                                var val = Math.pow(an, 1/n);
                                if (val > 100) val = 100;
                                pts.push(val);
                                if (val > maxY) maxY = val;
                            }
                            if (maxY < 1) maxY = 2;
                            maxY = Math.ceil(maxY * 1.2);
                            var scaleY = 260 / maxY;

                            // Y-axis labels
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            var yStep = maxY <= 3 ? 0.5 : (maxY <= 10 ? 1 : Math.ceil(maxY / 5));
                            for (var yv = 0; yv <= maxY; yv += yStep) {
                                var sy = 300 - yv * scaleY;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(yv.toFixed(yStep < 1 ? 1 : 0), 55, sy);
                            }

                            // Plot points
                            for (var n = 0; n < pts.length; n++) {
                                if (pts[n] === null) continue;
                                var px = 60 + (n + 1) * 12;
                                var py = 300 - pts[n] * scaleY;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
                            }

                            // Draw limsup line
                            var limsup = info.R === 0 ? maxY : (info.R === Infinity ? 0 : 1 / info.R);
                            if (limsup < maxY && limsup >= 0) {
                                var lsy = 300 - limsup * scaleY;
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(60, lsy); ctx.lineTo(540, lsy); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.fillText('limsup = ' + limsup.toFixed(2), 400, lsy - 8);
                            }

                            // Title and info
                            viz.screenText(info.name, viz.width / 2, 14, viz.colors.white, 14);
                            viz.screenText('R = ' + (info.R === Infinity ? '∞' : info.R.toString()), viz.width / 2, 34, viz.colors.teal, 13);
                            viz.screenText('|aₙ|^(1/n)', 30, 20, viz.colors.blue, 11, 'left');
                            viz.screenText('n', 545, 310, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the radius of convergence of \\(\\sum_{n=0}^\\infty \\frac{z^n}{2^n}\\).',
                    hint: 'Here \\(a_n = 1/2^n\\). Compute \\(|a_n|^{1/n}\\).',
                    solution: '\\(|a_n|^{1/n} = (1/2^n)^{1/n} = 1/2\\), so \\(\\limsup |a_n|^{1/n} = 1/2\\) and \\(R = 1/(1/2) = 2\\).'
                },
                {
                    question: 'Find the radius of convergence of \\(\\sum_{n=1}^\\infty \\frac{z^n}{n^2}\\).',
                    hint: 'Compute \\((1/n^2)^{1/n} = n^{-2/n} = e^{-2\\ln n / n}\\). What is the limit?',
                    solution: '\\(|a_n|^{1/n} = n^{-2/n} = e^{-2\\ln n / n} \\to e^0 = 1\\) as \\(n \\to \\infty\\). So \\(R = 1/1 = 1\\). (Note: the series actually converges on all of \\(|z| = 1\\) since \\(\\sum 1/n^2\\) converges.)'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Taylor Series
        // ================================================================
        {
            id: 'sec-taylor',
            title: 'Taylor Series',
            content: `
<h2>Taylor Series of Holomorphic Functions</h2>

<div class="env-block intuition">
    <div class="env-title">The Miracle of Complex Differentiability</div>
    <div class="env-body">
        <p>In real analysis, being differentiable once says very little about higher derivatives. In complex analysis, differentiability once implies differentiability infinitely many times, and guarantees a convergent Taylor expansion. This is the single most important theorem in the subject.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.2 (Taylor's Theorem for Holomorphic Functions)</div>
    <div class="env-body">
        <p>Let \\(f\\) be holomorphic in an open set \\(\\Omega\\), and let \\(D(z_0, R) \\subset \\Omega\\) be a disk centered at \\(z_0\\). Then</p>
        \\[
        f(z) = \\sum_{n=0}^{\\infty} a_n (z - z_0)^n \\quad \\text{for all } z \\in D(z_0, R),
        \\]
        <p>where the coefficients are given by</p>
        \\[
        a_n = \\frac{f^{(n)}(z_0)}{n!} = \\frac{1}{2\\pi i} \\oint_{\\gamma} \\frac{f(\\zeta)}{(\\zeta - z_0)^{n+1}} \\, d\\zeta.
        \\]
        <p>The series converges absolutely and uniformly on every closed subdisk \\(\\overline{D}(z_0, r)\\) with \\(r < R\\).</p>
    </div>
</div>

<h3>Proof Idea</h3>

<p>The proof uses Cauchy's integral formula. For \\(z \\in D(z_0, R)\\), take a circle \\(\\gamma\\) of radius \\(r\\) with \\(|z - z_0| < r < R\\). Then</p>
\\[
f(z) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(\\zeta)}{\\zeta - z} \\, d\\zeta.
\\]
<p>The key step is expanding the Cauchy kernel as a geometric series:</p>
\\[
\\frac{1}{\\zeta - z} = \\frac{1}{(\\zeta - z_0) - (z - z_0)} = \\frac{1}{\\zeta - z_0} \\cdot \\frac{1}{1 - \\frac{z-z_0}{\\zeta - z_0}} = \\sum_{n=0}^\\infty \\frac{(z - z_0)^n}{(\\zeta - z_0)^{n+1}}
\\]
<p>which converges because \\(|z - z_0| < |\\zeta - z_0| = r\\). Substituting back and interchanging sum and integral (justified by uniform convergence) gives the result.</p>

<h3>The Radius Equals Distance to Nearest Singularity</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.3</div>
    <div class="env-body">
        <p>The Taylor series of \\(f\\) centered at \\(z_0\\) converges in the largest disk \\(D(z_0, R)\\) contained in the domain of analyticity of \\(f\\). Equivalently, \\(R\\) equals the distance from \\(z_0\\) to the nearest singularity of \\(f\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = 1/(1+z^2)\\)</div>
    <div class="env-body">
        <p>This function is holomorphic except at \\(z = \\pm i\\). Its Taylor series centered at \\(z_0 = 0\\) is</p>
        \\[\\frac{1}{1+z^2} = \\sum_{n=0}^\\infty (-1)^n z^{2n} = 1 - z^2 + z^4 - z^6 + \\cdots\\]
        <p>The radius of convergence is \\(R = 1\\), which is the distance from 0 to \\(\\pm i\\). A real analyst might find this puzzling (the real function \\(1/(1+x^2)\\) is perfectly smooth everywhere on \\(\\mathbb{R}\\)), but in \\(\\mathbb{C}\\) the singularities at \\(\\pm i\\) block convergence past \\(|z| = 1\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-taylor-approximation"></div>
`,
            visualizations: [
                {
                    id: 'viz-taylor-approximation',
                    title: 'Taylor Approximation via Domain Coloring',
                    description: 'Compare the domain coloring of a function \\(f(z)\\) with its Taylor polynomial \\(T_n(z)\\). As \\(n\\) increases, the approximation matches \\(f\\) inside the disk of convergence. Outside, wild colors reveal divergence.',
                    setup: function(body, controls) {
                        // Create two canvases side by side
                        var wrapper = document.createElement('div');
                        wrapper.style.cssText = 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap;';
                        body.appendChild(wrapper);

                        var leftDiv = document.createElement('div');
                        var rightDiv = document.createElement('div');
                        wrapper.appendChild(leftDiv);
                        wrapper.appendChild(rightDiv);

                        var vizL = new VizEngine(leftDiv, { width: 270, height: 270, scale: 40 });
                        var vizR = new VizEngine(rightDiv, { width: 270, height: 270, scale: 40 });

                        var nTerms = 5;
                        var funcType = 'exp';

                        var slider = VizEngine.createSlider(controls, 'Terms n', 1, 20, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'exp(z)', function() { funcType = 'exp'; draw(); });
                        VizEngine.createButton(controls, '1/(1-z)', function() { funcType = 'geo'; draw(); });
                        VizEngine.createButton(controls, 'sin(z)', function() { funcType = 'sin'; draw(); });
                        VizEngine.createButton(controls, 'log(1+z)', function() { funcType = 'log'; draw(); });

                        function factorial(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }

                        function getFunc(type) {
                            if (type === 'exp') return {
                                name: 'exp(z)',
                                R: Infinity,
                                f: function(re, im) {
                                    var er = Math.exp(re);
                                    return [er * Math.cos(im), er * Math.sin(im)];
                                },
                                coeff: function(n) { return 1 / factorial(n); }
                            };
                            if (type === 'geo') return {
                                name: '1/(1-z)',
                                R: 1,
                                f: function(re, im) {
                                    var dr = 1 - re, di = -im;
                                    var d = dr * dr + di * di;
                                    if (d < 1e-10) return [1e6, 0];
                                    return [dr / d, di / d];
                                },
                                coeff: function(n) { return 1; }
                            };
                            if (type === 'sin') return {
                                name: 'sin(z)',
                                R: Infinity,
                                f: function(re, im) {
                                    return [Math.sin(re) * Math.cosh(im), Math.cos(re) * Math.sinh(im)];
                                },
                                coeff: function(n) {
                                    if (n % 2 === 0) return 0;
                                    return Math.pow(-1, (n - 1) / 2) / factorial(n);
                                }
                            };
                            return {
                                name: 'log(1+z)',
                                R: 1,
                                f: function(re, im) {
                                    var u = 1 + re, v = im;
                                    return [0.5 * Math.log(u * u + v * v), Math.atan2(v, u)];
                                },
                                coeff: function(n) {
                                    if (n === 0) return 0;
                                    return Math.pow(-1, n + 1) / n;
                                }
                            };
                        }

                        function complexMul(ar, ai, br, bi) { return [ar * br - ai * bi, ar * bi + ai * br]; }

                        function taylorEval(re, im, coeffFn, N) {
                            var sr = 0, si = 0;
                            var pr = 1, pi = 0; // z^n
                            for (var n = 0; n <= N; n++) {
                                var c = coeffFn(n);
                                sr += c * pr;
                                si += c * pi;
                                var next = complexMul(pr, pi, re, im);
                                pr = next[0]; pi = next[1];
                            }
                            return [sr, si];
                        }

                        function draw() {
                            var info = getFunc(funcType);
                            var range = info.R < 5 ? [-3, 3] : [-5, 5];

                            vizL.drawDomainColoring(info.f, range, range);
                            var ctxL = vizL.ctx;
                            ctxL.fillStyle = '#000000aa';
                            ctxL.fillRect(0, 0, 270, 22);
                            vizL.screenText('f(z) = ' + info.name, 135, 12, vizL.colors.white, 12);

                            vizR.drawDomainColoring(function(re, im) {
                                return taylorEval(re, im, info.coeff, nTerms);
                            }, range, range);
                            var ctxR = vizR.ctx;
                            ctxR.fillStyle = '#000000aa';
                            ctxR.fillRect(0, 0, 270, 22);
                            vizR.screenText('T_' + nTerms + '(z)', 135, 12, vizR.colors.white, 12);

                            // Draw convergence circle on Taylor side if finite R
                            if (info.R < 10) {
                                var cx = 135, cy = 135;
                                var rPx = info.R / (range[1] - range[0]) * 270;
                                ctxR.strokeStyle = '#ffffff66';
                                ctxR.lineWidth = 1.5;
                                ctxR.setLineDash([4, 4]);
                                ctxR.beginPath();
                                ctxR.arc(cx, cy, rPx, 0, Math.PI * 2);
                                ctxR.stroke();
                                ctxR.setLineDash([]);
                            }
                        }

                        draw();
                        return vizR;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the Taylor series of \\(f(z) = \\frac{1}{1-z}\\) centered at \\(z_0 = i\\) and determine its radius of convergence.',
                    hint: 'Write \\(\\frac{1}{1-z} = \\frac{1}{(1-i) - (z-i)}\\) and expand as a geometric series in \\(\\frac{z-i}{1-i}\\).',
                    solution: '\\(\\frac{1}{1-z} = \\frac{1}{1-i} \\cdot \\frac{1}{1 - \\frac{z-i}{1-i}} = \\sum_{n=0}^\\infty \\frac{(z-i)^n}{(1-i)^{n+1}}\\). The radius of convergence is \\(R = |1-i| = \\sqrt{2}\\), which is the distance from \\(z_0 = i\\) to the singularity at \\(z = 1\\).'
                },
                {
                    question: 'Show that the Taylor series of \\(f(z) = \\frac{1}{1+z^2}\\) centered at \\(z_0 = 0\\) has radius of convergence \\(R = 1\\), even though the real function \\(f(x) = 1/(1+x^2)\\) is smooth on all of \\(\\mathbb{R}\\).',
                    hint: 'Where are the singularities of \\(1/(1+z^2)\\) in \\(\\mathbb{C}\\)?',
                    solution: 'The function \\(1/(1+z^2) = 1/((z-i)(z+i))\\) has poles at \\(z = \\pm i\\). The distance from \\(z_0 = 0\\) to the nearest singularity is \\(|i| = 1\\), so \\(R = 1\\) by Theorem 9.3. The real smoothness is irrelevant; the complex singularities at \\(\\pm i\\) are invisible on \\(\\mathbb{R}\\) but limit the radius.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Analytic = Holomorphic
        // ================================================================
        {
            id: 'sec-analytic-holomorphic',
            title: 'Analytic ⇔ Holomorphic',
            content: `
<h2>The Great Equivalence</h2>

<div class="env-block intuition">
    <div class="env-title">Two Roads to the Same Place</div>
    <div class="env-body">
        <p>There are two natural ways to define "nice" complex functions:</p>
        <ul>
            <li><strong>Holomorphic:</strong> the complex derivative \\(f'(z_0) = \\lim_{z \\to z_0} \\frac{f(z) - f(z_0)}{z - z_0}\\) exists at every point.</li>
            <li><strong>Analytic:</strong> \\(f\\) has a convergent power series representation around every point.</li>
        </ul>
        <p>That these are the same is perhaps the most important theorem in complex analysis. Nothing like it holds in the real case.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Analytic Function)</div>
    <div class="env-body">
        <p>A function \\(f: \\Omega \\to \\mathbb{C}\\) is <strong>analytic</strong> (or <strong>complex-analytic</strong>) on \\(\\Omega\\) if for every \\(z_0 \\in \\Omega\\), there exists \\(r > 0\\) and coefficients \\(\\{a_n\\}\\) such that</p>
        \\[f(z) = \\sum_{n=0}^\\infty a_n (z - z_0)^n \\quad \\text{for } |z - z_0| < r.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.4 (Analytic \\(\\Leftrightarrow\\) Holomorphic)</div>
    <div class="env-body">
        <p>Let \\(f: \\Omega \\to \\mathbb{C}\\) where \\(\\Omega\\) is open. The following are equivalent:</p>
        <ol>
            <li>\\(f\\) is holomorphic on \\(\\Omega\\) (complex-differentiable at every point).</li>
            <li>\\(f\\) is analytic on \\(\\Omega\\) (locally representable by convergent power series).</li>
        </ol>
    </div>
</div>

<h3>Proof Outline</h3>

<p><strong>(2) \\(\\Rightarrow\\) (1):</strong> This direction is elementary. A convergent power series can be differentiated term-by-term, so it is holomorphic inside its disk of convergence. Moreover, the derivative is also a power series with the same radius of convergence:</p>
\\[
f(z) = \\sum a_n z^n \\implies f'(z) = \\sum n a_n z^{n-1}.
\\]
<p>By induction, \\(f\\) is infinitely differentiable.</p>

<p><strong>(1) \\(\\Rightarrow\\) (2):</strong> This is the deep direction, and it relies on Cauchy's integral formula (Chapter 6). If \\(f\\) is holomorphic, Cauchy gives</p>
\\[
f^{(n)}(z_0) = \\frac{n!}{2\\pi i} \\oint_\\gamma \\frac{f(\\zeta)}{(\\zeta - z_0)^{n+1}} d\\zeta,
\\]
<p>from which we obtain the Taylor coefficients \\(a_n = f^{(n)}(z_0)/n!\\). The convergence of the resulting series follows from the geometric series expansion of the Cauchy kernel.</p>

<h3>Consequences</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 9.5</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic on \\(\\Omega\\), then:</p>
        <ol>
            <li>\\(f\\) is infinitely differentiable on \\(\\Omega\\).</li>
            <li>All derivatives \\(f', f'', f''', \\ldots\\) are also holomorphic on \\(\\Omega\\).</li>
            <li>\\(f\\) can be integrated term-by-term inside any disk of convergence.</li>
        </ol>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Contrast with Real Analysis</div>
    <div class="env-body">
        <p>In \\(\\mathbb{R}\\), these notions split apart:</p>
        <ul>
            <li>\\(C^1\\) (once differentiable) does not imply \\(C^2\\), let alone \\(C^\\infty\\).</li>
            <li>\\(C^\\infty\\) does not imply analytic (the function \\(e^{-1/x^2}\\) is the standard counterexample).</li>
        </ul>
        <p>In \\(\\mathbb{C}\\), "differentiable once" \\(\\Rightarrow\\) "differentiable infinitely many times" \\(\\Rightarrow\\) "equals its Taylor series." The rigidity of the Cauchy-Riemann equations forces this.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(f\\) be holomorphic on \\(\\mathbb{C}\\) and suppose \\(|f(z)| \\leq M\\) for all \\(z\\). What can you conclude about the Taylor coefficients \\(a_n\\) for \\(n \\geq 1\\)?',
                    hint: 'Use Cauchy\'s inequality: \\(|a_n| \\leq \\frac{M}{R^n}\\) for any \\(R > 0\\). Let \\(R \\to \\infty\\).',
                    solution: 'Cauchy\'s inequality gives \\(|a_n| \\leq M / R^n\\) for every \\(R > 0\\). Letting \\(R \\to \\infty\\) gives \\(a_n = 0\\) for all \\(n \\geq 1\\). Thus \\(f\\) is constant. This is Liouville\'s theorem, proved via the Taylor series.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Manipulation of Power Series
        // ================================================================
        {
            id: 'sec-manipulation',
            title: 'Manipulating Power Series',
            content: `
<h2>Algebra of Power Series</h2>

<div class="env-block intuition">
    <div class="env-title">Power Series as Infinite Polynomials</div>
    <div class="env-body">
        <p>Power series can be added, multiplied, composed, and differentiated using the same rules as polynomials, provided we stay within the disk of convergence. This turns analytic questions into algebraic ones.</p>
    </div>
</div>

<h3>Addition and Scalar Multiplication</h3>

<p>If \\(f(z) = \\sum a_n z^n\\) with radius \\(R_f\\) and \\(g(z) = \\sum b_n z^n\\) with radius \\(R_g\\), then</p>
\\[
f(z) + g(z) = \\sum_{n=0}^\\infty (a_n + b_n) z^n, \\quad R \\geq \\min(R_f, R_g).
\\]

<h3>Cauchy Product (Multiplication)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.6 (Product of Power Series)</div>
    <div class="env-body">
        <p>If \\(f(z) = \\sum a_n z^n\\) and \\(g(z) = \\sum b_n z^n\\) both converge for \\(|z| < R\\), then</p>
        \\[
        f(z) \\cdot g(z) = \\sum_{n=0}^\\infty c_n z^n, \\quad c_n = \\sum_{k=0}^n a_k b_{n-k},
        \\]
        <p>and the product series converges for \\(|z| < R\\). The sequence \\(\\{c_n\\}\\) is the <strong>Cauchy product</strong> (discrete convolution) of \\(\\{a_n\\}\\) and \\(\\{b_n\\}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(e^z \\cdot e^z = e^{2z}\\)</div>
    <div class="env-body">
        <p>With \\(a_n = b_n = 1/n!\\), the Cauchy product gives</p>
        \\[c_n = \\sum_{k=0}^n \\frac{1}{k!} \\cdot \\frac{1}{(n-k)!} = \\frac{1}{n!} \\sum_{k=0}^n \\binom{n}{k} = \\frac{2^n}{n!},\\]
        <p>confirming \\(e^z \\cdot e^z = \\sum \\frac{(2z)^n}{n!} = e^{2z}\\).</p>
    </div>
</div>

<h3>Term-by-Term Differentiation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.7</div>
    <div class="env-body">
        <p>If \\(f(z) = \\sum_{n=0}^\\infty a_n z^n\\) has radius \\(R > 0\\), then \\(f\\) is differentiable on \\(D(0, R)\\) and</p>
        \\[
        f'(z) = \\sum_{n=1}^\\infty n a_n z^{n-1}.
        \\]
        <p>The differentiated series has the same radius of convergence \\(R\\).</p>
    </div>
</div>

<h3>Term-by-Term Integration</h3>

<p>Similarly, for \\(|z| < R\\):</p>
\\[
\\int_0^z f(\\zeta) \\, d\\zeta = \\sum_{n=0}^\\infty \\frac{a_n}{n+1} z^{n+1}.
\\]
<p>The integrated series also has radius \\(R\\).</p>

<h3>Composition</h3>

<p>If \\(f(z) = \\sum a_n z^n\\) and \\(g(z) = \\sum b_n z^n\\) with \\(g(0) = 0\\), then \\(f(g(z))\\) has a power series expansion obtained by substituting and collecting terms. The resulting series converges for \\(|z|\\) small enough that \\(|g(z)| < R_f\\).</p>

<div class="viz-placeholder" data-viz="viz-taylor-exp"></div>
<div class="viz-placeholder" data-viz="viz-taylor-sin"></div>
<div class="viz-placeholder" data-viz="viz-taylor-log"></div>
`,
            visualizations: [
                {
                    id: 'viz-taylor-exp',
                    title: 'Taylor Polynomials of \\(e^z\\)',
                    description: 'Watch the Taylor polynomials of \\(e^z\\) converge everywhere in \\(\\mathbb{C}\\). Since \\(R = \\infty\\), the approximation improves uniformly on any compact set as \\(n\\) increases.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 50 });
                        var nTerms = 5;

                        var slider = VizEngine.createSlider(controls, 'n', 1, 25, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        function factorial(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Plot real exp(x)
                            viz.drawFunction(function(x) { return Math.exp(x); }, -5, 5, viz.colors.white, 2);

                            // Plot Taylor polynomial
                            viz.drawFunction(function(x) {
                                var sum = 0;
                                for (var k = 0; k <= nTerms; k++) {
                                    sum += Math.pow(x, k) / factorial(k);
                                }
                                return sum;
                            }, -5, 5, viz.colors.blue, 2.5);

                            viz.screenText('exp(x) (white) vs T_' + nTerms + '(x) (blue)', viz.width / 2, 18, viz.colors.teal, 13);
                            viz.screenText('R = ∞ : converges everywhere', viz.width / 2, 38, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-taylor-sin',
                    title: 'Taylor Polynomials of \\(\\sin z\\)',
                    description: 'The odd-powered Taylor polynomials of \\(\\sin z\\) approximate the function on progressively larger intervals. Since \\(\\sin z\\) is entire, \\(R = \\infty\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 30, originY: 200 });
                        var nTerms = 3;

                        var slider = VizEngine.createSlider(controls, 'n', 1, 20, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        function factorial(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Plot sin(x)
                            viz.drawFunction(Math.sin, -8, 8, viz.colors.white, 2);

                            // Plot Taylor polynomial
                            viz.drawFunction(function(x) {
                                var sum = 0;
                                for (var k = 0; k <= nTerms; k++) {
                                    var m = 2 * k + 1;
                                    sum += Math.pow(-1, k) * Math.pow(x, m) / factorial(m);
                                }
                                return sum;
                            }, -8, 8, viz.colors.purple, 2.5);

                            viz.screenText('sin(x) (white) vs T_{' + (2 * nTerms + 1) + '}(x) (purple)', viz.width / 2, 18, viz.colors.teal, 13);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-taylor-log',
                    title: 'Taylor Polynomials of \\(\\log(1+z)\\): The \\(R=1\\) Boundary',
                    description: 'The Taylor series \\(\\sum_{n=1}^\\infty (-1)^{n+1} z^n/n\\) converges only for \\(|z| < 1\\). Watch how the polynomial approximation degrades sharply at \\(x = -1\\) (where \\(\\log(1+z)\\) has a singularity).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 300, originY: 250 });
                        var nTerms = 5;

                        var slider = VizEngine.createSlider(controls, 'n', 1, 30, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw R=1 region indicators
                            viz.drawSegment(-1, -4, -1, 4, viz.colors.red + '66', 1, true);
                            viz.drawSegment(1, -4, 1, 4, viz.colors.green + '44', 1, true);

                            // Plot log(1+x)
                            viz.drawFunction(function(x) { return x > -1 ? Math.log(1 + x) : NaN; }, -0.99, 4, viz.colors.white, 2);

                            // Taylor polynomial
                            viz.drawFunction(function(x) {
                                var sum = 0;
                                for (var k = 1; k <= nTerms; k++) {
                                    sum += Math.pow(-1, k + 1) * Math.pow(x, k) / k;
                                }
                                return sum;
                            }, -2, 4, viz.colors.orange, 2.5);

                            viz.screenText('log(1+x) (white) vs T_' + nTerms + '(x) (orange)', viz.width / 2, 18, viz.colors.teal, 13);
                            viz.screenText('R = 1: singularity at z = -1', viz.width / 2, 38, viz.colors.red, 11);

                            // Mark singularity
                            viz.drawPoint(-1, 0, viz.colors.red, 'z = -1', 5);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Cauchy product to find the first four terms of the power series for \\(\\frac{e^z}{1-z}\\) around \\(z = 0\\).',
                    hint: 'Multiply \\(e^z = \\sum z^n / n!\\) by \\(\\frac{1}{1-z} = \\sum z^n\\). The coefficient of \\(z^n\\) is \\(c_n = \\sum_{k=0}^n 1/k!\\).',
                    solution: '\\(c_n = \\sum_{k=0}^n \\frac{1}{k!}\\). So \\(c_0 = 1\\), \\(c_1 = 1 + 1 = 2\\), \\(c_2 = 1 + 1 + 1/2 = 5/2\\), \\(c_3 = 1 + 1 + 1/2 + 1/6 = 8/3\\). The series begins \\(1 + 2z + \\frac{5}{2}z^2 + \\frac{8}{3}z^3 + \\cdots\\) with \\(R = 1\\) (limited by the pole at \\(z = 1\\)).'
                },
                {
                    question: 'Differentiate the geometric series \\(\\frac{1}{1-z} = \\sum_{n=0}^\\infty z^n\\) to find a power series for \\(\\frac{1}{(1-z)^2}\\).',
                    hint: 'Differentiate both sides term by term.',
                    solution: 'Differentiating: \\(\\frac{1}{(1-z)^2} = \\sum_{n=1}^\\infty n z^{n-1} = \\sum_{n=0}^\\infty (n+1) z^n\\) for \\(|z| < 1\\). The radius of convergence remains \\(R = 1\\).'
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
<h2>Zeros: Isolated, Ordered, Finite</h2>

<div class="env-block intuition">
    <div class="env-title">A Striking Rigidity</div>
    <div class="env-body">
        <p>Polynomials of degree \\(n\\) have at most \\(n\\) zeros. Analytic functions share a version of this rigidity: if an analytic function has zeros that "accumulate" (pile up) at a point in its domain, then it must be identically zero. This is the <strong>identity theorem</strong>, and it has far-reaching consequences.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Zero and Its Order)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic near \\(z_0\\) with \\(f(z_0) = 0\\). The <strong>order</strong> (or <strong>multiplicity</strong>) of the zero at \\(z_0\\) is the smallest integer \\(m \\geq 1\\) such that \\(f^{(m)}(z_0) \\neq 0\\). Equivalently, \\(f(z) = (z - z_0)^m g(z)\\) where \\(g\\) is analytic and \\(g(z_0) \\neq 0\\).</p>
    </div>
</div>

<p>In terms of the Taylor series \\(f(z) = \\sum_{n=0}^\\infty a_n (z - z_0)^n\\), the order of the zero is the index of the first nonzero coefficient:</p>
\\[
a_0 = a_1 = \\cdots = a_{m-1} = 0, \\quad a_m \\neq 0.
\\]

<div class="env-block example">
    <div class="env-title">Example: Orders of Zeros</div>
    <div class="env-body">
        <ul>
            <li>\\(\\sin z\\) has a simple zero (order 1) at \\(z = 0\\): \\(\\sin z = z - z^3/6 + \\cdots\\)</li>
            <li>\\(1 - \\cos z\\) has a zero of order 2 at \\(z = 0\\): \\(1 - \\cos z = z^2/2 - z^4/24 + \\cdots\\)</li>
            <li>\\(z^2 \\sin z\\) has a zero of order 3 at \\(z = 0\\).</li>
        </ul>
    </div>
</div>

<h3>The Identity Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 9.8 (Identity Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) and \\(g\\) be analytic on a connected open set \\(\\Omega\\). If \\(f(z_n) = g(z_n)\\) for a sequence \\(\\{z_n\\}\\) with a limit point in \\(\\Omega\\), then \\(f \\equiv g\\) on all of \\(\\Omega\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Corollary 9.9 (Isolation of Zeros)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic and not identically zero on a connected open set \\(\\Omega\\), then the zeros of \\(f\\) are <strong>isolated</strong>: every zero has a neighborhood containing no other zeros.</p>
    </div>
</div>

<p>The proof is immediate: if the zeros had a limit point in \\(\\Omega\\), the identity theorem (applied to \\(f\\) and \\(g \\equiv 0\\)) would force \\(f \\equiv 0\\).</p>

<div class="env-block example">
    <div class="env-title">Example: A Powerful Application</div>
    <div class="env-body">
        <p>Suppose \\(f\\) is entire and \\(f(1/n) = 0\\) for all \\(n \\in \\mathbb{N}\\). Since \\(1/n \\to 0\\) and \\(0 \\in \\mathbb{C}\\), the identity theorem gives \\(f \\equiv 0\\). The values on a single convergent sequence determine the entire function!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-zero-structure"></div>
`,
            visualizations: [
                {
                    id: 'viz-zero-structure',
                    title: 'Zero Structure of Analytic Functions',
                    description: 'Visualize the isolated zeros of \\(\\sin(z)\\) and \\(z^2 \\sin(z)\\) in the complex plane. Each zero is marked with its order. Domain coloring reveals the zero structure through the characteristic color wheel pattern around each zero.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 30 });
                        var funcType = 'sin';

                        VizEngine.createButton(controls, 'sin(z)', function() { funcType = 'sin'; draw(); });
                        VizEngine.createButton(controls, 'z² sin(z)', function() { funcType = 'z2sin'; draw(); });
                        VizEngine.createButton(controls, 'z³ - 1', function() { funcType = 'z3m1'; draw(); });
                        VizEngine.createButton(controls, 'sin(πz)', function() { funcType = 'sinpi'; draw(); });

                        function draw() {
                            var range = [-6, 6];
                            var ctx = viz.ctx;

                            if (funcType === 'sin') {
                                viz.drawDomainColoring(function(re, im) {
                                    // sin(z) = sin(re)cosh(im) + i cos(re)sinh(im)
                                    return [Math.sin(re) * Math.cosh(im), Math.cos(re) * Math.sinh(im)];
                                }, range, range);
                                // Mark zeros at nπ
                                for (var n = -1; n <= 1; n++) {
                                    var zx = n * Math.PI;
                                    var sx = viz.originX + zx * viz.scale;
                                    var sy = viz.originY;
                                    ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2); ctx.stroke();
                                    ctx.fillStyle = '#ffffffcc'; ctx.font = 'bold 10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                    ctx.fillText('m=1', sx, sy - 10);
                                }
                                viz.screenText('sin(z): simple zeros at z = nπ', viz.width / 2, 18, '#ffffffcc', 13);
                            } else if (funcType === 'z2sin') {
                                viz.drawDomainColoring(function(re, im) {
                                    var sr = Math.sin(re) * Math.cosh(im), si = Math.cos(re) * Math.sinh(im);
                                    var zr = re * re - im * im, zi = 2 * re * im;
                                    return [zr * sr - zi * si, zr * si + zi * sr];
                                }, range, range);
                                // zero at 0 with order 3
                                var sx0 = viz.originX, sy0 = viz.originY;
                                ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(sx0, sy0, 10, 0, Math.PI * 2); ctx.stroke();
                                ctx.fillStyle = '#ffffffcc'; ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                ctx.fillText('m=3', sx0, sy0 - 12);
                                for (var n = -1; n <= 1; n++) {
                                    if (n === 0) continue;
                                    var zx2 = n * Math.PI;
                                    var sx2 = viz.originX + zx2 * viz.scale;
                                    ctx.beginPath(); ctx.arc(sx2, sy0, 8, 0, Math.PI * 2); ctx.stroke();
                                    ctx.fillText('m=1', sx2, sy0 - 10);
                                }
                                viz.screenText('z² sin(z): order-3 zero at origin', viz.width / 2, 18, '#ffffffcc', 13);
                            } else if (funcType === 'z3m1') {
                                viz.drawDomainColoring(function(re, im) {
                                    var r2 = re * re - im * im, i2 = 2 * re * im;
                                    var r3 = r2 * re - i2 * im, i3 = r2 * im + i2 * re;
                                    return [r3 - 1, i3];
                                }, range, range);
                                // zeros at cube roots of unity
                                var roots = [[1, 0], [-0.5, Math.sqrt(3)/2], [-0.5, -Math.sqrt(3)/2]];
                                for (var k = 0; k < 3; k++) {
                                    var sxr = viz.originX + roots[k][0] * viz.scale;
                                    var syr = viz.originY - roots[k][1] * viz.scale;
                                    ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.arc(sxr, syr, 8, 0, Math.PI * 2); ctx.stroke();
                                    ctx.fillStyle = '#ffffffcc'; ctx.font = 'bold 10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                    ctx.fillText('m=1', sxr, syr - 10);
                                }
                                viz.screenText('z³ - 1: three simple zeros (cube roots of unity)', viz.width / 2, 18, '#ffffffcc', 13);
                            } else {
                                viz.drawDomainColoring(function(re, im) {
                                    var pre = Math.PI * re, pim = Math.PI * im;
                                    return [Math.sin(pre) * Math.cosh(pim), Math.cos(pre) * Math.sinh(pim)];
                                }, range, range);
                                for (var n2 = -2; n2 <= 2; n2++) {
                                    var sx3 = viz.originX + n2 * viz.scale;
                                    var sy3 = viz.originY;
                                    ctx.strokeStyle = '#ffffffcc'; ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.arc(sx3, sy3, 8, 0, Math.PI * 2); ctx.stroke();
                                    ctx.fillStyle = '#ffffffcc'; ctx.font = 'bold 10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                    ctx.fillText('m=1', sx3, sy3 - 10);
                                }
                                viz.screenText('sin(πz): simple zeros at every integer', viz.width / 2, 18, '#ffffffcc', 13);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the order of the zero of \\(f(z) = z^2(e^z - 1)\\) at \\(z = 0\\)?',
                    hint: 'Expand \\(e^z - 1 = z + z^2/2 + \\cdots\\), then multiply by \\(z^2\\).',
                    solution: '\\(e^z - 1 = z + z^2/2 + z^3/6 + \\cdots\\), so \\(z^2(e^z - 1) = z^3 + z^4/2 + \\cdots\\). The first nonzero term is \\(z^3\\), so the zero has order 3.'
                },
                {
                    question: 'Let \\(f\\) be entire with \\(f(n) = 0\\) for all \\(n \\in \\mathbb{Z}\\). Must \\(f \\equiv 0\\)?',
                    hint: 'The integers have limit points, but where? Consider whether any limit point of \\(\\mathbb{Z}\\) lies in \\(\\mathbb{C}\\).',
                    solution: 'No. The integers \\(\\mathbb{Z}\\) have no finite limit point (they escape to infinity), so the identity theorem does not apply. The function \\(f(z) = \\sin(\\pi z)\\) is entire, vanishes on \\(\\mathbb{Z}\\), but is not identically zero.'
                },
                {
                    question: 'Prove that if \\(f\\) and \\(g\\) are entire functions satisfying \\(f(z)^2 + g(z)^2 = 1\\) for all \\(z\\), then \\(f\\) and \\(g\\) are constant.',
                    hint: 'Factor: \\((f + ig)(f - ig) = 1\\). What does this say about the range of the entire functions \\(f \\pm ig\\)?',
                    solution: 'Write \\(h(z) = f(z) + ig(z)\\). Then \\(h(z) \\cdot \\overline{h(\\bar{z})} = f(z)^2 + g(z)^2 = 1\\) shows \\(h\\) is entire and never zero, so \\(1/h\\) is also entire. Since \\(h \\cdot (1/h) = 1\\), both \\(h\\) and \\(1/h\\) are entire. If \\(h\\) is unbounded, \\(1/h \\to 0\\) at infinity, contradicting \\(1/h\\) being entire and nonvanishing. By Liouville, \\(h\\) (and \\(1/h\\)) are bounded entire functions, hence constant. So \\(f\\) and \\(g\\) are constant.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Laurent Series
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: Beyond the Disk',
            content: `
<h2>What Happens at the Boundary?</h2>

<div class="env-block intuition">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>A Taylor series captures the behavior of \\(f\\) inside a disk. But what about functions with singularities inside the region of interest? If \\(f\\) has a pole at \\(z_0\\), no Taylor series centered at \\(z_0\\) can represent it. We need a generalization that allows <em>negative</em> powers of \\((z - z_0)\\). This is the <strong>Laurent series</strong> of Chapter 10.</p>
    </div>
</div>

<h3>A Preview of Laurent Series</h3>

<p>Consider \\(f(z) = 1/z\\), which has a pole at the origin. No Taylor series at \\(z_0 = 0\\) works, but we can write</p>
\\[
f(z) = z^{-1} = \\sum_{n=-1}^{-1} a_n z^n \\quad (a_{-1} = 1).
\\]
<p>More generally, a <strong>Laurent series</strong> takes the form</p>
\\[
f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n = \\cdots + \\frac{a_{-2}}{(z-z_0)^2} + \\frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \\cdots
\\]
<p>and converges in an <strong>annulus</strong> \\(r < |z - z_0| < R\\).</p>

<h3>Classification of Singularities</h3>

<p>The nature of the Laurent series at an isolated singularity \\(z_0\\) classifies it:</p>
<ul>
    <li><strong>Removable singularity:</strong> no negative powers (\\(a_n = 0\\) for all \\(n < 0\\)).</li>
    <li><strong>Pole of order \\(m\\):</strong> finitely many negative powers (\\(a_{-m} \\neq 0\\), \\(a_n = 0\\) for \\(n < -m\\)).</li>
    <li><strong>Essential singularity:</strong> infinitely many negative powers.</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example: Types of Singularities</div>
    <div class="env-body">
        <ul>
            <li>\\(\\frac{\\sin z}{z} = 1 - \\frac{z^2}{6} + \\cdots\\) has a removable singularity at \\(z = 0\\).</li>
            <li>\\(\\frac{1}{z^2}\\) has a pole of order 2 at \\(z = 0\\).</li>
            <li>\\(e^{1/z} = 1 + \\frac{1}{z} + \\frac{1}{2z^2} + \\cdots\\) has an essential singularity at \\(z = 0\\).</li>
        </ul>
    </div>
</div>

<h3>The Residue: A Sneak Peek</h3>

<p>The coefficient \\(a_{-1}\\) in the Laurent expansion has a special name: the <strong>residue</strong> of \\(f\\) at \\(z_0\\), written \\(\\operatorname{Res}_{z=z_0} f(z)\\). It controls the value of contour integrals via the residue theorem (Chapter 11):</p>
\\[
\\oint_\\gamma f(z) \\, dz = 2\\pi i \\sum_{k} \\operatorname{Res}_{z=z_k} f(z).
\\]
<p>This single formula is the most powerful computational tool in all of analysis, connecting local behavior (residues) to global computation (integrals).</p>

<h3>Summary: What We Proved</h3>

<div class="env-block theorem">
    <div class="env-title">Chapter 9 Summary</div>
    <div class="env-body">
        <ol>
            <li>Every power series converges in a disk of radius \\(R = 1/\\limsup |a_n|^{1/n}\\) (Hadamard).</li>
            <li>Every holomorphic function equals its Taylor series in the largest singularity-free disk (Taylor's theorem).</li>
            <li><strong>Analytic \\(\\Leftrightarrow\\) Holomorphic</strong>: the two definitions of "nice complex function" are equivalent.</li>
            <li>Power series can be added, multiplied, composed, differentiated, and integrated term by term within their disk of convergence.</li>
            <li>Zeros of analytic functions are isolated and have finite order (identity theorem).</li>
        </ol>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Find the first three nonzero terms of the Laurent series of \\(f(z) = \\frac{e^z}{z^3}\\) around \\(z = 0\\). What type of singularity does \\(f\\) have at the origin?',
                    hint: 'Write \\(e^z = 1 + z + z^2/2 + z^3/6 + \\cdots\\) and divide each term by \\(z^3\\).',
                    solution: '\\(\\frac{e^z}{z^3} = \\frac{1}{z^3} + \\frac{1}{z^2} + \\frac{1}{2z} + \\frac{1}{6} + \\cdots\\). The first nonzero term is \\(z^{-3}\\), so this is a <strong>pole of order 3</strong>. The residue is \\(a_{-1} = 1/2\\).'
                },
                {
                    question: 'Determine the radius of convergence of the Taylor series of \\(f(z) = \\frac{z}{\\sin z}\\) centered at \\(z = 0\\).',
                    hint: 'Where are the singularities of \\(z / \\sin z\\)? Is \\(z = 0\\) actually a singularity?',
                    solution: 'At \\(z = 0\\), \\(\\sin z\\) has a simple zero, so \\(z/\\sin z \\to 1\\) as \\(z \\to 0\\); the singularity is removable. The nearest genuine singularity is at \\(z = \\pm \\pi\\) (where \\(\\sin z = 0\\) but \\(z \\neq 0\\)). Therefore \\(R = \\pi\\).'
                }
            ]
        }
    ]
});
