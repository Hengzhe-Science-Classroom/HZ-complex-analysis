window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: "Cauchy's Theorem",
    subtitle: 'The most important theorem in complex analysis',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Cauchy's Theorem Matters
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Cauchy's Theorem Matters</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Mystery</div>
    <div class="env-body">
        <p>In real analysis, the value of \\(\\int_a^b f(x)\\,dx\\) depends on <em>every</em> value of \\(f\\) between \\(a\\) and \\(b\\). Change the function at even one interior point and the integral might change. But in complex analysis, something astonishing happens: if \\(f\\) is analytic inside and on a closed curve \\(\\gamma\\), then</p>
        \\[\\oint_\\gamma f(z)\\,dz = 0.\\]
        <p>The integral around any closed loop is zero. This single fact has consequences that would take volumes to exhaust: it gives us the Cauchy integral formula, Taylor and Laurent series, the residue theorem, and much of the rest of the subject.</p>
    </div>
</div>

<p>To appreciate the depth of this result, recall what we know from Chapter 4. A contour integral \\(\\int_\\gamma f(z)\\,dz\\) sums up the values of \\(f\\) along a path \\(\\gamma\\), weighted by the direction of travel. The claim that this integral vanishes for <em>every</em> closed contour (not just circles, but any reasonable loop) inside the domain of analyticity is a profound rigidity statement about analytic functions.</p>

<h3>A Comparison with Real Analysis</h3>

