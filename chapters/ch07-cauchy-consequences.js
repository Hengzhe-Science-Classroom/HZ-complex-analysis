window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: "Consequences of Cauchy's Formula",
    subtitle: 'Liouville, Morera, and the rigidity of analytic functions',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Cauchy's Formula Has Teeth
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Cauchy's Formula Has Teeth</h2>

<div class="env-block intuition">
    <div class="env-title">The Rigidity of Analyticity</div>
    <div class="env-body">
        <p>In real analysis, knowing a smooth function on an interval tells you essentially nothing about its behavior elsewhere. A \\(C^\\infty\\) bump function can be identically zero outside any given interval while being nontrivial inside. Complex analysis is completely different. If \\(f\\) is analytic on a connected open set and you know \\(f\\) on <em>any</em> arc, any tiny open disk, or even just a sequence of points with a limit point, then you know \\(f\\) everywhere.</p>
        <p>This chapter explores the consequences of Cauchy's integral formula that enforce this extraordinary rigidity.</p>
    </div>
</div>

<p>Recall Cauchy's integral formula from Chapter 6: if \\(f\\) is analytic inside and on a simple closed contour \\(\\gamma\\), then for every \\(z\\) inside \\(\\gamma\\),</p>

\\[
f(z) = \\frac{1}{2\\pi i}\\oint_\\gamma \\frac{f(\\zeta)}{\\zeta - z}\\,d\\zeta.
\\]

<p>This single identity implies a cascade of deep results:</p>

<ol>
    <li><strong>Liouville's theorem:</strong> bounded entire functions are constant.</li>
    <li><strong>The Fundamental Theorem of Algebra:</strong> every non-constant polynomial has a root.</li>
    <li><strong>Morera's theorem:</strong> the converse of Cauchy's theorem; vanishing contour integrals imply analyticity.</li>
    <li><strong>The Schwarz lemma:</strong> a quantitative bound on how much analytic maps can "stretch" the unit disk.</li>
    <li><strong>The identity theorem:</strong> two analytic functions that agree on a set with a limit point are identical.</li>
    <li><strong>The open mapping theorem:</strong> non-constant analytic maps send open sets to open sets.</li>
</ol>

<p>Each result follows from Cauchy's formula, sometimes in just a few lines. The proofs are beautiful precisely because the integral formula does so much work.</p>

<h3>Cauchy's Inequality</h3>

