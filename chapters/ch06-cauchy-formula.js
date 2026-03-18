window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: "Cauchy's Integral Formula",
    subtitle: 'Recovering function values from boundary data',
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
    <div class="env-title">A Remarkable Rigidity</div>
    <div class="env-body">
        <p>Suppose you know the values of an analytic function on a closed curve. Is that enough to determine the function <em>inside</em> the curve? For a real differentiable function, the answer is no: knowing a function on a circle tells you nothing about its interior values. But analytic functions are so tightly constrained that the answer is a resounding <strong>yes</strong>.</p>
        <p>This is the miracle of Cauchy's integral formula, and it is one of the deepest results in all of analysis.</p>
    </div>
</div>

<p>Recall from Cauchy's theorem (Chapter 5) that if \\(f\\) is analytic on and inside a simple closed contour \\(C\\), then</p>

\\[
\\oint_C f(z)\\,dz = 0.
\\]

<p>Now suppose we want to recover the value \\(f(z_0)\\) for some point \\(z_0\\) <em>inside</em> \\(C\\). The function \\(f(z)/(z - z_0)\\) is not analytic at \\(z_0\\), so Cauchy's theorem does not immediately apply. But by a careful excision argument, we can isolate the singularity and extract the value.</p>

<h3>The Key Idea: Deforming the Contour</h3>

<p>Since \\(f\\) is analytic everywhere inside \\(C\\) except at \\(z_0\\), we can shrink the contour around \\(z_0\\) without changing the integral. On a tiny circle of radius \\(\\varepsilon\\) around \\(z_0\\), the function \\(f(z)\\) is approximately \\(f(z_0)\\), so</p>

\\[
\\oint_C \\frac{f(z)}{z - z_0}\\,dz \\approx f(z_0) \\oint_{|z - z_0| = \\varepsilon} \\frac{dz}{z - z_0} = f(z_0) \\cdot 2\\pi i.
\\]

<p>As \\(\\varepsilon \\to 0\\), the approximation becomes exact. This yields the formula</p>

\\[
f(z_0) = \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z - z_0}\\,dz.
\\]

<h3>Why This Is Surprising</h3>

<p>The formula says that the value of \\(f\\) at an <em>interior</em> point is completely determined by its values on the <em>boundary</em>. This has no real-variable analogue. A smooth function on a disk need not satisfy any such relation between boundary and interior.</p>

<p>Analyticity is a global constraint disguised as a local one. The Cauchy-Riemann equations look local, but they propagate information across the entire domain.</p>

