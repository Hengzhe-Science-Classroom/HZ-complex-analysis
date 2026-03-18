window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Consequences of Cauchy\'s Formula',
    subtitle: 'Liouville, Morera, and the rigidity of analytic functions',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Motivation</h2>

<div class="env-block intuition">
    <div class="env-title">What Cauchy's Formula Really Tells Us</div>
    <div class="env-body">
        <p>Cauchy's integral formula says: if \\(f\\) is analytic inside and on a simple closed contour \\(C\\), then for any \\(z_0\\) inside \\(C\\),</p>
        \\[
        f(z_0) = \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z - z_0} \\, dz.
        \\]
        <p>This is extraordinary. The value of \\(f\\) at an interior point is <em>completely determined</em> by its values on the boundary. There is no freedom: knowing \\(f\\) on \\(C\\) pins down \\(f\\) everywhere inside.</p>
        <p>This chapter harvests the consequences of that rigidity. We prove that bounded entire functions must be constant (Liouville), that every polynomial has a root in \\(\\mathbb{C}\\) (the Fundamental Theorem of Algebra), that the converse of Cauchy's theorem holds (Morera), and that the zeros of an analytic function cannot accumulate (the Identity Theorem). Each result is a facet of the same underlying rigidity.</p>
    </div>
</div>

<p>In real analysis, you can write down a smooth function that is bounded, non-constant, and defined on all of \\(\\mathbb{R}\\). For instance, \\(\\sin(x)\\) or \\(e^{-x^2}\\). Nothing prevents this. In complex analysis, the analogous statement is <em>false</em>: a bounded entire function must be constant. This is Liouville's theorem, and it is the first dramatic sign that analyticity is an extraordinarily rigid condition.</p>

<p>The word <strong>rigid</strong> appears throughout this chapter. It means: analytic functions have far less freedom than you might expect. Once you fix an analytic function on any open set, or even on any sequence of points with a limit point, the function is determined everywhere in its domain of analyticity. This is the content of the Identity Theorem.</p>

<h3>A Map of This Chapter</h3>

