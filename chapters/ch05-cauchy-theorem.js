window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: "Cauchy's Theorem",
    subtitle: 'The most important theorem in complex analysis',
    sections: [

        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Motivation: Why Contour Integrals Vanish</h2>

<div class="env-block intuition">
    <div class="env-title">A Surprising Observation</div>
    <div class="env-body">
        <p>Compute the integral of \\(f(z) = z^2\\) around the unit circle \\(\\gamma(t) = e^{it}\\), \\(t \\in [0, 2\\pi]\\). Parametrize: \\(dz = ie^{it}\\,dt\\), so</p>
        \\[\\oint_\\gamma z^2\\,dz = \\int_0^{2\\pi} e^{2it} \\cdot ie^{it}\\,dt = i\\int_0^{2\\pi} e^{3it}\\,dt = i \\cdot \\frac{e^{3it}}{3i}\\Big|_0^{2\\pi} = 0.\\]
        <p>Try \\(f(z) = z^n\\) for any integer \\(n \\neq -1\\): the answer is still zero. Something deeper is going on.</p>
    </div>
</div>

<p>In real analysis, \\(\\int_a^b f(x)\\,dx\\) depends on every value \\(f\\) takes on \\([a,b]\\). Contour integrals in the complex plane behave very differently: if \\(f\\) is <em>holomorphic</em> (complex-differentiable) on and inside a closed curve, the integral is exactly zero. This is Cauchy's theorem, and it is the cornerstone of the entire subject.</p>

<h3>Why Should We Believe This?</h3>

<p>Holomorphicity is an extraordinarily rigid condition. The Cauchy-Riemann equations \\(u_x = v_y\\), \\(u_y = -v_x\\) interlock the real and imaginary parts so tightly that specifying \\(f\\) on any open set determines it everywhere (by analytic continuation). Cauchy's theorem is one face of this rigidity: a holomorphic function has no "room" to accumulate net circulation around a closed loop.</p>

<p>Concretely, recall from Green's theorem that for \\(f = u + iv\\),</p>
\\[\\oint_\\gamma f(z)\\,dz = \\oint_\\gamma (u\\,dx - v\\,dy) + i\\oint_\\gamma (v\\,dx + u\\,dy).\\]
<p>Each piece is a real line integral; Green's theorem converts each to an area integral over the region \\(D\\) enclosed by \\(\\gamma\\):</p>
\\[= \\iint_D \\!\\left(-v_x - u_y\\right)dA + i\\iint_D \\!\\left(u_x - v_y\\right)dA.\\]
<p>The Cauchy-Riemann equations make both integrands identically zero. This is Cauchy's theorem at the level of intuition; making it rigorous requires care about smoothness assumptions.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Cauchy stated the theorem in 1814 but assumed \\(f'\\) was <em>continuous</em>. This is enough to apply Green's theorem directly. In 1883, Édouard Goursat gave a proof requiring only that \\(f\\) be holomorphic (complex-differentiable), without assuming continuity of the derivative — a genuinely harder result. The theorem in full generality is therefore called the <strong>Cauchy-Goursat theorem</strong>.</p>
    </div>
</div>

<h3>What This Chapter Proves</h3>
<ol>
    <li><strong>Cauchy-Goursat (triangle version):</strong> If \\(f\\) is holomorphic on a closed triangle \\(T\\), then \\(\\oint_{\\partial T} f\\,dz = 0\\).</li>
    <li><strong>Simply connected domains:</strong> If \\(f\\) is holomorphic on a simply connected open set \\(U\\), then \\(\\oint_\\gamma f\\,dz = 0\\) for every closed curve \\(\\gamma\\) in \\(U\\).</li>
    <li><strong>Deformation of contours:</strong> Two homotopic contours give the same integral.</li>
    <li><strong>Multiply connected domains:</strong> On an annulus, the integral depends only on how many times \\(\\gamma\\) winds around each hole.</li>
    <li><strong>Cauchy's Integral Formula:</strong> The value of \\(f\\) at any interior point is determined by its values on a surrounding contour.</li>