<div class="env-block remark">
    <div class="env-title">Preview of Consequences</div>
    <div class="env-body">
        <p>From this single formula, we will derive:</p>
        <ul>
            <li><strong>Derivatives via integrals</strong>: all derivatives of \\(f\\) exist and are themselves analytic.</li>
            <li><strong>Mean value property</strong>: \\(f(z_0)\\) equals the average of \\(f\\) over any circle centered at \\(z_0\\).</li>
            <li><strong>Maximum modulus principle</strong>: \\(|f|\\) cannot have an interior local maximum.</li>
            <li><strong>Liouville's theorem</strong>: bounded entire functions are constant.</li>
            <li><strong>Fundamental theorem of algebra</strong>: every non-constant polynomial has a root.</li>
        </ul>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-formula',
                    title: "Cauchy's Integral Formula: Live Demo",
                    description: 'Drag z\u2080 inside the contour. The formula f(z\u2080) = (1/2\u03c0i) \u222e f(z)/(z\u2212z\u2080) dz is evaluated numerically in real time. The integrand f(z)/(z\u2212z\u2080) is shown as a vector field along the contour.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 420, scale: 80, originX: 300, originY: 210 });
                        var c = viz.colors;

                        // State
                        var z0 = { x: 0.3, y: 0.4 };
                        var R = 1.8;
                        var N = 200; // integration steps

                        // Complex multiply
                        function cmul(a, b) { return { x: a.x*b.x - a.y*b.y, y: a.x*b.y + a.y*b.x }; }
                        function cdiv(a, b) {
                            var d = b.x*b.x + b.y*b.y;
                            if (d < 1e-20) return { x: 0, y: 0 };
                            return { x: (a.x*b.x + a.y*b.y)/d, y: (a.y*b.x - a.x*b.y)/d };
                        }
                        function cabs(a) { return Math.sqrt(a.x*a.x + a.y*a.y); }

                        // f(z) = z^2 + 0.5 (a simple analytic function)
                        function f(x, y) {
                            return { x: x*x - y*y + 0.5, y: 2*x*y };
                        }

                        // Numerically integrate (1/2pi i) * integral f(z)/(z-z0) dz along circle of radius R
                        function cauchyIntegral(z0x, z0y) {
                            var re = 0, im = 0;
                            for (var k = 0; k < N; k++) {
                                var t = 2 * Math.PI * k / N;
                                var dt = 2 * Math.PI / N;
                                // z = R e^{it}
                                var zx = R * Math.cos(t), zy = R * Math.sin(t);
                                // dz = i R e^{it} dt
                                var dzx = -R * Math.sin(t) * dt;
                                var dzy =  R * Math.cos(t) * dt;
                                // f(z)
                                var fz = f(zx, zy);
                                // z - z0
                                var denom = { x: zx - z0x, y: zy - z0y };
                                // f(z)/(z-z0)
                                var ratio = cdiv(fz, denom);
                                // multiply by dz
                                var integrand = cmul(ratio, { x: dzx, y: dzy });
                                re += integrand.x;
                                im += integrand.y;
                            }
                            // divide by 2pi i: divide by i => swap and negate, then divide by 2pi
                            // 1/(2pi i) * (re + i*im) = (im - i*re) / (2pi)
                            return { x: im / (2 * Math.PI), y: -re / (2 * Math.PI) };
                        }

                        viz.addDraggable('z0', z0.x, z0.y, c.orange, 8, function(wx, wy) {
                            // Constrain inside contour with margin
                            var d = Math.sqrt(wx*wx + wy*wy);
                            if (d < R - 0.15) { z0.x = wx; z0.y = wy; }
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Draw contour circle
                            viz.drawCircle(0, 0, R, null, c.blue, 2.5);

                            // Draw integrand vectors along contour (sub-sampled)
                            var nArrows = 24;
                            for (var k = 0; k < nArrows; k++) {
                                var t = 2 * Math.PI * k / nArrows;
                                var zx = R * Math.cos(t), zy = R * Math.sin(t);
                                var fz = f(zx, zy);
                                var denom = { x: zx - z0.x, y: zy - z0.y };
                                var ratio = cdiv(fz, denom);
                                var len = cabs(ratio);
                                if (len < 1e-6) continue;
                                // Scale for display
                                var scale = Math.min(0.25, 0.12 / (len + 0.01));
                                var ex = ratio.x * scale;
                                var ey = ratio.y * scale;
                                viz.drawVector(zx, zy, zx + ex, zy + ey, c.teal + 'bb', null, 1.5);
                            }

                            // Compute integral result
                            var inside = Math.sqrt(z0.x*z0.x + z0.y*z0.y) < R - 0.05;
                            var result = inside ? cauchyIntegral(z0.x, z0.y) : null;
                            var fz0 = f(z0.x, z0.y);

                            // Draw z0
                            viz.drawDraggables();
                            viz.drawPoint(z0.x, z0.y, c.orange, null, 6);

                            // Label z0
                            var ctx = viz.ctx;
                            ctx.fillStyle = c.orange;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            var [sx0, sy0] = viz.toScreen(z0.x, z0.y);
                            ctx.fillText('z\u2080', sx0 + 10, sy0 - 4);

                            // Info panel
                            var px = 14, py = 14;
                            ctx.fillStyle = '#0c0c2088';
                            ctx.fillRect(px - 4, py - 4, 310, 110);
                            ctx.fillStyle = c.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = z\u00b2 + 0.5', px, py);
                            ctx.fillText('z\u2080 = ' + z0.x.toFixed(3) + (z0.y >= 0 ? ' + ' : ' \u2212 ') + Math.abs(z0.y).toFixed(3) + 'i', px, py + 22);
                            if (inside && result) {
                                ctx.fillStyle = c.teal;
                                ctx.fillText('f(z\u2080) = ' + fz0.x.toFixed(4) + (fz0.y >= 0 ? ' + ' : ' \u2212 ') + Math.abs(fz0.y).toFixed(4) + 'i', px, py + 44);
                                ctx.fillStyle = c.orange;
                                ctx.fillText('\u222e formula: ' + result.x.toFixed(4) + (result.y >= 0 ? ' + ' : ' \u2212 ') + Math.abs(result.y).toFixed(4) + 'i', px, py + 66);
                                ctx.fillStyle = c.green;
                                var err = Math.sqrt((result.x - fz0.x)**2 + (result.y - fz0.y)**2);
                                ctx.fillText('Error: ' + err.toExponential(2), px, py + 88);
                            } else {
                                ctx.fillStyle = c.red;
                                ctx.fillText('z\u2080 is outside the contour', px, py + 44);
                            }

                            // Label contour
                            viz.screenText('C', viz.toScreen(R, 0)[0] + 10, viz.toScreen(R, 0)[1] - 8, c.blue, 14);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'State Cauchy\'s integral formula precisely: what conditions must \\(f\\) and \\(C\\) satisfy?',
                    hint: 'Think about analyticity requirements both on and inside the contour.',
                    solution: 'Let \\(f\\) be analytic on and inside a positively oriented simple closed contour \\(C\\), and let \\(z_0\\) be any point inside \\(C\\). Then \\(f(z_0) = \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z - z_0}\\,dz\\). The key conditions are: (1) \\(f\\) analytic on the closed region bounded by \\(C\\); (2) \\(z_0\\) lies strictly inside \\(C\\); (3) \\(C\\) is traversed counterclockwise.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Integral Formula
        // ================================================================
        {
            id: 'sec-formula',
            title: "The Integral Formula",
            content: `
<h2>The Integral Formula</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.1 (Cauchy's Integral Formula)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on and inside a positively oriented simple closed contour \\(C\\). For any point \\(z_0\\) inside \\(C\\),</p>
        \\[
        f(z_0) = \\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z - z_0}\\,dz.
        \\]
    </div>
</div>

<h3>Proof</h3>

<p>Since \\(f\\) is analytic inside \\(C\\) and the only obstruction is the simple pole of \\(1/(z - z_0)\\) at \\(z_0\\), we excise a small disk of radius \\(\\varepsilon\\) around \\(z_0\\) bounded by circle \\(C_\\varepsilon\\). By Cauchy's theorem applied to the annular region between \\(C\\) and \\(C_\\varepsilon\\),</p>

\\[
\\oint_C \\frac{f(z)}{z - z_0}\\,dz = \\oint_{C_\\varepsilon} \\frac{f(z)}{z - z_0}\\,dz.
\\]

<p>Parametrize \\(C_\\varepsilon\\): set \\(z = z_0 + \\varepsilon e^{i\\theta}\\), so \\(dz = i\\varepsilon e^{i\\theta}\\,d\\theta\\). Then</p>

\\[
\\oint_{C_\\varepsilon} \\frac{f(z)}{z - z_0}\\,dz = \\int_0^{2\\pi} \\frac{f(z_0 + \\varepsilon e^{i\\theta})}{\\varepsilon e^{i\\theta}} \\cdot i\\varepsilon e^{i\\theta}\\,d\\theta = i\\int_0^{2\\pi} f(z_0 + \\varepsilon e^{i\\theta})\\,d\\theta.
\\]

<p>As \\(\\varepsilon \\to 0\\), continuity of \\(f\\) gives</p>

\\[
i\\int_0^{2\\pi} f(z_0 + \\varepsilon e^{i\\theta})\\,d\\theta \\to 2\\pi i\\, f(z_0).
\\]

<p>Combining: \\(\\oint_C \\frac{f(z)}{z-z_0}\\,dz = 2\\pi i\\, f(z_0)\\), which rearranges to the formula. \\(\\square\\)</p>

<h3>The Winding Number Interpretation</h3>

<p>The formula extends to non-simple contours. If \\(C\\) winds \\(n(C, z_0)\\) times around \\(z_0\\), then</p>

\\[
\\frac{1}{2\\pi i} \\oint_C \\frac{f(z)}{z - z_0}\\,dz = n(C, z_0)\\, f(z_0).
\\]

<p>The winding number \\(n(C, z_0) = \\frac{1}{2\\pi i} \\oint_C \\frac{dz}{z - z_0}\\) counts how many times \\(C\\) encircles \\(z_0\\) (with sign: positive = counterclockwise).</p>

<h3>Computing Integrals via the Formula</h3>

<div class="env-block example">
    <div class="env-title">Example: Evaluating a contour integral</div>
    <div class="env-body">
        <p>Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z - 1}\\,dz\\).</p>
        <p>Here \\(f(z) = e^z\\) is entire, \\(z_0 = 1\\), and \\(|z_0| = 1 < 2\\), so \\(z_0\\) is inside the contour. By Cauchy's formula,</p>
        \\[\\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz = 2\\pi i\\, e^1 = 2\\pi i\\, e.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Point outside the contour</div>
    <div class="env-body">
        <p>Evaluate \\(\\displaystyle\\oint_{|z|=1} \\frac{\\sin z}{z - 3}\\,dz\\).</p>
        <p>Here \\(z_0 = 3\\) lies outside \\(|z| = 1\\). The integrand \\(\\sin z/(z-3)\\) is analytic inside \\(|z| = 1\\), so by Cauchy's theorem the integral equals \\(0\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Remark: The Formula as an Operator</div>
    <div class="env-body">
        <p>The formula \\(f(z_0) = \\frac{1}{2\\pi i}\\oint_C \\frac{f(z)}{z - z_0}\\,dz\\) can be read as a <em>reproducing kernel</em>: the Cauchy kernel \\(K(z, z_0) = \\frac{1}{z - z_0}\\) "reproduces" analytic functions from their boundary values. This is the complex analogue of Poisson's formula for harmonic functions.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-formula-contour',
                    title: 'Contour Deformation: Why the Integral Is Independent of Contour Shape',
                    description: 'The contour around z\u2080 can be any simple closed curve enclosing z\u2080. Drag z\u2080 and observe the numerical result remains 2\u03c0i\u00b7f(z\u2080) regardless of contour shape.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 400, scale: 80, originX: 300, originY: 200 });
                        var c = viz.colors;
                        var z0 = { x: 0.2, y: 0.3 };
                        var contourType = 0; // 0=circle, 1=square, 2=triangle
                        var N = 300;

                        VizEngine.createButton(controls, 'Circle', function() { contourType = 0; });
                        VizEngine.createButton(controls, 'Square', function() { contourType = 1; });
                        VizEngine.createButton(controls, 'Triangle', function() { contourType = 2; });

                        function f(x, y) { return { x: x*x - y*y + 0.5, y: 2*x*y }; }

                        function cdiv(a, b) {
                            var d = b.x*b.x + b.y*b.y;
                            if (d < 1e-20) return { x: 0, y: 0 };
                            return { x: (a.x*b.x + a.y*b.y)/d, y: (a.y*b.x - a.x*b.y)/d };
                        }
                        function cmul(a, b) { return { x: a.x*b.x - a.y*b.y, y: a.x*b.y + a.y*b.x }; }

                        // Get contour point at parameter t in [0,1]
                        var R = 1.6;
                        function contourPoint(t) {
                            var th = 2 * Math.PI * t;
                            if (contourType === 0) {
                                return { x: R * Math.cos(th), y: R * Math.sin(th) };
                            } else if (contourType === 1) {
                                // Square: perimeter parametrization
                                var s = (t * 4) % 4;
                                if (s < 1) return { x: R * (2*s - 1), y: -R };
                                if (s < 2) return { x: R, y: R * (2*(s-1) - 1) };
                                if (s < 3) return { x: R * (1 - 2*(s-2)), y: R };
                                return { x: -R, y: R * (1 - 2*(s-3)) };
                            } else {
                                // Triangle
                                var s2 = (t * 3) % 3;
                                var verts = [
                                    { x: 0, y: R },
                                    { x: R * Math.cos(-Math.PI/6), y: -R * 0.5 },
                                    { x: -R * Math.cos(-Math.PI/6), y: -R * 0.5 }
                                ];
                                var i0 = Math.floor(s2), i1 = (i0 + 1) % 3, u = s2 - i0;
                                return { x: verts[i0].x*(1-u) + verts[i1].x*u, y: verts[i0].y*(1-u) + verts[i1].y*u };
                            }
                        }

                        function numericalIntegral() {
                            var re = 0, im = 0;
                            for (var k = 0; k < N; k++) {
                                var t = k / N, t2 = (k + 1) / N;
                                var p = contourPoint(t), p2 = contourPoint(t2);
                                // midpoint
                                var pm = contourPoint((t + t2) / 2);
                                var fz = f(pm.x, pm.y);
                                var denom = { x: pm.x - z0.x, y: pm.y - z0.y };
                                var ratio = cdiv(fz, denom);
                                // dz
                                var dzx = p2.x - p.x, dzy = p2.y - p.y;
                                var integrand = cmul(ratio, { x: dzx, y: dzy });
                                re += integrand.x; im += integrand.y;
                            }
                            return { x: im / (2 * Math.PI), y: -re / (2 * Math.PI) };
                        }

                        viz.addDraggable('z0', z0.x, z0.y, c.orange, 8, function(wx, wy) {
                            // Check inside contour (approximate by radius for circle, just allow broad region)
                            z0.x = Math.max(-1.2, Math.min(1.2, wx));
                            z0.y = Math.max(-1.2, Math.min(1.2, wy));
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Draw contour
                            var ctx = viz.ctx;
                            ctx.strokeStyle = c.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var k = 0; k <= N; k++) {
                                var p = contourPoint(k / N);
                                var [sx, sy] = viz.toScreen(p.x, p.y);
                                k === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            viz.drawDraggables();
                            viz.drawPoint(z0.x, z0.y, c.orange, null, 6);

                            var result = numericalIntegral();
                            var fz0 = f(z0.x, z0.y);

                            ctx.fillStyle = '#0c0c2088';
                            ctx.fillRect(10, 10, 320, 90);
                            ctx.fillStyle = c.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = z\u00b2 + 0.5,  z\u2080 = ' + z0.x.toFixed(2) + ' + ' + z0.y.toFixed(2) + 'i', 14, 14);
                            ctx.fillStyle = c.teal;
                            ctx.fillText('f(z\u2080) direct: ' + fz0.x.toFixed(4) + ' + ' + fz0.y.toFixed(4) + 'i', 14, 36);
                            ctx.fillStyle = c.orange;
                            ctx.fillText('\u222e formula: ' + result.x.toFixed(4) + ' + ' + result.y.toFixed(4) + 'i', 14, 58);
                            ctx.fillStyle = c.green;
                            var names = ['Circle', 'Square', 'Triangle'];
                            ctx.fillText('Contour: ' + names[contourType] + ' (shape does not matter!)', 14, 80);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=3} \\frac{\\cos z}{z - i}\\,dz\\).',
                    hint: 'Identify \\(f(z)\\) and \\(z_0\\). Check that \\(z_0\\) is inside the contour.',
                    solution: 'Here \\(f(z) = \\cos z\\) (entire) and \\(z_0 = i\\). Since \\(|i| = 1 < 3\\), we have \\(z_0\\) inside \\(|z|=3\\). By Cauchy\'s formula: \\(\\oint_{|z|=3} \\frac{\\cos z}{z-i}\\,dz = 2\\pi i\\, \\cos(i) = 2\\pi i \\cosh(1)\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{z^2}{z + 3}\\,dz\\).',
                    hint: 'Where is the pole? Is it inside the contour?',
                    solution: 'The integrand has a potential singularity at \\(z_0 = -3\\), but \\(|-3| = 3 > 2\\), so \\(z_0\\) is outside \\(|z|=2\\). The function \\(z^2/(z+3)\\) is analytic inside \\(|z|=2\\), so by Cauchy\'s theorem the integral equals \\(0\\).'
                },
                {
                    question: 'Use Cauchy\'s formula to evaluate \\(\\displaystyle\\oint_{|z|=1} \\frac{e^{iz}}{z}\\,dz\\).',
                    hint: 'Write the integrand as \\(f(z)/z\\) with \\(z_0 = 0\\).',
                    solution: 'Here \\(f(z) = e^{iz}\\) (entire) and \\(z_0 = 0 \\in \\{|z| < 1\\}\\). Cauchy\'s formula gives \\(\\oint_{|z|=1} \\frac{e^{iz}}{z}\\,dz = 2\\pi i\\, e^{i \\cdot 0} = 2\\pi i\\). This equals \\(\\int_0^{2\\pi} e^{-\\sin\\theta} e^{i(\\cos\\theta - \\theta)}\\,d\\theta\\), separating real and imaginary parts gives the celebrated formula \\(\\int_0^{2\\pi} e^{-\\sin\\theta}\\cos(\\cos\\theta)\\,d\\theta = 2\\pi\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Derivatives via Integration
        // ================================================================
        {
            id: 'sec-derivatives',
            title: 'Derivatives via Integration',
            content: `
<h2>Derivatives via Integration</h2>

<div class="env-block intuition">
    <div class="env-title">The Key Idea</div>
    <div class="env-body">
        <p>Cauchy's formula expresses \\(f(z_0)\\) as an integral involving \\(1/(z - z_0)\\). What happens if we differentiate this integral with respect to \\(z_0\\)? Differentiating under the integral sign is valid (the integrand is smooth in \\(z_0\\) away from \\(C\\)), and it produces an integral formula for \\(f'(z_0)\\), \\(f''(z_0)\\), and every higher derivative.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.2 (Cauchy's Differentiation Formula)</div>
    <div class="env-body">
        <p>Under the same hypotheses as Theorem 6.1, \\(f\\) has derivatives of all orders at \\(z_0\\), given by</p>
        \\[
        f^{(n)}(z_0) = \\frac{n!}{2\\pi i} \\oint_C \\frac{f(z)}{(z - z_0)^{n+1}}\\,dz, \\qquad n = 0, 1, 2, \\ldots
        \\]
    </div>
</div>

<h3>Proof Sketch</h3>

<p>Differentiate the Cauchy formula \\(n\\) times with respect to \\(z_0\\):</p>

\\[
\\frac{d^n}{dz_0^n} \\frac{1}{z - z_0} = \\frac{n!}{(z - z_0)^{n+1}}.
\\]

<p>Interchanging differentiation and integration (justified by uniform convergence of the integrand in \\(z_0\\) away from \\(C\\)) gives the result. \\(\\square\\)</p>

<h3>Consequences</h3>

<p>This theorem has a remarkable corollary:</p>

<div class="env-block theorem">
    <div class="env-title">Corollary (Analyticity implies infinite differentiability)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic (complex differentiable) in a domain \\(D\\), then \\(f\\) possesses derivatives of all orders in \\(D\\), and each derivative is itself analytic.</p>
    </div>
</div>

<p>This is in dramatic contrast with real analysis, where a once-differentiable function need not be twice differentiable. Complex differentiability is so rigid that it automatically implies smoothness to all orders.</p>

<div class="env-block example">
    <div class="env-title">Example: Second derivative formula</div>
    <div class="env-body">
        <p>Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{(z-1)^3}\\,dz\\).</p>
        <p>Here \\(f(z) = e^z\\), \\(z_0 = 1\\), \\(n = 2\\). Since \\(z_0\\) is inside \\(|z| = 2\\):</p>
        \\[\\oint_{|z|=2} \\frac{e^z}{(z-1)^3}\\,dz = \\frac{2\\pi i}{2!}\\, f''(1) = \\pi i\\, e.\\]
    </div>
</div>

<h3>Cauchy's Estimate</h3>

<p>From the differentiation formula, we can bound derivatives. If \\(|f(z)| \\leq M\\) on a circle of radius \\(r\\) centered at \\(z_0\\),</p>

\\[
|f^{(n)}(z_0)| \\leq \\frac{n!\\, M}{r^n}.
\\]

<p>This <strong>Cauchy estimate</strong> is sharp and has far-reaching consequences, including Liouville's theorem.</p>
`,
            visualizations: [
                {
                    id: 'viz-derivative-formula',
                    title: 'n-th Derivative via Contour Integral',
                    description: 'Use the slider to choose n. The n-th derivative f\u207f(z\u2080) = n!/(2\u03c0i) \u222e f(z)/(z\u2212z\u2080)\u207f\u207a\u00b9 dz is computed numerically and compared to the exact value.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 380, scale: 80, originX: 300, originY: 190 });
                        var c = viz.colors;
                        var nDeriv = 0;
                        var z0 = { x: 0.3, y: 0.2 };
                        var R = 1.8;
                        var N = 400;

                        VizEngine.createSlider(controls, 'n (derivative order)', 0, 5, 0, 1, function(v) {
                            nDeriv = Math.round(v);
                        });

                        function cmul(a, b) { return { x: a.x*b.x - a.y*b.y, y: a.x*b.y + a.y*b.x }; }
                        function cdiv(a, b) {
                            var d = b.x*b.x + b.y*b.y;
                            if (d < 1e-20) return { x: 0, y: 0 };
                            return { x: (a.x*b.x + a.y*b.y)/d, y: (a.y*b.x - a.x*b.y)/d };
                        }
                        function cpow(z, n) {
                            // z^n via repeated multiply
                            if (n === 0) return { x: 1, y: 0 };
                            var r = { x: 1, y: 0 };
                            for (var k = 0; k < n; k++) r = cmul(r, z);
                            return r;
                        }

                        // f(z) = e^z, exact n-th derivative is also e^z
                        function f(x, y) {
                            var er = Math.exp(x);
                            return { x: er * Math.cos(y), y: er * Math.sin(y) };
                        }

                        function factorial(n) {
                            var r = 1; for (var k = 2; k <= n; k++) r *= k; return r;
                        }

                        function computeIntegral(n) {
                            var re = 0, im = 0;
                            for (var k = 0; k < N; k++) {
                                var t = 2 * Math.PI * k / N;
                                var dt = 2 * Math.PI / N;
                                var zx = R * Math.cos(t), zy = R * Math.sin(t);
                                var fz = f(zx, zy);
                                var denom = cpow({ x: zx - z0.x, y: zy - z0.y }, n + 1);
                                var ratio = cdiv(fz, denom);
                                var dzx = -R * Math.sin(t) * dt;
                                var dzy =  R * Math.cos(t) * dt;
                                var integ = cmul(ratio, { x: dzx, y: dzy });
                                re += integ.x; im += integ.y;
                            }
                            // multiply by n! / (2pi i) = n! * im/(2pi), -n! * re/(2pi)
                            var fac = factorial(n);
                            return { x: fac * im / (2 * Math.PI), y: -fac * re / (2 * Math.PI) };
                        }

                        viz.addDraggable('z0', z0.x, z0.y, c.orange, 8, function(wx, wy) {
                            if (Math.sqrt(wx*wx + wy*wy) < R - 0.15) { z0.x = wx; z0.y = wy; }
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();
                            viz.drawCircle(0, 0, R, null, c.blue, 2.5);
                            viz.drawDraggables();

                            // Highlight integrand (z - z0)^{n+1} modulus on contour
                            var nA = 80;
                            for (var k = 0; k < nA; k++) {
                                var t = 2 * Math.PI * k / nA;
                                var zx = R * Math.cos(t), zy = R * Math.sin(t);
                                var dz = { x: zx - z0.x, y: zy - z0.y };
                                var denom_abs = Math.sqrt(dz.x*dz.x + dz.y*dz.y);
                                var magnitude = 1 / Math.pow(denom_abs, nDeriv + 1);
                                // Dot scaled by integrand magnitude
                                var sr = Math.min(6, magnitude * 0.3 + 1);
                                var [sx, sy] = viz.toScreen(zx, zy);
                                viz.ctx.fillStyle = c.teal + '99';
                                viz.ctx.beginPath();
                                viz.ctx.arc(sx, sy, sr, 0, Math.PI * 2);
                                viz.ctx.fill();
                            }

                            var result = computeIntegral(nDeriv);
                            var exact = f(z0.x, z0.y); // f^(n) = f for e^z

                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c2088';
                            ctx.fillRect(10, 10, 340, 110);
                            ctx.fillStyle = c.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = e\u1d61,  z\u2080 = ' + z0.x.toFixed(3) + ' + ' + z0.y.toFixed(3) + 'i', 14, 14);
                            ctx.fillText('n = ' + nDeriv, 14, 36);
                            ctx.fillStyle = c.teal;
                            ctx.fillText('f\u207f(z\u2080) exact: ' + exact.x.toFixed(5) + ' + ' + exact.y.toFixed(5) + 'i', 14, 58);
                            ctx.fillStyle = c.orange;
                            ctx.fillText('\u222e formula: ' + result.x.toFixed(5) + ' + ' + result.y.toFixed(5) + 'i', 14, 80);
                            ctx.fillStyle = c.green;
                            var err = Math.sqrt((result.x - exact.x)**2 + (result.y - exact.y)**2);
                            ctx.fillText('Error: ' + err.toExponential(2), 14, 102);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=3} \\frac{\\sin z}{(z - \\pi/2)^4}\\,dz\\).',
                    hint: 'Use the differentiation formula with \\(n = 3\\). Recall \\((\\sin z)^{(3)} = -\\cos z\\).',
                    solution: 'With \\(f(z) = \\sin z\\), \\(z_0 = \\pi/2\\), \\(n = 3\\): \\(\\oint = \\frac{2\\pi i}{3!} f^{(3)}(\\pi/2) = \\frac{\\pi i}{3}(-\\cos(\\pi/2)) = 0\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{z^3 + 1}{(z - 1)^2}\\,dz\\).',
                    hint: 'Use the \\(n=1\\) formula: result is \\(2\\pi i f\'(1)\\).',
                    solution: 'With \\(f(z) = z^3 + 1\\) and \\(z_0 = 1\\) (inside \\(|z|=2\\)), \\(f\'(z) = 3z^2\\), \\(f\'(1) = 3\\). So \\(\\oint = 2\\pi i \\cdot 3 = 6\\pi i\\).'
                },
                {
                    question: 'Prove Cauchy\'s estimate: if \\(|f(z)| \\leq M\\) on \\(|z - z_0| = r\\), then \\(|f^{(n)}(z_0)| \\leq n! M / r^n\\).',
                    hint: 'Apply the ML inequality to the differentiation formula with the circle of radius \\(r\\) as contour.',
                    solution: 'By the differentiation formula, \\(f^{(n)}(z_0) = \\frac{n!}{2\\pi i}\\oint_{|z-z_0|=r} \\frac{f(z)}{(z-z_0)^{n+1}}\\,dz\\). By the ML inequality: \\(|f^{(n)}(z_0)| \\leq \\frac{n!}{2\\pi} \\cdot \\frac{M}{r^{n+1}} \\cdot 2\\pi r = \\frac{n! M}{r^n}\\). \\(\\square\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Mean Value Property
        // ================================================================
        {
            id: 'sec-mean-value',
            title: 'Mean Value Property',
            content: `
<h2>Mean Value Property</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.3 (Mean Value Property)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic in a disk \\(|z - z_0| < R\\), then for any \\(0 < r < R\\),</p>
        \\[
        f(z_0) = \\frac{1}{2\\pi} \\int_0^{2\\pi} f(z_0 + r e^{i\\theta})\\,d\\theta.
        \\]
        <p>That is, \\(f(z_0)\\) equals the average of \\(f\\) over any circle centered at \\(z_0\\).</p>
    </div>
</div>

<h3>Proof</h3>

<p>Apply Cauchy's formula with the circle \\(C = \\{|z - z_0| = r\\}\\). Parametrize \\(z = z_0 + re^{i\\theta}\\), \\(dz = ire^{i\\theta}\\,d\\theta\\):</p>

\\[
f(z_0) = \\frac{1}{2\\pi i} \\int_0^{2\\pi} \\frac{f(z_0 + re^{i\\theta})}{re^{i\\theta}} \\cdot ire^{i\\theta}\\,d\\theta = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(z_0 + re^{i\\theta})\\,d\\theta. \\quad\\square
\\]

<h3>Real and Imaginary Parts</h3>

<p>Writing \\(f = u + iv\\), the mean value property holds separately for \\(u\\) and \\(v\\):</p>

\\[
u(x_0, y_0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} u(x_0 + r\\cos\\theta, y_0 + r\\sin\\theta)\\,d\\theta.
\\]

<p>This shows that the real part of any analytic function (i.e., any harmonic function) satisfies the mean value property. This is a fundamental property of harmonic functions and characterizes them completely in many contexts.</p>

<h3>Interpretation</h3>

<p>The mean value property says analytic functions have no "peaks" or "valleys" in their interiors: every value is the balanced average of its neighborhood. This is the geometric seed from which the maximum modulus principle grows.</p>

<div class="env-block remark">
    <div class="env-title">Connection to Physics</div>
    <div class="env-body">
        <p>The mean value property is the mathematical basis for the physical fact that heat distribution in a conductor (which satisfies the heat equation, and in steady state the Laplace equation) has no interior hot spots: the temperature at any point equals the average temperature on any circle around it.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-mean-value',
                    title: 'Mean Value Property: Live Averaging',
                    description: 'Drag the center z\u2080. The animated dot samples f(z\u2080 + re^{i\u03b8}) as \u03b8 sweeps 0 to 2\u03c0. The running average converges to f(z\u2080), shown at the center.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 400, scale: 70, originX: 300, originY: 200 });
                        var c = viz.colors;
                        var z0 = { x: 0.5, y: 0.3 };
                        var r = 1.2;
                        VizEngine.createSlider(controls, 'radius r', 0.3, 2.0, r, 0.05, function(v) { r = v; });

                        function f(x, y) {
                            // f(z) = z^2 + z, nicely interesting
                            return { x: x*x - y*y + x, y: 2*x*y + y };
                        }

                        viz.addDraggable('z0', z0.x, z0.y, c.orange, 9, function(wx, wy) {
                            z0.x = wx; z0.y = wy;
                        });

                        function draw(t) {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Draw circle
                            viz.drawCircle(z0.x, z0.y, r, null, c.blue + '88', 1.5);

                            // Animate sampling
                            var theta = (t / 1800) % (2 * Math.PI);
                            var nSamples = 80;
                            var sumRe = 0, sumIm = 0, count = 0;

                            // Draw all sample dots
                            for (var k = 0; k < nSamples; k++) {
                                var th = 2 * Math.PI * k / nSamples;
                                var zx = z0.x + r * Math.cos(th);
                                var zy = z0.y + r * Math.sin(th);
                                var fz = f(zx, zy);
                                sumRe += fz.x; sumIm += fz.y; count++;
                                var alpha = th <= theta ? 'cc' : '33';
                                var [sx, sy] = viz.toScreen(zx, zy);
                                viz.ctx.fillStyle = c.teal + alpha;
                                viz.ctx.beginPath();
                                viz.ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                                viz.ctx.fill();
                            }

                            // Moving sample point
                            var sampX = z0.x + r * Math.cos(theta);
                            var sampY = z0.y + r * Math.sin(theta);
                            viz.drawPoint(sampX, sampY, c.yellow, null, 6);

                            // Draw z0
                            viz.drawDraggables();
                            var fz0 = f(z0.x, z0.y);
                            var avg = { x: sumRe / count, y: sumIm / count };

                            // Info
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c2088';
                            ctx.fillRect(10, 10, 330, 96);
                            ctx.fillStyle = c.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = z\u00b2 + z,  r = ' + r.toFixed(2), 14, 14);
                            ctx.fillStyle = c.teal;
                            ctx.fillText('Average of f on circle: ' + avg.x.toFixed(4) + ' + ' + avg.y.toFixed(4) + 'i', 14, 36);
                            ctx.fillStyle = c.orange;
                            ctx.fillText('f(z\u2080) directly: ' + fz0.x.toFixed(4) + ' + ' + fz0.y.toFixed(4) + 'i', 14, 58);
                            ctx.fillStyle = c.green;
                            var err = Math.sqrt((avg.x - fz0.x)**2 + (avg.y - fz0.y)**2);
                            ctx.fillText('Error: ' + err.toExponential(2) + '  (\u03b8 = ' + (theta / Math.PI).toFixed(2) + '\u03c0)', 14, 80);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the mean value property to show that if \\(f\\) is analytic in \\(|z| < 1\\) and continuous on \\(|z| \\leq 1\\) with \\(f = 0\\) on \\(|z| = 1\\), then \\(f \\equiv 0\\).',
                    hint: 'Apply the mean value property at \\(z_0 = 0\\), then use it recursively or invoke the maximum principle.',
                    solution: 'By the mean value property at the origin: \\(f(0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(e^{i\\theta})\\,d\\theta = 0\\) since \\(f = 0\\) on \\(|z|=1\\). More generally, for any interior point, we can grow the circle until it hits the boundary where \\(f = 0\\), giving \\(f = 0\\) everywhere. (Alternatively: the maximum modulus principle shows \\(|f| \\leq \\max_{|z|=1} |f| = 0\\).)'
                },
                {
                    question: 'If \\(f\\) is analytic and \\(|f(z)| \\leq 1\\) for \\(|z| \\leq 2\\) with \\(f(0) = 1\\), what can you conclude about \\(f\\)?',
                    hint: 'Use the maximum modulus principle together with the boundary value.',
                    solution: 'Since \\(|f(z)| \\leq 1\\) everywhere and \\(|f(0)| = 1\\), the maximum of \\(|f|\\) is attained at an interior point \\(z_0 = 0\\). By the maximum modulus principle, \\(f\\) must be constant: \\(f \\equiv 1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Maximum Modulus Principle
        // ================================================================
        {
            id: 'sec-maximum',
            title: 'Maximum Modulus Principle',
            content: `
<h2>Maximum Modulus Principle</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.4 (Maximum Modulus Principle)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic and non-constant in a domain \\(D\\), then \\(|f(z)|\\) has no local maximum in \\(D\\). Equivalently, if \\(D\\) is a bounded domain and \\(f\\) is continuous on \\(\\overline{D}\\), then</p>
        \\[\\max_{z \\in \\overline{D}} |f(z)| = \\max_{z \\in \\partial D} |f(z)|.\\]
        <p>The maximum of \\(|f|\\) is attained on the boundary.</p>
    </div>
</div>

<h3>Proof via Mean Value Property</h3>

<p>Suppose \\(|f(z_0)| = M\\) is a local maximum at an interior point \\(z_0\\). For small \\(r\\), the mean value property gives</p>

\\[
f(z_0) = \\frac{1}{2\\pi} \\int_0^{2\\pi} f(z_0 + re^{i\\theta})\\,d\\theta.
\\]

<p>Taking moduli and using the triangle inequality,</p>

\\[
M = |f(z_0)| \\leq \\frac{1}{2\\pi}\\int_0^{2\\pi} |f(z_0 + re^{i\\theta})|\\,d\\theta \\leq M.
\\]

<p>Equality holds throughout, which forces \\(|f(z_0 + re^{i\\theta})| = M\\) for all \\(\\theta\\). Since \\(r\\) was arbitrary, \\(|f| \\equiv M\\) in a neighborhood of \\(z_0\\), and by the identity theorem \\(f\\) is constant. \\(\\square\\)</p>

<h3>Minimum Modulus Principle</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.5 (Minimum Modulus Principle)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic and non-vanishing in a domain \\(D\\), then \\(|f(z)|\\) has no local minimum in \\(D\\). The minimum of \\(|f|\\) over \\(\\overline{D}\\) is attained on \\(\\partial D\\).</p>
    </div>
</div>

<p>This follows by applying the maximum principle to \\(1/f\\), which is analytic when \\(f \\neq 0\\).</p>

<h3>Schwarz's Lemma (a taste)</h3>

<p>As a sample application, if \\(f\\) is analytic with \\(|f(z)| \\leq 1\\) on \\(|z| < 1\\) and \\(f(0) = 0\\), then the maximum modulus principle applied to \\(f(z)/z\\) shows \\(|f(z)| \\leq |z|\\). The analytic function cannot grow faster than the identity map from the disk to itself.</p>
`,
            visualizations: [
                {
                    id: 'viz-maximum-modulus',
                    title: '|f(z)| Heatmap: Maximum Is Always on the Boundary',
                    description: 'Heatmap of |f(z)| for an analytic function. Choose different functions and verify that the maximum (brightest region) always lies on or outside the boundary disk.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 400, scale: 70, originX: 300, originY: 200 });
                        var c = viz.colors;
                        var fChoice = 0;
                        var R = 2.5;

                        VizEngine.createButton(controls, 'z\u00b2 + 1', function() { fChoice = 0; });
                        VizEngine.createButton(controls, 'e\u1d61', function() { fChoice = 1; });
                        VizEngine.createButton(controls, 'sin(z)', function() { fChoice = 2; });
                        VizEngine.createButton(controls, 'z\u00b3 \u2212 z', function() { fChoice = 3; });

                        function evalF(x, y) {
                            if (fChoice === 0) { // z^2 + 1
                                return Math.sqrt((x*x - y*y + 1)**2 + (2*x*y)**2);
                            } else if (fChoice === 1) { // e^z
                                return Math.exp(x);
                            } else if (fChoice === 2) { // sin(z)
                                return Math.sqrt(Math.sin(x)**2 * Math.cosh(y)**2 + Math.cos(x)**2 * Math.sinh(y)**2);
                            } else { // z^3 - z
                                var a = x*x*x - 3*x*y*y - x;
                                var b = 3*x*x*y - y*y*y - y;
                                return Math.sqrt(a*a + b*b);
                            }
                        }

                        var fNames = ['f(z) = z\u00b2 + 1', 'f(z) = e\u1d61', 'f(z) = sin(z)', 'f(z) = z\u00b3 \u2212 z'];

                        function draw() {
                            viz.clear();
                            var xR = [-R, R], yR = [-R * (viz.height/viz.width), R * (viz.height/viz.width)];
                            viz.drawHeatmap(function(x, y) { return evalF(x, y); }, xR, yR, 'inferno');
                            viz.drawGrid(0.5);
                            viz.drawAxes();
                            // Boundary circle for reference
                            viz.drawCircle(0, 0, 2.0, null, c.blue, 2);
                            viz.screenText(fNames[fChoice] + '  — max |f| is on the boundary circle', viz.width/2, viz.height - 14, c.white, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f(z) = z^2\\) on the square \\(|\\text{Re}(z)| \\leq 1,\\ |\\text{Im}(z)| \\leq 1\\). Where is the maximum of \\(|f|\\) attained?',
                    hint: 'On the boundary of the square, \\(|z^2| = |z|^2\\). Maximize \\(|z|^2\\) on the boundary.',
                    solution: 'Since \\(f\\) is non-constant and analytic, the max of \\(|z^2|\\) is on the boundary. On the boundary, \\(|z|^2 = x^2 + y^2\\) is maximized at the corners \\(z = \\pm 1 \\pm i\\), where \\(|z|^2 = 2\\). So \\(\\max|f| = 2\\), attained at the four corners.'
                },
                {
                    question: 'Suppose \\(f\\) is analytic on \\(\\overline{\\mathbb{D}}\\) and \\(|f(z)| = 1\\) for all \\(z\\) with \\(|z| = 1\\). Must \\(|f| \\leq 1\\) in the interior?',
                    hint: 'Apply the maximum modulus principle.',
                    solution: 'Yes. Since \\(f\\) is analytic, \\(\\max_{|z| \\leq 1} |f(z)| = \\max_{|z|=1} |f(z)| = 1\\). So \\(|f(z)| \\leq 1\\) for all \\(|z| \\leq 1\\). By the minimum modulus principle (if \\(f\\) has no zeros in the interior), \\(|f| \\geq 1\\) as well, forcing \\(|f| \\equiv 1\\) and \\(f\\) a Blaschke product (a finite product of Mobius transformations mapping \\(\\mathbb{D}\\) to \\(\\mathbb{D}\\)).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge — Liouville & FTA
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Liouville & The Fundamental Theorem',
            content: `
<h2>Liouville and the Fundamental Theorem of Algebra</h2>

<p>Two celebrated theorems follow directly from Cauchy's estimates. They illustrate how complex analysis constrains global behavior from local hypotheses.</p>

<h3>Liouville's Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.6 (Liouville's Theorem)</div>
    <div class="env-body">
        <p>Every bounded entire function is constant.</p>
        <p>That is, if \\(f\\) is analytic on all of \\(\\mathbb{C}\\) and \\(|f(z)| \\leq M\\) for all \\(z\\), then \\(f\\) is constant.</p>
    </div>
</div>

<h3>Proof</h3>

<p>By Cauchy's estimate with a circle of radius \\(R\\) centered at any point \\(z_0\\):</p>

\\[
|f'(z_0)| \\leq \\frac{M}{R}.
\\]

<p>Since \\(R\\) can be taken arbitrarily large (\\(f\\) is entire), we get \\(f'(z_0) = 0\\) for every \\(z_0\\). Hence \\(f\\) is constant. \\(\\square\\)</p>

<p>This is a profound statement: over the reals, \\(\\sin x\\) is bounded but non-constant. Over the complex numbers, this is impossible for an entire function.</p>

<h3>The Fundamental Theorem of Algebra</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.7 (Fundamental Theorem of Algebra)</div>
    <div class="env-body">
        <p>Every non-constant polynomial \\(p(z)\\) with complex coefficients has at least one root in \\(\\mathbb{C}\\).</p>
    </div>
</div>

<h3>Proof via Liouville</h3>

<p>Suppose \\(p(z) \\neq 0\\) for all \\(z \\in \\mathbb{C}\\). Then \\(g(z) = 1/p(z)\\) is entire. As \\(|z| \\to \\infty\\), \\(|p(z)| \\to \\infty\\), so \\(|g(z)| \\to 0\\). In particular, \\(g\\) is bounded. By Liouville, \\(g\\) (and hence \\(p\\)) is constant, contradicting our assumption that \\(p\\) is non-constant. \\(\\square\\)</p>

<p>From this it follows by induction that every degree-\\(n\\) polynomial factors as</p>

\\[
p(z) = a_n(z - z_1)(z - z_2) \\cdots (z - z_n)
\\]

<p>for roots \\(z_1, \\ldots, z_n \\in \\mathbb{C}\\) (counted with multiplicity).</p>

<h3>Why Entire Functions Cannot Be Bounded Without Being Constant</h3>

<p>Intuitively: an analytic function is completely determined by its values on any open set (identity theorem). If it is bounded, Cauchy's estimates force all derivatives to be zero at every point, leaving only constants.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The fundamental theorem of algebra was stated by Gauss in his 1799 doctoral dissertation, where he gave the first rigorous proof (though with gaps filled in later). The clean proof via Liouville is due to Cauchy's later development of complex function theory. Mathematicians had suspected the result since the 17th century but lacked the tools to prove it cleanly.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-liouville',
                    title: "Liouville's Theorem: Bounded Entire Functions",
                    description: 'Domain coloring of e\u1d61 (unbounded, grows as Re(z) \u2192 +\u221e) versus 1/(1+z\u00b2) (bounded on real line but not entire). Entire and bounded must be constant.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 380, scale: 60, originX: 300, originY: 190 });
                        var c = viz.colors;
                        var fChoice = 0;
                        var fDefs = [
                            { label: 'e\u1d61 (unbounded entire)', fn: function(x, y) { var er = Math.exp(x); return [er*Math.cos(y), er*Math.sin(y)]; } },
                            { label: 'sin(z) (unbounded entire)', fn: function(x, y) { return [Math.sin(x)*Math.cosh(y), Math.cos(x)*Math.sinh(y)]; } },
                            { label: '1/(1+z\u00b2) (bounded on R, not entire)', fn: function(x, y) {
                                var ax = 1 - x*x + y*y, ay = -2*x*y;
                                // 1+z^2: re = 1+x^2-y^2, im = 2xy
                                var bx = 1 + x*x - y*y, by = 2*x*y;
                                var d = bx*bx + by*by;
                                if (d < 1e-10) return [0, 0];
                                return [(ax*bx + ay*by)/d, (ay*bx - ax*by)/d];
                            }},
                            { label: 'z\u00b2 + 2z + 2 (polynomial, unbounded)', fn: function(x, y) {
                                return [x*x - y*y + 2*x + 2, 2*x*y + 2*y];
                            }}
                        ];

                        fDefs.forEach(function(fd, i) {
                            VizEngine.createButton(controls, fd.label.split(' ')[0], function() { fChoice = i; });
                        });

                        function draw() {
                            viz.clear();
                            var range = 3;
                            viz.drawDomainColoring(function(re, im) { return fDefs[fChoice].fn(re, im); },
                                [-range, range], [-range * (viz.height / viz.width), range * (viz.height / viz.width)]);
                            viz.drawAxes();
                            viz.screenText(fDefs[fChoice].label, viz.width/2, viz.height - 14, c.white, 12);
                            viz.screenText('Domain coloring: hue = arg(f), brightness = |f|', viz.width/2, 14, c.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-fta',
                    title: 'Fundamental Theorem of Algebra: Polynomials Must Have Roots',
                    description: 'Domain coloring of a polynomial. All colors must appear (winding number argument), so zeros exist. Watch how colors wrap around each root.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 380, scale: 60, originX: 300, originY: 190 });
                        var c = viz.colors;
                        var degree = 3;
                        // Coefficients: p(z) = z^n + c_{n-1} z^{n-1} + ... + c_0, chosen for interesting roots
                        var polys = [
                            { label: 'z\u00b2 \u2212 1', fn: function(x, y) { return [x*x - y*y - 1, 2*x*y]; } },
                            { label: 'z\u00b3 \u2212 z', fn: function(x, y) { var a = x*x*x - 3*x*y*y - x, b = 3*x*x*y - y*y*y - y; return [a, b]; } },
                            { label: 'z\u2074 \u2212 1', fn: function(x, y) {
                                var a = x*x - y*y, b = 2*x*y;
                                var re = a*a - b*b - 1, im = 2*a*b;
                                return [re, im];
                            }},
                            { label: 'z\u00b3 + iz + 1', fn: function(x, y) {
                                // z^3 = (x^3 - 3xy^2) + i(3x^2y - y^3)
                                // iz = -y + ix
                                var re = x*x*x - 3*x*y*y - y + 1;
                                var im = 3*x*x*y - y*y*y + x;
                                return [re, im];
                            }}
                        ];

                        polys.forEach(function(p) {
                            VizEngine.createButton(controls, p.label, function() {
                                degree = polys.indexOf(p);
                            });
                        });

                        function draw() {
                            viz.clear();
                            var range = 2.5;
                            viz.drawDomainColoring(
                                function(re, im) { return polys[degree].fn(re, im); },
                                [-range, range], [-range * viz.height / viz.width, range * viz.height / viz.width]
                            );
                            viz.drawAxes();
                            viz.screenText(polys[degree].label + '  \u2014 black dots = zeros', viz.width/2, viz.height - 14, c.white, 12);
                            viz.screenText('Every non-constant polynomial has at least one zero in \u2102', viz.width/2, 14, c.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Liouville\'s theorem to prove that if \\(f\\) is entire and \\(|f(z)| \\leq A|z|^n + B\\) for all \\(z\\), then \\(f\\) is a polynomial of degree at most \\(n\\).',
                    hint: 'Apply Cauchy\'s estimate to \\(f^{(n+1)}\\) using a circle of radius \\(R\\) and let \\(R \\to \\infty\\).',
                    solution: 'By Cauchy\'s estimate: \\(|f^{(n+1)}(z_0)| \\leq \\frac{(n+1)! M_R}{R^{n+1}}\\) where \\(M_R = \\max_{|z|=R} |f(z)| \\leq A R^n + B\\). So \\(|f^{(n+1)}(z_0)| \\leq \\frac{(n+1)!(AR^n + B)}{R^{n+1}} \\to 0\\) as \\(R \\to \\infty\\). Hence \\(f^{(n+1)} \\equiv 0\\), so \\(f\\) is a polynomial of degree at most \\(n\\). \\(\\square\\)'
                },
                {
                    question: 'Prove the fundamental theorem of algebra for degree 2: every \\(z^2 + bz + c = 0\\) has a solution in \\(\\mathbb{C}\\).',
                    hint: 'Use the quadratic formula: \\(z = \\frac{-b \\pm \\sqrt{b^2 - 4c}}{2}\\). Show that every complex number has a square root.',
                    solution: 'Every complex number \\(w \\neq 0\\) has a square root: if \\(w = re^{i\\theta}\\), then \\(\\sqrt{w} = \\sqrt{r}\\,e^{i\\theta/2}\\). So \\(\\sqrt{b^2 - 4c}\\) exists in \\(\\mathbb{C}\\), and \\(z = (-b \\pm \\sqrt{b^2 - 4c})/2\\) gives two roots in \\(\\mathbb{C}\\). (For higher degree one appeals to Liouville; the degree-2 case admits this elementary argument.)'
                },
                {
                    question: 'Why does Liouville\'s theorem fail for real analysis? Give an explicit example.',
                    hint: 'Exhibit a bounded non-constant smooth function on \\(\\mathbb{R}\\).',
                    solution: 'The function \\(f(x) = \\sin x\\) is smooth, bounded (\\(|f| \\leq 1\\)), and non-constant on \\(\\mathbb{R}\\). It fails to be entire: as a complex function \\(\\sin z\\), it is unbounded (\\(|\\sin(iy)| = \\sinh y \\to \\infty\\)). The key is that the Cauchy estimate argument uses circles of arbitrarily large radius in \\(\\mathbb{C}\\), not just on the real line.'
                },
                {
                    question: 'Verify Liouville\'s theorem directly for \\(f(z) = e^{iz}\\): show it is not bounded on \\(\\mathbb{C}\\).',
                    hint: 'Evaluate \\(|e^{iz}|\\) along the imaginary axis \\(z = iy\\) for \\(y \\to -\\infty\\).',
                    solution: 'On the imaginary axis, \\(f(iy) = e^{i(iy)} = e^{-y}\\). As \\(y \\to -\\infty\\), \\(e^{-y} \\to +\\infty\\). So \\(|e^{iz}|\\) is unbounded on \\(\\mathbb{C}\\), consistent with Liouville: an entire function with no zeros and no bound that would force it to be constant.'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=5} \\frac{z^4 - 3z^2 + 1}{(z-2)^3}\\,dz\\).',
                    hint: 'Use the differentiation formula with \\(n = 2\\).',
                    solution: 'Let \\(f(z) = z^4 - 3z^2 + 1\\), \\(z_0 = 2\\) (inside \\(|z|=5\\)), \\(n=2\\). Then \\(f\'(z) = 4z^3 - 6z\\), \\(f\'\'(z) = 12z^2 - 6\\), \\(f\'\'(2) = 48 - 6 = 42\\). So \\(\\oint = \\frac{2\\pi i}{2!} \\cdot 42 = 42\\pi i\\).'
                },
                {
                    question: 'State and prove the open mapping theorem as a consequence of the maximum modulus principle.',
                    hint: 'A non-constant analytic function maps open sets to open sets. Use the fact that if \\(f(z_0)\\) were a boundary point of \\(f(D)\\), then \\(|f - f(z_0)|\\) would have a local minimum there.',
                    solution: 'Suppose \\(f\\) is non-constant analytic on an open set \\(D\\), and let \\(U \\subset D\\) be open. Take \\(w_0 = f(z_0) \\in f(U)\\). Consider \\(g(z) = f(z) - w_0\\). By the minimum modulus principle (since \\(g(z_0) = 0\\) means \\(g\\) has a zero at \\(z_0\\), so minimum of \\(|g|\\) is 0), all values near 0 are attained, i.e., all \\(w\\) near \\(w_0\\) are in \\(f(U)\\). Thus \\(f(U)\\) is open. \\(\\square\\)'
                }
            ]
        }
    ]
});