<ul>
    <li><strong>Liouville's Theorem</strong>: Bounded + entire implies constant. The proof uses Cauchy's estimate on the derivative.</li>
    <li><strong>Fundamental Theorem of Algebra</strong>: Every non-constant polynomial has a root in \\(\\mathbb{C}\\). This follows from Liouville by contradiction.</li>
    <li><strong>Morera's Theorem</strong>: The converse of Cauchy's theorem. If \\(\\oint_T f = 0\\) for every triangle \\(T\\) in a domain, then \\(f\\) is analytic.</li>
    <li><strong>Schwarz Lemma</strong>: An analytic map of the unit disk fixing the origin satisfies \\(|f(z)| \\le |z|\\) and \\(|f'(0)| \\le 1\\).</li>
    <li><strong>Identity Theorem</strong>: If two analytic functions agree on a set with a limit point, they are identical on their common domain.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Joseph Liouville stated his theorem in 1844, though Cauchy had the tools to prove it earlier. The Fundamental Theorem of Algebra was first proved rigorously by Gauss in his 1799 doctoral dissertation (using topological arguments); the short proof via Liouville's theorem came later and is now the standard textbook proof. Elwin Bruno Christoffel and Hermann Amandus Schwarz developed the Schwarz lemma in the 1860s–1870s in the context of conformal mapping.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Liouville's Theorem
        // ================================================================
        {
            id: 'sec-liouville',
            title: "Liouville's Theorem",
            content: `
<h2>Liouville's Theorem</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem (Liouville, 1844)</div>
    <div class="env-body">
        <p>If \\(f\\) is entire (analytic on all of \\(\\mathbb{C}\\)) and bounded (there exists \\(M < \\infty\\) such that \\(|f(z)| \\le M\\) for all \\(z \\in \\mathbb{C}\\)), then \\(f\\) is constant.</p>
    </div>
</div>

<h3>Proof via Cauchy's Estimate</h3>

<p>The key tool is <strong>Cauchy's estimate for derivatives</strong>. If \\(f\\) is analytic inside and on the circle \\(|z - z_0| = R\\), and \\(|f(z)| \\le M\\) on that circle, then Cauchy's integral formula for \\(f'\\) gives</p>

\\[
f'(z_0) = \\frac{1}{2\\pi i} \\oint_{|z-z_0|=R} \\frac{f(z)}{(z - z_0)^2} \\, dz.
\\]

<p>Taking absolute values and using the ML-inequality (length \\(= 2\\pi R\\), integrand \\(\\le M/R^2\\)):</p>

\\[
|f'(z_0)| \\le \\frac{1}{2\\pi} \\cdot \\frac{M}{R^2} \\cdot 2\\pi R = \\frac{M}{R}.
\\]

<p>Now apply this to Liouville's hypothesis. Since \\(f\\) is entire, this estimate holds for <em>every</em> \\(R > 0\\). Letting \\(R \\to \\infty\\):</p>

\\[
|f'(z_0)| \\le \\frac{M}{R} \\to 0.
\\]

<p>Therefore \\(f'(z_0) = 0\\). Since \\(z_0\\) was arbitrary, \\(f' \\equiv 0\\) on \\(\\mathbb{C}\\). A function with identically zero derivative on a connected open set is constant. \\(\\square\\)</p>

<div class="env-block remark">
    <div class="env-title">What Makes the Proof Work</div>
    <div class="env-body">
        <p>The crucial step is that we can take \\(R \\to \\infty\\) because \\(f\\) is entire: there is no obstruction, no singularity, no boundary. The circle of radius \\(R\\) is always available. In real analysis, the analogous estimate on \\(f'\\) requires evaluating \\(f\\) far away, but boundedness and smoothness alone do not force \\(f' = 0\\).</p>
        <p>The same argument gives a more general statement: if \\(f\\) is entire and \\(|f(z)| \\le C(1 + |z|^n)\\) for some \\(n \\ge 0\\), then \\(f\\) is a polynomial of degree at most \\(n\\).</p>
    </div>
</div>

<h3>Cauchy's Estimate (General)</h3>

<p>More generally, differentiating Cauchy's formula \\(n\\) times gives</p>

\\[
f^{(n)}(z_0) = \\frac{n!}{2\\pi i} \\oint_{|z - z_0| = R} \\frac{f(z)}{(z - z_0)^{n+1}} \\, dz,
\\]

and the ML-inequality yields</p>

\\[
\\boxed{|f^{(n)}(z_0)| \\le \\frac{n! \\, M_R}{R^n}}
\\]

<p>where \\(M_R = \\max_{|z-z_0|=R} |f(z)|\\). This estimate is called <strong>Cauchy's inequality</strong> or <strong>Cauchy's estimate</strong>.</p>
`,
            visualizations: [
                {
                    id: 'viz-liouville-demo',
                    title: 'The Liouville Impossibility',
                    description: 'Try to construct a bounded, non-constant entire function. Whatever you attempt, the Cauchy estimate forces the derivative to zero as the circle radius grows. Use the sliders to explore.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 580, height: 400, scale: 60, originX: 290, originY: 200 });

                        var R = 2.0;
                        var fnIdx = 0;
                        var fns = [
                            { name: 'sin(z) (unbounded on C)', f: function(re, im) {
                                // sin(z) = sin(x)cosh(y) + i cos(x)sinh(y)
                                return [Math.sin(re) * Math.cosh(im), Math.cos(re) * Math.sinh(im)];
                            }, bounded: false },
                            { name: 'e^z (unbounded)', f: function(re, im) {
                                var r = Math.exp(re);
                                return [r * Math.cos(im), r * Math.sin(im)];
                            }, bounded: false },
                            { name: 'z^2 (unbounded)', f: function(re, im) {
                                return [re*re - im*im, 2*re*im];
                            }, bounded: false },
                            { name: '1/(1+z^2) (has poles)', f: function(re, im) {
                                var dre = 1 + re*re - im*im, dim = 2*re*im;
                                var d2 = dre*dre + dim*dim;
                                if (d2 < 1e-10) return [0, 0];
                                return [dre/d2, -dim/d2];
                            }, bounded: false }
                        ];

                        var selectEl = document.createElement('select');
                        selectEl.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 8px;font-size:0.78rem;margin-right:8px;';
                        fns.forEach(function(fn, i) {
                            var opt = document.createElement('option');
                            opt.value = i; opt.textContent = fn.name;
                            selectEl.appendChild(opt);
                        });
                        selectEl.addEventListener('change', function() { fnIdx = parseInt(selectEl.value); draw(); });
                        controls.appendChild(selectEl);

                        VizEngine.createSlider(controls, 'Radius R', 0.2, 5.0, R, 0.1, function(v) { R = v; draw(); });

                        function maxOnCircle(fn, cx, cy, r, nPts) {
                            var m = 0;
                            for (var k = 0; k < nPts; k++) {
                                var th = 2 * Math.PI * k / nPts;
                                var zre = cx + r * Math.cos(th), zim = cy + r * Math.sin(th);
                                var fw = fn.f(zre, zim);
                                m = Math.max(m, Math.sqrt(fw[0]*fw[0] + fw[1]*fw[1]));
                            }
                            return m;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var fn = fns[fnIdx];
                            var z0re = 0, z0im = 0;
                            var M_R = maxOnCircle(fn, z0re, z0im, R, 200);
                            var cauchy_bound = M_R / R;

                            // Draw the circle
                            viz.drawCircle(z0re, z0im, R, null, viz.colors.blue, 2);
                            viz.drawPoint(z0re, z0im, viz.colors.orange, 'z\u2080', 5);

                            // Show max |f| on circle as dots
                            var ctx = viz.ctx;
                            for (var k = 0; k < 120; k++) {
                                var th = 2 * Math.PI * k / 120;
                                var zre = z0re + R * Math.cos(th), zim = z0im + R * Math.sin(th);
                                var fw = fn.f(zre, zim);
                                var mag = Math.sqrt(fw[0]*fw[0] + fw[1]*fw[1]);
                                var brightness = Math.min(1, mag / (M_R + 0.01));
                                var sc = viz.toScreen(zre, zim);
                                ctx.fillStyle = 'rgba(' + Math.round(88*brightness) + ',' + Math.round(166*brightness) + ',' + Math.round(255*brightness) + ',0.7)';
                                ctx.beginPath(); ctx.arc(sc[0], sc[1], 3, 0, Math.PI*2); ctx.fill();
                            }

                            // Info panel
                            var px = 14, py = 14;
                            ctx.fillStyle = '#0c0c2099'; ctx.fillRect(px-4, py-4, 300, 90);
                            viz.screenText('f(z) = ' + fn.name, px + 148, py + 8, viz.colors.white, 12, 'center');
                            viz.screenText('R = ' + R.toFixed(2), px + 148, py + 26, viz.colors.teal, 12, 'center');
                            viz.screenText('M\u1D3F = max|f| on circle = ' + M_R.toFixed(3), px + 148, py + 44, viz.colors.yellow, 12, 'center');
                            viz.screenText("|f'(0)| \u2264 M\u1D3F/R = " + cauchy_bound.toFixed(3), px + 148, py + 62, viz.colors.orange, 12, 'center');

                            var msg = fn.bounded ? 'Bounded entire \u21D2 constant (Liouville!)' : 'M\u1D3F grows with R \u21D2 not bounded entire';
                            viz.screenText(msg, viz.width/2, viz.height - 16, fn.bounded ? viz.colors.green : viz.colors.red, 12, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Cauchy\'s estimate to show: if \\(f\\) is entire and \\(|f(z)| \\le A|z| + B\\) for all \\(z\\), then \\(f\\) is a polynomial of degree at most 1 (i.e., \\(f(z) = az + b\\)).',
                    hint: 'Apply Cauchy\'s estimate to \\(f\'\'(z_0)\\) with a circle of radius \\(R\\), estimate the maximum of \\(|f|\\) on that circle using the given bound, then let \\(R \\to \\infty\\).',
                    solution: 'On the circle \\(|z - z_0| = R\\), any point \\(z\\) satisfies \\(|z| \\le |z_0| + R\\), so \\(|f(z)| \\le A(|z_0|+R)+B\\). Cauchy\'s estimate gives \\(|f\'\'(z_0)| \\le 2!(A(|z_0|+R)+B)/R^2 \\to 0\\) as \\(R \\to \\infty\\). Hence \\(f\'\' \\equiv 0\\), meaning \\(f(z) = az + b\\).'
                },
                {
                    question: 'Show that every analytic function satisfying \\(|f(z)| \\ge 1\\) for all \\(z \\in \\mathbb{C}\\) must be constant.',
                    hint: 'Consider \\(g = 1/f\\). What can you say about \\(g\\)?',
                    solution: 'Since \\(|f(z)| \\ge 1 > 0\\), \\(f\\) has no zeros, so \\(g = 1/f\\) is entire. Moreover \\(|g(z)| = 1/|f(z)| \\le 1\\), so \\(g\\) is bounded and entire. By Liouville, \\(g\\) is constant, hence so is \\(f = 1/g\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Fundamental Theorem of Algebra
        // ================================================================
        {
            id: 'sec-fta',
            title: 'Fundamental Theorem of Algebra',
            content: `
<h2>Fundamental Theorem of Algebra</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem (Fundamental Theorem of Algebra)</div>
    <div class="env-body">
        <p>Every non-constant polynomial \\(p(z) = a_n z^n + \\cdots + a_0\\) with \\(a_n \\ne 0\\), \\(n \\ge 1\\), and coefficients in \\(\\mathbb{C}\\) has at least one root in \\(\\mathbb{C}\\).</p>
    </div>
</div>

<h3>Proof via Liouville's Theorem</h3>

<p>Suppose for contradiction that \\(p(z) \\ne 0\\) for all \\(z \\in \\mathbb{C}\\). Then \\(f(z) = 1/p(z)\\) is entire (no poles anywhere).</p>

<p><strong>Step 1: \\(f\\) is bounded.</strong> Since \\(|p(z)| \\to \\infty\\) as \\(|z| \\to \\infty\\) (the leading term \\(a_n z^n\\) dominates), there exists \\(R > 0\\) such that \\(|p(z)| \\ge 1\\) for all \\(|z| \\ge R\\). Hence \\(|f(z)| \\le 1\\) outside the disk \\(|z| \\le R\\). On the compact disk \\(\\{|z| \\le R\\}\\), \\(f\\) is continuous and therefore bounded. So \\(f\\) is bounded on all of \\(\\mathbb{C}\\).</p>

<p><strong>Step 2: Apply Liouville.</strong> \\(f\\) is bounded and entire, hence constant. But \\(1/p(z) = \\text{const}\\) implies \\(p(z) = \\text{const}\\), contradicting the assumption that \\(p\\) is non-constant. \\(\\square\\)</p>

<h3>The Full Factorization</h3>

<p>Applying the theorem repeatedly (factoring out \\(z - z_1\\) and repeating on the quotient):</p>

<div class="env-block corollary">
    <div class="env-title">Corollary</div>
    <div class="env-body">
        <p>Every degree-\\(n\\) polynomial over \\(\\mathbb{C}\\) factors as</p>
        \\[
        p(z) = a_n(z - z_1)(z - z_2)\\cdots(z - z_n)
        \\]
        <p>for some \\(z_1, \\ldots, z_n \\in \\mathbb{C}\\) (not necessarily distinct). In particular, \\(p\\) has exactly \\(n\\) roots counted with multiplicity.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why \\(\\mathbb{R}\\) is Not Enough</div>
    <div class="env-body">
        <p>The theorem fails over \\(\\mathbb{R}\\): \\(z^2 + 1\\) has no real roots. Over \\(\\mathbb{C}\\), it factors as \\((z-i)(z+i)\\). The complex numbers are <em>algebraically closed</em>: every non-constant polynomial over \\(\\mathbb{C}\\) splits completely into linear factors over \\(\\mathbb{C}\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-fta-zeros',
                    title: 'Polynomial Zeros via Domain Coloring',
                    description: 'Domain coloring of a degree-n polynomial. Zeros appear as points where all colors meet (phase winds through 360°). Adjust the degree and coefficients to see n zeros appear.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 55, originX: 280, originY: 210 });

                        var degree = 3;
                        var coeffRe = [1, 0, -1, 0]; // p(z) = z^3 - z
                        var coeffIm = [0, 0, 0, 0];

                        VizEngine.createSlider(controls, 'Degree n', 1, 5, degree, 1, function(v) {
                            degree = Math.round(v);
                            while (coeffRe.length <= degree) { coeffRe.push(0); coeffIm.push(0); }
                            draw();
                        });
                        VizEngine.createSlider(controls, 'a\u2081 (Re)', -2, 2, coeffRe[1] || 0, 0.1, function(v) {
                            if (coeffRe.length > 1) coeffRe[1] = v; draw();
                        });
                        VizEngine.createSlider(controls, 'a\u2080 (Re)', -2, 2, coeffRe[0] || 0, 0.1, function(v) {
                            coeffRe[0] = v; draw();
                        });

                        function polyEval(re, im) {
                            // Horner's method: p(z) = a_n z^n + ... + a_0
                            // coeffRe[n] = a_n (leading), coeffRe[0] = a_0 (constant)
                            var n = degree;
                            var rre = coeffRe[n] || 0, rim = coeffIm[n] || 0;
                            for (var k = n - 1; k >= 0; k--) {
                                // multiply by z = (re, im)
                                var newRe = rre * re - rim * im + (coeffRe[k] || 0);
                                var newIm = rre * im + rim * re + (coeffIm[k] || 0);
                                rre = newRe; rim = newIm;
                            }
                            return [rre, rim];
                        }

                        // Default coefficients by degree
                        function resetCoeffs() {
                            var defaults = {
                                1: [0, 1],
                                2: [-1, 0, 1],
                                3: [0, -1, 0, 1],
                                4: [1, 0, -2, 0, 1],
                                5: [0, 2, 0, -3, 0, 1]
                            };
                            var d = defaults[degree] || [0, 1];
                            coeffRe = d.slice(); coeffIm = d.map(function() { return 0; });
                        }

                        function draw() {
                            viz.clear();
                            var xRange = [-viz.originX / viz.scale, (viz.width - viz.originX) / viz.scale];
                            var yRange = [-(viz.height - viz.originY) / viz.scale, viz.originY / viz.scale];
                            viz.drawDomainColoring(polyEval, xRange, yRange);
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('p(z): degree ' + degree + ' polynomial (domain coloring)', viz.width/2, 14, viz.colors.white, 13, 'center');
                            viz.screenText('Zeros: phase vortices (all colors meet)', viz.width/2, viz.height - 12, viz.colors.yellow, 11, 'center');
                        }

                        resetCoeffs(); draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Factor \\(p(z) = z^4 - 1\\) completely over \\(\\mathbb{C}\\). What are the four roots?',
                    hint: 'The roots of \\(z^4 = 1\\) are the fourth roots of unity: \\(e^{2\\pi i k/4}\\) for \\(k = 0,1,2,3\\).',
                    solution: '\\(z^4 - 1 = (z^2-1)(z^2+1) = (z-1)(z+1)(z-i)(z+i)\\). The four roots are \\(1, -1, i, -i\\), equally spaced on the unit circle at angles \\(0, \\pi, \\pi/2, 3\\pi/2\\).'
                },
                {
                    question: 'Why does the Fundamental Theorem of Algebra not apply to the function \\(e^z - 1\\)?',
                    hint: 'Is \\(e^z - 1\\) a polynomial?',
                    solution: '\\(e^z - 1\\) is not a polynomial; it is a transcendental entire function. The FTA applies only to polynomials. In fact, \\(e^z - 1\\) has infinitely many zeros (at \\(z = 2\\pi i k\\) for \\(k \\in \\mathbb{Z}\\)), which could not happen for a polynomial.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Morera's Theorem
        // ================================================================
        {
            id: 'sec-morera',
            title: "Morera's Theorem",
            content: `
<h2>Morera's Theorem</h2>

<p>Cauchy's theorem states: if \\(f\\) is analytic on a domain \\(D\\), then \\(\\oint_C f = 0\\) for every closed contour \\(C\\) in \\(D\\). Morera's theorem is the converse: if the integral around every triangle is zero, then \\(f\\) is analytic.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem (Morera, 1886)</div>
    <div class="env-body">
        <p>Let \\(f\\) be continuous on a domain \\(D \\subseteq \\mathbb{C}\\). If</p>
        \\[
        \\oint_T f(z) \\, dz = 0
        \\]
        <p>for every closed triangle \\(T\\) lying in \\(D\\), then \\(f\\) is analytic on \\(D\\).</p>
    </div>
</div>

<h3>Proof</h3>

<p>Fix a basepoint \\(z_0 \\in D\\). Define</p>
\\[
F(z) = \\int_{z_0}^{z} f(w) \\, dw,
\\]
<p>where the integral is along any path from \\(z_0\\) to \\(z\\) in \\(D\\). The hypothesis \\(\\oint_T f = 0\\) guarantees that \\(F\\) is well-defined (path-independent): any two paths from \\(z_0\\) to \\(z\\) form a closed contour built from triangles, over which \\(f\\) integrates to zero.</p>

<p>Now we show \\(F' = f\\). For small \\(h\\),</p>
\\[
\\frac{F(z+h) - F(z)}{h} = \\frac{1}{h}\\int_z^{z+h} f(w)\\,dw.
\\]
<p>Since \\(f\\) is continuous, \\(|f(w) - f(z)| < \\varepsilon\\) for \\(|w - z|\\) small. Then</p>
\\[
\\left|\\frac{F(z+h)-F(z)}{h} - f(z)\\right| = \\left|\\frac{1}{h}\\int_z^{z+h}(f(w)-f(z))\\,dw\\right| \\le \\varepsilon.
\\]
<p>So \\(F'(z) = f(z)\\). Since \\(F\\) has a complex derivative everywhere in \\(D\\), \\(F\\) is analytic. But analytic functions have analytic derivatives (a consequence of Cauchy's formula), so \\(f = F'\\) is analytic. \\(\\square\\)</p>

<div class="env-block intuition">
    <div class="env-title">Why Triangles Are Sufficient</div>
    <div class="env-body">
        <p>Any closed polygon can be triangulated, so vanishing integrals over all triangles imply vanishing integrals over all polygons. More generally, any closed contour can be approximated by polygons, so vanishing over triangles is equivalent to vanishing over all closed contours in the domain. Triangles are the simplest "test shapes."</p>
    </div>
</div>

<h3>Application: Uniform Limits of Analytic Functions</h3>

<div class="env-block corollary">
    <div class="env-title">Corollary</div>
    <div class="env-body">
        <p>If \\(f_n\\) are analytic on \\(D\\) and \\(f_n \\to f\\) uniformly on compact subsets of \\(D\\), then \\(f\\) is analytic on \\(D\\).</p>
    </div>
</div>

<p><em>Proof sketch.</em> For each triangle \\(T \\subset D\\): \\(\\oint_T f = \\lim_{n\\to\\infty} \\oint_T f_n = 0\\) (uniform convergence justifies swapping limit and integral). By Morera, \\(f\\) is analytic. \\(\\square\\)</p>

<p>This is in stark contrast to real analysis, where the uniform limit of differentiable functions need not be differentiable (think of Weierstrass-type examples). In the complex setting, the uniform limit of analytic functions is automatically analytic.</p>
`,
            visualizations: [
                {
                    id: 'viz-morera-test',
                    title: 'Morera Test: Draw a Contour, Compute the Integral',
                    description: 'Draw a closed triangular contour by clicking three vertices. The integral of the selected function around it is computed numerically. If it is (nearly) zero for every triangle you draw, the function is analytic.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 70, originX: 280, originY: 210 });
                        var pts = [];
                        var fnIdx = 0;
                        var fns = [
                            { name: 'f(z) = z\u00B2 (analytic)', f: function(re, im) { return [re*re-im*im, 2*re*im]; } },
                            { name: 'f(z) = e^z (analytic)', f: function(re, im) { var r=Math.exp(re); return [r*Math.cos(im), r*Math.sin(im)]; } },
                            { name: 'f(z) = conj(z) (NOT analytic)', f: function(re, im) { return [re, -im]; } },
                            { name: 'f(z) = |z| (NOT analytic)', f: function(re, im) { var m=Math.sqrt(re*re+im*im); return [m, 0]; } }
                        ];

                        var sel = document.createElement('select');
                        sel.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 8px;font-size:0.78rem;margin-right:8px;';
                        fns.forEach(function(fn, i) { var o=document.createElement('option'); o.value=i; o.textContent=fn.name; sel.appendChild(o); });
                        sel.addEventListener('change', function() { fnIdx=parseInt(sel.value); draw(); });
                        controls.appendChild(sel);
                        VizEngine.createButton(controls, 'Clear', function() { pts=[]; draw(); });

                        function lineIntegral(fn, x1,y1, x2,y2, nSteps) {
                            // Integrate f(z) dz from (x1+iy1) to (x2+iy2)
                            var dre = x2-x1, dim = y2-y1;
                            var sumRe = 0, sumIm = 0;
                            for (var k = 0; k < nSteps; k++) {
                                var t = (k + 0.5) / nSteps;
                                var zre = x1 + t*dre, zim = y1 + t*dim;
                                var fw = fn.f(zre, zim);
                                // f(z) dz = (fre+i fim)(dre+i dim) dt/nSteps
                                sumRe += (fw[0]*dre - fw[1]*dim) / nSteps;
                                sumIm += (fw[0]*dim + fw[1]*dre) / nSteps;
                            }
                            return [sumRe, sumIm];
                        }

                        function triangleIntegral(fn, p0, p1, p2) {
                            var nS = 200;
                            var s1 = lineIntegral(fn, p0[0],p0[1], p1[0],p1[1], nS);
                            var s2 = lineIntegral(fn, p1[0],p1[1], p2[0],p2[1], nS);
                            var s3 = lineIntegral(fn, p2[0],p2[1], p0[0],p0[1], nS);
                            return [s1[0]+s2[0]+s3[0], s1[1]+s2[1]+s3[1]];
                        }

                        viz.canvas.addEventListener('click', function(e) {
                            if (pts.length >= 3) pts = [];
                            var r = viz.canvas.getBoundingClientRect();
                            var cx = e.clientX - r.left, cy = e.clientY - r.top;
                            var mp = viz.toMath(cx, cy);
                            pts.push(mp);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();
                            var fn = fns[fnIdx];
                            var ctx = viz.ctx;

                            // Draw domain coloring faintly
                            // (skip full domain coloring for performance; just color-hint the background)

                            // Draw points and triangle
                            pts.forEach(function(p, i) {
                                viz.drawPoint(p[0], p[1], viz.colors.orange, 'P'+(i+1), 6);
                            });
                            if (pts.length >= 2) {
                                for (var i = 0; i < pts.length - 1; i++) {
                                    viz.drawSegment(pts[i][0], pts[i][1], pts[i+1][0], pts[i+1][1], viz.colors.blue, 2);
                                }
                            }
                            if (pts.length === 3) {
                                viz.drawSegment(pts[2][0], pts[2][1], pts[0][0], pts[0][1], viz.colors.blue, 2);
                                // shade
                                ctx.beginPath();
                                var s0=viz.toScreen(pts[0][0],pts[0][1]), s1=viz.toScreen(pts[1][0],pts[1][1]), s2=viz.toScreen(pts[2][0],pts[2][1]);
                                ctx.moveTo(s0[0],s0[1]); ctx.lineTo(s1[0],s1[1]); ctx.lineTo(s2[0],s2[1]); ctx.closePath();
                                ctx.fillStyle = viz.colors.blue + '22'; ctx.fill();

                                var result = triangleIntegral(fn, pts[0], pts[1], pts[2]);
                                var mag = Math.sqrt(result[0]*result[0] + result[1]*result[1]);
                                var isZero = mag < 0.01;
                                var color = isZero ? viz.colors.green : viz.colors.red;
                                viz.screenText('\u222E\u1D40 f dz = ' + result[0].toFixed(4) + ' + ' + result[1].toFixed(4) + 'i', viz.width/2, viz.height - 36, color, 13, 'center');
                                viz.screenText('|integral| = ' + mag.toFixed(5) + (isZero ? '  \u2248 0 \u2713 analytic' : '  \u2260 0 \u2717 not analytic'), viz.width/2, viz.height - 16, color, 12, 'center');
                            } else {
                                viz.screenText('Click three points to draw a triangle', viz.width/2, viz.height-16, viz.colors.text, 12, 'center');
                            }
                            viz.screenText(fn.name, viz.width/2, 14, viz.colors.white, 13, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f_n(z) = z^n / n^2\\). Show that \\(f_n \\to 0\\) uniformly on the closed unit disk \\(\\overline{\\mathbb{D}}\\), and conclude that the limit is analytic on \\(\\mathbb{D}\\).',
                    hint: 'Estimate \\(|f_n(z)|\\) for \\(|z| \\le 1\\). Then apply the corollary to Morera\'s theorem.',
                    solution: 'For \\(|z| \\le 1\\): \\(|f_n(z)| = |z|^n/n^2 \\le 1/n^2 \\to 0\\). So \\(f_n \\to 0\\) uniformly. Each \\(f_n\\) is analytic (it is a polynomial), and the uniform limit of analytic functions is analytic by the corollary to Morera\'s theorem. The limit \\(f = 0\\) is of course analytic (trivially).'
                },
                {
                    question: 'Give an example showing that the hypothesis "continuous" cannot be dropped from Morera\'s theorem.',
                    hint: 'Think of a function that is zero almost everywhere but has a point discontinuity.',
                    solution: 'Let \\(f(z) = 1\\) for \\(z \\ne 0\\) and \\(f(0) = 0\\). Then \\(f\\) is not continuous at 0, and not analytic at 0 (analyticity implies continuity). However, any contour integral of \\(f\\) differs from \\(\\oint 1\\,dz = 0\\) by at most a measure-zero contribution, so the integral condition is still "morally" satisfied. The theorem fails without continuity: we need continuity to run the proof that \\(F\\) is differentiable.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Schwarz Lemma
        // ================================================================
        {
            id: 'sec-schwarz',
            title: 'Schwarz Lemma',
            content: `
<h2>Schwarz Lemma</h2>

<p>The Schwarz lemma gives precise quantitative constraints on analytic maps of the unit disk that fix the origin. It is a fundamental tool in geometric function theory and the classification of automorphisms of the disk.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem (Schwarz Lemma)</div>
    <div class="env-body">
        <p>Let \\(f: \\mathbb{D} \\to \\mathbb{D}\\) be analytic (where \\(\\mathbb{D} = \\{|z| < 1\\}\\)) with \\(f(0) = 0\\). Then:</p>
        <ol>
            <li>\\(|f(z)| \\le |z|\\) for all \\(z \\in \\mathbb{D}\\).</li>
            <li>\\(|f'(0)| \\le 1\\).</li>
            <li>If equality holds in (1) for some \\(z \\ne 0\\), or if \\(|f'(0)| = 1\\), then \\(f(z) = e^{i\\theta} z\\) for some real \\(\\theta\\) (a rotation).</li>
        </ol>
    </div>
</div>

<h3>Proof</h3>

<p>Since \\(f(0) = 0\\), the function \\(g(z) = f(z)/z\\) has a removable singularity at 0 (by the Riemann removable singularity theorem, since \\(f\\) is analytic and \\(f(0) = 0\\) means \\(f(z) = z \cdot h(z)\\) with \\(h\\) analytic). Set \\(g(0) = f'(0)\\).</p>

<p>Now \\(g\\) is analytic on \\(\\mathbb{D}\\). For any \\(r < 1\\), on the circle \\(|z| = r\\) we have \\(|g(z)| = |f(z)|/r < 1/r\\) (since \\(|f(z)| < 1\\)). By the <strong>Maximum Modulus Principle</strong>, \\(|g(z)| < 1/r\\) on all of \\(|z| \\le r\\). Letting \\(r \\to 1\\):</p>

\\[
|g(z)| \\le 1 \\quad \\text{for all } z \\in \\mathbb{D}.
\\]

<p>This gives \\(|f(z)| = |z| \\cdot |g(z)| \\le |z|\\) (part 1) and \\(|f'(0)| = |g(0)| \\le 1\\) (part 2).</p>

<p>If \\(|g(z_0)| = 1\\) for some \\(z_0 \\in \\mathbb{D}\\), the Maximum Modulus Principle forces \\(g\\) to be constant: \\(g(z) = e^{i\\theta}\\). Then \\(f(z) = e^{i\\theta} z\\). \\(\\square\\)</p>

<div class="env-block intuition">
    <div class="env-title">Geometric Interpretation</div>
    <div class="env-body">
        <p>The Schwarz lemma says: any analytic self-map of the disk fixing the origin is "no larger than the identity." The image of any disk \\(|z| \\le r\\) must fit inside the same disk. The only maps that achieve equality at every point are the rigid rotations \\(z \\mapsto e^{i\\theta} z\\).</p>
        <p>Combined with Möbius transformations, this gives the full characterization: the automorphism group of \\(\\mathbb{D}\\) consists exactly of maps of the form \\(z \\mapsto e^{i\\theta}(z-a)/(1-\\bar a z)\\) for \\(|a| < 1\\), \\(\\theta \\in \\mathbb{R}\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-schwarz-lemma',
                    title: 'Schwarz Lemma: |f(z)| ≤ |z|',
                    description: 'An analytic self-map of the unit disk fixing 0. Drag the point z to explore: the image f(z) always lies inside (or on) the circle of radius |z|. The derivative at 0 satisfies |f\'(0)| ≤ 1.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 130, originX: 280, originY: 210 });

                        // f(z) = z^2 (maps D to D, fixes 0)
                        // parametrized family: f_t(z) = z * (z + t) / (1 + t*z) for |t| < 1
                        var tRe = 0.0, tIm = 0.0;

                        VizEngine.createSlider(controls, 't (real part)', -0.9, 0.9, tRe, 0.05, function(v) { tRe = v; draw(); });
                        VizEngine.createSlider(controls, 't (imag part)', -0.9, 0.9, tIm, 0.05, function(v) { tIm = v; draw(); });

                        // f_t(z) = z * (z - a) / (1 - conj(a) z) composed: use f(z) = z^2 is simpler
                        // Instead use: f(z) = (z - t)/(1 - conj(t)*z) * e^{i*0} shifted to fix 0:
                        // g(z) = f(z) - f(0) normalized. Let's just use f(z) = z*(z + t)/(1 + t*z)
                        function cMul(a, b) { return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]]; }
                        function cDiv(a, b) { var d=b[0]*b[0]+b[1]*b[1]; return [(a[0]*b[0]+a[1]*b[1])/d, (a[1]*b[0]-a[0]*b[1])/d]; }
                        function cAdd(a, b) { return [a[0]+b[0], a[1]+b[1]]; }

                        function fMap(zre, zim) {
                            // f(z) = z * (z + t) / (1 + conj(t)*z)
                            var z = [zre, zim], t = [tRe, tIm];
                            var num = cMul(z, cAdd(z, t));
                            var den = cAdd([1, 0], cMul([tRe, -tIm], z));
                            return cDiv(num, den);
                        }

                        var zx = 0.5, zy = 0.3;
                        viz.addDraggable('z', zx, zy, viz.colors.orange, 8, function(x, y) {
                            // clamp inside unit disk
                            var r = Math.sqrt(x*x + y*y);
                            if (r > 0.97) { x = x/r*0.97; y = y/r*0.97; }
                            zx = x; zy = y;
                            var d = viz.draggables.find(function(d) { return d.id === 'z'; });
                            if (d) { d.x = zx; d.y = zy; }
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.axis, 2);

                            // z circle
                            var rz = Math.sqrt(zx*zx + zy*zy);
                            viz.drawCircle(0, 0, rz, null, viz.colors.orange + '88', 1.5);

                            // f(z)
                            var fz = fMap(zx, zy);
                            var rfz = Math.sqrt(fz[0]*fz[0]+fz[1]*fz[1]);

                            // f(z) circle (should be <= rz)
                            viz.drawCircle(0, 0, rfz, null, viz.colors.teal + '88', 1.5);

                            // Draw segments
                            viz.drawSegment(0, 0, zx, zy, viz.colors.orange, 2, true);
                            viz.drawSegment(0, 0, fz[0], fz[1], viz.colors.teal, 2, true);

                            viz.drawPoint(zx, zy, viz.colors.orange, 'z', 7);
                            viz.drawPoint(fz[0], fz[1], viz.colors.teal, 'f(z)', 7);
                            viz.drawPoint(0, 0, viz.colors.white, null, 4);

                            // Labels
                            var ctx = viz.ctx;
                            var px = 10, py = 10;
                            ctx.fillStyle = '#0c0c2099'; ctx.fillRect(px-4, py-4, 230, 72);
                            viz.screenText('|z| = ' + rz.toFixed(3), px + 113, py + 10, viz.colors.orange, 12, 'center');
                            viz.screenText('|f(z)| = ' + rfz.toFixed(3), px + 113, py + 28, viz.colors.teal, 12, 'center');
                            var ok = rfz <= rz + 1e-6;
                            viz.screenText('|f(z)| \u2264 |z|: ' + (ok ? '\u2713' : '\u2717'), px + 113, py + 46, ok ? viz.colors.green : viz.colors.red, 12, 'center');

                            // Derivative at 0
                            var h = 1e-5;
                            var fh = fMap(h, 0);
                            var fprime = Math.sqrt(fh[0]*fh[0] + fh[1]*fh[1]) / h;
                            viz.screenText("|f'(0)| \u2248 " + fprime.toFixed(3) + (fprime <= 1 + 1e-4 ? ' \u2264 1 \u2713' : ' > 1 \u2717'), px + 113, py + 64, fprime <= 1 + 1e-4 ? viz.colors.green : viz.colors.red, 12, 'center');

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f: \\mathbb{D} \\to \\mathbb{D}\\) be analytic with \\(f(0) = 0\\) and \\(f(1/2) = 1/2\\). Prove that \\(f(z) = z\\) for all \\(z \\in \\mathbb{D}\\).',
                    hint: 'By the Schwarz lemma, \\(|f(z)| \\le |z|\\). The condition \\(f(1/2) = 1/2\\) says equality holds at \\(z = 1/2\\). What does the rigidity part of the Schwarz lemma tell you?',
                    solution: 'By the Schwarz lemma, \\(|f(z)| \\le |z|\\). Since \\(|f(1/2)| = 1/2 = |1/2|\\), equality holds at \\(z_0 = 1/2 \\ne 0\\). The rigidity statement says \\(f(z) = e^{i\\theta}z\\) for some \\(\\theta\\). But \\(f(1/2) = e^{i\\theta}/2 = 1/2\\) forces \\(e^{i\\theta} = 1\\), so \\(f(z) = z\\).'
                },
                {
                    question: 'State and prove a "Schwarz Lemma at \\(a\\)" for maps \\(f: \\mathbb{D} \\to \\mathbb{D}\\) with \\(f(a) = a\\) for some \\(a \\in \\mathbb{D}\\).',
                    hint: 'Use a Möbius transformation \\(\\phi_a(z) = (z-a)/(1-\\bar a z)\\) that maps \\(\\mathbb{D}\\) to \\(\\mathbb{D}\\) with \\(\\phi_a(a) = 0\\), and apply the Schwarz lemma to \\(g = \\phi_a \\circ f \\circ \\phi_a^{-1}\\).',
                    solution: 'Let \\(\\phi_a(z) = (z-a)/(1-\\bar a z)\\). Then \\(g = \\phi_a \\circ f \\circ \\phi_a^{-1}\\) maps \\(\\mathbb{D} \\to \\mathbb{D}\\) and \\(g(0) = \\phi_a(f(a)) = \\phi_a(a) = 0\\). The Schwarz lemma gives \\(|g(z)| \\le |z|\\) and \\(|g\'(0)| \\le 1\\), with equality iff \\(g\\) is a rotation. Translating back: \\(|f\'(a)| \\le 1\\), with equality iff \\(f\\) is a Möbius automorphism of \\(\\mathbb{D}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Identity Theorem
        // ================================================================
        {
            id: 'sec-identity',
            title: 'Identity Theorem',
            content: `
<h2>Identity Theorem</h2>

<p>The Identity Theorem captures the ultimate rigidity of analytic functions: knowing a function on any "sufficiently rich" subset determines it everywhere.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem (Identity Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) and \\(g\\) be analytic on a connected domain \\(D\\). If the set \\(\\{z \\in D : f(z) = g(z)\\}\\) has a limit point in \\(D\\), then \\(f \\equiv g\\) on \\(D\\).</p>
    </div>
</div>

<p>Equivalently: if \\(h = f - g\\) is analytic on a connected domain \\(D\\) and the zero set \\(\\{z : h(z) = 0\\}\\) has a limit point in \\(D\\), then \\(h \\equiv 0\\) on \\(D\\).</p>

<h3>Proof</h3>

<p>Let \\(h = f - g\\) and \\(Z = \\{z \in D : h(z) = 0\\}\\). Suppose \\(Z\\) has a limit point \\(z_0 \in D\\).</p>

<p><strong>Step 1: \\(h\\) vanishes to all orders at \\(z_0\\).</strong> Write the Taylor expansion \\(h(z) = \sum_{n=0}^{\infty} c_n (z - z_0)^n\\). If \\(c_k \\ne 0\\) for some \\(k\\), let \\(m\\) be the smallest such index. Then \\(h(z) = (z-z_0)^m (c_m + c_{m+1}(z-z_0) + \cdots)\\) and \\(c_m \\ne 0\\). By continuity, the second factor is non-zero near \\(z_0\\), so \\(h\\) has an isolated zero at \\(z_0\\). But \\(z_0\\) is a limit point of zeros, contradiction. Hence all \\(c_n = 0\\), i.e., \\(h \\equiv 0\\) in some disk around \\(z_0\\).</p>

<p><strong>Step 2: The zero set is open and closed.</strong> The set \\(U = \\{z : h^{(n)}(z) = 0 \text{ for all } n \\ge 0\\}\\) is clearly closed (each condition \\(h^{(n)}(z) = 0\\) is a closed condition). Step 1 says every point of \\(U\\) is in the interior of \\(U\\) (since \\(h = 0\\) in a whole disk), so \\(U\\) is open. Since \\(D\\) is connected and \\(U\\) is non-empty (it contains \\(z_0\\)), we have \\(U = D\\). Thus \\(h \\equiv 0\\) on \\(D\\). \\(\\square\\)</p>

<div class="env-block intuition">
    <div class="env-title">Why Connectedness Is Essential</div>
    <div class="env-body">
        <p>If \\(D\\) is not connected, the result can fail. On \\(D = \\{|z| < 1\\} \cup \\{|z - 3| < 1\\}\\) (two disjoint disks), we can set \\(f = 0\\) on the left disk and \\(f = 1\\) on the right, getting an analytic function whose zeros accumulate at every point of the left disk but that is non-zero on the right. Connectedness is what allows the "spreading" argument in Step 2.</p>
    </div>
</div>

<h3>Zeros of Analytic Functions Are Isolated</h3>

<div class="env-block corollary">
    <div class="env-title">Corollary</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic and not identically zero on a connected domain \\(D\\), then the zeros of \\(f\\) are <em>isolated</em>: each zero \\(z_0\\) has a neighborhood containing no other zero of \\(f\\).</p>
    </div>
</div>

<p>This is the contrapositive of the Identity Theorem: if zeros accumulate, the function is identically zero.</p>
`,
            visualizations: [
                {
                    id: 'viz-identity-zeros',
                    title: 'Accumulating Zeros Force Identically Zero',
                    description: 'Watch zeros of an analytic function that accumulate at a limit point. By the Identity Theorem, such a function must be identically zero. The animation shows why isolated zeros are the only possibility for a non-trivial analytic function.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 55, originX: 280, originY: 210 });

                        var animating = false;
                        var phase = 0; // 0: show isolated zeros, 1: accumulate
                        var t = 0;
                        var animId = null;

                        // f_n(z) = sin(n*pi*z) / (n*pi) -- zeros at z = k/n, spaced 1/n apart
                        // As n->inf, zeros 0,1/n,2/n,... accumulate at 0
                        var nVal = 1;

                        VizEngine.createSlider(controls, 'n (zero density)', 1, 20, nVal, 1, function(v) {
                            nVal = Math.round(v); draw(nVal);
                        });
                        VizEngine.createButton(controls, 'Animate accumulation', function() {
                            if (animId) { cancelAnimationFrame(animId); animId = null; return; }
                            var n0 = 1;
                            function step() {
                                n0 += 0.04;
                                if (n0 > 20) n0 = 1;
                                draw(n0);
                                animId = requestAnimationFrame(step);
                            }
                            animId = requestAnimationFrame(step);
                        });

                        function sinc_fn(re, im, n) {
                            // f(z) = sin(n*pi*z) / (n * pi)
                            // sin(w) = sin(x)cosh(y) + i cos(x)sinh(y) where w = x+iy
                            var w_re = n * Math.PI * re, w_im = n * Math.PI * im;
                            var fre = Math.sin(w_re) * Math.cosh(w_im);
                            var fim = Math.cos(w_re) * Math.sinh(w_im);
                            return [fre / (n * Math.PI), fim / (n * Math.PI)];
                        }

                        function draw(n) {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Draw domain coloring
                            var xRange = [-viz.originX / viz.scale, (viz.width - viz.originX) / viz.scale];
                            var yRange = [-(viz.height - viz.originY) / viz.scale, viz.originY / viz.scale];
                            viz.drawDomainColoring(function(re, im) { return sinc_fn(re, im, n); }, xRange, yRange);
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Mark zeros on real axis: z = k/n for integer k
                            var maxK = Math.floor(xRange[1] * n);
                            var minK = Math.ceil(xRange[0] * n);
                            for (var k = minK; k <= maxK; k++) {
                                viz.drawPoint(k / n, 0, viz.colors.white, null, 4);
                            }

                            var nInt = Math.round(n);
                            viz.screenText('f(z) = sin(' + nInt + '\u03C0z) / (' + nInt + '\u03C0)', viz.width/2, 14, viz.colors.white, 13, 'center');
                            viz.screenText('Zeros at z = k/' + nInt + ', k \u2208 \u2124   (spacing = 1/' + nInt + ')', viz.width/2, viz.height - 28, viz.colors.yellow, 12, 'center');
                            viz.screenText('As n\u2192\u221E, zeros accumulate at 0 \u21D2 f\u22610 (Identity Thm)', viz.width/2, viz.height - 10, viz.colors.orange, 12, 'center');
                        }
                        draw(nVal);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Suppose \\(f\\) is analytic on \\(\\mathbb{C}\\) and \\(f(1/n) = 0\\) for all \\(n = 1, 2, 3, \\ldots\\). Prove that \\(f \\equiv 0\\).',
                    hint: 'The sequence \\(1/n\\) converges to 0, which is a limit point of the zero set of \\(f\\). Apply the Identity Theorem.',
                    solution: 'The zero set of \\(f\\) contains \\(\\{1/n : n \\ge 1\\}\\), and this sequence has limit point 0 in \\(\\mathbb{C}\\). Since \\(f\\) is analytic on the connected domain \\(\\mathbb{C}\\), the Identity Theorem gives \\(f \\equiv 0\\).'
                },
                {
                    question: 'Let \\(f\\) be analytic on \\(\\mathbb{D}\\) and suppose \\(f(r_n) = \\sin(r_n)\\) for a sequence \\(r_n \\in (0,1)\\) with \\(r_n \\to 0\\). Prove that \\(f(z) = \\sin(z)\\) on \\(\\mathbb{D}\\).',
                    hint: 'Apply the Identity Theorem to \\(h(z) = f(z) - \\sin(z)\\).',
                    solution: 'Let \\(h(z) = f(z) - \\sin(z)\\), which is analytic on \\(\\mathbb{D}\\). By hypothesis, \\(h(r_n) = 0\\) for all \\(n\\), and \\(r_n \\to 0 \\in \\mathbb{D}\\). The zero set of \\(h\\) has limit point 0 in the connected domain \\(\\mathbb{D}\\). By the Identity Theorem, \\(h \\equiv 0\\) on \\(\\mathbb{D}\\), i.e., \\(f(z) = \\sin(z)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge and Outlook
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: Rigidity and What Comes Next',
            content: `
<h2>Bridge: Rigidity and What Comes Next</h2>

<h3>The Theme of This Chapter</h3>

<p>Every result in this chapter is a consequence of the same underlying fact: analytic functions are <em>overdetermined</em>. Cauchy's formula expresses interior values in terms of boundary values. This propagates into dramatic global consequences:</p>

<ul>
    <li><strong>Liouville</strong>: Boundedness on all of \\(\\mathbb{C}\\) forces constancy. Entire functions cannot be "trapped."</li>
    <li><strong>FTA</strong>: No polynomial can "avoid" all of \\(\\mathbb{C}\\); the complex numbers are large enough that every polynomial has a root.</li>
    <li><strong>Morera</strong>: The analyticity condition (vanishing integrals) is equivalent to having a local primitive, which is equivalent to being differentiable. These are not separate conditions; they collapse into one.</li>
    <li><strong>Schwarz</strong>: Self-maps of the disk fixing the origin are constrained by a simple inequality. The extremals are rigid rotations.</li>
    <li><strong>Identity</strong>: Two analytic functions that agree on "too many" points are the same function. There is no room for perturbation.</li>
</ul>

<h3>The Maximum Modulus Principle</h3>

<p>A result we used implicitly in the Schwarz lemma proof deserves its own statement:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem (Maximum Modulus Principle)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic and non-constant on a connected domain \\(D\\), then \\(|f|\\) attains no maximum in the interior of \\(D\\).</p>
    </div>
</div>

<p>Equivalently, if \\(f\\) is analytic on a closed bounded domain \\(\\overline{D}\\), then \\(\\max_{\\overline{D}} |f| = \\max_{\\partial D} |f|\\): the maximum is on the boundary. This follows from the mean value property of harmonic functions (the real and imaginary parts of an analytic function are harmonic).</p>

<h3>What Comes Next: Singularities</h3>

<p>The theorems of this chapter all apply to functions that are analytic everywhere on their domain. But the most interesting complex functions have <em>singularities</em>: points where analyticity breaks down. The next chapter studies three types:</p>

<ol>
    <li><strong>Removable singularities</strong>: the function is bounded near the singularity and can be extended analytically (e.g., \\(\\sin(z)/z\\) at \\(z = 0\\)).</li>
    <li><strong>Poles</strong>: \\(|f(z)| \\to \\infty\\) as \\(z \\to z_0\\) (e.g., \\(1/(z-z_0)^n\\)).</li>
    <li><strong>Essential singularities</strong>: the function oscillates wildly near \\(z_0\\) (e.g., \\(e^{1/z}\\) at \\(z = 0\\)).</li>
</ol>

<p>The Laurent series expansion handles all three uniformly, and the residue theorem will generalize Cauchy's integral formula to domains with singularities. This opens the door to one of the most powerful techniques in mathematics: contour integration for evaluating real integrals.</p>

<div class="env-block remark">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>Complex analysis is often described as the most "perfect" branch of classical mathematics: its main theorems are clean, its proofs are short, and its applications are everywhere. The rigidity results of this chapter are the heart of that perfection. The Fundamental Theorem of Algebra is one of the oldest results in mathematics, and its shortest proof is the one we gave: two paragraphs, using Liouville's theorem. The Identity Theorem says that analytic continuation is unique: there is at most one way to extend an analytic function from one domain to another. This uniqueness is what allows us to speak of "the" gamma function, "the" Riemann zeta function, as global objects defined by their values anywhere.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-open-mapping',
                    title: 'Open Mapping Theorem',
                    description: 'A non-constant analytic function maps open sets to open sets. Watch a small disk get mapped: its image is always an open set (no boundary points in the image of the interior). Drag the center or adjust the radius.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 55, originX: 140, originY: 210 });

                        var cx = 0.5, cy = 0.3, rad = 0.4;
                        var fnIdx = 0;
                        var fns = [
                            { name: 'f(z) = z\u00B2', f: function(re, im) { return [re*re-im*im, 2*re*im]; } },
                            { name: 'f(z) = z\u00B3', f: function(re, im) { return [re*re*re-3*re*im*im, 3*re*re*im-im*im*im]; } },
                            { name: 'f(z) = e^z', f: function(re, im) { var r=Math.exp(re); return [r*Math.cos(im), r*Math.sin(im)]; } },
                            { name: 'f(z) = z + 1/z', f: function(re, im) {
                                var d=re*re+im*im; if(d<1e-8) return [0,0];
                                return [re+re/d, im-im/d];
                            }}
                        ];

                        var sel = document.createElement('select');
                        sel.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 8px;font-size:0.78rem;margin-right:8px;';
                        fns.forEach(function(fn, i) { var o=document.createElement('option'); o.value=i; o.textContent=fn.name; sel.appendChild(o); });
                        sel.addEventListener('change', function() { fnIdx=parseInt(sel.value); draw(); });
                        controls.appendChild(sel);
                        VizEngine.createSlider(controls, 'Radius', 0.1, 1.2, rad, 0.05, function(v) { rad=v; draw(); });

                        viz.addDraggable('c', cx, cy, viz.colors.orange, 7, function(x, y) { cx=x; cy=y; draw(); });

                        function draw() {
                            viz.clear();

                            // Left panel: domain (z-plane)
                            var ctx = viz.ctx;
                            ctx.save();
                            ctx.beginPath(); ctx.rect(0, 0, viz.width/2, viz.height); ctx.clip();
                            viz.drawGrid(0.5);
                            viz.drawAxes();
                            // Input disk
                            viz.drawCircle(cx, cy, rad, viz.colors.blue + '33', viz.colors.blue, 2);
                            viz.drawPoint(cx, cy, viz.colors.orange, null, 6);
                            viz.screenText('z-plane (input)', viz.width/4, 14, viz.colors.white, 12, 'center');
                            ctx.restore();

                            // Right panel: image (w-plane) -- offset origin
                            ctx.save();
                            ctx.beginPath(); ctx.rect(viz.width/2, 0, viz.width/2, viz.height); ctx.clip();
                            // Temporarily shift origin for right panel
                            var oldOriginX = viz.originX;
                            viz.originX = viz.width/2 + (viz.width/2 - viz.width/2)/2 + viz.width/4;
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Sample boundary and interior of the input disk
                            var fn = fns[fnIdx];
                            var nBnd = 180, nInt = 400;
                            // Draw image of boundary
                            ctx.beginPath();
                            var started = false;
                            for (var k = 0; k <= nBnd; k++) {
                                var th = 2*Math.PI*k/nBnd;
                                var zre = cx + rad*Math.cos(th), zim = cy + rad*Math.sin(th);
                                var fw = fn.f(zre, zim);
                                var sc = viz.toScreen(fw[0], fw[1]);
                                if (!started) { ctx.moveTo(sc[0], sc[1]); started=true; } else { ctx.lineTo(sc[0], sc[1]); }
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.blue + '33'; ctx.fill();
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2; ctx.stroke();

                            // Image of center
                            var fc = fn.f(cx, cy);
                            viz.drawPoint(fc[0], fc[1], viz.colors.orange, 'f(z\u2080)', 6);
                            viz.screenText('w-plane (image)', viz.width/2 + viz.width/4, 14, viz.colors.white, 12, 'center');
                            viz.screenText('Image is open (interior maps to interior)', viz.width/2 + viz.width/4, viz.height-12, viz.colors.teal, 11, 'center');
                            viz.originX = oldOriginX;
                            ctx.restore();

                            // Divider
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(viz.width/2, 0); ctx.lineTo(viz.width/2, viz.height); ctx.stroke();

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'State the Maximum Modulus Principle. Use it to prove: if \\(f\\) is analytic on \\(\\overline{\\mathbb{D}}\\) and \\(|f(z)| = 1\\) for all \\(|z| = 1\\), and \\(f\\) has no zeros in \\(\\mathbb{D}\\), then \\(f\\) is a constant of modulus 1.',
                    hint: 'Apply the Maximum Modulus Principle to both \\(f\\) and \\(1/f\\).',
                    solution: 'The Maximum Modulus Principle says \\(|f|\\) achieves its maximum on the boundary. On \\(|z|=1\\): \\(|f|=1\\), so \\(|f(z)| \\le 1\\) for all \\(|z| \\le 1\\). Since \\(f\\) has no zeros in \\(\\mathbb{D}\\), \\(1/f\\) is analytic on \\(\\mathbb{D}\\) with \\(|1/f| = 1\\) on the boundary. By the same principle, \\(|1/f(z)| \\le 1\\), i.e., \\(|f(z)| \\ge 1\\). Together: \\(|f(z)| = 1\\) on all of \\(\\overline{\\mathbb{D}}\\). A non-constant analytic function cannot have constant modulus on an open set (this would force the function to be constant by the Cauchy-Riemann equations), so \\(f\\) is constant.'
                },
                {
                    question: 'Prove that there is no analytic function \\(f\\) on the punctured disk \\(0 < |z| < 1\\) such that \\(f(1/n) = (-1)^n\\) for all integers \\(n \\ge 2\\).',
                    hint: 'What would happen if such \\(f\\) existed and could be extended to \\(z=0\\)? Consider the sequences \\(1/(2k)\\) and \\(1/(2k+1)\\).',
                    solution: 'Suppose such \\(f\\) exists. The subsequence \\(f(1/(2k)) = 1\\) and \\(f(1/(2k+1)) = -1\\) both have limit point 0. If \\(f\\) extends analytically to a neighborhood of 0, then by the Identity Theorem, \\(f \\equiv 1\\) (from the first subsequence) and \\(f \\equiv -1\\) (from the second), a contradiction. So no such analytic extension exists, and in fact no analytic \\(f\\) on the punctured disk can satisfy the given condition, since the singularity at 0 would be essential (the limit of \\(f(1/n)\\) does not exist), incompatible with the function having a consistent analytic structure near 0.'
                },
                {
                    question: 'The real function \\(g(x) = e^{-1/x^2}\\) (extended by \\(g(0) = 0\\)) is \\(C^\\infty\\) on \\(\\mathbb{R}\\) with \\(g^{(n)}(0) = 0\\) for all \\(n\\). Explain why this does not contradict the Identity Theorem.',
                    hint: 'The Identity Theorem applies to analytic (holomorphic) functions, not merely smooth ones. How does \\(g\\) behave on the complex plane near \\(z = 0\\)?',
                    solution: '\\(g\\) is a real-variable smooth function, not an analytic function in the complex sense. Its Taylor series at 0 is identically zero, yet \\(g \\not\\equiv 0\\). This is possible because \\(g\\) is not complex-analytic: the function \\(e^{-1/z^2}\\) has an essential singularity at \\(z = 0\\) in the complex plane and cannot be extended analytically to any neighborhood of 0. The Identity Theorem requires analyticity (complex differentiability), which is a far stronger condition than \\(C^\\infty\\) on \\(\\mathbb{R}\\). The real line is "too thin" to detect the essential singularity at the origin.'
                }
            ]
        }
    ]
});