</ol>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify directly that \\(\\oint_{|z|=1} z^n\\,dz = 0\\) for \\(n = 0, 1, 2, 3\\) by parametrizing \\(z = e^{it}\\).',
                    hint: 'After substituting \\(z = e^{it}\\), \\(dz = ie^{it}\\,dt\\), you get \\(i\\int_0^{2\\pi} e^{(n+1)it}\\,dt\\). When does this vanish?',
                    solution: 'For \\(n \\neq -1\\), \\(\\int_0^{2\\pi} e^{(n+1)it}\\,dt = \\frac{e^{(n+1)it}}{(n+1)i}\\big|_0^{2\\pi} = 0\\) since \\(e^{2\\pi i(n+1)} = 1\\). For \\(n = -1\\), the integrand is \\(e^0 = 1\\) and the integral is \\(2\\pi i \\neq 0\\). This single exception — the \\(1/z\\) singularity — is the source of residues.'
                },
                {
                    question: 'Use the Cauchy-Riemann equations to verify the Green\'s theorem argument: if \\(u_x = v_y\\) and \\(u_y = -v_x\\), show both area integrands in the motivation section are zero.',
                    hint: 'The first integrand is \\(-v_x - u_y\\); substitute from the CR equations.',
                    solution: 'First integrand: \\(-v_x - u_y\\). The CR equation \\(u_y = -v_x\\) gives \\(-v_x - u_y = -v_x - (-v_x) = 0\\). Second integrand: \\(u_x - v_y\\). The CR equation \\(u_x = v_y\\) gives \\(u_x - v_y = v_y - v_y = 0\\). Both vanish identically on any domain where \\(f\\) is holomorphic.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Cauchy-Goursat Theorem
        // ================================================================
        {
            id: 'sec-goursat',
            title: 'Cauchy-Goursat Theorem',
            content: `
<h2>Cauchy-Goursat Theorem: The Triangular Case</h2>

<p>The Cauchy-Goursat theorem builds the full theorem from a single elementary case: a closed triangle. The proof technique — <em>triangular subdivision</em> — is one of the most elegant in analysis.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.1 (Cauchy-Goursat, Triangle Version)</div>
    <div class="env-body">
        <p>Let \\(U \\subseteq \\mathbb{C}\\) be open, and let \\(T\\) be a closed triangle with \\(T \\subseteq U\\). If \\(f : U \\to \\mathbb{C}\\) is holomorphic, then</p>
        \\[\\oint_{\\partial T} f(z)\\,dz = 0.\\]
    </div>
</div>

<h3>Proof Idea (Goursat's Argument)</h3>

<p>Let \\(I = \\oint_{\\partial T} f\\,dz\\). We will show \\(|I| = 0\\).</p>

<p><strong>Step 1: Subdivide.</strong> Connect the midpoints of the three sides of \\(T\\). This splits \\(T\\) into four congruent subtriangles \\(T^{(1)}, T^{(2)}, T^{(3)}, T^{(4)}\\), each similar to \\(T\\) with half the side lengths.</p>

<p><strong>Step 2: Pigeonhole.</strong> Orienting each subtriangle consistently, interior edges cancel:</p>
\\[I = \\oint_{\\partial T^{(1)}} f\\,dz + \\oint_{\\partial T^{(2)}} f\\,dz + \\oint_{\\partial T^{(3)}} f\\,dz + \\oint_{\\partial T^{(4)}} f\\,dz.\\]
<p>By the triangle inequality, at least one term satisfies \\(\\left|\\oint_{\\partial T^{(j)}} f\\,dz\\right| \\geq |I|/4\\). Call that subtriangle \\(T_1\\).</p>

<p><strong>Step 3: Iterate.</strong> Subdivide \\(T_1\\) the same way to get \\(T_2\\) with \\(\\left|\\oint_{\\partial T_2} f\\,dz\\right| \\geq |I|/4^2\\), then \\(T_3\\), and so on. After \\(n\\) steps:</p>
\\[\\left|\\oint_{\\partial T_n} f\\,dz\\right| \\geq \\frac{|I|}{4^n}.\\]

<p><strong>Step 4: Apply holomorphicity.</strong> The triangles \\(T_n\\) are nested and shrink to a point \\(z_0 \\in T\\). Since \\(f\\) is holomorphic at \\(z_0\\):</p>
\\[f(z) = f(z_0) + f'(z_0)(z - z_0) + \\varepsilon(z)(z - z_0),\\]
<p>where \\(\\varepsilon(z) \\to 0\\) as \\(z \\to z_0\\). The integrals of the first two terms over \\(\\partial T_n\\) are zero (they are polynomials). Thus</p>
\\[\\left|\\oint_{\\partial T_n} f\\,dz\\right| = \\left|\\oint_{\\partial T_n} \\varepsilon(z)(z-z_0)\\,dz\\right| \\leq \\sup_{\\partial T_n}|\\varepsilon(z)| \\cdot \\text{diam}(T_n) \\cdot \\text{perim}(T_n).\\]

<p><strong>Step 5: Estimate.</strong> If \\(T\\) has perimeter \\(L\\) and diameter \\(d\\), then \\(T_n\\) has perimeter \\(L/2^n\\) and diameter \\(d/2^n\\). So</p>
\\[\\left|\\oint_{\\partial T_n} f\\,dz\\right| \\leq \\sup_{\\partial T_n}|\\varepsilon(z)| \\cdot \\frac{d}{2^n} \\cdot \\frac{L}{2^n} = \\frac{dL}{4^n} \\cdot \\sup_{\\partial T_n}|\\varepsilon(z)|.\\]

<p>Combining with Step 3: \\(|I| \\leq dL \\cdot \\sup_{\\partial T_n}|\\varepsilon(z)|\\). As \\(n \\to \\infty\\), the sup \\(\\to 0\\) since \\(\\varepsilon(z_0) = 0\\) and \\(\\varepsilon\\) is continuous. Hence \\(|I| = 0\\). \\(\\blacksquare\\)</p>

<div class="env-block remark">
    <div class="env-title">Why the Triangle?</div>
    <div class="env-body">
        <p>The triangle is the simplest polygon that supports the subdivision argument. Once we have the triangular case, any polygon decomposes into triangles, and simply connected domains are approximated by polygons. The whole edifice rests on this single lemma.</p>
    </div>
</div>

<div class="env-block corollary">
    <div class="env-title">Corollary 5.2</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic on \\(U\\), then \\(\\oint_{\\partial P} f\\,dz = 0\\) for any polygon \\(P \\subseteq U\\) (triangulate \\(P\\) and apply Theorem 5.1 to each piece).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-triangle-subdivision',
                    title: 'Goursat Subdivision: Bounding the Integral',
                    description: 'Watch the subdivision argument. At each step, one subtriangle must carry at least 1/4 of the total integral weight. As the triangles shrink to a point, holomorphicity forces the integral to zero.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 280, originY: 220 });

                        var step = 0;
                        var maxSteps = 5;
                        var animating = false;
                        var animId = null;

                        // Triangle vertices (math coords)
                        var T0 = [[-2.5, -1.5], [2.5, -1.5], [0, 2.2]];

                        function midpoint(a, b) {
                            return [(a[0]+b[0])/2, (a[1]+b[1])/2];
                        }

                        // Generate the "dominant" subtriangle at each step
                        // We pick the top subtriangle (index 3) at each level for visual clarity
                        function getTriangleAtStep(n) {
                            var T = T0;
                            for (var i = 0; i < n; i++) {
                                var m01 = midpoint(T[0], T[1]);
                                var m12 = midpoint(T[1], T[2]);
                                var m20 = midpoint(T[2], T[0]);
                                // Pick top sub-triangle (vertex 2, m12, m20)
                                T = [m20, m12, T[2]];
                            }
                            return T;
                        }

                        function getAllSubtriangles(T) {
                            var m01 = midpoint(T[0], T[1]);
                            var m12 = midpoint(T[1], T[2]);
                            var m20 = midpoint(T[2], T[0]);
                            return [
                                [T[0], m01, m20],   // bottom-left
                                [m01, T[1], m12],   // bottom-right
                                [m20, m12, T[2]],   // top
                                [m01, m12, m20]     // center
                            ];
                        }

                        function drawTriangle(T, fillColor, strokeColor, lw) {
                            viz.drawPolygon(T, fillColor, strokeColor, lw);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw original outline
                            drawTriangle(T0, null, viz.colors.axis, 1);

                            // At step 0: show full triangle
                            if (step === 0) {
                                drawTriangle(T0, viz.colors.blue + '33', viz.colors.blue, 2.5);
                                viz.screenText('Original triangle T', viz.width/2, 30, viz.colors.white, 14);
                                viz.screenText('|I| = |∮∂T f dz|', viz.width/2, 54, viz.colors.yellow, 13);
                            } else {
                                // Show subdivisions up to current step
                                var current = T0;
                                for (var s = 1; s <= step; s++) {
                                    var subs = getAllSubtriangles(current);
                                    // Draw all 4 subtriangles lightly
                                    for (var k = 0; k < 4; k++) {
                                        drawTriangle(subs[k], null, viz.colors.grid, 1);
                                    }
                                    // Highlight the dominant one (top = index 2)
                                    if (s === step) {
                                        for (var k2 = 0; k2 < 4; k2++) {
                                            var col = (k2 === 2) ? viz.colors.orange + '55' : viz.colors.blue + '22';
                                            var scol = (k2 === 2) ? viz.colors.orange : viz.colors.blue;
                                            var slw = (k2 === 2) ? 2.5 : 1;
                                            drawTriangle(subs[k2], col, scol, slw);
                                        }
                                        // Label
                                        var cx = (subs[2][0][0]+subs[2][1][0]+subs[2][2][0])/3;
                                        var cy = (subs[2][0][1]+subs[2][1][1]+subs[2][2][1])/3;
                                        viz.drawText('T' + step, cx, cy, viz.colors.orange, 12);
                                    }
                                    current = getAllSubtriangles(current)[2];
                                }

                                var bound = Math.pow(0.25, step);
                                viz.screenText('Step ' + step + ': |∮∂T' + step + ' f dz| \u2265 |I| / 4\u207F = |I| \u00D7 ' + bound.toFixed(4), viz.width/2, 30, viz.colors.white, 13);
                                viz.screenText('Perimeter and diameter each halved \u2192 area = (1/4)\u207F of original', viz.width/2, 52, viz.colors.text, 12);
                                if (step >= maxSteps) {
                                    viz.screenText('As n\u2192\u221E: triangles shrink to z\u2080, \u03B5(z)\u21920, so |I| = 0', viz.width/2, viz.height - 20, viz.colors.teal, 13);
                                }
                            }

                            // Bound display
                            var ctx = viz.ctx;
                            var bx = 14, by = viz.height - 95;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(bx, by, 200, 80);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(bx, by, 200, 80);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('n = ' + step, bx+10, by+10);
                            ctx.fillText('Bound: |I| / 4^' + step, bx+10, by+28);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('= |I| \u00D7 ' + Math.pow(0.25, step).toFixed(6), bx+10, by+46);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Side length: (1/2)^' + step + ' = ' + Math.pow(0.5, step).toFixed(4), bx+10, by+62);
                        }

                        draw();

                        VizEngine.createButton(controls, 'Subdivide', function() {
                            if (step < maxSteps) { step++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            step = 0; draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the Goursat subdivision argument, explain why the integrals over interior edges cancel when we sum over all four subtriangles.',
                    hint: 'Each interior edge is traversed twice, once in each direction.',
                    solution: 'When we orient each subtriangle with the same (counterclockwise) orientation as the parent, each interior edge (connecting midpoints) is shared by exactly two subtriangles and traversed in opposite directions. The contributions cancel, leaving only the outer boundary \\(\\partial T\\).'
                },
                {
                    question: 'Verify that \\(\\oint_{\\partial T} f(z_0)\\,dz = 0\\) and \\(\\oint_{\\partial T} f\'(z_0)(z-z_0)\\,dz = 0\\) for any triangle \\(T\\) and constants \\(f(z_0)\\), \\(f\'(z_0)\\).',
                    hint: 'These are integrals of polynomials in \\(z\\). Use antiderivatives.',
                    solution: 'The antiderivative of \\(c\\) is \\(cz\\), and of \\(c(z-z_0)\\) is \\(c(z-z_0)^2/2\\). Both are single-valued holomorphic functions, so their integrals around any closed curve are zero (the curve returns to its starting point and the antiderivative is single-valued).'
                },
                {
                    question: 'Suppose \\(f\\) is holomorphic on \\(U\\) except at one point \\(z_0\\) where \\(f\\) is merely continuous. Show that \\(\\oint_{\\partial T} f\\,dz = 0\\) still holds for any triangle \\(T \\subseteq U\\) with \\(z_0\\) on or inside it.',
                    hint: 'For \\(\\varepsilon > 0\\), cut out a small triangle around \\(z_0\\). Apply Cauchy-Goursat to the remaining region.',
                    solution: 'For any \\(\\varepsilon > 0\\), cut a small triangle \\(T_\\varepsilon\\) around \\(z_0\\). Apply Cauchy-Goursat to the rest: the outer integral equals the integral over \\(\\partial T_\\varepsilon\\). Since \\(f\\) is continuous (hence bounded by \\(M\\) near \\(z_0\\)), \\(|\\oint_{\\partial T_\\varepsilon} f\\,dz| \\leq M \\cdot \\text{perim}(T_\\varepsilon) \\to 0\\) as \\(T_\\varepsilon\\) shrinks. So \\(\\oint_{\\partial T} f\\,dz = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Simply Connected Domains
        // ================================================================
        {
            id: 'sec-simply-connected',
            title: 'Simply Connected Domains',
            content: `
<h2>Simply Connected Domains: The Full Cauchy Theorem</h2>

<div class="env-block definition">
    <div class="env-title">Definition 5.3 (Simply Connected Domain)</div>
    <div class="env-body">
        <p>An open connected set \\(U \\subseteq \\mathbb{C}\\) is <strong>simply connected</strong> if every closed curve in \\(U\\) is contractible to a point within \\(U\\). Equivalently, \\(U\\) has no "holes": its complement \\(\\mathbb{C} \\setminus U\\) is connected (in \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\)).</p>
    </div>
</div>

<p>Examples of simply connected domains: the entire plane \\(\\mathbb{C}\\), any disk \\(\\mathbb{D}_r(z_0)\\), the upper half-plane \\(\\{\\text{Im}\\,z > 0\\}\\), any convex open set. Examples that are <em>not</em> simply connected: the punctured plane \\(\\mathbb{C} \\setminus \\{0\\}\\), an annulus \\(\\{r < |z| < R\\}\\), \\(\\mathbb{C}\\) minus a closed segment.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.4 (Cauchy's Theorem for Simply Connected Domains)</div>
    <div class="env-body">
        <p>Let \\(U\\) be a simply connected open subset of \\(\\mathbb{C}\\), and let \\(f : U \\to \\mathbb{C}\\) be holomorphic. Then for every closed rectifiable curve \\(\\gamma\\) in \\(U\\),</p>
        \\[\\oint_\\gamma f(z)\\,dz = 0.\\]
    </div>
</div>

<h3>Proof Sketch</h3>
<p>Every rectifiable closed curve in a simply connected domain can be approximated by closed polygons (by rectifiability). Each polygon triangulates into finitely many triangles. By Cauchy-Goursat (Theorem 5.1) applied to each triangle, each sub-integral is zero, so the total is zero. The approximation argument extends this to the original curve. \\(\\blacksquare\\)</p>

<h3>The Antiderivative Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.5 (Existence of Antiderivatives)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic on a simply connected domain \\(U\\), then \\(f\\) has a holomorphic antiderivative \\(F\\) on \\(U\\): that is, \\(F' = f\\) on \\(U\\). Moreover,</p>
        \\[\\int_\\gamma f\\,dz = F(\\gamma(b)) - F(\\gamma(a))\\]
        <p>for any path \\(\\gamma : [a,b] \\to U\\).</p>
    </div>
</div>

<p><strong>Proof.</strong> Fix \\(z_0 \\in U\\) and define \\(F(z) = \\int_{z_0}^z f(w)\\,dw\\), integrating along any path from \\(z_0\\) to \\(z\\). By Cauchy's theorem, this is path-independent (any two paths form a closed curve, and the integral around it is zero). A direct computation shows \\(F'(z) = f(z)\\). \\(\\blacksquare\\)</p>

<div class="env-block example">
    <div class="env-title">Example: Log on a Simply Connected Domain</div>
    <div class="env-body">
        <p>On \\(U = \\mathbb{C} \\setminus (-\\infty, 0]\\) (the plane minus the negative real axis and zero), define</p>
        \\[\\log z = \\int_1^z \\frac{dw}{w},\\]
        <p>integrating along a path in \\(U\\). This is well-defined (\\(U\\) is simply connected), and \\((\\log z)' = 1/z\\). This is the <em>principal branch</em> of the logarithm.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">The Role of Simply Connected</div>
    <div class="env-body">
        <p>If \\(U\\) is not simply connected, \\(f\\) may have no antiderivative even if \\(f\\) is holomorphic throughout \\(U\\). The standard example: \\(f(z) = 1/z\\) on \\(\\mathbb{C} \\setminus \\{0\\}\\). We have \\(\\oint_{|z|=1} dz/z = 2\\pi i \\neq 0\\), so no single-valued antiderivative exists. The "hole" at \\(0\\) obstruct it.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-theorem',
                    title: 'Cauchy\'s Theorem: Integral Around a Closed Contour',
                    description: 'A closed contour in a simply connected domain. The running integral \\(\\int_0^t f(\\gamma(s))\\gamma\'(s)\\,ds\\) is shown as it traces the curve — it returns exactly to zero. Toggle between holomorphic and non-holomorphic functions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 230, originY: 200 });
                        var t = 0;
                        var mode = 'holomorphic'; // or 'nonholo'
                        var running = false;
                        var animId = null;

                        // Contour: a rounded "star" shaped closed curve
                        function gamma(s) {
                            var a = 2 * Math.PI * s;
                            var r = 1.5 + 0.5 * Math.cos(3 * a);
                            return [r * Math.cos(a), r * Math.sin(a)];
                        }
                        function gammaDeriv(s) {
                            var ds = 0.0001;
                            var p1 = gamma(s + ds), p0 = gamma(s - ds);
                            return [(p1[0]-p0[0])/(2*ds), (p1[1]-p0[1])/(2*ds)];
                        }

                        // f(z) = z^2 (holomorphic, integral = 0)
                        // g(z) = 1/z (pole at origin — non-holomorphic on region enclosed)
                        function integrand(s) {
                            var p = gamma(s);
                            var x = p[0], y = p[1];
                            var dp = gammaDeriv(s);
                            var dx = dp[0], dy = dp[1];
                            if (mode === 'holomorphic') {
                                // f(z) = z^2: (x+iy)^2 = x^2-y^2 + 2ixy
                                var re = x*x - y*y, im = 2*x*y;
                                // integral: (re + i*im)(dx + i*dy) = re*dx - im*dy + i*(im*dx + re*dy)
                                return [re*dx - im*dy, im*dx + re*dy];
                            } else {
                                // f(z) = 1/z: (x - iy)/(x^2+y^2)
                                var r2 = x*x + y*y;
                                if (r2 < 0.0001) return [0, 0];
                                var re2 = x/r2, im2 = -y/r2;
                                return [re2*dx - im2*dy, im2*dx + re2*dy];
                            }
                        }

                        function numericalIntegral(s0, s1, steps) {
                            var re = 0, im = 0;
                            var ds = (s1 - s0) / steps;
                            for (var k = 0; k < steps; k++) {
                                var s = s0 + (k + 0.5) * ds;
                                var v = integrand(s);
                                re += v[0] * ds;
                                im += v[1] * ds;
                            }
                            return [re, im];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw contour (full)
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var k = 0; k <= 200; k++) {
                                var s = k / 200;
                                var p = gamma(s);
                                var sc = viz.toScreen(p[0], p[1]);
                                k === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw traversed part
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var steps = Math.floor(t * 200);
                            for (var k2 = 0; k2 <= steps; k2++) {
                                var s2 = k2 / 200;
                                var p2 = gamma(s2);
                                var sc2 = viz.toScreen(p2[0], p2[1]);
                                k2 === 0 ? ctx.moveTo(sc2[0], sc2[1]) : ctx.lineTo(sc2[0], sc2[1]);
                            }
                            ctx.stroke();

                            // Moving point
                            var pp = gamma(t);
                            viz.drawPoint(pp[0], pp[1], viz.colors.orange, null, 6);

                            // Compute running integral
                            var intVal = numericalIntegral(0, t, Math.max(1, Math.floor(t * 400)));

                            // Show singularity if non-holomorphic
                            if (mode === 'nonholo') {
                                viz.drawPoint(0, 0, viz.colors.red, null, 5);
                                viz.drawText('pole', 0.25, -0.25, viz.colors.red, 11);
                            }

                            // Right side: running integral display
                            var px = viz.width - 170, py = 40;
                            ctx.fillStyle = '#1a1a40cc';
                            ctx.fillRect(px-10, py, 175, 130);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(px-10, py, 175, 130);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Running integral:', px, py + 8);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Re = ' + intVal[0].toFixed(4), px, py + 30);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Im = ' + intVal[1].toFixed(4), px, py + 52);

                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('t = ' + t.toFixed(2) + ' / 1.00', px, py + 74);

                            if (t >= 0.999) {
                                var total = numericalIntegral(0, 1, 1000);
                                var label = (Math.abs(total[0]) < 0.05 && Math.abs(total[1]) < 0.05)
                                    ? '\u2192 Total \u2248 0 \u2713' : '\u2192 Total \u2248 ' + total[1].toFixed(3) + 'i';
                                ctx.fillStyle = mode === 'holomorphic' ? viz.colors.teal : viz.colors.red;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillText(label, px, py + 100);
                            }

                            var modeLabel = mode === 'holomorphic' ? 'f(z) = z\u00B2 (holomorphic)' : 'f(z) = 1/z (pole inside!)';
                            viz.screenText(modeLabel, viz.width/2, viz.height - 18, mode === 'holomorphic' ? viz.colors.teal : viz.colors.red, 12);
                        }

                        draw();

                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animId) { cancelAnimationFrame(animId); animId = null; running = false; return; }
                            running = true;
                            t = 0;
                            var last = null;
                            function step(ts) {
                                if (!running) return;
                                if (last === null) last = ts;
                                var dt = (ts - last) / 4000;
                                last = ts;
                                t = Math.min(1, t + dt);
                                draw();
                                if (t < 1) animId = requestAnimationFrame(step);
                                else { animId = null; running = false; }
                            }
                            animId = requestAnimationFrame(step);
                        });
                        VizEngine.createButton(controls, 'Toggle f(z)', function() {
                            mode = mode === 'holomorphic' ? 'nonholo' : 'holomorphic';
                            t = 0;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            if (animId) { cancelAnimationFrame(animId); animId = null; }
                            running = false; t = 0; draw();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Is the domain \\(U = \\{z : |z| > 1\\}\\) (exterior of the unit disk) simply connected? Justify your answer, and determine whether \\(\\oint_{|z|=2} \\frac{dz}{z} = 0\\).',
                    hint: 'Check whether every closed curve in \\(U\\) can be contracted to a point within \\(U\\). The curve \\(|z|=2\\) encircles the "hole" at \\(|z| \\leq 1\\).',
                    solution: '\\(U\\) is not simply connected: the curve \\(|z|=2\\) cannot be contracted to a point within \\(U\\) (it would have to cross the excluded disk). Indeed, \\(\\oint_{|z|=2} dz/z = 2\\pi i \\neq 0\\), confirming Cauchy\'s theorem fails. The "hole" is \\(\\{|z| \\leq 1\\}\\).'
                },
                {
                    question: 'Let \\(U = \\mathbb{C} \\setminus \\{1, -1\\}\\) and \\(f(z) = 1/(z^2-1)\\). Is \\(\\oint_\\gamma f\\,dz = 0\\) for every closed curve \\(\\gamma\\) in \\(U\\)? Explain.',
                    hint: 'The domain has two holes. The answer depends on the winding numbers of \\(\\gamma\\) around \\(1\\) and \\(-1\\).',
                    solution: 'No. \\(U\\) has holes at \\(\\pm 1\\), so it is not simply connected. \\(f\\) is holomorphic on \\(U\\) but \\(\\oint_\\gamma f\\,dz\\) depends on winding numbers around each pole. By partial fractions, \\(f = \\frac{1/2}{z-1} - \\frac{1/2}{z+1}\\), so \\(\\oint_\\gamma f\\,dz = \\pi i\\,n(\\gamma,1) - \\pi i\\,n(\\gamma,-1)\\), which is zero only when the winding numbers around both poles are equal.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Deformation of Contours
        // ================================================================
        {
            id: 'sec-deformation',
            title: 'Deformation of Contours',
            content: `
<h2>Deformation of Contours: Homotopy</h2>

<p>Cauchy's theorem says integrals over null-homotopic curves vanish. The deeper principle is that <em>homotopic</em> curves give the <em>same</em> integral — even if neither integral is zero.</p>

<div class="env-block definition">
    <div class="env-title">Definition 5.6 (Homotopy of Paths)</div>
    <div class="env-body">
        <p>Two closed curves \\(\\gamma_0, \\gamma_1 : [0,1] \\to U\\) are <strong>homotopic in \\(U\\)</strong> if there exists a continuous map \\(H : [0,1] \\times [0,1] \\to U\\) with</p>
        <ul>
            <li>\\(H(s, 0) = \\gamma_0(s)\\) and \\(H(s, 1) = \\gamma_1(s)\\) for all \\(s\\),</li>
            <li>\\(H(0, t) = H(1, t)\\) for all \\(t\\) (closed curves throughout).</li>
        </ul>
        <p>\\(H\\) is called a <strong>homotopy</strong> from \\(\\gamma_0\\) to \\(\\gamma_1\\). Intuitively: \\(\\gamma_0\\) can be continuously deformed to \\(\\gamma_1\\) while staying in \\(U\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.7 (Deformation Invariance)</div>
    <div class="env-body">
        <p>Let \\(f\\) be holomorphic on an open set \\(U\\), and let \\(\\gamma_0\\) and \\(\\gamma_1\\) be homotopic closed curves in \\(U\\). Then</p>
        \\[\\oint_{\\gamma_0} f(z)\\,dz = \\oint_{\\gamma_1} f(z)\\,dz.\\]
    </div>
</div>

<p><strong>Proof sketch.</strong> Consider the "combined" closed curve \\(\\gamma_0 - \\gamma_1\\) (traverse \\(\\gamma_0\\) forward, \\(\\gamma_1\\) backward). The homotopy \\(H\\) fills in a 2-cell; since \\(f\\) is holomorphic throughout, Cauchy's theorem (applied to an approximating triangulation of the homotopy) gives \\(\\oint_{\\gamma_0} f\\,dz - \\oint_{\\gamma_1} f\\,dz = 0\\). \\(\\blacksquare\\)</p>

<h3>Key Examples</h3>

<div class="env-block example">
    <div class="env-title">Example: All Circles Around the Same Point</div>
    <div class="env-body">
        <p>Let \\(f\\) be holomorphic on \\(\\mathbb{C} \\setminus \\{0\\}\\). Any two circles \\(|z| = r_1\\) and \\(|z| = r_2\\) (same counterclockwise orientation) are homotopic in \\(\\mathbb{C} \\setminus \\{0\\}\\). Therefore</p>
        \\[\\oint_{|z|=r_1} f(z)\\,dz = \\oint_{|z|=r_2} f(z)\\,dz.\\]
        <p>In particular, \\(\\oint_{|z|=r} dz/z = 2\\pi i\\) for every \\(r > 0\\).</p>
    </div>
</div>

<div class="env-block corollary">
    <div class="env-title">Corollary 5.8 (Shrinking Contours)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic on \\(U \\setminus \\{z_0\\}\\) and has an isolated singularity at \\(z_0\\), then \\(\\oint_\\gamma f\\,dz\\) is the same for <em>any</em> simple closed curve \\(\\gamma\\) encircling \\(z_0\\) once counterclockwise. This common value is \\(2\\pi i \\cdot \\text{Res}(f, z_0)\\) — the foundation of residue calculus.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-homotopy',
                    title: 'Homotopy: Continuously Deforming a Contour',
                    description: 'Watch a circle continuously deform into an ellipse (or a square-ish shape). As long as the deformation avoids all singularities, the integral stays constant. Drag the slider to animate the homotopy parameter \\(t\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 250, originY: 200 });
                        var homotopyT = 0;
                        var singularity = false;

                        // gamma_0: circle of radius 1.5
                        // gamma_1: ellipse a=2.5, b=1.0 (same center)
                        // homotopy: lerp between them
                        function contourPt(s, t) {
                            var a = 2 * Math.PI * s;
                            // circle: r=1.5
                            var x0 = 1.5 * Math.cos(a), y0 = 1.5 * Math.sin(a);
                            // ellipse:
                            var x1 = 2.2 * Math.cos(a), y1 = 0.9 * Math.sin(a);
                            return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw start contour (dim)
                            ctx.strokeStyle = viz.colors.blue + '55';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4,4]);
                            ctx.beginPath();
                            for (var k = 0; k <= 100; k++) {
                                var p = contourPt(k/100, 0);
                                var sc = viz.toScreen(p[0], p[1]);
                                k===0 ? ctx.moveTo(sc[0],sc[1]) : ctx.lineTo(sc[0],sc[1]);
                            }
                            ctx.closePath(); ctx.stroke(); ctx.setLineDash([]);

                            // Draw end contour (dim)
                            ctx.strokeStyle = viz.colors.teal + '55';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4,4]);
                            ctx.beginPath();
                            for (var k2 = 0; k2 <= 100; k2++) {
                                var p2 = contourPt(k2/100, 1);
                                var sc2 = viz.toScreen(p2[0], p2[1]);
                                k2===0 ? ctx.moveTo(sc2[0],sc2[1]) : ctx.lineTo(sc2[0],sc2[1]);
                            }
                            ctx.closePath(); ctx.stroke(); ctx.setLineDash([]);

                            // Draw current contour (bright)
                            var col = singularity ? viz.colors.red : viz.colors.orange;
                            ctx.strokeStyle = col;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var k3 = 0; k3 <= 200; k3++) {
                                var p3 = contourPt(k3/200, homotopyT);
                                var sc3 = viz.toScreen(p3[0], p3[1]);
                                k3===0 ? ctx.moveTo(sc3[0],sc3[1]) : ctx.lineTo(sc3[0],sc3[1]);
                            }
                            ctx.closePath(); ctx.stroke();

                            // Arrow showing direction
                            var pa = contourPt(0.27, homotopyT);
                            var pb = contourPt(0.28, homotopyT);
                            viz.drawVector(pa[0], pa[1], pb[0], pb[1], col, null, 2);

                            // Labels
                            viz.screenText('\u03B3\u2080 (t=0)', 50, 50, viz.colors.blue, 12);
                            viz.screenText('\u03B3\u2081 (t=1)', 50, 68, viz.colors.teal, 12);
                            viz.screenText('current (t=' + homotopyT.toFixed(2) + ')', 50, 86, col, 12);

                            // Singularity toggle
                            if (singularity) {
                                viz.drawPoint(0, 0, viz.colors.red, null, 6);
                                viz.drawText('pole', 0.3, -0.3, viz.colors.red, 11);
                            }

                            // Integral stays same annotation
                            var ix = viz.width - 180, iy = 40;
                            ctx.fillStyle = '#1a1a40cc';
                            ctx.fillRect(ix, iy, 168, singularity ? 90 : 70);
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth=1;
                            ctx.strokeRect(ix, iy, 168, singularity ? 90 : 70);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline='top';
                            ctx.fillText('Homotopy parameter:', ix+8, iy+8);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('t = ' + homotopyT.toFixed(2), ix+8, iy+28);
                            if (!singularity) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('\u222E\u03B3 f dz = const', ix+8, iy+48);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Pole at 0!', ix+8, iy+48);
                                ctx.fillText('Deform freely', ix+8, iy+68);
                                ctx.fillText('(zero stays inside)', ix+8, iy+84);
                            }
                        }

                        VizEngine.createSlider(controls, 't', 0, 1, 0, 0.01, function(v) {
                            homotopyT = v; draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Singularity', function() {
                            singularity = !singularity; draw();
                        });
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\oint_{\\gamma} \\frac{e^z}{z}\\,dz\\) where \\(\\gamma\\) is the ellipse \\(\\frac{x^2}{9} + y^2 = 1\\) traversed counterclockwise.',
                    hint: 'Deform the ellipse to a small circle around \\(z=0\\) — the only singularity inside. Use the known formula for \\(\\oint_{|z|=\\varepsilon} e^z/z\\,dz\\).',
                    solution: 'By deformation invariance, \\(\\oint_\\gamma \\frac{e^z}{z}\\,dz = \\oint_{|z|=\\varepsilon} \\frac{e^z}{z}\\,dz\\) for small \\(\\varepsilon > 0\\). On \\(|z|=\\varepsilon\\): \\(e^z = 1 + z + z^2/2 + \\cdots\\), so \\(e^z/z = 1/z + 1 + z/2 + \\cdots\\). Integrating: \\(\\oint 1/z\\,dz = 2\\pi i\\), and all other terms integrate to zero. So the answer is \\(2\\pi i\\).'
                },
                {
                    question: 'Let \\(\\gamma_0\\) be the unit circle and \\(\\gamma_1\\) be a figure-eight contour that crosses itself at the origin (winding number \\(+1\\) around \\(i/2\\) and \\(-1\\) around \\(-i/2\\)). Are \\(\\gamma_0\\) and \\(\\gamma_1\\) homotopic in \\(\\mathbb{C}\\)? In \\(\\mathbb{C} \\setminus \\{i/2, -i/2\\}\\)?',
                    hint: 'In \\(\\mathbb{C}\\) there are no holes, so all closed curves are null-homotopic (hence homotopic to each other). In the punctured domain, check whether the winding numbers around the punctures agree.',
                    solution: 'In \\(\\mathbb{C}\\): yes — every closed curve in \\(\\mathbb{C}\\) is null-homotopic (contract to a point), so any two are homotopic. In \\(\\mathbb{C} \\setminus \\{i/2, -i/2\\}\\): no — \\(\\gamma_0\\) has winding number \\(+1\\) around both \\(i/2\\) and \\(-i/2\\), while \\(\\gamma_1\\) has winding number \\(+1\\) around \\(i/2\\) and \\(-1\\) around \\(-i/2\\). Different winding numbers mean the curves are not homotopic in the punctured domain.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Multiply Connected Domains
        // ================================================================
        {
            id: 'sec-multiply-connected',
            title: 'Multiply Connected Domains',
            content: `
<h2>Multiply Connected Domains: Annuli and Keyholes</h2>

<p>In a domain with holes, Cauchy's theorem fails for curves that encircle the holes. The correct generalization tracks winding numbers around each hole.</p>

<h3>The Annulus</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.9 (Cauchy for Multiply Connected Domains)</div>
    <div class="env-body">
        <p>Let \\(U\\) be the annulus \\(A = \\{z : r_1 < |z - z_0| < r_2\\}\\), and let \\(f\\) be holomorphic on \\(\\bar{A}\\). Let \\(C_1 = \\{|z-z_0|=r_1\\}\\) and \\(C_2 = \\{|z-z_0|=r_2\\}\\), both counterclockwise. Then</p>
        \\[\\oint_{C_2} f(z)\\,dz = \\oint_{C_1} f(z)\\,dz.\\]
        <p>Equivalently, \\(\\oint_{C_2} f\\,dz - \\oint_{C_1} f\\,dz = 0\\), which we write as \\(\\oint_{\\partial A} f\\,dz = 0\\) where \\(\\partial A = C_2 - C_1\\) (outer minus inner, consistently oriented).</p>
    </div>
</div>

<p><strong>Proof idea.</strong> Connect \\(C_1\\) and \\(C_2\\) by two "cuts" (line segments across the annulus). This creates a simply connected domain. Cauchy's theorem applies; the cuts cancel (traversed in opposite directions), leaving \\(\\oint_{C_2} f\\,dz - \\oint_{C_1} f\\,dz = 0\\). \\(\\blacksquare\\)</p>

<h3>The Keyhole Contour</h3>

<p>To integrate around a branch cut or an isolated singularity, we use the <strong>keyhole contour</strong>:</p>
<ul>
    <li>Outer circle \\(C_R\\): radius \\(R\\), counterclockwise;</li>
    <li>Inner circle \\(C_\\varepsilon\\): radius \\(\\varepsilon\\), clockwise;</li>
    <li>Two straight segments along the branch cut, traversed in opposite directions.</li>
</ul>

<p>The full keyhole contour encloses no singularities (they are excluded), so the integral is zero by Cauchy's theorem. This gives a relation between the straight integrals (the ones we want) and the circular integrals (often estimable).</p>

<div class="env-block example">
    <div class="env-title">Example: \\(\\int_0^\\infty \\frac{x^{a-1}}{1+x}\\,dx\\) via Keyhole</div>
    <div class="env-body">
        <p>Let \\(0 < a < 1\\). Consider \\(f(z) = z^{a-1}/(1+z)\\) on \\(\\mathbb{C} \\setminus [0,\\infty)\\). The keyhole contour (around the positive real axis) gives, as \\(R \\to \\infty\\), \\(\\varepsilon \\to 0\\):</p>
        \\[\\int_0^\\infty \\frac{x^{a-1}}{1+x}\\,dx - e^{2\\pi i(a-1)} \\int_0^\\infty \\frac{x^{a-1}}{1+x}\\,dx = 2\\pi i \\cdot \\text{Res}\\left(\\frac{z^{a-1}}{1+z}, -1\\right) = 2\\pi i e^{i\\pi(a-1)}.\\]
        <p>Solving: \\(\\int_0^\\infty \\frac{x^{a-1}}{1+x}\\,dx = \\frac{\\pi}{\\sin(\\pi a)}\\).</p>
    </div>
</div>

<h3>Winding Numbers and the General Principle</h3>

<p>For a domain \\(U\\) with holes bounded by curves \\(\\Gamma_1, \\ldots, \\Gamma_n\\), and \\(f\\) holomorphic on \\(U\\), if \\(\\gamma\\) is a closed curve in \\(U\\) with winding number \\(n_k\\) around the \\(k\\)th hole, then</p>
\\[\\oint_\\gamma f\\,dz = \\sum_{k=1}^n n_k \\oint_{\\Gamma_k} f\\,dz.\\]

<p>This is the full generalization: the integral depends only on the topological data (winding numbers), not the specific curve.</p>
`,
            visualizations: [
                {
                    id: 'viz-keyhole',
                    title: 'Keyhole Contour: Integration Around a Branch Cut',
                    description: 'Watch the keyhole contour animate: outer arc (radius R), inner arc (radius ε, clockwise), and two straight segments straddling the branch cut along the positive real axis. As R→∞ and ε→0, the arcs vanish and only the straight-line integrals remain.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 55, originX: 260, originY: 200 });
                        var phase = 0; // 0..1 animation
                        var animId = null;
                        var R = 3.0, eps = 0.5;
                        var gapAngle = 0.12; // gap above/below real axis

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Fill interior of keyhole region
                            ctx.save();
                            ctx.beginPath();
                            // Outer arc: from +gapAngle to 2pi-gapAngle CCW
                            var [ox1, oy1] = viz.toScreen(R*Math.cos(gapAngle), R*Math.sin(gapAngle));
                            var [ox2, oy2] = viz.toScreen(R, 0);
                            // draw filled region
                            ctx.fillStyle = viz.colors.blue + '18';
                            ctx.arc(viz.originX, viz.originY, R * viz.scale, -(Math.PI*2 - gapAngle), -gapAngle, false);
                            ctx.arc(viz.originX, viz.originY, eps * viz.scale, -gapAngle, -(Math.PI*2 - gapAngle), true);
                            ctx.closePath();
                            ctx.fill();
                            ctx.restore();

                            // --- Draw the 4 segments of keyhole ---
                            // 1. Outer arc (CCW, gap at positive real axis)
                            var seg1Frac = Math.min(1, phase * 4);
                            if (seg1Frac > 0) {
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var startAngle = gapAngle;
                                var endAngle = 2*Math.PI - gapAngle;
                                var sweepAngle = (endAngle - startAngle) * seg1Frac;
                                var [sx, sy] = viz.toScreen(R*Math.cos(startAngle), R*Math.sin(startAngle));
                                ctx.moveTo(sx, sy);
                                var steps = 120;
                                for (var k = 1; k <= Math.ceil(steps * seg1Frac); k++) {
                                    var a = startAngle + (endAngle - startAngle) * k / steps;
                                    if (a > startAngle + sweepAngle) break;
                                    var [px, py] = viz.toScreen(R*Math.cos(a), R*Math.sin(a));
                                    ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                // Arrow
                                if (seg1Frac > 0.5) {
                                    var am = startAngle + sweepAngle * 0.5;
                                    var am2 = am + 0.05;
                                    viz.drawVector(R*Math.cos(am), R*Math.sin(am), R*Math.cos(am2), R*Math.sin(am2), viz.colors.blue, null, 2);
                                }
                            }

                            // 2. Upper straight line: (R, +ε_gap) to (eps, +ε_gap) — "top" of cut
                            var seg2Frac = Math.min(1, Math.max(0, phase * 4 - 1));
                            if (seg2Frac > 0) {
                                var yOff = 0.07;
                                var x2s = R * Math.cos(gapAngle), y2s = R * Math.sin(gapAngle);
                                var x2e = eps * Math.cos(gapAngle), y2e = eps * Math.sin(gapAngle);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                var [sx2a, sy2a] = viz.toScreen(x2s, y2s);
                                var [sx2b, sy2b] = viz.toScreen(x2s + (x2e-x2s)*seg2Frac, y2s + (y2e-y2s)*seg2Frac);
                                ctx.beginPath(); ctx.moveTo(sx2a, sy2a); ctx.lineTo(sx2b, sy2b); ctx.stroke();
                            }

                            // 3. Inner arc (CW, from small angle to -small angle)
                            var seg3Frac = Math.min(1, Math.max(0, phase * 4 - 2));
                            if (seg3Frac > 0) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var [ix0, iy0] = viz.toScreen(eps*Math.cos(gapAngle), eps*Math.sin(gapAngle));
                                ctx.moveTo(ix0, iy0);
                                var steps2 = 80;
                                for (var k2 = 1; k2 <= Math.ceil(steps2 * seg3Frac); k2++) {
                                    var a2 = gapAngle - (2*Math.PI - 2*gapAngle) * k2 / steps2;
                                    var [ipx, ipy] = viz.toScreen(eps*Math.cos(a2), eps*Math.sin(a2));
                                    ctx.lineTo(ipx, ipy);
                                }
                                ctx.stroke();
                                if (seg3Frac > 0.5) {
                                    var am3 = gapAngle - (Math.PI - gapAngle);
                                    var am4 = am3 - 0.05;
                                    viz.drawVector(eps*Math.cos(am3), eps*Math.sin(am3), eps*Math.cos(am4), eps*Math.sin(am4), viz.colors.teal, null, 2);
                                }
                            }

                            // 4. Lower straight line: (eps, -ε_gap) back to (R, -ε_gap)
                            var seg4Frac = Math.min(1, Math.max(0, phase * 4 - 3));
                            if (seg4Frac > 0) {
                                var x4s = eps * Math.cos(-gapAngle), y4s = eps * Math.sin(-gapAngle);
                                var x4e = R * Math.cos(-gapAngle), y4e = R * Math.sin(-gapAngle);
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2.5;
                                var [sx4a, sy4a] = viz.toScreen(x4s, y4s);
                                var [sx4b, sy4b] = viz.toScreen(x4s + (x4e-x4s)*seg4Frac, y4s + (y4e-y4s)*seg4Frac);
                                ctx.beginPath(); ctx.moveTo(sx4a, sy4a); ctx.lineTo(sx4b, sy4b); ctx.stroke();
                            }

                            // Branch cut indicator
                            ctx.strokeStyle = viz.colors.red + '88';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([3, 3]);
                            var [bx1, by1] = viz.toScreen(0, 0);
                            var [bx2, by2] = viz.toScreen(3.5, 0);
                            ctx.beginPath(); ctx.moveTo(bx1, by1); ctx.lineTo(bx2, by2); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('branch cut', viz.width - 70, viz.originY - 16, viz.colors.red, 10);

                            // Labels
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            // R label
                            var [Rx, Ry] = viz.toScreen(R * 0.7, R * 0.7);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('C_R (CCW)', Rx + 5, Ry);
                            // eps label
                            var [ex, ey] = viz.toScreen(-eps * 0.8, eps * 0.8);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('C_\u03B5 (CW)', ex - 60, ey);

                            // Legend
                            var lx = 14, ly = viz.height - 80;
                            ctx.fillStyle = viz.colors.blue; ctx.fillRect(lx, ly, 12, 3);
                            ctx.fillStyle = viz.colors.text; ctx.fillText('Outer arc (CCW)', lx+16, ly+2);
                            ctx.fillStyle = viz.colors.teal; ctx.fillRect(lx, ly+18, 12, 3);
                            ctx.fillStyle = viz.colors.text; ctx.fillText('Inner arc (CW)', lx+16, ly+20);
                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(lx, ly+36, 12, 3);
                            ctx.fillStyle = viz.colors.text; ctx.fillText('Upper edge of cut', lx+16, ly+38);
                            ctx.fillStyle = viz.colors.purple; ctx.fillRect(lx, ly+54, 12, 3);
                            ctx.fillStyle = viz.colors.text; ctx.fillText('Lower edge of cut', lx+16, ly+56);

                            if (phase >= 0.99) {
                                viz.screenText('Total: \u222E f dz = 0  (holomorphic inside keyhole)', viz.width/2, 22, viz.colors.teal, 13);
                            }
                        }

                        VizEngine.createSlider(controls, 'Trace', 0, 1, 0, 0.005, function(v) {
                            phase = v; draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animId) { cancelAnimationFrame(animId); animId = null; return; }
                            phase = 0;
                            var last = null;
                            function step(ts) {
                                if (last === null) last = ts;
                                phase = Math.min(1, phase + (ts - last) / 4000);
                                last = ts;
                                draw();
                                if (phase < 1) animId = requestAnimationFrame(step);
                                else animId = null;
                            }
                            animId = requestAnimationFrame(step);
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            if (animId) { cancelAnimationFrame(animId); animId = null; }
                            phase = 0; draw();
                        });
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-multiply-connected',
                    title: 'Annulus: Outer Contour Minus Inner Contour',
                    description: 'On an annulus, the full boundary is the outer circle minus the inner circle (consistently oriented). Their combined integral is zero; individually, they give the same value. Drag the sliders to change radii.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 250, originY: 200 });
                        var r1 = 0.8, r2 = 2.2;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Fill annulus
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, r2 * viz.scale, 0, 2*Math.PI);
                            ctx.arc(viz.originX, viz.originY, r1 * viz.scale, 0, 2*Math.PI, true);
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fill();
                            ctx.restore();

                            // Outer circle
                            viz.drawCircle(0, 0, r2, null, viz.colors.blue, 2.5);
                            // Arrow on outer (CCW)
                            viz.drawVector(r2*Math.cos(0.1), r2*Math.sin(0.1), r2*Math.cos(0.2), r2*Math.sin(0.2), viz.colors.blue, null, 2);

                            // Inner circle (drawn CW = shown as red, "subtracted")
                            viz.drawCircle(0, 0, r1, null, viz.colors.red, 2.5);
                            // Arrow on inner (CW = negative)
                            viz.drawVector(r1*Math.cos(0.2), r1*Math.sin(0.2), r1*Math.cos(0.1), r1*Math.sin(0.1), viz.colors.red, null, 2);

                            // Labels
                            viz.drawText('C\u2082 (CCW, r=' + r2.toFixed(1) + ')', r2*0.6, r2*0.6+0.2, viz.colors.blue, 12);
                            viz.drawText('C\u2081 (CW, r=' + r1.toFixed(1) + ')', r1*0.4, -r1*0.9, viz.colors.red, 12);

                            // Hole label
                            viz.drawText('hole', 0, 0, viz.colors.text, 11);

                            // Equation box
                            var bx = viz.width - 210, by = 30;
                            ctx.fillStyle = '#1a1a40cc';
                            ctx.fillRect(bx, by, 198, 90);
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth=1;
                            ctx.strokeRect(bx, by, 198, 90);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline='top';
                            ctx.fillText('\u222E_{C\u2082} f dz - \u222E_{C\u2081} f dz = 0', bx+10, by+10);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('\u21D2 \u222E_{C\u2082} f dz = \u222E_{C\u2081} f dz', bx+10, by+32);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('(f holomorphic on annulus)', bx+10, by+54);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('\u222E_{C\u2082} dz/z = \u222E_{C\u2081} dz/z = 2\u03C0i', bx+10, by+74);

                            viz.screenText('r\u2081 = ' + r1.toFixed(2) + '   r\u2082 = ' + r2.toFixed(2), viz.width/2, viz.height - 18, viz.colors.text, 12);
                        }

                        VizEngine.createSlider(controls, 'r\u2081 (inner)', 0.2, 1.8, r1, 0.05, function(v) {
                            r1 = Math.min(v, r2 - 0.2); draw();
                        });
                        VizEngine.createSlider(controls, 'r\u2082 (outer)', 0.5, 3.0, r2, 0.05, function(v) {
                            r2 = Math.max(v, r1 + 0.2); draw();
                        });
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(A = \\{z : 1 < |z| < 3\\}\\) and \\(f(z) = (z^2 + 1)/z\\). Compute \\(\\oint_{|z|=2} f(z)\\,dz\\) using the annular version of Cauchy\'s theorem.',
                    hint: 'Deform to \\(|z| = \\varepsilon\\) for small \\(\\varepsilon\\). Then \\(f(z) = z + 1/z\\), and only \\(1/z\\) contributes.',
                    solution: 'Write \\(f(z) = z + 1/z\\). By deformation, \\(\\oint_{|z|=2} f\\,dz = \\oint_{|z|=\\varepsilon} f\\,dz\\). Now \\(\\oint_{|z|=\\varepsilon} z\\,dz = 0\\) (holomorphic) and \\(\\oint_{|z|=\\varepsilon} \\frac{dz}{z} = 2\\pi i\\). So the answer is \\(2\\pi i\\).'
                },
                {
                    question: 'Explain why the keyhole contour is needed to compute \\(\\int_0^\\infty x^{a-1}/(1+x)\\,dx\\) for \\(0 < a < 1\\). What goes wrong if we try a semicircular contour instead?',
                    hint: 'The integrand \\(x^{a-1}\\) for \\(x > 0\\) requires a branch cut. On a semicircular contour in the upper half-plane, the integrand \\((-x)^{a-1}\\) for \\(x < 0\\) does not simplify nicely relative to \\(x^{a-1}\\).',
                    solution: 'The function \\(z^{a-1}\\) requires a branch cut — it is multivalued. The keyhole contour surrounds the branch cut on the positive real axis, so the two straight segments both involve \\(x^{a-1}\\) (with a known phase difference \\(e^{2\\pi i(a-1)}\\) between upper and lower edges). A semicircle would involve \\(z^{a-1}\\) on the negative real axis, which equals \\(e^{i\\pi(a-1)} x^{a-1}\\), giving a different integral that does not simplify the original integral as cleanly.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Cauchy's Integral Formula
        // ================================================================
        {
            id: 'sec-bridge',
            title: "Cauchy's Integral Formula",
            content: `
<h2>Cauchy's Integral Formula: The Bridge to Everything</h2>

<p>Cauchy's theorem says integrals over closed curves vanish for holomorphic functions. Cauchy's integral formula does something more startling: it <em>recovers the value of f at any interior point</em> from its values on the boundary.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.10 (Cauchy's Integral Formula)</div>
    <div class="env-body">
        <p>Let \\(U\\) be a simply connected open set, \\(f : U \\to \\mathbb{C}\\) holomorphic, and \\(\\gamma\\) a positively oriented (counterclockwise) simple closed curve in \\(U\\). For any \\(z_0\\) inside \\(\\gamma\\),</p>
        \\[f(z_0) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z - z_0}\\,dz.\\]
    </div>
</div>

<h3>Proof</h3>
<p>The function \\(g(z) = f(z)/(z - z_0)\\) has a singularity at \\(z_0\\). Write</p>
\\[g(z) = \\frac{f(z) - f(z_0)}{z - z_0} + \\frac{f(z_0)}{z - z_0}.\\]
<p>The first term is holomorphic at \\(z_0\\) (the apparent singularity is removable, since \\(f\\) is differentiable there and \\((f(z)-f(z_0))/(z-z_0) \\to f'(z_0)\\)). By Cauchy's theorem, its integral over \\(\\gamma\\) is zero. For the second term, deform \\(\\gamma\\) to a small circle \\(C_\\varepsilon\\) of radius \\(\\varepsilon\\) around \\(z_0\\):</p>
\\[\\oint_\\gamma \\frac{f(z_0)}{z - z_0}\\,dz = f(z_0) \\oint_{C_\\varepsilon} \\frac{dz}{z-z_0} = f(z_0) \\cdot 2\\pi i.\\]
<p>Dividing by \\(2\\pi i\\) gives the formula. \\(\\blacksquare\\)</p>

<h3>Higher-Order Derivatives</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.11 (Cauchy's Integral Formula for Derivatives)</div>
    <div class="env-body">
        <p>Under the same hypotheses, \\(f\\) is infinitely differentiable and</p>
        \\[f^{(n)}(z_0) = \\frac{n!}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{(z - z_0)^{n+1}}\\,dz, \\quad n = 0, 1, 2, \\ldots\\]
    </div>
</div>

<p><strong>Proof sketch.</strong> Differentiate the integral formula under the integral sign with respect to \\(z_0\\). Justification (dominated convergence or direct estimation) shows this is valid. \\(\\blacksquare\\)</p>

<div class="env-block corollary">
    <div class="env-title">Corollary 5.12 (Holomorphic \\(\\Rightarrow\\) Analytic)</div>
    <div class="env-body">
        <p>Every holomorphic function is <strong>analytic</strong>: it equals its Taylor series in a neighborhood of every point. In particular, a function that is once complex-differentiable is automatically infinitely differentiable — a phenomenon with no real-variable analogue.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.13 (Cauchy's Estimate)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic on \\(|z - z_0| < R\\) with \\(|f(z)| \\leq M\\) there, then</p>
        \\[|f^{(n)}(z_0)| \\leq \\frac{n! M}{R^n}.\\]
    </div>
</div>

<p><strong>Proof.</strong> Apply the integral formula on the circle \\(|z - z_0| = r < R\\): \\(|f^{(n)}(z_0)| \\leq \\frac{n!}{2\\pi} \\cdot \\frac{M}{r^n} \\cdot 2\\pi r = n!M/r^n\\). Letting \\(r \\to R\\) gives the estimate. \\(\\blacksquare\\)</p>

<div class="env-block example">
    <div class="env-title">Example: A Quick Integral</div>
    <div class="env-body">
        <p>Compute \\(\\oint_{|z|=2} \\frac{\\sin z}{z^3}\\,dz\\).</p>
        <p>Here \\(f(z) = \\sin z\\), \\(z_0 = 0\\), \\(n = 2\\). By the formula:</p>
        \\[\\oint_{|z|=2} \\frac{\\sin z}{z^3}\\,dz = \\frac{2\\pi i}{2!} f''(0) = \\pi i \\cdot (-\\sin 0) = 0.\\]
        <p>Alternatively: \\(f''(z) = -\\sin z\\), \\(f''(0) = 0\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-index',
                    title: 'Winding Number: Drag a Point',
                    description: 'Drag the red point z₀. The winding number n(γ, z₀) = (1/2πi)∮ dz/(z−z₀) counts how many times the contour winds around z₀. Points inside the loop have winding number 1; outside have 0.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 250, originY: 200 });

                        // Contour: figure-8-like or simple closed curve
                        // We offer two curves: simple circle and figure-eight
                        var curveMode = 'circle';

                        function contourPts(mode, N) {
                            var pts = [];
                            for (var k = 0; k <= N; k++) {
                                var s = k / N;
                                var a = 2 * Math.PI * s;
                                var x, y;
                                if (mode === 'circle') {
                                    x = 1.8 * Math.cos(a);
                                    y = 1.8 * Math.sin(a);
                                } else if (mode === 'star') {
                                    var r = 1.5 + 0.7 * Math.cos(5 * a);
                                    x = r * Math.cos(a); y = r * Math.sin(a);
                                } else {
                                    // figure-8: two loops
                                    x = Math.sin(a) * 1.5;
                                    y = Math.sin(2 * a) * 0.9;
                                }
                                pts.push([x, y]);
                            }
                            return pts;
                        }

                        function windingNumber(pts, px, py) {
                            // Shoelace-based winding number
                            var total = 0;
                            var N = pts.length - 1;
                            for (var k = 0; k < N; k++) {
                                var dx1 = pts[k][0] - px, dy1 = pts[k][1] - py;
                                var dx2 = pts[k+1][0] - px, dy2 = pts[k+1][1] - py;
                                var angle = Math.atan2(dx1*dy2 - dy1*dx2, dx1*dx2 + dy1*dy2);
                                total += angle;
                            }
                            return Math.round(total / (2 * Math.PI));
                        }

                        var draggable = viz.addDraggable('z0', 0.5, 0.3, viz.colors.red, 8, function() { viz.stopAnimation(); draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var pts = contourPts(curveMode, 300);
                            var N = 300;

                            // Fill interior regions
                            ctx.save();
                            ctx.beginPath();
                            for (var k = 0; k <= N; k++) {
                                var sc = viz.toScreen(pts[k][0], pts[k][1]);
                                k===0 ? ctx.moveTo(sc[0],sc[1]) : ctx.lineTo(sc[0],sc[1]);
                            }
                            ctx.closePath();
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fill();
                            ctx.restore();

                            // Draw contour
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var k2 = 0; k2 <= N; k2++) {
                                var sc2 = viz.toScreen(pts[k2][0], pts[k2][1]);
                                k2===0 ? ctx.moveTo(sc2[0],sc2[1]) : ctx.lineTo(sc2[0],sc2[1]);
                            }
                            ctx.stroke();

                            // Arrow showing orientation
                            var pa = pts[Math.floor(N*0.15)], pb = pts[Math.floor(N*0.16)];
                            viz.drawVector(pa[0], pa[1], pb[0], pb[1], viz.colors.blue, null, 2);

                            // Draggable point z0
                            viz.drawDraggables();

                            // Compute winding number
                            var w = windingNumber(pts, draggable.x, draggable.y);

                            // Draw line from z0 to a point on contour (to show "winding" visually)
                            var angPt = pts[Math.floor(N * 0.07)];
                            ctx.strokeStyle = viz.colors.red + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3,3]);
                            var [sx0, sy0] = viz.toScreen(draggable.x, draggable.y);
                            var [sxp, syp] = viz.toScreen(angPt[0], angPt[1]);
                            ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(sxp, syp); ctx.stroke();
                            ctx.setLineDash([]);

                            // Info box
                            var bx = viz.width - 205, by = 30;
                            ctx.fillStyle = '#1a1a40ee';
                            ctx.fillRect(bx, by, 192, 100);
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth=1;
                            ctx.strokeRect(bx, by, 192, 100);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline='top';
                            ctx.fillText('z\u2080 = (' + draggable.x.toFixed(2) + ', ' + draggable.y.toFixed(2) + 'i)', bx+10, by+10);
                            ctx.fillStyle = w !== 0 ? viz.colors.orange : viz.colors.text;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('n(\u03B3, z\u2080) = ' + w, bx+10, by+32);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('= (1/2\u03C0i) \u222E d\u03B6/(\u03B6\u2212z\u2080)', bx+10, by+54);
                            ctx.fillStyle = w === 1 ? viz.colors.teal : (w === 0 ? viz.colors.text : viz.colors.red);
                            ctx.fillText(w === 0 ? 'z\u2080 is outside \u03B3' : 'z\u2080 is inside \u03B3', bx+10, by+74);

                            viz.screenText('Drag the red point \u2022 Curve: ' + curveMode, viz.width/2, viz.height - 18, viz.colors.text, 12);
                        }

                        VizEngine.createButton(controls, 'Circle', function() { curveMode = 'circle'; draw(); });
                        VizEngine.createButton(controls, 'Star', function() { curveMode = 'star'; draw(); });
                        VizEngine.createButton(controls, 'Figure-8', function() { curveMode = 'fig8'; draw(); });

                        viz.animate(function() { draw(); viz.stopAnimation(); });
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\oint_{|z|=3} \\frac{e^z}{(z-1)^2}\\,dz\\).',
                    hint: 'Apply the integral formula for the first derivative: \\(f^{(1)}(z_0) = \\frac{1!}{2\\pi i}\\oint \\frac{f(z)}{(z-z_0)^2}\\,dz\\) with \\(f(z) = e^z\\), \\(z_0 = 1\\).',
                    solution: '\\(f(z) = e^z\\), \\(z_0 = 1\\), \\(n = 1\\). The formula gives \\(\\oint_{|z|=3} \\frac{e^z}{(z-1)^2}\\,dz = 2\\pi i \\cdot f\'(1) = 2\\pi i e^1 = 2\\pi i e\\).'
                },
                {
                    question: 'Use Cauchy\'s integral formula to prove: if \\(f\\) is holomorphic on the disk \\(|z| < R\\) and continuous on \\(|z| \\leq R\\), then \\(f(0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(Re^{i\\theta})\\,d\\theta\\). This is the Mean Value Property.',
                    hint: 'Apply Cauchy\'s integral formula with \\(\\gamma = \\{|z|=R\\}\\) and \\(z_0 = 0\\). Parametrize \\(z = Re^{i\\theta}\\).',
                    solution: 'By Cauchy\'s formula: \\(f(0) = \\frac{1}{2\\pi i}\\oint_{|z|=R} \\frac{f(z)}{z}\\,dz\\). Parametrize \\(z = Re^{i\\theta}\\), \\(dz = iRe^{i\\theta}d\\theta\\):\n\\[f(0) = \\frac{1}{2\\pi i}\\int_0^{2\\pi} \\frac{f(Re^{i\\theta})}{Re^{i\\theta}} \\cdot iRe^{i\\theta}\\,d\\theta = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(Re^{i\\theta})\\,d\\theta.\\]'
                },
                {
                    question: 'Derive Liouville\'s theorem from Cauchy\'s estimate: if \\(f\\) is holomorphic and bounded on all of \\(\\mathbb{C}\\), then \\(f\\) is constant.',
                    hint: 'Apply Cauchy\'s estimate for \\(n=1\\) on a disk of radius \\(R\\), and let \\(R \\to \\infty\\).',
                    solution: 'Suppose \\(|f(z)| \\leq M\\) for all \\(z\\). Fix any \\(z_0 \\in \\mathbb{C}\\). Cauchy\'s estimate on the disk \\(|z - z_0| < R\\) gives \\(|f\'(z_0)| \\leq M/R\\). As \\(R \\to \\infty\\), \\(|f\'(z_0)| \\to 0\\). Since \\(z_0\\) was arbitrary, \\(f\' \\equiv 0\\), so \\(f\\) is constant.'
                }
            ]
        }

    ] // end sections
}); // end chapter push