<p>Before proceeding, we record a crucial estimate that Cauchy's formula yields. It will be the engine behind Liouville's theorem.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.1 (Cauchy's Inequality)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic inside and on \\(|z - z_0| = R\\). Then for all \\(n \\geq 0\\),</p>
        \\[
        |f^{(n)}(z_0)| \\leq \\frac{n!\\,M}{R^n},
        \\]
        <p>where \\(M = \\max_{|z - z_0| = R} |f(z)|\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>From Cauchy's formula for derivatives,</p>
        \\[
        f^{(n)}(z_0) = \\frac{n!}{2\\pi i}\\oint_{|\\zeta - z_0|=R} \\frac{f(\\zeta)}{(\\zeta - z_0)^{n+1}}\\,d\\zeta.
        \\]
        <p>By the ML-inequality (the length of the circle is \\(2\\pi R\\) and \\(|\\zeta - z_0|^{n+1} = R^{n+1}\\) on the circle):</p>
        \\[
        |f^{(n)}(z_0)| \\leq \\frac{n!}{2\\pi} \\cdot \\frac{M}{R^{n+1}} \\cdot 2\\pi R = \\frac{n! \\, M}{R^n}.
        \\]
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">What Lies Ahead</div>
    <div class="env-body">
        <p>Notice that Cauchy's inequality says the derivatives of \\(f\\) are controlled by the <em>maximum of \\(|f|\\)</em> on a surrounding circle. Larger circles give tighter bounds (for bounded functions). This is the exact mechanism that makes Liouville's theorem work.</p>
    </div>
</div>
`,
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

<div class="env-block intuition">
    <div class="env-title">The Key Idea</div>
    <div class="env-body">
        <p>If \\(f\\) is entire (analytic on all of \\(\\mathbb{C}\\)) and bounded, then Cauchy's inequality says \\(|f'(z_0)| \\leq M/R\\) for every \\(R > 0\\). Letting \\(R \\to \\infty\\) forces \\(f'(z_0) = 0\\) at every point. A function with zero derivative everywhere is constant.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.2 (Liouville's Theorem)</div>
    <div class="env-body">
        <p>Every bounded entire function is constant.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Let \\(f\\) be entire with \\(|f(z)| \\leq M\\) for all \\(z \\in \\mathbb{C}\\). Fix any \\(z_0 \\in \\mathbb{C}\\). For every \\(R > 0\\), \\(f\\) is analytic inside \\(|z - z_0| = R\\), so Cauchy's inequality with \\(n = 1\\) gives</p>
        \\[
        |f'(z_0)| \\leq \\frac{M}{R}.
        \\]
        <p>Since \\(R\\) is arbitrary, let \\(R \\to \\infty\\) to get \\(|f'(z_0)| = 0\\), i.e., \\(f'(z_0) = 0\\). This holds for every \\(z_0\\), so \\(f\\) is constant.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Sharpness</div>
    <div class="env-body">
        <p>Liouville's theorem is sharp: \\(f(z) = e^z\\) is entire but unbounded (it is unbounded along the positive real axis). Removing either hypothesis (entire or bounded) breaks the conclusion.</p>
    </div>
</div>

<h3>A Generalization</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.3 (Generalized Liouville)</div>
    <div class="env-body">
        <p>If \\(f\\) is entire and \\(|f(z)| \\leq C|z|^k\\) for some constant \\(C\\) and non-negative integer \\(k\\), for all \\(|z|\\) sufficiently large, then \\(f\\) is a polynomial of degree at most \\(k\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Apply Cauchy's inequality with \\(n = k + 1\\) and \\(z_0 = 0\\). On \\(|z| = R\\) (for large \\(R\\)), \\(M \\leq C R^k\\), so</p>
        \\[
        |f^{(k+1)}(0)| \\leq \\frac{(k+1)!\\,C R^k}{R^{k+1}} = \\frac{(k+1)!\\,C}{R} \\to 0.
        \\]
        <p>Hence \\(f^{(k+1)}(0) = 0\\). But the same argument at any center \\(z_0\\) (using \\(|f(z)| \\leq C'|z|^k \\leq C''R^k\\) on a large enough circle about \\(z_0\\)) shows \\(f^{(k+1)} \\equiv 0\\), so \\(f\\) is a polynomial of degree \\(\\leq k\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="viz-placeholder" data-viz="viz-liouville-demo"></div>
`,
            visualizations: [
                {
                    id: 'viz-liouville-demo',
                    title: "Liouville's Theorem: Bounded Entire Functions",
                    description: 'Domain coloring of entire functions. Bounded ones (like constants) have uniform color; unbounded ones (like exp, polynomials) show the color spinning through all hues. Toggle between examples to see the contrast.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 40
                        });
                        var funcIdx = 0;
                        var funcs = [
                            { name: 'f(z) = 3 (constant, bounded)', fn: function(re, im) { return [3, 0]; } },
                            { name: 'f(z) = e^z (entire, unbounded)', fn: function(re, im) { var r = Math.exp(re); return [r * Math.cos(im), r * Math.sin(im)]; } },
                            { name: 'f(z) = z^2 (entire, unbounded)', fn: function(re, im) { return [re*re - im*im, 2*re*im]; } },
                            { name: 'f(z) = sin(z) (entire, unbounded)', fn: function(re, im) { return [Math.sin(re)*Math.cosh(im), Math.cos(re)*Math.sinh(im)]; } },
                            { name: 'f(z) = 2i (constant, bounded)', fn: function(re, im) { return [0, 2]; } }
                        ];

                        VizEngine.createButton(controls, 'Next function', function() {
                            funcIdx = (funcIdx + 1) % funcs.length;
                            draw();
                        });

                        function draw() {
                            var f = funcs[funcIdx];
                            viz.drawDomainColoring(f.fn, [-5, 5], [-3.5, 3.5]);
                            var ctx = viz.ctx;
                            ctx.fillStyle = 'rgba(12,12,32,0.7)';
                            ctx.fillRect(0, 0, viz.width, 30);
                            viz.screenText(f.name, viz.width / 2, 16, viz.colors.white, 13);
                            var bounded = (funcIdx === 0 || funcIdx === 4);
                            viz.screenText(
                                bounded ? 'Bounded: uniform magnitude => constant by Liouville' : 'Unbounded: Liouville does not apply',
                                viz.width / 2, viz.height - 12, bounded ? viz.colors.green : viz.colors.orange, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that if \\(f\\) is entire and \\(\\operatorname{Re}(f(z)) \\leq M\\) for all \\(z\\), then \\(f\\) is constant.',
                    hint: 'Consider \\(g(z) = e^{f(z)}\\). What can you say about \\(|g(z)|\\)?',
                    solution: 'Let \\(g(z) = e^{f(z)}\\). Then \\(g\\) is entire and \\(|g(z)| = e^{\\operatorname{Re}(f(z))} \\leq e^M\\). By Liouville, \\(g\\) is constant, so \\(f\\) is constant (since \\(e^w\\) is injective on any horizontal strip of width \\(< 2\\pi\\), and if \\(e^f\\) is constant then \\(f\\) must be constant).'
                },
                {
                    question: 'Let \\(f\\) be entire with \\(|f(z)| \\geq 1\\) for all \\(z\\). Show that \\(f\\) is constant.',
                    hint: 'Consider \\(1/f(z)\\).',
                    solution: '\\(g(z) = 1/f(z)\\) is entire (since \\(f\\) has no zeros, being at least 1 in modulus) and \\(|g(z)| \\leq 1\\). By Liouville, \\(g\\) is constant, hence \\(f\\) is constant.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Fundamental Theorem of Algebra
        // ================================================================
        {
            id: 'sec-fta',
            title: 'Fundamental Theorem of Algebra',
            content: `
<h2>The Fundamental Theorem of Algebra</h2>

<div class="env-block intuition">
    <div class="env-title">Why Complex Analysis Proves an Algebra Theorem</div>
    <div class="env-body">
        <p>The Fundamental Theorem of Algebra (FTA) says every non-constant polynomial \\(p(z)\\) with complex coefficients has at least one root in \\(\\mathbb{C}\\). Despite its name, every known proof uses analysis in some form. Liouville's theorem gives one of the shortest and most elegant proofs.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.4 (Fundamental Theorem of Algebra)</div>
    <div class="env-body">
        <p>Every non-constant polynomial \\(p(z) = a_n z^n + \\cdots + a_1 z + a_0\\) with \\(a_n \\neq 0\\) and \\(n \\geq 1\\) has at least one root in \\(\\mathbb{C}\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof via Liouville's Theorem</div>
    <div class="env-body">
        <p>Suppose for contradiction that \\(p(z) \\neq 0\\) for all \\(z \\in \\mathbb{C}\\). Then \\(g(z) = 1/p(z)\\) is entire.</p>
        <p>We claim \\(g\\) is bounded. Since \\(p(z) = a_n z^n(1 + a_{n-1}/(a_n z) + \\cdots)\\), for large \\(|z|\\) we have \\(|p(z)| \\geq |a_n||z|^n/2\\), so \\(|g(z)| \\leq 2/(|a_n||z|^n) \\to 0\\). Thus \\(g\\) is bounded for \\(|z| \\geq R_0\\) for some \\(R_0\\).</p>
        <p>On the compact disk \\(|z| \\leq R_0\\), the continuous function \\(|g|\\) attains a maximum. Combining, \\(g\\) is bounded on all of \\(\\mathbb{C}\\).</p>
        <p>By Liouville's theorem, \\(g\\) is constant, so \\(p\\) is constant, contradicting \\(n \\geq 1\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Corollary: Complete Factorization</div>
    <div class="env-body">
        <p>By induction, any degree-\\(n\\) polynomial factors completely as \\(p(z) = a_n(z - z_1)(z - z_2)\\cdots(z - z_n)\\) for roots \\(z_1, \\ldots, z_n \\in \\mathbb{C}\\) (counted with multiplicity). This is why \\(\\mathbb{C}\\) is called <em>algebraically closed</em>.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fta-zeros"></div>
`,
            visualizations: [
                {
                    id: 'viz-fta-zeros',
                    title: 'Polynomial Zeros via Domain Coloring',
                    description: 'Domain coloring of a polynomial p(z). Zeros appear as points where all colors converge (a full hue cycle around the point). Adjust the coefficients to move the zeros around. Every degree-n polynomial has exactly n zeros (counted with multiplicity).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 40
                        });

                        var a0r = -1, a0i = 0;
                        var a1r = 0, a1i = 0;
                        var a2r = 1, a2i = 0;
                        var degree = 2;

                        VizEngine.createSlider(controls, 'a\u2080 (re)', -3, 3, a0r, 0.5, function(v) { a0r = v; draw(); });
                        VizEngine.createSlider(controls, 'a\u2080 (im)', -3, 3, a0i, 0.5, function(v) { a0i = v; draw(); });
                        VizEngine.createSlider(controls, 'degree', 1, 5, degree, 1, function(v) { degree = Math.round(v); draw(); });

                        function polyEval(re, im) {
                            // p(z) = z^degree + a0
                            var zr = 1, zi = 0;
                            var wr = 1, wi = 0;
                            for (var k = 0; k < degree; k++) {
                                var nr = wr * re - wi * im;
                                var ni = wr * im + wi * re;
                                wr = nr; wi = ni;
                            }
                            return [wr + a0r, wi + a0i];
                        }

                        function draw() {
                            viz.drawDomainColoring(polyEval, [-3, 3], [-2.5, 2.5]);
                            var ctx = viz.ctx;
                            ctx.fillStyle = 'rgba(12,12,32,0.7)';
                            ctx.fillRect(0, 0, viz.width, 28);
                            var label = 'p(z) = z^' + degree + ' + (' + a0r.toFixed(1) + (a0i >= 0 ? '+' : '') + a0i.toFixed(1) + 'i)';
                            viz.screenText(label, viz.width / 2, 15, viz.colors.white, 12);
                            viz.screenText('Zeros: where all colors spiral to a point', viz.width / 2, viz.height - 12, viz.colors.teal, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the FTA to show that every polynomial of odd degree with real coefficients has at least one real root.',
                    hint: 'Consider the behavior of \\(p(x)\\) as \\(x \\to +\\infty\\) and \\(x \\to -\\infty\\) on the real line, using the Intermediate Value Theorem.',
                    solution: 'For a real polynomial of odd degree \\(n\\), \\(p(x) \\to +\\infty\\) as \\(x \\to +\\infty\\) and \\(p(x) \\to -\\infty\\) as \\(x \\to -\\infty\\) (or vice versa). By the Intermediate Value Theorem, \\(p\\) has a real root. Alternatively, by the FTA, \\(p\\) has \\(n\\) complex roots. Complex roots of real polynomials come in conjugate pairs, so the number of non-real roots is even. Since \\(n\\) is odd, at least one root must be real.'
                },
                {
                    question: 'Without using the FTA, show that \\(p(z) = z^4 + 1\\) has no real roots but has four complex roots. Find them explicitly.',
                    hint: 'Factor \\(z^4 + 1 = (z^2 + \\sqrt{2}z + 1)(z^2 - \\sqrt{2}z + 1)\\), or solve \\(z^4 = -1 = e^{i\\pi}\\).',
                    solution: '\\(z^4 = -1 = e^{i(\\pi + 2k\\pi)}\\), so \\(z = e^{i(\\pi + 2k\\pi)/4}\\) for \\(k = 0,1,2,3\\). The four roots are \\(e^{i\\pi/4} = \\frac{1+i}{\\sqrt{2}}\\), \\(e^{i3\\pi/4} = \\frac{-1+i}{\\sqrt{2}}\\), \\(e^{i5\\pi/4} = \\frac{-1-i}{\\sqrt{2}}\\), \\(e^{i7\\pi/4} = \\frac{1-i}{\\sqrt{2}}\\). None is real since all have nonzero imaginary parts.'
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
<h2>Morera's Theorem: The Converse of Cauchy</h2>

<div class="env-block intuition">
    <div class="env-title">Testing Analyticity via Integration</div>
    <div class="env-body">
        <p>Cauchy's theorem says: if \\(f\\) is analytic on a domain \\(D\\), then \\(\\oint_\\gamma f\\,dz = 0\\) for every closed contour in \\(D\\). Morera's theorem is the converse: if \\(f\\) is continuous and all contour integrals vanish, then \\(f\\) is analytic. This provides a powerful indirect method for establishing analyticity.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.5 (Morera's Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) be continuous on a domain \\(D\\). If \\(\\oint_T f(z)\\,dz = 0\\) for every triangle \\(T\\) contained in \\(D\\), then \\(f\\) is analytic on \\(D\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>It suffices to show \\(f\\) is analytic on each disk \\(B(z_0, r) \\subset D\\). Fix such a disk. Define</p>
        \\[
        F(z) = \\int_{z_0}^{z} f(\\zeta)\\,d\\zeta
        \\]
        <p>where the integral is along the straight line from \\(z_0\\) to \\(z\\) (the path is inside the convex disk). The hypothesis that triangular integrals vanish implies \\(F\\) is well-defined (path-independent within the disk).</p>
        <p>We claim \\(F'(z) = f(z)\\). Indeed, for small \\(h\\),</p>
        \\[
        \\frac{F(z+h) - F(z)}{h} = \\frac{1}{h}\\int_z^{z+h} f(\\zeta)\\,d\\zeta.
        \\]
        <p>Since \\(f\\) is continuous at \\(z\\), for any \\(\\varepsilon > 0\\) we have \\(|f(\\zeta) - f(z)| < \\varepsilon\\) when \\(|\\zeta - z| < \\delta\\), so</p>
        \\[
        \\left|\\frac{F(z+h) - F(z)}{h} - f(z)\\right| = \\left|\\frac{1}{h}\\int_z^{z+h} (f(\\zeta) - f(z))\\,d\\zeta\\right| \\leq \\varepsilon.
        \\]
        <p>Thus \\(F'(z) = f(z)\\). So \\(F\\) is analytic on the disk, and therefore \\(f = F'\\) is also analytic (derivatives of analytic functions are analytic, by Cauchy's formula for derivatives).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Application: Limits of Analytic Functions</div>
    <div class="env-body">
        <p>If \\(\\{f_n\\}\\) is a sequence of analytic functions on \\(D\\) converging uniformly on compact subsets to \\(f\\), then \\(f\\) is analytic. This follows from Morera: uniform convergence lets us pass the limit inside the integral, and each \\(\\oint_T f_n\\,dz = 0\\), so \\(\\oint_T f\\,dz = 0\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-morera-test"></div>
`,
            visualizations: [
                {
                    id: 'viz-morera-test',
                    title: "Morera's Test: Draw a Contour",
                    description: 'Test whether a function is analytic by checking if contour integrals vanish. Draw a closed triangular path on the plane and see the integral value. For analytic functions it should be zero; for non-analytic ones (like conjugation) it will be nonzero.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 50, originX: 280, originY: 200
                        });

                        var funcIdx = 0;
                        var funcs = [
                            {
                                name: 'f(z) = z^2 (analytic)',
                                fn: function(re, im) { return [re*re - im*im, 2*re*im]; },
                                analytic: true
                            },
                            {
                                name: 'f(z) = conj(z) (NOT analytic)',
                                fn: function(re, im) { return [re, -im]; },
                                analytic: false
                            },
                            {
                                name: 'f(z) = e^z (analytic)',
                                fn: function(re, im) {
                                    var r = Math.exp(re);
                                    return [r * Math.cos(im), r * Math.sin(im)];
                                },
                                analytic: true
                            },
                            {
                                name: 'f(z) = |z|^2 = z*conj(z) (NOT analytic)',
                                fn: function(re, im) { return [re*re + im*im, 0]; },
                                analytic: false
                            }
                        ];

                        // Triangle vertices (draggable)
                        var triA = viz.addDraggable('a', 0, 2, viz.colors.blue, 7);
                        var triB = viz.addDraggable('b', -1.5, -1, viz.colors.blue, 7);
                        var triC = viz.addDraggable('c', 1.5, -1, viz.colors.blue, 7);

                        VizEngine.createButton(controls, 'Next function', function() {
                            funcIdx = (funcIdx + 1) % funcs.length;
                        });

                        function integrateTriangle(f, ax, ay, bx, by, cx, cy, steps) {
                            // Numerically integrate f along triangle a->b->c->a
                            var sumR = 0, sumI = 0;
                            var segs = [[ax,ay,bx,by],[bx,by,cx,cy],[cx,cy,ax,ay]];
                            for (var s = 0; s < 3; s++) {
                                var x0 = segs[s][0], y0 = segs[s][1], x1 = segs[s][2], y1 = segs[s][3];
                                for (var i = 0; i < steps; i++) {
                                    var t = (i + 0.5) / steps;
                                    var xm = x0 + t * (x1 - x0);
                                    var ym = y0 + t * (y1 - y0);
                                    var fv = f(xm, ym);
                                    var dx = (x1 - x0) / steps;
                                    var dy = (y1 - y0) / steps;
                                    // f * dz = (u + iv)(dx + i dy) = (u dx - v dy) + i(v dx + u dy)
                                    sumR += fv[0] * dx - fv[1] * dy;
                                    sumI += fv[1] * dx + fv[0] * dy;
                                }
                            }
                            return [sumR, sumI];
                        }

                        function drawFrame() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var cur = funcs[funcIdx];

                            // Draw triangle
                            viz.drawPolygon(
                                [[triA.x, triA.y], [triB.x, triB.y], [triC.x, triC.y]],
                                viz.colors.blue + '15', viz.colors.blue, 2
                            );

                            // Arrows along edges
                            var edges = [[triA, triB], [triB, triC], [triC, triA]];
                            for (var e = 0; e < 3; e++) {
                                var p = edges[e][0], q = edges[e][1];
                                var mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
                                var dx = q.x - p.x, dy = q.y - p.y;
                                var len = Math.sqrt(dx*dx + dy*dy);
                                if (len > 0.01) {
                                    var ax2 = mx + dx / len * 0.15;
                                    var ay2 = my + dy / len * 0.15;
                                    viz.drawVector(mx - dx/len*0.15, my - dy/len*0.15, ax2, ay2, viz.colors.blue + 'aa', null, 1.5);
                                }
                            }

                            viz.drawDraggables();

                            // Compute integral
                            var intVal = integrateTriangle(cur.fn, triA.x, triA.y, triB.x, triB.y, triC.x, triC.y, 200);
                            var mag = Math.sqrt(intVal[0]*intVal[0] + intVal[1]*intVal[1]);

                            // Display
                            var ctx = viz.ctx;
                            ctx.fillStyle = 'rgba(12,12,32,0.8)';
                            ctx.fillRect(0, 0, viz.width, 28);
                            viz.screenText(cur.name, viz.width / 2, 14, viz.colors.white, 12);

                            var intStr = intVal[0].toFixed(4) + (intVal[1] >= 0 ? ' + ' : ' - ') + Math.abs(intVal[1]).toFixed(4) + 'i';
                            var col = mag < 0.01 ? viz.colors.green : viz.colors.red;
                            viz.screenText('\u222E f dz = ' + intStr, viz.width / 2, viz.height - 30, col, 13);
                            viz.screenText(
                                mag < 0.01 ? 'Integral \u2248 0 : consistent with analyticity' : 'Integral \u2260 0 : NOT analytic (Morera fails)',
                                viz.width / 2, viz.height - 12, col, 11
                            );
                        }

                        viz.animate(function() { drawFrame(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(f(z) = \\overline{z}\\) fails Morera\'s test. Compute \\(\\oint_T \\overline{z}\\,dz\\) for the triangle with vertices \\(0, 1, i\\).',
                    hint: 'Parameterize each edge and compute. Along the edge from \\(0\\) to \\(1\\): \\(z = t\\), \\(dz = dt\\), \\(\\overline{z} = t\\).',
                    solution: 'Edge \\(0 \\to 1\\): \\(\\int_0^1 t\\,dt = 1/2\\). Edge \\(1 \\to i\\): \\(z = 1 + t(i-1)\\), \\(\\overline{z} = 1 + t(-i-1)\\), \\(dz = (i-1)dt\\). \\(\\int_0^1 (1-t-ti)(i-1)dt = (i-1)\\int_0^1(1-t)dt + (-i)(i-1)\\int_0^1 t\\,dt = (i-1)/2 + (1+i)/2 = i\\). Edge \\(i \\to 0\\): \\(z = i(1-t)\\), \\(\\overline{z} = -i(1-t)\\), \\(dz = -i\\,dt\\). \\(\\int_0^1 -i(1-t)(-i)dt = -\\int_0^1(1-t)dt = -1/2\\). Total: \\(1/2 + i - 1/2 = i \\neq 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: The Schwarz Lemma
        // ================================================================
        {
            id: 'sec-schwarz',
            title: 'The Schwarz Lemma',
            content: `
<h2>The Schwarz Lemma</h2>

<div class="env-block intuition">
    <div class="env-title">A Rigidity Principle for the Disk</div>
    <div class="env-body">
        <p>The Schwarz lemma quantifies the following idea: an analytic map from the unit disk to itself that fixes the origin cannot "stretch" distances. It either strictly contracts everything, or it is a rotation. This is a remarkably strong constraint on analytic self-maps of the disk.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.6 (Schwarz Lemma)</div>
    <div class="env-body">
        <p>Let \\(f: \\mathbb{D} \\to \\mathbb{D}\\) be analytic with \\(f(0) = 0\\), where \\(\\mathbb{D} = \\{z : |z| < 1\\}\\). Then:</p>
        <ol>
            <li>\\(|f(z)| \\leq |z|\\) for all \\(z \\in \\mathbb{D}\\).</li>
            <li>\\(|f'(0)| \\leq 1\\).</li>
            <li>If \\(|f(z_0)| = |z_0|\\) for some \\(z_0 \\neq 0\\), or if \\(|f'(0)| = 1\\), then \\(f(z) = e^{i\\theta}z\\) for some \\(\\theta \\in \\mathbb{R}\\) (\\(f\\) is a rotation).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Since \\(f(0) = 0\\), define \\(g(z) = f(z)/z\\) for \\(z \\neq 0\\) and \\(g(0) = f'(0)\\). Then \\(g\\) is analytic on \\(\\mathbb{D}\\) (the singularity at 0 is removable).</p>
        <p>On \\(|z| = r < 1\\), we have \\(|f(z)| < 1\\) (since \\(f\\) maps to \\(\\mathbb{D}\\)), so \\(|g(z)| = |f(z)|/r < 1/r\\). By the maximum modulus principle, \\(|g(z)| \\leq 1/r\\) on \\(|z| \\leq r\\). Letting \\(r \\to 1^-\\), we get \\(|g(z)| \\leq 1\\) for all \\(z \\in \\mathbb{D}\\).</p>
        <p>This gives \\(|f(z)| \\leq |z|\\) and \\(|f'(0)| = |g(0)| \\leq 1\\). If equality holds at any interior point, the maximum modulus principle forces \\(g\\) to be constant of modulus 1, i.e., \\(g(z) = e^{i\\theta}\\), so \\(f(z) = e^{i\\theta}z\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Schwarz-Pick Lemma</div>
    <div class="env-body">
        <p>The Schwarz-Pick generalization drops the hypothesis \\(f(0) = 0\\). For any analytic \\(f: \\mathbb{D} \\to \\mathbb{D}\\), the hyperbolic distance is contracted:</p>
        \\[
        \\frac{|f'(z)|}{1 - |f(z)|^2} \\leq \\frac{1}{1 - |z|^2}.
        \\]
        <p>Equality holds if and only if \\(f\\) is a Mobius automorphism of \\(\\mathbb{D}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-schwarz-lemma"></div>
`,
            visualizations: [
                {
                    id: 'viz-schwarz-lemma',
                    title: 'Schwarz Lemma: Contraction in the Unit Disk',
                    description: 'An analytic self-map of the disk fixing the origin contracts. Drag the point z inside the unit disk and see that |f(z)| <= |z|. The blue circle is |z|, the green circle is |f(z)|. When f is a rotation, the circles coincide.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 140, originX: 280, originY: 195
                        });

                        var funcIdx = 0;
                        var funcs = [
                            {
                                name: 'f(z) = z^2 (strict contraction)',
                                fn: function(x, y) { return [x*x - y*y, 2*x*y]; }
                            },
                            {
                                name: 'f(z) = z^3',
                                fn: function(x, y) {
                                    var r2 = x*x - y*y, i2 = 2*x*y;
                                    return [r2*x - i2*y, r2*y + i2*x];
                                }
                            },
                            {
                                name: 'f(z) = e^{i\u03C0/4} z (rotation, equality)',
                                fn: function(x, y) {
                                    var c = Math.cos(Math.PI/4), s = Math.sin(Math.PI/4);
                                    return [c*x - s*y, s*x + c*y];
                                }
                            },
                            {
                                name: 'f(z) = z/2',
                                fn: function(x, y) { return [x/2, y/2]; }
                            }
                        ];

                        VizEngine.createButton(controls, 'Next function', function() {
                            funcIdx = (funcIdx + 1) % funcs.length;
                        });

                        var pt = viz.addDraggable('z', 0.5, 0.3, viz.colors.blue, 8);

                        function drawFrame() {
                            viz.clear();

                            // Clip point to disk
                            var r = Math.sqrt(pt.x*pt.x + pt.y*pt.y);
                            if (r > 0.95) { pt.x *= 0.95/r; pt.y *= 0.95/r; r = 0.95; }

                            // Unit disk
                            viz.drawCircle(0, 0, 1, viz.colors.grid + '33', viz.colors.axis, 1.5);

                            var cur = funcs[funcIdx];
                            var fv = cur.fn(pt.x, pt.y);
                            var fr = Math.sqrt(fv[0]*fv[0] + fv[1]*fv[1]);

                            // |z| circle
                            if (r > 0.01) {
                                viz.drawCircle(0, 0, r, null, viz.colors.blue + '44', 1);
                            }
                            // |f(z)| circle
                            if (fr > 0.01) {
                                viz.drawCircle(0, 0, fr, null, viz.colors.green + '44', 1);
                            }

                            // Draw z and f(z)
                            viz.drawSegment(0, 0, pt.x, pt.y, viz.colors.blue + '66', 1, true);
                            viz.drawPoint(pt.x, pt.y, viz.colors.blue, 'z', 6);

                            viz.drawSegment(0, 0, fv[0], fv[1], viz.colors.green + '66', 1, true);
                            viz.drawPoint(fv[0], fv[1], viz.colors.green, 'f(z)', 6);

                            viz.drawPoint(0, 0, viz.colors.white, '0', 4);

                            viz.drawDraggables();

                            // Info
                            var ctx = viz.ctx;
                            ctx.fillStyle = 'rgba(12,12,32,0.8)';
                            ctx.fillRect(0, 0, viz.width, 26);
                            viz.screenText(cur.name, viz.width / 2, 13, viz.colors.white, 12);

                            viz.screenText(
                                '|z| = ' + r.toFixed(3) + '    |f(z)| = ' + fr.toFixed(3) +
                                '    ratio = ' + (r > 0.001 ? (fr/r).toFixed(3) : 'N/A'),
                                viz.width / 2, viz.height - 25, viz.colors.teal, 12
                            );
                            viz.screenText(
                                fr <= r + 0.001 ? '|f(z)| \u2264 |z| \u2713  Schwarz satisfied' : '(point outside disk)',
                                viz.width / 2, viz.height - 8, fr <= r + 0.001 ? viz.colors.green : viz.colors.red, 11
                            );
                        }

                        viz.animate(function() { drawFrame(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f: \\mathbb{D} \\to \\mathbb{D}\\) be analytic with \\(f(0) = 0\\) and \\(f(1/2) = 1/2\\). What can you conclude about \\(f\\)?',
                    hint: 'Apply the equality case of the Schwarz lemma with \\(z_0 = 1/2\\).',
                    solution: 'Since \\(|f(1/2)| = 1/2 = |1/2|\\), the equality case of the Schwarz lemma forces \\(f(z) = e^{i\\theta}z\\) for some \\(\\theta\\). But \\(f(1/2) = e^{i\\theta}/2 = 1/2\\), so \\(e^{i\\theta} = 1\\). Thus \\(f(z) = z\\) (the identity).'
                },
            ]
        },

        // ================================================================
        // SECTION 6: The Identity Theorem
        // ================================================================
        {
            id: 'sec-identity',
            title: 'The Identity Theorem',
            content: `
<h2>The Identity Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Zeros Cannot Accumulate</div>
    <div class="env-body">
        <p>A non-constant analytic function on a connected domain has <em>isolated</em> zeros: each zero has a neighborhood containing no other zeros. Equivalently, the zero set cannot have a limit point inside the domain. This is the key to the identity theorem: if two analytic functions agree at a sequence of points with a limit point, they must agree everywhere.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.7 (Isolated Zeros)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a connected domain \\(D\\) and not identically zero. Then the zeros of \\(f\\) are isolated: for every zero \\(z_0\\), there exists \\(r > 0\\) such that \\(f(z) \\neq 0\\) for \\(0 < |z - z_0| < r\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Suppose \\(f(z_0) = 0\\). Since \\(f\\) is not identically zero on \\(D\\), there is a smallest positive integer \\(m\\) such that \\(f^{(m)}(z_0) \\neq 0\\). (If all derivatives were zero, the Taylor series would be identically zero, and by the identity theorem for power series, \\(f \\equiv 0\\) on the disk of convergence, hence on all of \\(D\\) by connectedness.)</p>
        <p>Write \\(f(z) = (z - z_0)^m g(z)\\) where \\(g\\) is analytic and \\(g(z_0) = f^{(m)}(z_0)/m! \\neq 0\\). By continuity of \\(g\\), there exists \\(r > 0\\) with \\(g(z) \\neq 0\\) on \\(|z - z_0| < r\\). Hence \\(f(z) \\neq 0\\) for \\(0 < |z - z_0| < r\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.8 (Identity Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) and \\(g\\) be analytic on a connected domain \\(D\\). If \\(\\{z \\in D : f(z) = g(z)\\}\\) has a limit point in \\(D\\), then \\(f \\equiv g\\) on \\(D\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Apply the isolated zeros theorem to \\(h = f - g\\). If \\(h\\) is not identically zero, its zeros are isolated, so they cannot have a limit point in \\(D\\). Contradiction.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Application: Analytic Continuation is Unique</div>
    <div class="env-body">
        <p>If \\(f\\) and \\(g\\) are both analytic on \\(D\\) and agree on a curve \\(\\gamma \\subset D\\) (which contains limit points of itself), then \\(f \\equiv g\\). This is why analytic continuation, when it exists, is unique.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-identity-zeros"></div>
`,
            visualizations: [
                {
                    id: 'viz-identity-zeros',
                    title: 'Identity Theorem: Accumulating Zeros Force f = 0',
                    description: 'Visualize how zeros of an analytic function must be isolated. If zeros accumulate (have a limit point), the function must be identically zero. Click to place zeros and see if the configuration is possible for a non-constant analytic function.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 60, originX: 280, originY: 190
                        });

                        var mode = 0; // 0: sin(pi*z) isolated, 1: sin(n*pi*z) accumulating at 0
                        var animT = 0;

                        var modeNames = [
                            'sin(\u03C0z): zeros at integers (isolated)',
                            'zeros of f_n converging to 0 (accumulation => f\u22610)',
                            'z*sin(\u03C0/z): zeros at 1/n accumulate at 0 (not analytic at 0!)'
                        ];

                        VizEngine.createButton(controls, 'Next example', function() {
                            mode = (mode + 1) % 3;
                            animT = 0;
                        });

                        function drawFrame(t) {
                            animT = t / 1000;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            if (mode === 0) {
                                // sin(pi*z): zeros at all integers, clearly isolated
                                viz.drawFunction(function(x) { return Math.sin(Math.PI * x); }, -4.5, 4.5, viz.colors.teal, 2);
                                for (var n = -4; n <= 4; n++) {
                                    viz.drawPoint(n, 0, viz.colors.red, null, 5);
                                    // Small circle showing isolation
                                    viz.drawCircle(n, 0, 0.4, null, viz.colors.red + '44', 1);
                                }
                                viz.screenText('Each zero has a neighborhood with no other zeros', viz.width / 2, viz.height - 12, viz.colors.green, 11);
                            } else if (mode === 1) {
                                // Show zeros of z, z/2, z/3,... converging to 0
                                var nPts = Math.min(20, Math.floor(animT * 3) + 3);
                                for (var k = 1; k <= nPts; k++) {
                                    var zx = 1 / k;
                                    viz.drawPoint(zx, 0, viz.colors.red, null, 4);
                                }
                                viz.drawPoint(0, 0, viz.colors.yellow, '0 (limit point)', 7);
                                // Highlight: no disk around 0 is zero-free
                                var rr = 1 / nPts;
                                viz.drawCircle(0, 0, rr * 2, null, viz.colors.yellow + '66', 1);
                                viz.screenText('Zeros: 1, 1/2, 1/3, ... accumulate at 0', viz.width / 2, 20, viz.colors.white, 12);
                                viz.screenText('If f is analytic on a domain containing 0, then f \u2261 0', viz.width / 2, viz.height - 12, viz.colors.red, 11);
                            } else {
                                // z sin(pi/z): zeros at 1/n accumulate at 0, but NOT analytic at 0
                                viz.drawFunction(function(x) {
                                    if (Math.abs(x) < 0.01) return 0;
                                    return x * Math.sin(Math.PI / x);
                                }, -4.5, -0.05, viz.colors.purple, 2);
                                viz.drawFunction(function(x) {
                                    if (Math.abs(x) < 0.01) return 0;
                                    return x * Math.sin(Math.PI / x);
                                }, 0.05, 4.5, viz.colors.purple, 2);
                                for (var m = 1; m <= 12; m++) {
                                    viz.drawPoint(1/m, 0, viz.colors.red, null, 3);
                                    viz.drawPoint(-1/m, 0, viz.colors.red, null, 3);
                                }
                                viz.drawPoint(0, 0, viz.colors.yellow, '(essential singularity)', 6);
                                viz.screenText('z sin(\u03C0/z): zeros accumulate at 0, but f is NOT analytic at 0', viz.width / 2, viz.height - 12, viz.colors.orange, 11);
                            }

                            ctx.fillStyle = 'rgba(12,12,32,0.75)';
                            ctx.fillRect(0, 0, viz.width, 28);
                            viz.screenText(modeNames[mode], viz.width / 2, 14, viz.colors.white, 12);
                        }

                        viz.animate(drawFrame);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f\\) be analytic on \\(\\mathbb{C}\\) and suppose \\(f(1/n) = 1/n^2\\) for all positive integers \\(n\\). Determine \\(f\\).',
                    hint: 'Consider \\(g(z) = f(z) - z^2\\). Where are the zeros of \\(g\\)?',
                    solution: 'Let \\(g(z) = f(z) - z^2\\). Then \\(g(1/n) = 0\\) for all positive integers \\(n\\). The sequence \\(1/n \\to 0\\), so the zeros of \\(g\\) have a limit point at 0. By the identity theorem, \\(g \\equiv 0\\), so \\(f(z) = z^2\\).'
                },
                {
                    question: 'Show that \\(\\sin^2 z + \\cos^2 z = 1\\) for all \\(z \\in \\mathbb{C}\\) using the identity theorem.',
                    hint: 'The identity holds on the real line, which contains limit points.',
                    solution: 'Let \\(f(z) = \\sin^2 z + \\cos^2 z - 1\\). Then \\(f\\) is entire. On the real axis, \\(f(x) = 0\\) for all \\(x \\in \\mathbb{R}\\). The real axis has limit points in \\(\\mathbb{C}\\), so by the identity theorem, \\(f \\equiv 0\\) on \\(\\mathbb{C}\\). Hence \\(\\sin^2 z + \\cos^2 z = 1\\) for all \\(z\\).'
                },
            ]
        },

        // ================================================================
        // SECTION 7: Bridge — The Open Mapping Theorem and What Comes Next
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Open Mapping & Bridge',
            content: `
<h2>The Open Mapping Theorem and What Comes Next</h2>

<div class="env-block intuition">
    <div class="env-title">Analytic Functions Are Open Maps</div>
    <div class="env-body">
        <p>The open mapping theorem says that a non-constant analytic function maps open sets to open sets. This is a topological consequence of the rigidity we have been studying. In real analysis, this fails dramatically: \\(f(x) = x^2\\) maps the open interval \\((-1, 1)\\) to the half-open interval \\([0, 1)\\), which is not open.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 7.9 (Open Mapping Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) be a non-constant analytic function on a connected domain \\(D\\). Then \\(f\\) is an <strong>open map</strong>: if \\(U \\subseteq D\\) is open, then \\(f(U)\\) is open.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof sketch</div>
    <div class="env-body">
        <p>Let \\(w_0 = f(z_0)\\) for some \\(z_0 \\in U\\). We need to show \\(w_0\\) is an interior point of \\(f(U)\\). Write \\(f(z) - w_0 = (z - z_0)^m g(z)\\) where \\(g(z_0) \\neq 0\\) and \\(m \\geq 1\\). Choose \\(r > 0\\) small enough that \\(g\\) has no zeros on \\(\\overline{B(z_0, r)} \\subset U\\) and \\(f(z) \\neq w_0\\) for \\(0 < |z - z_0| \\leq r\\).</p>
        <p>Let \\(\\delta = \\min_{|z - z_0| = r} |f(z) - w_0| > 0\\). For any \\(w\\) with \\(|w - w_0| < \\delta\\), the function \\(f(z) - w\\) has the same number of zeros (counted with multiplicity) inside \\(|z - z_0| < r\\) as \\(f(z) - w_0\\), by Rouche's theorem (or the argument principle). That number is \\(m \\geq 1\\), so \\(w \\in f(U)\\). Thus \\(B(w_0, \\delta) \\subset f(U)\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Immediate Consequences</h3>

<div class="env-block theorem">
    <div class="env-title">Corollary 7.10 (Maximum Modulus Principle)</div>
    <div class="env-body">
        <p>If \\(f\\) is non-constant and analytic on a connected domain \\(D\\), then \\(|f|\\) has no local maximum in \\(D\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>If \\(|f|\\) had a local max at \\(z_0\\), then near \\(z_0\\), the image \\(f(U)\\) would be contained in the closed disk \\(|w| \\leq |f(z_0)|\\). But by the open mapping theorem, \\(f(U)\\) is open and contains \\(f(z_0)\\), so it must contain points with \\(|w| > |f(z_0)|\\). Contradiction.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Where We Are Headed</div>
    <div class="env-body">
        <p>This chapter has shown that Cauchy's formula, through a series of elegant consequences, establishes the fundamental rigidity of analytic functions:</p>
        <ul>
            <li><strong>Liouville:</strong> bounded + entire = constant.</li>
            <li><strong>FTA:</strong> \\(\\mathbb{C}\\) is algebraically closed.</li>
            <li><strong>Morera:</strong> continuous + vanishing integrals = analytic.</li>
            <li><strong>Schwarz:</strong> analytic maps of the disk contract.</li>
            <li><strong>Identity:</strong> determined by values on any convergent sequence.</li>
            <li><strong>Open mapping:</strong> non-constant analytic maps are open.</li>
        </ul>
        <p>In the next chapters, we turn to <strong>sequences, series, and power series</strong> (Chapters 8-9), where the analyticity = power series equivalence becomes the central theme, followed by <strong>Laurent series and singularities</strong> (Chapter 10), leading to the <strong>residue theorem</strong> (Chapter 11).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-open-mapping"></div>
`,
            visualizations: [
                {
                    id: 'viz-open-mapping',
                    title: 'Open Mapping Theorem',
                    description: 'Visualize how an analytic function maps an open disk to an open region. The left panel shows the domain (an open disk), and the right panel shows its image under f. The image is always open for non-constant analytic f.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 1, originX: 0, originY: 0
                        });

                        var funcIdx = 0;
                        var funcs = [
                            {
                                name: 'f(z) = z^2',
                                fn: function(x, y) { return [x*x - y*y, 2*x*y]; }
                            },
                            {
                                name: 'f(z) = z^3',
                                fn: function(x, y) {
                                    var r2 = x*x - y*y, i2 = 2*x*y;
                                    return [r2*x - i2*y, r2*y + i2*x];
                                }
                            },
                            {
                                name: 'f(z) = e^z',
                                fn: function(x, y) {
                                    var r = Math.exp(x);
                                    return [r * Math.cos(y), r * Math.sin(y)];
                                }
                            },
                            {
                                name: 'f(z) = z + 1/z (|z|>0.3)',
                                fn: function(x, y) {
                                    var r2 = x*x + y*y;
                                    if (r2 < 0.01) return [x, y];
                                    return [x + x/r2, y - y/r2];
                                }
                            }
                        ];

                        VizEngine.createButton(controls, 'Next function', function() {
                            funcIdx = (funcIdx + 1) % funcs.length;
                            draw();
                        });

                        // Disk center and radius
                        var cx = 0.5, cy = 0.3, rad = 0.8;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cur = funcs[funcIdx];

                            var leftW = viz.width / 2 - 10;
                            var rightX = viz.width / 2 + 10;
                            var rightW = viz.width / 2 - 10;

                            // --- Left panel: domain ---
                            var lScale = leftW / 6;
                            var lOx = leftW / 2, lOy = viz.height / 2;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = -3; gx <= 3; gx++) {
                                var sx = lOx + gx * lScale;
                                ctx.beginPath(); ctx.moveTo(sx, 30); ctx.lineTo(sx, viz.height - 10); ctx.stroke();
                            }
                            for (var gy = -2; gy <= 2; gy++) {
                                var sy = lOy - gy * lScale;
                                ctx.beginPath(); ctx.moveTo(10, sy); ctx.lineTo(leftW - 10, sy); ctx.stroke();
                            }
                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(10, lOy); ctx.lineTo(leftW - 10, lOy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(lOx, 30); ctx.lineTo(lOx, viz.height - 10); ctx.stroke();

                            // Open disk
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.beginPath();
                            ctx.arc(lOx + cx * lScale, lOy - cy * lScale, rad * lScale, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 4]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // --- Right panel: image ---
                            // Sample points in the disk and map them
                            var rOx = rightX + rightW / 2, rOy = viz.height / 2;
                            var rScale = rightW / 8;

                            // Right grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx2 = -4; gx2 <= 4; gx2++) {
                                var sx2 = rOx + gx2 * rScale;
                                if (sx2 > rightX && sx2 < viz.width - 5) {
                                    ctx.beginPath(); ctx.moveTo(sx2, 30); ctx.lineTo(sx2, viz.height - 10); ctx.stroke();
                                }
                            }
                            for (var gy2 = -3; gy2 <= 3; gy2++) {
                                var sy2 = rOy - gy2 * rScale;
                                ctx.beginPath(); ctx.moveTo(rightX + 5, sy2); ctx.lineTo(viz.width - 5, sy2); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(rightX + 5, rOy); ctx.lineTo(viz.width - 5, rOy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rOx, 30); ctx.lineTo(rOx, viz.height - 10); ctx.stroke();

                            // Map boundary of disk
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            var steps = 200;
                            for (var i = 0; i <= steps; i++) {
                                var theta = 2 * Math.PI * i / steps;
                                var px = cx + rad * Math.cos(theta);
                                var py = cy + rad * Math.sin(theta);
                                var fv = cur.fn(px, py);
                                var fsx = rOx + fv[0] * rScale;
                                var fsy = rOy - fv[1] * rScale;
                                if (i === 0) ctx.moveTo(fsx, fsy);
                                else ctx.lineTo(fsx, fsy);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green + '15';
                            ctx.fill();

                            // Map some interior points
                            ctx.fillStyle = viz.colors.teal + '66';
                            for (var si = 0; si < 300; si++) {
                                var angle = Math.random() * 2 * Math.PI;
                                var rr = Math.sqrt(Math.random()) * rad * 0.95;
                                var spx = cx + rr * Math.cos(angle);
                                var spy = cy + rr * Math.sin(angle);
                                var sfv = cur.fn(spx, spy);
                                var ssx = rOx + sfv[0] * rScale;
                                var ssy = rOy - sfv[1] * rScale;
                                ctx.beginPath();
                                ctx.arc(ssx, ssy, 1.5, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Labels
                            ctx.fillStyle = 'rgba(12,12,32,0.8)';
                            ctx.fillRect(0, 0, viz.width, 26);
                            viz.screenText(cur.name, viz.width / 2, 13, viz.colors.white, 12);

                            viz.screenText('Domain (open disk)', leftW / 2, viz.height - 5, viz.colors.blue, 11);
                            viz.screenText('Image (open!)', rightX + rightW / 2, viz.height - 5, viz.colors.green, 11);

                            // Divider
                            ctx.strokeStyle = viz.colors.axis + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(viz.width / 2, 0);
                            ctx.lineTo(viz.width / 2, viz.height);
                            ctx.stroke();

                            // Arrow
                            viz.screenText('\u2192', viz.width / 2, viz.height / 2, viz.colors.white, 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the open mapping theorem to give a one-line proof of the maximum modulus principle: if \\(f\\) is non-constant and analytic on a domain \\(D\\), then \\(|f|\\) attains no maximum in \\(D\\).',
                    hint: 'If \\(|f|\\) had a max at \\(z_0\\), what would that say about the image of a small neighborhood of \\(z_0\\)?',
                    solution: 'If \\(|f(z)| \\leq |f(z_0)|\\) for \\(z\\) near \\(z_0\\), then \\(f(U)\\) for a small neighborhood \\(U\\) of \\(z_0\\) is contained in the closed disk \\(\\overline{B(0, |f(z_0)|)}\\). But \\(f(U)\\) is open (open mapping theorem) and contains \\(f(z_0)\\) on the boundary of that disk, so \\(f(U)\\) must extend beyond the disk. Contradiction.'
                },
                {
                    question: 'Show that a non-constant analytic function cannot map an open set onto a single point.',
                    hint: 'The image of an open set under an open map is open.',
                    solution: 'By the open mapping theorem, the image of any open set under a non-constant analytic function is open. A single point is not open in \\(\\mathbb{C}\\).'
                },
            ]
        }
    ]
});