<p>Consider the real function \\(f(x) = x\\). Then \\(\\int_0^1 f(x)\\,dx = 1/2\\), and the value depends on the entire path from 0 to 1. In complex analysis, the analogous statement would be: for \\(f(z) = z\\), integrate along <em>any</em> path from \\(z_0\\) to \\(z_1\\) in the complex plane. If \\(f\\) is analytic, the answer depends only on the endpoints, not the path. This is <strong>path-independence</strong>, and it is equivalent to Cauchy's theorem.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Path-Independence)</div>
    <div class="env-body">
        <p>We say that the integral \\(\\int_\\gamma f(z)\\,dz\\) is <strong>path-independent</strong> in a domain \\(D\\) if for every pair of points \\(z_0, z_1 \\in D\\), the integral has the same value for every contour \\(\\gamma\\) from \\(z_0\\) to \\(z_1\\) that lies entirely in \\(D\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.1 (Equivalence of Path-Independence and Vanishing Loop Integrals)</div>
    <div class="env-body">
        <p>Let \\(f\\) be continuous on a domain \\(D\\). The following are equivalent:</p>
        <ol>
            <li>\\(\\int_\\gamma f(z)\\,dz\\) is path-independent in \\(D\\).</li>
            <li>\\(\\oint_\\gamma f(z)\\,dz = 0\\) for every closed contour \\(\\gamma\\) in \\(D\\).</li>
            <li>\\(f\\) has an antiderivative \\(F\\) in \\(D\\), i.e., \\(F'(z) = f(z)\\).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Sketch of Proof</div>
    <div class="env-body">
        <p>(1)\\(\\Rightarrow\\)(2): If \\(\\gamma\\) is closed (same start and end point), path-independence means the integral from \\(z_0\\) to \\(z_0\\) is zero regardless of path, so \\(\\oint_\\gamma f\\,dz = 0\\).</p>
        <p>(2)\\(\\Rightarrow\\)(3): Fix \\(z_0 \\in D\\) and define \\(F(z) = \\int_{z_0}^z f(w)\\,dw\\) along any path in \\(D\\). Because all closed loop integrals vanish, this is well-defined (independent of path choice). A standard argument shows \\(F'(z) = f(z)\\).</p>
        <p>(3)\\(\\Rightarrow\\)(1): If \\(F' = f\\), then \\(\\int_\\gamma f\\,dz = F(z_1) - F(z_0)\\) depends only on endpoints.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>The Plan of This Chapter</h3>

<p>We will prove Cauchy's theorem in stages of increasing generality:</p>
<ol>
    <li><strong>Goursat's lemma</strong>: the theorem for triangles, proved by a beautiful subdivision argument that requires no regularity assumption on \\(f'\\).</li>
    <li><strong>Cauchy's theorem for simply connected domains</strong>: the full theorem for domains with no holes.</li>
    <li><strong>Deformation of contours</strong>: the homotopy viewpoint, connecting topology to analysis.</li>
    <li><strong>Multiply connected domains</strong>: what happens when there <em>are</em> holes (the keyhole argument and annular domains).</li>
</ol>

<div class="viz-placeholder" data-viz="viz-cauchy-theorem"></div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-theorem',
                    title: "Cauchy's Theorem: Path-Independence",
                    description: 'Two different paths (blue and orange) connect the same endpoints for the analytic function \\(f(z) = z^2\\). The integral along both paths gives the same value. The animated particle traces both paths simultaneously, accumulating the integral in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            scale: 50
                        });

                        var t = 0;
                        var speed = 1;
                        VizEngine.createSlider(controls, 'Speed', 0.2, 3, 1, 0.1, function(v) { speed = v; });

                        // f(z) = z^2: integral from z0 to z1 is (z1^3 - z0^3)/3
                        var z0 = [-2, -1];
                        var z1 = [2, 1];

                        // Path 1: straight line
                        function path1(s) {
                            return [z0[0] + (z1[0] - z0[0]) * s, z0[1] + (z1[1] - z0[1]) * s];
                        }

                        // Path 2: curved (arc via upper half)
                        function path2(s) {
                            var mx = (z0[0] + z1[0]) / 2;
                            var my = (z0[1] + z1[1]) / 2 + 2.5;
                            if (s < 0.5) {
                                var t2 = s * 2;
                                return [z0[0] + (mx - z0[0]) * t2, z0[1] + (my - z0[1]) * t2];
                            } else {
                                var t2 = (s - 0.5) * 2;
                                return [mx + (z1[0] - mx) * t2, my + (z1[1] - my) * t2];
                            }
                        }

                        // Complex multiplication: (a+bi)(c+di)
                        function cmul(a, b, c, d) {
                            return [a * c - b * d, a * d + b * c];
                        }

                        // Numerical integral of z^2 along a path up to parameter s
                        function numIntegral(pathFn, sMax, steps) {
                            var re = 0, im = 0;
                            var ds = sMax / steps;
                            for (var i = 0; i < steps; i++) {
                                var s0 = i * ds;
                                var s1 = (i + 1) * ds;
                                var p0 = pathFn(s0);
                                var p1 = pathFn(s1);
                                var pm = pathFn((s0 + s1) / 2);
                                // f(z) = z^2 at midpoint
                                var fz = cmul(pm[0], pm[1], pm[0], pm[1]);
                                // dz = (p1 - p0)
                                var dx = p1[0] - p0[0];
                                var dy = p1[1] - p0[1];
                                // f(z)*dz
                                var prod = cmul(fz[0], fz[1], dx, dy);
                                re += prod[0];
                                im += prod[1];
                            }
                            return [re, im];
                        }

                        function draw(time) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            t = (time * speed * 0.0005) % 1;

                            var ctx = viz.ctx;

                            // Draw both full paths
                            ctx.lineWidth = 2;

                            // Path 1 (blue)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var s = i / 100;
                                var p = path1(s);
                                var sc = viz.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.stroke();

                            // Path 2 (orange)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var s = i / 100;
                                var p = path2(s);
                                var sc = viz.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.stroke();

                            // Animated particles
                            var p1t = path1(t);
                            var p2t = path2(t);
                            viz.drawPoint(p1t[0], p1t[1], viz.colors.blue, null, 6);
                            viz.drawPoint(p2t[0], p2t[1], viz.colors.orange, null, 6);

                            // Endpoints
                            viz.drawPoint(z0[0], z0[1], viz.colors.white, 'z\u2080', 5);
                            viz.drawPoint(z1[0], z1[1], viz.colors.white, 'z\u2081', 5);

                            // Integrals
                            var int1 = numIntegral(path1, t, 200);
                            var int2 = numIntegral(path2, t, 200);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';

                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Path 1: ' + int1[0].toFixed(3) + ' + ' + int1[1].toFixed(3) + 'i', 12, 12);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Path 2: ' + int2[0].toFixed(3) + ' + ' + int2[1].toFixed(3) + 'i', 12, 30);

                            if (t > 0.98) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillText('Both integrals agree!', 12, 52);
                            }

                            viz.screenText('f(z) = z\u00B2', viz.width - 70, 20, viz.colors.teal, 14);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f(z) = \\bar{z}\\). Is \\(\\int_\\gamma f(z)\\,dz\\) path-independent? Compute the integral from \\(0\\) to \\(1+i\\) along (a) the straight line, and (b) the path going first to \\(1\\) then up to \\(1+i\\).',
                    hint: '\\(\\bar{z}\\) is not analytic (it fails the Cauchy-Riemann equations). Parametrize each path and compute directly.',
                    solution: '(a) Straight line: \\(z(t) = (1+i)t\\), so \\(\\bar{z} = (1-i)t\\), \\(dz = (1+i)dt\\). \\(\\int_0^1 (1-i)t(1+i)dt = \\int_0^1 2t\\,dt = 1\\). (b) Two segments: first \\(\\int_0^1 t\\,dt = 1/2\\), then \\(\\int_0^1 (1-it)(i\\,dt) = i - i/2 = i/2\\). Total: \\(1/2 + i/2\\). Since \\(1 \\neq 1/2 + i/2\\), the integral is <em>not</em> path-independent. This is expected: \\(\\bar{z}\\) is not analytic.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Goursat's Lemma (Triangular Version)
        // ================================================================
        {
            id: 'sec-goursat',
            title: "Goursat's Lemma",
            content: `
<h2>Goursat's Lemma: Cauchy's Theorem for Triangles</h2>

<div class="env-block intuition">
    <div class="env-title">Why Start with Triangles?</div>
    <div class="env-body">
        <p>Triangles are the simplest polygons, and any polygon can be subdivided into triangles. The genius of Goursat's approach (1900) is a subdivision argument: if the integral around a triangle is not zero, then it must be concentrated in a very small sub-triangle. But analyticity forces the function to be "locally linear," and linear functions have zero integrals around triangles. This contradiction proves the theorem.</p>
        <p>Goursat's improvement over Cauchy's original proof is that it requires only <em>complex differentiability</em>, not continuity of the derivative. This seemingly technical distinction turns out to be fundamental.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.2 (Goursat's Lemma)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on an open set \\(\\Omega\\). If \\(T\\) is a triangle whose interior and boundary are contained in \\(\\Omega\\), then</p>
        \\[\\oint_{\\partial T} f(z)\\,dz = 0.\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof (Subdivision Argument)</div>
    <div class="env-body">
        <p><strong>Step 1: Subdivide.</strong> Connect the midpoints of the three sides of \\(T\\) to form four congruent sub-triangles \\(T_1, T_2, T_3, T_4\\). The integral around \\(\\partial T\\) equals the sum of the integrals around the four sub-triangles (integrals along shared interior edges cancel due to opposite orientations):</p>
        \\[\\oint_{\\partial T} f\\,dz = \\sum_{j=1}^{4} \\oint_{\\partial T_j} f\\,dz.\\]
        <p>By the triangle inequality, at least one sub-triangle, call it \\(T^{(1)}\\), satisfies</p>
        \\[\\left|\\oint_{\\partial T^{(1)}} f\\,dz\\right| \\geq \\frac{1}{4}\\left|\\oint_{\\partial T} f\\,dz\\right|.\\]

        <p><strong>Step 2: Iterate.</strong> Repeat the subdivision on \\(T^{(1)}\\) to get \\(T^{(2)}\\), and so on. After \\(n\\) steps we have a nested sequence \\(T \\supset T^{(1)} \\supset T^{(2)} \\supset \\cdots\\) with</p>
        \\[\\left|\\oint_{\\partial T^{(n)}} f\\,dz\\right| \\geq \\frac{1}{4^n}\\left|\\oint_{\\partial T} f\\,dz\\right|,\\]
        <p>and the perimeter of \\(T^{(n)}\\) is \\(\\ell(T^{(n)}) = \\ell(T)/2^n\\), while its diameter is \\(\\text{diam}(T^{(n)}) = \\text{diam}(T)/2^n\\).</p>

        <p><strong>Step 3: Use analyticity.</strong> The nested compact sets \\(\\overline{T^{(n)}}\\) shrink to a point \\(z_0\\). Since \\(f\\) is analytic at \\(z_0\\), we can write</p>
        \\[f(z) = f(z_0) + f'(z_0)(z - z_0) + \\psi(z)(z - z_0),\\]
        <p>where \\(\\psi(z) \\to 0\\) as \\(z \\to z_0\\). The function \\(g(z) = f(z_0) + f'(z_0)(z - z_0)\\) is affine, so \\(\\oint_{\\partial T^{(n)}} g\\,dz = 0\\) (any polynomial of degree \\(\\leq 1\\) has zero integral around a closed contour). Therefore</p>
        \\[\\oint_{\\partial T^{(n)}} f\\,dz = \\oint_{\\partial T^{(n)}} \\psi(z)(z - z_0)\\,dz.\\]

        <p><strong>Step 4: Estimate.</strong> For \\(z \\in \\partial T^{(n)}\\), we have \\(|z - z_0| \\leq \\text{diam}(T^{(n)}) = d/2^n\\) where \\(d = \\text{diam}(T)\\). Given \\(\\varepsilon > 0\\), choose \\(n\\) large enough that \\(|\\psi(z)| < \\varepsilon\\) on \\(T^{(n)}\\). Then</p>
        \\[\\left|\\oint_{\\partial T^{(n)}} f\\,dz\\right| \\leq \\varepsilon \\cdot \\frac{d}{2^n} \\cdot \\frac{\\ell}{2^n} = \\frac{\\varepsilon \\, d \\, \\ell}{4^n}.\\]

        <p>Combining with the lower bound from Step 2:</p>
        \\[\\frac{1}{4^n}\\left|\\oint_{\\partial T} f\\,dz\\right| \\leq \\frac{\\varepsilon \\, d \\, \\ell}{4^n}.\\]
        <p>Cancelling \\(1/4^n\\) gives \\(\\left|\\oint_{\\partial T} f\\,dz\\right| \\leq \\varepsilon \\, d \\, \\ell\\). Since \\(\\varepsilon\\) is arbitrary, we conclude \\(\\oint_{\\partial T} f\\,dz = 0\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Why "Goursat" and not just "Cauchy"?</div>
    <div class="env-body">
        <p>Cauchy's original proof assumed \\(f'\\) is continuous. Goursat showed that mere existence of \\(f'\\) suffices. This is not a pedantic distinction: it means we do not need to separately verify continuity of \\(f'\\), which is instead a <em>consequence</em> of Cauchy's integral formula (Chapter 6). Without Goursat's improvement, the logical structure of the subject would be circular.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-triangle-subdivision"></div>
`,
            visualizations: [
                {
                    id: 'viz-triangle-subdivision',
                    title: "Goursat's Subdivision Argument",
                    description: 'Watch the triangle subdivision in action. At each step, the midpoints are connected to form 4 sub-triangles. One sub-triangle (highlighted) carries at least 1/4 of the total integral. Click "Subdivide" to go deeper.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            scale: 55
                        });

                        var depth = 0;
                        var maxDepth = 7;

                        VizEngine.createButton(controls, 'Subdivide', function() {
                            if (depth < maxDepth) { depth++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            depth = 0; draw();
                        });

                        // Triangle vertices in math coords
                        var A = [-3, -2.5];
                        var B = [3, -2.5];
                        var C = [0, 3];

                        function mid(p, q) {
                            return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
                        }

                        function drawTriangle(v0, v1, v2, color, lw) {
                            viz.drawSegment(v0[0], v0[1], v1[0], v1[1], color, lw);
                            viz.drawSegment(v1[0], v1[1], v2[0], v2[1], color, lw);
                            viz.drawSegment(v2[0], v2[1], v0[0], v0[1], color, lw);
                        }

                        function fillTriangle(v0, v1, v2, color) {
                            viz.drawPolygon([v0, v1, v2], color, null);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw outer triangle
                            drawTriangle(A, B, C, viz.colors.blue, 2);

                            // Build subdivision chain
                            var tri = [A, B, C];
                            for (var d = 0; d < depth; d++) {
                                var p0 = tri[0], p1 = tri[1], p2 = tri[2];
                                var m01 = mid(p0, p1);
                                var m12 = mid(p1, p2);
                                var m20 = mid(p2, p0);

                                // Draw all 4 sub-triangles at this level
                                var subs = [
                                    [p0, m01, m20],
                                    [m01, p1, m12],
                                    [m20, m12, p2],
                                    [m01, m12, m20]
                                ];

                                for (var s = 0; s < 4; s++) {
                                    var alpha = (d < depth - 1) ? '22' : '44';
                                    drawTriangle(subs[s][0], subs[s][1], subs[s][2], viz.colors.teal + alpha, 1);
                                }

                                // "Choose" one sub-triangle (deterministic: always bottom-left for visual clarity)
                                // Alternate: 0, 1, 2, 3, 0, 1, 2, 3...
                                var chosen = d % 4;
                                tri = subs[chosen];
                            }

                            // Highlight the chosen sub-triangle
                            if (depth > 0) {
                                fillTriangle(tri[0], tri[1], tri[2], viz.colors.orange + '55');
                                drawTriangle(tri[0], tri[1], tri[2], viz.colors.orange, 2.5);
                            }

                            // Labels
                            viz.screenText("Goursat's Subdivision", viz.width / 2, 18, viz.colors.white, 15);
                            viz.screenText('Depth: ' + depth, viz.width / 2, 38, viz.colors.teal, 13);

                            if (depth > 0) {
                                var perimFrac = '1/' + Math.pow(2, depth);
                                var intFrac = '1/' + Math.pow(4, depth);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Perimeter ratio: ' + perimFrac, 12, viz.height - 50);
                                ctx.fillText('Integral bound: \u2265 ' + intFrac + ' |original|', 12, viz.height - 34);
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Diameter \u2192 0, so analyticity forces integral \u2192 0', 12, viz.height - 16);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why does the integral over the four sub-triangles sum to the integral over the original triangle? What happens to the integrals along the interior edges?',
                    hint: 'Each interior edge is traversed twice, once in each direction.',
                    solution: 'When we integrate around each sub-triangle with the same (counterclockwise) orientation, each interior edge appears in two adjacent sub-triangles with opposite orientations. These contributions cancel. The only surviving edges are the three sides of the original triangle, so the sum of the four sub-integrals equals the integral over \\(\\partial T\\).'
                },
                {
                    question: 'In the proof, we used \\(\\oint_{\\partial T^{(n)}} g(z)\\,dz = 0\\) where \\(g(z) = a + bz\\) is affine. Prove this directly.',
                    hint: 'An affine function has an antiderivative \\(G(z) = az + bz^2/2\\).',
                    solution: 'Since \\(g(z) = a + bz\\) has antiderivative \\(G(z) = az + bz^2/2\\), we get \\(\\oint_{\\partial T} g\\,dz = G(z_{\\text{start}}) - G(z_{\\text{start}}) = 0\\) because the contour is closed (start = end point). Alternatively, compute directly: the contributions from the three sides of any triangle sum to zero by the fundamental theorem of calculus applied to \\(G\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Cauchy's Theorem for Simply Connected Domains
        // ================================================================
        {
            id: 'sec-simply-connected',
            title: 'Simply Connected Domains',
            content: `
<h2>Cauchy's Theorem for Simply Connected Domains</h2>

<div class="env-block intuition">
    <div class="env-title">From Triangles to Arbitrary Contours</div>
    <div class="env-body">
        <p>Goursat's lemma handles triangles. But we want Cauchy's theorem for arbitrary closed contours. The bridge is the concept of a <strong>simply connected domain</strong>: a domain with no holes. In such a domain, any closed contour can be "triangulated," reducing the general case to a sum of triangular integrals, each of which vanishes by Goursat.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Simply Connected Domain)</div>
    <div class="env-body">
        <p>A domain \\(D \\subseteq \\mathbb{C}\\) is <strong>simply connected</strong> if it is connected and every closed curve in \\(D\\) can be continuously deformed (contracted) to a point within \\(D\\). Equivalently, \\(D\\) has no "holes."</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Examples</div>
    <div class="env-body">
        <ul>
            <li>\\(\\mathbb{C}\\) itself: simply connected.</li>
            <li>Any open disk \\(D(z_0, r)\\): simply connected.</li>
            <li>Any open half-plane: simply connected.</li>
            <li>\\(\\mathbb{C} \\setminus \\{0\\}\\) (the punctured plane): <strong>not</strong> simply connected. A circle around the origin cannot be contracted to a point without leaving the domain.</li>
            <li>An annulus \\(\\{z : r < |z| < R\\}\\): <strong>not</strong> simply connected.</li>
        </ul>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.3 (Cauchy's Theorem, Simply Connected Version)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a simply connected domain \\(D\\). Then for every closed contour \\(\\gamma\\) in \\(D\\),</p>
        \\[\\oint_\\gamma f(z)\\,dz = 0.\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch (Triangulation Argument)</div>
    <div class="env-body">
        <p>The idea is to decompose the interior of \\(\\gamma\\) into triangles. Since \\(D\\) is simply connected and \\(\\gamma\\) lies in \\(D\\), the interior of \\(\\gamma\\) also lies in \\(D\\) (by the Jordan Curve Theorem and simple connectivity).</p>
        <p>Subdivide the region bounded by \\(\\gamma\\) into small triangles \\(T_1, \\ldots, T_N\\). Then</p>
        \\[\\oint_\\gamma f\\,dz = \\sum_{j=1}^{N} \\oint_{\\partial T_j} f\\,dz = 0\\]
        <p>because each triangular integral vanishes by Goursat's lemma, and interior edges cancel in pairs.</p>
        <p>The rigorous version requires careful handling of the triangulation (approximating \\(\\gamma\\) by a polygon, then triangulating the polygon). We omit the full details, which are topological in nature.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Existence of Antiderivatives</h3>

<p>An immediate corollary of Cauchy's theorem in simply connected domains is the existence of antiderivatives.</p>

<div class="env-block theorem">
    <div class="env-title">Corollary 5.4 (Antiderivatives in Simply Connected Domains)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic on a simply connected domain \\(D\\), then \\(f\\) has an antiderivative \\(F\\) on \\(D\\): a function \\(F\\) analytic on \\(D\\) with \\(F'(z) = f(z)\\) for all \\(z \\in D\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(1/z\\) on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\)</div>
    <div class="env-body">
        <p>The function \\(f(z) = 1/z\\) is analytic on the slit plane \\(\\mathbb{C} \\setminus (-\\infty, 0]\\), which is simply connected. By the corollary, \\(f\\) has an antiderivative there: it is the principal branch of \\(\\log z\\). On the other hand, \\(1/z\\) does <em>not</em> have an antiderivative on \\(\\mathbb{C} \\setminus \\{0\\}\\), which is not simply connected. Indeed, \\(\\oint_{|z|=1} \\frac{dz}{z} = 2\\pi i \\neq 0\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">The Topology-Analysis Connection</div>
    <div class="env-body">
        <p>Cauchy's theorem reveals a deep link between <strong>topology</strong> (the shape of the domain) and <strong>analysis</strong> (the vanishing of integrals). Simple connectivity is a purely topological condition, yet it controls the analytic property of path-independence. This interplay between topology and analysis is one of the hallmarks of complex analysis.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Is the domain \\(D = \\mathbb{C} \\setminus [0, \\infty)\\) (the plane minus the positive real axis) simply connected? Does \\(1/z\\) have an antiderivative on \\(D\\)?',
                    hint: 'Can every closed curve in this slit plane be contracted to a point?',
                    solution: 'Yes, \\(D = \\mathbb{C} \\setminus [0, \\infty)\\) is simply connected (cutting along a ray does not create a hole that a curve can wind around). Therefore \\(1/z\\) has an antiderivative on \\(D\\), namely a branch of \\(\\log z\\) (for example, with argument in \\((0, 2\\pi)\\)).'
                },
                {
                    question: 'Show that \\(\\int_\\gamma e^{z^2}\\,dz = 0\\) for any closed contour \\(\\gamma\\) in \\(\\mathbb{C}\\).',
                    hint: '\\(e^{z^2}\\) is entire (analytic on all of \\(\\mathbb{C}\\)), and \\(\\mathbb{C}\\) is simply connected.',
                    solution: '\\(e^{z^2}\\) is entire because it is the composition of entire functions \\(z \\mapsto z^2\\) and \\(z \\mapsto e^z\\). Since \\(\\mathbb{C}\\) is simply connected, Cauchy\\'s theorem gives \\(\\oint_\\gamma e^{z^2}\\,dz = 0\\) for every closed contour \\(\\gamma\\). Note: \\(e^{z^2}\\) does not have an elementary antiderivative, yet the closed integral still vanishes.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Deformation of Contours (Homotopy)
        // ================================================================
        {
            id: 'sec-deformation',
            title: 'Deformation of Contours',
            content: `
<h2>Deformation of Contours: The Homotopy Viewpoint</h2>

<div class="env-block intuition">
    <div class="env-title">Rubber-Band Analogy</div>
    <div class="env-body">
        <p>Think of a contour as a rubber band stretched in the complex plane. If you can continuously deform one rubber band into another without crossing any singularity of \\(f\\), then the integral of \\(f\\) along both contours is the same. This is the <strong>principle of deformation of contours</strong>, arguably the most useful computational tool in complex analysis.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Homotopy of Curves)</div>
    <div class="env-body">
        <p>Two closed curves \\(\\gamma_0, \\gamma_1\\) in a domain \\(D\\) are <strong>homotopic</strong> in \\(D\\) if there exists a continuous map \\(H: [0,1] \\times [0,1] \\to D\\) such that</p>
        <ul>
            <li>\\(H(s, 0) = \\gamma_0(s)\\) for all \\(s\\) (at "time" 0, we have \\(\\gamma_0\\));</li>
            <li>\\(H(s, 1) = \\gamma_1(s)\\) for all \\(s\\) (at "time" 1, we have \\(\\gamma_1\\));</li>
            <li>\\(H(0, t) = H(1, t)\\) for all \\(t\\) (the curve stays closed throughout the deformation).</li>
        </ul>
        <p>A closed curve is <strong>null-homotopic</strong> (or contractible) if it is homotopic to a constant curve (a point).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.5 (Deformation Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a domain \\(D\\), and let \\(\\gamma_0, \\gamma_1\\) be two closed contours in \\(D\\) that are homotopic in \\(D\\). Then</p>
        \\[\\oint_{\\gamma_0} f(z)\\,dz = \\oint_{\\gamma_1} f(z)\\,dz.\\]
        <p>In particular, if \\(\\gamma\\) is null-homotopic in \\(D\\), then \\(\\oint_\\gamma f(z)\\,dz = 0\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Idea</div>
    <div class="env-body">
        <p>The homotopy \\(H\\) sweeps out a "ribbon" between \\(\\gamma_0\\) and \\(\\gamma_1\\). Cover this ribbon by finitely many small disks (using compactness). Within each disk, \\(f\\) is analytic, so by Cauchy's theorem the integral around each small boundary vanishes. A telescoping argument shows the integral along \\(\\gamma_0\\) equals the integral along \\(\\gamma_1\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Applications of Deformation</h3>

<div class="env-block example">
    <div class="env-title">Example: Computing \\(\\oint_{|z|=2} \\frac{dz}{z}\\) via Deformation</div>
    <div class="env-body">
        <p>The circle \\(|z| = 2\\) can be deformed to \\(|z| = 1\\) in \\(\\mathbb{C} \\setminus \\{0\\}\\) (they are homotopic there). So</p>
        \\[\\oint_{|z|=2} \\frac{dz}{z} = \\oint_{|z|=1} \\frac{dz}{z} = 2\\pi i.\\]
        <p>More generally, any simple closed curve winding once around the origin gives \\(2\\pi i\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Deforming to a Convenient Contour</div>
    <div class="env-body">
        <p>To compute \\(\\oint_\\gamma \\frac{dz}{z-1}\\) where \\(\\gamma\\) is a complicated curve winding once around \\(z = 1\\) (and no other singularity), deform \\(\\gamma\\) to a small circle \\(|z - 1| = \\varepsilon\\). Parametrize as \\(z = 1 + \\varepsilon e^{i\\theta}\\):</p>
        \\[\\oint_{|z-1|=\\varepsilon} \\frac{dz}{z-1} = \\int_0^{2\\pi} \\frac{i\\varepsilon e^{i\\theta}}{\\varepsilon e^{i\\theta}}\\,d\\theta = 2\\pi i.\\]
    </div>
</div>

<p>The deformation theorem transforms difficult integral computations into easy ones: replace a complicated contour by a simple one (usually a circle), compute, and invoke the theorem.</p>

<div class="viz-placeholder" data-viz="viz-homotopy"></div>
`,
            visualizations: [
                {
                    id: 'viz-homotopy',
                    title: 'Homotopy: Deforming Contours',
                    description: 'Watch a contour continuously deform from one shape to another. The singularity at the origin (red dot) blocks certain deformations. The slider controls the homotopy parameter \\(t\\). When the contour does not cross the singularity, the integral is preserved.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            scale: 50
                        });

                        var homotopyT = 0;
                        VizEngine.createSlider(controls, 't (homotopy)', 0, 1, 0, 0.01, function(v) {
                            homotopyT = v;
                            draw();
                        });

                        // Curve 0: large circle radius 3
                        // Curve 1: small circle radius 1
                        // Both centered at origin, so homotopic in C\{0}
                        function curve0(s) {
                            var theta = 2 * Math.PI * s;
                            var r = 3;
                            return [r * Math.cos(theta), r * Math.sin(theta)];
                        }

                        function curve1(s) {
                            var theta = 2 * Math.PI * s;
                            var r = 1;
                            return [r * Math.cos(theta), r * Math.sin(theta)];
                        }

                        function interpCurve(s, t) {
                            var p0 = curve0(s);
                            var p1 = curve1(s);
                            return [
                                p0[0] + (p1[0] - p0[0]) * t,
                                p0[1] + (p1[1] - p0[1]) * t
                            ];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw singularity
                            viz.drawPoint(0, 0, viz.colors.red, '0 (singularity)', 7);

                            // Draw initial curve (faded)
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var s = i / 200;
                                var p = curve0(s);
                                var sc = viz.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw final curve (faded)
                            ctx.strokeStyle = viz.colors.orange + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var s = i / 200;
                                var p = curve1(s);
                                var sc = viz.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw current deformed curve
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var s = i / 200;
                                var p = interpCurve(s, homotopyT);
                                var sc = viz.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Direction arrow
                            var arrowS = 0.12;
                            var pa = interpCurve(arrowS, homotopyT);
                            var pb = interpCurve(arrowS + 0.01, homotopyT);
                            var dx = pb[0] - pa[0];
                            var dy = pb[1] - pa[1];
                            var sca = viz.toScreen(pa[0], pa[1]);
                            var angle = Math.atan2(-dy * viz.scale, dx * viz.scale);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(sca[0] + 10 * Math.cos(angle), sca[1] + 10 * Math.sin(angle));
                            ctx.lineTo(sca[0] + 10 * Math.cos(angle + 2.5), sca[1] + 10 * Math.sin(angle + 2.5));
                            ctx.lineTo(sca[0] + 10 * Math.cos(angle - 2.5), sca[1] + 10 * Math.sin(angle - 2.5));
                            ctx.closePath();
                            ctx.fill();

                            // Labels
                            viz.screenText('t = ' + homotopyT.toFixed(2), viz.width / 2, 18, viz.colors.white, 14);
                            ctx.fillStyle = viz.colors.blue + '88';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u03B3\u2080 (R=3)', 12, 14);
                            ctx.fillStyle = viz.colors.orange + '88';
                            ctx.fillText('\u03B3\u2081 (R=1)', 12, 30);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('\u222E f dz is the same for both!', 12, viz.height - 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\gamma_1\\) be the circle \\(|z| = 1\\) and \\(\\gamma_2\\) be the square with vertices \\(\\pm 1 \\pm i\\), both traversed counterclockwise. Show that \\(\\oint_{\\gamma_1} \\frac{dz}{z} = \\oint_{\\gamma_2} \\frac{dz}{z}\\).',
                    hint: 'Are \\(\\gamma_1\\) and \\(\\gamma_2\\) homotopic in \\(\\mathbb{C} \\setminus \\{0\\}\\)?',
                    solution: 'Both \\(\\gamma_1\\) and \\(\\gamma_2\\) wind once around the origin in \\(\\mathbb{C} \\setminus \\{0\\}\\). We can continuously deform the circle to the square without crossing the origin (for example, use the homotopy \\(H(s,t) = (1-t)\\gamma_1(s) + t\\gamma_2(s)\\); since both curves stay away from 0, so does the interpolation). By the deformation theorem, the integrals are equal, both equaling \\(2\\pi i\\).'
                },
                {
                    question: 'Let \\(\\gamma\\) be a closed curve in \\(\\mathbb{C} \\setminus \\{0, 1\\}\\) that winds once around \\(z=0\\) and zero times around \\(z=1\\). Compute \\(\\oint_\\gamma \\frac{dz}{z(z-1)}\\) using partial fractions and the deformation theorem.',
                    hint: 'Write \\(\\frac{1}{z(z-1)} = \\frac{-1}{z} + \\frac{1}{z-1}\\). Each term integrates separately by deformation.',
                    solution: 'Partial fractions: \\(\\frac{1}{z(z-1)} = \\frac{-1}{z} + \\frac{1}{z-1}\\). Then \\(\\oint_\\gamma \\frac{dz}{z(z-1)} = -\\oint_\\gamma \\frac{dz}{z} + \\oint_\\gamma \\frac{dz}{z-1}\\). Since \\(\\gamma\\) winds once around 0, \\(\\oint_\\gamma \\frac{dz}{z} = 2\\pi i\\). Since \\(\\gamma\\) winds zero times around 1, \\(\\oint_\\gamma \\frac{dz}{z-1} = 0\\). Total: \\(-2\\pi i\\).'
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
<h2>Multiply Connected Domains</h2>

<div class="env-block intuition">
    <div class="env-title">What If There Are Holes?</div>
    <div class="env-body">
        <p>Cauchy's theorem as stated requires simple connectivity. But many important domains have holes: the punctured plane \\(\\mathbb{C} \\setminus \\{0\\}\\), annuli \\(\\{r < |z| < R\\}\\), domains with finitely many punctures. The integral around a contour in such a domain need not vanish; instead, it equals the sum of integrals around the holes. The <strong>keyhole contour</strong> is the classical device for making this precise.</p>
    </div>
</div>

<h3>The Keyhole Argument</h3>

<p>Suppose \\(f\\) is analytic on a region between two simple closed curves \\(C_1\\) (outer) and \\(C_2\\) (inner). We want to relate \\(\\oint_{C_1} f\\,dz\\) and \\(\\oint_{C_2} f\\,dz\\).</p>

<p>The keyhole construction works as follows:</p>
<ol>
    <li>Cut a narrow corridor from \\(C_1\\) to \\(C_2\\).</li>
    <li>This creates a single closed curve \\(\\Gamma\\) that traverses \\(C_1\\) counterclockwise, travels along one side of the corridor to \\(C_2\\), traverses \\(C_2\\) clockwise, and returns along the other side of the corridor.</li>
    <li>The domain enclosed by \\(\\Gamma\\) lies entirely in the region of analyticity, so by Cauchy's theorem for simply connected domains, \\(\\oint_\\Gamma f\\,dz = 0\\).</li>
    <li>As the corridor width shrinks to zero, the contributions from the two sides of the corridor cancel, giving</li>
</ol>
\\[\\oint_{C_1} f\\,dz = \\oint_{C_2} f\\,dz,\\]
<p>where both integrals are taken counterclockwise.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.6 (Cauchy's Theorem for Multiply Connected Domains)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a domain \\(D\\) whose boundary consists of a simple closed curve \\(C_0\\) (outer boundary, traversed counterclockwise) and simple closed curves \\(C_1, \\ldots, C_n\\) (boundaries of holes, each traversed clockwise). Then</p>
        \\[\\oint_{C_0} f\\,dz + \\oint_{C_1} f\\,dz + \\cdots + \\oint_{C_n} f\\,dz = 0.\\]
        <p>Equivalently, with all curves counterclockwise:</p>
        \\[\\oint_{C_0} f\\,dz = \\sum_{k=1}^{n} \\oint_{C_k} f\\,dz.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Annular Domain</div>
    <div class="env-body">
        <p>Let \\(f(z) = 1/z\\) on the annulus \\(1 < |z| < 3\\). The outer boundary is \\(|z| = 3\\) (counterclockwise) and the inner boundary is \\(|z| = 1\\) (clockwise). By Theorem 5.6:</p>
        \\[\\oint_{|z|=3} \\frac{dz}{z} - \\oint_{|z|=1} \\frac{dz}{z} = 0,\\]
        <p>confirming that both integrals equal \\(2\\pi i\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-keyhole"></div>

<div class="viz-placeholder" data-viz="viz-multiply-connected"></div>
`,
            visualizations: [
                {
                    id: 'viz-keyhole',
                    title: 'The Keyhole Contour',
                    description: 'Watch the keyhole contour construction. The outer and inner circles are connected by a narrow corridor. An animated particle traces the full keyhole path. As the corridor narrows, the contributions from its two sides cancel, proving that the outer and inner integrals are equal.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            scale: 55
                        });

                        var corridorWidth = 0.3;
                        var animT = 0;
                        var animating = false;

                        VizEngine.createSlider(controls, 'Corridor width', 0.02, 0.5, 0.3, 0.01, function(v) {
                            corridorWidth = v;
                            draw();
                        });

                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            animT = 0;
                            viz.animate(function(time) {
                                animT = (time * 0.0003) % 1;
                                draw();
                                if (animT > 0.999) {
                                    animating = false;
                                    viz.stopAnimation();
                                }
                            });
                        });

                        var R1 = 3;  // outer radius
                        var R2 = 1;  // inner radius

                        // Keyhole path: outer CCW, corridor down, inner CW, corridor up
                        function keyholePoint(t) {
                            // t in [0,1] traverses the full keyhole
                            var hw = corridorWidth / 2;
                            var corridorAngle = Math.atan2(hw, R1);
                            var innerCorridorAngle = Math.atan2(hw, R2);

                            // Phase 1: outer circle CCW from corridorAngle to 2pi - corridorAngle
                            // Phase 2: corridor from outer to inner (right side)
                            // Phase 3: inner circle CW from -innerCorridorAngle to -(2pi - innerCorridorAngle)
                            // Phase 4: corridor from inner to outer (left side)

                            var phaseLengths = [
                                2 * Math.PI - 2 * corridorAngle,  // outer arc
                                R1 - R2,                           // corridor right
                                2 * Math.PI - 2 * innerCorridorAngle, // inner arc
                                R1 - R2                            // corridor left
                            ];
                            var totalLen = phaseLengths[0] + phaseLengths[1] + phaseLengths[2] + phaseLengths[3];

                            var s = t * totalLen;

                            if (s < phaseLengths[0]) {
                                // Outer circle CCW
                                var angle = corridorAngle + s;
                                return [R1 * Math.cos(angle), R1 * Math.sin(angle)];
                            }
                            s -= phaseLengths[0];

                            if (s < phaseLengths[1]) {
                                // Right corridor (going inward)
                                var frac = s / phaseLengths[1];
                                var r = R1 - (R1 - R2) * frac;
                                var angle = 2 * Math.PI - corridorAngle + (corridorAngle - innerCorridorAngle) * frac;
                                // Simpler: straight line at angle near 0, offset by hw
                                return [r * Math.cos(-hw / r), r * Math.sin(-hw / r)];
                            }
                            s -= phaseLengths[1];

                            if (s < phaseLengths[2]) {
                                // Inner circle CW
                                var angle = -innerCorridorAngle - s;
                                return [R2 * Math.cos(angle), R2 * Math.sin(angle)];
                            }
                            s -= phaseLengths[2];

                            // Left corridor (going outward)
                            var frac = s / phaseLengths[3];
                            var r = R2 + (R1 - R2) * frac;
                            return [r * Math.cos(hw / r), r * Math.sin(hw / r)];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Singularity
                            viz.drawPoint(0, 0, viz.colors.red, '0', 6);

                            // Outer circle (dashed)
                            viz.drawCircle(0, 0, R1, null, viz.colors.blue + '44', 1);

                            // Inner circle (dashed)
                            viz.drawCircle(0, 0, R2, null, viz.colors.orange + '44', 1);

                            // Fill annular region lightly
                            // Draw keyhole contour
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var steps = 500;
                            for (var i = 0; i <= steps; i++) {
                                var pt = keyholePoint(i / steps);
                                var sc = viz.toScreen(pt[0], pt[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Animated particle
                            if (animating) {
                                var pp = keyholePoint(animT);
                                viz.drawPoint(pp[0], pp[1], viz.colors.green, null, 7);
                            }

                            // Labels
                            viz.screenText('Keyhole Contour', viz.width / 2, 18, viz.colors.white, 15);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.textAlign = 'left';
                            ctx.fillText('Outer: |z| = ' + R1, 12, viz.height - 44);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Inner: |z| = ' + R2, 12, viz.height - 28);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Corridor cancels \u2192 \u222E_outer = \u222E_inner', 12, viz.height - 12);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-multiply-connected',
                    title: 'Multiply Connected Domain',
                    description: 'A domain with multiple holes. The integral around the outer boundary equals the sum of integrals around each hole. Drag the holes to see how the domain changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            scale: 45
                        });

                        // Holes as draggable points
                        var hole1 = viz.addDraggable('h1', -1.5, 0.5, viz.colors.red, 8, function() { draw(); });
                        var hole2 = viz.addDraggable('h2', 1.5, -0.5, viz.colors.red, 8, function() { draw(); });
                        var hole3 = viz.addDraggable('h3', 0, 1.8, viz.colors.red, 8, function() { draw(); });

                        var R_outer = 4;
                        var r_hole = 0.6;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Outer boundary (large circle)
                            viz.drawCircle(0, 0, R_outer, null, viz.colors.blue, 2);

                            // Draw direction arrow on outer circle
                            var arrowAngle = Math.PI / 4;
                            var ax = R_outer * Math.cos(arrowAngle);
                            var ay = R_outer * Math.sin(arrowAngle);
                            var asc = viz.toScreen(ax, ay);
                            // tangent direction (CCW)
                            var tx = -Math.sin(arrowAngle);
                            var ty = Math.cos(arrowAngle);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(asc[0] + tx * viz.scale * 0.2, asc[1] - ty * viz.scale * 0.2);
                            ctx.lineTo(asc[0] + tx * viz.scale * 0.2 - 8 * tx + 6 * ty, asc[1] - ty * viz.scale * 0.2 + 8 * ty + 6 * tx);
                            ctx.lineTo(asc[0] + tx * viz.scale * 0.2 - 8 * tx - 6 * ty, asc[1] - ty * viz.scale * 0.2 + 8 * ty - 6 * tx);
                            ctx.closePath();
                            ctx.fill();

                            // Shade analytic region
                            ctx.save();
                            ctx.beginPath();
                            // Outer circle
                            var sc0 = viz.toScreen(0, 0);
                            ctx.arc(sc0[0], sc0[1], R_outer * viz.scale, 0, Math.PI * 2);
                            // Cut out holes
                            var holes = [hole1, hole2, hole3];
                            for (var h = 0; h < holes.length; h++) {
                                var hsc = viz.toScreen(holes[h].x, holes[h].y);
                                ctx.moveTo(hsc[0] + r_hole * viz.scale, hsc[1]);
                                ctx.arc(hsc[0], hsc[1], r_hole * viz.scale, 0, Math.PI * 2, true);
                            }
                            ctx.fillStyle = viz.colors.blue + '11';
                            ctx.fill('evenodd');
                            ctx.restore();

                            // Draw holes with circles
                            var holeColors = [viz.colors.orange, viz.colors.purple, viz.colors.yellow];
                            var holes = [hole1, hole2, hole3];
                            for (var h = 0; h < holes.length; h++) {
                                viz.drawCircle(holes[h].x, holes[h].y, r_hole, viz.colors.red + '22', holeColors[h], 2);
                                viz.drawPoint(holes[h].x, holes[h].y, viz.colors.red, 'z' + (h + 1), 5);
                            }

                            // Draggables
                            viz.drawDraggables();

                            // Labels
                            viz.screenText('Multiply Connected Domain', viz.width / 2, 18, viz.colors.white, 14);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.textAlign = 'center';
                            ctx.fillText('\u222E_outer f dz = \u222E_C\u2081 f dz + \u222E_C\u2082 f dz + \u222E_C\u2083 f dz', viz.width / 2, viz.height - 14);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Drag the singularities to rearrange the domain', viz.width / 2, viz.height - 32);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f(z) = \\frac{1}{(z-1)(z+1)}\\) and let \\(\\gamma\\) be the circle \\(|z| = 2\\). Use partial fractions and the keyhole/deformation argument to compute \\(\\oint_\\gamma f(z)\\,dz\\).',
                    hint: 'Partial fractions: \\(\\frac{1}{(z-1)(z+1)} = \\frac{1}{2}\\left(\\frac{1}{z-1} - \\frac{1}{z+1}\\right)\\). Both singularities are inside \\(|z|=2\\).',
                    solution: 'Partial fractions: \\(f(z) = \\frac{1}{2}\\left(\\frac{1}{z-1} - \\frac{1}{z+1}\\right)\\). Both \\(z = 1\\) and \\(z = -1\\) are inside \\(|z| = 2\\), and \\(\\gamma\\) winds once around each. So \\(\\oint_\\gamma f\\,dz = \\frac{1}{2}(2\\pi i) - \\frac{1}{2}(2\\pi i) = 0\\).'
                },
                {
                    question: 'Let \\(\\gamma\\) be the circle \\(|z| = 2\\) and \\(C\\) be the circle \\(|z - 1| = 1/2\\). Show that \\(\\oint_\\gamma \\frac{e^z}{z-1}\\,dz = \\oint_C \\frac{e^z}{z-1}\\,dz\\).',
                    hint: 'The only singularity of \\(e^z/(z-1)\\) is at \\(z=1\\), which is inside both \\(\\gamma\\) and \\(C\\). Are \\(\\gamma\\) and \\(C\\) homotopic in \\(\\mathbb{C} \\setminus \\{1\\}\\)?',
                    solution: 'The function \\(e^z/(z-1)\\) is analytic on \\(\\mathbb{C} \\setminus \\{1\\}\\). Both \\(\\gamma\\) and \\(C\\) wind once around \\(z = 1\\) in this domain, so they are homotopic in \\(\\mathbb{C} \\setminus \\{1\\}\\). By the deformation theorem, the integrals are equal.'
                },
                {
                    question: 'Compute \\(\\oint_{|z|=3} \\frac{z}{(z-1)(z-2)}\\,dz\\) using partial fractions and the multiply connected domain theorem.',
                    hint: 'Partial fractions: \\(\\frac{z}{(z-1)(z-2)} = \\frac{-1}{z-1} + \\frac{2}{z-2}\\). Both poles are inside \\(|z|=3\\).',
                    solution: 'Partial fractions: \\(\\frac{z}{(z-1)(z-2)} = \\frac{-1}{z-1} + \\frac{2}{z-2}\\). Both poles \\(z=1\\) and \\(z=2\\) are inside \\(|z|=3\\). By the multiply connected domain theorem, \\(\\oint_{|z|=3} f\\,dz = \\oint_{C_1} f\\,dz + \\oint_{C_2} f\\,dz\\) where \\(C_j\\) are small circles around each pole. \\(\\oint_{C_1} \\frac{-1}{z-1}dz = -2\\pi i\\) and \\(\\oint_{C_2} \\frac{2}{z-2}dz = 4\\pi i\\). Total: \\(2\\pi i\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: The Winding Number and Bridge to Cauchy's Formula
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Winding Numbers & What Comes Next',
            content: `
<h2>The Winding Number</h2>

<div class="env-block intuition">
    <div class="env-title">Counting Wraps</div>
    <div class="env-body">
        <p>How many times does a closed curve \\(\\gamma\\) wind around a point \\(z_0\\)? This is the <strong>winding number</strong> (or index) of \\(\\gamma\\) with respect to \\(z_0\\). It is a topological invariant that controls the value of contour integrals: the integral \\(\\oint_\\gamma \\frac{dz}{z - z_0}\\) is exactly \\(2\\pi i\\) times the winding number.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Winding Number)</div>
    <div class="env-body">
        <p>Let \\(\\gamma\\) be a closed contour and \\(z_0 \\notin \\gamma\\). The <strong>winding number</strong> (or index) of \\(\\gamma\\) around \\(z_0\\) is</p>
        \\[n(\\gamma, z_0) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{dz}{z - z_0}.\\]
        <p>This is always an integer.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.7 (Winding Number is an Integer)</div>
    <div class="env-body">
        <p>For any closed contour \\(\\gamma\\) and any \\(z_0 \\notin \\gamma\\), the winding number \\(n(\\gamma, z_0)\\) is an integer. Moreover:</p>
        <ul>
            <li>\\(n(\\gamma, z_0) = 0\\) if \\(z_0\\) is in the unbounded component of \\(\\mathbb{C} \\setminus \\gamma\\).</li>
            <li>\\(n(\\gamma, z_0)\\) is constant on each connected component of \\(\\mathbb{C} \\setminus \\gamma\\).</li>
        </ul>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Define \\(g(t) = \\exp\\!\\left(-\\int_0^t \\frac{\\gamma'(s)}{\\gamma(s) - z_0}\\,ds\\right) \\cdot (\\gamma(t) - z_0)\\). One checks that \\(g'(t) = 0\\), so \\(g\\) is constant. Since \\(\\gamma(0) = \\gamma(1)\\) (closed curve), we get \\(\\exp\\!\\left(-\\int_0^1 \\frac{\\gamma'(s)}{\\gamma(s) - z_0}\\,ds\\right) = 1\\), which means the integral is \\(2\\pi i k\\) for some integer \\(k\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Examples of Winding Numbers</div>
    <div class="env-body">
        <ul>
            <li>The circle \\(|z| = 1\\) traversed counterclockwise has winding number \\(+1\\) around the origin, \\(0\\) around any point \\(|z_0| > 1\\).</li>
            <li>The same circle traversed clockwise has winding number \\(-1\\) around the origin.</li>
            <li>A figure-eight curve that crosses itself can have winding number 0 around a point enclosed by both loops, if the two loops wind in opposite directions.</li>
        </ul>
    </div>
</div>

<h3>Cauchy's Theorem, General Version</h3>

<p>Using winding numbers, we can state the most general version of Cauchy's theorem for finitely many singularities.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.8 (Cauchy's Theorem, General Form)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a domain \\(D\\), and let \\(\\gamma\\) be a closed contour in \\(D\\) that is null-homotopic in \\(D\\). Then</p>
        \\[\\oint_\\gamma f(z)\\,dz = 0.\\]
    </div>
</div>

<h3>Bridge to Cauchy's Integral Formula</h3>

<p>Cauchy's theorem tells us <em>when</em> an integral vanishes. The next chapter asks: what is the integral when it does <em>not</em> vanish? The answer is <strong>Cauchy's integral formula</strong>:</p>

\\[f(z_0) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z - z_0}\\,dz,\\]

<p>where \\(\\gamma\\) winds once around \\(z_0\\). This extraordinary formula says that the values of an analytic function on a curve completely determine its values inside. It is the gateway to the rest of complex analysis: Taylor series, Liouville's theorem, the maximum modulus principle, and ultimately the residue theorem.</p>

<div class="env-block remark">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>The logical chain so far: analyticity (Chapter 2) \\(\\Rightarrow\\) Goursat's lemma \\(\\Rightarrow\\) Cauchy's theorem \\(\\Rightarrow\\) existence of antiderivatives \\(\\Rightarrow\\) Cauchy's integral formula (Chapter 6) \\(\\Rightarrow\\) infinite differentiability, Taylor series, and everything else. Cauchy's theorem is the keystone: without it, the entire edifice collapses.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-index"></div>
`,
            visualizations: [
                {
                    id: 'viz-index',
                    title: 'Winding Number Explorer',
                    description: 'Drag the point \\(z_0\\) (green) around the plane. The winding number of the fixed curve around \\(z_0\\) is computed and displayed. The curve is a trefoil-like shape that creates regions with different winding numbers.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            scale: 50
                        });

                        // A trefoil-like curve that creates regions with winding numbers 0, 1, 2
                        function curvePoint(t) {
                            var theta = 2 * Math.PI * t;
                            var r = 2 + Math.cos(3 * theta);
                            return [r * Math.cos(theta), r * Math.sin(theta)];
                        }

                        // Compute winding number numerically
                        function windingNumber(px, py, steps) {
                            var totalAngle = 0;
                            steps = steps || 1000;
                            for (var i = 0; i < steps; i++) {
                                var p0 = curvePoint(i / steps);
                                var p1 = curvePoint((i + 1) / steps);
                                var a0 = Math.atan2(p0[1] - py, p0[0] - px);
                                var a1 = Math.atan2(p1[1] - py, p1[0] - px);
                                var da = a1 - a0;
                                // Normalize to [-pi, pi]
                                while (da > Math.PI) da -= 2 * Math.PI;
                                while (da < -Math.PI) da += 2 * Math.PI;
                                totalAngle += da;
                            }
                            return Math.round(totalAngle / (2 * Math.PI));
                        }

                        var probe = viz.addDraggable('z0', 0.5, 0.5, viz.colors.green, 8, function() { draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Color regions by winding number (approximate with a grid)
                            var step = 0.25;
                            for (var x = -5; x <= 5; x += step) {
                                for (var y = -4; y <= 4; y += step) {
                                    var w = windingNumber(x + step / 2, y + step / 2, 500);
                                    if (w === 0) continue;
                                    var sc = viz.toScreen(x, y + step);
                                    var sc2 = viz.toScreen(x + step, y);
                                    var color;
                                    if (w === 1) color = viz.colors.blue + '22';
                                    else if (w === 2) color = viz.colors.purple + '33';
                                    else if (w === -1) color = viz.colors.orange + '22';
                                    else color = viz.colors.yellow + '22';
                                    ctx.fillStyle = color;
                                    ctx.fillRect(sc[0], sc[1], sc2[0] - sc[0], sc2[1] - sc[1]);
                                }
                            }

                            // Draw curve
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 500; i++) {
                                var p = curvePoint(i / 500);
                                var sc = viz.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Direction arrows along curve
                            for (var a = 0; a < 3; a++) {
                                var at = (a + 0.5) / 3;
                                var pa = curvePoint(at);
                                var pb = curvePoint(at + 0.005);
                                var dx = pb[0] - pa[0];
                                var dy = pb[1] - pa[1];
                                var sca = viz.toScreen(pa[0], pa[1]);
                                var ang = Math.atan2(-dy * viz.scale, dx * viz.scale);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.moveTo(sca[0] + 8 * Math.cos(ang), sca[1] + 8 * Math.sin(ang));
                                ctx.lineTo(sca[0] + 8 * Math.cos(ang + 2.5), sca[1] + 8 * Math.sin(ang + 2.5));
                                ctx.lineTo(sca[0] + 8 * Math.cos(ang - 2.5), sca[1] + 8 * Math.sin(ang - 2.5));
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Draggable probe point
                            viz.drawDraggables();

                            // Compute and display winding number
                            var w = windingNumber(probe.x, probe.y);
                            viz.screenText('n(\u03B3, z\u2080) = ' + w, viz.width / 2, 20, viz.colors.white, 18);

                            // Legend
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('n = 1', 12, viz.height - 44);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('n = 2', 12, viz.height - 28);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('n = 0 (outside)', 12, viz.height - 12);
                            ctx.fillStyle = viz.colors.green;
                            ctx.textAlign = 'right';
                            ctx.fillText('Drag z\u2080 to explore', viz.width - 12, viz.height - 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the winding number of the circle \\(|z - 3| = 1\\) (counterclockwise) around (a) \\(z_0 = 3\\), (b) \\(z_0 = 0\\), (c) \\(z_0 = 3 + 2i\\).',
                    hint: 'The winding number is \\(+1\\) for points inside the circle, and \\(0\\) for points outside.',
                    solution: '(a) \\(z_0 = 3\\) is the center of the circle, so \\(n = 1\\). (b) \\(z_0 = 0\\) is outside the circle (distance 3 > radius 1), so \\(n = 0\\). (c) \\(z_0 = 3 + 2i\\) is outside (distance 2 > 1), so \\(n = 0\\).'
                },
                {
                    question: 'Let \\(\\gamma(t) = e^{2\\pi i n t}\\) for \\(t \\in [0, 1]\\) and \\(n \\in \\mathbb{Z}\\). What is the winding number of \\(\\gamma\\) around the origin?',
                    hint: 'Compute \\(\\frac{1}{2\\pi i}\\oint_\\gamma \\frac{dz}{z}\\) directly.',
                    solution: '\\(\\gamma(t) = e^{2\\pi i n t}\\), so \\(\\gamma\'(t) = 2\\pi i n \\, e^{2\\pi i n t}\\). Then \\(\\frac{1}{2\\pi i}\\int_0^1 \\frac{2\\pi i n \\, e^{2\\pi i n t}}{e^{2\\pi i n t}}\\,dt = \\frac{1}{2\\pi i}\\int_0^1 2\\pi i n \\,dt = n\\). The winding number is \\(n\\): the curve wraps around the origin \\(n\\) times (counterclockwise if \\(n > 0\\), clockwise if \\(n < 0\\)).'
                },
                {
                    question: 'Show that the winding number \\(n(\\gamma, z_0)\\) is constant as \\(z_0\\) varies continuously in a connected component of \\(\\mathbb{C} \\setminus \\gamma\\).',
                    hint: 'The function \\(z_0 \\mapsto n(\\gamma, z_0)\\) is continuous (why?) and integer-valued.',
                    solution: 'The integral \\(\\frac{1}{2\\pi i}\\oint_\\gamma \\frac{dz}{z - z_0}\\) depends continuously on \\(z_0\\) (for \\(z_0 \\notin \\gamma\\), the integrand depends continuously on \\(z_0\\), and the contour is compact, so we can differentiate under the integral sign). But \\(n(\\gamma, z_0)\\) is always an integer. A continuous integer-valued function on a connected set must be constant.'
                }
            ]
        }
    ]
});
